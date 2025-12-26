import React, { useState, useEffect, useRef } from 'react';
import './fightergame.css';

const MAX_HP = 100;

function FighterGame({ onExit, onCorrectClick }) {
    // Player and AI States
    const [p1, setP1] = useState({ hp: MAX_HP, status: 'idle', energy: 0 });
    const [ai, setAi] = useState({ hp: MAX_HP, status: 'idle', energy: 0 });
    const [winner, setWinner] = useState(null);
    const [battleMsg, setBattleMsg] = useState("Awaiting first strike...");

    // Sound Refs (Public folder)
    const hitSfx = useRef(new Audio('/sounds/impact.mp3'));
    const swingSfx = useRef(new Audio('/sounds/swing.mp3'));

    // 🧠 AI Reactive Brain
    useEffect(() => {
        if (winner || ai.hp <= 0) return;

        const aiLogic = setInterval(() => {
            // If player attacks, AI has a 50% chance to block instantly
            if (p1.status === 'attacking') {
                if (Math.random() > 0.5) {
                    setAi(s => ({ ...s, status: 'blocking' }));
                    setBattleMsg("Shadow parried your strike! 🛡️");
                }
            } else if (ai.status === 'idle') {
                // AI attacks if player is open
                if (Math.random() > 0.8) performMove('ai');
            }
        }, 800);

        return () => clearInterval(aiLogic);
    }, [p1.status, ai.status, winner]);

    const performMove = (who) => {
        const isP1 = who === 'p1';
        const attacker = isP1 ? p1 : ai;
        if (attacker.status !== 'idle' || winner) return;

        // Trigger Attack
        isP1 ? setP1(s => ({ ...s, status: 'attacking' })) : setAi(s => ({ ...s, status: 'attacking' }));
        swingSfx.current.play().catch(() => { }); // Play sound if available

        setTimeout(() => {
            const target = isP1 ? ai : p1;
            const isBlocked = target.status === 'blocking';

            if (!isBlocked) {
                hitSfx.current.play().catch(() => { });
                if (isP1) {
                    setAi(s => ({ ...s, hp: Math.max(0, s.hp - 15), status: 'hurt' }));
                    setBattleMsg("Direct hit! 🔥");
                } else {
                    setP1(s => ({ ...s, hp: Math.max(0, s.hp - 12), status: 'hurt' }));
                    setBattleMsg("The Shadow wounded you! ⚔️");
                }
            }

            // Reset states
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

    return (
        <div className="shadow-arena-pro">
            <header className="fight-hud">
                <div className="hud-side left">
                    <div className="hp-tray"><div className="hp-fill" style={{ width: `${p1.hp}%` }}></div></div>
                    <p>PLAYER (YOU)</p>
                </div>
                <div className="hud-center">
                    <span className="msg-bubble">{battleMsg}</span>
                </div>
                <div className="hud-side right">
                    <div className="hp-tray enemy"><div className="hp-fill" style={{ width: `${ai.hp}%` }}></div></div>
                    <p>SHADOW BOT</p>
                </div>
            </header>

            <div className="combat-stage">
                {/* Human Skeleton 1 (Player) */}
                <div className={`humanoid p1 ${p1.status}`}>
                    <div className="head"></div>
                    <div className="torso">
                        <div className="arm arm-l"></div>
                        <div className="arm arm-r"></div>
                        <div className="leg leg-l"></div>
                        <div className="leg leg-r"></div>
                    </div>
                </div>

                {/* Human Skeleton 2 (AI) */}
                <div className={`humanoid ai ${ai.status}`}>
                    <div className="head"></div>
                    <div className="torso">
                        <div className="arm arm-l"></div>
                        <div className="arm arm-r"></div>
                        <div className="leg leg-l"></div>
                        <div className="leg leg-r"></div>
                    </div>
                </div>
            </div>

            {!winner ? (
                <div className="controls-pro">
                    <button className="ctrl-btn atk" onClick={() => performMove('p1')}>STRIKE ⚔️</button>
                    <button className="ctrl-btn blk"
                        onMouseDown={() => setP1(s => ({ ...s, status: 'blocking' }))}
                        onMouseUp={() => setP1(s => ({ ...s, status: 'idle' }))}>BLOCK 🛡️</button>
                    <button className="exit-btn" onClick={onExit}>⛩️ EXIT</button>
                </div>
            ) : (
                <div className="result-screen">
                    <h1>{winner} PREVAILS</h1>
                    <button className="restart-btn" onClick={() => window.location.reload()}>REBORN</button>
                </div>
            )}
        </div>
    );
}

export default FighterGame;