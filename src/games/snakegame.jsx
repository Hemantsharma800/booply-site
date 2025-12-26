import React, { useState, useEffect, useCallback, useRef } from 'react';
import './snakegame.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[10, 10], [10, 11], [10, 12]];

export default function SnakeGame({ onExit, onCorrectClick }) {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState([5, 5]);
    const [dir, setDir] = useState([0, -1]); // Initial Direction: Up
    const [gameOver, setGameOver] = useState(false);
    const gameLoopRef = useRef();

    const moveSnake = useCallback(() => {
        if (gameOver) return;

        const newSnake = [...snake];
        const head = [newSnake[0][0] + dir[0], newSnake[0][1] + dir[1]];

        // Wall & Self Collision
        if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE ||
            newSnake.some(s => s[0] === head[0] && s[1] === head[1])) {
            setGameOver(true);
            return;
        }

        newSnake.unshift(head);

        if (head[0] === food[0] && head[1] === food[1]) {
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
        gameLoopRef.current = setInterval(moveSnake, 150);
        return () => {
            window.removeEventListener('keydown', handleKeys);
            clearInterval(gameLoopRef.current);
        };
    }, [moveSnake, dir]);

    return (
        <div className="snake-arena">
            <div className="snake-hud">
                <h2>NEON COBRA</h2>
                <button onClick={onExit} className="exit-btn">EXIT</button>
            </div>
            <div className="grid-container">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(s => s[0] === x && s[1] === y);
                    const isFood = food[0] === x && food[1] === y;
                    return <div key={i} className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`} />;
                })}
            </div>
            {gameOver && <div className="game-over-ui"><h1>SYSTEM FAILURE</h1><button onClick={() => window.location.reload()}>REBOOT</button></div>}
        </div>
    );
}