import React, { useState } from 'react';
import './home.css';

const home = ({ stars, gamelist, onlaunchgame }) => {
    const [mode, setmode] = useState('kids'); // kids | parents

    return (
        <div className="lobby-vibe">
            <header className="lobby-header">
                <h1 className="logo">booply</h1>
                <div className="nav-hud">
                    <div className="stat">⭐ {stars}</div>
                    <button className="mode-toggle" onClick={() => setmode(mode === 'kids' ? 'parents' : 'kids')}>
                        {mode === 'kids' ? '👪 parents' : '🎮 arcade'}
                    </button>
                </div>
            </header>

            {mode === 'kids' ? (
                <main className="kids-arcade fade-in">
                    <section className="streak-badge">
                        <span className="fire-icon">🔥</span>
                        <div className="streak-text">
                            <strong>3-day streak!</strong>
                            <p>play today to unlock the "math master" badge.</p>
                        </div>
                    </section>

                    <div className="game-grid">
                        {gamelist.map(game => (
                            <button key={game.id} className="tile" style={{ '--color': game.color }} onClick={() => onlaunchgame(game.id)}>
                                <span className="icon">{game.icon}</span>
                                <p>{game.name}</p>
                            </button>
                        ))}
                    </div>
                </main>
            ) : (
                <section className="parent-portal fade-in">
                    <h2>parental care dashboard</h2>
                    <div className="report-card">
                        <div className="stat-card"><h3>activity</h3><p>45 mins today</p></div>
                        <div className="stat-card"><h3>focus</h3><p>math & logic</p></div>
                    </div>
                    <div className="parent-controls">
                        <h3>🛡️ safety & limits</h3>
                        <div className="control-row"><span>daily time limit (1hr)</span><input type="checkbox" /></div>
                        <div className="control-row"><span>educational-only mode</span><input type="checkbox" /></div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default home;