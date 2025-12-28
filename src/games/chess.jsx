import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Link, useParams } from 'react-router-dom';
import './chess.css';

function ChessGame() {
    const { roomId } = useParams();
    const [game, setGame] = useState(new Chess());
    const [gameMode, setGameMode] = useState(roomId ? 'multiplayer' : null);
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef(null);

    // 🕒 Master Timer: Handles 30s for BOTH players
    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(30);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleTimeout(); // Swipes turn automatically
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
    }, [game]);

    const handleTimeout = () => {
        const moves = game.moves();
        if (moves.length > 0) {
            const move = moves[Math.floor(Math.random() * moves.length)];
            safeGameMutate((g) => { g.move(move); });
        }
    };

    // 🔩 Helper to update game state without snapping back
    function safeGameMutate(modify) {
        setGame((g) => {
            const update = new Chess(g.fen());
            modify(update);
            return update;
        });
    }

    // 🤖 AI Opponent: Also bound by the 30s rule
    const makeAiMove = useCallback(() => {
        if (game.isGameOver()) return;
        const moves = game.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];

        // AI moves after a slight delay for realism, but within its 30s limit
        setTimeout(() => {
            safeGameMutate((g) => { g.move(move); });
            resetTimer();
        }, 1200);
    }, [game, resetTimer]);

    useEffect(() => {
        if (gameMode === 'ai' && game.turn() === 'b') {
            makeAiMove();
        }
    }, [game.turn(), gameMode, makeAiMove]);

    useEffect(() => {
        resetTimer();
        return () => clearInterval(timerRef.current);
    }, [game.turn(), resetTimer]);

    // ♟️ Movement Function: Fixes the "Snap Back" error
    function onDrop(sourceSquare, targetSquare) {
        let move = null;
        safeGameMutate((g) => {
            move = g.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q',
            });
        });

        if (move === null) return false; // Invalid move
        resetTimer();
        return true;
    }

    return (
        <div className="chess-table-container">
            <Link to="/" className="leave-btn">← LEAVE TABLE</Link>

            {!gameMode ? (
                <div className="selection-overlay">
                    <h1 className="neon-title">PRO CHESS</h1>
                    <div className="btn-row">
                        <button onClick={() => setGameMode('ai')} className="neon-btn blue">VS AI</button>
                        <button onClick={() => setGameMode('multiplayer')} className="neon-btn purple">MULTIPLAYER</button>
                    </div>
                </div>
            ) : (
                <div className="active-table">
                    <div className="hud">
                        <div className={`timer-ring ${timeLeft < 10 ? 'urgent' : ''}`}>
                            {timeLeft}s
                        </div>
                        <div className="turn-badge">
                            {game.turn() === 'w' ? '⚪ PLAYER TURN' : '⚫ AI TURN'}
                        </div>
                    </div>

                    <div className="neon-board-frame">
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