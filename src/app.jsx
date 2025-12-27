import React, { useState, useEffect, useCallback, Suspense } from 'react';
import './App.css';

// 🎮 GAME REGISTRY (Placeholders for remaining games to avoid errors)
import BooplyBlast from './games/booplyblast.jsx';
import SafariStudy from './games/junglegame.jsx';
import SafariDash from './games/dinogame.jsx';
// Placeholder for other 7 games to maintain 10-game structure
const Placeholder = ({ onExit }) => (
  <div className="placeholder-stage">
    <h2>Game Under Construction</h2>
    <button onClick={onExit}>BACK TO LOBBY</button>
  </div>
);

const INTERNAL_GAMES = {
  'g1': BooplyBlast, 'g2': SafariStudy, 'g3': SafariDash,
  'g4': Placeholder, 'g5': Placeholder, 'g6': Placeholder,
  'g7': Placeholder, 'g8': Placeholder, 'g9': Placeholder, 'g10': Placeholder
};

const MASTER_GAME_LIST = [
  { id: 'g1', name: 'Booply Blast', icon: '🍭', color: '#ff00de', cat: 'Puzzle' },
  { id: 'g2', name: 'Safari Study', icon: '🦁', color: '#39ff14', cat: 'Identification' },
  { id: 'g3', name: 'Safari Dash', icon: '🦖', color: '#00f2ff', cat: 'Runner' },
  { id: 'g4', name: 'Shadow Duel', icon: '🥷', color: '#bc13fe', cat: 'Action' },
  { id: 'g5', name: 'Math Matrix', icon: '🔢', color: '#ffd700', cat: 'Logic' },
  { id: 'g6', name: 'Aqua Match', icon: '🐟', color: '#00d4ff', cat: 'Puzzle' },
  { id: 'g7', name: 'Sky Racer', icon: '🚀', color: '#ff4757', cat: 'Action' },
  { id: 'g8', name: 'Geo Explorer', icon: '🌍', color: '#4cd137', cat: 'Study' },
  { id: 'g9', name: 'Word Woods', icon: '📚', color: '#fbc531', cat: 'English' },
  { id: 'g10', name: 'Star Sort', icon: '✨', color: '#9c88ff', cat: 'Logic' },
];

export default function App() {
  const [view, setView] = useState('lobby');
  const [activeGame, setActiveGame] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // 🍪 DATA PERSISTENCE
  const [stars, setStars] = useState(() => Number(localStorage.getItem('stars')) || 278);
  const [dailyScore, setDailyScore] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('daily-stats'));
    const today = new Date().toDateString();
    // Auto-reset daily score if day has changed
    if (saved && saved.date === today) return saved.score;
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('stars', stars);
    localStorage.setItem('daily-stats', JSON.stringify({ score: dailyScore, date: new Date().toDateString() }));

    // 🔔 NOTIFICATION REQUEST
    if (Notification.permission === 'default') {
      setTimeout(() => Notification.requestPermission(), 5000);
    }
  }, [stars, dailyScore]);

  const updateStats = (s, d) => {
    setStars(prev => prev + s);
    setDailyScore(prev => prev + d);
  };

  return (
    <div className="booply-main-container">
      {view === 'lobby' ? (
        <div className="lobby-layout fade-in">
          <header className="elite-navbar">
            <h1 className="logo-brand">BOOPLY</h1>
            <div className="hud-right">
              <div className="hud-stat-pill daily">DAILY: <span>{dailyScore}</span></div>
              <div className="hud-stat-pill stars">⭐ {stars}</div>
              <button className="btn-feedback-trigger" onClick={() => setShowFeedback(true)}>FEEDBACK</button>
            </div>
          </header>

          <section className="hero-billboard">
            <div className="hero-card-vibrant">
              <div className="hero-info-side">
                <small className="hero-tag">🎯 DAILY MISSION</small>
                <h2>BOOPLY BLAST</h2>
                <p>The ultimate puzzle for your brain. Match and solve!</p>
                <button className="btn-hero-play" onClick={() => { setActiveGame('g1'); setView('game'); }}>PLAY NOW</button>
              </div>
              <div className="hero-visual-side">🍭</div>
            </div>
          </section>

          {/* 🎮 10 GAME GRID */}
          <div className="arcade-master-grid">
            {MASTER_GAME_LIST.map(game => (
              <button key={game.id} className="game-card-elite" onClick={() => { setActiveGame(game.id); setView('game'); }} style={{ '--theme': game.color }}>
                <span className="card-emoji">{game.icon}</span>
                <div className="card-labels">
                  <span className="card-name">{game.name}</span>
                  <span className="card-cat">{game.cat}</span>
                </div>
              </button>
            ))}
          </div>

          <section className="social-proof-strip">
            <div className="review-item">⭐⭐⭐⭐⭐ "Addictive and educational!" - Sarah K.</div>
            <div className="review-item">⭐⭐⭐⭐ "My son learned all animal names in a day." - David L.</div>
            <div className="review-item">⭐⭐⭐⭐⭐ "The neon theme is incredible." - User 99</div>
          </section>

          <footer className="footer-area">
            <button className="btn-privacy-link" onClick={() => setPrivacyOpen(!privacyOpen)}>PRIVACY & SAFETY POLICY</button>
            {privacyOpen && (
              <div className="privacy-drawer fade-in">
                <p>Booply uses local browser storage (cookies) to save your daily scores and stars locally. No personal ID is tracked. Notifications are used only for play reminders.</p>
              </div>
            )}
          </footer>
        </div>
      ) : (
        <div className="game-fullscreen-stage">
          {activeGame && React.createElement(INTERNAL_GAMES[activeGame], {
            onExit: () => setView('lobby'),
            onCorrectClick: () => updateStats(5, 100)
          })}
        </div>
      )}

      {showFeedback && (
        <div className="modal-overlay">
          <div className="feedback-modal-card">
            <h2>GAMES FEEDBACK</h2>
            <div className="stars-row-big">⭐⭐⭐⭐⭐</div>
            <textarea placeholder="Suggestions or favorite animals?" className="modal-textarea" />
            <div className="modal-buttons-row">
              <button className="btn-modal-cancel" onClick={() => setShowFeedback(false)}>CANCEL</button>
              <button className="btn-modal-send" onClick={() => setShowFeedback(false)}>SUBMIT FEEDBACK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}