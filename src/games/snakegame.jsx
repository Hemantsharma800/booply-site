import React, { useState, useEffect, useCallback, useRef } from 'react';
import './snakegame.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[10, 10], [10, 11], [10, 12]];
const INITIAL_DIR = [0, -1]; // Moving Up

export default function SnakeGame({ onExit, onCorrectClick }) {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState([5, 5]);
    const [dir, setDir] = useState(INITIAL_DIR);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const gameLoopRef = useRef();

    const generateFood = useCallback(() => {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        setFood([x, y]);
    }, []);

    const moveSnake = useCallback(() => {
        const newSnake = [...snake];
        const head = [newSnake[0][0] + dir[0], newSnake[0][1] + dir[1]];

        // Wall Collision
        if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE) {
            return setGameOver(true);
        }

        // Self Collision
        if (newSnake.some(s => s[0] === head[0] && s[1] === head[1])) {
            return setGameOver(true);
        }

        newSnake.unshift(head);

        // Food Collision
        if (head[0] === food[0] && head[1] === food[1]) {
            setScore(s => s + 10);
            generateFood();
            if (onCorrectClick) onCorrectClick(); // Reward stars
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    }, [snake, dir, food, generateFood, onCorrectClick]);

    useEffect(() => {
        const handleKeys = (e) => {
            if (e.key === 'ArrowUp' && dir[1] !== 1) setDir([0, -1]);
            if (e.key === 'ArrowDown' && dir[1] !== -1) setDir([0, 1]);
            if (e.key === 'ArrowLeft' && dir[0] !== 1) setDir([-1, 0]);
            if (e.key === 'ArrowRight' && dir[0] !== -1) setDir([1, 0]);
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [dir]);

    useEffect(() => {
        if (!gameOver) {
            gameLoopRef.current = setInterval(moveSnake, 150);
        }
        return () => clearInterval(gameLoopRef.current);
    }, [moveSnake, gameOver]);

    return (
        <div className="snake-arena fade-in">
            <div className="snake-hud">
                <div className="hud-left">
                    <h2>NEON COBRA</h2>
                    <span className="nokia-mode">1100 CLASSIC MODE</span>
                </div>
                <div className="hud-right">
                    <div className="score-box">SCORE: {score}</div>
                    <button className="exit-btn" onClick={onExit}>EXIT</button>
                </div>
            </div>

            <div className="grid-container">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(s => s[0] === x && s[1] === y);
                    const isHead = snake[0][0] === x && snake[0][1] === y;
                    const isFood = food[0] === x && food[1] === y;

                    return (
                        <div key={i} className={`cell ${isSnake ? 'snake' : ''} ${isHead ? 'head' : ''} ${isFood ? 'food' : ''}`} />
                    );
                })}
            </div>

            {gameOver && (
                <div className="game-over-overlay glass-panel">
                    <h1>GAME OVER</h1>
                    <p>YOUR FINAL SCORE: {score}</p>
                    <button className="restart-btn" onClick={() => window.location.reload()}>REBOOT SYSTEM</button>
                </div>
            )}
        </div>
    );
}