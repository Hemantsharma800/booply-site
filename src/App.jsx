import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const ALL_GAMES = [
  { id: 1, name: 'Dino Dash', color: '#FF6347', icon: '🦖', type: 'internal', hint: 'Tap to Jump!' },
  { id: 2, name: 'Space Trip', color: '#9370DB', icon: '🚀', type: 'internal', hint: 'Dodge the stars!' },
  { id: 3, name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', type: 'external', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
  { id: 4, name: 'Color Fun', color: '#1E90FF', icon: '🎨', type: 'external', url: 'https://kleki.com/' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop!");

  // Game States
  const [gameState, setGameState] = useState({ pos: 0, isJumping: false, score: 0 });

  // --- INTERNAL GAME LOGIC: DINO DASH ---
  const handleJump = () => {
    if (gameState.isJumping) return;
    setGameState(prev => ({ ...prev, isJumping: true, pos: 150 }));
    setTimeout(() => {
      setGameState(prev => ({ ...prev, isJumping: false, pos: 0 }));
    }, 500);
  };

  const handleGoHome = () => {
    const items = ['⭐', '🍦', '🚀', '🦖'];
    const newPrize = items[Math.floor(Math.random() * items.length)];
    if (stickers.length < 10) setStickers([...stickers, newPrize]);
    setActiveGame(null);
    setGameState({ pos: 0, isJumping: false, score: 0 });
  };

  const renderGameContent = () => {
    if (!activeGame) return null;

    if (activeGame.type === 'internal') {
      return (
        <div className="game-world" onClick={handleJump}>
          <div className="game-info">Tap to Jump! Icon: {activeGame.icon}</div>

          {/* THE CHARACTER: Uses the icon from the home page */}
          <div
            className="game-character"
            style={{ bottom: `${gameState.pos}px` }}
          >
            {activeGame.icon}
          </div>

          <div className="game-ground"></div>
        </div>
      );
    }

    return <iframe src={activeGame.url} className="game-frame" title={activeGame.name} />;
  };

  return (
    <div className="booply-container">
      {!activeGame ? (
        <>
          <header className="header-section">
            <h1 className="logo">Booply</h1>
            <div className="sticker-book">
              <div className="sticker-row">
                {stickers.map((s, i) => <span key={i} className="sticker-item">{s}</span>)}
                {[...Array(10 - stickers.length)].map((_, i) => <span key={i} className="slot">?</span>)}
              </div>
            </div>
          </header>

          <main className="lobby-grid">
            {ALL_GAMES.map(game => (
              <button
                key={game.id}
                className="game-card"
                style={{ backgroundColor: game.color }}
                onClick={() => setActiveGame(game)}
                onMouseEnter={() => setMascotText(game.hint)}
              >
                <span className="card-icon">{game.icon}</span>
                <span className="card-name">{game.name}</span>
              </button>
            ))}
          </main>
        </>
      ) : (
        <div className="active-game-overlay">
          <button className="exit-btn" onClick={handleGoHome}>🏠 Home</button>
          {renderGameContent()}
        </div>
      )}

      <div className="mascot-box">
        <div className="bubble">{mascotText}</div>
        <div className="boop-avatar">👀</div>
      </div>
    </div>
  );
}

export default App;