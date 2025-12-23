import React, { useState } from 'react';
import './ColorGame.css';

const MIX_RECIPES = {
    'Red+Yellow': { name: 'Orange', hex: '#ff7f00' },
    'Blue+Red': { name: 'Purple', hex: '#800080' },
    'Blue+Yellow': { name: 'Green', hex: '#008000' },
    'Red+White': { name: 'Pink', hex: '#ffc0cb' },
    'Blue+White': { name: 'Light Blue', hex: '#add8e6' },
    'White+Yellow': { name: 'Light Yellow', hex: '#ffffe0' },
};

function ColorGame({ onExit, onCorrectClick }) {
    const [selected, setSelected] = useState([]);
    const [result, setResult] = useState({ text: "Pick 2 colors!", color: '#eee' });
    const [mixing, setMixing] = useState(false);

    const handlePick = (color) => {
        if (mixing) return;
        const newSelection = [...selected, color];
        setSelected(newSelection);

        if (newSelection.length === 2) {
            setMixing(true);
            const key = newSelection.map(c => c.name).sort().join('+');
            const found = MIX_RECIPES[key];

            setTimeout(() => {
                if (found) {
                    setResult({ text: `${newSelection[0].name} + ${newSelection[1].name} = ${found.name}!`, color: found.hex });
                    onCorrectClick();
                } else {
                    setResult({ text: "Try a different mix!", color: '#555' });
                }
                setSelected([]);
                setMixing(false);
            }, 1000);
        }
    };

    return (
        <div className="color-game-overlay">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>
            <div className="mix-banner" style={{ backgroundColor: result.color }}>{result.text}</div>
            <div className={`beaker ${mixing ? 'bubbling' : ''}`}>
                <div className="liquid" style={{ backgroundColor: result.color }}></div>
                <div className="glass">🧪</div>
            </div>
            <div className="shelf">
                {[{ name: 'Red', hex: '#ff0000' }, { name: 'Yellow', hex: '#ffff00' }, { name: 'Blue', hex: '#0000ff' }, { name: 'White', hex: '#ffffff' }].map(c => (
                    <button key={c.name} className="bucket" style={{ backgroundColor: c.hex }} onClick={() => handlePick(c)}>
                        {c.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ColorGame;