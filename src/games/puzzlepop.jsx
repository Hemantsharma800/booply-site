import React, { useState } from 'react';
import './puzzlepop.css';

const PUZZLE_DATA = [
    { id: 'lion', icon: '🦁', color: '#FFD700' },
    { id: 'rocket', icon: '🚀', color: '#E0E0E0' },
    { id: 'apple', icon: '🍎', color: '#FF5252' }
];

function PuzzlePop({ onExit, onCorrectClick }) {
    const [currentPuzzle, setCurrentPuzzle] = useState(PUZZLE_DATA[0]);
    const [placed, setPlaced] = useState(false);

    // This simple version uses a "Tap to Place" mechanic which is
    // much easier for toddlers and more reliable on mobile phones.
    const handlePieceClick = () => {
        setPlaced(true);
        onCorrectClick();

        // Move to next puzzle after a celebration
        setTimeout(() => {
            const nextIndex = (PUZZLE_DATA.indexOf(currentPuzzle) + 1) % PUZZLE_DATA.length;
            setCurrentPuzzle(PUZZLE_DATA[nextIndex]);
            setPlaced(false);
        }, 2000);
    };

    return (
        <div className="puzzle-scene">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            <div className="puzzle-header">
                <h1>Puzzle Pop!</h1>
            </div>

            <div className={`puzzle-board ${placed ? 'solved' : ''}`}>
                <div className="target-slot">
                    {placed ? currentPuzzle.icon : '?'}
                </div>
            </div>

            {!placed && (
                <div className="pieces-tray">
                    <button
                        className="puzzle-piece"
                        style={{ backgroundColor: currentPuzzle.color }}
                        onClick={handlePieceClick}
                    >
                        {currentPuzzle.icon}
                    </button>
                </div>
            )}

            {placed && <div className="celebration">Great Job! ✨</div>}
        </div>
    );
}

export default PuzzlePop;