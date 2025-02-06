// ImageScanner.js
import * as THREE from 'three';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import React, { useEffect, useRef, useState } from 'react';

const ImageScanner = ({ targetImage }) => {
    const containerRef = useRef(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let mindARInstance;

        const startScanner = async () => {
            console.log('Starting scanner...');
            mindARInstance = new MindARThree({
                container: containerRef.current,
                imageTargetSrc: targetImage,
                uiScanning: true,
                uiLoading: "yes"
            });

            const { renderer, scene, camera } = mindARInstance;
            const anchor = mindARInstance.addAnchor(0);

            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                transparent: true,
                opacity: 0.5
            });
            const plane = new THREE.Mesh(geometry, material);
            anchor.group.add(plane);

            anchor.onTargetFound = () => {
                setMessage('Target Found!');
                console.log('target found');
            };

            anchor.onTargetLost = () => {
                setMessage('Target Lost - Keep Scanning');
                console.log('target lost');
            };

            await mindARInstance.start();
            renderer.setAnimationLoop(() => {
                renderer.render(scene, camera);
            });
        };

        startScanner().catch(error => {
            console.error('Scanner error:', error);
            setMessage('Scanner error - please try again');
        });

        return () => {
            if (mindARInstance) {
                mindARInstance.renderer.setAnimationLoop(null);
                mindARInstance.stop();
            }
        };
    }, [targetImage]);

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ width: '100%', height: '100vh' }} ref={containerRef} />
            {message && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    zIndex: 1000
                }}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default ImageScanner;