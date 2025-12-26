import React, { useState, useEffect, useCallback } from 'react';
import './app.css';

// 🎮 GAME COMPONENT IMPORTS
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import NitroDash from './games/nitrodash.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import AILab from './games/ailab.jsx';
import FighterGame from './games/fightergame.jsx';
import GeoExplorer from './games/geoexplorer.jsx'; // 🌍 Terra Cognita AI

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
};

// 🎡 FULL GAME REPOSITORY (CTO Optimized for Sales)
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

  const heroGames = MASTER_GAME_LIST.slice(0, 3);

  useEffect(() => {
    localStorage.setItem('booply-stars', totalStars);
  }, [totalStars]);

  const handleCorrect = useCallback(() => {
    setTotalStars(s => s + 1);
  }, []);

  return (
    <div className="booply-elite-container">
      {!activeGame ? (
        <div className="main-lobby-ui">
          <header className="pro-header">
            <h1 className="brand-logo">Booply</h1>
            <div className="user-hub">
              {user ? <div className="profile-pill">👤 {user.name}</div> : <div className="profile-pill">Guest</div>}
              <div className="star-display-elite">⭐ {totalStars}</div>
            </div>
          </header>

          <section className="hero-carousel">
            <div className="hero-slide" style={{ '--bg': heroGames[0].color }}>
              <div className="hero-content">
                <span className="hero-emoji-floating">{heroGames[0].icon}</span>
                <div className="hero-details">
                  <h2>Featured: {heroGames[0].name}</h2>
                  <button className="play-hero-btn" onClick={() => setActiveGame(heroGames[0])}>PLAY NOW ▶</button>
                </div>
              </div>
            </div>
          </section>

          <main className="lobby-content">
            <h3 className="shelf-title">Our World of Games 🎮</h3>
            <div className="unlimited-grid">
              {MASTER_GAME_LIST.map(game => (
                <button key={game.id} className="game-card-elite" style={{ '--theme': game.color }} onClick={() => setActiveGame(game)}>
                  <div className="card-visual">{game.icon}</div>
                  <div className="card-info">
                    <span className="category-tag">{game.category}</span>
                    <span className="game-label">{game.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </main>

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