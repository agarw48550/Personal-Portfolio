'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Box, Play, Pause } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function BlockToCode() {
    const [mode, setMode] = useState<'blocks' | 'code'>('blocks');
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const { theme } = useStore();
    const isDark = theme === 'dark';

    // Auto-toggle between blocks and code for "wow" effect
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setMode(prev => prev === 'blocks' ? 'code' : 'blocks');
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleManualToggle = useCallback((newMode: 'blocks' | 'code') => {
        setIsAutoPlaying(false); // Stop auto-play when user interacts
        setMode(newMode);
    }, []);

    return (
        <div className={`w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border transition-all duration-500 ${isDark ? 'bg-[#0d1117] border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>

            {/* Header / Toolbar */}
            <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'bg-[#161b22] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className={`text-sm font-mono font-bold ml-2 opacity-50 ${isDark ? 'text-white' : 'text-slate-600'}`}>
                        logic_processor.{mode === 'blocks' ? 'sb3' : 'py'}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-black/20 border-white/5' : 'bg-white border-slate-200'}`}>
                        <button
                            onClick={() => handleManualToggle('blocks')}
                            aria-label="Show block-based code"
                            aria-pressed={mode === 'blocks'}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'blocks'
                                ? 'bg-yellow-500 text-white shadow-lg'
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            <Box size={14} /> BLOCKS
                        </button>
                        <button
                            onClick={() => handleManualToggle('code')}
                            aria-label="Show Python code"
                            aria-pressed={mode === 'code'}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'code'
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            <Code size={14} /> CODE
                        </button>
                    </div>
                    <button
                        onClick={() => setIsAutoPlaying(prev => !prev)}
                        aria-label={isAutoPlaying ? 'Pause auto-toggle' : 'Play auto-toggle'}
                        className={`p-2 rounded-lg border transition-all ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-100'} ${isAutoPlaying ? 'text-cyan-500' : 'text-slate-400'}`}
                    >
                        {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className={`relative min-h-[400px] p-8 md:p-12 overflow-hidden flex items-center justify-center ${isDark ? 'bg-[#0d1117]' : 'bg-white'}`}>

                {/* Background Grid */}
                <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${isDark ? 'bg-[url("/grid-dark.svg")]' : 'bg-[url("/grid-light.svg")]'}`}
                    style={{ backgroundSize: '30px 30px', backgroundImage: `radial-gradient(circle, ${isDark ? 'white' : 'black'} 1px, transparent 1px)` }}
                />

                <AnimatePresence mode="wait">
                    {mode === 'blocks' ? (
                        <motion.div
                            key="blocks"
                            initial={{ opacity: 0, x: -20, rotateY: -10 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: 20, rotateY: 10 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col gap-2 w-full max-w-lg font-bold text-white text-sm md:text-base select-none"
                        >
                            {/* SCRATCH STYLE BLOCKS */}

                            {/* Event Hat */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                                className="bg-yellow-500 px-4 py-3 rounded-t-xl rounded-br-xl mb-1 shadow-lg shadow-yellow-500/20 relative"
                            >
                                <span className="drop-shadow-md">when 🚩 clicked</span>
                                <div className="absolute -bottom-1 left-4 w-4 h-4 bg-yellow-500" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                            </motion.div>

                            {/* Loop */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                                className="bg-orange-500 p-1 rounded-xl shadow-lg shadow-orange-500/20 flex flex-col relative"
                            >
                                <div className="absolute -top-1 left-4 w-4 h-4 bg-orange-500" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transform: 'rotate(180deg)' }}></div>
                                <div className="px-4 py-3 flex items-center gap-2">
                                    <span className="drop-shadow-md">forever</span>
                                </div>
                                <div className="pl-4 py-1 pr-1 bg-orange-500/10 rounded-b-lg border-l-4 border-orange-600/30 flex flex-col gap-1 min-h-[60px]">

                                    {/* Conditional */}
                                    <motion.div
                                        initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                                        className="bg-cyan-500 p-1 rounded-lg ml-2 mt-1 shadow-md shadow-cyan-500/20 flex flex-col relative"
                                    >
                                        <div className="absolute -top-1 left-4 w-4 h-4 bg-cyan-500" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transform: 'rotate(180deg)' }}></div>
                                        <div className="px-3 py-2 flex items-center gap-2">
                                            <span className="drop-shadow-md">if</span>
                                            <div className="bg-green-500 px-2 py-1 rounded-full text-xs mx-1 shadow-inner shadow-black/20 flex items-center gap-1">
                                                <div className="bg-white/20 px-2 rounded-full min-w-[20px] text-center">🧠</div>
                                                <span>&gt;</span>
                                                <div className="bg-white/20 px-2 rounded-full min-w-[20px] text-center">🐛</div>
                                            </div>
                                            <span className="drop-shadow-md">then</span>
                                        </div>
                                        <div className="pl-4 py-1 pr-1 bg-cyan-500/10 rounded-b-lg border-l-4 border-cyan-600/30 min-h-[40px]">
                                            {/* Action */}
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }}
                                                className="bg-purple-500 px-4 py-3 rounded-lg ml-2 mt-1 shadow-md shadow-purple-500/20 relative"
                                            >
                                                <div className="absolute -top-1 left-4 w-4 h-4 bg-purple-500" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transform: 'rotate(180deg)' }}></div>
                                                <span className="drop-shadow-md">say &quot;Hello World!&quot;</span>
                                                <div className="absolute -bottom-1 left-4 w-4 h-4 bg-purple-500" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                                            </motion.div>
                                        </div>
                                        <div className="absolute -bottom-1 left-4 w-4 h-4 bg-cyan-500" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                                    </motion.div>

                                </div>
                                <div className="absolute -bottom-1 left-4 w-4 h-4 bg-orange-500" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                            </motion.div>

                        </motion.div>
                    ) : (
                        <motion.div
                            key="code"
                            initial={{ opacity: 0, x: 20, rotateY: 10 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -20, rotateY: -10 }}
                            transition={{ duration: 0.4 }}
                            className="w-full max-w-lg"
                        >
                            <div className={`font-mono text-sm md:text-base p-6 rounded-xl border leading-relaxed ${isDark ? 'bg-[#0d1117] text-gray-300 border-gray-800' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                                    <span className="text-purple-400">def</span> <span className="text-yellow-400">main</span>():
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="pl-4">
                                    <span className="text-gray-500 italic"># The logic loop</span>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="pl-4">
                                    <span className="text-purple-400">while</span> <span className="text-orange-400">True</span>:
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pl-8">
                                    <span className="text-purple-400">if</span> <span className="text-blue-400">brain_power</span> &gt; <span className="text-blue-400">bugs</span>:
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pl-12">
                                    <span className="text-yellow-400">print</span>(<span className="text-green-400">&quot;Hello World!&quot;</span>)
                                </motion.div>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pl-4 mt-2">
                                    <span className="animate-pulse inline-block w-2 h-4 bg-cyan-500 ml-1 align-middle"></span>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* Footer Caption */}
            <div className={`px-8 py-4 text-center text-xs font-bold uppercase tracking-widest ${isDark ? 'bg-[#161b22] text-slate-500' : 'bg-slate-50 text-slate-400'}`}>
                Visualizing the transition from Block-Based Logic to Syntax
            </div>
        </div>
    );
}
