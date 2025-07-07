import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../../css/Messenger.css';

declare global {
    interface Window {
        Echo: any;
    }
}

interface User {
    id: number;
    first_name: string;
    last_name: string;
}

interface Message {
    id?: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    created_at?: string;
    updated_at?: string;
    sender?: User;
    receiver?: User;
}

const Messenger = ({ currentUserId }: { currentUserId: number }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        axios.get('/users').then(response => {
            setUsers(response.data);
        });
    }, []);

    useEffect(() => {
        if (selectedUser) {
            axios.get(`/messages?receiver_id=${selectedUser.id}`).then(response => {
                setMessages(response.data);
            });

            const ids = [currentUserId, selectedUser.id].sort();
            const channelName = `chat.${ids[0]}.${ids[1]}`;

            window.Echo.private(channelName)
                .listen('MessageSent', (e: any) => {
                    setMessages(prevMessages => [...prevMessages, e.message]);
                });

            return () => {
                window.Echo.leave(channelName);
            };
        } else {
            setMessages([]);
        }
    }, [selectedUser, currentUserId]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !selectedUser) return;

        axios.post('/messages', { message: newMessage, receiver_id: selectedUser.id })
            .then(response => {
                setNewMessage('');
                setMessages(prevMessages => [...prevMessages, response.data.message]);
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <div className="messenger">
            <div className="sidebar">
                <div className="sidebar-header">Users</div>
                <div className="user-list">
                    {users.map(user => (
                        <div
                            key={user.id}
                            className={`user-list-item ${selectedUser && selectedUser.id === user.id ? 'active' : ''}`}
                            onClick={() => setSelectedUser(user)}
                        >
                            <img className="avatar" src="/logo/user_log.jpg" alt="Avatar" />
                            <div className="user-info">
                                <div className="name">{user.first_name} {user.last_name}</div>
                                <div className="last-message">Click to chat</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chat-window">
                {selectedUser ? (
                    <>
                        <div className="chat-header">
                            <img className="avatar" src="/logo/user_log.jpg" alt="Avatar" />
                            <div className="name">{selectedUser.first_name} {selectedUser.last_name}</div>
                        </div>
                        <div className="chat-body" ref={chatBodyRef}>
                            {messages.map((message, index) => (
                                <div key={index} className={`message ${message.sender_id === currentUserId ? 'sent' : 'received'}`}>
                                    <img className="avatar" src="/logo/user_log.jpg" alt="Avatar" />
                                    <div className="message-content">
                                        {message.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="chat-footer">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                />
                                <button type="submit">➤</button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        Select a user to start chatting
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messenger;
