import React, { useState, useEffect, useCallback } from 'react';
import './fightergame.css';

const MAX_HP = 100;
const SPECIAL_COST = 40;

function FighterGame({ onExit, onCorrectClick }) {
    const [mode, setMode] = useState(null); // 'bot' or 'pvp'
    const [p1, setP1] = useState({ hp: MAX_HP, energy: 0, status: 'idle' });
    const [p2, setP2] = useState({ hp: MAX_HP, energy: 0, status: 'idle' });
    const [winner, setWinner] = useState(null);

    // 🤖 AI Bot Logic
    useEffect(() => {
        if (mode === 'bot' && !winner && p2.hp > 0) {
            const botBrain = setInterval(() => {
                const move = Math.random();
                if (move > 0.8) handleAttack(2, 1, 'heavy');
                else if (move > 0.3) handleAttack(2, 1, 'light');
            }, 1200);
            return () => clearInterval(botBrain);
        }
    }, [mode, winner, p2.hp]);

    const handleAttack = (attacker, target, type) => {
        if (winner || (attacker === 1 ? p1.status : p2.status) !== 'idle') return;

        const damage = type === 'special' ? 25 : type === 'heavy' ? 15 : 8;
        const energyGain = type === 'special' ? -SPECIAL_COST : 15;

        // Set Animation State
        attacker === 1 ? setP1(s => ({ ...s, status: type })) : setP2(s => ({ ...s, status: type }));

        setTimeout(() => {
            if (target === 1) setP1(s => ({ ...s, hp: Math.max(0, s.hp - damage) }));
            else setP2(s => ({ ...s, hp: Math.max(0, s.hp - damage) }));

            attacker === 1
                ? setP1(s => ({ ...s, status: 'idle', energy: Math.min(100, s.energy + energyGain) }))
                : setP2(s => ({ ...s, status: 'idle', energy: Math.min(100, s.energy + energyGain) }));
        }, 300);
    };

    useEffect(() => {
        if (p1.hp <= 0) setWinner(mode === 'bot' ? 'THE BOT' : 'PLAYER 2');
        if (p2.hp <= 0) { setWinner('PLAYER 1'); onCorrectClick(); }
    }, [p1.hp, p2.hp, mode, onCorrectClick]);

    if (!mode) return (
        <div className="fight-menu fade-in">
            <h1 className="arena-title">SUPER BRAWL</h1>
            <div className="mode-cards">
                <button className="mode-card bot" onClick={() => setMode('bot')}>
                    <div className="mode-icon">🤖</div>
                    <h3>VS COMPUTER</h3>
                    <p>Practice your moves!</p>
                </button>
                <button className="mode-card pvp" onClick={() => setMode('pvp')}>
                    <div className="mode-icon">⚔️</div>
                    <h3>2 PLAYER PVP</h3>
                    <p>Battle a friend!</p>
                </button>
            </div>
            <button className="exit-arena" onClick={onExit}>⬅ BACK TO LOBBY</button>
        </div>
    );

    return (
        <div className="fight-arena-wrapper">
            <div className="arena-hud">
                <div className="fighter-stats left">
                    <div className="name-tag">PLAYER 1</div>
                    <div className="hp-outer"><div className="hp-fill" style={{ width: `${p1.hp}%` }}></div></div>
                    <div className="energy-outer"><div className="energy-fill" style={{ width: `${p1.energy}%` }}></div></div>
                </div>
                <div className="vs-badge">VS</div>
                <div className="fighter-stats right">
                    <div className="name-tag">{mode === 'bot' ? 'BOT' : 'PLAYER 2'}</div>
                    <div className="hp-outer"><div className="hp-fill enemy" style={{ width: `${p2.hp}%` }}></div></div>
                    <div className="energy-outer"><div className="energy-fill" style={{ width: `${p2.energy}%` }}></div></div>
                </div>
            </div>

            <div className="stage">
                <div className={`fighter p1 ${p1.status}`} data-emoji="🥋"></div>
                <div className={`fighter p2 ${p2.status}`} data-emoji={mode === 'bot' ? '🤖' : '🥷'}></div>
            </div>

            {!winner ? (
                <div className="combat-ui">
                    <div className="control-group">
                        <button className="btn-atk" onClick={() => handleAttack(1, 2, 'light')}>PUNCH</button>
                        <button className="btn-atk heavy" onClick={() => handleAttack(1, 2, 'heavy')}>KICK</button>
                        <button className={`btn-special ${p1.energy < SPECIAL_COST ? 'disabled' : ''}`}
                            onClick={() => handleAttack(1, 2, 'special')}>ULTRA 🔥</button>
                    </div>
                    {mode === 'pvp' && (
                        <div className="control-group p2">
                            <button className="btn-atk" onClick={() => handleAttack(2, 1, 'light')}>PUNCH</button>
                            <button className="btn-atk heavy" onClick={() => handleAttack(2, 1, 'heavy')}>KICK</button>
                            <button className={`btn-special ${p2.energy < SPECIAL_COST ? 'disabled' : ''}`}
                                onClick={() => handleAttack(2, 1, 'special')}>ULTRA 🔥</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="win-screen scale-in">
                    <h2>{winner} VICTORIOUS!</h2>
                    <button className="rematch-btn" onClick={() => { setP1({ hp: 100, energy: 0, status: 'idle' }); setP2({ hp: 100, energy: 0, status: 'idle' }); setWinner(null); }}>REMATCH</button>
                    <button className="exit-btn" onClick={onExit}>LOBBY</button>
                </div>
            )}
        </div>
    );
}

export default FighterGame;