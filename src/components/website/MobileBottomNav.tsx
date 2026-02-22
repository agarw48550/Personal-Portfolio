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
                aria-label="Mobile navigation"
                className="backdrop-blur-xl rounded-2xl shadow-2xl flex justify-around items-center px-2 py-3 transition-all duration-300"
                style={{
                    background: isDark ? 'var(--ds-glass)' : 'rgba(255,255,255,0.8)',
                    border: `1px solid var(--ds-border)`,
                    boxShadow: 'var(--ds-shadow-2xl)',
                }}
            >
                {navItems.map((item) => {
                    const isActive = activeSection === item.id ||
                        (item.id === 'projects' && ['projects', 'jarvis', 'education', 'internships', 'leadership'].includes(activeSection));
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            aria-label={item.label}
                            aria-current={isActive ? 'true' : undefined}
                            className="relative flex flex-col items-center gap-1 min-w-[60px]"
                        >
                            <div
                                className="p-2 rounded-xl transition-all duration-300 relative"
                                style={isActive
                                    ? { color: 'var(--ds-brand)', background: 'var(--ds-brand-surface)' }
                                    : { color: 'var(--ds-text-muted)' }
                                }
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />

                                {/* Active Indicator Dot */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                        style={{ background: 'var(--ds-brand)' }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                            <span
                                className="text-[10px] font-bold tracking-tight transition-all duration-300"
                                style={isActive
                                    ? { color: 'var(--ds-brand)' }
                                    : { color: 'var(--ds-text-muted)' }
                                }
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
