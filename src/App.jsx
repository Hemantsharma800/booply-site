import React, { useState, useEffect } from 'react';
import './App.css';

// 1. REALISTIC ANIMAL DATA (Using transparent PNG images)
const JUNGLE_ANIMALS = [
  { name: 'Lion', img: 'https://purepng.com/public/uploads/large/purepng.com-lionlionferal-animal-cat-leolions-1701527845068n746r.png' },
  { name: 'Elephant', img: 'https://purepng.com/public/uploads/large/purepng.com-elephantelephantlarge-mammalsplant-eating-animalslong-trunkears-1701527582725ngy8f.png' },
  { name: 'Giraffe', img: 'https://purepng.com/public/uploads/large/purepng.com-giraffegiraffetallest-living-terrestrial-animalmammalartiodactyl-17015276823113z05x.png' },
  { name: 'Monkey', img: 'https://purepng.com/public/uploads/large/purepng.com-monkeymonkeyprimatecercopithecidae-170152789793921t0z.png' },
  { name: 'Zebra', img: 'https://purepng.com/public/uploads/large/purepng.com-zebrazebraafrican-equidsdistinctive-black-and-white-striped-coats-1701528163047k016v.png' },
  { name: 'Macaw Parrot', img: 'https://purepng.com/public/uploads/large/purepng.com-macaw-parrotmacaw-parrotbirdcolorful-1701527862151n7gq5.png' },
  { name: 'Tiger', img: 'https://purepng.com/public/uploads/large/purepng.com-tigertigercatwild-catstripe-1701528097823e8391.png' },
  { name: 'Hippo', img: 'https://purepng.com/public/uploads/large/purepng.com-hippopotamushippopotamushippolarge-semiaquatic-mammalsub-saharan-africa-1701527729047s424c.png' },
  { name: 'Gorilla', img: 'https://purepng.com/public/uploads/large/purepng.com-gorillagorillagreat-apesherbivorous-ground-dwelling-170152768951397z8t.png' },
  { name: 'Snake', img: 'https://purepng.com/public/uploads/large/purepng.com-snakesnakeanimalreptileelongatedlegless-carnivorous-reptiles-17015280684687o36h.png' },
  { name: 'Toucan', img: 'https://purepng.com/public/uploads/large/purepng.com-toucantoucanramphastidaebrightly-marked-passerine-birds-17015281251589i1g1.png' },
  { name: 'Crocodile', img: 'https://purepng.com/public/uploads/large/purepng.com-crocodilecrocodilelarge-aquatic-reptilescarnivorous-reptile-1701527528708d9z7k.png' },
];

function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [targetAnimal, setTargetAnimal] = useState(null);
  const [jungleMap, setJungleMap] = useState([]);
  const [score, setScore] = useState(0);
  const [mascotText, setMascotText] = useState("Hi! I'm Boop!");

  const games = [
    { id: 1, name: 'Puzzle Pop', color: '#FFD700', icon: '🧩', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
    { id: 2, name: 'Dino Jungle', color: '#FF6347', icon: '🦖', type: 'internal' },
    { id: 3, name: 'Color Fun', color: '#1E90FF', icon: '🎨', url: 'https://kleki.com/' },
    { id: 4, name: 'Music Box', color: '#32CD32', icon: '🎵', url: 'https://pianu.com/' },
    { id: 5, name: 'Space Trip', color: '#9370DB', icon: '🚀', url: 'https://playcanv.as/p/2OFE7j9V/' },
  ];

  // Generate a realistic jungle layout
  const refreshJungle = () => {
    // Pick 8 random animals from the list of 12 so it's different every time
    const shuffled = [...JUNGLE_ANIMALS].sort(() => 0.5 - Math.random()).slice(0, 8);

    const mapWithPositions = shuffled.map((animal, index) => ({
      ...animal,
      // Ensure they don't overlap too much by dividing the screen
      top: Math.floor(Math.random() * 50) + 25 + "%", // Keep them in the middle band
      left: Math.floor(Math.random() * 80) + 5 + "%",
      // Add slight random rotation for realism
      rot: Math.floor(Math.random() * 20) - 10 + "deg",
      // Vary the size slightly for depth perspective
      scale: Math.random() * 0.4 + 0.8
    }));
    setJungleMap(mapWithPositions);
    setTargetAnimal(mapWithPositions[Math.floor(Math.random() * mapWithPositions.length)]);
  };

  const handleOpenGame = (game) => {
    if (game.type === 'internal') refreshJungle();
    setActiveGame(game);
  };

  const handleAnimalClick = (name) => {
    if (name === targetAnimal.name) {
      setScore(s => s + 1);
      setMascotText(`Yay! You found the ${name}!`);
      refreshJungle();
    } else {
      setMascotText(`Boop! That's a realistic ${name}. Look for the ${targetAnimal.name}!`);
    }
  };

  return (
    <div className="booply-container">
      {!activeGame ? (
        <>
          <header className="header-section">
            <h1 className="logo">Booply</h1>
            <div className="score-board">Stars earned: {score} ⭐</div>
          </header>
          <main className="lobby-grid">
            {games.map(game => (
              <button key={game.id} className="game-bubble" style={{ backgroundColor: game.color }} onClick={() => handleOpenGame(game)}>
                <span className="game-icon">{game.icon}</span>
                <span className="game-name">{game.name}</span>
              </button>
            ))}
          </main>
        </>
      ) : (
        <div className="game-overlay">
          <button className="back-btn" onClick={() => setActiveGame(null)}>🏠 Home</button>

          {activeGame.type === 'internal' ? (
            // REALISTIC JUNGLE WORLD
            <div className="jungle-world-realistic">
              <div className="target-banner-realistic">
                Can you spot the real: <span>{targetAnimal?.name}</span>?
              </div>

              {jungleMap.map((animal, i) => (
                <div
                  key={i}
                  className="realistic-animal-container"
                  style={{
                    top: animal.top,
                    left: animal.left,
                    transform: `rotate(${animal.rot}) scale(${animal.scale})`
                  }}
                  onClick={() => handleAnimalClick(animal.name)}
                >
                  {/* Using IMG tag instead of emoji */}
                  <img src={animal.img} alt={animal.name} className="animal-photo" />
                </div>
              ))}
              {/* Using a cute cartoon dino image for the guide */}
              <img src="https://cdn-icons-png.flaticon.com/512/3407/3407241.png" className="jungle-guide-realistic" alt="Dino Guide" />
            </div>
          ) : (
            <iframe src={activeGame.url} className="game-frame" title={activeGame.name} />
          )}
        </div>
      )}
      <div className="mascot-area">
        <div className="speech-bubble">{mascotText}</div>
        <div className="boop-avatar">👀</div>
      </div>
    </div>
  );
}

export default App;