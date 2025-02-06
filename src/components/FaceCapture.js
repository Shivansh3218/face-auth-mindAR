// components/FaceCapture.js
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FaceCapture = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraStarted, setCameraStarted] = useState(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setCameraStarted(true);
            }
        } catch (error) {
            console.error('Camera access failed:', error);
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setCameraStarted(false);
    };

    const captureImage = () => {
        if (!canvasRef.current || !videoRef.current) return;

        const context = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);

        const imageData = canvasRef.current.toDataURL('image/jpeg');
        const mindData = {
            type: 'mind-target',
            imageData,
            timestamp: Date.now()
        };

        localStorage.setItem('mindTarget', JSON.stringify(mindData));
        stopCamera();
        setTimeout(() => {
            alert('Face registered successfully!');
            navigate('/login');
        }, 1000);
    };

    return (
        <div className="camera-container">
            <h2>Face Registration</h2>
            <div className="video-wrapper">
                <video
                    ref={videoRef}
                    playsInline
                    autoPlay
                    muted
                    className="video-feed"
                />
                <canvas ref={canvasRef} className="hidden-canvas" />
            </div>
            <div className="controls">
                {!cameraStarted ? (
                    <button className="action-button" onClick={startCamera}>
                        Start Camera
                    </button>
                ) : (
                    <button className="action-button" onClick={captureImage}>
                        Capture Face
                    </button>
                )}
            </div>
        </div>
    );
};

export default FaceCapture;