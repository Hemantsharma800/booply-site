import React, { Suspense, lazy } from 'react';
import './gamemanager.css';

// 📂 DYNAMIC IMPORTS: Synced to your verified filenames
const games = {
    'g1': lazy(() => import('./games/booplyblast.jsx')),
    'g2': lazy(() => import('./games/dinogame.jsx')), // 🛠️ Replaces non-existent junglegame
    'g3': lazy(() => import('./games/ailab.jsx')),
    'g4': lazy(() => import('./games/fightergame.jsx')),
    'g5': lazy(() => import('./games/colourgame.jsx')),
    'g6': lazy(() => import('./games/geoexplorer.jsx')),
    'g7': lazy(() => import('./games/kitchenclass.jsx')),
    'g8': lazy(() => import('./games/nitrodash.jsx')),
    'g9': lazy(() => import('./games/puzzlepop.jsx')),
    'g10': lazy(() => import('./games/snakegame.jsx'))
};

const gamemanager = ({ activegameid, onexit, onscoreupdate }) => {
    const ActiveGame = games[activegameid];

    return (
        <div className="fullscreen-game-stage">
            <Suspense fallback={<div className="booply-loader">BOOTING ARCADE...</div>}>
                {ActiveGame ? (
                    <ActiveGame onExit={onexit} onCorrectClick={() => onscoreupdate(5)} />
                ) : (
                    <div className="error-screen">
                        <h2>GAME MODULE NOT FOUND</h2>
                        <button onClick={onexit}>BACK TO HOME</button>
                    </div>
                )}
            </Suspense>
        </div>
    );
};

export default gamemanager;