"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '@/lib/skillsData';

export default function SkillsApp() {
    return (
        <div className="h-full bg-black text-green-500 p-8 font-mono overflow-y-auto selection:bg-green-500/30 selection:text-black">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8 border-b border-green-500/30 pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 glitch-text">
                        &gt; SYSTEM.SKILLS_CHECK()
                    </h1>
                    <p className="text-green-500/60 text-sm">
                        Loading user capabilities... [COMPLETE]
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid gap-6">
                    {SKILLS_DATA.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                <span className="font-bold text-lg group-hover:text-green-400 transition-colors">
                                    &gt; {skill.name}
                                </span>
                                <span className="text-xs text-green-500/50 font-mono hidden md:block">
                                    [ID: 0x{index.toString(16).padStart(2, '0')}]
                                </span>
                            </div>

                            {/* Retro Progress Bar */}
                            <div className="flex items-center gap-1">
                                <span className="text-green-500/50 text-xs w-8">[{skill.rating}/{skill.maxRating}]</span>
                                <div className="flex-1 h-6 bg-green-900/20 border border-green-500/30 p-1 flex gap-1">
                                    {Array.from({ length: skill.maxRating }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: i < skill.rating ? 1 : 0.1 }}
                                            transition={{ delay: index * 0.1 + i * 0.05 }}
                                            className={`flex-1 h-full ${i < skill.rating
                                                ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                                                : 'bg-green-500/10'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-12 pt-4 border-t border-green-500/30 text-xs text-green-500/50 flex justify-between">
                    <span>STATUS: LEARNING_MODE_ACTIVE</span>
                    <span className="animate-pulse">_</span>
                </div>
            </div>
        </div>
    );
}
