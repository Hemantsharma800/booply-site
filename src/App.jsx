import React, { useState, useEffect } from 'react';
import './App.css';

// 1. Data for the Jungle Explorer
const JUNGLE_ANIMALS = [
  { name: 'Lion', icon: '🦁' },
  { name: 'Elephant', icon: '🐘' },
  { name: 'Giraffe', icon: '🦒' },
  { name: 'Monkey', icon: '🐒' },
  { name: 'Zebra', icon: '🦓' },
  { name: 'Parrot', icon: '🦜' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [targetAnimal, setTargetAnimal] = useState(null);
  const [jungleMap, setJungleMap] = useState([]);
  const [score, setScore] = useState(0);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop!");

  const games = [
    { id: 1, name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
    { id: 2, name: 'Dino Jungle', color: '#FF6347', icon: '🦖', type: 'internal' },
    { id: 3, name: 'Color Fun', color: '#1E90FF', icon: '🎨', url: 'https://kleki.com/' },
    { id: 4, name: 'Music Box', color: '#32CD32', icon: '🎵', url: 'https://pianu.com/' },
    { id: 5, name: 'Space Trip', color: '#9370DB', icon: '🚀', url: 'https://playcanv.as/p/2OFE7j9V/' },
  ];

  // 2. The Logic to create the Jungle
  const refreshJungle = () => {
    const mapWithPositions = JUNGLE_ANIMALS.map(animal => ({
      ...animal,
      top: Math.floor(Math.random() * 60) + 20 + "%",
      left: Math.floor(Math.random() * 80) + 5 + "%"
    }));
    setJungleMap(mapWithPositions);
    const randomTarget = mapWithPositions[Math.floor(Math.random() * mapWithPositions.length)];
    setTargetAnimal(randomTarget);
  };

  const handleOpenGame = (game) => {
    if (game.type === 'internal') refreshJungle();
    setActiveGame(game);
  };

  const handleAnimalClick = (name) => {
    if (name === targetAnimal.name) {
      setScore(s => s + 1);
      refreshJungle(); // New round!
    } else {
      setMascotText(`Boop! That's a ${name}! Find the ${targetAnimal.name}!`);
    }
  };

  return (
    <div className="booply-container">
      {!activeGame ? (
        <>
          <header className="header-section">
            <h1 className="logo">Booply</h1>
            <div className="score-board">Stars: {score} ⭐</div>
          </header>
          <main className="lobby-grid">
            {games.map(game => (
              <button key={game.id} className="game-bubble" style={{ backgroundColor: game.color }} onClick={() => handleOpenGame(game)}>
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
            <div className="jungle-world">
              <div className="target-banner">Find the: <span>{targetAnimal?.name}</span></div>
              {jungleMap.map((animal, i) => (
                <div key={i} className="wild-animal" style={{ top: animal.top, left: animal.left }} onClick={() => handleAnimalClick(animal.name)}>
                  {animal.icon}
                </div>
              ))}
              <div className="jungle-guide">🦖</div>
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