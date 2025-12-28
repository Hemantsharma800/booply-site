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
                <div className="selection-menu">
                    <h1 className="neon-title">elite chess</h1>
                    <button onClick={() => setMode('ai')} className="neon-btn">vs computer</button>
                </div>
            ) : (
                <div className="active-board">
                    <div className={`timer ${timeLeft < 10 ? 'red-glow' : ''}`}>{timeLeft}s</div>
                    <div className="neon-board-container">
                        <Chessboard
                            position={fen}
                            onPieceDrop={onDrop}
                            animationDuration={350}
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