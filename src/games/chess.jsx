import React, { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './chess.css';

function ChessGame() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(new Chess());
    const [gameMode, setGameMode] = useState(roomId ? 'multiplayer' : null);
    const [moveStatus, setMoveStatus] = useState("Your Turn");

    // 🤖 AI Opponent Logic
    const makeBestMove = useCallback(() => {
        if (game.isGameOver()) return;

        const possibleMoves = game.moves();
        if (possibleMoves.length === 0) return;

        // Simple AI: Picks a random valid move
        // You can later integrate Stockfish worker for "Grandmaster" level
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        const move = possibleMoves[randomIndex];

        const gameCopy = new Chess(game.fen());
        gameCopy.move(move);
        setGame(gameCopy);
        setMoveStatus("Your Turn");
    }, [game]);

    // Trigger AI move
    useEffect(() => {
        if (gameMode === 'ai' && game.turn() === 'b' && !game.isGameOver()) {
            setMoveStatus("AI is thinking...");
            const timer = setTimeout(makeBestMove, 1000);
            return () => clearTimeout(timer);
        }
    }, [game, gameMode, makeBestMove]);

    function onDrop(sourceSquare, targetSquare) {
        try {
            const move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q', // Always promote to queen for simplicity
            });

            if (move === null) return false;

            setGame(new Chess(game.fen()));
            return true;
        } catch (e) {
            return false;
        }
    }

    const startMultiplayer = () => {
        const id = Math.random().toString(36).substring(7);
        navigate(`/chess/${id}`);
        setGameMode('multiplayer');
    };

    return (
        <div className="chess-table-container">
            <Link to="/" className="leave-btn">← LEAVE TABLE</Link>

            {!gameMode ? (
                <div className="table-menu">
                    <h1 className="neon-text-multi">ELITE CHESS</h1>
                    <div className="menu-grid">
                        <button onClick={() => setGameMode('ai')} className="neon-card blue">
                            <span className="icon">🤖</span>
                            <h3>VS AI</h3>
                        </button>
                        <button onClick={startMultiplayer} className="neon-card purple">
                            <span className="icon">🌐</span>
                            <h3>MULTIPLAYER</h3>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="active-table">
                    <div className="game-meta">
                        <div className="badge">{gameMode === 'ai' ? '🤖 AI MODE' : `🌐 ROOM: ${roomId}`}</div>
                        <div className="status-text">{game.isGameOver() ? "GAME OVER" : moveStatus}</div>
                    </div>

                    <div className="board-neon-glow">
                        <Chessboard
                            position={game.fen()}
                            onPieceDrop={onDrop}
                            boardOrientation="white"
                            customDarkSquareStyle={{ backgroundColor: '#1a1a2e' }}
                            customLightSquareStyle={{ backgroundColor: '#2a2a4e' }}
                        />
                    </div>

                    {gameMode === 'multiplayer' && (
                        <div className="share-link">
                            <p>Invite Opponent:</p>
                            <input readOnly value={window.location.href} onClick={(e) => e.target.select()} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ChessGame;