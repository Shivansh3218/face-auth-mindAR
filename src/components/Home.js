// components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    const handleLogout = () => {
        // Optional: Clear only face data
        // localStorage.removeItem('mindTarget');

        // Or clear all data
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="home-container">
            <h1>Welcome, {userData.name || 'User'}!</h1>
            <p>You've successfully logged in with face recognition.</p>
            <button className="action-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Home;