// components/FaceLogin.js
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FaceLogin = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const scanIntervalRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false);

    const compareImages = (img1, img2) => {
        const canvas1 = document.createElement('canvas');
        const canvas2 = document.createElement('canvas');
        const ctx1 = canvas1.getContext('2d');
        const ctx2 = canvas2.getContext('2d');

        return new Promise((resolve) => {
            const image1 = new Image();
            const image2 = new Image();

            image1.onload = () => {
                canvas1.width = image1.width;
                canvas1.height = image1.height;
                ctx1.drawImage(image1, 0, 0);

                image2.onload = () => {
                    canvas2.width = image2.width;
                    canvas2.height = image2.height;
                    ctx2.drawImage(image2, 0, 0);

                    const data1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height).data;
                    const data2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height).data;

                    let matches = 0;
                    for (let i = 0; i < data1.length; i += 4) {
                        if (Math.abs(data1[i] - data2[i]) < 50 &&
                            Math.abs(data1[i + 1] - data2[i + 1]) < 50 &&
                            Math.abs(data1[i + 2] - data2[i + 2]) < 50) {
                            matches++;
                        }
                    }
                    resolve(matches / (data1.length / 4) > 0.8);
                };
                image2.src = img2;
            };
            image1.src = img1;
        });
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }
        } catch (error) {
            console.error('Camera failed:', error);
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
        }
        setIsScanning(false);
    };

    const startScanning = async () => {
        const targetData = localStorage.getItem('mindTarget');
        if (!targetData) {
            alert('No face data found. Please sign up first.');
            navigate('/signup');
            return;
        }

        await startCamera();
        setIsScanning(true);

        scanIntervalRef.current = setInterval(async () => {
            if (!canvasRef.current || !videoRef.current) return;

            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);

            const currentFrame = canvasRef.current.toDataURL('image/jpeg');
            const isMatch = await compareImages(currentFrame, JSON.parse(targetData).imageData);

            if (isMatch) {
                console.log('Face matched!');
                stopCamera();
                navigate('/home');
            }
        }, 100);
    };

    return (
        <div className="camera-container">
            <h2>Face Login</h2>
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
                <button
                    className="action-button"
                    onClick={isScanning ? stopCamera : startScanning}
                >
                    {isScanning ? 'Stop Scanning' : 'Start Face Recognition'}
                </button>
                <button
                    className="secondary-button"
                    onClick={() => navigate('/login')}
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default FaceLogin;