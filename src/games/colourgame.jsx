import React, { useState, useEffect } from 'react';
import './colourgame.css';

const MIX_RECIPES = {
    'Red+Yellow': { name: 'Orange', hex: '#FF8C00' },
    'Blue+Red': { name: 'Purple', hex: '#A020F0' },
    'Blue+Yellow': { name: 'Green', hex: '#32CD32' },
    'Red+White': { name: 'Pink', hex: '#FFB6C1' },
    'Blue+White': { name: 'Sky Blue', hex: '#87CEEB' },
    'White+Yellow': { name: 'Cream', hex: '#FFFDD0' },
    // Add same-color mixes for completeness
    'Red+Red': { name: 'More Red!', hex: '#FF0000' },
    'Blue+Blue': { name: 'More Blue!', hex: '#0000FF' },
    'Yellow+Yellow': { name: 'More Yellow!', hex: '#FFFF00' },
    'White+White': { name: 'More White!', hex: '#FFFFFF' },
};

const INPUT_COLORS = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'White', hex: '#FFFFFF' },
    // Added a couple more for fun, though they might make "sludge" if mixed incorrectly
    { name: 'Green', hex: '#32CD32' },
    { name: 'Purple', hex: '#A020F0' }
];

function ColourGame({ onExit, onCorrectClick }) {
    const [selectedColors, setSelectedColors] = useState([]); // Stores full color objects
    const [result, setResult] = useState(null);
    const [gameState, setGameState] = useState('picking'); // 'picking', 'mixing', 'result'

    const handleSelect = (colorObj) => {
        if (gameState !== 'picking') return;

        const newSelection = [...selectedColors, colorObj];
        setSelectedColors(newSelection);

        if (newSelection.length === 2) {
            setGameState('mixing');

            // Determine result
            const key = newSelection.map(c => c.name).sort().join('+');
            // Default fallback if mix isn't in our recipe book
            const mixResult = MIX_RECIPES[key] || { name: 'Magical Sludge!', hex: '#5D4037' };

            // Start mixing animation sequence
            setTimeout(() => {
                setResult(mixResult);
                setGameState('result');
                if (MIX_RECIPES[key]) onCorrectClick(); // Only award star for known recipes

                // Auto-reset after showing result for continuous play
                setTimeout(() => {
                    setSelectedColors([]);
                    setResult(null);
                    setGameState('picking');
                }, 3000); // Show result for 3 seconds then reset

            }, 2500); // Mix for 2.5 seconds
        }
    };

    // Helper to get hex for layers, defaulting to transparent if not picked yet
    const getLayerHex = (index) => selectedColors[index] ? selectedColors[index].hex : 'transparent';

    return (
        <div className="lab-scene">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            {/* Header Status */}
            <div className={`status-banner ${gameState}`}>
                {gameState === 'picking' && (selectedColors.length === 0 ? "Pick 2 Colors to Mix!" : "Pick one more!")}
                {gameState === 'mixing' && "Mixing... Shake it up!"}
                {gameState === 'result' && `You made ${result.name}! ✨`}
            </div>

            {/* The Interaction Area */}
            <div className="desk-setup">

                {/* The Cartoon Hand holding the tube */}
                <div className={`hand-container ${gameState === 'mixing' ? 'shaking' : ''}`}>
                    <div className="cartoon-hand-overlay"></div>
                    <div className="tube-holder">
                        <div className="test-tube glass-effect">
                            {/* Distinct Layers (visible before mixing completes) */}
                            {gameState !== 'result' && (
                                <>
                                    <div className="liquid-layer bottom-layer" style={{ backgroundColor: getLayerHex(0) }}></div>
                                    <div className="liquid-layer top-layer" style={{ backgroundColor: getLayerHex(1) }}></div>
                                </>
                            )}

                            {/* Mixed/Mixing Liquid (visible during mix and result) */}
                            {(gameState === 'mixing' || gameState === 'result') && (
                                <div
                                    className={`mixed-liquid ${gameState === 'mixing' ? 'swirling' : ''}`}
                                    style={{ backgroundColor: result ? result.hex : getLayerHex(0) }}
                                >
                                    <div className="bubbles-container">
                                        <span></span><span></span><span></span><span></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Color Palette - Hidden only during the result reveal */}
                <div className={`palette-tray ${gameState === 'result' ? 'hidden' : ''}`}>
                    {INPUT_COLORS.map(c => (
                        <button
                            key={c.name}
                            className={`paint-pot ${selectedColors.includes(c) ? 'selected' : ''}`}
                            style={{ '--pot-color': c.hex }}
                            onClick={() => handleSelect(c)}
                            disabled={selectedColors.includes(c) || selectedColors.length >= 2}
                        >
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ColourGame;