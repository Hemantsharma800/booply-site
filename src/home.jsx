import React, { useState } from 'react';
import './home.css';

const home = ({ stars, gamelist, onlaunchgame }) => {
    const [view, setview] = useState('arcade'); // arcade | parent

    // 🔥 TOP PICKS & PUNCH LINES
    const top_picks = [
        { id: 'g1', name: 'booply blast', punch: 'match the magic, master the math!', icon: '🍭', color: '#ff00de' },
        { id: 'g8', name: 'nitro dash', punch: 'speed meets logic at 200 mph!', icon: '🏎️', color: '#00d4ff' },
        { id: 'g10', name: 'snake game', punch: 'the classic evolution of focus!', icon: '🐍', color: '#fbc531' }
    ];

    return (
        <div className="booply-premium-root fade-in">
            <header className="glass-nav">
                <h1 className="logo-glow">booply</h1>
                <div className="nav-hud">
                    <div className="stat-box">⭐ {stars}</div>
                    <button className="btn-toggle" onClick={() => setview(view === 'arcade' ? 'parent' : 'arcade')}>
                        {view === 'arcade' ? '👪 parental care' : '🎮 back to arcade'}
                    </button>
                </div>
            </header>

            {view === 'arcade' ? (
                <main className="arcade-wrapper">
                    {/* 🎡 TOP PICKS SECTION */}
                    <section className="top-picks-container">
                        <h2 className="section-label">🔥 top picks for you</h2>
                        <div className="picks-grid">
                            {top_picks.map(pick => (
                                <div key={pick.id} className="pick-card" style={{ '--accent': pick.color }} onClick={() => onlaunchgame(pick.id)}>
                                    <div className="pick-visual">{pick.icon}</div>
                                    <div className="pick-info">
                                        <h3>{pick.name}</h3>
                                        <p>"{pick.punch}"</p>
                                        <button className="btn-ignite">play now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 🎮 ALL GAMES GRID */}
                    <section className="all-games-container">
                        <h2 className="section-label">🕹️ featured games</h2>
                        <div className="elite-grid">
                            {gamelist.map(game => (
                                <button key={game.id} className="premium-tile" style={{ '--theme': game.color }} onClick={() => onlaunchgame(game.id)}>
                                    <span className="tile-icon">{game.icon}</span>
                                    <div className="tile-meta">
                                        <span className="name">{game.name}</span>
                                        <span className="tag">pro arcade</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 🌌 FUTURE LAYERS ROADMAP */}
                    <section className="roadmap-strip">
                        <div className="roadmap-content">
                            <h3>🚀 new layers arriving</h3>
                            <p>multiplayer arenas, global ranks, and modular skins are 85% complete.</p>
                        </div>
                    </section>
                </main>
            ) : (
                /* 🛡️ PARENTAL CARE PORTAL */
                <section className="parent-portal-view fade-in">
                    <div className="portal-header">
                        <h2>parental care & insights</h2>
                        <p>track learning growth and set healthy screen limits.</p>
                    </div>
                    <div className="portal-grid">
                        <div className="insight-card"><h3>📈 logic growth</h3><div className="bar"><div className="fill" style={{ width: '75%' }}>75%</div></div></div>
                        <div className="insight-card"><h3>🛡️ safety vault</h3><p>educational mode: <strong>active</strong></p></div>
                    </div>
                </section>
            )}

            <footer className="glass-footer">booply elite math arcade &copy; 2025</footer>
        </div>
    );
};

export default home;