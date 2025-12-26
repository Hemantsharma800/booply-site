import React, { useState, useEffect, useRef } from 'react';
import './fightergame.css';

const MAX_HP = 100;

function FighterGame({ onExit, onCorrectClick }) {
    const [p1, setP1] = useState({ hp: MAX_HP, status: 'idle', energy: 0 });
    const [ai, setAi] = useState({ hp: MAX_HP, status: 'idle', energy: 0 });
    const [winner, setWinner] = useState(null);
    const [battleLog, setBattleLog] = useState("The duel begins...");

    // Sound Refs
    const swingSfx = useRef(new Audio('/sounds/swing.mp3'));
    const hitSfx = useRef(new Audio('/sounds/impact.mp3'));

    // 🧠 Reactive AI "Shadow" Engine
    useEffect(() => {
        if (winner || ai.hp <= 0) return;

        const aiThinking = setInterval(() => {
            // If player is attacking, AI has a 60% chance to block
            if (p1.status === 'attacking') {
                if (Math.random() > 0.4) {
                    setAi(s => ({ ...s, status: 'blocking' }));
                    setBattleLog("Shadow Parried! 🛡️");
                }
            } else if (ai.status === 'idle') {
                // AI attacks if player is open
                if (Math.random() > 0.8) executeMove('ai');
            }
        }, 800);

        return () => clearInterval(aiThinking);
    }, [p1.status, ai.status, winner]);

    const executeMove = (who) => {
        if (winner) return;
        const isP1 = who === 'p1';

        // Set Attacker State
        isP1 ? setP1(s => ({ ...s, status: 'attacking' })) : setAi(s => ({ ...s, status: 'attacking' }));
        swingSfx.current.play().catch(() => { });

        // Hit-Stop Logic (Realistic Timing)
        setTimeout(() => {
            const targetBlocked = isP1 ? ai.status === 'blocking' : p1.status === 'blocking';

            if (!targetBlocked) {
                hitSfx.current.play().catch(() => { });
                if (isP1) {
                    setAi(s => ({ ...s, hp: Math.max(0, s.hp - 15), status: 'hurt' }));
                    setBattleLog("Direct Strike! 🔥");
                } else {
                    setP1(s => ({ ...s, hp: Math.max(0, s.hp - 12), status: 'hurt' }));
                    setBattleLog("You were hit! ⚔️");
                }
            }

            // Recovery Phase
            setTimeout(() => {
                setP1(s => ({ ...s, status: 'idle' }));
                setAi(s => ({ ...s, status: 'idle' }));
            }, 300);
        }, 350);
    };

    useEffect(() => {
        if (p1.hp <= 0) setWinner('THE SHADOW');
        if (ai.hp <= 0) { setWinner('NINJA MASTER'); onCorrectClick(); }
    }, [p1.hp, ai.hp, onCorrectClick]);

    // Articulated Human Skeleton Component
    const Humanoid = ({ side, status }) => (
        <div className={`shadow-ninja ${side} ${status}`}>
            <div className="n-head"></div>
            <div className="n-torso">
                <div className="n-arm arm-l"><div className="forearm"></div></div>
                <div className="n-arm arm-r"><div className="forearm"></div></div>
                <div className="n-leg leg-l"><div className="shin"></div></div>
                <div className="n-leg leg-r"><div className="shin"></div></div>
            </div>
            <div className="n-shadow-blob"></div>
        </div>
    );

    return (
        <div className="elite-shadow-arena">
            <header className="combat-hud">
                <div className="hud-vitals p1">
                    <div className="health-box"><div className="fill" style={{ width: `${p1.hp}%` }}></div></div>
                    <p>PLAYER</p>
                </div>
                <div className="battle-announcer">{battleLog}</div>
                <div className="hud-vitals ai">
                    <div className="health-box enemy"><div className="fill" style={{ width: `${ai.hp}%` }}></div></div>
                    <p>SHADOW</p>
                </div>
            </header>

            <div className="fighting-stage">
                <Humanoid side="p1" status={p1.status} />
                <Humanoid side="ai" status={ai.status} />
            </div>

            {!winner ? (
                <div className="combat-inputs">
                    <button className="atk-btn-pro" onClick={() => executeMove('p1')}>STRIKE ⚔️</button>
                    <button className="blk-btn-pro"
                        onMouseDown={() => setP1(s => ({ ...s, status: 'blocking' }))}
                        onMouseUp={() => setP1(s => ({ ...s, status: 'idle' }))}>BLOCK 🛡️</button>
                    <button className="exit-arena-btn" onClick={onExit}>⛩️ EXIT</button>
                </div>
            ) : (
                <div className="victory-ui-pro">
                    <h1>{winner} PREVAILS</h1>
                    <button className="rematch-btn" onClick={() => window.location.reload()}>REMATCH</button>
                </div>
            )}
        </div>
    );
}

export default FighterGame;