import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Chess } from 'chess.js';

export const useChessLogic = (mode) => {
    const game = useMemo(() => new Chess(), []); // ensures the engine stays locked in place
    const [fen, setFen] = useState(game.fen());
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef(null);

    // 🕒 30s timer: automatically swipes the turn
    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(30);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    const moves = game.moves();
                    if (moves.length > 0) {
                        game.move(moves[Math.floor(Math.random() * moves.length)]);
                        setFen(game.fen());
                    }
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
    }, [game]);

    // ♟️ movement validation: fixes pieces in boxes instantly
    const onDrop = (source, target) => {
        try {
            const move = game.move({ from: source, to: target, promotion: 'q' });
            if (move === null) return false;

            setFen(game.fen()); // forces the soldier to snap into the box
            startTimer();
            return true;
        } catch (e) { return false; }
    };

    // 🤖 pro ai: reacts properly during its turn
    useEffect(() => {
        if (mode === 'ai' && game.turn() === 'b') {
            const aiDelay = setTimeout(() => {
                const moves = game.moves();
                if (moves.length > 0) {
                    game.move(moves[Math.floor(Math.random() * moves.length)]);
                    setFen(game.fen());
                    startTimer();
                }
            }, 1200);
            return () => clearTimeout(aiDelay);
        }
    }, [fen, mode, startTimer, game]);

    return { fen, onDrop, timeLeft, turn: game.turn() };
};