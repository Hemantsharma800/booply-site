import React, { useState } from 'react';
import './ColorGame.css';

// 1. The Base Colors available to pick
const BASE_COLORS = [
    { name: 'Red', hex: '#ff0000' },
    { name: 'Yellow', hex: '#ffff00' },
    { name: 'Blue', hex: '#0000ff' },
    { name: 'White', hex: '#ffffff' },
];

// 2. The "Recipe Book" for mixing colors
// We sort names alphabetically to ensure 'Red+Blue' is the same as 'Blue+Red'
const MIX_RECIPES = {
    'Red+Yellow': { name: 'Orange', hex: '#ff7f00' },
    'Blue+Red': { name: 'Purple', hex: '#800080' },
    'Blue+Yellow': { name: 'Green', hex: '#008000' },
    'Red+White': { name: 'Pink', hex: '#ffc0cb' },
    'Blue+White': { name: 'Light Blue', hex: '#add8e6' },
    'White+Yellow': { name: 'Light Yellow', hex: '#ffffe0' },
    // Mixing the same color results in itself
    'Red+Red': { name: 'Red', hex: '#ff0000' },
    'Blue+Blue': { name: 'Blue', hex: '#0000ff' },
    'Yellow+Yellow': { name: 'Yellow', hex: '#ffff00' },
    'White+White': { name: 'White', hex: '#ffffff' },
};

function ColorGame({ onExit, onCorrectClick }) {
    // State to keep track of which buckets are clicked (up to 2)
    const [selectedPickers, setSelectedPickers] = useState([]);
    // State to show the final result
    const [resultBox, setResultBox] = useState({ text: "Pick 2 colors to mix!", color: '#eee' });
    // State for the "bubbling" animation effect
    const [isMixing, setIsMixing] = useState(false);

    const handleColorPick = (colorObj) => {
        if (isMixing) return; // Don't allow clicking while animating

        let newSelection = [...selectedPickers, colorObj];

        // If they already picked 2 and click a 3rd, reset and start with the new one
        if (newSelection.length > 2) {
            newSelection = [colorObj];
        }

        setSelectedPickers(newSelection);

        // If we now have exactly 2 colors, PERFORM THE MIX!
        if (newSelection.length === 2) {
            setIsMixing(true);
            setResultBox({ text: "Mixing...", color: '#eee' });

            // 1. Get names and sort them to match our recipe book keys
            const names = newSelection.map(c => c.name).sort();
            const recipeKey = names.join('+');
            const mixResult = MIX_RECIPES[recipeKey];

            // 2. Wait a moment for animation, then show result
            setTimeout(() => {
                if (mixResult) {
                    // We found a match in the recipe book!
                    setResultBox({
                        text: `${names[0]} + ${names[1]} = ${mixResult.name}!`,
                        color: mixResult.hex
                    });
                    // Optional: Award points for successfully mixing a new color
                    if (names[0] !== names[1]) onCorrectClick();
                } else {
                    // Fallback (shouldn't happen with current recipes but good practice)
                    setResultBox({ text: "Hmm, that made sludge.", color: '#555' });
                }
                // Reset selections after showing result
                setSelectedPickers([]);
                setIsMixing(false);
            }, 1000); // 1 second mix time
        }
    };

    return (
        <div className="color-game-overlay">
            <button className="back-btn-color" onClick={onExit}>🏠 Home</button>

            {/* THE RESULT BANNER */}
            <div className="mix-result-banner" style={{ backgroundColor: resultBox.color }}>
                {resultBox.text}
            </div>

            {/* THE MIXING BEAKER (The Centerpiece) */}
            <div className={`mixing-beaker ${isMixing ? 'bubbling' : ''}`}>
                <div className="beaker-liquid" style={{ backgroundColor: resultBox.color, boxShadow: `0 0 50px ${resultBox.color}` }}></div>
                <div className="beaker-glass">🧪</div>
            </div>

            {/* THE PAINT BUCKETS (Controls) */}
            <div className="bucket-shelf">
                {BASE_COLORS.map((color) => {
                    // Check if this bucket is currently selected
                    const isSelected = selectedPickers.some(p => p.name === color.name);
                    return (
                        <button
                            key={color.name}
                            className={`paint-bucket ${isSelected ? 'selected-bucket' : ''}`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => handleColorPick(color)}
                        >
                            <span className="bucket-label">{color.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default ColorGame;