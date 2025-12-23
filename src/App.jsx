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
import React, { useState, useEffect } from 'react';
import './App.css';

// 1. Data for our Jungle Animals
const JUNGLE_ANIMALS = [
  { name: 'Lion', icon: '🦁', color: '#f4a261' },
  { name: 'Elephant', icon: '🐘', color: '#a8dadc' },
  { name: 'Giraffe', icon: '🦒', color: '#e9c46a' },
  { name: 'Monkey', icon: '🐒', color: '#8d99ae' },
  { name: 'Zebra', icon: '🦓', color: '#edf2f4' },
  { name: 'Parrot', icon: '🦜', color: '#2a9d8f' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [targetAnimal, setTargetAnimal] = useState(null);
  const [jungleMap, setJungleMap] = useState([]);
  const [score, setScore] = useState(0);

  // 2. Function to generate a new random map
  const refreshJungle = () => {
    const shuffled = [...JUNGLE_ANIMALS].sort(() => 0.5 - Math.random());
    // Assign random positions (x, y) to each animal
    const mapWithPositions = shuffled.map(animal => ({
      ...animal,
      top: Math.floor(Math.random() * 60) + 20 + "%",
      left: Math.floor(Math.random() * 80) + 5 + "%"
    }));
    setJungleMap(mapWithPositions);
    setTargetAnimal(mapWithPositions[Math.floor(Math.random() * mapWithPositions.length)]);
  };

  // Start the game when Dino Dash is clicked
  useEffect(() => {
    if (activeGame?.name === 'Dino Dash') refreshJungle();
  }, [activeGame]);

  const handleAnimalClick = (clickedName) => {
    if (clickedName === targetAnimal.name) {
      setScore(s => s + 1);
      // Visual feedback: briefly change mascot text
      refreshJungle();
    } else {
      alert("Boop! That's not it, try again!");
    }
  };

  return (
    <div className="booply-container">
      {!activeGame ? (
        <main className="lobby-grid">
          {/* Your existing lobby code here... */}
          <button className="game-card" onClick={() => setActiveGame({ name: 'Dino Dash', icon: '🦖' })}>
            <span className="card-icon">🦖</span>
            <span className="card-name">Dino Jungle</span>
          </button>
        </main>
      ) : (
        <div className="jungle-game-overlay">
          <header className="game-header-ui">
            <button className="exit-btn" onClick={() => setActiveGame(null)}>🏠 Home</button>
            <div className="target-box">
              <span>Find the: </span>
              <strong className="animal-name-highlight">{targetAnimal?.name}</strong>
            </div>
            <div className="score-badge">Stars: {score} ⭐</div>
          </header>

          <div className="jungle-scene">
            {/* Background Decorations */}
            <div className="jungle-plant p1">🌿</div>
            <div className="jungle-plant p2">🌴</div>

            {/* The Animals */}
            {jungleMap.map((animal, index) => (
              <div
                key={index}
                className="wild-animal"
                style={{ top: animal.top, left: animal.left }}
                onClick={() => handleAnimalClick(animal.name)}
              >
                {animal.icon}
              </div>
            ))}

            {/* Your Mascot Guide */}
            <div className="dino-guide">🦖</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;