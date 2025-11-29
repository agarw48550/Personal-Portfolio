"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

export default function KonamiCode() {
    const [input, setInput] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const newInput = [...input, e.key];
            if (newInput.length > KONAMI_CODE.length) {
                newInput.shift();
            }
            setInput(newInput);

            if (JSON.stringify(newInput) === JSON.stringify(KONAMI_CODE)) {
                triggerEasterEgg();
                setInput([]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [input]);

    const triggerEasterEgg = () => {
        setShowSuccess(true);
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        setTimeout(() => setShowSuccess(false), 5000);
    };

    return (
        <AnimatePresence>
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                >
                    <div className="bg-black/80 text-white p-8 rounded-3xl border-4 border-primary text-center backdrop-blur-lg">
                        <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                            CHEAT CODE ACTIVATED!
                        </h2>
                        <p className="text-xl font-mono text-cyan-400">
                            Unlimited Power Unlocked 🚀
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
