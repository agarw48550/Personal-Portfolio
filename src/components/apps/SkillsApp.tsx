'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Brain, Code, Terminal, Database, Globe, Palette, Server, Wrench, Users, Star } from 'lucide-react';

interface Skill {
    name: string;
    level: number;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
    xp: number;
    nextLevelXp: number;
    color: string;
}

const skills: Skill[] = [
    { name: 'React / Next.js', level: 45, icon: Code, category: 'Frontend', xp: 450, nextLevelXp: 1000, color: '#61dafb' },
    { name: 'TypeScript', level: 40, icon: Terminal, category: 'Frontend', xp: 300, nextLevelXp: 1000, color: '#3178c6' },
    { name: 'Tailwind CSS', level: 60, icon: Palette, category: 'Frontend', xp: 800, nextLevelXp: 1000, color: '#38bdf8' },
    { name: 'Framer Motion', level: 35, icon: Zap, category: 'Frontend', xp: 250, nextLevelXp: 1000, color: '#ff0055' },
    { name: 'Python', level: 25, icon: Database, category: 'Backend', xp: 150, nextLevelXp: 1000, color: '#3776ab' },
    { name: 'Node.js', level: 30, icon: Server, category: 'Backend', xp: 200, nextLevelXp: 1000, color: '#68a063' },
    { name: 'Git & GitHub', level: 50, icon: Wrench, category: 'Tools', xp: 600, nextLevelXp: 1000, color: '#f05032' },
    { name: 'VS Code', level: 70, icon: Terminal, category: 'Tools', xp: 900, nextLevelXp: 1000, color: '#007acc' },
    { name: 'Leadership', level: 80, icon: Shield, category: 'Soft Skills', xp: 2500, nextLevelXp: 3000, color: '#e0af68' },
    { name: 'Problem Solving', level: 75, icon: Brain, category: 'Soft Skills', xp: 2000, nextLevelXp: 3000, color: '#bb9af7' },
    { name: 'Communication', level: 70, icon: Users, category: 'Soft Skills', xp: 1800, nextLevelXp: 3000, color: '#7dcfff' },
];

const categories = ['All', 'Frontend', 'Backend', 'Tools', 'Soft Skills'] as const;

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'All': Star,
    'Frontend': Code,
    'Backend': Server,
    'Tools': Wrench,
    'Soft Skills': Users,
};

export default function SkillsApp() {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const filteredSkills = activeCategory === 'All' 
        ? skills 
        : skills.filter(s => s.category === activeCategory);

    const totalXP = skills.reduce((sum, s) => sum + s.xp, 0);
    const averageLevel = Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length);

    return (
        <div className="h-full bg-[#1a1b26] text-[#a9b1d6] overflow-y-auto font-mono">
            {/* Character Header */}
            <div className="sticky top-0 z-10 bg-[#1a1b26]/95 backdrop-blur-sm border-b border-[#414868] p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center border-4 border-[#1a1b26] shadow-xl relative flex-shrink-0">
                        <span className="text-xl sm:text-2xl font-bold text-white">Lvl {averageLevel}</span>
                        <div className="absolute -bottom-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500 text-[#1a1b26] text-[10px] sm:text-xs font-bold rounded-full border border-[#1a1b26]">
                            DEVELOPER
                        </div>
                    </div>

                    <div className="flex-1 w-full text-center sm:text-left">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#c0caf5] mb-2">Ayaan Agarwal</h2>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm mb-3">
                            <span className="text-[#9aa5ce]">Class: <span className="text-cyan-400">Student Developer</span></span>
                            <span className="text-[#9aa5ce]">Total XP: <span className="text-[#e0af68]">{totalXP.toLocaleString()}</span></span>
                        </div>

                        {/* Main XP Bar */}
                        <div className="relative h-4 sm:h-5 bg-[#1a1b26] rounded-full overflow-hidden border border-[#414868]">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '65%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white drop-shadow-md">
                                {totalXP.toLocaleString()} / 15,000 XP to Next Level
                            </span>
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {categories.map(cat => {
                        const Icon = categoryIcons[cat];
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    activeCategory === cat
                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                        : 'bg-[#24283b] text-[#565f89] hover:text-[#c0caf5] border border-transparent'
                                }`}
                            >
                                <Icon size={14} />
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Skills Grid */}
            <div className="p-4 sm:p-6">
                <AnimatePresence mode="popLayout">
                    <motion.div 
                        layout
                        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
                    >
                        {filteredSkills.map((skill, index) => {
                            const Icon = skill.icon;
                            const progress = (skill.xp / skill.nextLevelXp) * 100;
                            
                            return (
                                <motion.div
                                    key={skill.name}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    onMouseEnter={() => setHoveredSkill(skill.name)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    className="bg-[#24283b] p-3 sm:p-4 rounded-lg border border-[#414868] hover:border-cyan-500/50 transition-all group relative overflow-hidden"
                                >
                                    {/* Glow effect on hover */}
                                    {hoveredSkill === skill.name && (
                                        <motion.div
                                            layoutId="skill-glow"
                                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                    
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-3 gap-2">
                                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                                <div 
                                                    className="p-1.5 sm:p-2 bg-[#1a1b26] rounded-lg transition-colors flex-shrink-0"
                                                    style={{ color: skill.color }}
                                                >
                                                    <Icon size={18} className="sm:w-5 sm:h-5" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-bold text-[#c0caf5] text-sm sm:text-base truncate">{skill.name}</h3>
                                                    <span className="text-[10px] sm:text-xs text-[#565f89]">{skill.category}</span>
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <span className="text-base sm:text-lg font-bold text-[#e0af68]">Lvl {skill.level}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[10px] sm:text-xs text-[#9aa5ce]">
                                                <span>Progress to Lvl {skill.level + 1}</span>
                                                <span className="font-mono">{skill.xp} / {skill.nextLevelXp} XP</span>
                                            </div>
                                            <div className="h-2 sm:h-3 bg-[#1a1b26] rounded-full overflow-hidden relative">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                                                    className="h-full rounded-full"
                                                    style={{ 
                                                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`
                                                    }}
                                                />
                                                {/* XP segments */}
                                                <div className="absolute inset-0 flex">
                                                    {[...Array(10)].map((_, i) => (
                                                        <div key={i} className="flex-1 border-r border-[#1a1b26]/50 last:border-r-0" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Achievements / Badges */}
                <div className="mt-6 sm:mt-8">
                    <h3 className="text-lg sm:text-xl font-bold text-[#c0caf5] mb-3 sm:mb-4 flex items-center gap-2">
                        <Shield className="text-[#e0af68]" size={20} /> Achievements Unlocked
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            { name: 'Bug Hunter', desc: 'Fixed 50+ bugs', color: '#f7768e', icon: '🐛' },
                            { name: 'Pixel Perfect', desc: 'UI mastery', color: '#9ece6a', icon: '✨' },
                            { name: 'Team Player', desc: 'Led 3+ teams', color: '#7dcfff', icon: '🤝' },
                            { name: 'Fast Learner', desc: 'Quick adapter', color: '#bb9af7', icon: '🚀' },
                        ].map((badge, i) => (
                            <motion.div 
                                key={badge.name} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="bg-[#1a1b26] p-2 sm:p-3 rounded-lg border border-[#414868] text-center cursor-pointer hover:border-cyan-500/50 transition-colors"
                            >
                                <div className="text-2xl sm:text-3xl mb-1">{badge.icon}</div>
                                <div className="font-bold text-xs sm:text-sm truncate" style={{ color: badge.color }}>{badge.name}</div>
                                <div className="text-[10px] sm:text-xs text-[#565f89] truncate">{badge.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
