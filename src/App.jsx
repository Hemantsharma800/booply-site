import React, { useState, useCallback } from 'react';
import './App.css';

// Change these lines to be completely lowercase
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';

// Also ensure the registry matches the imported names
const INTERNAL_GAMES = {
  'dino-jungle': DinoGame,
  'color-mix': ColorGame,
};

// 2. Updated Registry
const INTERNAL_GAMES = {
  'dino-jungle': DinoGame,
  'color-mix': ColorGame,
};

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);

  const games = [
    { id: 'dino-jungle', name: 'Dino Dash', color: '#FF6347', icon: '🦖', type: 'internal' },
    { id: 'color-mix', name: 'Color Fun', color: '#1E90FF', icon: '🎨', type: 'internal' },
    // External games...
    { id: 'ext-puzzle', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', type: 'external', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
    { id: 'ext-music', name: 'Music Box', color: '#32CD32', icon: '🎵', type: 'external', url: 'https://pianu.com/' },
  ];

  const handleCorrect = useCallback(() => setScore(s => s + 1), []);

  const renderGame = () => {
    if (!activeGame) return null;

    if (activeGame.type === 'internal') {
      const Component = INTERNAL_GAMES[activeGame.id];
      return Component ? (
        <Component onExit={() => setActiveGame(null)} onCorrectClick={handleCorrect} />
      ) : <div className="error">Game Not Found</div>;
    }

    return (
      <div className="game-overlay-dino">
        <button className="back-btn" onClick={() => setActiveGame(null)}>🏠 Home</button>
        <iframe src={activeGame.url} className="game-frame" title={activeGame.name} style={{ width: '100%', height: '100%', border: 'none' }} />
      </div>
    );
  };

  return (
    <div className="booply-container">
      {!activeGame ? (
        <>
          <h1 className="logo">Booply</h1>
          <div className="score-board">Stars: {score} ⭐</div>
          <div className="lobby-grid">
            {games.map(g => (
              <button key={g.id} className="game-bubble" style={{ backgroundColor: g.color }} onClick={() => setActiveGame(g)}>
                <span className="game-icon">{g.icon}</span>
                <span className="game-name">{g.name}</span>
              </button>
            ))}
          </div>
        </>
      ) : renderGame()}
    </div>
  );
}

export default App;