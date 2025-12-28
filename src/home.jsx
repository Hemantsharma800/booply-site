import React, { useState } from 'react';
import './home.css';

const home = ({ stars, gamelist, onlaunchgame }) => {
    const [activeview, setactiveview] = useState('arcade'); // arcade | parents

    return (
        <div className="booply-container fade-in">
            {/* 🧭 NAVIGATION HUD */}
            <header className="home-nav">
                <h1 className="brand-logo">booply</h1>
                <div className="hud-actions">
                    <div className="stat-pill stars">⭐ {stars}</div>
                    <button
                        className={`btn-view ${activeview === 'parents' ? 'active' : ''}`}
                        onClick={() => setactiveview(activeview === 'arcade' ? 'parents' : 'arcade')}
                    >
                        {activeview === 'arcade' ? '👪 parents' : '🎮 arcade'}
                    </button>
                </div>
            </header>

            {activeview === 'arcade' ? (
                <>
                    {/* 🔥 HERO SECTION: THE DAILY MISSION */}
                    <section className="hero-billboard">
                        <div className="hero-card">
                            <div className="hero-text">
                                <span className="badge">🎯 daily goal: 500 pts</span>
                                <h2>booply blast</h2>
                                <p>match the candies and earn the "neon nebula" badge!</p>
                                <button className="btn-play-hero" onClick={() => onlaunchgame('g1')}>play now</button>
                            </div>
                            <div className="hero-visual">🍭</div>
                        </div>
                    </section>

                    {/* 🎮 THE ELITE 10-GAME GRID */}
                    <section className="arcade-section">
                        <h3 className="section-title">all games</h3>
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
                    </section>

                    {/* 🏆 COMPETITOR-CRUSHING FEATURE: STREAK REWARDS */}
                    <section className="streak-zone">
                        <h3>your rewards cabinet</h3>
                        <div className="badge-row">
                            <div className="badge-item unlocked">🔥 3-day streak</div>
                            <div className="badge-item unlocked">🧠 math wizard</div>
                            <div className="badge-item locked">🔒 nebula voyager (unlock at 500 stars)</div>
                        </div>
                    </section>
                </>
            ) : (
                /* 🛡️ PARENTAL CARE CENTER: MODERN DASHBOARD */
                <section className="parent-portal fade-in">
                    <div className="portal-header">
                        <h2>parental care & insights</h2>
                        <p>track learning progress and set healthy limits.</p>
                    </div>

                    <div className="portal-grid">
                        <div className="portal-card">
                            <h3>📊 activity report</h3>
                            <p>time played today: <strong>42 mins</strong></p>
                            <p>favorite game: <strong>booply blast</strong></p>
                        </div>
                        <div className="portal-card">
                            <h3>🔒 safety & privacy</h3>
                            <div className="toggle-row">
                                <span>educational mode only</span>
                                <input type="checkbox" checked readOnly />
                            </div>
                            <div className="toggle-row">
                                <span>limit screen time (1hr)</span>
                                <input type="checkbox" />
                            </div>
                        </div>
                        <div className="portal-card full-width">
                            <h3>📈 skill growth metrics</h3>
                            <div className="skill-bar"><div className="fill" style={{ width: '75%' }}>logic & math: 75%</div></div>
                            <div className="skill-bar"><div className="fill pink" style={{ width: '50%' }}>speed & focus: 50%</div></div>
                        </div>
                    </div>
                </section>
            )}

            <section className="social-proof">
                <div className="review">⭐⭐⭐⭐⭐ "the best way to learn math!" - alex m.</div>
                <div className="review">⭐⭐⭐⭐ "my kids are obsessed with the rewards." - sarah j.</div>
            </section>

            <footer className="footer-minimal">
                <p>booply &copy; 2025 | safety first arcade</p>
            </footer>
        </div>
    );
};

export default home;