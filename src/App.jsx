import React, { useState } from 'react';
import './App.css';
// IMPORT THE NEW SEPARATE GAME COMPONENT
import DinoGame from './games/DinoGame';

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop!");

  const games = [
    { id: 1, name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
    // We use a special 'id' to know when to load the internal component
    { id: 'dino-internal', name: 'Dino Jungle', color: '#2d6a4f', icon: '🦖', type: 'internal', hint: 'Find real animals!' },
    { id: 3, name: 'Color Fun', color: '#1E90FF', icon: '🎨', url: 'https://kleki.com/' },
    { id: 4, name: 'Music Box', color: '#32CD32', icon: '🎵', url: 'https://pianu.com/' },
    { id: 5, name: 'Space Trip', color: '#9370DB', icon: '🚀', url: 'https://playcanv.as/p/2OFE7j9V/' },
  ];

  const handleOpenGame = (game) => {
    setActiveGame(game);
    if (game.type === 'internal') setMascotText("Good luck in the jungle!");
  };

  // This function decides WHICH game to display
  const renderActiveGame = () => {
    // 1. Check for Internal Dino Game
    if (activeGame.id === 'dino-internal') {
      // We render the separate component and pass down functions it needs
      return (
        <DinoGame
          onExit={() => setActiveGame(null)}
          onCorrectClick={() => {
            setScore(s => s + 1);
            setMascotText("Great job! You found one!");
          }}
        />
      );
    }

    // 2. Fallback for External Link Games (Iframes)
    return (
      <div className="game-overlay">
        <button className="back-btn" onClick={() => setActiveGame(null)}>🏠 Home</button>
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
            <div className="score-board">Total Stars: {score} ⭐</div>
          </header>
          <main className="lobby-grid">
            {games.map(game => (
              <button key={game.id} className="game-bubble" style={{ backgroundColor: game.color }} onClick={() => handleOpenGame(game)} onMouseEnter={() => setMascotText(game.hint)}>
                <span className="game-icon">{game.icon}</span>
                <span className="game-name">{game.name}</span>
              </button>
            ))}
          </main>
          <div className="mascot-area">
            <div className="speech-bubble">{mascotText}</div>
            <div className="boop-avatar">👀</div>
          </div>
        </>
      ) : (
        // HERE IS THE CONNECTION POINT
        renderActiveGame()
      )}
    </div>
  );
}

export default App;