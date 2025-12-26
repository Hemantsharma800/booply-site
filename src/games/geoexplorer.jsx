import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

// 🚨 ZERO-MISTAKE PATHING
import { mockAiLookup } from '../data/geoaidata.js';
import './geoexplorer.css';

// High-Resolution Earth Assets
const EARTH_TEXTURE = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg';

function RotatingEarth({ onScan }) {
    const earthRef = useRef();
    const texture = useLoader(THREE.TextureLoader, EARTH_TEXTURE);

    // Hardware-Accelerated Axis Rotation
    useFrame((state, delta) => {
        if (earthRef.current) earthRef.current.rotation.y += delta * 0.1;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={earthRef} onClick={onScan} scale={2.6}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial map={texture} roughness={0.7} metalness={0.2} />
            </mesh>
        </Float>
    );
}

export default function GeoExplorer({ onExit, onCorrectClick }) {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const startAiScan = () => {
        setIsScanning(true);
        setScanResult(null);

        // Simulate Satellite Deep Scan
        setTimeout(() => {
            const data = mockAiLookup();
            setScanResult(data);
            setIsScanning(false);
            if (onCorrectClick) onCorrectClick(); // Reward player with stars
        }, 2500);
    };

    return (
        <div className="geo-ai-stage">
            {/* 🌌 THREE.JS VIEWPORT */}
            <div className="canvas-wrapper">
                <Canvas camera={{ position: [0, 0, 8] }}>
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={2} />
                    <Suspense fallback={<Html center className="loader">SATELLITE LINKING...</Html>}>
                        <RotatingEarth onScan={startAiScan} />
                        <Stars radius={300} depth={60} count={10000} factor={7} fade />
                    </Suspense>
                    <OrbitControls enableZoom={true} enablePan={false} minDistance={4} maxDistance={12} />
                </Canvas>
            </div>

            {/* 📟 HIGH-CLASS HUD */}
            <div className="hud-overlay">
                <div className="hud-header">
                    <div className="title-block">
                        <h1>TERRA COGNITA AI</h1>
                        <p className="status">{isScanning ? '● SCANNING SURFACE' : '● ORBITAL STEADY'}</p>
                    </div>
                    <button className="exit-orbit" onClick={onExit}>EXIT ORBIT ⛩️</button>
                </div>

                {isScanning && (
                    <div className="scan-line-container">
                        <div className="scanning-pulse"></div>
                        <p>IDENTIFYING COORDINATES...</p>
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