import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [loading, setLoading] = useState(false);
  // This state stores what Boop is currently saying
  const [mascotText, setMascotText] = useState("Hi! I'm Boop! Tap a bubble!");

  const games = [
    { id: 1, name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', url: 'https://www.google.com/logos/2010/pacman10-i.html', hint: 'I love puzzles!' },
    { id: 2, name: 'Dino Dash', color: '#FF6347', icon: '🦖', url: 'https://wayou.github.io/t-rex-runner/', hint: 'Run, Dino, Run!' },
    { id: 3, name: 'Color Fun', color: '#1E90FF', icon: '🎨', url: 'https://kleki.com/', hint: 'Let’s paint a rainbow!' },
    { id: 4, name: 'Music Box', color: '#32CD32', icon: '🎵', url: 'https://pianu.com/', hint: 'Time for some music!' },
  ];

  const playBoopSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const openGame = (game) => {
    playBoopSound();
    setMascotText("Yay! Let's go!");
    setLoading(true);
    setActiveGame(game);
  };

  return (
    <div className="booply-container">
      {/* Background Decorations */}
      <div className="bg-decoration shape1">⭐</div>
      <div className="bg-decoration shape2">☁️</div>
      <div className="bg-decoration shape3">🎈</div>

      {!activeGame ? (
        <>
          <header>
            <h1 className="logo">Booply</h1>
          </header>

          <main className="lobby">
            {games.map((game) => (
              <button
                key={game.id}
                className="game-bubble"
                style={{ backgroundColor: game.color }}
                onClick={() => openGame(game)}
                // Change Boop's text when the mouse enters or leaves the bubble
                onMouseEnter={() => setMascotText(game.hint)}
                onMouseLeave={() => setMascotText("Tap a bubble to play!")}
              >
                <span className="game-icon">{game.icon}</span>
                <span className="game-name">{game.name}</span>
              </button>
            ))}
          </main>
        </>
      ) : (
        <div className="game-view">
          {loading && <div className="loader-overlay">🚀 Boop is fetching your game...</div>}
          <button className="back-button" onClick={() => setActiveGame(null)}>🏠 Home</button>
          <iframe src={activeGame.url} title={activeGame.name} className="game-frame" onLoad={() => setLoading(false)} />
        </div>
      )}

      {/* The Mascot and Speech Bubble */}
      <div className="mascot-area">
        <div className="speech-bubble">{mascotText}</div>
        <div className="boop-character" onClick={() => setMascotText("Hehe! Stop tickling me!")}>👀</div>
      </div>
    </div>
  );
}

export default App;