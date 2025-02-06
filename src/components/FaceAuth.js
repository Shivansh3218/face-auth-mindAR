// FaceAuth.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const FaceAuth = ({ isRegistration = false }) => {
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const capture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();

        if (isRegistration) {
            localStorage.setItem('storedFace', imageSrc);
            setMessage('Face registered successfully!');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            const storedFace = localStorage.getItem('storedFace');
            if (!storedFace) {
                setMessage('No registered face found. Please register first.');
                return;
            }

            // Simple comparison - in production, use proper face recognition API
            if (imageSrc === storedFace) {
                setMessage('Login successful!');
                localStorage.setItem('isAuthenticated', 'true');
                setTimeout(() => navigate('/home'), 2000);
            } else {
                setMessage('Face does not match. Please try again.');
            }
        }
    };

    return (
        <div className="d-flex flex-column align-items-center gap-3">
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded"
                style={{ width: '100%', maxWidth: '500px' }}
            />

            <button
                className="btn btn-primary"
                onClick={capture}
            >
                {isRegistration ? 'Register Face' : 'Login with Face'}
            </button>

            {message && (
                <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                </div>
            )}

            {isRegistration && (
                <div className="mt-3">
                    <img
                        src={localStorage.getItem('storedFace')}
                        alt="Registered face"
                        style={{ width: '200px' }}
                        className="rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default FaceAuth;