import React from 'react';
import './home.css';

const home = ({ dailyscore, stars, onlaunchgame, onshowfeedback, privacyopen, setprivacyopen, gamelist }) => {
    return (
        <div className="home-layout-root fade-in">
            <header className="home-nav-bar">
                <h1 className="logo-text">booply</h1>
                <div className="hud-display">
                    <div className="hud-box daily">daily: <span>{dailyscore}</span></div>
                    <div className="hud-box stars">⭐ {stars}</div>
                    <button className="btn-rate" onClick={onshowfeedback}>feedback</button>
                </div>
            </header>

            <section className="hero-billboard">
                <div className="hero-content-card">
                    <div className="hero-info">
                        <small className="hero-badge">🔥 recommended</small>
                        <h2>booply blast</h2>
                        <p>the ultimate puzzle for your brain.</p>
                        <button className="hero-play" onClick={() => onlaunchgame('g1')}>play now</button>
                    </div>
                    <div className="hero-visual">🍭</div>
                </div>
            </section>

            {/* 🎮 GRID FIX: Prevents overlapping buttons */}
            <div className="arcade-grid-system">
                {gamelist.map(game => (
                    <button
                        key={game.id}
                        className="arcade-tile"
                        onClick={() => onlaunchgame(game.id)}
                        style={{ '--theme': game.color }}
                    >
                        <span className="tile-icon">{game.icon}</span>
                        <div className="tile-meta">
                            <span className="tile-name">{game.name}</span>
                            <span className="tile-cat">{game.cat}</span>
                        </div>
                    </button>
                ))}
            </div>

            <section className="review-strip">
                <div className="review">⭐⭐⭐⭐⭐ "addictive and educational!" - sarah k.</div>
                <div className="review">⭐⭐⭐⭐ "my kids love the dino game." - parent r.</div>
                <div className="review">⭐⭐⭐⭐⭐ "the neon theme is incredible." - user 99</div>
            </section>

            <footer className="home-footer">
                <button className="privacy-toggle" onClick={() => setprivacyopen(!privacyopen)}>privacy & safety policy</button>
                {privacyopen && (
                    <div className="privacy-info fade-in">
                        <p>booply uses browser storage to save your daily stars. all data is kept locally.</p>
                    </div>
                )}
            </footer>
        </div>
    );
};

export default home;