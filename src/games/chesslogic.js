import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Chess } from 'chess.js';

export const useChessLogic = (mode) => {
    const game = useMemo(() => new Chess(), []); //
    const [fen, setFen] = useState(game.fen());
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef(null);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(30);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleTimeout(); // Swipes turn automatically
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
    }, [game]);

    const handleTimeout = () => {
        const moves = game.moves();
        if (moves.length > 0) {
            const move = moves[Math.floor(Math.random() * moves.length)];
            game.move(move);
            setFen(game.fen());
        }
    };

    // ♟️ Position Fixing: Locks soldier in the new box instantly
    const onDrop = (source, target) => {
        try {
            const move = game.move({ from: source, to: target, promotion: 'q' });
            if (move === null) return false; // Snaps back if illegal move
            setFen(game.fen()); // LOCK POSITION
            startTimer();
            return true;
        } catch (e) { return false; }
    };

    // 🤖 AI Turn Logic: Reacts and plays during its turn
    useEffect(() => {
        if (mode === 'ai' && game.turn() === 'b' && !game.isGameOver()) {
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
    }, [fen, mode, game, startTimer]);

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [fen, startTimer]);

    return { fen, onDrop, timeLeft, turn: game.turn() };
};