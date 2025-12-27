import React, { Suspense, lazy } from 'react';
import './gamemanager.css';

// 📂 DYNAMIC IMPORTS: Synced exactly to your games folder
const games = {
    'g1': lazy(() => import('./games/booplyblast.jsx')),
    'g2': lazy(() => import('./games/dinogame.jsx')), // 🛠️ Corrected: points to your verified file
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
        <div className="game-stage-fullscreen">
            <Suspense fallback={<div className="booply-loader">loading arcade...</div>}>
                {ActiveGame ? (
                    <ActiveGame
                        onExit={onexit}
                        onCorrectClick={() => onscoreupdate(5, 100)}
                    />
                ) : (
                    <div className="error-stage">
                        <h2>game module not found</h2>
                        <button onClick={onexit}>back home</button>
                    </div>
                )}
            </Suspense>
        </div>
    );
};

export default gamemanager;