import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './chess.css';

const ChessGame = () => {
    const { roomId } = useParams();
    const [gameMode, setGameMode] = useState(null); // 'ai' or 'multiplayer'
    const [shareLink, setShareLink] = useState('');

    useEffect(() => {
        if (roomId) {
            setGameMode('multiplayer'); // If link is shared, join multiplayer immediately
        }
    }, [roomId]);

    const startMultiplayer = () => {
        const id = Math.random().toString(36).substring(2, 9);
        const link = `${window.location.origin}/chess/${id}`;
        setShareLink(link);
        setGameMode('multiplayer');
        // Navigate to the unique room link
        window.history.pushState({}, '', `/chess/${id}`);
    };

    return (
        <div className="chess-container neon-theme">
            {!gameMode && (
                <div className="elite-popup fade-in">
                    <h2>CHOOSE YOUR CHALLENGE</h2>
                    <div className="popup-buttons">
                        <button onClick={() => setGameMode('ai')} className="neon-btn-blue">PLAY VS AI</button>
                        <button onClick={startMultiplayer} className="neon-btn-purple">MULTIPLAYER</button>
                    </div>
                </div>
            )}

            {shareLink && (
                <div className="invite-overlay">
                    <p>Share this link with your opponent:</p>
                    <input readOnly value={shareLink} onClick={(e) => e.target.select()} />
                </div>
            )}

            <div className="chess-board-wrapper">
                {/* Neon Board Rendering Here */}
                <div className="neon-board">
                    {/* Logic for 8x8 squares with neon borders */}
                </div>
            </div>
        </div>
    );
};

export default ChessGame;