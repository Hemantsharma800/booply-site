import React, { useState } from 'react';
import './puzzlepop.css';

const BOX_DATA = [
    { id: 1, icon: '🦁', color: '#FFD700', label: 'Yellow' },
    { id: 2, icon: '🍎', color: '#FF5252', label: 'Red' },
    { id: 3, icon: '🦋', color: '#1E90FF', label: 'Blue' },
    { id: 4, icon: '🍀', color: '#4CAF50', label: 'Green' }
];

function PuzzlePop({ onExit, onCorrectClick }) {
    const [selectedBox, setSelectedBox] = useState(null);
    const [solvedBoxes, setSolvedBoxes] = useState([]);

    const handleMatch = (boxId) => {
        if (solvedBoxes.includes(boxId)) return;

        setSolvedBoxes([...solvedBoxes, boxId]);
        onCorrectClick(); // Award star

        if (solvedBoxes.length + 1 === BOX_DATA.length) {
            setTimeout(() => {
                alert("Amazing! All boxes matched! 🎉");
                setSolvedBoxes([]);
            }, 500);
        }
    };

    return (
        <div className="puzzle-scene">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>
            <h1 className="puzzle-title">Match the Boxes!</h1>

            <div className="box-grid">
                {BOX_DATA.map(box => (
                    <div
                        key={box.id}
                        className={`puzzle-box ${solvedBoxes.includes(box.id) ? 'matched' : ''}`}
                        style={{ backgroundColor: box.color }}
                        onClick={() => handleMatch(box.id)}
                    >
                        <span className="box-icon">{box.icon}</span>
                        <p className="box-label">{solvedBoxes.includes(box.id) ? 'MATCH!' : box.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PuzzlePop;