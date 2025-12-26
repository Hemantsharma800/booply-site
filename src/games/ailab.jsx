import React, { useState, useCallback } from 'react';
import './ailab.css';

// 📚 Expanded Master Data Pool
const MASTER_SPACE_DATA = {
    '🌍': { name: 'Earth', type: 'Our Home', fact: 'Earth is the only planet known to have life!', color: '#4caf50' },
    '🪐': { name: 'Saturn', type: 'Planet', fact: 'Saturn has beautiful rings made of ice and rock!', color: '#fb8c00' },
    '☀️': { name: 'The Sun', type: 'Star', fact: 'The Sun is a giant ball of hot gas at the center of our system.', color: '#ffeb3b' },
    '🌑': { name: 'The Moon', type: 'Satellite', fact: 'The Moon orbits Earth and controls our ocean tides!', color: '#90a4ae' },
    '🔴': { name: 'Mars', type: 'Planet', fact: 'Mars is called the Red Planet due to its rusty soil.', color: '#ff5252' },
    '🌌': { name: 'Milky Way', type: 'Galaxy', fact: 'Our home galaxy containing billions of stars!', color: '#7e57c2' },
    '☄️': { name: 'Comet', type: 'Small Body', fact: 'Comets have long icy tails that glow near the Sun.', color: '#29b6f6' },
    '🕳️': { name: 'Black Hole', type: 'Phenomenon', fact: 'Gravity so strong not even light can escape it!', color: '#212121' },
    '👽': { name: 'Alien Probe', type: 'Unknown', fact: 'A mysterious object from deep space. Be careful!', color: '#00e676' },
    '🛰️': { name: 'Satellite', type: 'Technology', fact: 'Man-made machines that help with communication and GPS.', color: '#cfd8dc' },
    '🌠': { name: 'Shooting Star', type: 'Meteor', fact: 'A tiny rock burning up as it enters Earth\'s atmosphere.', color: '#ffca28' },
    '🚀': { name: 'Rocket', type: 'Vehicle', fact: 'Humans build rockets to travel beyond Earth!', color: '#f44336' }
};

// Helper function to get random unique keys from the master pool
const getRandomTargets = (count = 6) => {
    const keys = Object.keys(MASTER_SPACE_DATA);
    // Shuffle array using a simple sort hack
    const shuffled = keys.sort(() => 0.5 - Math.random());
    // Return the first 'count' items
    return shuffled.slice(0, count);
};

function AILab({ onExit, onCorrectClick }) {
    const [mode, setMode] = useState('training'); // training, scanning, info
    const [scannedItemData, setScannedItemData] = useState(null);
    const [scannedEmoji, setScannedEmoji] = useState(null);
    const [progress, setProgress] = useState(0);

    // 🆕 New State: Holds the currently displayed targets
    // Initialize with random targets on first load
    const [currentTargets, setCurrentTargets] = useState(() => getRandomTargets(6));

    const startScan = (emoji) => {
        setScannedEmoji(emoji);
        setScannedItemData(MASTER_SPACE_DATA[emoji]);
        setMode('scanning');
        setProgress(0);

        // Simulate AI Processing Animation
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setMode('info');
                onCorrectClick(); // Award star
            }
        }, 100); // Slightly faster scan for better flow
    };

    // 🆕 Function to reset and fetch NEW images
    const handleScanNext = () => {
        setCurrentTargets(getRandomTargets(6)); // Shuffle new targets
        setMode('training');
    };

    return (
        <div className="ai-lab-elite">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            {/* 🚀 STEP 1: TRAINING SELECTION (Updates dynamically now!) */}
            {mode === 'training' && (
                <div className="lab-view fade-in">
                    <h1 className="tech-title">AI SPACE SCANNER</h1>
                    <p className="tech-subtitle">Select a new object to analyze</p>
                    <div className="object-grid">
                        {currentTargets.map(emoji => (
                            <button key={emoji} className="scan-target" onClick={() => startScan(emoji)}>
                                <span className="target-emoji">{emoji}</span>
                                <div className="scan-line"></div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 🔍 STEP 2: AI SCANNING ANIMATION */}
            {mode === 'scanning' && (
                <div className="lab-view scanning">
                    <div className="scanner-circle">
                        <span className="scanning-emoji">{scannedEmoji}</span>
                        <div className="radar-sweep"></div>
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <h2 className="glitch-text">ANALYZING DATA... {progress}%</h2>
                </div>
            )}

            {/* 📚 STEP 3: AI KNOWLEDGE INJECTION */}
            {mode === 'info' && scannedItemData && (
                <div className="lab-view info-card-container">
                    <div className="info-card slide-up">
                        <div className="info-header" style={{ backgroundColor: scannedItemData.color }}>
                            <span className="info-emoji">{scannedEmoji}</span>
                            <h2>{scannedItemData.name}</h2>
                        </div>
                        <div className="info-body">
                            <h3>Classification: {scannedItemData.type}</h3>
                            <p className="fact-text">"{scannedItemData.fact}"</p>
                            <div className="ai-tag">AI VERIFIED DATA ✅</div>
                        </div>
                        {/* 🆕 Button triggers new images */}
                        <button className="learn-more-btn" onClick={handleScanNext}>Scan New Objects! 🚀</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AILab;