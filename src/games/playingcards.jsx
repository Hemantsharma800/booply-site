import React, { useState, useEffect } from 'react';
import './playingcards.css';

const playingcards = ({ onExit, onCorrectClick }) => {
    const [gameState, setGameState] = useState('bidding'); // bidding | playing | results
    const [playerHand, setPlayerHand] = useState([]);
    const [bids, setBids] = useState({ player: 0, bot1: 0, bot2: 0, bot3: 0 });
    const [trick, setTrick] = useState([]);
    const [scores, setScores] = useState({ player: 0, bot1: 0, bot2: 0, bot3: 0 });

    // Initialize deck and hands
    const initGame = () => {
        const suits = ['♠️', '♥️', '♣️', '♦️'];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

        // Generate a random hand for the player
        const newHand = Array.from({ length: 5 }, () => ({
            val: values[Math.floor(Math.random() * values.length)],
            suit: suits[Math.floor(Math.random() * suits.length)],
            power: 0 // Will be calculated for logic
        }));
        setPlayerHand(newHand);

        // Auto-generate bot bids for competitive feel
        setBids({
            player: 0,
            bot1: Math.floor(Math.random() * 3) + 1,
            bot2: Math.floor(Math.random() * 3) + 1,
            bot3: Math.floor(Math.random() * 3) + 1
        });
        setGameState('bidding');
    };

    useEffect(() => { initGame(); }, []);

    const handleBid = (amount) => {
        setBids(prev => ({ ...prev, player: amount }));
        setGameState('playing');
    };

    const playCard = (cardIndex) => {
        const card = playerHand[cardIndex];
        setTrick([{ player: 'You', card }]);
        setPlayerHand(prev => prev.filter((_, i) => i !== cardIndex));

        // Simulate Bots playing immediately after
        setTimeout(() => {
            const botPlays = [
                { player: 'Bot 1', card: { val: '7', suit: '♠️' } },
                { player: 'Bot 2', card: { val: 'K', suit: '♦️' } },
                { player: 'Bot 3', card: { val: 'A', suit: '♥️' } }
            ];
            setTrick(prev => [...prev, ...botPlays]);

            // Logic: If player plays high, they win stars
            if (card.val === 'A' || card.val === 'K') {
                onCorrectClick(); // Add stars to the 278 total
                setScores(prev => ({ ...prev, player: prev.player + 10 }));
            }
        }, 600);
    };

    return (
        <div className="pro-card-arena fade-in">
            <div className="arena-header">
                <button className="exit-btn" onClick={onExit}>← exit</button>
                <div className="scoreboard">
                    <span>You: {scores.player}</span>
                    <span>Bot 1: {scores.bot1}</span>
                    <span>Bot 2: {scores.bot2}</span>
                    <span>Bot 3: {scores.bot3}</span>
                </div>
            </div>

            {gameState === 'bidding' ? (
                <div className="bidding-overlay">
                    <h2>Predict your points!</h2>
                    <div className="bid-options">
                        {[1, 2, 3, 4, 5].map(n => (
                            <button key={n} onClick={() => handleBid(n)}>{n}</button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="game-table">
                    <div className="opponents">
                        <div className="bot-tag">Bot 2</div>
                        <div className="horizontal-opps">
                            <div className="bot-tag">Bot 1</div>
                            <div className="trick-area">
                                {trick.map((t, i) => (
                                    <div key={i} className="played-card-small">
                                        {t.card.val}{t.card.suit}
                                    </div>
                                ))}
                            </div>
                            <div className="bot-tag">Bot 3</div>
                        </div>
                    </div>

                    <div className="player-hand">
                        {playerHand.map((card, i) => (
                            <button key={i} className="card premium" onClick={() => playCard(i)}>
                                <span className="card-val">{card.val}</span>
                                <span className="card-suit">{card.suit}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default playingcards;