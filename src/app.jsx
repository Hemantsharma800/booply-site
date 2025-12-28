import React, { useState, useEffect } from 'react';
// 🛠️ FIXED: Removed '/src/' because we are already in the src folder
import Home from './home.jsx';
import GameManager from './gamemanager.jsx';
import './app.css';

const booply_games = [
  { id: 'g1', name: 'booply blast', icon: '🍭', color: '#ff00de', cat: 'puzzle' },
  { id: 'g2', name: 'safari study', icon: '🦁', color: '#39ff14', cat: 'logic' },
  { id: 'g3', name: 'ai lab', icon: '🤖', color: '#00f2ff', cat: 'lab' },
  { id: 'g4', name: 'fighter game', icon: '🥷', color: '#ff4757', cat: 'action' },
  { id: 'g5', name: 'colour game', icon: '🎨', color: '#ffd700', cat: 'logic' },
  { id: 'g6', name: 'geo explorer', icon: '🌍', color: '#4cd137', cat: 'geography' },
  { id: 'g7', name: 'kitchen class', icon: '🍳', color: '#ff7043', cat: 'cooking' },
  { id: 'g8', name: 'nitro dash', icon: '🏎️', color: '#00d4ff', cat: 'racing' },
  { id: 'g9', name: 'puzzle pop', icon: '🧩', color: '#9c88ff', cat: 'puzzle' },
  { id: 'g10', name: 'snake game', icon: '🐍', color: '#fbc531', cat: 'classic' },
  { id: 'g11', name: 'playing cards', icon: '🃏', color: '#ff4757', cat: 'math' }
];

export default function app() {
  const [view, setview] = useState('lobby'); // This state controls the Home Page visibility
  const [activegameid, setactivegameid] = useState(null);
  const [stars, setstars] = useState(() => Number(localStorage.getItem('stars')) || 278);

  useEffect(() => {
    localStorage.setItem('stars', stars);
  }, [stars]);

  return (
    <div className="booply-root">
      {view === 'lobby' ? (
        <Home
          stars={stars}
          gamelist={booply_games}
          onlaunchgame={(id) => { setactivegameid(id); setview('game'); }}
        />
      ) : (
        <GameManager
          activegameid={activegameid}
          onexit={() => setview('lobby')}
          onscoreupdate={(s) => setstars(prev => prev + s)}
        />
      )}
    </div>
  );
}