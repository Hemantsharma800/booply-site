import React from 'react';
import './home.css';

const home = ({ dailyscore, stars, onlaunchgame, onshowfeedback, privacyopen, setprivacyopen, gamelist }) => {
    return (
        <div className="home-wrapper fade-in">
            <header className="elite-nav">
                <h1 className="brand-logo">booply</h1>
                <div className="hud-group">
                    <div className="pill-stat daily">daily: <span>{dailyscore}</span></div>
                    <div className="pill-stat star">⭐ {stars}</div>
                    <button className="feedback-trigger" onClick={onshowfeedback}>feedback</button>
                </div>
            </header>

            <section className="hero-box">
                <div className="hero-card">
                    <div className="hero-info">
                        <small className="hero-tag">🔥 daily mission</small>
                        <h2 className="hero-title">booply blast</h2>
                        <p className="hero-desc">the ultimate puzzle for your brain.</p>
                        <button className="hero-play-btn" onClick={() => onlaunchgame('g1')}>play now</button>
                    </div>
                    <div className="hero-art">🍭</div>
                </div>
            </section>

            {/* 🎮 grid system fix: avoids overlap on macbook pro */}
            <div className="arcade-grid-elite">
                {gamelist.map(game => (
                    <button
                        key={game.id}
                        className="game-card-premium"
                        onClick={() => onlaunchgame(game.id)}
                        style={{ '--game-theme': game.color }}
                    >
                        <span className="game-icon">{game.icon}</span>
                        <div className="game-meta">
                            <span className="game-name">{game.name}</span>
                            <span className="game-cat">{game.cat}</span>
                        </div>
                    </button>
                ))}
            </div>

            <section className="review-strip">
                <div className="review-card">⭐⭐⭐⭐⭐ "addictive and educational!" - sarah k.</div>
                <div className="review-card">⭐⭐⭐⭐ "learned all animal names in a day." - david l.</div>
                <div className="review-card">⭐⭐⭐⭐⭐ "neon theme is incredible." - user 99</div>
            </section>

            <footer className="footer-minimal">
                <button className="privacy-link" onClick={() => setprivacyopen(!privacyopen)}>
                    privacy & safety policy
                </button>
                {privacyopen && (
                    <div className="privacy-text fade-in">
                        <p>booply uses local storage to save your progress. no personal data is tracked. notifications are for play reminders only.</p>
                    </div>
                )}
            </footer>
        </div>
    );
};

export default home;