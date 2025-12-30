import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useChessLogic } from './chesslogic';
import './chess.css';

function ChessGame() {
    const [mode, setMode] = useState(null);
    const { fen, onDrop, timeLeft, turn } = useChessLogic(mode);

    return (
        <div className="chess-table-env">
            {!mode ? (
                <div className="menu-overlay">
                    <h1 className="neon-title">ELITE CHESS</h1>
                    <button onClick={() => setMode('ai')} className="neon-btn">PRO AI MODE</button>
                </div>
            ) : (
                <div className="game-layout">
                    <div className="hud">
                        <div className={`timer ${timeLeft < 10 ? 'urgent' : ''}`}>{timeLeft}s</div>
                        <div className="turn-label">{turn === 'w' ? 'WHITE' : 'BLACK'} TURN</div>
                    </div>
                    {/* Responsive Board Frame */}
                    <div className="neon-board-container">
                        <Chessboard
                            position={fen}
                            onPieceDrop={onDrop}
                            animationDuration={300}
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