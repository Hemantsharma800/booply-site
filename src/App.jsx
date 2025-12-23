import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. ALL STATES (The "Brain" of Booply)
  const [activeGame, setActiveGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop! Tap a bubble!");
  const [stickers, setStickers] = useState([]);

  const stickerList = ['⭐', '❤️', '🍦', '🚀', '🦄', '🍎', '🎈', '🐯', '🦖', '🍭'];
  const games = [
    { id: 1, name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', url: 'https://www.google.com/logos/2010/pacman10-i.html', hint: 'I love mazes!' },
    { id: 2, name: 'Dino Dash', color: '#FF6347', icon: '🦖', url: 'https://wayou.github.io/t-rex-runner/', hint: 'Run, Dino, Run!' },
    { id: 3, name: 'Color Fun', color: '#1E90FF', icon: '🎨', url: 'https://kleki.com/', hint: 'Let’s paint together!' },
    { id: 4, name: 'Music Box', color: '#32CD32', icon: '🎵', url: 'https://pianu.com/', hint: 'Let’s make music!' },
    { id: 5, name: 'Space Trip', color: '#9370DB', icon: '🚀', url: 'https://playcanv.as/p/2OFE7j9V/', hint: 'To the stars!' },
  ];

  // 2. SAVING & LOADING (LocalStorage)
  useEffect(() => {
    const saved = localStorage.getItem('booply_stickers');
    if (saved) setStickers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('booply_stickers', JSON.stringify(stickers));
  }, [stickers]);

  // 3. SPECIAL FUNCTIONS
  const playBoopSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const openGame = (game) => {
    playBoopSound();
    setMascotText("Yay! Off we go!");
    setLoading(true);
    setActiveGame(game);
  };

  const goHome = () => {
    const prize = stickerList[Math.floor(Math.random() * stickerList.length)];
    if (stickers.length < 10) {
      setStickers([...stickers, prize]);
      setMascotText(`Boop! You won a ${prize}!`);
    }
    setActiveGame(null);
  };

  const openParentalGate = () => {
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 5);
    const ans = window.prompt(`Grown-ups Only: What is ${n1} + ${n2}?`);
    if (parseInt(ans) === n1 + n2) alert("Settings Unlocked! (Feature coming soon)");
    else alert("Boop! Wrong answer!");
  };

  // 4. THE LAYOUT (The Visuals)
  return (
    <div className="booply-container">
      {!activeGame ? (
        <>
          <header>
            <h1 className="logo">Booply</h1>

            <div className="sticker-book">
              <p>My Sticker Collection</p>
              <div className="sticker-row">
                {stickers.map((s, i) => <span key={i} className="sticker-item">{s}</span>)}
                {[...Array(10 - stickers.length)].map((_, i) => (
                  <span key={i} className="sticker-slot">?</span>
                ))}
              </div>
            </div>
          </header>

          <main className="lobby">
            {games.map((game) => (
              <button
                key={game.id}
                className="game-bubble"
                style={{ backgroundColor: game.color }}
                onClick={() => openGame(game)}
                onMouseEnter={() => setMascotText(game.hint)}
                onMouseLeave={() => setMascotText("Tap a bubble to play!")}
              >
                <span className="game-icon">{game.icon}</span>
                <span className="game-name">{game.name}</span>
              </button>
            ))}
          </main>

          <button className="parent-btn" onClick={openParentalGate}>⚙️ Parents Only</button>
        </>
      ) : (
        <div className="game-view">
          {loading && <div className="loader-overlay">🚀 Boop is flying to the game...</div>}
          <button className="back-button" onClick={goHome}>🏠 Home</button>
          <iframe
            src={activeGame.url}
            title={activeGame.name}
            className="game-frame"
            onLoad={() => setLoading(false)}
          />
        </div>
      )}

      <div className="mascot-area">
        <div className="speech-bubble">{mascotText}</div>
        <div className="boop-character" onClick={() => setMascotText("Hehe! That tickles!")}>👀</div>
      </div>
    </div>
  );
}

export default App;