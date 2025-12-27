import React, { useState, useEffect, useCallback } from 'react';
import './dinogame.css';

// 🐘 EXTENDED SAFARI LIBRARY
const ANIMAL_LIBRARY = [
    { id: 1, name: 'ELEPHANT', emoji: '🐘', color: '#00f2ff' },
    { id: 2, name: 'GIRAFFE', emoji: '🦒', color: '#ffd700' },
    { id: 3, name: 'LION', emoji: '🦁', color: '#ff4757' },
    { id: 4, name: 'ZEBRA', emoji: '🦓', color: '#ffffff' },
    { id: 5, name: 'TIGER', emoji: '🐅', color: '#ff7043' },
    { id: 6, name: 'MONKEY', emoji: '🐒', color: '#39ff14' },
    { id: 7, name: 'HIPPO', emoji: '🦛', color: '#bc13fe' },
    { id: 8, name: 'RHINO', emoji: '🦏', color: '#94a3b8' },
    { id: 9, name: 'CAMEL', emoji: '🐪', color: '#fbbf24' },
    { id: 10, name: 'KANGAROO', emoji: '🦘', color: '#f87171' }
];

export default function JungleGame({ onExit, onCorrectClick }) {
    const [activeAnimals, setActiveAnimals] = useState([]);
    const [target, setTarget] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);

    // 🔄 REFRESH ROUND LOGIC
    const startNewRound = useCallback(() => {
        // Pick 6 random unique animals from the library
        const shuffled = [...ANIMAL_LIBRARY].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 8);

        // Pick one of the selected animals as the target
        const targetAnimal = selected[Math.floor(Math.random() * selected.length)];

        setActiveAnimals(selected);
        setTarget(targetAnimal);
        setFeedback(null);
    }, []);

    useEffect(() => {
        startNewRound();
    }, [startNewRound]);

    const handleSelection = (animal) => {
        if (animal.name === target.name) {
            setScore(s => s + 1);
            setFeedback({ type: 'success', text: 'BRILLIANT!' });
            if (onCorrectClick) onCorrectClick(); // Award Star

            // Auto-refresh after short delay
            setTimeout(() => startNewRound(), 1200);
        } else {
            setFeedback({ type: 'error', text: `THAT IS THE ${animal.name}!` });
            setTimeout(() => setFeedback(null), 1500);
        }
    };

    return (
        <div className="jungle-root">
            <div className="nebula-bg"></div>

            <header className="jungle-header">
                <button className="exit-btn" onClick={onExit}>◀ EXIT</button>
                <div className="target-banner">
                    <small>CAN YOU FIND THE</small>
                    <h1 className="target-name" style={{ color: target?.color }}>
                        {target?.name}
                    </h1>
                </div>
                <div className="score-pill">STARS: {score}</div>
            </header>

            <main className="jungle-stage">
                <div className="animal-grid">
                    {activeAnimals.map((animal) => (
                        <button
                            key={animal.id}
                            className="animal-card"
                            onClick={() => handleSelection(animal)}
                        >
                            <span className="animal-sprite">{animal.emoji}</span>
                            <div className="card-glow" style={{ backgroundColor: animal.color }}></div>
                        </button>
                    ))}
                </div>
            </main>

            {feedback && (
                <div className={`feedback-overlay ${feedback.type}`}>
                    <h1>{feedback.text}</h1>
                </div>
            )}
        </div>
    );
}