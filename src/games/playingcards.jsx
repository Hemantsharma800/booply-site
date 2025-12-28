import React, { useState, useEffect } from 'react';
import './playingcards.css';

const playingcards = ({ onExit, onCorrectClick }) => {
    const [deck, setDeck] = useState([]);
    const [target, setTarget] = useState(null);
    const [score, setScore] = useState(0);

    // Generate a premium deck of math cards
    const initGame = () => {
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // 11 is J, 12 is Q, etc.
        const suits = ['♠️', '♥️', '♣️', '♦️'];
        const newDeck = Array.from({ length: 4 }, () => ({
            val: values[Math.floor(Math.random() * values.length)],
            suit: suits[Math.floor(Math.random() * suits.length)]
        }));
        setDeck(newDeck);
        setTarget(newDeck[Math.floor(Math.random() * newDeck.length)].val);
    };

    useEffect(() => { initGame(); }, []);

    const handleChoice = (val) => {
        if (val === target) {
            onCorrectClick(); // Adds stars to your 278 total
            setScore(s => s + 1);
            initGame();
        }
    };

    return (
        <div className="card-arena fade-in">
            <div className="arena-header">
                <button className="btn-exit" onClick={onExit}>← back to lobby</button>
                <div className="game-status">
                    <p>Find the card with value: <strong>{target}</strong></p>
                    <span>streak: {score}</span>
                </div>
            </div>

            <div className="card-grid">
                {deck.map((card, i) => (
                    <button key={i} className="elite-card" onClick={() => handleChoice(card.val)}>
                        <div className="card-inner">
                            <span className="suit-top">{card.suit}</span>
                            <span className="value-center">{card.val}</span>
                            <span className="suit-bottom">{card.suit}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default playingcards;