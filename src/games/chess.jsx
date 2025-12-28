import React, { useState, useCallback, useMemo } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './chess.css';

function ChessGame() {
    // 1. Create a memoized game instance so it doesn't reset on re-renders
    const game = useMemo(() => new Chess(), []);
    const [fen, setFen] = useState(game.fen()); //

    // 2. The function that "hooks up" the piece to the new location
    const makeAMove = useCallback((move) => {
        try {
            const result = game.move(move); // ♟️ Engine validates the move
            if (result) {
                setFen(game.fen()); // 🔒 State lock: ensures the soldier stays put
                return true;
            }
        } catch (e) {
            return null;
        }
        return null;
    }, [game]);

    // 3. The trigger that stops the 'snapback'
    function onDrop(sourceSquare, targetSquare) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q', // Default promotion to queen
        });

        // If move is null, it snaps back; if true, it stays fixed
        return move !== null;
    }

    return (
        <div className="neon-table-container">
            <div className="board-frame">
                <Chessboard
                    position={fen} // Always follows the 'locked' state
                    onPieceDrop={onDrop}
                    boardOrientation="white"
                    // Custom styles to make it look like an elite table
                    customDarkSquareStyle={{ backgroundColor: '#0a0a1a' }}
                    customLightSquareStyle={{ backgroundColor: '#1a1a4e' }}
                />
            </div>
        </div>
    );
}

export default ChessGame;