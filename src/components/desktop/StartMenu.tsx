'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppId } from '@/lib/store';
import {
    User, Briefcase, Code, Mail, Terminal, Clock,
    Search, Github, Linkedin, Twitter
} from 'lucide-react';

// Only functional apps - removed Blog, Music, Settings
const apps = [
    { id: 'about', icon: User, label: 'About Me', color: 'from-blue-500 to-blue-600' },
    { id: 'projects', icon: Briefcase, label: 'Projects', color: 'from-purple-500 to-purple-600' },
    { id: 'skills', icon: Code, label: 'Skills', color: 'from-green-500 to-green-600' },
    { id: 'timeline', icon: Clock, label: 'Timeline', color: 'from-orange-500 to-orange-600' },
    { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'from-gray-600 to-gray-700' },
    { id: 'contact', icon: Mail, label: 'Contact', color: 'from-red-500 to-red-600' },
] as const;

export default function StartMenu() {
    const { isMenuOpen, closeStartMenu, openWindow } = useWindowManager();
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                // Check if click is not on the taskbar start button
                const target = event.target as HTMLElement;
                if (!target.closest('[data-start-button]')) {
                    closeStartMenu();
                }
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeStartMenu();
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen, closeStartMenu]);

    if (!isMenuOpen) return null;

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm"
                        onClick={closeStartMenu}
                    />
                    
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed bottom-20 left-4 z-[100] w-72 sm:w-80 overflow-hidden flex flex-col max-h-[70vh] rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                            backdropFilter: 'blur(24px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}
                    >
                        {/* Search Bar */}
                        <div className="p-3 sm:p-4 border-b border-white/10">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search apps..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/40"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* App Grid */}
                        <div className="p-3 sm:p-4 grid grid-cols-3 gap-3 overflow-y-auto">
                            {apps.map((app, index) => (
                                <motion.button
                                    key={app.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => {
                                        openWindow(app.id as AppId);
                                        closeStartMenu();
                                    }}
                                    className="flex flex-col items-center gap-2 group p-3 rounded-xl hover:bg-white/10 transition-all"
                                >
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all`}
                                        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                                    >
                                        <app.icon className="text-white w-6 h-6" />
                                    </div>
                                    <span className="text-xs text-white/70 group-hover:text-white transition-colors text-center truncate w-full font-medium">
                                        {app.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-3 sm:p-4 border-t border-white/10 flex items-center justify-between mt-auto"
                            style={{ background: 'rgba(0,0,0,0.2)' }}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-lg">
                                    AA
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-medium text-white truncate">Ayaan Agarwal</span>
                                    <span className="text-xs text-white/50 truncate">Developer</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0">
                                <a href="https://github.com/agarw48550" target="_blank" rel="noopener noreferrer" 
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white">
                                    <Github size={18} />
                                </a>
                                <a href="https://linkedin.com/in/ayaan-agarwal" target="_blank" rel="noopener noreferrer" 
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white">
                                    <Linkedin size={18} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white">
                                    <Twitter size={18} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
