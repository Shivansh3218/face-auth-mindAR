// Home.js
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import ImageScanner from '../components/ImageScanner';

const Home = () => {
    const [showScanner, setShowScanner] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);

    const handleScanSuccess = () => {
        setScanComplete(true);
        setTimeout(() => {
            setShowScanner(false);
            setScanComplete(false);
        }, 2000);
    };

    return (
        <Container className="mt-5">
            <div className="text-center">
                <h1>Welcome to Image Scanner</h1>

                {!showScanner ? (
                    <Button
                        variant="primary"
                        size="lg"
                        className="mt-4"
                        onClick={() => setShowScanner(true)}
                    >
                        Start Scanning
                    </Button>
                ) : (
                    <div className="position-relative" style={{ height: '80vh' }}>
                        <ImageScanner
                            targetImage="path/to/your/target/image.mind"
                            onScanSuccess={handleScanSuccess}
                        />
                        <Button
                            variant="secondary"
                            className="position-absolute top-0 end-0 m-3"
                            onClick={() => setShowScanner(false)}
                        >
                            Close Scanner
                        </Button>
                    </div>
                )}

                {scanComplete && (
                    <div className="alert alert-success mt-3">
                        Scan completed successfully!
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Home;