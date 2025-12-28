import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const games = [
    { id: 'chess', title: 'Elite Chess', category: 'Strategy' },
    { id: 'booply-blast', title: 'Booply Blast', category: 'Arcade' },
    { id: 'colour-game', title: 'Colour Game', category: 'Logic' },
    { id: 'dino-game', title: 'Dino Game', category: 'Action' },
    { id: 'fighter-game', title: 'Fighter Game', category: 'Combat' },
    { id: 'geo-explorer', title: 'Geo Explorer', category: '3D' },
    { id: 'kitchen-class', title: 'Kitchen Class', category: 'Simulation' },
    { id: 'nitro-dash', title: 'Nitro Dash', category: 'Racing' },
    { id: 'playing-cards', title: 'Playing Cards', category: 'Cards' },
    { id: 'puzzle-pop', title: 'Puzzle Pop', category: 'Puzzle' },
    { id: 'snake-game', title: 'Snake Game', category: 'Classic' }
];

function Home() {
    return (
        <div className="arcade-wrapper">
            <header className="arcade-header">
                <h1>Booply</h1>
                <p>Elite Math Arcade</p>
            </header>

            <main className="game-grid">
                {games.map(game => (
                    <Link to={`/${game.id}`} key={game.id} className="game-card">
                        <h3>{game.title}</h3>
                        <span>{game.category}</span>
                    </Link>
                ))}
            </main>
        </div>
    );
}

export default Home;