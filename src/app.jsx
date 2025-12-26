import React, { useState, useEffect, useCallback, Suspense } from 'react';
import './app.css';

// ALL IMPORTS (Verified paths)
import GeoExplorer from './games/geoexplorer.jsx';
import SnakeGame from './games/snakegame.jsx';
import FighterGame from './games/fightergame.jsx';
import NitroDash from './games/nitrodash.jsx';
import AILab from './games/ailab.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import ColourGame from './games/colourgame.jsx';
import DinoGame from './games/dinogame.jsx';

const INTERNAL_GAMES = {
  'snake-v1': SnakeGame, 'geo-ai-v1': GeoExplorer, 'fighter-v1': FighterGame,
  'nitro-dash-v1': NitroDash, 'ai-lab-v1': AILab, 'kitchen-class-v1': KitchenClass,
  'puzzle-pop-v1': PuzzlePop, 'colour-fun-v1': ColourGame, 'dino-dash-v1': DinoGame,
};

const MASTER_GAME_LIST = [
  { id: 'snake-v1', name: 'Neon Cobra', color: '#00ff41', icon: '🐍', category: 'Classic' },
  { id: 'geo-ai-v1', name: 'Terra Cognita AI', color: '#00f2ff', icon: '🌍', category: 'Premium' },
  { id: 'fighter-v1', name: 'Shadow Duel', color: '#ffffff', icon: '🥷', category: 'Action' },
  { id: 'nitro-dash-v1', name: 'Nitro Dash', color: '#FF4757', icon: '🏎️', category: 'Action' },
  { id: 'ai-lab-v1', name: 'AI Scanner', color: '#7E57C2', icon: '🧠', category: 'Learning' },
  { id: 'kitchen-class-v1', name: 'Kitchen Class', color: '#FF7043', icon: '🍳', category: 'Learning' },
  { id: 'puzzle-pop-v1', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', category: 'Featured' },
  { id: 'colour-fun-v1', name: 'Color Fun', color: '#1E90FF', icon: '🎨', category: 'Featured' },
  { id: 'dino-dash-v1', name: 'Dino Dash', color: '#FF6347', icon: '🦖', category: 'Action' },
];

export default function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [stars, setStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 0);

  useEffect(() => {
    localStorage.setItem('booply-stars', stars);
  }, [stars]);

  const awardStar = useCallback(() => setStars(prev => prev + 1), []);

  return (
    <div className="booply-black-root">
      {!activeGame ? (
        <>
          <header className="main-header">
            <h1 className="logo-glow">BOOPLY</h1>
            <div className="stat-group">
              <span className="pill">⭐ {stars}</span>
              <span className="pill">LVL {Math.floor(stars / 10) + 1}</span>
            </div>
          </header>

          <section className="hero-feature">
            <div className="hero-card-black" style={{ '--accent': MASTER_GAME_LIST[0].color }}>
              <span className="hero-icon-large">{MASTER_GAME_LIST[0].icon}</span>
              <div className="hero-text">
                <span className="premium-tag">NEW RELEASE</span>
                <h2>{MASTER_GAME_LIST[0].name}</h2>
                <button className="launch-btn" onClick={() => setActiveGame(MASTER_GAME_LIST[0])}>
                  ENTER ARENA
                </button>
              </div>
            </div>
          </section>

          <main className="grid-section">
            <div className="dynamic-arcade-grid">
              {MASTER_GAME_LIST.map(game => (
                <button
                  key={game.id}
                  className="arcade-tile"
                  style={{ '--tile-theme': game.color }}
                  onClick={() => setActiveGame(game)}
                >
                  <span className="tile-icon">{game.icon}</span>
                  <div className="tile-details">
                    <span className="tile-name">{game.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </main>

          <footer className="experience-footer">
            <div className="xp-wrapper">
              <div className="xp-track">
                <div className="xp-fill" style={{ width: `${(stars % 10) * 10}%` }}></div>
              </div>
              <p className="xp-label">{10 - (stars % 10)} STARS UNTIL NEXT LEVEL</p>
            </div>
          </footer>
        </>
      ) : (
        <div className="stage-fullscreen">
          <Suspense fallback={<div className="loading">LOADING ENGINE...</div>}>
            {React.createElement(INTERNAL_GAMES[activeGame.id], {
              onExit: () => setActiveGame(null),
              onCorrectClick: awardStar
            })}
          </Suspense>
        </div>
      )}
    </div>
  );
}