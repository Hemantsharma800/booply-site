import React from 'react';
import './App.css';

function App() {
  const openParentalGate = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const answer = window.prompt(`Parents Only: What is ${num1} + ${num2}?`);

    if (parseInt(answer) === num1 + num2) {
      alert("Access Granted to Settings!");
    } else {
      alert("Boop! That's for grown-ups.");
    }
  };
  const games = [
    { id: 1, name: 'Puzzle Pop', color: '#FFD700', icon: '🧩' },
    { id: 2, name: 'Dino Dash', color: '#FF6347', icon: '🦖' },
    { id: 3, name: 'Color Fun', color: '#1E90FF', icon: '🎨' },
    { id: 4, name: 'Music Box', color: '#32CD32', icon: '🎵' },
  ];

  const handleBoop = (name) => {
    // This creates a "Pop" sound using your computer's speakers
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Pitch
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);

    console.log(`Booply magic: Starting ${name}`);
  };

  return (
    return (
    <div className="booply-container">
      {/* Background Decorative Blobs */}
      <div className="bg-decoration shape1">⭐</div>
      <div className="bg-decoration shape2">☁️</div>
      <div className="bg-decoration shape3">🎈</div>

      {!activeGame ? (
        <>
          <header>
            <h1 className="logo">Booply</h1>
            <div className="speech-bubble">Which world should we visit today?</div>
          </header>
          {/* ... rest of your lobby code ... */}
        </>
      ) : (
      /* ... game view code ... */
    )}
    </div>
  );
  <div className="booply-container">
    <header>
      <h1 className="logo">Booply!</h1>
      <p>Tap a bubble to play</p>
    </header>

    <main className="lobby">
      {games.map((game) => (
        <button
          key={game.id}
          className="game-bubble"
          style={{ backgroundColor: game.color }}
          onClick={() => handleBoop(game.name)}
        >
          <span className="game-icon">{game.icon}</span>
          <span className="game-name">{game.name}</span>
        </button>
      ))}
    </main>

    <div className="mascot">
      <div className="boop-character">👀</div>
      <p>I'm Boop!</p>
    </div>
  </div>
  );
}

export default App;