iimport React, { useState, useEffect } from 'react';
// Add this line right here:
import './DinoGame.css';

const JUNGLE_ANIMALS = [
// ... rest of the file ...
// We don't need to import CSS here because it's already loaded globally by App.jsx

const JUNGLE_ANIMALS = [
    { name: 'Lion', icon: '🦁' }, { name: 'Elephant', icon: '🐘' },
    { name: 'Giraffe', icon: '🦒' }, { name: 'Monkey', icon: '🐒' },
    { name: 'Zebra', icon: '🦓' }, { name: 'Parrot', icon: '🦜' },
    { name: 'Tiger', icon: '🐅' }, { name: 'Hippo', icon: '🦛' },
    { name: 'Gorilla', icon: '🦍' }, { name: 'Snake', icon: '🐍' },
    { name: 'Crocodile', icon: '🐊' }, { name: 'Leopard', icon: '🐆' },
];

// This component accepts two "props" (commands) from the main App:
// 1. onExit: What to do when the Home button is clicked.
// 2. onCorrectClick: What to do when the child gets it right (e.g., update global score).
function DinoGame({ onExit, onCorrectClick }) {
    const [targetAnimal, setTargetAnimal] = useState(null);
    const [jungleMap, setJungleMap] = useState([]);
    const [localMessage, setLocalMessage] = useState("Find the animal!");

    // Function to generate the map
    const refreshJungle = () => {
        const shuffled = [...JUNGLE_ANIMALS].sort(() => 0.5 - Math.random()).slice(0, 8);
        const mapWithPositions = shuffled.map((animal, index) => ({
            ...animal,
            top: Math.floor(Math.random() * 40) + 30 + "%",
            left: Math.floor(Math.random() * 80) + 5 + "%",
            rot: Math.floor(Math.random() * 20) - 10 + "deg",
            scale: Math.random() * 0.5 + 1.5,
            zIndex: Math.floor(Math.random() * 10)
        }));
        setJungleMap(mapWithPositions);
        setTargetAnimal(mapWithPositions[Math.floor(Math.random() * mapWithPositions.length)]);
        setLocalMessage("Find the animal!");
    };

    // Run this once when the game opens
    useEffect(() => {
        refreshJungle();
    }, []);

    const handleAnimalClick = (name) => {
        if (name === targetAnimal.name) {
            // Tell the main App they got it right
            onCorrectClick();
            setLocalMessage(`Yay! Found the ${name}!`);
            // Shuffle after a brief pause
            setTimeout(refreshJungle, 1000);
        } else {
            setLocalMessage(`Oops! That's a ${name}.`);
        }
    };

    return (
        <div className="game-overlay">
            {/* We call the passed down onExit function here */}
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            {/* === THE HYBRID REALITY JUNGLE === */}
            <div className="jungle-world-hybrid">
                <div className="jungle-layer layer-1"></div>
                <div className="jungle-layer layer-2"></div>

                <div className="target-banner-hybrid">
                    {targetAnimal ? <>Find the: <span>{targetAnimal.name}</span></> : "Loading..."}
                </div>

                {jungleMap.map((animal, i) => (
                    <div
                        key={i}
                        className="hybrid-animal-container"
                        style={{
                            top: animal.top, left: animal.left, zIndex: animal.zIndex,
                            transform: `rotate(${animal.rot}) scale(${animal.scale})`
                        }}
                        onClick={() => handleAnimalClick(animal.name)}
                    >
                        <div className="animal-3d-emoji">{animal.icon}</div>
                    </div>
                ))}

                {/* In-game message feedback */}
                <div style={{
                    position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                    background: 'white', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', zIndex: 200
                }}>
                    {localMessage}
                </div>

                <div className="jungle-guide-hybrid">🦖</div>
            </div>
        </div>
    );
}

export default DinoGame;