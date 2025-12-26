import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import './app.css';

// 🎮 DIRECT IMPORTS FOR CORE ENGINES
import GeoExplorer from './games/geoexplorer.jsx';
import FighterGame from './games/fightergame.jsx';
import NitroDash from './games/nitrodash.jsx';
import AILab from './games/ailab.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import ColorGame from './games/colourgame.jsx';
import DinoGame from './games/dinogame.jsx';
import SnakeGame from './games/snakegame.jsx';

// ⚙️ CTO'S INTERNAL GAME REGISTRY
const INTERNAL_GAMES = {
  'geo-ai-v1': GeoExplorer,
  'fighter-v1': FighterGame,
  'nitro-dash-v1': NitroDash,
  'ai-lab-v1': AILab,
  'kitchen-class-v1': KitchenClass,
  'puzzle-pop-v1': PuzzlePop,
  'color-fun-v1': ColorGame,
  'dino-dash-v1': DinoGame,
  'snake-game-v1': SnakeGame,
};

// 🎡 FULL GAME REPOSITORY (Optimized for Marketing & SEO)
const MASTER_GAME_LIST = [
  { id: 'geo-ai-v1', name: 'Terra Cognita AI', color: '#00f2ff', icon: '🌍', category: 'Premium' },
  { id: 'fighter-v1', name: 'Shadow Duel', color: '#1a1a1a', icon: '🥷', category: 'Action' },
  { id: 'nitro-dash-v1', name: 'Nitro Dash', color: '#FF4757', icon: '🏎️', category: 'Action' },
  { id: 'ai-lab-v1', name: 'AI Scanner', color: '#7E57C2', icon: '🧠', category: 'Learning' },
  { id: 'kitchen-class-v1', name: 'Kitchen Class', color: '#FF7043', icon: '🍳', category: 'Learning' },
  { id: 'puzzle-pop-v1', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', category: 'Featured' },
  { id: 'color-fun-v1', name: 'Color Fun', color: '#1E90FF', icon: '🎨', category: 'Featured' },
  { id: 'dino-dash-v1', name: 'Dino Dash', color: '#FF6347', icon: '🦖', category: 'Action' },
  { id: 'snake-v1', name: 'Neon Cobra', color: '#22c55e', icon: '🐍', category: 'Classic' },
];

function App() {
  // Persistence Layer
  const [activeGame, setActiveGame] = useState(null);
  const [totalStars, setTotalStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 0);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('booply-user')) || { name: 'New Hero', level: 1 });

  // Update Storage on change
  useEffect(() => {
    localStorage.setItem('booply-stars', totalStars);
    const level = Math.floor(totalStars / 10) + 1;
    setUser(prev => ({ ...prev, level }));
  }, [totalStars]);

  const handleCorrectAction = useCallback(() => {
    setTotalStars(s => s + 1);
  }, []);

  return (
    <div className="booply-root-viewport">
      {!activeGame ? (
        <div className="lobby-experience fade-in">
          {/* 💎 ELITE HEADER */}
          <header className="main-nav-glass">
            <div className="nav-left">
              <h1 className="booply-logo">BOOPLY</h1>
            </div>
            <div className="nav-right">
              <div className="stat-pill profile">👤 {user.name}</div>
              <div className="stat-pill level">LVL {user.level}</div>
              <div className="stat-pill stars">⭐ {totalStars}</div>
            </div>
          </header>

          {/* 🏟️ FEATURED HERO SECTION (PBS Kids Style) */}
          <section className="hero-feature">
            <div className="hero-card" style={{ '--accent': MASTER_GAME_LIST[0].color }}>
              <div className="hero-visual">{MASTER_GAME_LIST[0].icon}</div>
              <div className="hero-info">
                <span className="badge">FEATURED GAME</span>
                <h2>{MASTER_GAME_LIST[0].name}</h2>
                <p>Explore the Earth with AI Intelligence.</p>
                <button className="play-cta" onClick={() => setActiveGame(MASTER_GAME_LIST[0])}>LAUNCH MISSION</button>
              </div>
            </div>
          </section>

          {/* 🎮 UNLIMITED GRID (CrazyGames Style) */}
          <main className="game-grid-container">
            <h3 className="grid-label">All Games 🔥</h3>
            <div className="unlimited-auto-grid">
              {MASTER_GAME_LIST.map(game => (
                <button
                  key={game.id}
                  className="game-card-elite"
                  style={{ '--game-c': game.color }}
                  onClick={() => setActiveGame(game)}
                >
                  <div className="card-thumb">{game.icon}</div>
                  <div className="card-meta">
                    <span className="game-name">{game.name}</span>
                    <span className="game-cat">{game.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </main>

          {/* 🏆 PROGRESSION FOOTER */}
          <footer className="experience-bar-footer">
            <div className="progress-wrapper">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${(totalStars % 10) * 10}%` }}></div>
              </div>
              <p>{10 - (totalStars % 10)} STARS UNTIL LEVEL {user.level + 1}</p>
            </div>
          </footer>
        </div>
      ) : (
        /* 🕹️ PRODUCTION GAME STAGE */
        <div className="game-stage-fullscreen">
          {React.createElement(INTERNAL_GAMES[activeGame.id], {
            onExit: () => setActiveGame(null),
            onCorrectClick: handleCorrectAction
          })}
        </div>
      )}
    </div>
  );
}

export default App;