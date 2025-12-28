import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Chess } from 'chess.js';

export const useChessLogic = (mode) => {
    const game = useMemo(() => new Chess(), []);
    const [fen, setFen] = useState(game.fen());
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef(null);

    // 🕒 dual 30s timer logic
    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(30);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    autoMove(); // force turn swipe on timeout
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
    }, [game]);

    const autoMove = useCallback(() => {
        const moves = game.moves();
        if (moves.length > 0) {
            game.move(moves[Math.floor(Math.random() * moves.length)]);
            setFen(game.fen());
            startTimer();
        }
    }, [game, startTimer]);

    // ♟️ onpieceplay: fixes pieces into column boxes instantly
    const onDrop = (source, target) => {
        try {
            const move = game.move({ from: source, to: target, promotion: 'q' });
            if (move === null) return false; // snapping back for illegal moves

            setFen(game.fen()); // updates board to fix piece in the new box
            startTimer();
            return true;
        } catch (e) { return false; }
    };

    // 🤖 enhanced ai: reacts properly during its turn
    useEffect(() => {
        if (mode === 'ai' && game.turn() === 'b' && !game.isGameOver()) {
            const aiDelay = setTimeout(autoMove, 1200);
            return () => clearTimeout(aiDelay);
        }
    }, [fen, mode, autoMove, game]);

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [fen, startTimer]);

    return { fen, onDrop, timeLeft, turn: game.turn() };
};