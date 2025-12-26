import React, { useState, useEffect, useCallback, Suspense } from 'react';
import './app.css';

// 🎮 GAME COMPONENT REGISTRY
import SnakeGame from './games/snakegame.jsx';
import GeoExplorer from './games/geoexplorer.jsx';
import FighterGame from './games/fightergame.jsx';
import NitroDash from './games/nitrodash.jsx';
import AILab from './games/ailab.jsx';
import KitchenClass from './games/kitchenclass.jsx';
import PuzzlePop from './games/puzzlepop.jsx';
import ColourGame from './games/colourgame.jsx';
import DinoGame from './games/dinogame.jsx';

const INTERNAL_GAMES = {
  'snake-v1': SnakeGame,
  'geo-ai-v1': GeoExplorer,
  'fighter-v1': FighterGame,
  'nitro-dash-v1': NitroDash,
  'ai-lab-v1': AILab,
  'kitchen-class-v1': KitchenClass,
  'puzzle-pop-v1': PuzzlePop,
  'colour-fun-v1': ColourGame,
  'dino-dash-v1': DinoGame,
};

const MASTER_GAME_LIST = [
  { id: 'fighter-v1', name: 'Shadow Duel Math', color: '#00f2ff', icon: '🥷', category: 'Math-Action' },
  { id: 'geo-ai-v1', name: 'Terra Cognita AI', color: '#00ff41', icon: '🌍', category: 'Geography' },
  { id: 'snake-v1', name: 'Neon Cobra', color: '#FFD700', icon: '🐍', category: 'Classic' },
  { id: 'nitro-dash-v1', name: 'Nitro Dash', color: '#FF4757', icon: '🏎️', category: 'Logic' },
  { id: 'ai-lab-v1', name: 'AI Scanner', color: '#7E57C2', icon: '🧠', category: 'Science' },
  { id: 'kitchen-class-v1', name: 'Kitchen Class', color: '#FF7043', icon: '🍳', category: 'Learning' },
  { id: 'puzzle-pop-v1', name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', category: 'Puzzle' },
  { id: 'colour-fun-v1', name: 'Color Fun', color: '#1E90FF', icon: '🎨', category: 'Art' },
  { id: 'dino-dash-v1', name: 'Dino Dash', color: '#FF6347', icon: '🦖', category: 'Action' },
];

export default function App() {
  const [view, setView] = useState('lobby'); // lobby, game, dashboard, privacy
  const [activeGame, setActiveGame] = useState(null);

  // 📈 PERSISTENCE ENGINE
  const [stars, setStars] = useState(() => Number(localStorage.getItem('booply-stars')) || 0);
  const [mathStats, setMathStats] = useState(() =>
    JSON.parse(localStorage.getItem('booply-math-stats')) || { totalSolved: 0, level: 1 }
  );

  useEffect(() => {
    localStorage.setItem('booply-stars', stars);
    localStorage.setItem('booply-math-stats', JSON.stringify(mathStats));
  }, [stars, mathStats]);

  const recordMathSolved = useCallback(() => {
    setMathStats(prev => ({ ...prev, totalSolved: prev.totalSolved + 1 }));
    setStars(s => s + 5);
  }, []);

  const handleLaunchGame = (game) => {
    setActiveGame(game);
    setView('game');
  };

  return (
    <div className="booply-root">
      {view === 'lobby' && (
        <div className="lobby-view fade-in">
          <header className="elite-header">
            <h1 className="logo">BOOPLY</h1>
            <div className="header-actions">
              <button className="dash-trigger" onClick={() => setView('dashboard')}>📈 PARENT DASHBOARD</button>
              <div className="star-counter">⭐ {stars}</div>
            </div>
          </header>

          <main className="content-scroll">
            {/* HERO: FEATURED GAME */}
            <section className="hero-box">
              <div className="hero-card" style={{ '--accent': MASTER_GAME_LIST[0].color }}>
                <span className="hero-icon">{MASTER_GAME_LIST[0].icon}</span>
                <div className="hero-info">
                  <span className="tag">NEW MATH EDITION</span>
                  <h2>{MASTER_GAME_LIST[0].name}</h2>
                  <p>Master addition and subtraction to fuel your Shadow Shinobi.</p>
                  <button className="launch-btn" onClick={() => handleLaunchGame(MASTER_GAME_LIST[0])}>PLAY NOW</button>
                </div>
              </div>
            </section>

            {/* ARCADE GRID */}
            <section className="arcade-section">
              <h3 className="section-title">Academic Library</h3>
              <div className="arcade-grid">
                {MASTER_GAME_LIST.map(game => (
                  <button key={game.id} className="game-tile" onClick={() => handleLaunchGame(game)} style={{ '--theme': game.color }}>
                    <span className="tile-emoji">{game.icon}</span>
                    <div className="tile-text">
                      <span className="tile-name">{game.name}</span>
                      <span className="tile-cat">{game.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </main>

          <footer className="footer-nav">
            <button onClick={() => setView('privacy')}>PRIVACY & SAFETY POLICY</button>
          </footer>
        </div>
      )}

      {/* PARENTAL DASHBOARD OVERLAY */}
      {view === 'dashboard' && (
        <div className="full-overlay fade-in">
          <div className="modal-glass">
            <h2>PARENTAL DASHBOARD</h2>
            <div className="dashboard-grid">
              <div className="data-card">
                <small>ACADEMIC PROGRESS</small>
                <div className="big-stat">{mathStats.totalSolved}</div>
                <p>Math Problems Solved</p>
              </div>
              <div className="data-card">
                <small>REWARDS EARNED</small>
                <div className="big-stat">⭐ {stars}</div>
                <p>Booply Stars</p>
              </div>
            </div>
            <button className="primary-btn" onClick={() => setView('lobby')}>BACK TO ARCADE</button>
          </div>
        </div>
      )}

      {/* PRIVACY POLICY OVERLAY */}
      {view === 'privacy' && (
        <div className="full-overlay fade-in">
          <div className="modal-glass privacy-modal">
            <h2>PRIVACY & SAFETY</h2>
            <div className="privacy-body">
              <section>
                <h4>1. Kid-Safe Infrastructure</h4>
                <p>Booply is a zero-data-collection platform. We do not store names, emails, or biometric data. All game progress is saved locally on your device.</p>
              </section>
              <section>
                <h4>2. COPPA Compliance</h4>
                <p>We strictly adhere to the Children's Online Privacy Protection Act. There are no third-party trackers or hidden behavioral analytics.</p>
              </section>
              <section>
                <h4>3. Education First</h4>
                <p>Our only metric for success is academic progress. We provide a distraction-free environment for children to learn through play.</p>
              </section>
            </div>
            <button className="primary-btn" onClick={() => setView('lobby')}>CLOSE POLICY</button>
          </div>
        </div>
      )}

      {/* FULLSCREEN GAME STAGE */}
      {view === 'game' && activeGame && (
        <div className="game-stage-wrapper">
          <Suspense fallback={<div className="loading-screen">INITIALIZING ENGINE...</div>}>
            {React.createElement(INTERNAL_GAMES[activeGame.id], {
              onExit: () => setView('lobby'),
              onCorrectClick: recordMathSolved
            })}
          </Suspense>
        </div>
      )}
    </div>
  );
}