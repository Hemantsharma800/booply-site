import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './chess.css';

function ChessGame() {
    const { roomId } = useParams();
    const [gameMode, setGameMode] = useState(null); // 'ai', 'multiplayer', or null
    const [status, setStatus] = useState("Waiting for selection...");

    // If a roomId exists in the URL, automatically set mode to multiplayer
    useEffect(() => {
        if (roomId) {
            setGameMode('multiplayer');
            setStatus(`Joined Room: ${roomId}`);
        }
    }, [roomId]);

    const handleSelection = (mode) => {
        setGameMode(mode);
        setStatus(mode === 'ai' ? "Playing against Stockfish AI" : "Searching for opponents...");
    };

    return (
        <div className="chess-page-wrapper">
            {/* 🔙 Neon Back Button */}
            <Link to="/" className="neon-back-btn">
                <span className="arrow">←</span> BACK TO ARCADE
            </Link>

            <div className="chess-main-content">
                {!gameMode ? (
                    /* 🏠 Mode Selection Screen */
                    <div className="mode-selection-overlay">
                        <h1 className="neon-title">ELITE CHESS</h1>
                        <p className="neon-subtitle">Select your challenge level</p>

                        <div className="button-group">
                            <button onClick={() => handleSelection('ai')} className="mode-btn ai-btn">
                                <div className="icon">🤖</div>
                                <h3>PLAY VS AI</h3>
                                <span>Challenge the computer</span>
                            </button>

                            <button onClick={() => handleSelection('multiplayer')} className="mode-btn pvp-btn">
                                <div className="icon">🌐</div>
                                <h3>MULTIPLAYER</h3>
                                <span>Battle players online</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    /* 🎮 Active Game Screen */
                    <div className="active-game-container">
                        <div className="game-info-panel">
                            <div className="status-badge">{status}</div>
                            <button onClick={() => setGameMode(null)} className="reset-btn">Change Mode</button>
                        </div>

                        <div className="chessboard-neon-frame">
                            {/* This is where your chessboard logic (like react-chessboard) integrates */}
                            <div id="board-placeholder">
                                <div className="loading-spinner"></div>
                                <p>INITIALIZING NEON BOARD...</p>
                            </div>
                        </div>

                        <div className="move-history">
                            <h4>MOVE LOG</h4>
                            <div className="log-entries">
                                <p>1. e4 ...</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChessGame;