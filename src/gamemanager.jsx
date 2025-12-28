import React, { Suspense, lazy } from 'react';
import './gamemanager.css';

const games = {
    'g1': lazy(() => import('./games/booplyblast.jsx')),
    'g2': lazy(() => import('./games/dinogame.jsx')),
    'g3': lazy(() => import('./games/ailab.jsx')),
    'g4': lazy(() => import('./games/fightergame.jsx')),
    'g5': lazy(() => import('./games/colourgame.jsx')),
    'g6': lazy(() => import('./games/geoexplorer.jsx')),
    'g7': lazy(() => import('./games/kitchenclass.jsx')),
    'g8': lazy(() => import('./games/nitrodash.jsx')),
    'g9': lazy(() => import('./games/puzzlepop.jsx')),
    'g10': lazy(() => import('./games/snakegame.jsx'))
    'g11': lazy(() => import('./games/playingcards.jsx'))
};

const gamemanager = ({ activegameid, onexit, onscoreupdate }) => {
    const ActiveGame = games[activegameid];
    return (
        <div className="fullscreen-stage" style={{ background: '#000', minHeight: '100vh' }}>
            <Suspense fallback={<h2 style={{ color: '#00f2ff', padding: '50px' }}>BOOTING ARCADE...</h2>}>
                {ActiveGame ? <ActiveGame onExit={onexit} onCorrectClick={() => onscoreupdate(5)} /> : <h2>Error</h2>}
            </Suspense>
        </div>
    );
};

export default gamemanager;