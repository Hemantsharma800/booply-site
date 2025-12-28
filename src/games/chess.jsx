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
        const moves = game.moves();
        if (moves.length > 0) {
            const move = moves[Math.floor(Math.random() * moves.length)];
            makeAMove(move);
        }
    };

    // ⚙️ This function locks the piece in place and prevents "Snapping Back"
    function makeAMove(move) {
        const gameCopy = new Chess(game.fen());
        const result = gameCopy.move(move);
        if (result) {
            setGame(gameCopy); // Lock the new state
            resetTimer();
            return true;
        }
        return false;
    }

    function onDrop(sourceSquare, targetSquare) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q',
        });
        return move;
    }

    // 🤖 AI Turn Logic
    useEffect(() => {
        if (gameMode === 'ai' && game.turn() === 'b' && !game.isGameOver()) {
            const moves = game.moves();
            if (moves.length > 0) {
                setTimeout(() => {
                    const move = moves[Math.floor(Math.random() * moves.length)];
                    makeAMove(move);
                }, 1200); // AI thinks for 1.2s then moves
            }
        }
    }, [game.turn(), gameMode]);

    useEffect(() => {
        resetTimer();
        return () => clearInterval(timerRef.current);
    }, [game.turn(), resetTimer]);

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
                        <div className={`neon-timer ${timeLeft < 10 ? 'critical' : ''}`}>{timeLeft}s</div>
                        <div className="turn-label">{game.turn() === 'w' ? 'PLAYER TURN' : 'AI TURN'}</div>
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