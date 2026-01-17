'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Cpu, Activity, Zap } from 'lucide-react';
import { useStore } from '@/lib/store';

const COMMANDS = [
    { type: 'input', text: 'python3 jarvis_v4.py' },
    { type: 'output', text: 'Initializing Jarvis Neural Core...', delay: 500 },
    { type: 'output', text: 'Loading AI Models [Faster-Whisper, OpenWakeWord]...', delay: 300 },
    { type: 'system', text: '>> AUTHENTICATION SUCCESSFUL: ACCESS GRANTED', delay: 400 },
    { type: 'output', text: 'Voice Engine: ACTIVE', delay: 200 },
    { type: 'output', text: 'Vision Engine: ACTIVE', delay: 200 },
    { type: 'output', text: 'System Check: 100% Operational', delay: 200 },
    { type: 'output', text: 'JARVIS: "Good morning, Ayaan. How can I assist you today?"', delay: 1000 },
    { type: 'input', text: 'jarvis --scan --env' },
    { type: 'output', text: 'Scanning local environment...', delay: 500 },
    { type: 'output', text: 'Found 3 active displays.', delay: 200 },
    { type: 'output', text: 'Current Status: Coding Personal Portfolio.', delay: 200 },
    { type: 'output', text: 'Optimization suggested: Increase caffeine intake.', delay: 400 },
];

export default function JarvisTerminal() {
    const [lines, setLines] = useState<{ type: string; text: string }[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useStore();
    const isDark = theme === 'dark';

    useEffect(() => {
        if (isPaused) return; // Pause animation on hover

        if (currentIndex < COMMANDS.length) {
            const command = COMMANDS[currentIndex];
            setIsTyping(true);

            // Add slight randomness to delays for more human-like feel
            const baseDelay = command.delay || (command.type === 'input' ? 1000 : 300);
            const randomVariance = Math.random() * 150 - 75; // +/- 75ms
            const finalDelay = Math.max(100, baseDelay + randomVariance);

            const timer = setTimeout(() => {
                setLines((prev) => [...prev, { type: command.type, text: command.text }]);
                setCurrentIndex((prev) => prev + 1);
                setIsTyping(false);
            }, finalDelay);

            return () => clearTimeout(timer);
        } else {
            // Reset after a long pause to keep it looping and alive
            const resetTimer = setTimeout(() => {
                setLines([]);
                setCurrentIndex(0);
            }, 10000);
            return () => clearTimeout(resetTimer);
        }
    }, [currentIndex, isPaused]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div
            className={`w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border transition-all duration-500 font-mono text-sm shadow-2xl ${isDark ? 'bg-[#0d1117] border-white/10 shadow-cyan-500/10' : 'bg-[#1e1e1e] border-slate-700 shadow-slate-900/50'}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Terminal Top Bar */}
            <div className={`flex items-center justify-between px-4 py-2 border-b ${isDark ? 'bg-[#161b22] border-white/5' : 'bg-[#2d2d2d] border-slate-700'
                }`}>
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-bold opacity-70">
                        <Terminal size={12} />
                        <span>ayaans_macbook — jarvis_v4.py</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-[#22c3ee]">
                    <Shield size={14} className="animate-pulse" />
                    <Activity size={14} />
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={containerRef}
                className="p-6 md:p-8 h-[400px] overflow-y-auto scrollbar-hide flex flex-col gap-2 relative"
            >
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10" />

                <AnimatePresence>
                    {lines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex gap-3 leading-relaxed"
                        >
                            {line.type === 'input' && (
                                <span className="text-[#22c3ee] font-bold shrink-0">~ $</span>
                            )}
                            <span className={`
                                ${line.type === 'input' ? 'text-white' : ''}
                                ${line.type === 'output' ? 'text-[#a5d6ff]' : ''}
                                ${line.type === 'system' ? 'text-[#39ff14] font-black tracking-widest' : ''}
                            `}>
                                {line.text}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <div className="flex items-center gap-2">
                        <span className="text-[#22c3ee] font-bold">~ $</span>
                        <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-2.5 h-5 bg-[#22c3ee]"
                        />
                    </div>
                )}

                {/* Matrix Background subtle overlay */}
                <div className="absolute bottom-4 right-6 opacity-10 pointer-events-none">
                    <Cpu size={120} className="text-cyan-500 animate-pulse" />
                </div>
            </div>

            {/* Terminal Status Bar */}
            <div className={`px-6 py-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest ${isDark ? 'bg-[#161b22] text-slate-500' : 'bg-[#2d2d2d] text-slate-400'
                }`}>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Zap size={10} className="text-yellow-500" /> V4.2.0</span>
                    <span>CPU: 12%</span>
                    <span>RAM: 1.4GB</span>
                </div>
                <div className="text-cyan-500/50">
                    System Secure
                </div>
            </div>
        </div>
    );
}
