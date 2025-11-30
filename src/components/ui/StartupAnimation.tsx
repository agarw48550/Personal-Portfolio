'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StartupAnimationProps {
    onComplete: () => void;
}

export default function StartupAnimation({ onComplete }: StartupAnimationProps) {
    const [phase, setPhase] = useState<'welcome' | 'matrix' | 'loading' | 'complete'>('welcome');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationIdRef = useRef<number | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Matrix effect using simpler approach
    useEffect(() => {
        if (phase !== 'matrix') return;

        // Small delay to ensure canvas is mounted
        const startDelay = setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) {
                console.error('Canvas not found');
                return;
            }

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error('Could not get canvas context');
                return;
            }

            // Set canvas size in pixels (not CSS)
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);

            // Fill initial black background
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            // Matrix characters
            const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
            const fontSize = 14;
            const columns = Math.floor(window.innerWidth / fontSize);
            
            // Initialize drops - start them at random positions
            const drops: number[] = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * (window.innerHeight / fontSize));
            }

            const draw = () => {
                // Semi-transparent black overlay for trail effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

                ctx.font = `${fontSize}px monospace`;

                for (let i = 0; i < drops.length; i++) {
                    // Random character
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    
                    // Draw character position
                    const x = i * fontSize;
                    const y = drops[i] * fontSize;
                    
                    // Bright white/green head character
                    ctx.fillStyle = '#fff';
                    ctx.fillText(char, x, y);
                    
                    // Slightly dimmer character above (trail effect)
                    ctx.fillStyle = '#0f0';
                    const trailChar = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(trailChar, x, y - fontSize);

                    // Move drop down
                    drops[i]++;

                    // Reset drop when it goes off screen (with randomness)
                    if (drops[i] * fontSize > window.innerHeight) {
                        if (Math.random() > 0.95) {
                            drops[i] = 0;
                        }
                    }
                }

                animationIdRef.current = requestAnimationFrame(draw);
            };

            // Start animation
            draw();
        }, 50);

        // Transition to loading after 2.5 seconds
        const transitionTimer = setTimeout(() => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            setPhase('loading');
        }, 2500);

        return () => {
            clearTimeout(startDelay);
            clearTimeout(transitionTimer);
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        };
    }, [phase]);

    // Loading progress effect
    useEffect(() => {
        if (phase !== 'loading') return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20 + 10;
            if (progress >= 100) {
                progress = 100;
                setLoadingProgress(100);
                clearInterval(interval);
                setTimeout(() => {
                    setPhase('complete');
                    setTimeout(onComplete, 400);
                }, 300);
            } else {
                setLoadingProgress(progress);
            }
        }, 80);

        return () => clearInterval(interval);
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
                    className="fixed inset-0 z-[9999] bg-black overflow-hidden"
                >
                    {/* Canvas for matrix effect */}
                    <canvas
                        ref={canvasRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: '#000',
                        }}
                    />
                    
                    {/* CSS Fallback - Animated matrix columns */}
                    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-green-500 font-mono text-xs whitespace-pre animate-matrix-fall"
                                style={{
                                    left: `${(i * 3.33)}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${2 + Math.random() * 3}s`,
                                }}
                            >
                                {Array.from({ length: 30 }).map(() => 
                                    String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
                                ).join('\n')}
                            </div>
                        ))}
                    </div>
                    
                    {/* Center text overlay */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ zIndex: 10 }}
                    >
                        <div className="text-center bg-black/50 p-8 rounded-lg backdrop-blur-sm">
                            <motion.h2
                                className="text-4xl md:text-6xl font-bold text-green-400 font-mono mb-4"
                                style={{ textShadow: '0 0 30px #00ff00, 0 0 60px #00ff00' }}
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
