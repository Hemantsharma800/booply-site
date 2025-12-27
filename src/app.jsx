import React, { useState, useEffect } from 'react';
// 🛠️ FIX: Adding .jsx extension clears the red lines
import home from './home.jsx';
import gamemanager from './gamemanager.jsx';

const booply_games = [
  { id: 'g1', name: 'booply blast', icon: '🍭', color: '#ff00de', cat: 'puzzle' },
  { id: 'g2', name: 'safari study', icon: '🦁', color: '#39ff14', cat: 'identification' }, // Maps to g2
  { id: 'g3', name: 'ai lab', icon: '🤖', color: '#00f2ff', cat: 'study' },
  { id: 'g4', name: 'fighter game', icon: '🥷', color: '#ff4757', cat: 'action' },
  { id: 'g5', name: 'colour game', icon: '🎨', color: '#ffd700', cat: 'logic' },
  { id: 'g6', name: 'geo explorer', icon: '🌍', color: '#4cd137', cat: 'geography' },
  { id: 'g7', name: 'kitchen class', icon: '🍳', color: '#ff7043', cat: 'cooking' },
  { id: 'g8', name: 'nitro dash', icon: '🏎️', color: '#00d4ff', cat: 'racing' },
  { id: 'g9', name: 'puzzle pop', icon: '🧩', color: '#9c88ff', cat: 'puzzle' },
  { id: 'g10', name: 'snake game', icon: '🐍', color: '#fbc531', cat: 'classic' }
];

export default function app() {
  const [view, setview] = useState('lobby');
  const [activegameid, setactivegameid] = useState(null);
  const [showfeedback, setshowfeedback] = useState(false);
  const [privacyopen, setprivacyopen] = useState(false);

  // 🍪 Persistence for your 278 stars
  const [stars, setstars] = useState(() => Number(localStorage.getItem('stars')) || 278);
  const [dailyscore, setdailyscore] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('daily-stats'));
    const today = new Date().toDateString();
    if (saved && saved.date === today) return saved.score;
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('stars', stars);
    localStorage.setItem('daily-stats', JSON.stringify({ score: dailyscore, date: new Date().toDateString() }));
  }, [stars, dailyscore]);

  return (
    <div className="booply-root">
      {view === 'lobby' ? (
        <home
          stars={stars}
          dailyscore={dailyscore}
          gamelist={booply_games}
          privacyopen={privacyopen}
          setprivacyopen={setprivacyopen}
          onlaunchgame={(id) => { setactivegameid(id); setview('game'); }}
          onshowfeedback={() => setshowfeedback(true)}
        />
      ) : (
        <gamemanager
          activegameid={activegameid}
          onexit={() => setview('lobby')}
          onscoreupdate={(s, d) => { setstars(prev => prev + s); setdailyscore(prev => prev + d); }}
        />
      )}
    </div>
  );
}