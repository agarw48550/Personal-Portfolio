'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code2, Mail, Cpu } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function MobileBottomNav({ activeSection }: { activeSection: string }) {
    const { theme } = useStore();
    const isDark = theme === 'dark';

    const navItems = [
        { id: 'hero', label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: User },
        { id: 'skills', label: 'Skills', icon: Cpu },
        { id: 'projects', label: 'Work', icon: Code2 },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];

    return (
        <div className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
            <nav
                className={`
                    backdrop-blur-xl rounded-2xl border shadow-2xl flex justify-around items-center px-2 py-3
                    transition-all duration-300
                    ${isDark
                        ? 'bg-[#0a0a12]/80 border-white/10 shadow-black/50'
                        : 'bg-white/80 border-slate-200 shadow-slate-200/50'
                    }
                `}
            >
                {navItems.map((item) => {
                    const isActive = activeSection === item.id ||
                        (item.id === 'projects' && ['projects', 'jarvis', 'education', 'internships', 'leadership'].includes(activeSection));
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="relative flex flex-col items-center gap-1 min-w-[60px]"
                        >
                            <div
                                className={`
                                    p-2 rounded-xl transition-all duration-300 relative
                                    ${isActive
                                        ? (isDark ? 'text-cyan-400 bg-cyan-400/10' : 'text-cyan-600 bg-cyan-50')
                                        : (isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600')
                                    }
                                `}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />

                                {/* Active Indicator Dot */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                            <span
                                className={`
                                    text-[10px] font-bold tracking-tight transition-all duration-300
                                    ${isActive
                                        ? (isDark ? 'text-cyan-400' : 'text-cyan-600')
                                        : (isDark ? 'text-slate-500' : 'text-slate-400')
                                    }
                                `}
                            >
                                {item.label}
                            </span>
                        </a>
                    );
                })}
            </nav>
        </div>
    );
}
