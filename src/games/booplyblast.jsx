import React, { useState, useEffect, useCallback, useRef } from 'react';
import './booplyblast.css';

const BOARD_SIZE = 8;
const CANDIES = ['🍭', '🍬', '🍩', '🧁', '🍪', '🍫'];
const NEON_PALETTE = ['#00f2ff', '#bc13fe', '#ff00de', '#39ff14', '#ffd700', '#ff4757'];

export default function BooplyBlast({ onExit, onCorrectClick }) {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(20);
    const [board, setBoard] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // 📈 PROCEDURAL TARGET: Grows 40% every level
    const targetScore = Math.floor(200 * Math.pow(1.4, level - 1));

    // 🏗️ BOARD GENERATOR: Procedural and vibrant
    const createBoard = useCallback(() => {
        const newBoard = Array.from({ length: 64 }, (_, i) => {
            const idx = Math.floor(Math.random() * CANDIES.length);
            return { id: i, type: CANDIES[idx], color: NEON_PALETTE[idx], isMatched: false };
        });
        setBoard(newBoard);
    }, []);

    useEffect(() => createBoard(), [createBoard]);

    // 🏆 AUTOMATIC LEVEL ADVANCEMENT
    useEffect(() => {
        if (score >= targetScore && !showPopup) {
            setShowPopup(true);
            if (onCorrectClick) onCorrectClick(); // Reward Bonus Stars

            setTimeout(() => {
                setLevel(prev => prev + 1);
                setScore(0);
                setMoves(Math.max(10, 20 - Math.floor(level / 2))); // Scaling Difficulty
                setShowPopup(false);
                createBoard();
            }, 3000);
        }
    }, [score, targetScore, showPopup, level, createBoard, onCorrectClick]);

    const handleCellClick = (index) => {
        if (showPopup) return;
        if (selected === null) {
            setSelected(index);
        } else {
            // ⚔️ SWAP LOGIC
            const newBoard = [...board];
            const temp = newBoard[selected];
            newBoard[selected] = newBoard[index];
            newBoard[index] = temp;

            setBoard(newBoard);
            setSelected(null);
            setMoves(m => m - 1);
            setScore(s => s + 25); // Simulated scoring for match
        }
    };

    return (
        <div className="blast-engine-root" style={{ '--level-hue': `${level * 45}deg` }}>
            {/* 📊 ELITE HUD */}
            <div className="blast-hud-pro">
                <button className="exit-arcade" onClick={onExit}>EXIT ARCADE</button>
                <div className="hud-stats-group">
                    <div className="hud-pill">LEVEL <span>{level}</span></div>
                    <div className="hud-pill progress">GOAL <span>{score}/{targetScore}</span></div>
                    <div className="hud-pill highlight">MOVES <span>{moves}</span></div>
                </div>
            </div>

            <div className="board-zone">
                <div className="board-frame-glass">
                    {board.map((cell, i) => (
                        <div
                            key={i}
                            className={`candy-unit ${selected === i ? 'unit-active' : ''}`}
                            style={{ '--neon': cell.color }}
                            onClick={() => handleCellClick(i)}
                        >
                            <span className="candy-icon">{cell.type}</span>
                            <div className="glow-effect"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🎊 CONGRATS POPUP */}
            {showPopup && (
                <div className="congrats-modal fade-in">
                    <div className="modal-content">
                        <h1 className="rainbow-text">ELITE WORK!</h1>
                        <p>LEVEL {level} COMPLETED</p>
                        <div className="next-level-ring">
                            <span>NEXT</span>
                            <strong>{level + 1}</strong>
                        </div>
                        <small>REGENERATING BOARD...</small>
                    </div>
                </div>
            )}
        </div>
    );
}