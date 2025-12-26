import React, { useState, useEffect, useCallback, useRef } from 'react';
import './snakegame.css';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

export default function SnakeGame({ onExit, onCorrectClick }) {
    const [snake, setSnake] = useState([[10, 10], [10, 11], [10, 12]]);
    const [food, setFood] = useState([5, 5]);
    const [dir, setDir] = useState([0, -1]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const timerRef = useRef();

    const move = useCallback(() => {
        if (gameOver) return;
        const head = [snake[0][0] + dir[0], snake[0][1] + dir[1]];

        // Nokia 1100 Wall Physics (Game Over on hit)
        if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE ||
            snake.some(s => s[0] === head[0] && s[1] === head[1])) {
            setGameOver(true);
            return;
        }

        const newSnake = [head, ...snake];
        if (head[0] === food[0] && head[1] === food[1]) {
            setScore(s => s + 10);
            setFood([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);
            if (onCorrectClick) onCorrectClick();
        } else {
            newSnake.pop();
        }
        setSnake(newSnake);
    }, [snake, dir, food, gameOver, onCorrectClick]);

    useEffect(() => {
        const handleKeys = (e) => {
            if (e.key === 'ArrowUp' && dir[1] !== 1) setDir([0, -1]);
            if (e.key === 'ArrowDown' && dir[1] !== -1) setDir([0, 1]);
            if (e.key === 'ArrowLeft' && dir[0] !== 1) setDir([-1, 0]);
            if (e.key === 'ArrowRight' && dir[0] !== -1) setDir([1, 0]);
        };
        window.addEventListener('keydown', handleKeys);
        timerRef.current = setInterval(move, Math.max(50, INITIAL_SPEED - Math.floor(score / 2)));
        return () => {
            window.removeEventListener('keydown', handleKeys);
            clearInterval(timerRef.current);
        };
    }, [move, dir, score]);

    return (
        <div className="neon-snake-container">
            <div className="game-hud-top">
                <div className="hud-score">SCORE: {score}</div>
                <button className="retro-exit" onClick={onExit}>DISCONNECT</button>
            </div>

            <div className="nokia-grid">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(s => s[0] === x && s[1] === y);
                    const isHead = snake[0][0] === x && snake[0][1] === y;
                    const isFood = food[0] === x && food[1] === y;
                    return (
                        <div key={i} className={`tile ${isSnake ? 'body' : ''} ${isHead ? 'head' : ''} ${isFood ? 'neon-food' : ''}`} />
                    );
                })}
            </div>

            {gameOver && (
                <div className="crash-overlay">
                    <h1>CONNECTION LOST</h1>
                    <button onClick={() => window.location.reload()}>REBOOT</button>
                </div>
            )}
        </div>
    );
}