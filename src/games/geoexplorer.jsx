import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
// 🔥 CTO FIX: Use strict lowercase for the filename in the import
import { GEO_AI_DATA, mockAiLookup } from './geoaidata.js';
import './geoexplorer.css';

const EARTH_TEX = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg';

function Earth({ onScan }) {
    const earthRef = useRef();
    const texture = useLoader(THREE.TextureLoader, EARTH_TEX);

    // Realistic Axis Rotation
    useFrame(() => {
        if (earthRef.current) earthRef.current.rotation.y += 0.001;
    });

    return (
        <mesh ref={earthRef} onClick={onScan} scale={2.5}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial map={texture} roughness={0.7} metalness={0.2} />
        </mesh>
    );
}

function GeoExplorer({ onExit }) {
    const [data, setData] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleGlobeClick = () => {
        setIsScanning(true);
        setData(null);
        setTimeout(() => {
            const aiResult = mockAiLookup();
            setData(aiResult);
            setIsScanning(false);
        }, 1800);
    };

    return (
        <div className="geo-ai-arena">
            <Canvas camera={{ position: [0, 0, 7] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Suspense fallback={<Html center>Satellite Linking...</Html>}>
                    <Earth onScan={handleGlobeClick} />
                    <Stars radius={300} depth={60} count={5000} factor={7} />
                </Suspense>
                <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>

            <div className="geo-hud">
                <div className="header-hud">
                    <h1>TERRA COGNITA AI</h1>
                    <button className="exit-btn" onClick={onExit}>EXIT ORBIT</button>
                </div>

                {isScanning && <div className="scanning-bar">ANALYZING COORDINATES...</div>}

                {data && !isScanning && (
                    <div className="info-panel glass-panel">
                        <h2>{data.country}</h2>
                        <div className="panel-stats">
                            <p>Capital: <b>{data.capital}</b></p>
                            <p>Pop: <b>{data.population}</b></p>
                        </div>
                        <div className="landmark-grid">
                            {data.landmarks.map(l => (
                                <div key={l.name} className="landmark-card">
                                    <img src={l.img} alt={l.name} />
                                    <span>{l.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="ai-insight">
                            <strong>AI Fact:</strong> <p>{data.fact}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GeoExplorer;