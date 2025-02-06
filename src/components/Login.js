// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login:', formData);
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <button
                className="secondary-button"
                onClick={() => navigate('/face-login')}
            >
                Face Login
            </button>
            <p className="auth-link">
                Don't have an account?
                <button
                    className="link-button"
                    onClick={() => navigate('/signup')}
                >
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default Login;