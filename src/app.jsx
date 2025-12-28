import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// 🏗️ Core Layout Components (from /src)
import Home from './home';
import Legal from './legal';
import MainEntry from './main'; // Added to ensure main entry point is recognized

// 🎮 All Arcade Games (from /src/games/)
import ChessGame from './games/chess';
import BooplyBlast from './games/booplyblast';
import ColourGame from './games/colourgame';
import DinoGame from './games/dinogame';
import FighterGame from './games/fightergame';
import GeoExplorer from './games/geoexplorer';
import KitchenClass from './games/kitchenclass';
import NitroDash from './games/nitrodash';
import PlayingCards from './games/playingcards';
import PuzzlePop from './games/puzzlepop';
import SnakeGame from './games/snakegame';

// 💰 AdSense Refresh logic
const AdSenseProvider = () => {
  const location = useLocation();
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.log("AdSense waiting for content...");
    }
  }, [location]);
  return null;
};

function App() {
  return (
    <Router>
      <AdSenseProvider />
      <div className="app-main-container" style={{ backgroundColor: '#050508', minHeight: '100vh' }}>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<Legal />} />

          {/* ♟️ Chess (Moved to /games/ path) */}
          <Route path="/chess" element={<ChessGame />} />
          <Route path="/chess/:roomId" element={<ChessGame />} />

          {/* 🎮 All Other Games */}
          <Route path="/booply-blast" element={<BooplyBlast />} />
          <Route path="/colour-game" element={<ColourGame />} />
          <Route path="/dino-game" element={<DinoGame />} />
          <Route path="/fighter-game" element={<FighterGame />} />
          <Route path="/geo-explorer" element={<GeoExplorer />} />
          <Route path="/kitchen-class" element={<KitchenClass />} />
          <Route path="/nitro-dash" element={<NitroDash />} />
          <Route path="/playing-cards" element={<PlayingCards />} />
          <Route path="/puzzle-pop" element={<PuzzlePop />} />
          <Route path="/snake-game" element={<SnakeGame />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;