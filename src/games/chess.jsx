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

    // 🕒 Timer Logic: Automatic Turn Swipe
    const startTimer = useCallback(() => {
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
        // Force turn swipe by making a random move if time runs out
        makeRandomMove();
    };

    const makeRandomMove = useCallback(() => {
        if (game.isGameOver()) return;
        const moves = game.moves();
        if (moves.length === 0) return;
        const move = moves[Math.floor(Math.random() * moves.length)];
        const newGame = new Chess(game.fen());
        newGame.move(move);
        setGame(newGame);
        startTimer();
    }, [game, startTimer]);

    // 🤖 AI Opponent for Black Turn
    useEffect(() => {
        if (gameMode === 'ai' && game.turn() === 'b') {
            const aiDelay = setTimeout(makeRandomMove, 800);
            return () => clearTimeout(aiDelay);
        }
    }, [game.turn(), gameMode, makeRandomMove]);

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [game.turn(), startTimer]);

    // ♟️ Critical Movement Function: Enables "Soldier" Drag-and-Drop
    function onDrop(sourceSquare, targetSquare) {
        try {
            const move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q', // Always promote to queen for simplicity
            });

            if (move === null) return false;

            setGame(new Chess(game.fen()));
            startTimer();
            return true;
        } catch (e) {
            return false;
        }
    }

    return (
        <div className="chess-table-container">
            <Link to="/" className="leave-btn">← LEAVE TABLE</Link>

            {!gameMode ? (
                <div className="mode-overlay">
                    <h1 className="neon-text">ELITE CHESS</h1>
                    <div className="selection-btns">
                        <button onClick={() => setGameMode('ai')} className="neon-btn blue">VS AI</button>
                        <button onClick={() => setGameMode('multiplayer')} className="neon-btn purple">MULTIPLAYER</button>
                    </div>
                </div>
            ) : (
                <div className="active-table">
                    <div className="hud-display">
                        <div className={`timer-ring ${timeLeft < 10 ? 'urgent' : ''}`}>
                            {timeLeft}s
                        </div>
                        <div className="turn-status">
                            {game.turn() === 'w' ? '⚪ WHITE TURN' : '⚫ BLACK TURN'}
                        </div>
                    </div>

                    <div className="neon-table-frame">
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