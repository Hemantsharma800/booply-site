import React, { useState, useEffect, useCallback } from 'react';
import './DinoGame.css';

// === THE MASSIVE ANIMAL DATABASE ORGANIZED BY LEVEL ===
const ANIMAL_LEVELS = {
    // Level 1: The Basics (Toddler Essentials)
    1: [
        { name: 'Lion', icon: '🦁' }, { name: 'Elephant', icon: '🐘' },
        { name: 'Monkey', icon: '🐒' }, { name: 'Giraffe', icon: '🦒' },
        { name: 'Zebra', icon: '🦓' }, { name: 'Cat', icon: '🐱' },
        { name: 'Dog', icon: '🐶' }
    ],
    // Level 2: Common Wild Animals
    2: [
        { name: 'Tiger', icon: '🐅' }, { name: 'Hippo', icon: '🦛' },
        { name: 'Snake', icon: '🐍' }, { name: 'Crocodile', icon: '🐊' },
        { name: 'Parrot', icon: '🦜' }, { name: 'Bear', icon: '🐻' },
        { name: 'Cow', icon: '🐄' }
    ],
    // Level 3: More Specific/Farm
    3: [
        { name: 'Gorilla', icon: '🦍' }, { name: 'Rhino', icon: '🦏' },
        { name: 'Leopard', icon: '🐆' }, { name: 'Wolf', icon: '🐺' },
        { name: 'Fox', icon: '🦊' }, { name: 'Pig', icon: '🐷' },
        { name: 'Sheep', icon: '🐑' }
    ],
    // Level 4: Advanced & Sea Creatures
    4: [
        { name: 'Kangaroo', icon: '🦘' }, { name: 'Koala', icon: '🐨' },
        { name: 'Panda', icon: '🐼' }, { name: 'Sloth', icon: '🦥' },
        { name: 'Whale', icon: '🐋' }, { name: 'Dolphin', icon: '🐬' },
        { name: 'Octopus', icon: '🐙' }
    ],
    // Level 5: The Masters (Exotic & Rare)
    5: [
        { name: 'Camel', icon: '🐪' }, { name: 'Llama', icon: '🦙' },
        { name: 'Hedgehog', icon: '🦔' }, { name: 'Bat', icon: '🦇' },
        { name: 'Owl', icon: '🦉' }, { name: 'Flamingo', icon: '🦩' },
        { name: 'Peacock', icon: '🦚' }
    ]
};

const MAX_LEVEL = 5;
const CORRECT_TO_LEVEL_UP = 5; // How many correct answers to level up

function DinoGame({ onExit, onCorrectClick }) {
    const [targetAnimal, setTargetAnimal] = useState(null);
    const [jungleMap, setJungleMap] = useState([]);
    const [localMessage, setLocalMessage] = useState("Find the animal!");

    // NEW STATES FOR LEVELS
    const [level, setLevel] = useState(1);
    const [correctCount, setCorrectCount] = useState(0);

    // Function to generate the map based on CURRENT LEVEL
    const refreshJungle = useCallback(() => {
        // 1. Gather animals available up to current level
        let availableAnimals = [];
        for (let i = 1; i <= level; i++) {
            availableAnimals = [...availableAnimals, ...ANIMAL_LEVELS[i]];
        }

        // 2. Shuffle and pick 8 to display
        const shuffled = availableAnimals.sort(() => 0.5 - Math.random()).slice(0, 8);

        // 3. Position them
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
    }, [level]); // Re-create function if level changes

    // Initial load & level change refresh
    useEffect(() => {
        refreshJungle();
    }, [refreshJungle]);


    const handleAnimalClick = (name) => {
        if (name === targetAnimal.name) {
            onCorrectClick(); // Update global score
            const newCount = correctCount + 1;
            setCorrectCount(newCount);

            // CHECK FOR LEVEL UP
            if (newCount % CORRECT_TO_LEVEL_UP === 0 && level < MAX_LEVEL) {
                setLevel(l => l + 1);
                setLocalMessage(`LEVEL UP! Welcome to Level ${level + 1}!`);
                // Longer pause for level up celebration
                setTimeout(refreshJungle, 2000);
            } else {
                // Normal correct answer
                setLocalMessage(`Yay! Found the ${name}!`);
                setTimeout(refreshJungle, 1000);
            }

        } else {
            setLocalMessage(`Oops! That's a ${name}.`);
        }
    };

    return (
        <div className="game-overlay">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            {/* === NEW LEVEL INDICATOR === */}
            <div className="level-badge">
                <span className="level-icon">🆙</span>
                <div className="level-text">
                    LEVEL {level}
                    <span className="level-progress">
                        (Next: {correctCount % CORRECT_TO_LEVEL_UP}/{CORRECT_TO_LEVEL_UP})
                    </span>
                </div>
            </div>

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

                {/* In-game message feedback box */}
                <div className="game-feedback-box">
                    {localMessage}
                </div>

                <div className="jungle-guide-hybrid">🦖</div>
            </div>
        </div>
    );
}

export default DinoGame;