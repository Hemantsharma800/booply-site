import React, { useState } from 'react';
import './ailab.css';

const SPACE_DATA = {
    '🌍': { name: 'Earth', type: 'Our Home', fact: 'Earth is the only planet with liquid water and life!', color: '#4caf50' },
    '🪐': { name: 'Saturn', type: 'Planet', fact: 'Saturn has beautiful rings made of ice and rock!', color: '#fb8c00' },
    '☀️': { name: 'The Sun', type: 'Star', fact: 'The Sun is a giant ball of hot, glowing gas at the center of our Solar System.', color: '#ffeb3b' },
    '🌑': { name: 'The Moon', type: 'Satellite', fact: 'The Moon orbits Earth and controls our ocean tides!', color: '#90a4ae' },
    '🔴': { name: 'Mars', type: 'Planet', fact: 'Mars is called the Red Planet because of its rusty soil!', color: '#ff5252' }
};

function AILab({ onExit, onCorrectClick }) {
    const [mode, setMode] = useState('training'); // training, scanning, info
    const [scannedItem, setScannedItem] = useState(null);
    const [progress, setProgress] = useState(0);

    const startScan = (emoji) => {
        setScannedItem(SPACE_DATA[emoji]);
        setMode('scanning');
        setProgress(0);

        // Simulate AI Processing
        let p = 0;
        const interval = setInterval(() => {
            p += 10;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setMode('info');
                onCorrectClick(); // Award star for learning
            }
        }, 200);
    };

    return (
        <div className="ai-lab-elite">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            {/* 🚀 STEP 1: TRAINING SELECTION */}
            {mode === 'training' && (
                <div className="lab-view">
                    <h1 className="tech-title">AI SPACE SCANNER</h1>
                    <p className="tech-subtitle">Select an object to teach the AI Brain</p>
                    <div className="object-grid">
                        {Object.keys(SPACE_DATA).map(emoji => (
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
                        <span className="scanning-emoji">{Object.keys(SPACE_DATA).find(key => SPACE_DATA[key] === scannedItem)}</span>
                        <div className="radar-sweep"></div>
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <h2 className="glitch-text">ANALYZING DATA... {progress}%</h2>
                </div>
            )}

            {/* 📚 STEP 3: AI KNOWLEDGE INJECTION */}
            {mode === 'info' && (
                <div className="lab-view info-card">
                    <div className="info-header" style={{ backgroundColor: scannedItem.color }}>
                        <span className="info-emoji">{Object.keys(SPACE_DATA).find(key => SPACE_DATA[key] === scannedItem)}</span>
                        <h2>{scannedItem.name}</h2>
                    </div>
                    <div className="info-body">
                        <h3>Classification: {scannedItem.type}</h3>
                        <p className="fact-text">"{scannedItem.fact}"</p>
                        <div className="ai-tag">AI VERIFIED DATA ✅</div>
                    </div>
                    <button className="learn-more-btn" onClick={() => setMode('training')}>Scan Another! 🚀</button>
                </div>
            )}
        </div>
    );
}

export default AILab;