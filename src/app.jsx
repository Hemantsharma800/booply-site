import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// 🏗️ Core Layout Components
import Home from './home';
import Legal from './legal';

// ♟️ Elite Modular Games (AI + Multiplayer)
import ChessGame from './chess';

// 🎮 All Integrated Arcade Titles
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

/**
 * 💰 ADSENSE AUTO-RELOADER
 * This small helper ensures that every time a player switches games,
 * the AdSense engine re-scans the page for new ad slots.
 */
const AdSenseProvider = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      // Force AdSense to push new ads when the route changes
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Silence errors if no ads are available for the current view
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      {/* 🛡️ Monitors route changes to maximize Ad Revenue */}
      <AdSenseProvider />

      <div className="app-monetized-wrapper" style={{ backgroundColor: '#050508', minHeight: '100vh' }}>
        <Routes>
          {/* 🏠 MAIN LOBBY: The high-traffic entry point */}
          <Route path="/" element={<Home />} />

          {/* 🛡️ COMPLIANCE HUB: Mandatory for Google AdSense Approval */}
          <Route path="/legal" element={<Legal />} />

          {/* ♟️ NEON CHESS: Standard & Unique Multiplayer Room Links */}
          <Route path="/chess" element={<ChessGame />} />
          <Route path="/chess/:roomId" element={<ChessGame />} />

          {/* 🎮 THE 11+ ELITE ARCADE GAMES */}
          {/* Each game route is preserved to match your sitemap.xml logic */}
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

          {/* 🔄 GLOBAL REDIRECT: Safety net for broken links */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;