import React, { useState, useEffect, useRef } from 'react';
import './app.css';

// 🎮 Game Imports
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import NitroDash from './games/nitrodash.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import AILab from './games/ailab.jsx';
import MultiplayerHost from './games/MultiplayerHost.jsx';

const INTERNAL_GAMES = {
  'dino-dash-v1': DinoGame,
  'color-fun-v1': ColorGame,
  'puzzle-pop-v1': PuzzlePop,
  'nitro-dash-v1': NitroDash,
  'kitchen-class-v1': KitchenClass,
  'ai-lab-v1': AILab,
  'multiplayer-host-v1': MultiplayerHost,
};

const MASTER_GAME_LIST = [
  { id: 'nitro-dash-v1', name: 'Nitro Dash', color: '#FF4757', icon: '🏎️', category: 'Action' },
  { id: 'ai-lab-v1', name: 'AI Scanner', color: '#7E57C2', icon: '🧠', category: 'Learning' },
  { id: 'kitchen-class-v1', name: 'Kitchen Class', color: '#FF7043', icon: '🍳', category: 'Learning' },
  { id: 'puzzle-pop-v1', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', category: 'Featured' },
  { id: 'color-fun-v1', name: 'Color Fun', color: '#1E90FF', icon: '🎨', category: 'Featured' },
  { id: 'dino-dash-v1', name: 'Dino Dash', color: '#FF6347', icon: '🦖', category: 'Action' },
  { id: 'multiplayer-host-v1', name: 'Multiplayer Hub', color: '#32CD32', icon: '🌐', category: 'Featured' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [totalStars, setTotalStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 0);
  const [carouselIdx, setCarouselIdx] = useState(0);

  // Auto-slide Hero Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredGames = MASTER_GAME_LIST.slice(0, 3);

  return (
    <div className="booply-pro-container">
      {!activeGame ? (
        <div className="main-lobby-ui">
          {/* 🏔️ 1. Professional Header */}
          <header className="pro-header">
            <div className="logo-section">
              <h1 className="brand-logo">Booply</h1>
              <div className="nav-pills">
                <button className="pill active">🎮 GAMES</button>
                <button className="pill">📺 VIDEOS</button>
              </div>
            </div>
            <div className="profile-badge">
              <span className="star-burst">⭐</span>
              <span className="star-text">{totalStars}</span>
            </div>
          </header>

          {/* 🎪 2. Hero Carousel (Inspired by PBS Kids) */}
          <section className="hero-carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${carouselIdx * 100}%)` }}>
              {featuredGames.map(game => (
                <div key={game.id} className="hero-slide" style={{ '--bg': game.color }}>
                  <div className="hero-content">
                    <span className="hero-emoji">{game.icon}</span>
                    <div className="hero-text">
                      <h2>{game.name}</h2>
                      <button className="play-btn-large" onClick={() => setActiveGame(game)}>PLAY NOW</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-dots">
              {featuredGames.map((_, i) => <div key={i} className={`dot ${i === carouselIdx ? 'active' : ''}`} />)}
            </div>
          </section>

          {/* 📚 3. Category Shelves (Inspired by CrazyGames) */}
          <section className="shelf-container">
            <h3 className="shelf-title">Featured Games 🔥</h3>
            <div className="game-shelf">
              {MASTER_GAME_LIST.filter(g => g.category === 'Featured').map(game => (
                <button key={game.id} className="shelf-card" onClick={() => setActiveGame(game)}>
                  <div className="card-thumb" style={{ background: game.color }}>{game.icon}</div>
                  <p>{game.name}</p>
                </button>
              ))}
            </div>

            <h3 className="shelf-title">AI & Learning 🧠</h3>
            <div className="game-shelf">
              {MASTER_GAME_LIST.filter(g => g.category === 'Learning').map(game => (
                <button key={game.id} className="shelf-card" onClick={() => setActiveGame(game)}>
                  <div className="card-thumb" style={{ background: game.color }}>{game.icon}</div>
                  <p>{game.name}</p>
                </button>
              ))}
            </div>
          </section>

          {/* 🏆 4. Progression Footer */}
          <footer className="progression-footer">
            <div className="level-bar-container">
              <span className="trophy">🏆</span>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${(totalStars % 10) * 10}%` }}></div>
              </div>
              <span className="level-text">Level Up!</span>
            </div>
          </footer>
        </div>
      ) : (
        <div className="game-wrapper-fullscreen">
          {React.createElement(INTERNAL_GAMES[activeGame.id], {
            onExit: () => setActiveGame(null),
            onCorrectClick: () => setTotalStars(s => s + 1)
          })}
        </div>
      )}
    </div>
  );
}

export default App;