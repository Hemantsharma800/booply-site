import React, { useState } from 'react';
import './home.css';

const home = ({ stars, dailyscore, gamelist, onlaunchgame }) => {
    const [activeview, setactiveview] = useState('arcade'); // arcade | parent

    return (
        <div className="booply-container fade-in">
            {/* 🧭 NAVIGATION HUD */}
            <header className="home-nav">
                <h1 className="brand-logo">booply</h1>
                <div className="hud-actions">
                    <div className="stat-pill stars">⭐ {stars}</div>
                    <button
                        className={`btn-view ${activeview === 'parent' ? 'active' : ''}`}
                        onClick={() => setactiveview(activeview === 'arcade' ? 'parent' : 'arcade')}
                    >
                        {activeview === 'arcade' ? '👪 parents' : '🎮 arcade'}
                    </button>
                </div>
            </header>

            {activeview === 'arcade' ? (
                <>
                    {/* 🔥 HERO SECTION: DAILY MISSION */}
                    <section className="hero-billboard">
                        <div className="hero-card">
                            <div className="hero-text">
                                <span className="badge">daily goal: 500 pts</span>
                                <h2>booply blast</h2>
                                <p>unlock the "neon nebula" badge today!</p>
                                <button className="btn-play-hero" onClick={() => onlaunchgame('g1')}>play now</button>
                            </div>
                            <div className="hero-visual">🍭</div>
                        </div>
                    </section>

                    {/* 🎮 10-GAME GRID FIX: MacBook Pro Grid Stabilization */}
                    <div className="arcade-grid">
                        {gamelist.map((game) => (
                            <button
                                key={game.id}
                                className="game-tile"
                                style={{ '--theme': game.color }}
                                onClick={() => onlaunchgame(game.id)}
                            >
                                <span className="game-icon">{game.icon}</span>
                                <div className="game-info">
                                    <span className="game-name">{game.name}</span>
                                    <span className="game-cat">{game.cat}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* 🏆 COMPETITOR KILLER: Live Badge Streak */}
                    <section className="streak-zone">
                        <h3>your rewards cabinet</h3>
                        <div className="badge-row">
                            <div className="badge-item unlocked">🔥 3-day streak</div>
                            <div className="badge-item unlocked">🧠 math wizard</div>
                            <div className="badge-item locked">🔒 nebula voyager (reaches 500 stars)</div>
                        </div>
                    </section>
                </>
            ) : (
                /* 🛡️ PARENTAL CARE CENTER (Modern Dashboard Layout) */
                <section className="parent-portal fade-in">
                    <div className="portal-header">
                        <h2>parental care & insights</h2>
                        <p>track progress and set healthy limits.</p>
                    </div>

                    <div className="portal-grid">
                        <div className="portal-card">
                            <h3>📊 activity report</h3>
                            <p>time played today: <strong>42 mins</strong></p>
                            <p>most played: <strong>{gamelist[0].name}</strong></p>
                        </div>
                        <div className="portal-card">
                            <h3>🔒 safety settings</h3>
                            <div className="toggle-row">
                                <span>safe-chat only</span>
                                <input type="checkbox" checked readOnly />
                            </div>
                            <div className="toggle-row">
                                <span>screen time limit (1hr)</span>
                                <input type="checkbox" />
                            </div>
                        </div>
                        <div className="portal-card full-width">
                            <h3>📈 skill growth</h3>
                            <div className="skill-bar"><div className="fill" style={{ width: '70%' }}>logic: 70%</div></div>
                            <div className="skill-bar"><div className="fill" style={{ width: '45%' }}>math: 45%</div></div>
                        </div>
                    </div>
                </section>
            )}

            <footer className="footer-vibe">
                <p>booply &copy; 2025 | elite math arcade</p>
            </footer>
        </div>
    );
};

export default home;