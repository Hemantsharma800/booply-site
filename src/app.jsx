import React, { useState, useEffect, useCallback, useRef } from 'react';
import './app.css';

// 🎮 Game Imports (Ensure these match your actual files)
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import NitroDash from './games/nitrodash.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import AILab from './games/ailab.jsx';

const INTERNAL_GAMES = {
  'dino-dash-v1': DinoGame,
  'color-fun-v1': ColorGame,
  'puzzle-pop-v1': PuzzlePop,
  'nitro-dash-v1': NitroDash,
  'kitchen-class-v1': KitchenClass,
  'ai-lab-v1': AILab,
};

const MASTER_GAME_LIST = [
  { id: 'dino-dash-v1', name: 'Dino Dash', color: '#FF6347', icon: '🦖' },
  { id: 'color-fun-v1', name: 'Color Fun', color: '#1E90FF', icon: '🎨' },
  { id: 'puzzle-pop-v1', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩' },
  { id: 'nitro-dash-v1', name: 'Nitro Dash', color: '#FF4757', icon: '🏎️' },
  { id: 'kitchen-class-v1', name: 'Kitchen Class', color: '#FF7043', icon: '🍳' },
  { id: 'ai-lab-v1', name: 'AI Class', color: '#7E57C2', icon: '🧠' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [totalStars, setTotalStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 👁️ Track Mouse for Interactive Mascot
  const handleMouseMove = (e) => {
    setMousePos({ x: (e.clientX / window.innerWidth) * 20, y: (e.clientY / window.innerHeight) * 20 });
  };

  useEffect(() => {
    localStorage.setItem('booply-stars', totalStars);
  }, [totalStars]);

  const handleCorrect = useCallback(() => {
    setTotalStars(prev => prev + 1);
  }, []);

  return (
    <div className="booply-world" onMouseMove={handleMouseMove}>
      {!activeGame ? (
        <div className="immersive-lobby">
          {/* ☁️ Layered Background Elements */}
          <div className="bg-float float-1"></div>
          <div className="bg-float float-2"></div>

          <header className="game-header">
            <h1 className="world-logo">Booply</h1>
            <div className="star-bank-premium">
              <span className="star-bounce">⭐</span>
              <span className="count">{totalStars}</span>
            </div>
          </header>

          <main className="portal-grid">
            {MASTER_GAME_LIST.map(game => (
              <button
                key={game.id}
                className="game-portal"
                style={{ '--portal-color': game.color }}
                onClick={() => setActiveGame(game)}
              >
                <div className="icon-wrap">{game.icon}</div>
                <span className="portal-name">{game.name}</span>
                <div className="glow-effect"></div>
              </button>
            ))}
          </main>

          {/* 🧸 Interactive Boop Mascot */}
          <div className="boop-container">
            <div className="speech-bubble-world">Play with me! ✨</div>
            <div className="boop-body">
              <div className="eye-socket">
                <div className="pupil" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>
              </div>
              <div className="eye-socket">
                <div className="pupil" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fullscreen-game">
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