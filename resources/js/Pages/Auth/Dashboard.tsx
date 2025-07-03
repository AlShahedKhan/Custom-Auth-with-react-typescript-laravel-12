import React from 'react';
import { Link } from '@inertiajs/react';

const Dashboard: React.FC = () => {

    const handleLogout = () => {
        Inertia.post('/logout');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <Link href="/logout" method="post" as="button" type="button">Logout</Link>
        </div>
    );
};

export default Dashboard;