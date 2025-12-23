import React, { useState, useEffect } from 'react';
import './App.css';

// --- GAME DATA CENTER ---
// Add new games here. Use 'type: "internal"' for games we build ourselves.
const ALL_GAMES = [
  { id: 1, name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', type: 'external', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
  { id: 2, name: 'Dino Dash', color: '#FF6347', icon: '🦖', type: 'internal', hint: 'Tap to Jump!' },
  { id: 3, name: 'Space Trip', color: '#9370DB', icon: '🚀', type: 'internal', hint: 'Avoid the stars!' },
  { id: 4, name: 'Color Fun', color: '#1E90FF', icon: '🎨', type: 'external', url: 'https://kleki.com/' },
  { id: 5, name: 'Music Box', color: '#32CD32', icon: '🎵', type: 'external', url: 'https://pianu.com/' },
  // Add more games as you build them!
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop!");

  // --- PERSISTENCE (Save Progress) ---
  useEffect(() => {
    const saved = localStorage.getItem('booply_data');
    if (saved) setStickers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('booply_data', JSON.stringify(stickers));
  }, [stickers]);

  // --- CORE ACTIONS ---
  const handleOpenGame = (game) => {
    setLoading(true);
    setActiveGame(game);
    setMascotText(`Let's play ${game.name}!`);
  };

  const handleGoHome = () => {
    // Award a sticker for playing!
    const items = ['⭐', '🍦', '🚀', '🎨', '🦖'];
    const newPrize = items[Math.floor(Math.random() * items.length)];
    if (stickers.length < 10) setStickers([...stickers, newPrize]);

    setActiveGame(null);
    setMascotText("That was fun! Pick another one!");
  };

  // --- THE GAME ENGINE (The Switchboard) ---
  const renderGameContent = () => {
    if (!activeGame) return null;

    // Type 1: Internal Games (Built by us)
    if (activeGame.type === 'internal') {
      return (
        <div className="game-canvas">
          <div className="game-header">Playing: {activeGame.name}</div>
          {/* We will build specific logic for each icon here */}
          <div className="internal-placeholder">
            <span className="bouncing-icon">{activeGame.icon}</span>
            <p>Game Logic Coming Soon!</p>
          </div>
        </div>
      );
    }

    // Type 2: External Games (Linked)
    return (
      <iframe
        src={activeGame.url}
        className="game-frame"
        onLoad={() => setLoading(false)}
        title={activeGame.name}
      />
    );
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
                style={{ '--bg-color': game.color }}
                onClick={() => handleOpenGame(game)}
                onMouseEnter={() => setMascotText(game.hint || "Ready?")}
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
          {loading && activeGame.type === 'external' && <div className="loader">Magic is happening...</div>}
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