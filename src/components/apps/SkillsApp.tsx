'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Brain, Code, Terminal, Database, Globe } from 'lucide-react';

interface Skill {
    name: string;
    level: number; // 1-100
    icon: any;
    category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
    xp: number; // Current XP
    nextLevelXp: number;
}

const skills: Skill[] = [
    { name: 'React / Next.js', level: 45, icon: Code, category: 'Frontend', xp: 450, nextLevelXp: 1000 },
    { name: 'TypeScript', level: 40, icon: Terminal, category: 'Frontend', xp: 300, nextLevelXp: 1000 },
    { name: 'Tailwind CSS', level: 60, icon: Zap, category: 'Frontend', xp: 800, nextLevelXp: 1000 },
    { name: 'Python', level: 25, icon: Database, category: 'Backend', xp: 150, nextLevelXp: 1000 },
    { name: 'Three.js', level: 30, icon: Globe, category: 'Frontend', xp: 200, nextLevelXp: 1000 },
    { name: 'Leadership', level: 80, icon: Shield, category: 'Soft Skills', xp: 2500, nextLevelXp: 3000 },
    { name: 'Problem Solving', level: 75, icon: Brain, category: 'Soft Skills', xp: 2000, nextLevelXp: 3000 },
];

export default function SkillsApp() {
    return (
        <div className="h-full bg-[#1a1b26] text-[#a9b1d6] p-4 sm:p-6 overflow-y-auto font-mono">
            {/* Character Header */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 p-4 sm:p-6 bg-[#24283b] rounded-xl border border-[#414868] shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-[#1a1b26] shadow-xl relative flex-shrink-0">
                    <span className="text-xl sm:text-2xl font-bold text-white">Lvl 15</span>
                    <div className="absolute -bottom-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#f7768e] text-[#1a1b26] text-[10px] sm:text-xs font-bold rounded-full border border-[#1a1b26]">
                        DEVELOPER
                    </div>
                </div>

                <div className="flex-1 w-full text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#c0caf5] mb-2">Ayaan Agarwal</h2>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm mb-3">
                        <span className="text-[#9aa5ce]">Class: <span className="text-[#7aa2f7]">Student</span></span>
                        <span className="text-[#9aa5ce]">Guild: <span className="text-[#bb9af7]">UWCSEA</span></span>
                    </div>

                    {/* Main XP Bar */}
                    <div className="relative h-4 sm:h-5 bg-[#1a1b26] rounded-full overflow-hidden border border-[#414868]">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7]"
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white drop-shadow-md">
                            XP: 12,450 / 19,000
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#24283b] p-3 sm:p-4 rounded-lg border border-[#414868] hover:border-[#7aa2f7] transition-colors group"
                    >
                        <div className="flex justify-between items-start mb-3 gap-2">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                <div className="p-1.5 sm:p-2 bg-[#1a1b26] rounded-lg text-[#7aa2f7] group-hover:text-[#bb9af7] transition-colors flex-shrink-0">
                                    <skill.icon size={18} className="sm:w-5 sm:h-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-[#c0caf5] text-sm sm:text-base truncate">{skill.name}</h3>
                                    <span className="text-[10px] sm:text-xs text-[#565f89]">{skill.category}</span>
                                </div>
                            </div>
                            <span className="text-base sm:text-lg font-bold text-[#e0af68] whitespace-nowrap flex-shrink-0">Lvl {skill.level}</span>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between text-[10px] sm:text-xs text-[#9aa5ce]">
                                <span>Progress</span>
                                <span className="font-mono">{skill.xp} / {skill.nextLevelXp} XP</span>
                            </div>
                            <div className="h-2 sm:h-2.5 bg-[#1a1b26] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(skill.xp / skill.nextLevelXp) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                    className="h-full bg-[#7aa2f7] group-hover:bg-[#bb9af7] transition-colors"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Achievements / Badges */}
            <div className="mt-6 sm:mt-8">
                <h3 className="text-lg sm:text-xl font-bold text-[#c0caf5] mb-3 sm:mb-4 flex items-center gap-2">
                    <Shield className="text-[#e0af68]" size={20} /> Achievements
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[
                        { name: 'Bug Hunter', desc: 'Fixed 50+ bugs', color: 'text-[#f7768e]' },
                        { name: 'Pixel Perfect', desc: 'UI implementation', color: 'text-[#9ece6a]' },
                        { name: 'Team Player', desc: 'Led 3+ teams', color: 'text-[#7dcfff]' },
                        { name: 'Fast Learner', desc: 'Mastered React', color: 'text-[#bb9af7]' },
                    ].map((badge) => (
                        <div key={badge.name} className="bg-[#1a1b26] p-2 sm:p-3 rounded-lg border border-[#414868] text-center hover:scale-105 transition-transform cursor-help hover:border-[#7aa2f7]">
                            <div className={`text-xl sm:text-2xl mb-1 ${badge.color}`}>★</div>
                            <div className="font-bold text-xs sm:text-sm text-[#c0caf5] truncate">{badge.name}</div>
                            <div className="text-[10px] sm:text-xs text-[#565f89] truncate">{badge.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
