import React, { useState } from 'react';
import './kitchenclass.css';

const RECIPES = [
    { name: 'Yummy Pizza', goal: '🍕', ingredients: ['🍅', '🧀', '🍞'], color: '#FF5722' },
    { name: 'Sweet Cake', goal: '🎂', ingredients: ['🥚', '🥛', '🍰'], color: '#E91E63' },
    { name: 'Fresh Salad', goal: '🥗', ingredients: ['🥬', '🥕', '🌽'], color: '#4CAF50' }
];

const ALL_INGREDIENTS = ['🍅', '🧀', '🍞', '🥚', '🥛', '🍰', '🥬', '🥕', '🌽', '🍫', '🍎'];

function KitchenClass({ onExit, onCorrectClick }) {
    const [recipeIdx, setRecipeIdx] = useState(0);
    const [selected, setSelected] = useState([]);
    const [status, setStatus] = useState('cooking'); // 'cooking' or 'served'

    const currentRecipe = RECIPES[recipeIdx];

    const handlePick = (item) => {
        if (status === 'served' || selected.includes(item)) return;

        const newSelected = [...selected, item];
        setSelected(newSelected);

        if (newSelected.length === 3) {
            const isCorrect = currentRecipe.ingredients.every(ing => newSelected.includes(ing));
            if (isCorrect) {
                setStatus('served');
                onCorrectClick();
            } else {
                setTimeout(() => setSelected([]), 1000); // Reset if wrong
            }
        }
    };

    const nextDish = () => {
        setRecipeIdx((prev) => (prev + 1) % RECIPES.length);
        setSelected([]);
        setStatus('cooking');
    };

    return (
        <div className="kitchen-scene">
            <button className="back-btn" onClick={onExit}>🏠 Home</button>

            <div className="recipe-card" style={{ borderColor: currentRecipe.color }}>
                <h2>Let's Make: {currentRecipe.name} {currentRecipe.goal}</h2>
                <div className="needs">
                    {currentRecipe.ingredients.map(ing => (
                        <span key={ing} className={selected.includes(ing) ? 'found' : ''}>?</span>
                    ))}
                </div>
            </div>

            <div className="pot-area">
                <div className={`large-pot ${status === 'served' ? 'finished' : ''}`}>
                    {status === 'served' ? currentRecipe.goal : '🥣'}
                </div>
            </div>

            <div className="pantry-grid">
                {ALL_INGREDIENTS.map(item => (
                    <button
                        key={item}
                        className={`ingredient-btn ${selected.includes(item) ? 'active' : ''}`}
                        onClick={() => handlePick(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {status === 'served' && (
                <button className="next-recipe-btn" onClick={nextDish}>Cook Next Dish! ✨</button>
            )}
        </div>
    );
}

export default KitchenClass;