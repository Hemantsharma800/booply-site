import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { getRandomCountry } from '../data/geoaidata.js';
import './geoexplorer.css';

// 🌍 4K Texture Asset
const EARTH_TEXTURE = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg';

function RotatingEarth({ onScan }) {
    const earthRef = useRef();
    const texture = useLoader(THREE.TextureLoader, EARTH_TEXTURE);

    useFrame((state, delta) => {
        if (earthRef.current) earthRef.current.rotation.y += delta * 0.12;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={earthRef} onClick={onScan} scale={2.7}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial map={texture} roughness={0.8} metalness={0.15} />
            </mesh>
        </Float>
    );
}

export default function GeoExplorer({ onExit, onCorrectClick }) {
    const [scanResult, setScanResult] = useState(null);
    const [lastIndex, setLastIndex] = useState(-1);
    const [isScanning, setIsScanning] = useState(false);

    const startAiScan = () => {
        setIsScanning(true);
        setScanResult(null); // Clear previous feed for new scan

        // Simulate Orbital Data Retrieval
        setTimeout(() => {
            const { data, index } = getRandomCountry(lastIndex);
            setScanResult(data);
            setLastIndex(index);
            setIsScanning(false);
            if (onCorrectClick) onCorrectClick(); // Reward player
        }, 2200);
    };

    return (
        <div className="geo-ai-stage">
            <div className="canvas-wrapper">
                <Canvas camera={{ position: [0, 0, 8] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={2} />
                    <Suspense fallback={<Html center className="loader">SYNCING SATELLITE...</Html>}>
                        <RotatingEarth onScan={startAiScan} />
                        <Stars radius={300} depth={60} count={15000} factor={7} fade />
                    </Suspense>
                    <OrbitControls enableZoom={true} enablePan={false} minDistance={4} maxDistance={12} />
                </Canvas>
            </div>

            {/* 📟 ELITE HUD OVERLAY */}
            <div className="hud-overlay">
                <div className="hud-header">
                    <div className="title-block">
                        <h1>TERRA COGNITA AI</h1>
                        <p className="status">{isScanning ? '● ANALYZING SURFACE' : '● ORBITAL STEADY'}</p>
                    </div>
                    <button className="exit-orbit" onClick={onExit}>EXIT ORBIT ⛩️</button>
                </div>

                {isScanning && (
                    <div className="scan-line-container">
                        <div className="scanning-pulse"></div>
                        <p>IDENTIFYING CONTINENTAL DATA...</p>
                    </div>
                )}

                {scanResult && !isScanning && (
                    <div className="ai-data-card fade-in" style={{ '--accent': scanResult.theme }}>
                        <div className="card-top">
                            <span className="label">AI IDENTIFIED</span>
                            <h2>{scanResult.country}</h2>
                        </div>
                        <div className="card-stats">
                            <div className="stat">
                                <small>CAPITAL</small>
                                <strong>{scanResult.capital}</strong>
                            </div>
                            <div className="stat">
                                <small>POPULATION</small>
                                <strong>{scanResult.population}</strong>
                            </div>
                        </div>
                        <div className="ai-fact">
                            <strong>AI INSIGHT:</strong>
                            <p>{scanResult.fact}</p>
                        </div>
                        <button className="clear-hud" onClick={() => setScanResult(null)}>CLEAR FEED</button>
                    </div>
                )}
            </div>
        </div>
    );
}