import React, { useState, useEffect, useCallback, Suspense } from 'react';
import './app.css';

// 🎮 COMPONENT REGISTRY (ZERO-MISTAKE PATHING)
import GeoExplorer from './games/geoexplorer.jsx';
import SnakeGame from './games/snakegame.jsx';
import FighterGame from './games/fightergame.jsx';
import NitroDash from './games/nitrodash.jsx';
import AILab from './games/ailab.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import ColorGame from './games/colourgame.jsx';
import DinoGame from './games/dinogame.jsx';

// ⚙️ CTO INTERNAL MAPPING
const INTERNAL_GAMES = {
  'snake-v1': SnakeGame,
  'geo-ai-v1': GeoExplorer,
  'fighter-v1': FighterGame,
  'nitro-dash-v1': NitroDash,
  'ai-lab-v1': AILab,
  'kitchen-class-v1': KitchenClass,
  'puzzle-pop-v1': PuzzlePop,
  'color-fun-v1': ColorGame,
  'dino-dash-v1': DinoGame,
};

// 🎡 FULL GAME REPOSITORY
const MASTER_GAME_LIST = [
  { id: 'snake-v1', name: 'Neon Cobra', color: '#22c55e', icon: '🐍', category: 'Classic' },
  { id: 'geo-ai-v1', name: 'Terra Cognita AI', color: '#00f2ff', icon: '🌍', category: 'Premium' },
  { id: 'fighter-v1', name: 'Shadow Duel', color: '#ffffff', icon: '🥷', category: 'Action' },
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

  // Persistence Engine for $1M Valuation Growth
  useEffect(() => {
    localStorage.setItem('booply-stars', totalStars);
  }, [totalStars]);

  const handleCorrectAction = useCallback(() => {
    setTotalStars(prev => prev + 1);
  }, []);

  return (
    <div className="booply-black-theme-root">
      {!activeGame ? (
        <div className="lobby-experience fade-in">
          {/* 💎 ELITE HUD */}
          <header className="pro-header-glass">
            <h1 className="brand-logo-glow">BOOPLY</h1>
            <div className="user-stats">
              <div className="star-pill">⭐ {totalStars}</div>
              <div className="level-pill">LVL {Math.floor(totalStars / 10) + 1}</div>
            </div>
          </header>

          {/* 🏟️ HERO SHOWCASE (Featuring Snake) */}
          <section className="hero-feature">
            <div className="hero-card-dark" style={{ '--accent': MASTER_GAME_LIST[0].color }}>
              <div className="hero-visual-box">{MASTER_GAME_LIST[0].icon}</div>
              <div className="hero-details">
                <span className="premium-tag">CLASSIC REBORN</span>
                <h2>{MASTER_GAME_LIST[0].name}</h2>
                <p>Nokia 1100 mechanics with 4K neon graphics.</p>
                <button className="launch-btn" onClick={() => setActiveGame(MASTER_GAME_LIST[0])}>PLAY NOW</button>
              </div>
            </div>
          </section>

          {/* 🎮 THE UNLIMITED GRID */}
          <main className="arcade-grid-section">
            <h3 className="section-label">All Experiences</h3>
            <div className="dynamic-auto-grid">
              {MASTER_GAME_LIST.map(game => (
                <button
                  key={game.id}
                  className="arcade-card"
                  style={{ '--theme': game.color }}
                  onClick={() => setActiveGame(game)}
                >
                  <div className="card-emoji">{game.icon}</div>
                  <div className="card-info">
                    <span className="game-title">{game.name}</span>
                    <span className="game-category">{game.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </main>

          {/* 🏆 LEVEL PROGRESSION FOOTER */}
          <footer className="footer-xp-bar">
            <div className="xp-track-container">
              <div className="xp-fill" style={{ width: `${(totalStars % 10) * 10}%` }}></div>
            </div>
            <p className="xp-label">{(totalStars % 10)} / 10 STARS TO NEXT LEVEL</p>
          </footer>
        </div>
      ) : (
        /* 🕹️ ACTIVE GAME STAGE */
        <div className="production-stage">
          <Suspense fallback={<div className="loading-black">LOADING CORE...</div>}>
            {React.createElement(INTERNAL_GAMES[activeGame.id], {
              onExit: () => setActiveGame(null),
              onCorrectClick: handleCorrectAction
            })}
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default App;