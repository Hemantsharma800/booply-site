import React, { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';
import { GEO_AI_DATA, mockAiLookup } from './geoaidata.js';
import './geoexplorer.css';

// 🛰️ HIGH-RESOLUTION TEXTURE ASSETS
const EARTH_TEXTURE = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg';
const EARTH_BUMP = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg';
const EARTH_SPEC = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg';

// 🌍 3D EARTH COMPONENT
function EarthModel({ onGlobeClick }) {
    const earthRef = useRef();
    const [colorMap, bumpMap, specMap] = useLoader(THREE.TextureLoader, [EARTH_TEXTURE, EARTH_BUMP, EARTH_SPEC]);

    // Realistic Axis Rotation (0.1 degree per frame)
    useFrame((state, delta) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group>
            {/* Atmosphere Glow Effect */}
            <mesh scale={2.52}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhongMaterial
                    color="#00f2ff"
                    transparent={true}
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Main Earth Sphere */}
            <mesh
                ref={earthRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onGlobeClick(e.point);
                }}
                scale={2.5}
            >
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhongMaterial
                    map={colorMap}
                    bumpMap={bumpMap}
                    bumpScale={0.05}
                    specularMap={specMap}
                    specular={new THREE.Color('grey')}
                    shininess={10}
                />
            </mesh>
        </group>
    );
}

// 🏛️ MAIN GAME CONTROLLER
export default function GeoExplorer({ onExit }) {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleGlobeClick = (point) => {
        setIsScanning(true);
        setSelectedCountry(null);

        // Simulate AI "Scanning" the Earth Surface
        setTimeout(() => {
            const result = getMockAiResponse(); // AI Lookup from our database
            setSelectedCountry(result);
            setIsScanning(false);
        }, 2000);
    };

    return (
        <div className="geo-ai-master-container">
            {/* 🌌 3D SPACE VIEWPORT */}
            <div className="viewport-3d">
                <Canvas shadows>
                    <Suspense fallback={<Html center><div className="satellite-loader">🛰️ LINKING SATELLITE...</div></Html>}>
                        <PerspectiveCamera makeDefault position={[0, 0, 8]} />

                        {/* Real Lighting Physics */}
                        <ambientLight intensity={0.2} />
                        <pointLight position={[10, 10, 10]} intensity={2} color="#fff" />
                        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                            <EarthModel onGlobeClick={handleGlobeClick} />
                        </Float>

                        <Stars radius={300} depth={60} count={10000} factor={7} saturation={0} fade />
                        <OrbitControls
                            enableZoom={true}
                            enablePan={false}
                            minDistance={4}
                            maxDistance={12}
                            autoRotate={false}
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* 📟 ELITE HUD OVERLAY */}
            <div className="hud-interface-layer">
                <header className="hud-top-bar">
                    <div className="hud-title-box">
                        <h1 className="title-glow">TERRA COGNITA AI</h1>
                        <span className="status-blink">SYSTEM: {isScanning ? 'SCANNING...' : 'ORBITAL'}</span>
                    </div>
                    <button className="hud-exit-btn" onClick={onExit}>DISCONNECT ⛩️</button>
                </header>

                {isScanning && (
                    <div className="scan-effect-overlay">
                        <div className="scan-line"></div>
                        <p className="scan-label">ANAYLZING GEOGRAPHIC DATA...</p>
                    </div>
                )}

                {/* 📋 GLASSMORPHISM DATA PANEL */}
                {selectedCountry && !isScanning && (
                    <div className="ai-data-panel glass-panel slide-in-right">
                        <div className="panel-header">
                            <h2>{selectedCountry.country}</h2>
                            <div className="badge">AI IDENTIFIED</div>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-pill">
                                <small>Capital</small>
                                <strong>{selectedCountry.capital}</strong>
                            </div>
                            <div className="stat-pill">
                                <small>Population</small>
                                <strong>{selectedCountry.population}</strong>
                            </div>
                        </div>

                        <div className="cities-section">
                            <h4>Major Urban Centers</h4>
                            <div className="city-list">
                                {selectedCountry.cities.map(city => <span key={city} className="city-chip">{city}</span>)}
                            </div>
                        </div>

                        <div className="landmark-section">
                            <h4>Famous Landmarks (Visual Feed)</h4>
                            <div className="real-image-grid">
                                {selectedCountry.landmarks.map((mark, i) => (
                                    <div key={i} className="landmark-photo-card">
                                        <img src={mark.img} alt={mark.name} />
                                        <label>{mark.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="ai-summary-box">
                            <div className="ai-tag">AI ANALYSIS</div>
                            <p>{selectedCountry.fact}</p>
                        </div>

                        <button className="close-analysis" onClick={() => setSelectedCountry(null)}>CLEAR FEED</button>
                    </div>
                )}
            </div>
        </div>
    );
}