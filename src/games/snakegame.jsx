import React, { useState, useEffect, useCallback, useRef } from 'react';
import './snakegame.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[10, 10], [10, 11], [10, 12]];

export default function SnakeGame({ onExit, onCorrectClick }) {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState([5, 5]);
    const [dir, setDir] = useState([0, -1]); // Up
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const gameLoopRef = useRef();

    const moveSnake = useCallback(() => {
        if (gameOver) return;

        const newSnake = [...snake];
        const head = [newSnake[0][0] + dir[0], newSnake[0][1] + dir[1]];

        // 🛑 COLLISION PHYSICS (Wall & Self)
        if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE ||
            newSnake.some(s => s[0] === head[0] && s[1] === head[1])) {
            setGameOver(true);
            return;
        }

        newSnake.unshift(head);

        // 🍎 FOOD COLLECTION
        if (head[0] === food[0] && head[1] === food[1]) {
            setScore(s => s + 10);
            setFood([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);
            if (onCorrectClick) onCorrectClick(); // Grant stars to App.jsx
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
        gameLoopRef.current = setInterval(moveSnake, 120);
        return () => {
            window.removeEventListener('keydown', handleKeys);
            clearInterval(gameLoopRef.current);
        };
    }, [moveSnake, dir]);

    return (
        <div className="snake-master-container">
            <div className="snake-ui-panel">
                <div className="stat-group">
                    <span className="label">SCORE</span>
                    <span className="value">{score}</span>
                </div>
                <button className="nokia-exit" onClick={onExit}>QUIT</button>
            </div>

            <div className="game-grid-retro">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(s => s[0] === x && s[1] === y);
                    const isHead = snake[0][0] === x && snake[0][1] === y;
                    const isFood = food[0] === x && food[1] === y;
                    return (
                        <div key={i} className={`tile ${isSnake ? 'snake' : ''} ${isHead ? 'head' : ''} ${isFood ? 'food' : ''}`} />
                    );
                })}
            </div>

            {gameOver && (
                <div className="game-over-modal">
                    <h1>SNAKE CRASHED</h1>
                    <p>FINAL SCORE: {score}</p>
                    <button onClick={() => window.location.reload()}>REBOOT SYSTEM</button>
                </div>
            )}
        </div>
    );
}