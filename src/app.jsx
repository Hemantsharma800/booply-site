import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import Home from './home';
import Legal from './legal';

// Existing Games (Paths from /src/games/)
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

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#050508', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<Legal />} />

          {/* Routes matching existing files */}
          <Route path="/chess" element={<ChessGame />} />
          <Route path="/chess/:roomId" element={<ChessGame />} />
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

          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;