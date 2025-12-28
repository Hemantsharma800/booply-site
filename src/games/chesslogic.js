import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Chess } from 'chess.js';

export const useChessLogic = (mode) => {
    const game = useMemo(() => new Chess(), []);
    const [fen, setFen] = useState(game.fen());
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef(null);

    // 🕒 dual 30s timer: swipes turn if time runs out
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

    // ♟️ movement validation: keeps pieces in place
    const onDrop = (source, target) => {
        try {
            const move = game.move({ from: source, to: target, promotion: 'q' });
            if (move === null) return false;
            setFen(game.fen());
            startTimer();
            return true;
        } catch (e) { return false; }
    };

    // 🤖 ai opponent: responds within 30s window
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

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [fen, startTimer]);

    return { fen, onDrop, timeLeft, turn: game.turn() };
};