import React, { useState, useEffect, useRef } from 'react';
import './fightergame.css';

const MAX_HP = 100;

function FighterGame({ onExit, onCorrectClick }) {
    const [p1, setP1] = useState({ hp: MAX_HP, status: 'idle', side: 'left' });
    const [ai, setAi] = useState({ hp: MAX_HP, status: 'idle', side: 'right' });
    const [winner, setWinner] = useState(null);

    // 🔊 Audio Refs (Place your .mp3 files in public/sounds/)
    const atkSound = useRef(new Audio('/sounds/swing.mp3'));
    const hitSound = useRef(new Audio('/sounds/impact.mp3'));

    const playSound = (type) => {
        if (type === 'atk') atkSound.current.play();
        if (type === 'hit') hitSound.current.play();
    };

    // 🧠 Reactive AI Engine
    useEffect(() => {
        if (winner || ai.hp <= 0) return;
        const aiAction = setInterval(() => {
            if (p1.status === 'attacking' && Math.random() > 0.5) {
                setAi(s => ({ ...s, status: 'blocking' }));
            } else if (ai.status === 'idle' && Math.random() > 0.8) {
                executeStrike('ai');
            }
        }, 700);
        return () => clearInterval(aiAction);
    }, [p1.status, ai.status, winner, ai.hp]);

    const executeStrike = (who) => {
        if (winner) return;
        const isP1 = who === 'p1';
        isP1 ? setP1(s => ({ ...s, status: 'attacking' })) : setAi(s => ({ ...s, status: 'attacking' }));
        playSound('atk');

        setTimeout(() => {
            const targetBlocked = isP1 ? ai.status === 'blocking' : p1.status === 'blocking';
            if (!targetBlocked) {
                playSound('hit');
                if (isP1) {
                    setAi(s => ({ ...s, hp: Math.max(0, s.hp - 15), status: 'hurt' }));
                } else {
                    setP1(s => ({ ...s, hp: Math.max(0, s.hp - 12), status: 'hurt' }));
                }
            }
            setTimeout(() => {
                setP1(s => ({ ...s, status: 'idle' }));
                setAi(s => ({ ...s, status: 'idle' }));
            }, 300);
        }, 250);
    };

    useEffect(() => {
        if (p1.hp <= 0) setWinner('SHADOW BOT');
        if (ai.hp <= 0) { setWinner('NINJA MASTER'); onCorrectClick(); }
    }, [p1.hp, ai.hp, onCorrectClick]);

    return (
        <div className="shadow-duel-arena">
            <button className="exit-gate" onClick={onExit}>⛩️ Exit</button>

            <div className="battle-hud">
                <div className="vital-box p1">
                    <div className="health-bar"><div className="fill" style={{ width: `${p1.hp}%` }}></div></div>
                    <p>NINJA (YOU)</p>
                </div>
                <div className="vital-box ai">
                    <div className="health-bar enemy"><div className="fill" style={{ width: `${ai.hp}%` }}></div></div>
                    <p>SHADOW BOT</p>
                </div>
            </div>

            <div className="combat-floor">
                {/* HTML Articulated Character 1 */}
                <div className={`human-skeleton p1 ${p1.status}`}>
                    <div className="h-head"></div>
                    <div className="h-torso">
                        <div className="h-arm left"></div>
                        <div className="h-arm right"></div>
                        <div className="h-leg left"></div>
                        <div className="h-leg right"></div>
                    </div>
                </div>

                {/* HTML Articulated Character 2 (AI) */}
                <div className={`human-skeleton ai ${ai.status}`}>
                    <div className="h-head"></div>
                    <div className="h-torso">
                        <div className="h-arm left"></div>
                        <div className="h-arm right"></div>
                        <div className="h-leg left"></div>
                        <div className="h-leg right"></div>
                    </div>
                </div>
            </div>

            {!winner ? (
                <div className="ninja-controls">
                    <button className="ctrl-btn" onClick={() => executeStrike('p1')}>STRIKE ⚔️</button>
                    <button className="ctrl-btn block"
                        onMouseDown={() => setP1(s => ({ ...s, status: 'blocking' }))}
                        onMouseUp={() => setP1(s => ({ ...s, status: 'idle' }))}>BLOCK 🛡️</button>
                </div>
            ) : (
                <div className="victory-ui scale-in">
                    <h2>{winner} PREVAILS</h2>
                    <button onClick={() => window.location.reload()}>REMATCH</button>
                </div>
            )}
        </div>
    );
}

export default FighterGame;