import React, { useState, useEffect, useCallback, useRef } from 'react';
import './fightergame.css';

const GROUND_Y = 0;
const PLAYER_START_X = 100;
const AI_START_X = 500;
const ARENA_WIDTH = 700;

export default function FighterGame({ onExit, onCorrectClick }) {
    // Fighter States
    const [player, setPlayer] = useState({ x: PLAYER_START_X, y: GROUND_Y, hp: 100, action: 'idle', dir: 1 });
    const [ai, setAi] = useState({ x: AI_START_X, y: GROUND_Y, hp: 100, action: 'idle', dir: -1 });
    const [isGameOver, setIsGameOver] = useState(false);

    const gameLoopRef = useRef();
    const lastAiDecision = useRef(0);

    // ⚔️ COMBAT LOGIC: Detection & Damage
    const resolveHit = useCallback((attacker, defender, setDefender) => {
        const distance = Math.abs(attacker.x - defender.x);
        if (distance < 60 && attacker.action === 'kick') {
            setDefender(prev => ({
                ...prev,
                hp: Math.max(0, prev.hp - 12),
                action: 'hit',
                x: prev.x + (attacker.dir * 20) // Knockback
            }));
            // Recover from hit animation
            setTimeout(() => setDefender(p => ({ ...p, action: 'idle' })), 300);
            if (defender.hp <= 12) setIsGameOver(true);
        }
    }, []);

    // 🧠 AI NEURAL REFLEX: Accelerated Response
    const runAiLogic = useCallback(() => {
        const now = Date.now();
        if (now - lastAiDecision.current < 150) return; // Ultra-fast 150ms reaction time

        setAi(prev => {
            const dist = prev.x - player.x;
            const newAction = { ...prev };

            if (Math.abs(dist) > 55) {
                newAction.x -= Math.sign(dist) * 8; // Pursuit speed
                newAction.action = 'walk';
            } else {
                newAction.action = 'kick';
                resolveHit(newAction, player, setPlayer);
            }
            return newAction;
        });
        lastAiDecision.current = now;
    }, [player, resolveHit]);

    // 🎮 PLAYER CONTROLS: Forward, Back, Jump, Kick
    const handleAction = (type) => {
        if (isGameOver) return;
        setPlayer(prev => {
            let next = { ...prev };
            if (type === 'forward') { next.x = Math.min(ARENA_WIDTH, prev.x + 15); next.action = 'walk'; }
            if (type === 'back') { next.x = Math.max(0, prev.x - 15); next.action = 'walk'; }
            if (type === 'kick') { next.action = 'kick'; resolveHit(next, ai, setAi); }
            if (type === 'jump' && prev.y === GROUND_Y) {
                next.y = 120; // Jump peak
                setTimeout(() => setPlayer(p => ({ ...p, y: GROUND_Y })), 400);
            }
            return next;
        });
        // Reset to idle
        if (type !== 'jump') setTimeout(() => setPlayer(p => ({ ...p, action: 'idle' })), 200);
    };

    useEffect(() => {
        if (!isGameOver) {
            gameLoopRef.current = setInterval(runAiLogic, 50); // High-frequency loop
        }
        return () => clearInterval(gameLoopRef.current);
    }, [runAiLogic, isGameOver]);

    return (
        <div className="shadow-duel-arena fade-in">
            {/* 🏥 HEALTH HUD */}
            <div className="fight-hud">
                <div className="hp-bar-container player">
                    <div className="hp-fill" style={{ width: `${player.hp}%` }}></div>
                    <span className="name-tag">PLAYER 1</span>
                </div>
                <div className="timer">VS</div>
                <div className="hp-bar-container ai">
                    <div className="hp-fill" style={{ width: `${ai.hp}%` }}></div>
                    <span className="name-tag">SHADOW AI</span>
                </div>
            </div>

            {/* 🏟️ BATTLEGROUND */}
            <div className="stage">
                <div className={`fighter shadow-p ${player.action}`} style={{ left: player.x, bottom: player.y }}>
                    <div className="skeleton"></div>
                    {player.action === 'kick' && <div className="kick-vfx"></div>}
                </div>
                <div className={`fighter shadow-ai ${ai.action}`} style={{ left: ai.x, bottom: ai.y }}>
                    <div className="skeleton"></div>
                    {ai.action === 'kick' && <div className="kick-vfx"></div>}
                </div>
            </div>

            {/* 🕹️ ELITE CONTROLS HUD */}
            <div className="controls-hud">
                <div className="move-btns">
                    <button className="ctrl-btn" onMouseDown={() => handleAction('back')}>◀</button>
                    <button className="ctrl-btn" onMouseDown={() => handleAction('jump')}>▲</button>
                    <button className="ctrl-btn" onMouseDown={() => handleAction('forward')}>▶</button>
                </div>
                <button className="kick-btn" onClick={() => handleAction('kick')}>STRIKE</button>
                <button className="exit-duel" onClick={onExit}>EXIT</button>
            </div>

            {isGameOver && (
                <div className="duel-overlay">
                    <h1>{player.hp > 0 ? "VICTORY" : "DEFEATED"}</h1>
                    <button onClick={() => window.location.reload()}>REMATCH</button>
                </div>
            )}
        </div>
    );
}