import React, { useState, useEffect, useCallback } from 'react';
import './app.css'; // Strictly lowercase 'a'

// Internal Game Imports - Filenames must be strictly lowercase
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';

const INTERNAL_GAMES = {
  'dino-jungle-v1': DinoGame,
  'color-mix-lab-v1': ColorGame,
};

const MASTER_GAME_LIST = [
  { id: 'dino-jungle-v1', type: 'internal', name: 'Dino Dash', color: '#FF6347', icon: '🦖', hint: 'Find animals!' },
  { id: 'color-mix-lab-v1', type: 'internal', name: 'Color Fun', color: '#1E90FF', icon: '🎨', hint: 'Mix colors!' },
  { id: 'ext-puzzle', type: 'external', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);

  const handleCorrect = useCallback(() => setScore(s => s + 1), []);
  const handleExit = useCallback(() => setActiveGame(null), []);

  const renderGameView = () => {
    if (!activeGame) return null;
    if (activeGame.type === 'internal') {
      const Component = INTERNAL_GAMES[activeGame.id];
      return Component ? <Component onExit={handleExit} onCorrectClick={handleCorrect} /> : null;
    }
    return (
      <div className="game-overlay">
        <button className="back-btn" onClick={handleExit}>🏠 Home</button>
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
          <main className="lobby-grid">
            {MASTER_GAME_LIST.map(game => (
              <button key={game.id} className="game-bubble" style={{ backgroundColor: game.color }} onClick={() => setActiveGame(game)}>
                <span className="game-icon">{game.icon}</span>
                <span className="game-name">{game.name}</span>
              </button>
            ))}
          </main>
        </>
      ) : renderGameView()}
    </div>
  );
}

export default App;