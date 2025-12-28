import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useChessLogic } from './chesslogic';
import { Link } from 'react-router-dom';
import './chess.css';

function ChessGame() {
    const [mode, setMode] = useState(null);
    const { fen, onDrop, timeLeft, turn } = useChessLogic(mode);

    return (
        <div className="chess-table-env">
            <Link to="/" className="back-btn">← exit</Link>

            {!mode ? (
                <div className="menu-overlay">
                    <h1 className="neon-title">booply pro chess</h1>
                    <button onClick={() => setMode('ai')} className="neon-btn">play vs ai</button>
                </div>
            ) : (
                <div className="game-layout">
                    <div className={`timer-ring ${timeLeft < 10 ? 'urgent' : ''}`}>
                        {timeLeft}s
                    </div>
                    <div className="neon-board-container">
                        <Chessboard
                            position={fen}
                            onPieceDrop={onDrop}
                            animationDuration={300} // makes piece movement smooth
                            customDarkSquareStyle={{ backgroundColor: '#0a0a1a' }}
                            customLightSquareStyle={{ backgroundColor: '#1a1a4e' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChessGame;