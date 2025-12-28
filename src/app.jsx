import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// 🏗️ Core Layout Components
import Home from './home';
import Legal from './legal';

// ♟️ Elite Chess Module
import ChessGame from './chess';

// 🎮 All 11 Arcade Titles
// IMPORTANT: Ensure these files exist in your src/games/ folder
import PlayingCards from './games/playingcards';
import BooplyBlast from './games/booplyblast';
import NitroDash from './games/nitrodash';
import MathSurge from './games/mathsurge';
import LogicFlow from './games/logicflow';
import NumberCrunch from './games/numbercrunch';
import EquationEscape from './games/equationescape';
import FractalFun from './games/fractalfun';
import GeoGenius from './games/geogenius';
import PatternPro from './games/patternpro';
import AlgebraAce from './games/algebraace';

const AdSenseProvider = () => {
  const location = useLocation();
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense refresh error");
    }
  }, [location]);
  return null;
};

function App() {
  return (
    <Router>
      <AdSenseProvider />
      <div className="app-monetized-wrapper" style={{ backgroundColor: '#050508', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/chess" element={<ChessGame />} />
          <Route path="/chess/:roomId" element={<ChessGame />} />
          <Route path="/playing-cards" element={<PlayingCards />} />
          <Route path="/booply-blast" element={<BooplyBlast />} />
          <Route path="/nitro-dash" element={<NitroDash />} />
          <Route path="/math-surge" element={<MathSurge />} />
          <Route path="/logic-flow" element={<LogicFlow />} />
          <Route path="/number-crunch" element={<NumberCrunch />} />
          <Route path="/equation-escape" element={<EquationEscape />} />
          <Route path="/fractal-fun" element={<FractalFun />} />
          <Route path="/geo-genius" element={<GeoGenius />} />
          <Route path="/pattern-pro" element={<PatternPro />} />
          <Route path="/algebra-ace" element={<AlgebraAce />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;