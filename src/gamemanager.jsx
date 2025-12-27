import React, { Suspense, lazy } from 'react';
import './gamemanager.css';

// 📂 DYNAMIC IMPORTS SYNCED TO YOUR ACTUAL FILENAMES
const games = {
    'g1': lazy(() => import('./games/booplyblast')),
    'g2': lazy(() => import('./games/dinogame')),   // 🛠️ FIXED: Points to dinogame.jsx
    'g3': lazy(() => import('./games/ailab')),
    'g4': lazy(() => import('./games/fightergame')),
    'g5': lazy(() => import('./games/colourgame')),
    'g6': lazy(() => import('./games/geoexplorer')),
    'g7': lazy(() => import('./games/kitchenclass')),
    'g8': lazy(() => import('./games/nitrodash')),
    'g9': lazy(() => import('./games/puzzlepop')),
    'g10': lazy(() => import('./games/snakegame'))
};

const gamemanager = ({ activegameid, onexit, onscoreupdate }) => {
    const ActiveGame = games[activegameid];

    return (
        <div className="game-stage-fullscreen">
            <Suspense fallback={<div className="booply-loader">loading arcade engine...</div>}>
                {ActiveGame ? (
                    <ActiveGame
                        onExit={onexit}
                        onCorrectClick={() => onscoreupdate(5, 100)}
                    />
                ) : (
                    <div className="error-stage">
                        <h2>game not found</h2>
                        <button onClick={onexit}>back home</button>
                    </div>
                )}
            </Suspense>
        </div>
    );
};

export default gamemanager;