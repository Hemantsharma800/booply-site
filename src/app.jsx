import React, { useState, useEffect, useCallback } from 'react';
import './app.css';

// 🎮 GAME IMPORTS
import GeoExplorer from './games/geoexplorer.jsx';
import SnakeGame from './games/snakegame.jsx'; // 🐍 New Snake Game
import FighterGame from './games/fightergame.jsx';
import NitroDash from './games/nitrodash.jsx';
import AILab from './games/ailab.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import ColorGame from './games/colourgame.jsx';
import DinoGame from './games/dinogame.jsx';

const INTERNAL_GAMES = {
  'geo-ai-v1': GeoExplorer,
  'snake-v1': SnakeGame,
  'fighter-v1': FighterGame,
  'nitro-dash-v1': NitroDash,
  'ai-lab-v1': AILab,
  'kitchen-class-v1': KitchenClass,
  'puzzle-pop-v1': PuzzlePop,
  'color-fun-v1': ColorGame,
  'dino-dash-v1': DinoGame,
};

const MASTER_GAME_LIST = [
  { id: 'snake-v1', name: 'Neon Cobra', color: '#22c55e', icon: '🐍', category: 'Classic' },
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

  useEffect(() => {
    localStorage.setItem('booply-stars', totalStars);
  }, [totalStars]);

  const handleCorrect = useCallback(() => {
    setTotalStars(s => s + 1);
  }, []);

  return (
    <div className="booply-elite-container">
      {!activeGame ? (
        <div className="lobby-ui fade-in">
          <header className="pro-header">
            <h1 className="brand-logo">Booply</h1>
            <div className="star-display-elite">⭐ {totalStars}</div>
          </header>

          <main className="lobby-content">
            <h3 className="shelf-title">Elite Arcade 🕹️</h3>
            <div className="unlimited-grid">
              {MASTER_GAME_LIST.map(game => (
                <button key={game.id} className="game-card-elite" style={{ '--theme': game.color }} onClick={() => setActiveGame(game)}>
                  <div className="card-visual">{game.icon}</div>
                  <div className="card-info">
                    <span className="game-label">{game.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </main>
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