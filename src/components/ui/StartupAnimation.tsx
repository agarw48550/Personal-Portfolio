'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StartupAnimationProps {
    onComplete: () => void;
}

export default function StartupAnimation({ onComplete }: StartupAnimationProps) {
    const [phase, setPhase] = useState<'welcome' | 'matrix' | 'complete'>('welcome');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationIdRef = useRef<number | null>(null);

    const runMatrix = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);

        // Initial black fill
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        const chars = 'アイウエオカキクケコサシスセソタチツテト01234789';
        const fontSize = 14;
        const columns = Math.floor(window.innerWidth / fontSize);
        
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -50;
        }

        const draw = () => {
            // Trail effect
            ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                // Bright head
                ctx.fillStyle = '#ffffff';
                ctx.fillText(char, x, y);
                
                // Cyan trail
                ctx.fillStyle = '#22d3ee';
                ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);
                ctx.fillStyle = 'rgba(34, 211, 238, 0.6)';
                ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize * 2);
                ctx.fillStyle = 'rgba(34, 211, 238, 0.3)';
                ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize * 3);

                // Speed
                drops[i] += 1.2;

                // Reset
                if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.95) {
                    drops[i] = 0;
                }
            }

            animationIdRef.current = requestAnimationFrame(draw);
        };

        draw();
    }, []);

    useEffect(() => {
        if (phase !== 'matrix') return;

        // Start matrix immediately
        runMatrix();

        // Complete after 1.5s
        const timer = setTimeout(() => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            setPhase('complete');
            setTimeout(onComplete, 300);
        }, 1500);

        return () => {
            clearTimeout(timer);
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        };
    }, [phase, onComplete, runMatrix]);

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
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] bg-[#0a0a0f] flex flex-col items-center justify-center px-6"
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="text-center mb-10 relative z-10"
                    >
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                            Welcome to{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                                AyaanOS
                            </span>
                        </h1>
                        <p className="text-cyan-500/50 text-sm font-mono">v2.0</p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        onClick={handleBeginClick}
                        className="relative group"
                    >
                        <div
                            className="relative px-10 py-4 sm:px-14 sm:py-5 rounded-2xl overflow-hidden backdrop-blur-xl border border-cyan-500/20"
                            style={{
                                background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.05) 100%)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.2), transparent)' }}
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            />
                            <span className="relative z-10 text-lg sm:text-xl font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                                Enter
                            </span>
                        </div>
                        <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyan-500/20 blur-xl -z-10" />
                    </motion.button>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-xs text-cyan-600/50 font-mono"
                    >
                        Tap to initialize
                    </motion.p>
                </motion.div>
            )}

            {phase === 'matrix' && (
                <motion.div
                    key="matrix"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] bg-[#0a0a0f]"
                >
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div 
                            className="text-center px-8 py-6 rounded-2xl backdrop-blur-sm border border-cyan-500/20"
                            style={{ background: 'rgba(10, 10, 15, 0.5)' }}
                        >
                            <h2
                                className="text-2xl sm:text-4xl font-bold text-cyan-400 font-mono"
                                style={{ textShadow: '0 0 30px rgba(34, 211, 238, 0.5)' }}
                            >
                                INITIALIZING
                            </h2>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
