import React, { useState } from 'react';
import './ailab.css';

const TRAINING_DATA = {
    fruits: ['🍎', '🍌', '🍇', '🍓'],
    toys: ['🧸', '🚗', '🪁', '⚽']
};

function AILab({ onExit, onCorrectClick }) {
    const [brainPower, setBrainPower] = useState(0); // Training progress
    const [dataCount, setDataCount] = useState({ fruits: 0, toys: 0 });
    const [gameState, setGameState] = useState('collecting'); // 'collecting', 'training', 'testing'
    const [testItem, setTestItem] = useState(null);
    const [prediction, setPrediction] = useState("");

    // Step 1: Add Data
    const addData = (type) => {
        setDataCount(prev => ({ ...prev, [type]: prev[type] + 1 }));
        setBrainPower(prev => Math.min(prev + 10, 100));
    };

    // Step 2: Training Animation
    const startTraining = () => {
        setGameState('training');
        setTimeout(() => {
            setGameState('testing');
            generateTest();
        }, 3000);
    };

    // Step 3: AI Prediction
    const generateTest = () => {
        const isFruit = Math.random() > 0.5;
        const pool = isFruit ? TRAINING_DATA.fruits : TRAINING_DATA.toys;
        setTestItem(pool[Math.floor(Math.random() * pool.length)]);

        // Logic: AI "guesses" based on which bin has more data
        if (dataCount.fruits > dataCount.toys) setPrediction("I think it's a Fruit!");
        else if (dataCount.toys > dataCount.fruits) setPrediction("I think it's a Toy!");
        else setPrediction("I'm not sure yet...");
    };

    return (
        <div className="ai-lab-container">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            <div className="lab-header">
                <h1>Boop's AI Lab</h1>
                <div className="brain-meter">
                    <div className="brain-fill" style={{ width: `${brainPower}%` }}></div>
                    <span>Brain Training: {brainPower}%</span>
                </div>
            </div>

            {gameState === 'collecting' && (
                <div className="workflow-step">
                    <p className="instruction">Step 1: Feed Boop some Data!</p>
                    <div className="bin-row">
                        <div className="data-bin" onClick={() => addData('fruits')}>
                            <div className="bin-label">FRUITS</div>
                            <div className="bin-count">{dataCount.fruits} Items</div>
                        </div>
                        <div className="data-bin" onClick={() => addData('toys')}>
                            <div className="bin-label">TOYS</div>
                            <div className="bin-count">{dataCount.toys} Items</div>
                        </div>
                    </div>
                    {brainPower >= 50 && (
                        <button className="train-btn" onClick={startTraining}>Teach Boop! 🧠</button>
                    )}
                </div>
            )}

            {gameState === 'training' && (
                <div className="workflow-step training-mode">
                    <div className="ai-spinner">⚙️</div>
                    <h2>Boop is learning patterns...</h2>
                </div>
            )}

            {gameState === 'testing' && (
                <div className="workflow-step testing-mode">
                    <p className="instruction">Step 3: Can Boop recognize this?</p>
                    <div className="test-subject">{testItem}</div>
                    <div className="ai-bubble">{prediction}</div>
                    <button className="restart-btn" onClick={() => {
                        setGameState('collecting');
                        setBrainPower(0);
                        setDataCount({ fruits: 0, toys: 0 });
                        onCorrectClick(); // Reward for completing a workflow
                    }}>Teach Again! ✨</button>
                </div>
            )}
        </div>
    );
}

export default AILab;