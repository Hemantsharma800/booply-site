import React, { useState, useEffect } from 'react';
import './App.css';

// 1. HYBRID ANIMAL DATA (Using Emojis that we will style realistically)
// We use 12 animals for variety.
const JUNGLE_ANIMALS = [
  { name: 'Lion', icon: '🦁' },
  { name: 'Elephant', icon: '🐘' },
  { name: 'Giraffe', icon: '🦒' },
  { name: 'Monkey', icon: '🐒' },
  { name: 'Zebra', icon: '🦓' },
  { name: 'Parrot', icon: '🦜' },
  { name: 'Tiger', icon: '🐅' },
  { name: 'Hippo', icon: '🦛' },
  { name: 'Gorilla', icon: '🦍' },
  { name: 'Snake', icon: '🐍' },
  { name: 'Crocodile', icon: '🐊' },
  { name: 'Leopard', icon: '🐆' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [targetAnimal, setTargetAnimal] = useState(null);
  const [jungleMap, setJungleMap] = useState([]);
  const [score, setScore] = useState(0);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop!");

  const games = [
    { id: 1, name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
    { id: 2, name: 'Dino Jungle', color: '#2d6a4f', icon: '🦖', type: 'internal', hint: 'Find real animals!' },
    { id: 3, name: 'Color Fun', color: '#1E90FF', icon: '🎨', url: 'https://kleki.com/' },
    { id: 4, name: 'Music Box', color: '#32CD32', icon: '🎵', url: 'https://pianu.com/' },
    { id: 5, name: 'Space Trip', color: '#9370DB', icon: '🚀', url: 'https://playcanv.as/p/2OFE7j9V/' },
  ];

  // Generate the jungle layout immediately when the game loads
  const refreshJungle = () => {
    // Pick 8 random animals
    const shuffled = [...JUNGLE_ANIMALS].sort(() => 0.5 - Math.random()).slice(0, 8);

    const mapWithPositions = shuffled.map((animal, index) => ({
      ...animal,
      // Position them in the middle area of the screen
      top: Math.floor(Math.random() * 40) + 30 + "%",
      left: Math.floor(Math.random() * 80) + 5 + "%",
      // Add slight random tilt for realism
      rot: Math.floor(Math.random() * 20) - 10 + "deg",
      // Vary size to create depth illusion
      scale: Math.random() * 0.5 + 1.5,
      // Random Z-index so some appear in front of others
      zIndex: Math.floor(Math.random() * 10)
    }));
    setJungleMap(mapWithPositions);
    setTargetAnimal(mapWithPositions[Math.floor(Math.random() * mapWithPositions.length)]);
  };

  const handleOpenGame = (game) => {
    if (game.type === 'internal') {
      refreshJungle();
      setMascotText("Welcome to the Jungle! Watch out!");
    }
    setActiveGame(game);
  };

  const handleAnimalClick = (name) => {
    if (name === targetAnimal.name) {
      setScore(s => s + 1);
      setMascotText(`Correct! That is a ${name}!`);
      refreshJungle(); // Shuffle for next round
    } else {
      setMascotText(`Oops! That's a ${name}. Find the ${targetAnimal.name}!`);
    }
  };

  return (
    <div className="booply-container">
      {!activeGame ? (
        <>
          <header className="header-section">
            <h1 className="logo">Booply</h1>
            <div className="score-board">Jungle Stars: {score} ⭐</div>
          </header>
          <main className="lobby-grid">
            {games.map(game => (
              <button key={game.id} className="game-bubble" style={{ backgroundColor: game.color }} onClick={() => handleOpenGame(game)} onMouseEnter={() => setMascotText(game.hint)}>
                <span className="game-icon">{game.icon}</span>
                <span className="game-name">{game.name}</span>
              </button>
            ))}
          </main>
        </>
      ) : (
        <div className="game-overlay">
          <button className="back-btn" onClick={() => setActiveGame(null)}>🏠 Home</button>

          {activeGame.type === 'internal' ? (
            // === THE HYBRID REALITY JUNGLE ===
            <div className="jungle-world-hybrid">
              {/* CSS-based jungle foliage layers */}
              <div className="jungle-layer layer-1"></div>
              <div className="jungle-layer layer-2"></div>

              <div className="target-banner-hybrid">
                Find the real: <span>{targetAnimal?.name}</span>
              </div>

              {jungleMap.map((animal, i) => (
                <div
                  key={i}
                  className="hybrid-animal-container"
                  style={{
                    top: animal.top,
                    left: animal.left,
                    zIndex: animal.zIndex,
                    transform: `rotate(${animal.rot}) scale(${animal.scale})`
                  }}
                  onClick={() => handleAnimalClick(animal.name)}
                >
                  {/* The 3D-styled Emoji */}
                  <div className="animal-3d-emoji">{animal.icon}</div>
                </div>
              ))}
              {/* The Dino Guide placed in the scene */}
              <div className="jungle-guide-hybrid">🦖</div>
            </div>
          ) : (
            <iframe src={activeGame.url} className="game-frame" title={activeGame.name} />
          )}
        </div>
      )}
      <div className="mascot-area">
        <div className="speech-bubble">{mascotText}</div>
        <div className="boop-avatar">👀</div>
      </div>
    </div>
  );
}

export default App;