import React, { useState, useEffect, useRef } from 'react';
import './fightergame.css';

const MAX_HP = 100;

function FighterGame({ onExit, onCorrectClick }) {
    const [p1, setP1] = useState({ hp: MAX_HP, status: 'idle' });
    const [ai, setAi] = useState({ hp: MAX_HP, status: 'idle' });
    const [winner, setWinner] = useState(null);
    const [combatText, setCombatText] = useState("Focus your spirit...");

    // Sound Refs
    const swingSfx = useRef(new Audio('/sounds/swing.mp3'));
    const hitSfx = useRef(new Audio('/sounds/impact.mp3'));

    // 🧠 AI Reaction Engine
    useEffect(() => {
        if (winner || ai.hp <= 0) return;
        const aiBrain = setInterval(() => {
            // AI reacts specifically to player's frame-data
            if (p1.status === 'attacking' && Math.random() > 0.4) {
                setAi(s => ({ ...s, status: 'blocking' }));
            } else if (ai.status === 'idle' && Math.random() > 0.8) {
                executeMove('ai');
            }
        }, 750);
        return () => clearInterval(aiBrain);
    }, [p1.status, ai.status, winner]);

    const executeMove = (who) => {
        if (winner) return;
        const isP1 = who === 'p1';
        isP1 ? setP1(s => ({ ...s, status: 'attacking' })) : setAi(s => ({ ...s, status: 'attacking' }));
        swingSfx.current.play().catch(() => { });

        setTimeout(() => {
            const targetBlocked = isP1 ? ai.status === 'blocking' : p1.status === 'blocking';
            if (!targetBlocked) {
                hitSfx.current.play().catch(() => { });
                if (isP1) {
                    setAi(s => ({ ...s, hp: Math.max(0, s.hp - 15), status: 'hurt' }));
                    setCombatText("CRITICAL HIT! 🔥");
                } else {
                    setP1(s => ({ ...s, hp: Math.max(0, s.hp - 12), status: 'hurt' }));
                    setCombatText("THE SHADOW LANDED A BLOW! ⚔️");
                }
            } else {
                setCombatText("PARRIED! 🛡️");
            }

            setTimeout(() => {
                setP1(s => ({ ...s, status: 'idle' }));
                setAi(s => ({ ...s, status: 'idle' }));
            }, 300);
        }, 300);
    };

    useEffect(() => {
        if (p1.hp <= 0) setWinner('THE SHADOW');
        if (ai.hp <= 0) { setWinner('NINJA MASTER'); onCorrectClick(); }
    }, [p1.hp, ai.hp, onCorrectClick]);

    // Common Skeleton Component for both sides
    const Skeleton = ({ fighterClass, status }) => (
        <div className={`human-skeleton ${fighterClass} ${status}`}>
            <div className="skull"></div>
            <div className="ribcage">
                <div className="h-arm arm-l"><div className="forearm"></div></div>
                <div className="h-arm arm-r"><div className="forearm"></div></div>
                <div className="h-leg leg-l"><div className="shin"></div></div>
                <div className="h-leg leg-r"><div className="shin"></div></div>
            </div>
        </div>
    );

    return (
        <div className="shadow-world-arena">
            <div className="hud-interface">
                <div className="vitals p1">
                    <div className="health-track"><div className="health-bar" style={{ width: `${p1.hp}%` }}></div></div>
                    <p>WARRIOR</p>
                </div>
                <div className="battle-announcer">{combatText}</div>
                <div className="vitals ai">
                    <div className="health-track enemy"><div className="health-bar" style={{ width: `${ai.hp}%` }}></div></div>
                    <p>SHADOW</p>
                </div>
            </div>

            <div className="combat-zone">
                <Skeleton fighterClass="p1" status={p1.status} />
                <Skeleton fighterClass="ai" status={ai.status} />
            </div>

            {!winner ? (
                <div className="action-inputs">
                    <button className="input-btn strike" onClick={() => executeMove('p1')}>STRIKE</button>
                    <button className="input-btn block"
                        onMouseDown={() => setP1(s => ({ ...s, status: 'blocking' }))}
                        onMouseUp={() => setP1(s => ({ ...s, status: 'idle' }))}>BLOCK</button>
                    <button className="input-btn exit" onClick={onExit}>EXIT</button>
                </div>
            ) : (
                <div className="victory-curtain">
                    <h1>{winner} PREVAILS</h1>
                    <button onClick={() => window.location.reload()}>REBORN</button>
                </div>
            )}
        </div>
    );
}

export default FighterGame;