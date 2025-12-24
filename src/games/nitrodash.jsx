import React, { useState, useEffect, useCallback } from 'react';
import './nitrodash.css';

const LANES = [15, 50, 85]; // Lane center positions (percentage)

function NitroDash({ onExit, onCorrectClick }) {
    const [lane, setLane] = useState(1);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(localStorage.getItem('booply-nitro-high') || 0);
    const [gameState, setGameState] = useState('playing'); // 'playing' or 'crashed'
    const [speed, setSpeed] = useState(8);
    const [enemy, setEnemy] = useState({ lane: 1, top: -150, icon: '🚙' });

    // 🏁 Game Loop: Handles movement, scoring, and difficulty
    useEffect(() => {
        if (gameState !== 'playing') return;

        const gameLoop = setInterval(() => {
            setEnemy(prev => {
                // When enemy car passes the player at the bottom
                if (prev.top > 650) {
                    setScore(s => {
                        const nextScore = s + 1;
                        // Increase difficulty every 5 points
                        if (nextScore % 5 === 0) {
                            setSpeed(v => v + 1.5);
                            onCorrectClick(); // Award star
                        }
                        return nextScore;
                    });
                    // Respawn new enemy car at the top in a random lane
                    return {
                        lane: Math.floor(Math.random() * 3),
                        top: -150,
                        icon: ['🚚', '🚕', '🚓', '🚜'][Math.floor(Math.random() * 4)]
                    };
                }
                // Move enemy car DOWN towards the player
                return { ...prev, top: prev.top + speed };
            });
        }, 30);

        return () => clearInterval(gameLoop);
    }, [gameState, speed, onCorrectClick]);

    // 💥 Collision Detection
    useEffect(() => {
        const playerY = 450; // Visual Y position of the player car
        if (enemy.lane === lane && enemy.top > playerY - 60 && enemy.top < playerY + 40) {
            setGameState('crashed');
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('booply-nitro-high', score);
            }
        }
    }, [enemy, lane, score, highScore]);

    const handleRestart = () => {
        setScore(0);
        setSpeed(8);
        setEnemy({ lane: 1, top: -150, icon: '🚙' });
        setGameState('playing');
    };

    return (
        <div className="nitro-game-container">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            <div className="score-board">
                <div className="score-card">SCORE: {score}</div>
                <div className="score-card best">BEST: {highScore}</div>
            </div>

            <div className="highway-track">
                {/* Road Animation - Moves DOWN to simulate driving UP */}
                <div className={`road-stripes ${gameState === 'playing' ? 'moving' : ''}`}></div>

                {/* Player Car - Rotated -90deg to face UP */}
                <div
                    className={`player-car ${gameState === 'crashed' ? 'explode' : ''}`}
                    style={{ left: `${LANES[lane]}%` }}
                >
                    🏎️
                </div>

                {/* Enemy Car - Rotated 90deg to face DOWN (Coming at you!) */}
                <div
                    className="enemy-car"
                    style={{ left: `${LANES[enemy.lane]}%`, top: `${enemy.top}px` }}
                >
                    {enemy.icon}
                </div>
            </div>

            {gameState === 'crashed' && (
                <div className="crash-popup">
                    <div className="red-spinner">⭕</div>
                    <h2>OH NO!</h2>
                    <p>You dodged {score} cars!</p>
                    <button className="restart-btn" onClick={handleRestart}>Drive Again! 🏁</button>
                </div>
            )}

            <div className="touch-controls">
                <button onTouchStart={() => setLane(l => Math.max(0, l - 1))} onClick={() => setLane(l => Math.max(0, l - 1))}>⬅️</button>
                <button onTouchStart={() => setLane(l => Math.min(2, l + 1))} onClick={() => setLane(l => Math.min(2, l + 1))}>➡️</button>
            </div>
        </div>
    );
}

export default NitroDash;