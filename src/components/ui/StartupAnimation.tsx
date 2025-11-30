'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StartupAnimationProps {
    onComplete: () => void;
}

// Matrix rain character
interface MatrixChar {
    x: number;
    y: number;
    char: string;
    speed: number;
    opacity: number;
}

export default function StartupAnimation({ onComplete }: StartupAnimationProps) {
    const [phase, setPhase] = useState<'welcome' | 'matrix' | 'loading' | 'complete'>('welcome');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const matrixCharsRef = useRef<MatrixChar[]>([]);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Matrix animation
    const initMatrix = useCallback((canvas: HTMLCanvasElement) => {
        const chars: MatrixChar[] = [];
        const columns = Math.floor(canvas.width / 20);
        
        for (let i = 0; i < columns; i++) {
            chars.push({
                x: i * 20,
                y: Math.random() * canvas.height - canvas.height,
                char: String.fromCharCode(0x30A0 + Math.random() * 96),
                speed: 2 + Math.random() * 8,
                opacity: 0.5 + Math.random() * 0.5,
            });
        }
        
        matrixCharsRef.current = chars;
    }, []);

    const drawMatrix = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        // Semi-transparent black for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '16px monospace';

        matrixCharsRef.current.forEach((char, i) => {
            // Green gradient based on position
            const gradient = ctx.createLinearGradient(char.x, char.y - 100, char.x, char.y);
            gradient.addColorStop(0, 'rgba(0, 255, 65, 0)');
            gradient.addColorStop(0.8, `rgba(0, 255, 65, ${char.opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(180, 255, 180, ${char.opacity})`);
            
            ctx.fillStyle = gradient;
            
            // Draw trail
            for (let j = 0; j < 20; j++) {
                const trailY = char.y - j * 20;
                const trailOpacity = 1 - (j / 20);
                ctx.globalAlpha = trailOpacity * char.opacity;
                ctx.fillText(
                    String.fromCharCode(0x30A0 + Math.random() * 96),
                    char.x,
                    trailY
                );
            }
            
            ctx.globalAlpha = 1;

            // Update position
            char.y += char.speed;

            // Reset if off screen
            if (char.y > canvas.height + 200) {
                char.y = -100;
                char.speed = 2 + Math.random() * 8;
            }

            // Randomly change character
            if (Math.random() > 0.98) {
                char.char = String.fromCharCode(0x30A0 + Math.random() * 96);
            }
        });
    }, []);

    const animateMatrix = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        drawMatrix(ctx, canvas);
        animationRef.current = requestAnimationFrame(animateMatrix);
    }, [drawMatrix]);

    useEffect(() => {
        if (phase === 'matrix') {
            const canvas = canvasRef.current;
            if (!canvas) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            initMatrix(canvas);
            animateMatrix();

            // Transition to loading after matrix animation
            const timer = setTimeout(() => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
                setPhase('loading');
            }, 3000);

            return () => {
                clearTimeout(timer);
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }
    }, [phase, initMatrix, animateMatrix]);

    useEffect(() => {
        if (phase === 'loading') {
            const interval = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            setPhase('complete');
                            setTimeout(onComplete, 500);
                        }, 300);
                        return 100;
                    }
                    return prev + Math.random() * 15 + 5;
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [phase, onComplete]);

    const handleBeginClick = () => {
        setPhase('matrix');
    };

    return (
        <AnimatePresence mode="wait">
            {phase === 'welcome' && (
                <motion.div
                    key="welcome"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
                >
                    {/* Subtle background glow */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px]" />
                    </div>

                    {/* Welcome text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-center mb-12 relative z-10"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                                AyaanOS
                            </span>
                        </h1>
                        <p className="text-gray-500 text-lg font-mono">v2.0.0</p>
                    </motion.div>

                    {/* Begin Button - Neumorphic style */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        onClick={handleBeginClick}
                        className="relative group"
                    >
                        <div
                            className="relative px-12 py-5 rounded-full overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, rgb(60, 60, 60) 0%, rgb(40, 40, 40) 50%, rgb(30, 30, 30) 100%)',
                                boxShadow: `
                                    0 0 0 1px rgba(255,255,255,0.1),
                                    0 2px 4px rgba(0,0,0,0.3),
                                    0 4px 8px rgba(0,0,0,0.3),
                                    0 8px 16px rgba(0,0,0,0.3),
                                    inset 0 1px 0 rgba(255,255,255,0.1),
                                    inset 0 -1px 0 rgba(0,0,0,0.3)
                                `,
                            }}
                        >
                            {/* Glowing border on hover */}
                            <motion.div
                                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(0,255,100,0.3), transparent)',
                                    filter: 'blur(4px)',
                                }}
                                animate={{
                                    backgroundPosition: ['200% 0', '-200% 0'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />
                            
                            <span className="relative z-10 text-xl font-semibold tracking-wide text-gray-200 group-hover:text-green-400 transition-colors">
                                Begin?
                            </span>
                        </div>

                        {/* Outer glow on hover */}
                        <motion.div
                            className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: 'radial-gradient(ellipse at center, rgba(0,255,100,0.15) 0%, transparent 70%)',
                                filter: 'blur(8px)',
                            }}
                        />
                    </motion.button>

                    {/* Hint text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 1.2 }}
                        className="mt-8 text-sm text-gray-600 font-mono"
                    >
                        Click to initialize system
                    </motion.p>
                </motion.div>
            )}

            {phase === 'matrix' && (
                <motion.div
                    key="matrix"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black"
                >
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full"
                    />
                    
                    {/* Center text overlay */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="text-center">
                            <motion.h2
                                className="text-4xl md:text-6xl font-bold text-green-400 font-mono mb-4"
                                animate={{ textShadow: ['0 0 20px #00ff00', '0 0 40px #00ff00', '0 0 20px #00ff00'] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                INITIALIZING
                            </motion.h2>
                            <p className="text-green-500/70 font-mono text-sm tracking-widest">
                                SYSTEM BOOT SEQUENCE
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {phase === 'loading' && (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        {/* Logo */}
                        <motion.div
                            className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center"
                            animate={{ 
                                boxShadow: [
                                    '0 0 20px rgba(0,255,100,0.3)',
                                    '0 0 40px rgba(0,255,100,0.5)',
                                    '0 0 20px rgba(0,255,100,0.3)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-4xl font-bold text-black">A</span>
                        </motion.div>

                        <h2 className="text-2xl font-bold text-white mb-2">AyaanOS</h2>
                        <p className="text-gray-500 font-mono text-sm mb-8">Loading system components...</p>

                        {/* Progress bar */}
                        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
                            <motion.div
                                className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>
                        
                        <p className="mt-4 text-gray-600 font-mono text-xs">
                            {Math.min(Math.round(loadingProgress), 100)}%
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
