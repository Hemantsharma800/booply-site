import React, { useState, useEffect, useCallback, Suspense } from 'react';
import './app.css';

// 🎮 PREVIOUS GAME REGISTRY
import BooplyBlast from './games/booplyblast.jsx';
import JungleGame from './games/dinogame.jsx'; // Updated Identification Game
import FighterGame from './games/fightergame.jsx';
// (Include other games as previously defined)

const INTERNAL_GAMES = {
  'blast-v1': BooplyBlast,
  'jungle-v1': JungleGame,
  'fighter-v1': FighterGame,
};

const MASTER_GAME_LIST = [
  { id: 'blast-v1', name: 'Booply Blast', color: '#ff00de', icon: '🍭', category: 'Puzzle' },
  { id: 'jungle-v1', name: 'Safari Study', color: '#39ff14', icon: '🦁', category: 'Identification' },
  { id: 'fighter-v1', name: 'Shadow Duel', color: '#00f2ff', icon: '🥷', category: 'Math-Action' },
];

export default function App() {
  const [view, setView] = useState('lobby');
  const [activeGame, setActiveGame] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // 🍪 PERSISTENT DATA & DAILY SCORE
  const [stars, setStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 0);
  const [dailyScore, setDailyScore] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('booply-daily-stats'));
    const today = new Date().toDateString();
    // 🛠️ Automatic Daily Refresh
    if (saved && saved.date === today) return saved.score;
    return 0;
  });

  // 🔔 NOTIFICATION SYSTEM
  const requestNotificationPermission = useCallback(async () => {
    if (!("Notification" in window)) return;

    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification("Booply Welcome!", {
          body: "The arcade is ready. Can you beat your daily score?",
          icon: "/logo192.png"
        });
      }
    }
  }, []);

  useEffect(() => {
    // Save state to cookies/localStorage
    localStorage.setItem('booply-stars', stars);
    const stats = { score: dailyScore, date: new Date().toDateString() };
    localStorage.setItem('booply-daily-stats', JSON.stringify(stats));

    // Request notification after 5 seconds of first visit
    const timer = setTimeout(requestNotificationPermission, 5000);
    return () => clearTimeout(timer);
  }, [stars, dailyScore, requestNotificationPermission]);

  const updateScores = useCallback(() => {
    setStars(prev => prev + 5);
    setDailyScore(prev => prev + 100);
  }, []);

  return (
    <div className="booply-root">
      {view === 'lobby' && (
        <div className="lobby-view fade-in">
          <header className="elite-header">
            <h1 className="logo">BOOPLY</h1>
            <div className="header-actions">
              <div className="daily-stats-pill">DAILY: <span>{dailyScore}</span></div>
              <div className="star-counter">⭐ {stars}</div>
              <button className="feedback-trigger" onClick={() => setShowFeedback(true)}>FEEDBACK</button>
            </div>
          </header>

          <main className="content-container">
            {/* HERO SECTION */}
            <section className="hero-section">
              <div className="hero-card">
                <span className="hero-icon">🍭</span>
                <div className="hero-text">
                  <span className="badge">DAILY CHALLENGE</span>
                  <h2>BOOPLY BLAST</h2>
                  <p>The ultimate puzzle for your brain.</p>
                  <button className="launch-btn" onClick={() => { setActiveGame({ id: 'blast-v1' }); setView('game'); }}>PLAY NOW</button>
                </div>
              </div>
            </section>

            {/* ARCADE GRID */}
            <div className="arcade-grid">
              {MASTER_GAME_LIST.map(game => (
                <button key={game.id} className="game-tile" onClick={() => { setActiveGame(game); setView('game'); }} style={{ '--theme': game.color }}>
                  <span className="tile-emoji">{game.icon}</span>
                  <div className="tile-info">
                    <span className="tile-name">{game.name}</span>
                    <span className="tile-cat">{game.category}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* ⭐ ENGAGEMENT REVIEWS */}
            <section className="review-strip">
              <div className="review-card">⭐⭐⭐⭐⭐ "Addictive and educational!" - Sarah K.</div>
              <div className="review-card">⭐⭐⭐⭐ "My son learned all animal names in a day." - David L.</div>
              <div className="review-card">⭐⭐⭐⭐⭐ "The neon theme is incredible." - User 99</div>
            </section>
          </main>

          <footer className="lobby-footer">
            <button className="footer-text-link" onClick={() => setPrivacyOpen(!privacyOpen)}>
              {privacyOpen ? "CLOSE PRIVACY" : "PRIVACY & SAFETY POLICY"}
            </button>
            {privacyOpen && (
              <div className="minimal-privacy-box fade-in">
                <p>Booply uses local cookies to store your daily score and star progress. We do not collect names or emails.
                  Notifications are used only for game reminders. All data stays on your device.</p>
              </div>
            )}
          </footer>
        </div>
      )}

      {/* 📝 FEEDBACK & RATING POPUP */}
      {showFeedback && (
        <div className="full-overlay fade-in">
          <div className="modal-glass feedback-modal">
            <h2>GAMES FEEDBACK</h2>
            <p>Tell us what to add next!</p>
            <div className="rating-selector">⭐⭐⭐⭐⭐</div>
            <textarea placeholder="Your suggestions..." className="suggestion-box"></textarea>
            <div className="modal-buttons">
              <button className="secondary-btn" onClick={() => setShowFeedback(false)}>CANCEL</button>
              <button className="primary-btn" onClick={() => setShowFeedback(false)}>SEND REVIEW</button>
            </div>
          </div>
        </div>
      )}

      {/* 🕹️ GAME STAGE */}
      {view === 'game' && activeGame && (
        <div className="stage-fullscreen">
          <Suspense fallback={<div className="loader">ENGINE LOADING...</div>}>
            {React.createElement(INTERNAL_GAMES[activeGame.id], {
              onExit: () => setView('lobby'),
              onCorrectClick: updateScores
            })}
          </Suspense>
        </div>
      )}
    </div>
  );
}