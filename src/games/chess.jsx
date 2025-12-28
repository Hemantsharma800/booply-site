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

    // 🕒 Timer Logic: Swipes turn after 30 seconds
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
        // If time runs out, we force a random move to "swipe" the turn
        makeRandomMove();
    };

    // 🤖 AI Engine: Plays for the Black side
    const makeRandomMove = useCallback(() => {
        if (game.isGameOver()) return;
        const possibleMoves = game.moves();
        if (possibleMoves.length === 0) return;

        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        const gameCopy = new Chess(game.fen());
        gameCopy.move(possibleMoves[randomIndex]);
        setGame(gameCopy);
        startTimer();
    }, [game, startTimer]);

    // Trigger AI and Timer
    useEffect(() => {
        startTimer();
        if (gameMode === 'ai' && game.turn() === 'b') {
            const aiDelay = setTimeout(makeRandomMove, 1000);
            return () => clearTimeout(aiDelay);
        }
        return () => clearInterval(timerRef.current);
    }, [game.turn(), gameMode, makeRandomMove, startTimer]);

    // ♟️ Movement Logic for "Soldiers"
    function onDrop(sourceSquare, targetSquare) {
        try {
            const move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q',
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
            <Link to="/" className="leave-btn">← EXIT TABLE</Link>

            {!gameMode ? (
                <div className="selection-overlay">
                    <h1 className="neon-title">ELITE CHESS</h1>
                    <div className="btn-row">
                        <button onClick={() => setGameMode('ai')} className="neon-btn blue">VS COMPUTER</button>
                        <button onClick={() => setGameMode('multiplayer')} className="neon-btn purple">MULTIPLAYER</button>
                    </div>
                </div>
            ) : (
                <div className="active-table">
                    <div className="game-hud">
                        <div className={`timer-circle ${timeLeft < 10 ? 'warning' : ''}`}>
                            {timeLeft}s
                        </div>
                        <div className="turn-badge">
                            {game.turn() === 'w' ? '⚪ WHITE TURN' : '⚫ BLACK TURN'}
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