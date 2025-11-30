'use client';

import React from 'react';
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

    if (!isMenuOpen) return null;

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-20 left-4 z-50 w-80 sm:w-96 bg-[#16213e]/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Search Bar */}
                    <div className="p-4 border-b border-white/10">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search apps, files, settings..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-500"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* App Grid */}
                    <div className="p-4 grid grid-cols-4 gap-4">
                        {apps.map((app) => (
                            <button
                                key={app.id}
                                onClick={() => {
                                    openWindow(app.id as AppId);
                                    closeStartMenu();
                                }}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                                    <app.icon className="text-white w-6 h-6" />
                                </div>
                                <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                                    {app.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-black/20 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                AA
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white">Ayaan Agarwal</span>
                                <span className="text-xs text-gray-400">Aspiring Developer</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                                <Github size={18} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                                <Linkedin size={18} />
                            </a>
                            <button className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors text-gray-400">
                                <Power size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
