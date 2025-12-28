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

    // 🤖 Basic AI Logic (Random Move for now)
    const makeRandomMove = useCallback(() => {
        const possibleMoves = game.moves();
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        const newGame = new Chess(game.fen());
        newGame.move(possibleMoves[randomIndex]);
        setGame(newGame);
    }, [game]);

    // Trigger AI move if it's black's turn and mode is AI
    useEffect(() => {
        if (gameMode === 'ai' && game.turn() === 'b') {
            setTimeout(makeRandomMove, 500);
        }
    }, [game, gameMode, makeRandomMove]);

    function onDrop(sourceSquare, targetSquare) {
        try {
            const move = game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
            if (move === null) return false;
            setGame(new Chess(game.fen()));
            return true;
        } catch (e) { return false; }
    }

    const createRoom = () => {
        const id = Math.random().toString(36).substring(7);
        navigate(`/chess/${id}`);
        setGameMode('multiplayer');
    };

    return (
        <div className="chess-table-env">
            <Link to="/" className="exit-btn">← LEAVE TABLE</Link>

            {!gameMode ? (
                <div className="table-selection">
                    <h1 className="neon-title">ELITE CHESS</h1>
                    <div className="button-group">
                        <button onClick={() => setGameMode('ai')} className="mode-btn ai">VS COMPUTER</button>
                        <button onClick={createRoom} className="mode-btn pvp">MULTIPLAYER</button>
                    </div>
                </div>
            ) : (
                <div className="game-layout">
                    <div className="game-status-bar">
                        <span>MODE: {gameMode === 'ai' ? 'AI' : `ROOM ${roomId}`}</span>
                        <span>TURN: {game.turn() === 'w' ? 'White' : 'Black'}</span>
                    </div>

                    <div className="neon-board-container">
                        <Chessboard
                            position={game.fen()}
                            onPieceDrop={onDrop}
                            boardOrientation="white"
                            customDarkSquareStyle={{ backgroundColor: '#050508' }}
                            customLightSquareStyle={{ backgroundColor: '#1a1a2e' }}
                        />
                    </div>

                    {gameMode === 'multiplayer' && (
                        <div className="invite-section">
                            <p>Share Link to Play:</p>
                            <input readOnly value={window.location.href} onClick={(e) => e.target.select()} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ChessGame;