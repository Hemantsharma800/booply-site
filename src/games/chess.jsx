import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Link, useParams } from 'react-router-dom';
import './chess.css';

function ChessGame() {
    const { roomId } = useParams();
    // useMemo prevents the engine from restarting on every click
    const game = useMemo(() => new Chess(), []);
    const [fen, setFen] = useState(game.fen());
    const [gameMode, setGameMode] = useState(roomId ? 'multiplayer' : null);
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef(null);

    // 🕒 30s Dual Timer: Handles Turn Swiping
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
    }, []);

    const handleTimeout = () => {
        const moves = game.moves();
        if (moves.length > 0) {
            const move = moves[Math.floor(Math.random() * moves.length)];
            game.move(move);
            setFen(game.fen());
        }
    };

    // 🤖 Professional AI Movement
    useEffect(() => {
        if (gameMode === 'ai' && game.turn() === 'b' && !game.isGameOver()) {
            const aiDelay = setTimeout(() => {
                const moves = game.moves();
                if (moves.length > 0) {
                    const move = moves[Math.floor(Math.random() * moves.length)];
                    game.move(move);
                    setFen(game.fen());
                    startTimer();
                }
            }, 1000);
            return () => clearTimeout(aiDelay);
        }
    }, [fen, gameMode, startTimer]);

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [fen, startTimer]);

    // ♟️ The Fix: Instant State Update to prevent Snapping
    function onDrop(sourceSquare, targetSquare) {
        try {
            const move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q',
            });

            if (move === null) return false;

            setFen(game.fen()); // Force immediate render
            startTimer();
            return true;
        } catch (e) {
            return false;
        }
    }

    return (
        <div className="chess-table-env">
            <Link to="/" className="exit-btn">← LEAVE TABLE</Link>

            {!gameMode ? (
                <div className="table-selection">
                    <h1 className="neon-text-pro">ELITE CHESS</h1>
                    <div className="grid-options">
                        <button onClick={() => setGameMode('ai')} className="neon-btn cyan">VS AI</button>
                        <button onClick={() => setGameMode('multiplayer')} className="neon-btn purple">MULTIPLAYER</button>
                    </div>
                </div>
            ) : (
                <div className="pro-active-env">
                    <div className="game-hud">
                        <div className={`neon-timer-ring ${timeLeft < 10 ? 'alert' : ''}`}>
                            {timeLeft}s
                        </div>
                        <div className="turn-indicator">
                            {game.turn() === 'w' ? '⚪ PLAYER' : '⚫ AI'} TURN
                        </div>
                    </div>

                    <div className="neon-board-frame">
                        <Chessboard
                            position={fen}
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