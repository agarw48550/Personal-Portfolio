"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Matrix rain character set
const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

// Confetti particle component
const ConfettiParticle = ({ index, windowHeight }: { index: number; windowHeight: number }) => {
    const colors = ["#8B5CF6", "#06B6D4", "#EC4899", "#10B981", "#F59E0B", "#EF4444"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomX = Math.random() * 100;
    const randomDelay = Math.random() * 0.5;
    const randomDuration = 2 + Math.random() * 2;
    const randomRotation = Math.random() * 720 - 360;
    const randomSize = 8 + Math.random() * 8;

    return (
        <motion.div
            className="confetti-particle"
            style={{
                left: `${randomX}%`,
                width: randomSize,
                height: randomSize,
                backgroundColor: randomColor,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{
                y: windowHeight + 100,
                opacity: [1, 1, 0],
                rotate: randomRotation,
                x: Math.sin(index) * 100,
            }}
            transition={{
                duration: randomDuration,
                delay: randomDelay,
                ease: "linear",
            }}
        />
    );
};

// Matrix column component
const MatrixColumn = ({ index, totalColumns }: { index: number; totalColumns: number }) => {
    const chars = Array.from({ length: 20 }, () => 
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
    ).join("");
    
    const randomDelay = Math.random() * 2;
    const randomDuration = 3 + Math.random() * 3;
    const leftPosition = (index / totalColumns) * 100;

    return (
        <motion.div
            className="matrix-column"
            style={{
                left: `${leftPosition}%`,
                fontSize: `${10 + Math.random() * 6}px`,
            }}
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{
                duration: randomDuration,
                delay: randomDelay,
                ease: "linear",
                repeat: 1,
            }}
        >
            {chars}
        </motion.div>
    );
};

export default function KonamiCode() {
    const [mounted, setMounted] = useState(false);
    const [input, setInput] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [effectType, setEffectType] = useState<"confetti" | "matrix">("confetti");
    const [windowDimensions, setWindowDimensions] = useState({ width: 1920, height: 1080 });

    // Set mounted state and get window dimensions
    useEffect(() => {
        setMounted(true);
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    const triggerEasterEgg = useCallback(() => {
        // Alternate between confetti and matrix effects
        setEffectType(prev => prev === "confetti" ? "matrix" : "confetti");
        setShowSuccess(true);

        // Hide after animation
        setTimeout(() => setShowSuccess(false), 5000);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            setInput(prev => {
                const newInput = [...prev, e.key];
                if (newInput.length > KONAMI_CODE.length) {
                    newInput.shift();
                }
                
                // Check if code matches
                if (JSON.stringify(newInput) === JSON.stringify(KONAMI_CODE)) {
                    triggerEasterEgg();
                    return [];
                }
                
                return newInput;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mounted, triggerEasterEgg]);

    const columnCount = Math.floor(windowDimensions.width / 20) || 50;

    // Don't render until mounted
    if (!mounted) return null;

    return (
        <AnimatePresence>
            {showSuccess && (
                <>
                    {/* Confetti Effect */}
                    {effectType === "confetti" && (
                        <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
                            {Array.from({ length: 100 }).map((_, i) => (
                                <ConfettiParticle key={i} index={i} windowHeight={windowDimensions.height} />
                            ))}
                        </div>
                    )}

                    {/* Matrix Rain Effect */}
                    {effectType === "matrix" && (
                        <div className="matrix-rain">
                            {Array.from({ length: columnCount }).map((_, i) => (
                                <MatrixColumn key={i} index={i} totalColumns={columnCount} />
                            ))}
                        </div>
                    )}

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                        className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-black/80 text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-4 border-primary text-center backdrop-blur-lg max-w-[90%] sm:max-w-md">
                            <motion.h2 
                                className="text-2xl sm:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 0.5, repeat: 3 }}
                            >
                                {effectType === "matrix" ? "WAKE UP, NEO..." : "CHEAT CODE ACTIVATED!"}
                            </motion.h2>
                            <p className="text-lg sm:text-xl font-mono text-cyan-400">
                                {effectType === "matrix" 
                                    ? "The Matrix has you 🐇" 
                                    : "Unlimited Power Unlocked 🚀"}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400 mt-3">
                                Press the code again for a different effect!
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
