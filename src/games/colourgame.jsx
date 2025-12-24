import React, { useState } from 'react';
import './colourgame.css';

const MIX_RECIPES = {
    'Red+Yellow': { name: 'Orange', hex: '#FF8C00' },
    'Blue+Red': { name: 'Purple', hex: '#A020F0' },
    'Blue+Yellow': { name: 'Green', hex: '#32CD32' },
    'Red+White': { name: 'Pink', hex: '#FFB6C1' },
    'Blue+White': { name: 'Sky Blue', hex: '#87CEEB' },
    'White+Yellow': { name: 'Cream', hex: '#FFFDD0' },
};

function ColourGame({ onExit, onCorrectClick }) {
    const [selected, setSelected] = useState([]);
    const [result, setResult] = useState(null);
    const [isMixing, setIsMixing] = useState(false);

    const handleSelect = (color) => {
        if (isMixing) return;

        const newSelection = [...selected, color];
        setSelected(newSelection);

        if (newSelection.length === 2) {
            setIsMixing(true);
            // Sort names so 'Red+Blue' and 'Blue+Red' both work
            const key = newSelection.map(c => c.name).sort().join('+');
            const mixResult = MIX_RECIPES[key] || { name: 'Muddy Brown', hex: '#7b5c00' };

            setTimeout(() => {
                setResult(mixResult);
                setIsMixing(false);
                onCorrectClick(); // Award a star
            }, 2000); // 2-second mixing animation
        }
    };

    const resetGame = () => {
        setSelected([]);
        setResult(null);
    };

    return (
        <div className="lab-container">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            <div className="display-area">
                <h2 className="status-text">
                    {isMixing ? "Mixing..." : result ? `You made ${result.name}!` : "Pick 2 Colors!"}
                </h2>
            </div>

            <div className="flask-section">
                <div className={`flask ${isMixing ? 'mixing' : ''}`}>
                    <div
                        className="liquid"
                        style={{
                            backgroundColor: result ? result.hex :
                                (selected.length > 0 ? selected[0].hex : '#e0e0e0')
                        }}
                    >
                        {isMixing && <div className="bubbles"><span></span><span></span><span></span></div>}
                    </div>
                </div>
            </div>

            {result ? (
                <button className="next-option-btn" onClick={resetGame}>Try Another Mix! ✨</button>
            ) : (
                <div className="palette">
                    {[{ name: 'Red', hex: '#FF0000' }, { name: 'Yellow', hex: '#FFFF00' }, { name: 'Blue', hex: '#0000FF' }, { name: 'White', hex: '#FFFFFF' }].map(c => (
                        <button
                            key={c.name}
                            className={`color-drop ${selected.includes(c) ? 'active' : ''}`}
                            style={{ backgroundColor: c.hex }}
                            onClick={() => handleSelect(c)}
                            disabled={selected.length >= 2}
                        >
                            <span>{c.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ColourGame;