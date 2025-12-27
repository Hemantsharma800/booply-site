import React, { useState, useEffect, useCallback } from 'react';
import './booplyblast.css';

const BOARD_SIZE = 8;
const CANDY_TYPES = ['🍭', '🍬', '🍩', '🧁', '🍪', '🍫'];
const CANDY_COLORS = ['#ff00de', '#00f2ff', '#bc13fe', '#39ff14', '#ffd700', '#ff4757'];

export default function BooplyBlast({ onExit, onCorrectClick }) {
    const [board, setBoard] = useState([]);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);

    // 🏗️ Initialize Vibrant Board
    const createBoard = () => {
        const newBoard = [];
        for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
            const randomType = Math.floor(Math.random() * CANDY_TYPES.length);
            newBoard.push({
                id: i,
                type: CANDY_TYPES[randomType],
                color: CANDY_COLORS[randomType]
            });
        }
        setBoard(newBoard);
    };

    useEffect(() => createBoard(), []);

    // 🔍 Match Detection
    const checkMatches = useCallback(() => {
        let newBoard = [...board];
        let matched = false;

        // Simple horizontal check for 3+
        for (let i = 0; i < 64; i++) {
            if (i % 8 < 6) {
                if (board[i]?.type === board[i + 1]?.type && board[i]?.type === board[i + 2]?.type) {
                    newBoard[i] = newBoard[i + 1] = newBoard[i + 2] = { type: '', color: '' };
                    matched = true;
                }
            }
        }

        if (matched) {
            setBoard(newBoard);
            setScore(s => s + 10);
            if (onCorrectClick) onCorrectClick(); // Award Star
            setTimeout(refillBoard, 300);
        }
    }, [board, onCorrectClick]);

    const refillBoard = () => {
        setBoard(prev => prev.map(cell => {
            if (cell.type === '') {
                const randomType = Math.floor(Math.random() * CANDY_TYPES.length);
                return { ...cell, type: CANDY_TYPES[randomType], color: CANDY_COLORS[randomType] };
            }
            return cell;
        }));
    };

    useEffect(() => {
        const timer = setTimeout(checkMatches, 500);
        return () => clearTimeout(timer);
    }, [board, checkMatches]);

    const handleSwap = (index) => {
        if (!selected) {
            setSelected(index);
        } else {
            const newBoard = [...board];
            const temp = newBoard[selected];
            newBoard[selected] = newBoard[index];
            newBoard[index] = temp;
            setBoard(newBoard);
            setSelected(null);
        }
    };

    return (
        <div className="blast-container fade-in">
            <div className="blast-hud">
                <button className="back-btn" onClick={onExit}>◀ EXIT</button>
                <div className="score-glow">SCORE: {score}</div>
                <div className="target-goal">GOAL: MATCH 3</div>
            </div>

            <div className="puzzle-board">
                {board.map((cell, i) => (
                    <div
                        key={i}
                        className={`candy-cell ${selected === i ? 'active-pulse' : ''}`}
                        style={{ '--candy-color': cell.color }}
                        onClick={() => handleSwap(i)}
                    >
                        {cell.type}
                    </div>
                ))}
            </div>
        </div>
    );
}