import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop! Tap a bubble!");

  // Sticker Collection Logic
  const [stickers, setStickers] = useState([]);
  const stickerList = ['⭐', '❤️', '🍦', '🚀', '🦄', '🍎', '🎈', '🐯'];

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

  const goHome = () => {
    // Award a random sticker when going home!
    const newSticker = stickerList[Math.floor(Math.random() * stickerList.length)];
    if (stickers.length < 8) {
      setStickers([...stickers, newSticker]);
      setMascotText(`You earned a ${newSticker}!`);
    } else {
      setMascotText("Your sticker book is full! Wow!");
    }
    setActiveGame(null);
  };

  return (
    <div className="booply-container">
      {!activeGame ? (
        <>
          <header>
            <h1 className="logo">Booply</h1>
            <div className="sticker-book">
              <p>My Stickers:</p>
              <div className="sticker-row">
                {stickers.map((s, i) => <span key={i} className="sticker-item">{s}</span>)}
                {[...Array(8 - stickers.length)].map((_, i) => <span key={i} className="sticker-slot">?</span>)}
              </div>
            </div>
          </header>

          <main className="lobby">
            {/* ... keep your existing game bubbles code here ... */}
            {/* Make sure to use 'openGame(game)' on click */}
          </main>
        </>
      ) : (
        <div className="game-view">
          {loading && <div className="loader-overlay">🚀 Loading...</div>}
          <button className="back-button" onClick={goHome}>🏠 Home</button>
          <iframe src={activeGame.url} className="game-frame" onLoad={() => setLoading(false)} />
        </div>
      )}

      <div className="mascot-area">
        <div className="speech-bubble">{mascotText}</div>
        <div className="boop-character">👀</div>
      </div>
    </div>
  );
}

export default App;