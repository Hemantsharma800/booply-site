import React, { useState, useEffect, useCallback, useRef } from 'react';
import './dinogame.css';

// 🦁 Safari Obstacle Library for better study
const SAFARI_ANIMALS = [
    { emoji: '🐘', name: 'Elephant' }, { emoji: '🦒', name: 'Giraffe' },
    { emoji: '🦓', name: 'Zebra' }, { emoji: '🦁', name: 'Lion' },
    { emoji: '🐅', name: 'Tiger' }, { emoji: '🦏', name: 'Rhino' },
    { emoji: '🦛', name: 'Hippo' }, { emoji: '🐪', name: 'Camel' }
];

export default function DinoGame({ onExit }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [dinoY, setDinoY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [obstacles, setObstacles] = useState([]);
    const [highScore, setHighScore] = useState(localStorage.getItem('booply-dino-hi') || 0);

    // 🛠️ FIX: Balanced Jump Physics
    const jump = useCallback(() => {
        if (!isJumping && isPlaying) {
            setIsJumping(true);
            let velocity = 14;
            const jumpInterval = setInterval(() => {
                setDinoY(prev => {
                    if (prev <= 0 && velocity < 0) {
                        clearInterval(jumpInterval);
                        setIsJumping(false);
                        return 0;
                    }
                    velocity -= 0.7; // Gravity constant
                    return prev + velocity;
                });
            }, 16);
        }
    }, [isJumping, isPlaying]);

    // Support for both Spacebar (Laptop) and Click (Phone)
    useEffect(() => {
        const handleKey = (e) => { if (e.code === 'Space') jump(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [jump]);

    // 🛠️ FIX: Reliable Obstacle Spawning
    useEffect(() => {
        if (!isPlaying) return;
        const spawnTimer = setInterval(() => {
            const randomAnimal = SAFARI_ANIMALS[Math.floor(Math.random() * SAFARI_ANIMALS.length)];
            setObstacles(prev => [...prev, {
                id: Date.now(),
                x: 100,
                ...randomAnimal
            }]);
        }, 1800 - Math.min(score / 5, 1000)); // Becomes harder as score increases

        return () => clearInterval(spawnTimer);
    }, [isPlaying, score]);

    // 🛠️ FIX: Collision & Score Synchronization
    useEffect(() => {
        if (!isPlaying) return;
        const gameTimer = setInterval(() => {
            setObstacles(prev => {
                const next = prev.map(o => ({ ...o, x: o.x - 1.2 })).filter(o => o.x > -10);

                // Accurate Collision detection
                next.forEach(o => {
                    if (o.x > 8 && o.x < 18 && dinoY < 35) {
                        setIsPlaying(false);
                        if (score > highScore) {
                            setHighScore(score);
                            localStorage.setItem('booply-dino-hi', score);
                        }
                    }
                });
                return next;
            });
            // Score only increases while Dino is running
            setScore(s => s + 1);
        }, 20);

        return () => clearInterval(gameTimer);
    }, [isPlaying, dinoY, score, highScore]);

    return (
        <div className="safari-root" onClick={isPlaying ? jump : undefined}>
            <div className="nebula-bg"></div>

            <header className="safari-hud">
                <button className="exit-btn-neon" onClick={onExit}>◀ EXIT ARCADE</button>
                <div className="safari-scores">
                    <div className="score-box">HI <span>{highScore}</span></div>
                    <div className="score-box main">SCORE <span>{score}</span></div>
                </div>
            </header>

            <div className="safari-stage">
                <div className="ground-line"></div>

                <div className="dino-character" style={{ bottom: `calc(20% + ${dinoY}px)` }}>
                    <span className="dino-icon">🦖</span>
                    <div className="dino-trail"></div>
                </div>

                {obstacles.map(o => (
                    <div key={o.id} className="animal-obstacle" style={{ left: `${o.x}%` }}>
                        <span className="animal-emoji">{o.emoji}</span>
                        <div className="animal-label">{o.name}</div>
                    </div>
                ))}

                {!isPlaying && (
                    <div className="safari-overlay fade-in">
                        <h1 className="glow-title">{score > 0 ? "MISSION FAILED" : "SAFARI DASH"}</h1>
                        <button className="start-btn-pro" onClick={() => { setScore(0); setObstacles([]); setIsPlaying(true); }}>
                            {score > 0 ? "RETRY DASH" : "START STUDY RUN"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}