import React, { useState, useEffect, useCallback, useRef } from 'react';
import './fightergame.css';

const ARENA_WIDTH = 800;
const GROUND = 0;

export default function FighterGame({ onExit, onCorrectClick }) {
    // ⚔️ FIGHTER STATES
    const [player, setPlayer] = useState({ x: 150, y: GROUND, hp: 100, action: 'idle', dir: 1, jumping: false });
    const [ai, setAi] = useState({ x: 600, y: GROUND, hp: 100, action: 'idle', dir: -1, jumping: false });
    const [status, setStatus] = useState('FIGHT');

    const loop = useRef();

    // 🧠 AGGRESSIVE AI: Pursuit and Strike
    const updateAI = useCallback(() => {
        if (status !== 'FIGHT') return;

        setAi(prev => {
            const distance = prev.x - player.x;
            const newState = { ...prev };

            if (Math.abs(distance) > 85) {
                newState.x -= Math.sign(distance) * 10; // High-speed pursuit
                newState.action = 'move';
            } else {
                newState.action = 'attack';
                handleCombat(newState, player, setPlayer);
            }
            return newState;
        });
    }, [player, status]);

    // ⚔️ COMBAT SYSTEM: Health and Hits
    const handleCombat = (attacker, defender, setDefender) => {
        const dist = Math.abs(attacker.x - defender.x);
        if (dist < 95 && attacker.action === 'attack') {
            setDefender(prev => ({
                ...prev,
                hp: Math.max(0, prev.hp - 4),
                action: 'hurt'
            }));
            setTimeout(() => setDefender(p => ({ ...p, action: 'idle' })), 150);
        }
    };

    // 🕹️ PRO CONTROLS
    const input = (type) => {
        if (status !== 'FIGHT') return;
        setPlayer(prev => {
            let next = { ...prev };
            if (type === 'LEFT') { next.x = Math.max(0, prev.x - 25); next.action = 'move'; }
            if (type === 'RIGHT') { next.x = Math.min(ARENA_WIDTH, prev.x + 25); next.action = 'move'; }
            if (type === 'STRIKE') {
                next.action = 'attack';
                handleCombat(next, ai, setAi);
                if (ai.hp <= 4) { setStatus('VICTORY'); if (onCorrectClick) onCorrectClick(); }
            }
            if (type === 'JUMP' && !prev.jumping) {
                next.jumping = true; next.y = 160;
                setTimeout(() => setPlayer(p => ({ ...p, y: GROUND, jumping: false })), 450);
            }
            return next;
        });
        if (type !== 'JUMP') setTimeout(() => setPlayer(p => ({ ...p, action: 'idle' })), 200);
    };

    useEffect(() => {
        loop.current = setInterval(updateAI, 80); // Overclocked AI logic
        return () => clearInterval(loop.current);
    }, [updateAI]);

    return (
        <div className="shadow-arena-black">
            {/* 🏥 RESTORED HEALTH HUD */}
            <div className="battle-hud-elite">
                <div className="health-container p1">
                    <div className="bar"><div className="fill" style={{ width: `${player.hp}%` }}></div></div>
                    <span className="tag">PLAYER</span>
                </div>
                <div className="vs-center">VS</div>
                <div className="health-container p2">
                    <div className="bar"><div className="fill" style={{ width: `${ai.hp}%` }}></div></div>
                    <span className="tag">SHADOW AI</span>
                </div>
            </div>

            <div className="combat-stage">
                {/* HUMAN NINJA PLAYER */}
                <div className={`ninja player ${player.action}`} style={{ left: player.x, bottom: player.y }}>
                    <div className="ninja-body teal-glow"></div>
                    <div className="blade-strike"></div>
                </div>

                {/* HUMAN NINJA AI */}
                <div className={`ninja ai ${ai.action}`} style={{ left: ai.x, bottom: ai.y }}>
                    <div className="ninja-body orange-glow"></div>
                    <div className="blade-strike"></div>
                </div>
            </div>

            {/* 🕹️ FIXED CONTROL DECK */}
            <div className="pro-control-deck">
                <div className="dpad">
                    <button className="btn-round" onMouseDown={() => input('LEFT')}>◀</button>
                    <button className="btn-round" onMouseDown={() => input('JUMP')}>▲</button>
                    <button className="btn-round" onMouseDown={() => input('RIGHT')}>▶</button>
                </div>
                <button className="btn-strike" onClick={() => input('STRIKE')}>SWORD STRIKE</button>
                <button className="btn-exit" onClick={onExit}>EXIT</button>
            </div>

            {status !== 'FIGHT' && (
                <div className="end-overlay">
                    <h1>{status}</h1>
                    <button onClick={() => window.location.reload()}>REMATCH</button>
                </div>
            )}
        </div>
    );
}