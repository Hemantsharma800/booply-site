import React, { useState } from 'react';
import './ailab.css';

const CATEGORIES = {
    ANIMALS: { name: 'Animals', items: ['🦁', '🐘', '🦒', '🐶'], color: '#FF7F50' },
    FOOD: { name: 'Yummy Food', items: ['🍎', '🍕', '🍦', '🍔'], color: '#4CAF50' }
};

function SmartSort({ onExit, onCorrectClick }) {
    const [step, setStep] = useState(1); // 1: Teach, 2: Thinking, 3: Guessing
    const [dataCount, setDataCount] = useState({ ANIMALS: 0, FOOD: 0 });
    const [testItem, setTestItem] = useState('');

    // Step 1: Child "Teaches" by clicking icons
    const teachBoop = (cat) => {
        setDataCount(prev => ({ ...prev, [cat]: prev[cat] + 1 }));
        if (dataCount.ANIMALS + dataCount.FOOD >= 4) {
            // After 5 clicks, Boop is "Smart" enough to try
            setStep(2);
            setTimeout(() => {
                const isAnimal = Math.random() > 0.5;
                setTestItem(isAnimal ? CATEGORIES.ANIMALS.items[0] : CATEGORIES.FOOD.items[0]);
                setStep(3);
            }, 2000);
        }
    };

    return (
        <div className="ai-lab">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            {step === 1 && (
                <div className="game-view">
                    <h2 className="ai-title">Help Boop Learn! 🧠</h2>
                    <p className="ai-hint">Tap the items to teach Boop what they are!</p>
                    <div className="train-zone">
                        <button className="teach-box" onClick={() => teachBoop('ANIMALS')}>
                            <span className="big-emoji">🦁</span>
                            <p>Animals ({dataCount.ANIMALS})</p>
                        </button>
                        <button className="teach-box food" onClick={() => teachBoop('FOOD')}>
                            <span className="big-emoji">🍕</span>
                            <p>Food ({dataCount.FOOD})</p>
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="game-view">
                    <div className="thinking-boop">🤔</div>
                    <h2>Boop is thinking...</h2>
                    <div className="loading-bar"><div className="fill"></div></div>
                </div>
            )}

            {step === 3 && (
                <div className="game-view">
                    <h2>Boop's Turn!</h2>
                    <div className="test-item">{testItem}</div>
                    <div className="ai-speech">
                        "I think this is {(testItem === '🦁') ? 'an ANIMAL' : 'FOOD'}!"
                    </div>
                    <button className="restart-btn" onClick={() => { setStep(1); setDataCount({ ANIMALS: 0, FOOD: 0 }); onCorrectClick(); }}>
                        You're Right! ⭐
                    </button>
                </div>
            )}
        </div>
    );
}

export default SmartSort;