import React, { useState, useEffect } from 'react';
import './MultiplayerCommon.css';

// This is the common engine for ALL online games
export default function MultiplayerHost({ gameId, gameComponent: GameContent, onExit, onCorrectClick }) {
    const [roomId, setRoomId] = useState(null);
    const [players, setPlayers] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('OFFLINE');

    // Simulation of connecting to a Socket.io or Firebase server
    const connectToServer = () => {
        setConnectionStatus('CONNECTING...');
        setTimeout(() => {
            const generatedRoom = Math.random().toString(36).substring(7).toUpperCase();
            setRoomId(generatedRoom);
            setPlayers(['You (Player 1)', 'Waiting for Friend...']);
            setConnectionStatus('ONLINE');
        }, 1500);
    };

    return (
        <div className="multiplayer-frame">
            <div className="status-bar">
                <button className="exit-btn" onClick={onExit}>🏠 Leave Room</button>
                <div className="room-info">
                    <span>ROOM: <b>{roomId || '----'}</b></span>
                    <span className={`dot ${connectionStatus.toLowerCase()}`}></span>
                    {connectionStatus}
                </div>
            </div>

            {!roomId ? (
                <div className="lobby-setup">
                    <h2>Ready for Online Play?</h2>
                    <p>Join a server to play with others!</p>
                    <button className="join-btn" onClick={connectToServer}>CREATE ONLINE ROOM</button>
                </div>
            ) : (
                <div className="game-container-active">
                    {/* This injects the specific game (e.g., Racing or AI) into the server frame */}
                    <GameContent
                        isOnline={true}
                        players={players}
                        onWin={() => { onCorrectClick(); setConnectionStatus('VICTORY!'); }}
                    />

                    <div className="player-list">
                        <h3>Players In Room</h3>
                        {players.map((p, i) => <div key={i} className="player-tag">{p}</div>)}
                    </div>
                </div>
            )}
        </div>
    );
}