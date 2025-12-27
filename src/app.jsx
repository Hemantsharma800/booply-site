import React, { useState, useEffect } from 'react';
import home from './home';
import gamemanager from './gamemanager';

// 📋 THE OFFICIAL 10-GAME REGISTRY
const booply_games = [
  { id: 'g1', name: 'booply blast', icon: '🍭', color: '#ff00de', cat: 'puzzle', file: 'booplyblast' },
  { id: 'g2', name: 'dino game', icon: '🦖', color: '#39ff14', cat: 'runner', file: 'dinogame' },
  { id: 'g3', name: 'ai lab', icon: '🤖', color: '#00f2ff', cat: 'study', file: 'ailab' },
  { id: 'g4', name: 'fighter game', icon: '🥷', color: '#ff4757', cat: 'action', file: 'fightergame' },
  { id: 'g5', name: 'colour game', icon: '🎨', color: '#ffd700', cat: 'logic', file: 'colourgame' },
  { id: 'g6', name: 'geo explorer', icon: '🌍', color: '#4cd137', cat: 'geography', file: 'geoexplorer' },
  { id: 'g7', name: 'kitchen class', icon: '🍳', color: '#ff7043', cat: 'cooking', file: 'kitchenclass' },
  { id: 'g8', name: 'nitro dash', icon: '🏎️', color: '#00d4ff', cat: 'racing', file: 'nitrodash' },
  { id: 'g9', name: 'puzzle pop', icon: '🧩', color: '#9c88ff', cat: 'puzzle', file: 'puzzlepop' },
  { id: 'g10', name: 'snake game', icon: '🐍', color: '#fbc531', cat: 'classic', file: 'snakegame' }
];

export default function app() {
  const [view, setview] = useState('lobby');
  const [activegameid, setactivegameid] = useState(null);
  const [showfeedback, setshowfeedback] = useState(false);
  const [privacyopen, setprivacyopen] = useState(false);

  // 🍪 PERSISTENCE ENGINE
  const [stars, setstars] = useState(() => Number(localStorage.getItem('stars')) || 278);
  const [dailyscore, setdailyscore] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('daily-stats'));
    const today = new Date().toDateString();
    if (saved && saved.date === today) return saved.score;
    return 0; // Daily reset
  });

  useEffect(() => {
    localStorage.setItem('stars', stars);
    localStorage.setItem('daily-stats', JSON.stringify({ score: dailyscore, date: new Date().toDateString() }));
  }, [stars, dailyscore]);

  return (
    <div className="booply-app-root">
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

      {/* 📝 FEEDBACK MODAL */}
      {showfeedback && (
        <div className="modal-blur">
          <div className="feedback-card">
            <h2>games feedback</h2>
            <div className="rating-stars">⭐⭐⭐⭐⭐</div>
            <textarea placeholder="suggestions for booply?" className="modal-input" />
            <div className="modal-btns">
              <button className="btn-close" onClick={() => setshowfeedback(false)}>close</button>
              <button className="btn-submit" onClick={() => setshowfeedback(false)}>send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}