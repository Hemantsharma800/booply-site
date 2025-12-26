import React, { useState, useEffect, useCallback, useRef } from 'react';
import './fightergame.css';

// ⚙️ CONSTANTS
const ARENA_WIDTH = 800;
const COMBO_LIMIT = 5;

export default function FighterGame({ onExit, onCorrectClick }) {
    // ⚔️ FIGHTER STATES
    const [player, setPlayer] = useState({ x: 100, y: 0, hp: 100, action: 'idle', dir: 1, combo: 0 });
    const [ai, setAi] = useState({ x: 600, y: 0, hp: 100, action: 'idle', dir: -1 });
    const [gameState, setGameState] = useState('BATTLE');

    // 🧠 MATH ENGINE STATE
    const [problem, setProblem] = useState(null);
    const [options, setOptions] = useState([]);
    const [isWrong, setIsWrong] = useState(false);

    // 🛡️ REFS FOR GAME LOOP
    const gameLoop = useRef();

    // Generate Grade-A Math Challenge
    const generateProblem = useCallback(() => {
        const a = Math.floor(Math.random() * 12) + 1;
        const b = Math.floor(Math.random() * 12) + 1;
        const op = Math.random() > 0.5 ? '+' : '-';
        const ans = op === '+' ? a + b : Math.max(0, a - b);

        setProblem(`${a} ${op} ${b} = ?`);
        const distractors = [ans + 1, ans - 1, ans + 2, ans + 5].filter(v => v !== ans && v >= 0);
        setOptions([ans, ...distractors.slice(0, 3)].sort(() => Math.random() - 0.5));
    }, []);

    // ⚔️ COMBAT RESOLUTION
    const handleStrike = (selected) => {
        const answer = parseInt(problem.split('=')[0].split(' ').reduce((acc, cur, i, arr) => {
            if (cur === '+') return acc + parseInt(arr[i + 1]);
            if (cur === '-') return acc - parseInt(arr[i + 1]);
            return i === 0 ? parseInt(cur) : acc;
        }, 0));

        if (selected === answer) {
            setPlayer(p => ({ ...p, action: 'attack', combo: p.combo + 1 }));
            setAi(a => ({ ...a, hp: Math.max(0, a.hp - 15), action: 'hit' }));
            if (onCorrectClick) onCorrectClick();
            setProblem(null);
            setTimeout(() => setPlayer(p => ({ ...p, action: 'idle' })), 400);
            if (ai.hp <= 15) setGameState('VICTORY');
        } else {
            setIsWrong(true);
            setPlayer(p => ({ ...p, action: 'hit', combo: 0 }));
            setTimeout(() => { setIsWrong(false); setProblem(null); setPlayer(p => ({ ...p, action: 'idle' })); }, 800);
        }
    };

    // 🤖 NEURAL AI REFLEX
    useEffect(() => {
        if (gameState === 'BATTLE' && !problem) {
            gameLoop.current = setInterval(() => {
                setAi(prev => {
                    const dist = prev.x - player.x;
                    if (Math.abs(dist) > 80) return { ...prev, x: prev.x - Math.sign(dist) * 10, action: 'move' };
                    return { ...prev, action: 'idle' };
                });
            }, 100);
        }
        return () => clearInterval(gameLoop.current);
    }, [player.x, gameState, problem]);

    return (
        <div className="ninja-arena-root">
            {/* 📊 ELITE HUD */}
            <div className="battle-hud-glass">
                <div className="hp-container">
                    <div className="hp-bar player"><div className="fill" style={{ width: `${player.hp}%` }}></div></div>
                    <span className="name">SHINOBI</span>
                </div>
                <div className="vs-badge">VS</div>
                <div className="hp-container ai">
                    <div className="hp-bar ai-bar"><div className="fill" style={{ width: `${ai.hp}%` }}></div></div>
                    <span className="name">SHADOW AI</span>
                </div>
            </div>

            <div className="combat-zone">
                {/* 👤 PLAYER NINJA */}
                <div className={`ninja-body player ${player.action}`} style={{ left: player.x }}>
                    <div className="ninja-head"></div>
                    <div className="ninja-torso"></div>
                    <div className="ninja-legs"></div>
                    <div className="katana"></div>
                </div>

                {/* 👤 AI SHADOW */}
                <div className={`ninja-body ai ${ai.action}`} style={{ left: ai.x }}>
                    <div className="ninja-head shadow"></div>
                    <div className="ninja-torso shadow"></div>
                    <div className="ninja-legs shadow"></div>
                </div>
            </div>

            {/* 🧩 MATH OVERLAY */}
            {problem && (
                <div className={`math-modal ${isWrong ? 'shake' : ''}`}>
                    <div className="glass-card">
                        <h3>{problem}</h3>
                        <div className="options-grid">
                            {options.map((opt, i) => (
                                <button key={i} onClick={() => handleStrike(opt)}>{opt}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 🕹️ CONTROL DECK */}
            {!problem && (
                <div className="controls-glass">
                    <button className="move-btn" onClick={() => setPlayer(p => ({ ...p, x: Math.max(0, p.x - 40) }))}>◀</button>
                    <button className="strike-btn-main" onClick={generateProblem}>SHADOW STRIKE</button>
                    <button className="move-btn" onClick={() => setPlayer(p => ({ ...p, x: Math.min(ARENA_WIDTH, p.x + 40) }))}>▶</button>
                    <button className="exit-btn" onClick={onExit}>EXIT</button>
                </div>
            )}

            {gameState !== 'BATTLE' && (
                <div className="victory-overlay">
                    <h1>{gameState}</h1>
                    <button onClick={() => window.location.reload()}>REMATCH</button>
                </div>
            )}
        </div>
    );
}