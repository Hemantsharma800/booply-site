import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const games = [
  { id: 'chess', title: 'Elite Chess', desc: 'Strategy' },
  { id: 'booply-blast', title: 'Booply Blast', desc: 'Arcade' },
  { id: 'colour-game', title: 'Colour Match', desc: 'Logic' },
  { id: 'dino-game', title: 'Dino Run', desc: 'Action' },
  { id: 'fighter-game', title: 'Street Fighter', desc: 'Combat' },
  { id: 'geo-explorer', title: 'Geo Explorer', desc: '3D World' },
  { id: 'kitchen-class', title: 'Kitchen Rush', desc: 'Cooking' },
  { id: 'nitro-dash', title: 'Nitro Dash', desc: 'Racing' },
  { id: 'playing-cards', title: 'Playing Cards', desc: 'Cards' },
  { id: 'puzzle-pop', title: 'Puzzle Pop', desc: 'Puzzles' },
  { id: 'snake-game', title: 'Classic Snake', desc: 'Retro' }
];

function Home() {
  return (
    <div className="arcade-container">
      <header className="arcade-header">
        <h1>Booply</h1>
        <p>Elite Math Arcade</p>
      </header>

      <div className="game-grid">
        {games.map((game) => (
          <Link to={`/${game.id}`} key={game.id} className="game-card">
            <div className="card-content">
              <h3>{game.title}</h3>
              <span>{game.desc}</span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="arcade-footer">
        <Link to="/legal">Privacy & Terms</Link>
        <p>© 2025 Booply | Elite Math Arcade</p>
      </footer>
    </div>
  );
}

export default Home;