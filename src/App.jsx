import React, { useState, useCallback } from 'react';
import './App.css';
import DinoGame from './games/DinoGame';
import ColorGame from './games/ColorGame'; // 1. Import the Color Game

// 2. Add Color Fun to the registry
const INTERNAL_GAMES = {
  'dino-jungle': DinoGame,
  'color-mix': ColorGame,
};

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);

  // 3. Update the game list to use 'internal' type for Color Fun
  const games = [
    { id: 'dino-jungle', name: 'Dino Dash', color: '#FF6347', icon: '🦖', type: 'internal' },
    { id: 'color-mix', name: 'Color Fun', color: '#1E90FF', icon: '🎨', type: 'internal' },
    { id: 'ext-puzzle', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', type: 'external', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
    { id: 'ext-music', name: 'Music Box', color: '#32CD32', icon: '🎵', type: 'external', url: 'https://pianu.com/' },
    { id: 'ext-space', name: 'Space Trip', color: '#9370DB', icon: '🚀', type: 'external', url: 'https://playcanv.as/p/2OFE7j9V/' },
  ];

  const handleCorrect = useCallback(() => setScore(s => s + 1), []);

  const renderGame = () => {
    if (!activeGame) return null;

    if (activeGame.type === 'internal') {
      const Component = INTERNAL_GAMES[activeGame.id];
      // Safety check to ensure the component exists in the registry
      return Component ? (
        <Component onExit={() => setActiveGame(null)} onCorrectClick={handleCorrect} />
      ) : (
        <div className="error-screen">Boop! Game component not found.</div>
      );
    }

    return (
      <div className="game-overlay-dino">
        <button className="back-btn" onClick={() => setActiveGame(null)}>🏠 Home</button>
        <iframe src={activeGame.url} className="game-frame" title={activeGame.name} />
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