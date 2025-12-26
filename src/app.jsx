import React, { useState, useEffect, useCallback } from 'react';
import './app.css';

// 🎮 Game Component Imports
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import NitroDash from './games/nitrodash.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import AILab from './games/ailab.jsx';
import FighterGame from './games/fightergame.jsx'; // 🥊 New Fighter Game

// ⚙️ INTERNAL GAME REGISTRY
const INTERNAL_GAMES = {
  'dino-dash-v1': DinoGame,
  'color-fun-v1': ColorGame,
  'puzzle-pop-v1': PuzzlePop,
  'nitro-dash-v1': NitroDash,
  'kitchen-class-v1': KitchenClass,
  'ai-lab-v1': AILab,
  'fighter-v1': FighterGame, //
};

// 🎡 FULL GAME REPOSITORY - Categories for organized shelf layout
const MASTER_GAME_LIST = [
  { id: 'nitro-dash-v1', name: 'Nitro Dash', color: '#FF4757', icon: '🏎️', category: 'Action' },
  { id: 'fighter-v1', name: 'Super Brawl', color: '#FF8C00', icon: '🥊', category: 'Action' },
  { id: 'ai-lab-v1', name: 'AI Scanner', color: '#7E57C2', icon: '🧠', category: 'Learning' },
  { id: 'kitchen-class-v1', name: 'Kitchen Class', color: '#FF7043', icon: '🍳', category: 'Learning' },
  { id: 'puzzle-pop-v1', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', category: 'Featured' },
  { id: 'color-fun-v1', name: 'Color Fun', color: '#1E90FF', icon: '🎨', category: 'Featured' },
  { id: 'dino-dash-v1', name: 'Dino Dash', color: '#FF6347', icon: '🦖', category: 'Action' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [totalStars, setTotalStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 0);

  // 🔑 Optional Account State
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('booply-user')) || null);

  // Persistence for stars
  useEffect(() => {
    localStorage.setItem('booply-stars', totalStars);
  }, [totalStars]);

  const handleLogin = () => {
    const name = prompt("Enter your Hero Name to save your progress!");
    if (name) {
      const newUser = { name, level: 1, joined: new Date().toLocaleDateString() };
      setUser(newUser);
      localStorage.setItem('booply-user', JSON.stringify(newUser));
    }
  };

  const handleCorrect = useCallback(() => {
    setTotalStars(s => s + 1);
  }, []);

  return (
    <div className="booply-pro-container">
      {!activeGame ? (
        <div className="main-lobby-ui">
          {/* 💎 PREMIUM HEADER WITH OPTIONAL LOGIN */}
          <header className="pro-header">
            <div className="logo-section">
              <h1 className="brand-logo">Booply</h1>
            </div>
            <div className="user-hub">
              {user ? (
                <div className="profile-pill">👤 {user.name}</div>
              ) : (
                <button className="login-btn" onClick={handleLogin}>🔑 Login / Sign Up</button>
              )}
              <div className="star-bank">⭐ {totalStars}</div>
            </div>
          </header>

          {/* 🎪 UNLIMITED GAME GRID - Fixes the "4 games only" issue */}
          <main className="lobby-content">
            <h3 className="shelf-title">Your Game World 🌎</h3>
            <div className="unlimited-grid">
              {MASTER_GAME_LIST.map(game => (
                <button
                  key={game.id}
                  className="game-card-premium"
                  style={{ '--theme-color': game.color }}
                  onClick={() => setActiveGame(game)}
                >
                  <div className="card-visual">{game.icon}</div>
                  <span className="card-label">{game.name}</span>
                  <div className="card-hover-glow"></div>
                </button>
              ))}
            </div>
          </main>

          {/* 🏆 PROGRESSION FOOTER */}
          <footer className="footer-status">
            <div className="level-track">
              <span>Level {Math.floor(totalStars / 10) + 1}</span>
              <div className="progress-bg">
                <div className="progress-fill" style={{ width: `${(totalStars % 10) * 10}%` }}></div>
              </div>
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