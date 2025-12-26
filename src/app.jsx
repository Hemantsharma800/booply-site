import React, { useState, useEffect, useCallback } from 'react';
import './app.css';

// 🎮 Component Imports
import DinoGame from './games/dinogame.jsx';
import ColorGame from './games/colourgame.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import NitroDash from './games/nitrodash.jsx';
import AILab from './games/ailab.jsx';
import KitchenClass from './games/kitchenclass.jsx';

const INTERNAL_GAMES = {
  'dino-dash-v1': DinoGame,
  'color-fun-v1': ColorGame,
  'puzzle-pop-v1': PuzzlePop,
  'nitro-dash-v1': NitroDash,
  'ai-lab-v1': AILab,
  'kitchen-class-v1': KitchenClass,
};

const MASTER_GAME_LIST = [
  { id: 'dino-dash-v1', name: 'Dino Dash', color: '#FF6347', icon: '🦖', minStars: 0 },
  { id: 'color-fun-v1', name: 'Color Fun', color: '#1E90FF', icon: '🎨', minStars: 0 },
  { id: 'puzzle-pop-v1', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', minStars: 3 },
  { id: 'nitro-dash-v1', name: 'Nitro Dash', color: '#FF4757', icon: '🏎️', minStars: 10 },
  { id: 'ai-lab-v1', name: 'AI Lab', color: '#6E#818cf8', icon: '🧠', minStars: 5 },
  { id: 'kitchen-class-v1', name: 'Kitchen Class', color: '#32CD32', icon: '🍳', minStars: 8 },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [totalStars, setTotalStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 0);
  const [mascotMood, setMascotMood] = useState('happy');
  const [showDaily, setShowDaily] = useState(false);

  // Persistence logic for high retention
  useEffect(() => {
    localStorage.setItem('booply-stars', totalStars);

    // Check for daily reward
    const lastClaim = localStorage.getItem('booply-last-claim');
    const today = new Date().toDateString();
    if (lastClaim !== today) setShowDaily(true);
  }, [totalStars]);

  const claimDaily = () => {
    setTotalStars(s => s + 5);
    localStorage.setItem('booply-last-claim', new Date().toDateString());
    setShowDaily(false);
    setMascotMood('excited');
  };

  const handleCorrect = useCallback(() => {
    setTotalStars(prev => prev + 1);
    setMascotMood('excited');
    setTimeout(() => setMascotMood('happy'), 3000);
  }, []);

  const startGame = (game) => {
    if (totalStars >= game.minStars) {
      setActiveGame(game);
      setMascotMood('playing');
    } else {
      setMascotMood('locked');
    }
  };

  return (
    <div className="booply-premium-app">
      {!activeGame ? (
        <div className="lobby-view">
          <header className="glass-header">
            <div className="brand">
              <h1 className="logo-text">Booply</h1>
              <span className="badge">LEVEL {Math.floor(totalStars / 10) + 1}</span>
            </div>
            <div className="star-display">
              <span className="star-icon">⭐</span>
              <span className="star-val">{totalStars}</span>
            </div>
          </header>

          <main className="game-shelf">
            {MASTER_GAME_LIST.map(game => {
              const isLocked = totalStars < game.minStars;
              return (
                <button
                  key={game.id}
                  className={`game-cube ${isLocked ? 'locked' : ''}`}
                  style={{ '--theme': game.color }}
                  onClick={() => startGame(game)}
                >
                  <div className="cube-inner">
                    <span className="cube-icon">{isLocked ? '🔒' : game.icon}</span>
                    <span className="cube-name">{game.name}</span>
                    {isLocked && <span className="lock-hint">Need {game.minStars} ⭐</span>}
                  </div>
                </button>
              );
            })}
          </main>

          {/* Retention Feature: Daily Reward Popup */}
          {showDaily && (
            <div className="reward-overlay">
              <div className="reward-card">
                <h2>Daily Surprise! 🎁</h2>
                <p>Boop found 5 stars for you!</p>
                <button onClick={claimDaily}>Yay, Thanks!</button>
              </div>
            </div>
          )}

          <div className={`boop-character ${mascotMood}`}>
            <div className="bubble">
              {mascotMood === 'happy' && "Hi! Ready to play?"}
              {mascotMood === 'locked' && "Keep playing to unlock that one!"}
              {mascotMood === 'excited' && "WOW! You're a superstar!"}
            </div>
            <div className="boop-face">👀</div>
          </div>
        </div>
      ) : (
        <div className="game-stage">
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