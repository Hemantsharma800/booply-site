import React, { useState, useEffect, useCallback, useRef } from 'react';
import './app.css';

// 🎮 CORE GAME IMPORTS
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import NitroDash from './games/nitrodash.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import AILab from './games/ailab.jsx';
import FighterGame from './games/fightergame.jsx'; // 🥷 Shadow Duel
import GeoExplorer from './games/geoexplorer.jsx'; // 🌍 Terra Cognita AI

// ⚙️ CTO'S INTERNAL GAME REGISTRY
const INTERNAL_GAMES = {
  'dino-dash-v1': DinoGame,
  'color-fun-v1': ColorGame,
  'puzzle-pop-v1': PuzzlePop,
  'nitro-dash-v1': NitroDash,
  'kitchen-class-v1': KitchenClass,
  'ai-lab-v1': AILab,
  'fighter-v1': FighterGame,
  'geo-ai-v1': GeoExplorer,
};

// 🎡 FULL GAME REPOSITORY (CTO Optimized for Sales & SEO)
const MASTER_GAME_LIST = [
  { id: 'geo-ai-v1', name: 'Terra Cognita AI', color: '#00f2ff', icon: '🌍', category: 'Premium' },
  { id: 'fighter-v1', name: 'Shadow Duel', color: '#1a1a1a', icon: '🥷', category: 'Action' },
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

  // Carousel Navigation Logic
  const [heroIndex, setHeroIndex] = useState(0);
  const heroGames = MASTER_GAME_LIST.slice(0, 3); // Top 3 games in Hero Section

  // Persistence Engine
  useEffect(() => {
    localStorage.setItem('booply-stars', totalStars);
  }, [totalStars]);

  // Optional Login for Revenue Tracking
  const handleLogin = () => {
    const name = prompt("Enter your Hero Name to save progress!");
    if (name) {
      const newUser = { name, joined: new Date().toLocaleDateString() };
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
        <div className="main-lobby-ui fade-in">
          {/* 💎 ELITE HEADER WITH STAR COUNTER */}
          <header className="pro-header">
            <h1 className="brand-logo">Booply</h1>
            <div className="user-hub">
              {user ? (
                <div className="profile-pill">👤 {user.name}</div>
              ) : (
                <button className="login-btn pulse" onClick={handleLogin}>🔑 Sign Up</button>
              )}
              <div className="star-display-elite">⭐ {totalStars}</div>
            </div>
          </header>

          {/* 🏟️ HERO CAROUSEL (PBS KIDS STYLE) */}
          <section className="hero-carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${heroIndex * 100}%)` }}>
              {heroGames.map((game, idx) => (
                <div key={game.id} className="hero-slide" style={{ '--bg': game.color }}>
                  <div className="hero-content">
                    <span className="hero-emoji-floating">{game.icon}</span>
                    <div className="hero-details">
                      <h2>{game.name}</h2>
                      <button className="play-hero-btn" onClick={() => setActiveGame(game)}>PLAY NOW ▶</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-dots">
              {heroGames.map((_, i) => <div key={i} className={`dot ${i === heroIndex ? 'active' : ''}`} onClick={() => setHeroIndex(i)}></div>)}
            </div>
          </section>

          {/* 🎮 UNLIMITED GAME SHELVES (CRAZY GAMES STYLE) */}
          <main className="lobby-content">
            <h3 className="shelf-title">Our World of Games 🌎</h3>
            <div className="unlimited-grid">
              {MASTER_GAME_LIST.map(game => (
                <button
                  key={game.id}
                  className="game-card-elite"
                  style={{ '--theme': game.color }}
                  onClick={() => setActiveGame(game)}
                >
                  <div className="card-visual">{game.icon}</div>
                  <div className="card-info">
                    <span className="category-tag">{game.category}</span>
                    <span className="game-label">{game.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </main>

          {/* 🏆 LEVEL-UP PROGRESSION FOOTER */}
          <footer className="footer-progression">
            <div className="footer-content">
              <span className="level-badge">LVL {Math.floor(totalStars / 10) + 1}</span>
              <div className="level-track-outer">
                <div className="level-track-fill" style={{ width: `${(totalStars % 10) * 10}%` }}></div>
              </div>
              <span className="stars-needed">{10 - (totalStars % 10)} more to Level Up!</span>
            </div>
          </footer>
        </div>
      ) : (
        /* 🕹️ GAME EXECUTION STAGE */
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