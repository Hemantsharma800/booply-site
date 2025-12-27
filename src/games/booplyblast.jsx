import React, { useState, useEffect, useCallback } from 'react';
import './booplyblast.css';

const BOARD_SIZE = 8;
const LEVEL_CONFIG = [
    { level: 1, target: 100, moves: 20, theme: '#00f2ff', difficulty: 'Easy Addition' },
    { level: 2, target: 250, moves: 18, theme: '#bc13fe', difficulty: 'Fast Addition' },
    { level: 3, target: 500, moves: 15, theme: '#ffd700', difficulty: 'Subtraction' },
];

export default function BooplyBlast({ onExit, onCorrectClick }) {
    const [board, setBoard] = useState([]);
    const [stats, setStats] = useState({ level: 0, score: 0, moves: LEVEL_CONFIG[0].moves });
    const [selected, setSelected] = useState(null);
    const [showLevelUp, setShowLevelUp] = useState(false);

    // Initialize/Reset Board
    const initBoard = useCallback(() => {
        const types = ['🍭', '🍬', '🍩', '🧁', '🍪', '🍫'];
        const colors = ['#ff00de', '#00f2ff', '#bc13fe', '#39ff14', '#ffd700', '#ff4757'];
        let newBoard = Array.from({ length: 64 }, (_, i) => {
            const r = Math.floor(Math.random() * types.length);
            return { id: i, type: types[r], color: colors[r] };
        });
        setBoard(newBoard);
    }, []);

    useEffect(() => initBoard(), [initBoard]);

    // Level Progression Logic
    const checkProgress = useCallback(() => {
        const currentCfg = LEVEL_CONFIG[stats.level];
        if (stats.score >= currentCfg.target && stats.level < LEVEL_CONFIG.length - 1) {
            setShowLevelUp(true);
            setTimeout(() => {
                setStats(prev => ({
                    ...prev,
                    level: prev.level + 1,
                    moves: LEVEL_CONFIG[prev.level + 1].moves
                }));
                setShowLevelUp(false);
                initBoard();
            }, 2000);
        }
    }, [stats.score, stats.level, initBoard]);

    // Match Engine
    const handleMatch = useCallback((matches) => {
        setStats(prev => ({ ...prev, score: prev.score + matches.length * 10, moves: prev.moves - 1 }));
        if (onCorrectClick) onCorrectClick(); // Reward Star
        checkProgress();
    }, [onCorrectClick, checkProgress]);

    // Simplified Match Check
    useEffect(() => {
        const timer = setTimeout(() => {
            let matches = [];
            // Horizontal check
            for (let i = 0; i < 64; i++) {
                if (i % 8 < 6 && board[i]?.type === board[i + 1]?.type && board[i]?.type === board[i + 2]?.type) {
                    matches.push(i, i + 1, i + 2);
                }
            }
            if (matches.length > 0) {
                handleMatch([...new Set(matches)]);
                // Refill logic would go here
            }
        }, 400);
        return () => clearTimeout(timer);
    }, [board, handleMatch]);

    const activeTheme = LEVEL_CONFIG[stats.level].theme;

    return (
        <div className="blast-pro-root" style={{ '--level-color': activeTheme }}>
            <div className="vibrant-bg-glow"></div>

            <div className="blast-header-elite">
                <button className="back-btn-glass" onClick={onExit}>EXIT ARCADE</button>
                <div className="stats-center">
                    <div className="stat-pill">LEVEL <span>{stats.level + 1}</span></div>
                    <div className="stat-pill">SCORE <span>{stats.score}</span></div>
                    <div className="stat-pill highlight">MOVES <span>{stats.moves}</span></div>
                </div>
                <div className="target-pill">GOAL: {LEVEL_CONFIG[stats.level].target}</div>
            </div>

            <div className={`puzzle-stage ${showLevelUp ? 'level-up-blur' : ''}`}>
                <div className="grid-container-elite">
                    {board.map((cell, i) => (
                        <button
                            key={i}
                            className={`candy-unit ${selected === i ? 'pulse-select' : ''}`}
                            style={{ '--unit-color': cell.color }}
                            onClick={() => setSelected(i)}
                        >
                            <span className="emoji-layer">{cell.type}</span>
                            <div className="inner-glow"></div>
                        </button>
                    ))}
                </div>
            </div>

            {showLevelUp && (
                <div className="level-up-overlay fade-in">
                    <h1 className="shimmer-text">LEVEL COMPLETE!</h1>
                    <p>UNLOCKING {LEVEL_CONFIG[stats.level + 1].difficulty} MODE...</p>
                </div>
            )}
        </div>
    );
}