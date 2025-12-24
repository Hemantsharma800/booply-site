import React, { useState } from 'react';
import './colourgame.css'; // Strictly lowercase

const MIX_RECIPES = {
    'Red+Yellow': { name: 'Orange', hex: '#ff7f00' },
    'Blue+Red': { name: 'Purple', hex: '#800080' },
    'Blue+Yellow': { name: 'Green', hex: '#008000' },
    'Red+White': { name: 'Pink', hex: '#ffc0cb' },
};

function ColorGame({ onExit, onCorrectClick }) {
    const [selected, setSelected] = useState([]);
    const [result, setResult] = useState({ text: "Pick 2 colors!", color: '#ffffff' });
    const [isMixing, setIsMixing] = useState(false);

    const handlePick = (colorObj) => {
        if (isMixing) return;
        let next = [...selected, colorObj];
        if (next.length > 2) next = [colorObj];
        setSelected(next);

        if (next.length === 2) {
            setIsMixing(true);
            const key = next.map(c => c.name).sort().join('+');
            const found = MIX_RECIPES[key];
            setTimeout(() => {
                if (found) {
                    setResult({ text: `${next[0].name} + ${next[1].name} = ${found.name}!`, color: found.hex });
                    onCorrectClick();
                } else {
                    setResult({ text: "Try another mix!", color: '#eee' });
                }
                setSelected([]);
                setIsMixing(false);
            }, 1000);
        }
    };

    return (
        <div className="color-game-container">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>
            <div className="mix-banner" style={{ backgroundColor: result.color }}>{result.text}</div>
            <div className={`lab-beaker ${isMixing ? 'bubbling' : ''}`}>
                <div className="beaker-liquid" style={{ backgroundColor: result.color }}></div>
                <div className="beaker-icon">🧪</div>
            </div>
            <div className="color-shelf">
                {[{ name: 'Red', hex: '#ff0000' }, { name: 'Yellow', hex: '#ffff00' }, { name: 'Blue', hex: '#0000ff' }, { name: 'White', hex: '#ffffff' }].map(c => (
                    <button key={c.name} className="paint-bucket" style={{ backgroundColor: c.hex }} onClick={() => handlePick(c)}>
                        <span>{c.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ColorGame;