import React, { useState, useEffect, useCallback } from 'react';
import './app.css'; // Strictly lowercase to match your renamed file

// =====================================================================
// 🎮 1. IMPORTS - Must match your lowercase filenames exactly
// =====================================================================
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import NitroDash from './games/nitrodash.jsx';

// =====================================================================
// ⚙️ 2. REGISTRY - Maps game IDs to their components
const INTERNAL_GAMES = {
  'dino-dash-v1': DinoGame,
  'color-fun-v1': ColorGame,
  'puzzle-pop-v1': PuzzlePop,
  'nitro-dash-v1': NitroDash,
};

// =====================================================================
// 🎈 3. MASTER GAME LIST - Defines the lobby bubbles
// =====================================================================
const MASTER_GAME_LIST = [
  {
    id: 'dino-dash-v1',
    type: 'internal',
    name: 'Dino Dash',
    color: '#FF6347',
    icon: '🦖',
    hint: 'Find the animals!'
  },
  {
    id: 'color-fun-v1',
    type: 'internal',
    name: 'Color Fun',
    color: '#1E90FF',
    icon: '🎨',
    hint: 'Mix primary colors!'
  },
  {
    id: 'puzzle-pop-v1', // This ID must match the one in the registry above
    type: 'internal',    // Change from 'external' to 'internal'
    name: 'Puzzle Pop',
    color: '#FFD700',
    icon: '🧩',
    hint: 'Pop the pieces!'
  },
  {
    id: 'nitro-dash-v1',
    type: 'internal',
    name: 'Nitro Dash',
    color: '#FFD700',
    icon: '🏎️'
  }
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop! Tap a bubble!");

  // Standard reward logic
  const handleCorrect = useCallback(() => {
    setScore(s => s + 1);
    setMascotText("Yay! Great job! ⭐");
  }, []);

  const handleExit = useCallback(() => {
    setActiveGame(null);
    setMascotText("Welcome back! Pick another game!");
  }, []);

  // The Engine: Renders the correct view based on selection
  const renderGameView = () => {
    if (!activeGame) return null;

    if (activeGame.type === 'internal') {
      const Component = INTERNAL_GAMES[activeGame.id];
      return Component ? (
        <Component onExit={handleExit} onCorrectClick={handleCorrect} />
      ) : (
        <div className="game-overlay">
          <h2>Error: Game logic for {activeGame.id} not found.</h2>
          <button className="back-btn" onClick={handleExit}>Back Home</button>
        </div>
      );
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
          <header className="header-section">
            <h1 className="logo">Booply</h1>
            <div className="score-badge">Stars: {score} ⭐</div>
          </header>

          <main className="lobby-grid">
            {MASTER_GAME_LIST.map(game => (
              <button
                key={game.id}
                className="game-bubble"
                style={{ backgroundColor: game.color }}
                onClick={() => setActiveGame(game)}
                onMouseEnter={() => setMascotText(game.hint)}
              >
                <span className="game-icon">{game.icon}</span>
                <span className="game-name">{game.name}</span>
              </button>
            ))}
          </main>
        </>
      ) : (
        renderGameView()
      )}

      <div className="mascot-area">
        <div className="speech-bubble">{mascotText}</div>
        <div className="boop-avatar">👀</div>
      </div>
    </div>
  );
}

export default App;