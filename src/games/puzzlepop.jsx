import React, { useState, useEffect } from 'react';
import './puzzlepop.css';

const PUZZLE_THEMES = [
    { id: 'lion', icon: '🦁', name: 'Lion' },
    { id: 'rocket', icon: '🚀', name: 'Rocket' },
    { id: 'apple', icon: '🍎', name: 'Apple' },
];

function PuzzlePop({ onExit, onCorrectClick }) {
    const [theme, setTheme] = useState(PUZZLE_THEMES[0]);
    const [pieces, setPieces] = useState([]);
    const [solved, setSolved] = useState(false);

    // Initialize 4 pieces in a random order
    useEffect(() => {
        const initialPieces = [
            { id: 1, pos: 'top-left', current: null },
            { id: 2, pos: 'top-right', current: null },
            { id: 3, pos: 'bottom-left', current: null },
            { id: 4, pos: 'bottom-right', current: null },
        ].sort(() => Math.random() - 0.5);
        setPieces(initialPieces);
    }, [theme]);

    const handleWin = () => {
        setSolved(true);
        onCorrectClick();
        setTimeout(() => {
            setSolved(false);
            const nextIdx = (PUZZLE_THEMES.indexOf(theme) + 1) % PUZZLE_THEMES.length;
            setTheme(PUZZLE_THEMES[nextIdx]);
        }, 3000);
    };

    return (
        <div className="puzzle-scene">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            <div className="puzzle-header">
                <h1>Puzzle Pop: {theme.name}</h1>
            </div>

            <div className={`puzzle-board ${solved ? 'solved' : ''}`}>
                {/* We will build the grid here in the next step! */}
                <div className="target-grid">
                    <div className="target-slot">{theme.icon}</div>
                </div>
            </div>

            <div className="pieces-tray">
                {/* Child drags these pieces to the board */}
                <p>Drag the pieces to the right spot!</p>
            </div>
        </div>
    );
}

export default PuzzlePop;