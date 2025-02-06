// Login.js
import React, { useState } from 'react';
import { Container, Form, Button, Tab, Tabs } from 'react-bootstrap';
import FaceAuth from '../components/FaceAuth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [key, setKey] = useState('password');

    const handleCredentialsLogin = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        navigate('/home');
    };

    const handleFaceCapture = async (imageSrc) => {
        try {
            // Add your face verification logic here
            // Compare imageSrc with stored face data
            setTimeout(() => navigate('/home'), 1000); // Simulated success
        } catch (error) {
            console.error('Face authentication failed:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="password" title="Password Login">
                    <Form onSubmit={handleCredentialsLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </Form.Group>
                        <Link to="/register" className="btn btn-secondary mt-3">Register Face</Link>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Tab>

                <Tab eventKey="face" title="Face Login">
                    <FaceAuth onCapture={handleFaceCapture} />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Login;