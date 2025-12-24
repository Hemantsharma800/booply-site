import React, { useState, useEffect, useCallback } from 'react';
import './nitrodash.css';

const LANES = [15, 50, 85]; // Percentage positions for lanes

function NitroDash({ onExit, onCorrectClick }) {
    const [lane, setLane] = useState(1);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(localStorage.getItem('nitro-high') || 0);
    const [gameState, setGameState] = useState('playing'); // 'playing' or 'crashed'
    const [speed, setSpeed] = useState(8);
    const [obstacle, setObstacle] = useState({ lane: 1, top: -100, icon: '🚧' });

    // 🏎️ Game Loop
    useEffect(() => {
        if (gameState !== 'playing') return;

        const moveLoop = setInterval(() => {
            setObstacle(prev => {
                if (prev.top > 600) {
                    // Score Point & Increase Difficulty
                    setScore(s => {
                        const newScore = s + 1;
                        if (newScore % 5 === 0) {
                            setSpeed(v => v + 1); // Get faster every 5 points
                            onCorrectClick(); // Award star
                        }
                        return newScore;
                    });
                    return { lane: Math.floor(Math.random() * 3), top: -100, icon: Math.random() > 0.5 ? '🚧' : '🛑' };
                }
                return { ...prev, top: prev.top + speed };
            });
        }, 30);

        return () => clearInterval(moveLoop);
    }, [gameState, speed, onCorrectClick]);

    // 💥 Collision Detection
    useEffect(() => {
        const carTop = 420; // Player Y position
        if (obstacle.lane === lane && obstacle.top > carTop - 40 && obstacle.top < carTop + 40) {
            setGameState('crashed');
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('nitro-high', score);
            }
        }
    }, [obstacle, lane, score, highScore]);

    const resetGame = () => {
        setScore(0);
        setSpeed(8);
        setGameState('playing');
        setObstacle({ lane: 1, top: -100, icon: '🚧' });
    };

    return (
        <div className="race-container">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            <div className="game-stats">
                <div className="stat-box">Score: {score}</div>
                <div className="stat-box high">Best: {highScore}</div>
            </div>

            <div className="track">
                {/* Moving Lane Markers */}
                <div className={`road-lines ${gameState === 'playing' ? 'animating' : ''}`}></div>

                {/* Player Car - Rotated Upwards */}
                <div
                    className={`player-car ${gameState === 'crashed' ? 'hit' : ''}`}
                    style={{ left: `${LANES[lane]}%` }}
                >
                    🏎️
                </div>

                {/* Moving Obstacle */}
                <div
                    className="obstacle"
                    style={{ left: `${LANES[obstacle.lane]}%`, top: `${obstacle.top}px` }}
                >
                    {obstacle.icon}
                </div>
            </div>

            {/* Game Over Popup with Red Loading Icon */}
            {gameState === 'crashed' && (
                <div className="crash-overlay">
                    <div className="loading-red">⭕</div>
                    <h2>GAME OVER!</h2>
                    <p>You scored {score} points!</p>
                    <button className="restart-btn" onClick={resetGame}>Try Again 🏁</button>
                </div>
            )}

            {/* Controls */}
            <div className="controls">
                <button onClick={() => setLane(l => Math.max(0, l - 1))}>⬅️</button>
                <button onClick={() => setLane(l => Math.min(2, l + 1))}>➡️</button>
            </div>
        </div>
    );
}

export default NitroDash;