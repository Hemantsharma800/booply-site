import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const games = [
    { id: 'chess', title: 'Elite Chess', desc: 'Strategy' },
    { id: 'booplyblast', title: 'Booply Blast', desc: 'Arcade' },
    { id: 'colourgame', title: 'Colour Match', desc: 'Logic' },
    { id: 'dinogame', title: 'Dino Run', desc: 'Action' },
    { id: 'fightergame', title: 'Street Fighter', desc: 'Combat' },
    { id: 'geoexplorer', title: 'Geo Explorer', desc: '3D World' },
    { id: 'kitchenclass', title: 'Kitchen Rush', desc: 'Cooking' },
    { id: 'nitrodash', title: 'Nitro Dash', desc: 'Racing' },
    { id: 'playingcards', title: 'Playing Cards', desc: 'Cards' },
    { id: 'puzzlepop', title: 'Puzzle Pop', desc: 'Puzzles' },
    { id: 'snakegame', title: 'Classic Snake', desc: 'Retro' }
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
                            <p>{game.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <footer className="arcade-footer">
                <Link to="/legal">Privacy & Terms</Link>
            </footer>
        </div>
    );
}

export default Home;