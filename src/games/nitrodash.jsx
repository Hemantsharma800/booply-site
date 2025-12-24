import React, { useState, useEffect, useCallback } from 'react';
import './nitrodash.css';

function RacingGame({ onExit, onCorrectClick }) {
    const [lane, setLane] = useState(1); // Lanes: 0, 1, 2
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [enemyPos, setEnemyPos] = useState({ lane: 1, top: -100 });

    // Game Loop for the Enemy Car/Obstacle
    useEffect(() => {
        if (gameOver) return;

        const interval = setInterval(() => {
            setEnemyPos((prev) => {
                if (prev.top > 500) {
                    // Reset enemy to top in a random lane
                    setScore(s => s + 1);
                    if (score > 0 && score % 5 === 0) onCorrectClick(); // Award star every 5 points
                    return { lane: Math.floor(Math.random() * 3), top: -100 };
                }
                return { ...prev, top: prev.top + 10 }; // Speed
            });
        }, 50);

        return () => clearInterval(interval);
    }, [gameOver, score, onCorrectClick]);

    // Collision Detection
    useEffect(() => {
        if (enemyPos.lane === lane && enemyPos.top > 350 && enemyPos.top < 450) {
            setGameOver(true);
        }
    }, [enemyPos, lane]);

    return (
        <div className="race-scene">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>
            <div className="race-stats">Score: {score}</div>

            <div className="highway">
                {/* Road Lanes */}
                <div className="lane-line"></div>
                <div className="lane-line"></div>

                {/* Player Car */}
                <div className={`player-car lane-${lane}`}>🏎️</div>

                {/* Enemy Obstacle */}
                <div
                    className="enemy-obstacle"
                    style={{ left: `${enemyPos.lane * 33 + 5}%`, top: `${enemyPos.top}px` }}
                >
                    🚧
                </div>
            </div>

            {!gameOver ? (
                <div className="race-controls">
                    <button onClick={() => setLane(Math.max(0, lane - 1))}>⬅️ Left</button>
                    <button onClick={() => setLane(Math.min(2, lane + 1))}>Right ➡️</button>
                </div>
            ) : (
                <div className="game-over-overlay">
                    <h2>Oops! Crashed!</h2>
                    <button onClick={() => { setGameOver(false); setScore(0); setEnemyPos({ lane: 1, top: -100 }) }}>
                        Try Again! 🏁
                    </button>
                </div>
            )}
        </div>
    );
}

export default RacingGame;