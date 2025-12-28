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

    // 🕒 30s Master Timer for both sides
    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(30);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleTimeout();
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
    }, [game]);

    const handleTimeout = () => {
        // Force turn swipe if player or AI takes > 30s
        makeRandomMove();
    };

    const makeRandomMove = useCallback(() => {
        const moves = game.moves();
        if (moves.length === 0) return;
        const move = moves[Math.floor(Math.random() * moves.length)];
        const newGame = new Chess(game.fen());
        newGame.move(move);
        setGame(newGame);
        resetTimer();
    }, [game, resetTimer]);

    // 🤖 AI Logic: Automates Black Turn
    useEffect(() => {
        if (gameMode === 'ai' && game.turn() === 'b' && !game.isGameOver()) {
            // AI responds within its 30s limit (with a 1.2s thinking delay for realism)
            const aiDelay = setTimeout(makeRandomMove, 1200);
            return () => clearTimeout(aiDelay);
        }
    }, [game.turn(), gameMode, makeRandomMove]);

    useEffect(() => {
        resetTimer();
        return () => clearInterval(timerRef.current);
    }, [game.turn(), resetTimer]);

    // ♟️ Fix: Prevents pieces from snapping back
    function onDrop(sourceSquare, targetSquare) {
        try {
            const gameCopy = new Chess(game.fen());
            const move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q',
            });

            if (move === null) return false;

            setGame(gameCopy); // Lock the piece in its new position
            resetTimer();
            return true;
        } catch (e) {
            return false;
        }
    }

    return (
        <div className="chess-table-env">
            <Link to="/" className="exit-btn">← LEAVE TABLE</Link>

            {!gameMode ? (
                <div className="table-menu">
                    <h1 className="neon-text-main">ELITE CHESS</h1>
                    <div className="mode-grid">
                        <button onClick={() => setGameMode('ai')} className="neon-card cyan">VS AI</button>
                        <button onClick={() => setGameMode('multiplayer')} className="neon-card pink">MULTIPLAYER</button>
                    </div>
                </div>
            ) : (
                <div className="board-active-env">
                    <div className="hud-header">
                        <div className={`neon-timer ${timeLeft < 10 ? 'critical' : ''}`}>
                            {timeLeft}s
                        </div>
                        <div className="turn-label">
                            {game.turn() === 'w' ? 'PLAYER TURN' : 'AI TURN'}
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