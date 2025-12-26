import React, { useState, useEffect, useCallback } from 'react';
import './fightergame.css';

const MAX_HP = 100;

function FighterGame({ onExit, onCorrectClick }) {
    const [p1, setP1] = useState({ hp: MAX_HP, energy: 0, status: 'idle' });
    const [ai, setAi] = useState({ hp: MAX_HP, energy: 0, status: 'idle' });
    const [winner, setWinner] = useState(null);
    const [combatLog, setCombatLog] = useState("Face your shadow...");

    // 🧠 Reactive AI Intelligence
    useEffect(() => {
        if (winner || ai.hp <= 0) return;

        const aiThinking = setInterval(() => {
            // If player is attacking, AI has a 50% chance to block
            if (p1.status === 'attacking') {
                if (Math.random() > 0.5) {
                    setAi(s => ({ ...s, status: 'blocking' }));
                    setCombatLog("Shadow blocked! 🛡️");
                }
            } else if (ai.status === 'idle') {
                // AI decides to strike based on player distance/state
                if (Math.random() > 0.8) executeAiStrike();
            }
        }, 700);

        return () => clearInterval(aiThinking);
    }, [p1.status, ai.status, winner]);

    const executeAiStrike = () => {
        setAi(s => ({ ...s, status: 'attacking' }));
        setTimeout(() => {
            if (p1.status !== 'blocking') {
                setP1(s => ({ ...s, hp: Math.max(0, s.hp - 12), status: 'hurt' }));
                setCombatLog("The Shadow strikes! ⚔️");
            } else {
                setCombatLog("You parried the shadow! 🛡️");
            }
            resetPositions();
        }, 400);
    };

    const playerStrike = (type) => {
        if (winner || p1.status !== 'idle') return;
        const damage = type === 'special' ? 25 : 12;

        setP1(s => ({ ...s, status: 'attacking', energy: Math.min(100, s.energy + 10) }));

        setTimeout(() => {
            if (ai.status !== 'blocking') {
                setAi(s => ({ ...s, hp: Math.max(0, s.hp - damage), status: 'hurt' }));
                setCombatLog(type === 'special' ? "ULTRA STRIKE! 🔥" : "Hit landed! ⚔️");
            }
            resetPositions();
        }, 300);
    };

    const resetPositions = () => {
        setTimeout(() => {
            setP1(s => ({ ...s, status: 'idle' }));
            setAi(s => ({ ...s, status: 'idle' }));
        }, 300);
    };

    useEffect(() => {
        if (p1.hp <= 0) setWinner('SHADOW BOT');
        if (ai.hp <= 0) { setWinner('NINJA MASTER'); onCorrectClick(); }
    }, [p1.hp, ai.hp, onCorrectClick]);

    return (
        <div className="shadow-arena">
            <button className="exit-gate" onClick={onExit}>⛩️ Leave Dojo</button>

            <div className="hud-top">
                <div className="player-vitals">
                    <div className="hp-bar"><div className="fill" style={{ width: `${p1.hp}%` }}></div></div>
                    <div className="energy-bar"><div className="fill" style={{ width: `${p1.energy}%` }}></div></div>
                    <p>NINJA (YOU)</p>
                </div>
                <div className="log-scroll">{combatLog}</div>
                <div className="player-vitals ai">
                    <div className="hp-bar enemy"><div className="fill" style={{ width: `${ai.hp}%` }}></div></div>
                    <div className="energy-bar"><div className="fill" style={{ width: `${ai.energy}%` }}></div></div>
                    <p>SHADOW</p>
                </div>
            </div>

            <div className="duel-floor">
                {/* Shadow Ninja Silhouettes */}
                <div className={`shadow-ninja p1 ${p1.status}`}>
                    <div className="n-head"></div>
                    <div className="n-body"></div>
                    <div className="n-sword"></div>
                </div>

                <div className={`shadow-ninja ai ${ai.status}`}>
                    <div className="n-head"></div>
                    <div className="n-body"></div>
                    <div className="n-sword"></div>
                </div>
            </div>

            {!winner ? (
                <div className="touch-input">
                    <button className="btn strike" onClick={() => playerStrike('light')}>STRIKE</button>
                    <button className="btn block"
                        onMouseDown={() => setP1(s => ({ ...s, status: 'blocking' }))}
                        onMouseUp={() => setP1(s => ({ ...s, status: 'idle' }))}>BLOCK</button>
                    <button className={`btn ultra ${p1.energy < 100 ? 'locked' : ''}`}
                        onClick={() => playerStrike('special')}>ULTRA</button>
                </div>
            ) : (
                <div className="end-screen">
                    <h2>{winner} PREVAILS</h2>
                    <button onClick={() => window.location.reload()}>REBORN</button>
                </div>
            )}
        </div>
    );
}

export default FighterGame;