import React, { useState, useEffect } from 'react';
import './playingcards.css';

const playingcards = ({ onExit, onCorrectClick }) => {
    const [cards, setCards] = useState([]);
    const [target, setTarget] = useState(null);

    const generateRound = () => {
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const suits = ['♠️', '♥️', '♣️', '♦️'];
        const newCards = Array.from({ length: 3 }, () => ({
            val: values[Math.floor(Math.random() * values.length)],
            suit: suits[Math.floor(Math.random() * suits.length)]
        }));
        setCards(newCards);
        setTarget(newCards[Math.floor(Math.random() * newCards.length)].val);
    };

    useEffect(() => { generateRound(); }, []);

    const checkCard = (val) => {
        if (val === target) {
            onCorrectClick();
            generateRound();
        }
    };

    return (
        <div className="playing-cards-stage fade-in">
            <div className="game-header">
                <button className="back-btn" onClick={onExit}>← exit</button>
                <h2>Find the card with value: <span className="highlight">{target}</span></h2>
            </div>
            <div className="cards-row">
                {cards.map((card, i) => (
                    <button key={i} className="math-card" onClick={() => checkCard(card.val)}>
                        <span className="card-suit top">{card.suit}</span>
                        <span className="card-val">{card.val}</span>
                        <span className="card-suit bottom">{card.suit}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default playingcards;