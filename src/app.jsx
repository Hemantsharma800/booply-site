import React, { useState, useEffect } from 'react';
import './app.css';

// ... (previous imports for Dino, Color, Puzzle, Nitro, Kitchen, AI)
import FighterGame from './games/fightergame.jsx'; // New Game

const INTERNAL_GAMES = {
  // ... previous games
  'fighter-v1': FighterGame
};

const MASTER_GAME_LIST = [
  { id: 'nitro-dash-v1', name: 'Nitro Dash', color: '#FF4757', icon: '🏎️', category: 'Action' },
  { id: 'ai-lab-v1', name: 'AI Scanner', color: '#7E57C2', icon: '🧠', category: 'Learning' },
  { id: 'fighter-v1', name: 'Super Brawl', color: '#FF8C00', icon: '🥊', category: 'Action' }, // New!
  { id: 'kitchen-class-v1', name: 'Kitchen Class', color: '#FF7043', icon: '🍳', category: 'Learning' },
  { id: 'puzzle-pop-v1', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', category: 'Featured' },
  { id: 'color-fun-v1', name: 'Color Fun', color: '#1E90FF', icon: '🎨', category: 'Featured' },
  { id: 'dino-dash-v1', name: 'Dino Dash', color: '#FF6347', icon: '🦖', category: 'Action' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('booply-user')) || null);
  const [totalStars, setTotalStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 0);

  const handleLogin = () => {
    const name = prompt("Enter your Hero Name:");
    if (name) {
      const newUser = { name, level: 1 };
      setUser(newUser);
      localStorage.setItem('booply-user', JSON.stringify(newUser));
    }
  };

  return (
    <div className="booply-pro-container">
      {!activeGame ? (
        <div className="main-lobby-ui">
          <header className="pro-header">
            <div className="logo-section">
              <h1 className="brand-logo">Booply</h1>
            </div>
            <div className="user-controls">
              {user ? (
                <div className="user-profile">👋 {user.name}</div>
              ) : (
                <button className="login-pill" onClick={handleLogin}>🔑 Login / Signup</button>
              )}
              <div className="star-display">⭐ {totalStars}</div>
            </div>
          </header>

          {/* This grid now shows ALL games in the list */}
          <section className="shelf-container">
            <h3 className="shelf-title">All Games 🎮</h3>
            <div className="game-grid-unlimited">
              {MASTER_GAME_LIST.map(game => (
                <button key={game.id} className="shelf-card" onClick={() => setActiveGame(game)}>
                  <div className="card-thumb" style={{ background: game.color }}>{game.icon}</div>
                  <p>{game.name}</p>
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="game-wrapper-fullscreen">
          {React.createElement(INTERNAL_GAMES[activeGame.id], {
            onExit: () => setActiveGame(null),
            onCorrectClick: () => setTotalStars(s => s + 1)
          })}
        </div>
      )}
    </div>
  );
}