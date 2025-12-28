import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './chess.css';

function ChessGame() {
    const { roomId } = useParams(); // Detects link like booply.vercel.app/chess/room-123
    const navigate = useNavigate();
    const [gameMode, setGameMode] = useState(roomId ? 'multiplayer' : null);
    const [status, setStatus] = useState("Initializing Table...");

    // Generate a random link for Multiplayer
    const createRoom = () => {
        const newRoomId = Math.random().toString(36).substring(7);
        navigate(`/chess/${newRoomId}`);
        setGameMode('multiplayer');
    };

    return (
        <div className="chess-table-env">
            <Link to="/" className="exit-btn">← LEAVE TABLE</Link>

            {!gameMode ? (
                <div className="table-selection">
                    <h1 className="neon-text">SELECT YOUR TABLE</h1>
                    <div className="table-options">
                        <button onClick={() => setGameMode('ai')} className="table-card ai">
                            <span className="glow-icon">🤖</span>
                            <h3>VS STOCKFISH AI</h3>
                        </button>
                        <button onClick={createRoom} className="table-card pvp">
                            <span className="glow-icon">🌐</span>
                            <h3>ONLINE MULTIPLAYER</h3>
                            <p>Creates a shareable invite link</p>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="active-game-env">
                    <div className="game-sidebar">
                        <div className="status-monitor">{roomId ? `ROOM: ${roomId}` : 'MODE: AI'}</div>
                        {gameMode === 'multiplayer' && (
                            <div className="invite-box">
                                <p>Share this link to invite opponent:</p>
                                <input readOnly value={window.location.href} onClick={(e) => e.target.select()} />
                            </div>
                        )}
                    </div>

                    <div className="chess-table-surface">
                        {/* The Chess Board Graphic Frame */}
                        <div className="neon-board-frame">
                            <div id="chessboard-visual">
                                {/* Board graphics and pieces would be rendered here */}
                                <div className="loading-board">SETTING UP PIECES...</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChessGame;