import React, { useState, useEffect, useCallback, useRef } from 'react';
import './fightergame.css';

const ARENA_WIDTH = 800;
const GROUND_LEVEL = 0;

export default function FighterGame({ onExit, onCorrectClick }) {
    // ⚔️ ELITE FIGHTER STATE
    const [player, setPlayer] = useState({ x: 100, y: GROUND_LEVEL, hp: 100, action: 'idle', dir: 1, jumping: false });
    const [ai, setAi] = useState({ x: 600, y: GROUND_LEVEL, hp: 100, action: 'idle', dir: -1, jumping: false });
    const [gameState, setGameState] = useState('BATTLE'); // BATTLE, OVER

    const gameLoop = useRef();
    const aiBrain = useRef(0);

    // 🧠 NEURAL AI: HIGH-SPEED RESPONSE
    const runAI = useCallback(() => {
        if (gameState !== 'BATTLE') return;

        setAi(prev => {
            const distance = prev.x - player.x;
            const newAi = { ...prev };

            // AI Decision logic - reaction every 100ms
            if (Math.abs(distance) > 70) {
                newAi.x -= Math.sign(distance) * 9; // Pursuit speed
                newAi.action = 'move';
            } else {
                newAi.action = 'strike'; // Dual Sword Attack
                checkHit(newAi, player, setPlayer);
            }
            return newAi;
        });
    }, [player, gameState]);

    // ⚔️ HIT DETECTION
    const checkHit = (attacker, defender, setDef) => {
        const dist = Math.abs(attacker.x - defender.x);
        if (dist < 80 && attacker.action === 'strike') {
            setDef(prev => ({
                ...prev,
                hp: Math.max(0, prev.hp - 5),
                action: 'hurt'
            }));
            setTimeout(() => setDef(p => ({ ...p, action: 'idle' })), 200);
        }
    };

    // 🕹️ CONTROLS
    const handleMove = (type) => {
        if (gameState !== 'BATTLE') return;
        setPlayer(prev => {
            let next = { ...prev };
            if (type === 'FWD') { next.x = Math.min(ARENA_WIDTH, prev.x + 20); next.action = 'move'; }
            if (type === 'BCK') { next.x = Math.max(0, prev.x - 20); next.action = 'move'; }
            if (type === 'STRIKE') {
                next.action = 'strike';
                checkHit(next, ai, setAi);
                if (ai.hp <= 5) setGameState('VICTORY');
            }
            if (type === 'JUMP' && !prev.jumping) {
                next.jumping = true;
                next.y = 150;
                setTimeout(() => setPlayer(p => ({ ...p, y: GROUND_LEVEL, jumping: false })), 500);
            }
            return next;
        });
        if (type !== 'JUMP') setTimeout(() => setPlayer(p => ({ ...p, action: 'idle' })), 200);
    };

    useEffect(() => {
        gameLoop.current = setInterval(runAI, 100);
        return () => clearInterval(gameLoop.current);
    }, [runAI]);

    return (
        <div className="duel-arena">
            <div className="battle-hud">
                <div className="hp-bar player"><div className="fill" style={{ width: `${player.hp}%` }}></div></div>
                <div className="vs-logo">VS</div>
                <div className="hp-bar ai"><div className="fill" style={{ width: `${ai.hp}%` }}></div></div>
            </div>

            <div className="fighting-stage">
                {/* PLAYER SHINOBI */}
                <div className={`shinobi player ${player.action}`} style={{ left: player.x, bottom: player.y }}>
                    <div className="glow-aura teal"></div>
                    <div className="swords"></div>
                </div>

                {/* AI SHINOBI */}
                <div className={`shinobi ai ${ai.action}`} style={{ left: ai.x, bottom: ai.y }}>
                    <div className="glow-aura orange"></div>
                    <div className="swords"></div>
                </div>
            </div>

            <div className="control-deck">
                <div className="d-pad">
                    <button onMouseDown={() => handleMove('BCK')}>◀</button>
                    <button onMouseDown={() => handleMove('JUMP')}>▲</button>
                    <button onMouseDown={() => handleMove('FWD')}>▶</button>
                </div>
                <button className="strike-btn" onClick={() => handleMove('STRIKE')}>SWORD STRIKE</button>
                <button className="quit-btn" onClick={onExit}>EXIT</button>
            </div>

            {gameState !== 'BATTLE' && (
                <div className="win-screen">
                    <h1>{gameState}</h1>
                    <button onClick={() => window.location.reload()}>REMATCH</button>
                </div>
            )}
        </div>
    );
}