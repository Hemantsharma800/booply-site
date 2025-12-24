import React, { useState, useEffect } from 'react';
import './colourgame.css';

/**
 * MIX_RECIPES: A map of how two colors combine.
 * Because we use .sort(), 'Red+Yellow' and 'Yellow+Red' both work.
 */
const MIX_RECIPES = {
    'Red+Yellow': { name: 'Orange', hex: '#FF8C00' },
    'Blue+Red': { name: 'Purple', hex: '#A020F0' },
    'Blue+Yellow': { name: 'Green', hex: '#32CD32' },
    'Red+White': { name: 'Pink', hex: '#FFB6C1' },
    'Blue+White': { name: 'Sky Blue', hex: '#87CEEB' },
    'White+Yellow': { name: 'Cream', hex: '#FFFDD0' },
    'Orange+Blue': { name: 'Misty Brown', hex: '#8B4513' },
    'Green+Red': { name: 'Earth Tone', hex: '#556B2F' },
    'Purple+Yellow': { name: 'Deep Gold', hex: '#B8860B' },
    'Pink+Blue': { name: 'Lavender', hex: '#E6E6FA' }
};

const INPUT_COLORS = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Green', hex: '#32CD32' }
];

function ColourGame({ onExit, onCorrectClick }) {
    // core state for the liquid currently in the tube
    const [currentLiquid, setCurrentLiquid] = useState({ name: 'Empty', hex: 'transparent' });

    // State for the color currently being "poured" in
    const [nextColor, setNextColor] = useState(null);

    // Game states: 'picking', 'mixing', 'result'
    const [gameState, setGameState] = useState('picking');

    /**
     * handleSelect: Triggered when a child taps a paint pot.
     * Logic: If tube is empty, it fills it. If full, it mixes with current.
     */
    const handleSelect = (colorObj) => {
        if (gameState !== 'picking') return;

        // 1. Show the pouring animation
        setNextColor(colorObj);
        setGameState('mixing');

        // 2. Wait for the CSS "Pour" and "Shake" animations to complete (2 seconds)
        setTimeout(() => {
            let newResult;

            if (currentLiquid.name === 'Empty') {
                // Just fill the tube if it was empty
                newResult = colorObj;
            } else {
                // Calculate the mix using the recipe book
                const key = [currentLiquid.name, colorObj.name].sort().join('+');
                newResult = MIX_RECIPES[key] || { name: 'Magical Sludge!', hex: '#4a3728' };

                // Award a star for successfully mixing two colors
                onCorrectClick();
            }

            // 3. Update the tube with the final result
            setCurrentLiquid(newResult);
            setNextColor(null);
            setGameState('result');

            // 4. After showing the result name for a moment, let them pick again
            setTimeout(() => {
                setGameState('picking');
            }, 1500);

        }, 2000);
    };

    /**
     * handleEmpty: Resets the tube to transparent so the child can start over.
     */
    const handleEmpty = () => {
        setCurrentLiquid({ name: 'Empty', hex: 'transparent' });
        setGameState('picking');
        setNextColor(null);
    };

    return (
        <div className="lab-scene">
            {/* Navigation Buttons */}
            <button className="back-btn" onClick={onExit}>🏠 Home</button>
            <button className="reset-btn" onClick={handleEmpty}>🗑️ Empty Tube</button>

            {/* Top Status Banner - Reacts to Game State */}
            <div className={`status-banner ${gameState}`}>
                {gameState === 'picking' && (currentLiquid.name === 'Empty' ? "Pick a color to start!" : "Add another color!")}
                {gameState === 'mixing' && "Mixing... Shake it up!"}
                {gameState === 'result' && `Wow! You made ${currentLiquid.name}!`}
            </div>

            <div className="desk-setup">
                {/* Central Hand & Tube Container */}
                <div className={`hand-container ${gameState === 'mixing' ? 'shaking' : ''}`}>

                    {/* Cartoon Hand Overlay (Z-index high to hold the tube) */}
                    <div className="cartoon-hand-overlay"></div>

                    <div className="tube-holder">
                        <div className="test-tube glass-effect">

                            {/* The Liquid currently at the bottom of the tube */}
                            <div
                                className="liquid-base"
                                style={{ backgroundColor: currentLiquid.hex }}
                            >
                                {/* Bubbles only appear when actually mixing */}
                                {gameState === 'mixing' && (
                                    <div className="bubbles-container">
                                        <span style={{ '--duration': '1.2s' }}></span>
                                        <span style={{ '--duration': '1.8s' }}></span>
                                        <span style={{ '--duration': '1.5s' }}></span>
                                    </div>
                                )}
                            </div>

                            {/* The Color being poured in from the top */}
                            {nextColor && (
                                <div
                                    className="incoming-layer"
                                    style={{ '--pour-color': nextColor.hex }}
                                ></div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Interaction Palette (Paint Pots) */}
                <div className="palette-tray">
                    {INPUT_COLORS.map(c => (
                        <button
                            key={c.name}
                            className="paint-pot"
                            style={{ '--pot-color': c.hex }}
                            onClick={() => handleSelect(c)}
                            disabled={gameState === 'mixing'}
                            title={c.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ColourGame;