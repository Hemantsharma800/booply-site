import React, { useState } from 'react';
import './colourgame.css'; // Must be lowercase to match Vercel filenames

const MIX_RECIPES = {
    'Red+Yellow': { name: 'Orange', hex: '#ff7f00' },
    'Blue+Red': { name: 'Purple', hex: '#800080' },
    'Blue+Yellow': { name: 'Green', hex: '#008000' },
    'Red+White': { name: 'Pink', hex: '#ffc0cb' },
    'Blue+White': { name: 'Light Blue', hex: '#add8e6' },
    'White+Yellow': { name: 'Light Yellow', hex: '#ffffe0' },
    'Red+Red': { name: 'Red', hex: '#ff0000' },
    'Blue+Blue': { name: 'Blue', hex: '#0000ff' },
    'Yellow+Yellow': { name: 'Yellow', hex: '#ffff00' },
    'White+White': { name: 'White', hex: '#ffffff' },
};

function ColorGame({ onExit, onCorrectClick }) {
    const [selected, setSelected] = useState([]);
    const [result, setResult] = useState({ text: "Pick 2 colors to mix!", color: '#ffffff' });
    const [isMixing, setIsMixing] = useState(false);

    const handlePick = (colorObj) => {
        if (isMixing) return;

        let nextSelection = [...selected, colorObj];
        if (nextSelection.length > 2) nextSelection = [colorObj];

        setSelected(nextSelection);

        if (nextSelection.length === 2) {
            setIsMixing(true);
            setResult({ text: "Mixing...", color: '#eeeeee' });

            // Sort names alphabetically so 'Red+Blue' always matches our recipe key
            const recipeKey = nextSelection.map(c => c.name).sort().join('+');
            const found = MIX_RECIPES[recipeKey];

            setTimeout(() => {
                if (found) {
                    setResult({
                        text: `${nextSelection[0].name} + ${nextSelection[1].name} = ${found.name}!`,
                        color: found.hex
                    });
                    onCorrectClick(); // Award a star for learning a mix!
                }
                setSelected([]);
                setIsMixing(false);
            }, 1000);
        }
    };

    return (
        <div className="color-game-container">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            <div className="mix-banner" style={{ backgroundColor: result.color }}>
                {result.text}
            </div>

            <div className={`lab-beaker ${isMixing ? 'bubbling' : ''}`}>
                <div className="beaker-liquid" style={{ backgroundColor: result.color }}></div>
                <div className="beaker-icon">🧪</div>
            </div>

            <div className="color-shelf">
                {[{ name: 'Red', hex: '#ff0000' }, { name: 'Yellow', hex: '#ffff00' }, { name: 'Blue', hex: '#0000ff' }, { name: 'White', hex: '#ffffff' }].map(c => (
                    <button
                        key={c.name}
                        className={`paint-bucket ${selected.some(s => s.name === c.name) ? 'active' : ''}`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => handlePick(c)}
                    >
                        <span>{c.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ColorGame;