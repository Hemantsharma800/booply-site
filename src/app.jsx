import React, { useState, useEffect, useCallback, Suspense } from 'react';
import './App.css';

// 🎮 GAME REGISTRY
import BooplyBlast from './games/booplyblast.jsx';
import JungleGame from './games/junglegame.jsx'; // Static ID version
import SafariDash from './games/dinogame.jsx';   // Runner version

const INTERNAL_GAMES = {
  'blast': BooplyBlast,
  'jungle': JungleGame,
  'dash': SafariDash
};

const MASTER_GAME_LIST = [
  { id: 'blast', name: 'Booply Blast', color: '#ff00de', icon: '🍭', cat: 'Puzzle' },
  { id: 'jungle', name: 'Safari Study', color: '#39ff14', icon: '🦁', cat: 'Identification' },
  { id: 'dash', name: 'Safari Dash', color: '#00f2ff', icon: '🦖', cat: 'Runner' },
];

export default function App() {
  const [view, setView] = useState('lobby');
  const [activeGameId, setActiveGameId] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // 🍪 PERSISTENCE & DAILY RESET
  const [stars, setStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 278);
  const [dailyScore, setDailyScore] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('booply-daily-stats'));
    const today = new Date().toDateString();
    if (saved && saved.date === today) return saved.score;
    return 0; // Auto-reset for new day
  });

  useEffect(() => {
    localStorage.setItem('booply-stars', stars);
    localStorage.setItem('booply-daily-stats', JSON.stringify({ score: dailyScore, date: new Date().toDateString() }));

    // 🔔 NOTIFICATION REQUEST
    if (Notification.permission === 'default') {
      setTimeout(() => Notification.requestPermission(), 5000);
    }
  }, [stars, dailyScore]);

  const updateGlobalStats = (s, d) => {
    setStars(prev => prev + s);
    setDailyScore(prev => prev + d);
  };

  return (
    <div className="booply-platform-root">
      {view === 'lobby' ? (
        <div className="lobby-content fade-in">
          <header className="elite-header">
            <h1 className="logo">BOOPLY</h1>
            <div className="hud-controls">
              <div className="pill daily">DAILY: <span>{dailyScore}</span></div>
              <div className="pill star">⭐ {stars}</div>
              <button className="feedback-trigger" onClick={() => setShowFeedback(true)}>FEEDBACK</button>
            </div>
          </header>

          <section className="hero-arena">
            <div className="featured-card">
              <div className="featured-info">
                <small className="badge">🔥 FEATURED GAME</small>
                <h2>BOOPLY BLAST</h2>
                <p>Match the candies to fuel your brain power.</p>
                <button className="cta-play" onClick={() => { setActiveGameId('blast'); setView('game'); }}>PLAY NOW</button>
              </div>
              <div className="featured-visual">🍭</div>
            </div>
          </section>

          <div className="arcade-grid-system">
            {MASTER_GAME_LIST.map(game => (
              <button key={game.id} className="premium-tile" onClick={() => { setActiveGameId(game.id); setView('game'); }} style={{ '--theme': game.color }}>
                <span className="tile-emoji">{game.icon}</span>
                <div className="tile-details">
                  <span className="tile-title">{game.name}</span>
                  <span className="tile-subtitle">{game.cat}</span>
                </div>
              </button>
            ))}
          </div>

          <section className="rating-strip">
            <div className="review-item">⭐⭐⭐⭐⭐ "The best way to learn animal names!" - Parent</div>
            <div className="review-item">⭐⭐⭐⭐ "Graphics are amazing on my laptop." - User 44</div>
            <div className="review-item">⭐⭐⭐⭐⭐ "Daily goals keep my kids engaged." - Teacher</div>
          </section>

          <footer className="compact-footer">
            <button className="policy-toggle" onClick={() => setPrivacyOpen(!privacyOpen)}>PRIVACY & SAFETY POLICY</button>
            {privacyOpen && (
              <div className="policy-text fade-in">
                <p>Booply uses local browser cookies to store your progress. Notifications are only used for daily reminders. No identity data is shared.</p>
              </div>
            )}
          </footer>
        </div>
      ) : (
        <div className="game-stage-fullscreen">
          <Suspense fallback={<div className="booply-loader">ARCADE LOADING...</div>}>
            {React.createElement(INTERNAL_GAMES[activeGameId], {
              onExit: () => setView('lobby'),
              onCorrectClick: () => updateGlobalStats(5, 100)
            })}
          </Suspense>
        </div>
      )}

      {showFeedback && (
        <div className="overlay-blur">
          <div className="feedback-modal-card">
            <h2>GAMES FEEDBACK</h2>
            <div className="stars-row">⭐⭐⭐⭐⭐</div>
            <textarea placeholder="Tell us your favorite game or animal!" className="modal-input" />
            <div className="modal-actions">
              <button className="btn-close" onClick={() => setShowFeedback(false)}>CANCEL</button>
              <button className="btn-send" onClick={() => setShowFeedback(false)}>SEND FEEDBACK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}