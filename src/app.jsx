import React, { useState, useEffect, useCallback, useRef } from 'react';
import './app.css';

// 🎮 Game Component Imports
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import NitroDash from './games/nitrodash.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import AILab from './games/ailab.jsx';
import FighterGame from './games/fightergame.jsx';

// ⚙️ INTERNAL GAME REGISTRY
const INTERNAL_GAMES = {
  'dino-dash-v1': DinoGame,
  'color-fun-v1': ColorGame,
  'puzzle-pop-v1': PuzzlePop,
  'nitro-dash-v1': NitroDash,
  'kitchen-class-v1': KitchenClass,
  'ai-lab-v1': AILab,
  'fighter-v1': FighterGame,
};

// 🎡 FULL GAME REPOSITORY
const MASTER_GAME_LIST = [
  { id: 'fighter-v1', name: 'Shadow Duel', color: '#2c3e50', icon: '🥷', category: 'Action' },
  { id: 'nitro-dash-v1', name: 'Nitro Dash', color: '#FF4757', icon: '🏎️', category: 'Action' },
  { id: 'ai-lab-v1', name: 'AI Scanner', color: '#7E57C2', icon: '🧠', category: 'Learning' },
  { id: 'kitchen-class-v1', name: 'Kitchen Class', color: '#FF7043', icon: '🍳', category: 'Learning' },
  { id: 'puzzle-pop-v1', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', category: 'Featured' },
  { id: 'color-fun-v1', name: 'Color Fun', color: '#1E90FF', icon: '🎨', category: 'Featured' },
  { id: 'dino-dash-v1', name: 'Dino Dash', color: '#FF6347', icon: '🦖', category: 'Action' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [totalStars, setTotalStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 0);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('booply-user')) || null);

  // Carousel State
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTimeoutRef = useRef(null);
  const heroGames = MASTER_GAME_LIST.slice(0, 3); // Use top 3 for hero

  // Persistence & Hero Timer
  useEffect(() => {
    localStorage.setItem('booply-stars', totalStars);
    resetHeroTimer();
    return () => {
      if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
    };
  }, [totalStars, heroIndex]);

  const resetHeroTimer = () => {
    if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
    heroTimeoutRef.current = setTimeout(() => {
      setHeroIndex((prev) => (prev === heroGames.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
  };

  const handleLogin = () => {
    const name = prompt("Enter your Hero Name to save progress!");
    if (name) {
      const newUser = { name, level: 1 };
      setUser(newUser);
      localStorage.setItem('booply-user', JSON.stringify(newUser));
    }
  };

  const handleCorrect = useCallback(() => {
    setTotalStars(s => s + 1);
  }, []);

  return (
    <div className="booply-elite-container">
      {!activeGame ? (
        <div className="main-lobby-ui">
          {/* 💎 1. ELITE GLASS HEADER */}
          <header className="pro-header">
            <div className="logo-section">
              <h1 className="brand-logo">Booply</h1>
            </div>
            <div className="user-hub">
              {user ? (
                <div className="profile-pill">👤 {user.name}</div>
              ) : (
                <button className="login-btn pulse-btn" onClick={handleLogin}>🔑 Login / Sign Up</button>
              )}
              <div className="star-bank-elite">
                <span className="star-icon">⭐</span>
                <span className="star-count">{totalStars}</span>
              </div>
            </div>
          </header>

          {/* 🏟️ 2. DYNAMIC HERO CAROUSEL */}
          <section className="hero-carousel-container">
            <div className="carousel-track" style={{ transform: `translateX(${-heroIndex * 100}%)` }}>
              {heroGames.map((game) => (
                <div key={game.id} className="hero-slide" style={{ '--hero-bg': game.color }}>
                  <div className="hero-content glass-panel">
                    <span className="hero-icon floating">{game.icon}</span>
                    <div className="hero-details">
                      <h1>Featured: {game.name}</h1>
                      <button className="play-hero-btn" onClick={() => setActiveGame(game)}>PLAY NOW ▶</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-indicators">
              {heroGames.map((_, idx) => (
                <div key={idx} className={`indicator ${idx === heroIndex ? 'active' : ''}`}></div>
              ))}
            </div>
          </section>

          {/* 🎮 3. UNLIMITED GAME GRID (The Fix) */}
          <main className="lobby-content">
            <div className="shelf-header">
              <h3 className="shelf-title">All Games Collection</h3>
              <span className="game-count-badge">{MASTER_GAME_LIST.length} Games ready!</span>
            </div>

            <div className="unlimited-grid">
              {MASTER_GAME_LIST.map(game => (
                <button
                  key={game.id}
                  className="game-card-elite"
                  style={{ '--theme-color': game.color }}
                  onClick={() => setActiveGame(game)}
                >
                  <div className="card-visual-elite">{game.icon}</div>
                  <div className="card-info">
                    <span className="card-category">{game.category}</span>
                    <span className="card-label">{game.name}</span>
                  </div>
                  <div className="card-shine"></div>
                </button>
              ))}
            </div>
          </main>

          {/* 🏆 4. PERSISTENT LEVEL FOOTER */}
          <footer className="footer-status glass-footer">
            <div className="level-track-elite">
              <div className="level-info">
                <span className="trophy-icon">🏆</span>
                <span>Level {Math.floor(totalStars / 10) + 1}</span>
              </div>
              <div className="progress-bg-elite">
                <div className="progress-fill-elite" style={{ width: `${(totalStars % 10) * 10}%` }}>
                  <div className="progress-glare"></div>
                </div>
              </div>
              <span className="next-level-hint">{10 - (totalStars % 10)} stars to next level!</span>
            </div>
          </footer>
        </div>
      ) : (
        /* 🕹️ ACTIVE GAME STAGE */
        <div className="active-game-stage">
          {React.createElement(INTERNAL_GAMES[activeGame.id], {
            onExit: () => setActiveGame(null),
            onCorrectClick: handleCorrect
          })}
        </div>
      )}
    </div>
  );
}

export default App;