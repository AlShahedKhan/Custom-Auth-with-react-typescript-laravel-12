import React from 'react';
import { Link, router } from '@inertiajs/react';

const Dashboard: React.FC = () => {
    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <Link href="/messenger">Messenger</Link>
            <button onClick={handleLogout} type="button">Logout</button>
        </div>
    );
};

export default Dashboard;