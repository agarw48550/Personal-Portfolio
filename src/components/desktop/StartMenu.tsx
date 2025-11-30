'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppId } from '@/lib/store';
import {
    User, Briefcase, Code, FileText, Mail, Terminal, Settings, Music, Clock,
    Search, Power, Github, Linkedin, Instagram
} from 'lucide-react';

const apps = [
    { id: 'about', icon: User, label: 'About Me', color: 'bg-blue-500' },
    { id: 'projects', icon: Briefcase, label: 'Projects', color: 'bg-purple-500' },
    { id: 'skills', icon: Code, label: 'Skills', color: 'bg-green-500' },
    { id: 'blog', icon: FileText, label: 'Blog', color: 'bg-orange-500' },
    { id: 'timeline', icon: Clock, label: 'Timeline', color: 'bg-yellow-500' },
    { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'bg-gray-700' },
    { id: 'music', icon: Music, label: 'Music', color: 'bg-pink-500' },
    { id: 'contact', icon: Mail, label: 'Contact', color: 'bg-red-500' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'bg-gray-500' },
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
                        className="fixed inset-0 z-[90]"
                        onClick={closeStartMenu}
                    />
                    
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 left-4 z-[100] w-72 sm:w-80 md:w-96 bg-[#16213e]/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
                    >
                        {/* Search Bar */}
                        <div className="p-3 sm:p-4 border-b border-white/10">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search apps..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-500"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* App Grid */}
                        <div className="p-3 sm:p-4 grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 overflow-y-auto">
                            {apps.map((app) => (
                                <button
                                    key={app.id}
                                    onClick={() => {
                                        openWindow(app.id as AppId);
                                        closeStartMenu();
                                    }}
                                    className="flex flex-col items-center gap-1.5 sm:gap-2 group p-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                        <app.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <span className="text-[10px] sm:text-xs text-gray-300 group-hover:text-white transition-colors text-center truncate w-full">
                                        {app.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-3 sm:p-4 bg-black/20 border-t border-white/10 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                                    AA
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs sm:text-sm font-medium text-white truncate">Ayaan Agarwal</span>
                                    <span className="text-[10px] sm:text-xs text-gray-400 truncate">Developer</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                                    <Github size={16} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                                    <Linkedin size={16} />
                                </a>
                                <button className="p-1.5 sm:p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors text-gray-400">
                                    <Power size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
