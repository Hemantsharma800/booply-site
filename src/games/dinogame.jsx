import React, { useState, useEffect, useCallback } from 'react';
import './dinogame.css';

const SAFARI_ANIMALS = [
    { emoji: '🐘', name: 'ELEPHANT', color: '#00f2ff' },
    { emoji: '🦒', name: 'GIRAFFE', color: '#ffd700' },
    { emoji: '🦓', name: 'ZEBRA', color: '#ffffff' },
    { emoji: '🦁', name: 'LION', color: '#ff4757' },
    { emoji: '🐅', name: 'TIGER', color: '#ff7043' },
    { emoji: '🦏', name: 'RHINO', color: '#94a3b8' }
];

export default function DinoGame({ onExit, onCorrectClick }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [dinoY, setDinoY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [obstacles, setObstacles] = useState([]);
    const [targetAnimal, setTargetAnimal] = useState(null);
    const [feedback, setFeedback] = useState("");

    // 🎯 SET NEW IDENTIFICATION GOAL
    const setNewGoal = useCallback(() => {
        const goal = SAFARI_ANIMALS[Math.floor(Math.random() * SAFARI_ANIMALS.length)];
        setTargetAnimal(goal);
    }, []);

    const jump = useCallback(() => {
        if (!isJumping && isPlaying) {
            setIsJumping(true);
            let velocity = 15;
            const jumpInterval = setInterval(() => {
                setDinoY(prev => {
                    if (prev <= 0 && velocity < 0) {
                        clearInterval(jumpInterval);
                        setIsJumping(false);
                        return 0;
                    }
                    velocity -= 0.8;
                    return prev + velocity;
                });
            }, 16);
        }
    }, [isJumping, isPlaying]);

    useEffect(() => {
        if (!isPlaying) return;
        setNewGoal();
        const spawnTimer = setInterval(() => {
            const animal = SAFARI_ANIMALS[Math.floor(Math.random() * SAFARI_ANIMALS.length)];
            setObstacles(prev => [...prev, { id: Date.now(), x: 100, ...animal }]);
        }, 2000);
        return () => clearInterval(spawnTimer);
    }, [isPlaying, setNewGoal]);

    useEffect(() => {
        if (!isPlaying) return;
        const gameTimer = setInterval(() => {
            setObstacles(prev => {
                const next = prev.map(o => ({ ...o, x: o.x - 1.5 })).filter(o => o.x > -10);

                next.forEach(o => {
                    // Collision detection
                    if (o.x > 8 && o.x < 18 && dinoY < 35) {
                        if (o.name === targetAnimal.name) {
                            setScore(s => s + 10);
                            setFeedback("CORRECT! ✨");
                            if (onCorrectClick) onCorrectClick(); // Award Star
                            setNewGoal();
                        } else {
                            setFeedback("WRONG ANIMAL! ❌");
                            setIsPlaying(false);
                        }
                    }
                });
                return next;
            });
        }, 20);
        return () => clearInterval(gameTimer);
    }, [isPlaying, dinoY, targetAnimal, setNewGoal, onCorrectClick]);

    return (
        <div className="safari-id-root" onClick={jump}>
            <div className="star-field"></div>

            {/* 🏛️ IDENTIFICATION BANNER */}
            {isPlaying && targetAnimal && (
                <div className="goal-banner fade-in">
                    <small>IDENTIFY AND JUMP OVER THE</small>
                    <h1 style={{ color: targetAnimal.color }}>{targetAnimal.name}</h1>
                </div>
            )}

            <header className="game-controls">
                <button className="exit-btn" onClick={onExit}>◀ BACK</button>
                <div className="score-badge">SCORE: {score}</div>
            </header>

            <div className="safari-stage">
                <div className="neon-ground"></div>
                <div className="dino-player" style={{ bottom: `calc(20% + ${dinoY}px)` }}>🦖</div>

                {obstacles.map(o => (
                    <div key={o.id} className="animal-unit" style={{ left: `${o.x}%` }}>
                        <span className="emoji">{o.emoji}</span>
                    </div>
                ))}

                {!isPlaying && (
                    <div className="start-overlay">
                        <h1 className="glow-text">{score > 0 ? "GAME OVER" : "ANIMAL STUDY"}</h1>
                        {feedback && <p className="feedback-sub">{feedback}</p>}
                        <button className="launch-btn" onClick={() => { setScore(0); setObstacles([]); setIsPlaying(true); }}>
                            {score > 0 ? "TRY AGAIN" : "START MISSION"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}