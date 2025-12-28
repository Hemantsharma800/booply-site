import React, { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Link, useParams } from 'react-router-dom';
import './chess.css';

function ChessGame() {
    const { roomId } = useParams();
    const [game, setGame] = useState(new Chess());
    const [gameMode, setGameMode] = useState(roomId ? 'multiplayer' : null);

    // 🤖 AI Logic: Automatically moves for Black if in AI mode
    const makeAiMove = useCallback(() => {
        if (game.isGameOver()) return;
        const moves = game.moves();
        if (moves.length === 0) return;

        const move = moves[Math.floor(Math.random() * moves.length)];
        const newGame = new Chess(game.fen());
        newGame.move(move);
        setGame(newGame);
    }, [game]);

    useEffect(() => {
        if (gameMode === 'ai' && game.turn() === 'b') {
            setTimeout(makeAiMove, 600);
        }
    }, [game, gameMode, makeAiMove]);

    // ♟️ This function enables movement for your pieces
    function onDrop(sourceSquare, targetSquare) {
        try {
            const move = game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
            if (move === null) return false; // Invalid move

            setGame(new Chess(game.fen()));
            return true;
        } catch (e) { return false; }
    }

    return (
        <div className="chess-table-container">
            <Link to="/" className="leave-btn">← EXIT ARCADE</Link>

            {!gameMode ? (
                <div className="selection-screen">
                    <h1 className="neon-title">ELITE CHESS</h1>
                    <div className="btn-group">
                        <button onClick={() => setGameMode('ai')} className="neon-btn blue">PLAY AI</button>
                        <button onClick={() => setGameMode('multiplayer')} className="neon-btn purple">MULTIPLAYER</button>
                    </div>
                </div>
            ) : (
                <div className="active-table">
                    <div className="table-header">
                        <span className="badge">{gameMode.toUpperCase()}</span>
                        <span className="turn-indicator">TURN: {game.turn() === 'w' ? 'WHITE' : 'BLACK'}</span>
                    </div>

                    <div className="neon-board-wrapper">
                        <Chessboard
                            position={game.fen()}
                            onPieceDrop={onDrop}
                            boardOrientation="white"
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