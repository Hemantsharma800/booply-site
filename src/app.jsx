import React, { useState, useEffect, useCallback } from 'react';
import './app.css'; // Ensuring lowercase match

// =====================================================================
// 🎮 1. IMPORTS - All filenames must be strictly lowercase
// =====================================================================
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';


// =====================================================================
// ⚙️ 2. REGISTRY - Maps game IDs to their components
// =====================================================================
const INTERNAL_GAMES = {
  'dino-jungle-v1': DinoGame,
  'color-mix-lab-v1': ColorGame,
};

// =====================================================================
// 🎈 3. MASTER GAME LIST - Defines the lobby bubbles
// =====================================================================
const MASTER_GAME_LIST = [
  {
    id: 'dino-jungle-v1',
    type: 'internal',
    name: 'Dino Dash',
    color: '#FF6347',
    icon: '🦖',
    hint: 'Find real animals!'
  },
  {
    id: 'color-mix-lab-v1',
    type: 'internal',
    name: 'Color Fun',
    color: '#1E90FF',
    icon: '🎨',
    hint: 'Mix colors together!'
  },
  { id: 'ext-puzzle', type: 'external', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
  { id: 'ext-music', type: 'external', name: 'Music Box', color: '#32CD32', icon: '🎵', url: 'https://pianu.com/' },
  { id: 'ext-space', type: 'external', name: 'Space Trip', color: '#9370DB', icon: '🚀', url: 'https://playcanv.as/p/2OFE7j9V/' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop! Tap a bubble!");
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Persistence: Load & Save progress
  useEffect(() => {
    const savedStickers = localStorage.getItem('booply_stickers');
    const savedScore = localStorage.getItem('booply_score');
    if (savedStickers) setStickers(JSON.parse(savedStickers));
    if (savedScore) setScore(parseInt(savedScore));
  }, []);

  useEffect(() => {
    localStorage.setItem('booply_stickers', JSON.stringify(stickers));
    localStorage.setItem('booply_score', score.toString());
  }, [stickers, score]);

  const handleOpenGame = (game) => {
    setActiveGame(game);
    setMascotText(`Let's play ${game.name}!`);
    if (game.type === 'external') setLoading(true);
  };

  const handleCorrect = useCallback(() => {
    setScore(s => s + 1);
    setMascotText("Yay! Great job!");
  }, []);

  const handleExit = useCallback(() => {
    const prizeList = ['⭐', '❤️', '🍦', '🚀', '🦄', '🍎'];
    const prize = prizeList[Math.floor(Math.random() * prizeList.length)];
    if (stickers.length < 10) setStickers(prev => [...prev, prize]);

    setActiveGame(null);
    setLoading(false);
    setMascotText("Welcome back! Pick another game!");
  }, [stickers]);

  // The Engine: Automatically renders the correct game based on ID
  const renderGameView = () => {
    if (!activeGame) return null;

    if (activeGame.type === 'internal') {
      const Component = INTERNAL_GAMES[activeGame.id];
      return Component ? (
        <Component onExit={handleExit} onCorrectClick={handleCorrect} />
      ) : (
        <div className="game-overlay" style={{ background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Boop! Error: Game ID "{activeGame.id}" not found.</h2>
          <button className="back-btn" onClick={() => setActiveGame(null)}>Back Home</button>
        </div>
      );
    }

    return (
      <div className="game-overlay">
        <button className="back-btn" onClick={handleExit}>🏠 Home</button>
        {loading && <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'white' }}>Loading...</div>}
        <iframe
          src={activeGame.url}
          className="game-frame"
          title={activeGame.name}
          onLoad={() => setLoading(false)}
        />
      </div>
    );
  };

  return (
    <div className="booply-container">
      {!activeGame ? (
        <>
          <header className="header-section">
            <h1 className="logo">Booply</h1>
            <div className="sticker-book">
              <p>My Stars: {score} ⭐</p>
              <div className="sticker-row">
                {stickers.map((s, i) => <span key={i} className="sticker-item">{s}</span>)}
                {[...Array(10 - stickers.length)].map((_, i) => <span key={i} className="slot">?</span>)}
              </div>
            </div>
          </header>

          <main className="lobby-grid">
            {MASTER_GAME_LIST.map(game => (
              <button
                key={game.id}
                className="game-bubble"
                style={{ backgroundColor: game.color }}
                onClick={() => handleOpenGame(game)}
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