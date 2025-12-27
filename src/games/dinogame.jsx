import React, { useState, useEffect, useCallback, useRef } from 'react';
import './dinogame.css';

export default function DinoGame({ onExit, onCorrectClick }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(localStorage.getItem('dino-hi') || 0);
    const [dinoY, setDinoY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [obstacles, setObstacles] = useState([]);
    const gameRef = useRef();

    // 🏃 GAME LOOP ENGINE
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
                    velocity -= 0.8; // Gravity
                    return prev + velocity;
                });
            }, 20);
        }
    }, [isJumping, isPlaying]);

    // Keyboard support for Laptop users
    useEffect(() => {
        const handleKey = (e) => { if (e.code === 'Space') jump(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [jump]);

    // 🌵 OBSTACLE GENERATOR
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setObstacles(prev => [...prev, { id: Date.now(), x: 100 }]);
        }, 2000 - Math.min(score * 2, 1000)); // Speeds up as you play
        return () => clearInterval(interval);
    }, [isPlaying, score]);

    // ⚙️ PHYSICS & COLLISION
    useEffect(() => {
        if (!isPlaying) return;
        const physics = setInterval(() => {
            setObstacles(prev => {
                const next = prev.map(o => ({ ...o, x: o.x - 1.5 })).filter(o => o.x > -10);

                // Collision Detection
                next.forEach(o => {
                    if (o.x > 5 && o.x < 15 && dinoY < 20) {
                        setIsPlaying(false);
                        if (score > highScore) {
                            setHighScore(score);
                            localStorage.setItem('dino-hi', score);
                        }
                    }
                });
                return next;
            });
            setScore(s => s + 1);
        }, 20);
        return () => clearInterval(physics);
    }, [isPlaying, dinoY, score, highScore]);

    return (
        <div className="dino-pro-root" onClick={isPlaying ? jump : undefined}>
            {/* 🌌 NEON AMBIANCE */}
            <div className="nebula-overlay"></div>

            <header className="game-hud">
                <button className="exit-button-neon" onClick={onExit}>◀ EXIT ARCADE</button>
                <div className="score-group">
                    <div className="score-pill">HI <span>{highScore}</span></div>
                    <div className="score-pill main">SCORE <span>{score}</span></div>
                </div>
            </header>

            <main className="game-stage">
                <div className="horizon-line"></div>

                {/* THE DINO */}
                <div className="dino-avatar" style={{ bottom: `${dinoY}px` }}>
                    <span className="dino-emoji">🦖</span>
                    <div className="dino-glow"></div>
                </div>

                {/* THE OBSTACLES */}
                {obstacles.map(o => (
                    <div key={o.id} className="obstacle-neon" style={{ left: `${o.x}%` }}>
                        🌵
                    </div>
                ))}

                {/* 🏁 START / GAME OVER OVERLAY */}
                {!isPlaying && (
                    <div className="dino-overlay fade-in">
                        <h1 className="shimmer-title">{score > 0 ? "GAME OVER" : "DINO DASH"}</h1>
                        {score > 0 && <p className="final-score">TOTAL DISTANCE: {score}</p>}
                        <button className="play-btn-pro" onClick={() => { setScore(0); setObstacles([]); setIsPlaying(true); }}>
                            {score > 0 ? "RETRY MISSION" : "LAUNCH GAME"}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}