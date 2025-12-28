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
                <div className="start-menu">
                    <h1 className="neon-text">booply chess</h1>
                    <button onClick={() => setMode('ai')} className="neon-btn">play vs pro ai</button>
                </div>
            ) : (
                <div className="game-container">
                    <div className={`neon-timer ${timeLeft < 10 ? 'critical' : ''}`}>
                        {timeLeft}s
                    </div>
                    <div className="neon-board-wrapper">
                        <Chessboard
                            position={fen}
                            onPieceDrop={onDrop}
                            snapToCursor={false} // ensures piece snaps into the box, not cursor
                            animationDuration={300} // smoothing the movement
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