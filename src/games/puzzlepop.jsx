import React, { useState, useEffect } from 'react';
import './puzzlepop.css';

// 📚 Mixed Question Bank: Letters, Shapes, and Numbers
const QUESTION_BANK = [
    {
        id: 1,
        instruction: "Find the Shape",
        target: "CIRCLE",
        options: [
            { id: 'a', content: '📐', isCorrect: false },
            { id: 'b', content: '🔴', isCorrect: true },
            { id: 'c', content: '🟦', isCorrect: false },
            { id: 'd', content: '⭐', isCorrect: false }
        ]
    },
    {
        id: 2,
        instruction: "Starts with...",
        target: "LETTER 'A'",
        options: [
            { id: 'a', content: '🍌', isCorrect: false },
            { id: 'b', content: '🐶', isCorrect: false },
            { id: 'c', content: '🍎', isCorrect: true },
            { id: 'd', content: '🐱', isCorrect: false }
        ]
    },
    {
        id: 3,
        instruction: "Count 3 Stars",
        target: "NUMBER 3",
        options: [
            { id: 'a', content: '⭐', isCorrect: false },
            { id: 'b', content: '⭐⭐⭐', isCorrect: true },
            { id: 'c', content: '⭐⭐', isCorrect: false },
            { id: 'd', content: '⭐⭐⭐⭐', isCorrect: false }
        ]
    },
    {
        id: 4,
        instruction: "Find the Square",
        target: "SQUARE",
        options: [
            { id: 'a', content: '🟡', isCorrect: false },
            { id: 'b', content: '🔺', isCorrect: false },
            { id: 'c', content: '⭐', isCorrect: false },
            { id: 'd', content: '🟦', isCorrect: true }
        ]
    }
];

function PuzzlePop({ onExit, onCorrectClick }) {
    const [qIndex, setQIndex] = useState(0);
    const [gameState, setGameState] = useState('playing'); // 'playing', 'correct'

    const currentQ = QUESTION_BANK[qIndex];

    const handleChoice = (option) => {
        if (gameState !== 'playing') return;

        if (option.isCorrect) {
            setGameState('correct');
            onCorrectClick(); // Award star

            // Wait 2 seconds, then show next question
            setTimeout(() => {
                setQIndex((prev) => (prev + 1) % QUESTION_BANK.length);
                setGameState('playing');
            }, 2000);
        } else {
            // Small "Oopsy" shake animation logic could go here
            console.log("Try again!");
        }
    };

    return (
        <div className="puzzle-scene">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            {/* 🎯 TOP TARGET AREA */}
            <div className="target-container">
                <p className="instruction-text">{currentQ.instruction}</p>
                <div className={`target-display ${gameState === 'correct' ? 'celebrate' : ''}`}>
                    {currentQ.target}
                </div>
            </div>

            {/* 📦 BOTTOM OPTIONS GRID (2x2) */}
            <div className="options-grid">
                {currentQ.options.map((option) => (
                    <button
                        key={option.id}
                        className={`option-box ${gameState === 'correct' && option.isCorrect ? 'is-correct' : ''}`}
                        onClick={() => handleChoice(option)}
                        disabled={gameState !== 'playing'}
                    >
                        <span className="option-content">{option.content}</span>
                    </button>
                ))}
            </div>

            {gameState === 'correct' && <div className="feedback-pop">Great Job! 🌟</div>}
        </div>
    );
}

export default PuzzlePop;