import React, { useState } from 'react';
import './ailab.css';

const DATA_TYPES = {
    STARS: { label: 'Stars', icon: '⭐', items: ['⭐', '✨', '🌟'], color: '#FFD700' },
    PLANETS: { label: 'Planets', icon: '🪐', items: ['🪐', '🌍', '🌑'], color: '#9370DB' }
};

function AILab({ onExit, onCorrectClick }) {
    const [mode, setMode] = useState('labeling'); // 'labeling', 'scanning', 'result'
    const [counts, setCounts] = useState({ STARS: 0, PLANETS: 0 });
    const [mysteryItem, setMysteryItem] = useState('');

    // Child "labels" data to teach the computer
    const addData = (type) => {
        const newCounts = { ...counts, [type]: counts[type] + 1 };
        setCounts(newCounts);

        // Once enough data is collected, move to the training/scanning phase
        if (newCounts.STARS + newCounts.PLANETS >= 6) {
            setMode('scanning');
            setTimeout(() => {
                // AI chooses an item based on the data provided
                const isStar = Math.random() > 0.5;
                setMysteryItem(isStar ? '🌟' : '🌍');
                setMode('result');
            }, 3000);
        }
    };

    return (
        <div className="ai-lab-scene">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            {mode === 'labeling' && (
                <div className="lab-interface">
                    <h1 className="ai-header">Boop's Magic Scanner 🔍</h1>
                    <p className="ai-instruction">Help the AI learn! Tap the boxes to label the data.</p>

                    <div className="data-collection-row">
                        <button className="label-box star-theme" onClick={() => addData('STARS')}>
                            <div className="box-visual">⭐</div>
                            <div className="box-text">Labled Stars: {counts.STARS}</div>
                        </button>

                        <button className="label-box planet-theme" onClick={() => addData('PLANETS')}>
                            <div className="box-visual">🪐</div>
                            <div className="box-text">Labled Planets: {counts.PLANETS}</div>
                        </button>
                    </div>
                </div>
            )}

            {mode === 'scanning' && (
                <div className="lab-interface training-animation">
                    <div className="scanner-eye">👁️‍🗨️</div>
                    <div className="scan-bar"></div>
                    <h2>AI is Analyzing Patterns...</h2>
                    <p>Training the model with your data!</p>
                </div>
            )}

            {mode === 'result' && (
                <div className="lab-interface result-view">
                    <h2 className="result-status">Identity Confirmed! ✅</h2>
                    <div className="mystery-blob">{mysteryItem}</div>
                    <div className="ai-report">
                        "Based on your <b>{counts.STARS + counts.PLANETS}</b> data points,
                        I am 100% sure this is a <b>{mysteryItem === '🌟' ? 'STAR' : 'PLANET'}</b>!"
                    </div>
                    <button className="reset-ai-btn" onClick={() => {
                        setMode('labeling');
                        setCounts({ STARS: 0, PLANETS: 0 });
                        onCorrectClick(); // Award a star for finishing the AI workflow
                    }}>
                        Teach More! ⭐
                    </button>
                </div>
            )}
        </div>
    );
}

export default AILab;