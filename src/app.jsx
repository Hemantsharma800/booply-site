import React, { useState, useEffect } from 'react';
import Home from './home';
import GameManager from './gamemanager';

const master_game_list = [
  { id: 'g1', name: 'booply blast', icon: '🍭', color: '#ff00de', cat: 'puzzle' },
  { id: 'g2', name: 'safari study', icon: '🦁', color: '#39ff14', cat: 'identification' },
  { id: 'g3', name: 'safari dash', icon: '🦖', color: '#00f2ff', cat: 'runner' },
  { id: 'g4', name: 'shadow duel', icon: '🥷', color: '#bc13fe', cat: 'action' },
  { id: 'g5', name: 'math matrix', icon: '🔢', color: '#ffd700', cat: 'logic' },
  { id: 'g6', name: 'aqua match', icon: '🐟', color: '#00d4ff', cat: 'puzzle' },
  { id: 'g7', name: 'sky racer', icon: '🚀', color: '#ff4757', cat: 'action' },
  { id: 'g8', name: 'geo explorer', icon: '🌍', color: '#4cd137', cat: 'study' },
  { id: 'g9', name: 'word woods', icon: '📚', color: '#fbc531', cat: 'english' },
  { id: 'g10', name: 'star sort', icon: '✨', color: '#9c88ff', cat: 'logic' },
];

export default function App() {
  const [view, setview] = useState('lobby');
  const [activegameid, setactivegameid] = useState(null);
  const [showfeedback, setshowfeedback] = useState(false);
  const [privacyopen, setprivacyopen] = useState(false);

  const [stars, setstars] = useState(() => Number(localStorage.getItem('stars')) || 278);
  const [dailyscore, setdailyscore] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('daily-stats'));
    const today = new Date().toDateString();
    if (saved && saved.date === today) return saved.score;
    return 0; // daily reset
  });

  useEffect(() => {
    localStorage.setItem('stars', stars);
    localStorage.setItem('daily-stats', JSON.stringify({ score: dailyscore, date: new Date().toDateString() }));
    if (Notification.permission === 'default') {
      setTimeout(() => Notification.requestPermission(), 5000);
    }
  }, [stars, dailyscore]);

  return (
    <div className="booply-app">
      {view === 'lobby' ? (
        <Home
          stars={stars}
          dailyscore={dailyscore}
          gamelist={master_game_list}
          privacyopen={privacyopen}
          setprivacyopen={setprivacyopen}
          onlaunchgame={(id) => { setactivegameid(id); setview('game'); }}
          onshowfeedback={() => setshowfeedback(true)}
        />
      ) : (
        <GameManager
          activegameid={activegameid}
          onexit={() => setview('lobby')}
          onscoreupdate={(s, d) => { setstars(prev => prev + s); setdailyscore(prev => prev + d); }}
        />
      )}
      {/* feedback modal here */}
    </div>
  );
}