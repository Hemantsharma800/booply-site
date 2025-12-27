import React, { Suspense } from 'react';
import './gamemanager.css';

// import game engines
import booplyblast from './games/booplyblast.jsx';
import safaristudy from './games/junglegame.jsx'; // identification mode
import safaridash from './games/dinogame.jsx';   // runner mode

const placeholder = ({ onexit }) => (
    <div className="placeholder-stage">
        <h2>game engine initializing...</h2>
        <button className="btn-exit" onClick={onexit}>back to home</button>
    </div>
);

const game_registry = {
    'g1': booplyblast, 'g2': safaristudy, 'g3': safaridash,
    'g4': placeholder, 'g5': placeholder, 'g6': placeholder,
    'g7': placeholder, 'g8': placeholder, 'g9': placeholder, 'g10': placeholder
};

const gamemanager = ({ activegameid, onexit, onscoreupdate }) => {
    const ActiveGame = game_registry[activegameid] || placeholder;

    return (
        <div className="fullscreen-stage">
            <Suspense fallback={<div className="booply-loader">engine loading...</div>}>
                <ActiveGame
                    onExit={onexit}
                    onCorrectClick={() => onscoreupdate(5, 100)}
                />
            </Suspense>
        </div>
    );
};

export default gamemanager;