import React, { useState, useEffect, useCallback } from 'react';
import './booplyblast.css';

const BOARD_SIZE = 8;
const CANDIES = ['🍭', '🍬', '🍩', '🧁', '🍪', '🍫'];
const NEONS = ['#ff00de', '#00f2ff', '#bc13fe', '#39ff14', '#ffd700', '#ff4757'];

export default function BooplyBlast({ onExit, onCorrectClick }) {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [board, setBoard] = useState([]);
    const [selected, setSelected] = useState(null);
    const [motivation, setMotivation] = useState("");
    const [popup, setPopup] = useState(false);

    const targetScore = Math.floor(200 * Math.pow(1.3, level - 1));

    // 🏗️ INITIAL BOARD GENERATION
    const createBoard = useCallback(() => {
        const newBoard = Array.from({ length: 64 }, (_, i) => {
            const r = Math.floor(Math.random() * CANDIES.length);
            return { id: Math.random(), type: CANDIES[r], color: NEONS[r], isBursting: false };
        });
        setBoard(newBoard);
    }, []);

    useEffect(() => createBoard(), [createBoard]);

    // 🧠 BURST & REFILL LOGIC
    const processMatches = useCallback(() => {
        let matchedIndices = new Set();

        // Horizontal & Vertical Scan
        for (let i = 0; i < 64; i++) {
            const row = Math.floor(i / 8);
            const col = i % 8;
            // Horizontal 3+
            if (col < 6 && board[i].type === board[i + 1].type && board[i].type === board[i + 2].type) {
                matchedIndices.add(i); matchedIndices.add(i + 1); matchedIndices.add(i + 2);
            }
            // Vertical 3+
            if (row < 6 && board[i].type === board[i + 8].type && board[i].type === board[i + 16].type) {
                matchedIndices.add(i); matchedIndices.add(i + 8); matchedIndices.add(i + 16);
            }
        }

        if (matchedIndices.size > 0) {
            // 1. Show Motivation
            const lines = ["NICE!", "AWESOME!", "STELLAR!", "BOOPLY BLAST!", "GENIUS!"];
            setMotivation(matchedIndices.size > 4 ? "UNBELIEVABLE!" : lines[Math.floor(Math.random() * lines.length)]);

            // 2. Burst Animation
            const burstBoard = [...board];
            matchedIndices.forEach(idx => burstBoard[idx] = { ...burstBoard[idx], isBursting: true });
            setBoard(burstBoard);

            // 3. Gravity & Refill (After 400ms)
            setTimeout(() => {
                let nextBoard = [...board];
                matchedIndices.forEach(idx => nextBoard[idx] = null);

                // Drop items down
                for (let c = 0; c < 8; c++) {
                    let column = [];
                    for (let r = 0; r < 8; r++) {
                        if (nextBoard[r * 8 + c]) column.push(nextBoard[r * 8 + c]);
                    }
                    while (column.length < 8) {
                        const rIdx = Math.floor(Math.random() * CANDIES.length);
                        column.unshift({ id: Math.random(), type: CANDIES[rIdx], color: NEONS[rIdx] });
                    }
                    for (let r = 0; r < 8; r++) nextBoard[r * 8 + c] = column[r];
                }

                setBoard(nextBoard);
                setScore(s => s + (matchedIndices.size * 10));
                setMotivation("");
                if (onCorrectClick) onCorrectClick();
            }, 500);
        }
    }, [board, onCorrectClick]);

    useEffect(() => {
        const timer = setTimeout(processMatches, 600);
        return () => clearTimeout(timer);
    }, [board, processMatches]);

    // Level progression check
    useEffect(() => {
        if (score >= targetScore && !popup) {
            setPopup(true);
            setTimeout(() => {
                setLevel(l => l + 1); setScore(0); setPopup(false); createBoard();
            }, 2500);
        }
    }, [score, targetScore, popup, level, createBoard]);

    const handleSwap = (idx) => {
        if (selected === null) setSelected(idx);
        else {
            const newBoard = [...board];
            [newBoard[selected], newBoard[idx]] = [newBoard[idx], newBoard[selected]];
            setBoard(newBoard);
            setSelected(null);
        }
    };

    return (
        <div className="blast-pro-root" style={{ '--level-hue': `${level * 60}deg` }}>
            <div className="animated-nebula"></div>

            <div className="blast-hud-vibrant">
                <button className="exit-arcade" onClick={onExit}>EXIT</button>
                <div className="stats-panel">
                    <div className="stat">LVL <span>{level}</span></div>
                    <div className="stat">GOAL <span>{score}/{targetScore}</span></div>
                </div>
            </div>

            {motivation && <div className="motivation-text fade-up">{motivation}</div>}

            <div className="puzzle-container">
                <div className="neon-grid">
                    {board.map((cell, i) => (
                        <div
                            key={cell?.id || i}
                            className={`candy-box ${selected === i ? 'pulse' : ''} ${cell?.isBursting ? 'burst' : ''}`}
                            style={{ '--neon': cell?.color }}
                            onClick={() => handleSwap(i)}
                        >
                            <span className="candy-icon">{cell?.type}</span>
                        </div>
                    ))}
                </div>
            </div>

            {popup && (
                <div className="congrats-screen fade-in">
                    <div className="glass-card">
                        <h1 className="rainbow-glow">LEVEL {level} DONE!</h1>
                        <div className="next-tag">NEXT: LEVEL {level + 1}</div>
                    </div>
                </div>
            )}
        </div>
    );
}