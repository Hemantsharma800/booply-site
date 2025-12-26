import React, { useState, useEffect } from 'react';
import './fightergame.css';

function FighterGame({ onExit, onCorrectClick }) {
    const [mode, setMode] = useState(null); // 'bot' or 'pvp'
    const [p1HP, setP1HP] = useState(100);
    const [p2HP, setP2HP] = useState(100);
    const [winner, setWinner] = useState(null);

    // Bot Logic: Attacks every 1.5 seconds if mode is 'bot'
    useEffect(() => {
        if (mode === 'bot' && !winner) {
            const botTimer = setInterval(() => {
                const damage = Math.floor(Math.random() * 15);
                setP1HP(prev => Math.max(0, prev - damage));
            }, 1500);
            return () => clearInterval(botTimer);
        }
    }, [mode, winner]);

    useEffect(() => {
        if (p1HP <= 0) setWinner('Player 2 / Bot');
        if (p2HP <= 0) {
            setWinner('Player 1');
            onCorrectClick();
        }
    }, [p1HP, p2HP, onCorrectClick]);

    const attack = (player) => {
        if (winner) return;
        const damage = 10;
        if (player === 1) setP2HP(prev => Math.max(0, prev - damage));
        if (player === 2) setP1HP(prev => Math.max(0, prev - damage));
    };

    if (!mode) return (
        <div className="mode-select">
            <h2>Super Brawl</h2>
            <button onClick={() => setMode('bot')}>🤖 Play vs Bot</button>
            <button onClick={() => setMode('pvp')}>👥 2 Players (Local)</button>
            <button className="back-btn" onClick={onExit}>Exit</button>
        </div>
    );

    return (
        <div className="fight-arena">
            <div className="hp-bars">
                <div className="hp-container">P1: <div className="bar"><div className="fill" style={{ width: `${p1HP}%` }}></div></div></div>
                <div className="hp-container">{mode === 'bot' ? 'BOT' : 'P2'}: <div className="bar red"><div className="fill" style={{ width: `${p2HP}%` }}></div></div></div>
            </div>

            <div className="fighters">
                <div className={`char p1 ${p1HP === 0 ? 'dead' : ''}`}>🥋</div>
                <div className={`char p2 ${p2HP === 0 ? 'dead' : ''}`}>{mode === 'bot' ? '🤖' : '🥷'}</div>
            </div>

            <div className="fight-controls">
                <button className="atk-btn" onClick={() => attack(1)}>P1 ATTACK (A)</button>
                {mode === 'pvp' && <button className="atk-btn red" onClick={() => attack(2)}>P2 ATTACK (L)</button>}
            </div>

            {winner && (
                <div className="victory-overlay">
                    <h2>{winner} Wins!</h2>
                    <button onClick={() => { setP1HP(100); setP2HP(100); setWinner(null); }}>Rematch</button>
                    <button onClick={onExit}>Home</button>
                </div>
            )}
        </div>
    );
}

export default FighterGame;