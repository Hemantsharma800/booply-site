import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// =====================================================================
// 🎮 AREA 1: IMPORTS - Import your internal game components here
// =====================================================================
import DinoGame from './games/DinoGame';
import ColorGame from './games/ColorGame';


// =====================================================================
// ⚙️ AREA 2: GAME CONFIGURATION REGISTRY
// -> TO ADD A NEW INTERNAL GAME:
//    1. Import component above.
//    2. Add it to INTERNAL_COMPONENT_REGISTRY below.
//    3. Add its bubble entry to MASTER_GAME_LIST below.
// =====================================================================

/**
 * A. INTERNAL COMPONENT REGISTRY
 * Maps a unique string ID to the actual imported React Component.
 */
const INTERNAL_COMPONENT_REGISTRY = {
  'dino-jungle-v1': DinoGame,
  'color-mix-lab-v1': ColorGame,
  // Future example: 'space-math': SpaceMathGame,
};

/**
 * B. MASTER GAME LIST
 * This list defines what appears in the Lobby bubbles.
 * - type: 'internal' needs an 'id' that matches the registry above.
 * - type: 'external' needs a 'url'.
 */
const MASTER_GAME_LIST = [
  // --- Internal Games ---
  {
    id: 'dino-jungle-v1', // Must match registry key above
    type: 'internal',
    name: 'Dino Jungle',
    color: '#2d6a4f',
    icon: '🦖',
    hint: 'Find real animals!'
  },
  {
    id: 'color-mix-lab-v1', // Must match registry key above
    type: 'internal',
    name: 'Color Fun',
    color: '#1E90FF',
    icon: '🎨',
    hint: 'Mix colors together!'
  },
  // --- External Games (Iframes) ---
  { id: 'ext-pacman', type: 'external', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
  { id: 'ext-piano', type: 'external', name: 'Music Box', color: '#32CD32', icon: '🎵', url: 'https://pianu.com/' },
  { id: 'ext-space', type: 'external', name: 'Space Trip', color: '#9370DB', icon: '🚀', url: 'https://playcanv.as/p/2OFE7j9V/' },
];
// =====================================================================
// ✅ END OF CONFIGURATION AREA
// =====================================================================



function App() {
  // --- Core Application State ---
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop! Pick a game!");
  const [stickers, setStickers] = useState([]);
  const [loadingIframe, setLoadingIframe] = useState(false);

  const stickerRewards = ['⭐', '🍦', '🚀', '🎨', '🦖', '🦁', '🍭', '🎸'];

  // --- Persistence (Load/Save data) ---
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('booply_score');
      const savedStickers = localStorage.getItem('booply_stickers');
      if (savedScore) setScore(parseInt(savedScore));
      if (savedStickers) setStickers(JSON.parse(savedStickers));
    } catch (e) {
      console.error("Could not load saved data", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('booply_score', score.toString());
    localStorage.setItem('booply_stickers', JSON.stringify(stickers));
  }, [score, stickers]);


  // --- Event Handlers ---

  const handleOpenGame = (game) => {
    setActiveGame(game);
    if (game.type === 'external') {
      setLoadingIframe(true);
      setMascotText(`Loading ${game.name}...`);
    } else {
      setMascotText(`Have fun playing ${game.name}!`);
    }
  };

  // Standard function passed to internal games to handle scoring
  const handleCorrectClick = useCallback(() => {
    setScore(s => s + 1);
    setMascotText("Yay! Great job!");
    // Optional sound effect here
  }, []);

  // Standard function passed to all games to exit to lobby
  const handleExitGame = useCallback(() => {
    setActiveGame(null);
    setLoadingIframe(false);

    // Random chance to get a sticker on exit
    if (Math.random() > 0.5 && stickers.length < 12) {
      const newSticker = stickerRewards[Math.floor(Math.random() * stickerRewards.length)];
      setStickers(prev => [...new Set([...prev, newSticker])]); // Ensure unique stickers
      setMascotText(`You earned a new sticker: ${newSticker}!`);
    } else {
      setMascotText("Welcome back! That was fun!");
    }
  }, [stickers, stickerRewards]);


  // =====================================================================
  // 🖥️ THE GAME RENDERER (The "Engine")
  // This automatically finds and renders the correct component.
  // =====================================================================
  const renderActiveGameView = () => {
    if (!activeGame) return null;

    // CASE 1: Internal Game Component
    if (activeGame.type === 'internal') {
      // Look up the component in our registry
      const GameComponent = INTERNAL_COMPONENT_REGISTRY[activeGame.id];

      // Safety check: Did we forget to import it or add it to the registry?
      if (!GameComponent) {
        return (
          <div className="game-overlay" style={{ background: 'white', color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h2>Boop! Error loading game.</h2>
            <p>Missing component for ID: {activeGame.id}</p>
            <button className="back-btn" onClick={handleExitGame} style={{ position: 'relative', top: '20px', left: '0' }}>Back</button>
          </div>
        );
      }

      // Render the found component and pass standard props
      return (
        <GameComponent
          onExit={handleExitGame}
          onCorrectClick={handleCorrectClick}
        // You can pass global score/stickers here if needed later
        />
      );
    }

    // CASE 2: External Iframe Game
    if (activeGame.type === 'external') {
      return (
        <div className="game-overlay">
          <button className="back-btn" onClick={handleExitGame}>🏠 Home</button>
          {loadingIframe && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bold' }}>Loading magic...</div>}
          <iframe
            src={activeGame.url}
            className="game-frame"
            title={activeGame.name}
            onLoad={() => setLoadingIframe(false)}
            // Basic security sandboxing for external sites
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      );
    }

    return null; // Should not happen
  };


  // =====================================================================
  // 🎨 MAIN LAYOUT RENDER
  // =====================================================================
  return (
    <div className="booply-container">
      {!activeGame ? (
        // --- LOBBY VIEW ---
        <>
          <header className="header-section">
            <h1 className="logo">Booply</h1>
            <div className="score-board">Total Stars: {score} ⭐</div>
            {stickers.length > 0 && (
              <div style={{ marginTop: '10px', fontSize: '1.2rem' }}>
                Stickers: {stickers.join(' ')}
              </div>
            )}
          </header>

          <main className="lobby-grid">
            {/* Map through the Master Config List */}
            {MASTER_GAME_LIST.map(game => (
              <button
                key={game.id}
                className="game-bubble"
                style={{ backgroundColor: game.color }}
                onClick={() => handleOpenGame(game)}
                onMouseEnter={() => setMascotText(game.hint || game.name)}
              >
                <span className="game-icon">{game.icon}</span>
                <span className="game-name">{game.name}</span>
              </button>
            ))}
          </main>

          <div className="mascot-area">
            <div className="speech-bubble">{mascotText}</div>
            <div className="boop-avatar" onClick={() => setMascotText("Teehee! That tickles!")}>👀</div>
          </div>
        </>
      ) : (
        // --- GAME VIEW ---
        // The renderer handles everything here
        renderActiveGameView()
      )}
    </div>
  );
}

export default App;