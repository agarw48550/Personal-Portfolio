'use client';

import React from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppId } from '@/lib/store';
import {
    User, Briefcase, Code, Mail, Terminal, Clock,
    LayoutGrid
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Only keep functional apps - removed Blog, Music, Settings
const apps = [
    { id: 'about', icon: User, label: 'About' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'timeline', icon: Clock, label: 'Timeline' },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'contact', icon: Mail, label: 'Contact' },
] as const;

export default function Taskbar() {
    const { windows, openWindow, minimizeWindow, focusWindow, toggleStartMenu } = useWindowManager();

    const handleAppClick = (id: AppId) => {
        const windowState = windows[id];
        if (windowState.isOpen) {
            if (windowState.isMinimized) {
                focusWindow(id);
            } else {
                minimizeWindow(id);
            }
        } else {
            openWindow(id);
        }
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]">
            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-end gap-1 sm:gap-1.5 px-2 sm:px-3 py-2"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
            >
                <motion.button
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleStartMenu}
                    data-start-button
                    className="p-2.5 sm:p-3 rounded-xl transition-all group relative"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    }}
                >
                    <LayoutGrid className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                        style={{
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        Launchpad
                    </span>
                </motion.button>

                <div className="w-[1px] h-8 sm:h-10 bg-white/20 mx-0.5" />

                {apps.map((app, index) => {
                    const isOpen = windows[app.id as AppId]?.isOpen;
                    const isMinimized = windows[app.id as AppId]?.isMinimized;
                    const isActive = isOpen && !isMinimized;

                    return (
                        <motion.button
                            key={app.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            whileHover={{ scale: 1.15, y: -8 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAppClick(app.id as AppId)}
                            className={cn(
                                "p-2.5 sm:p-3 rounded-xl transition-all duration-200 group relative"
                            )}
                            style={{
                                background: isActive 
                                    ? 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)'
                                    : isOpen 
                                    ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
                                    : 'transparent'
                            }}
                        >
                            <app.icon className={cn(
                                "w-5 h-5 sm:w-6 sm:h-6 transition-colors drop-shadow-lg",
                                isActive ? "text-white" : "text-white/80 group-hover:text-white"
                            )} />

                            {/* Glowing dot indicator for open apps */}
                            {isOpen && (
                                <motion.div
                                    layoutId={`dot-${app.id}`}
                                    className={cn(
                                        "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                                        isMinimized ? "bg-gray-400" : "bg-white"
                                    )}
                                    style={{
                                        boxShadow: isMinimized ? 'none' : '0 0 8px rgba(255,255,255,0.8)'
                                    }}
                                />
                            )}

                            {/* Tooltip */}
                            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                                style={{
                                    background: 'rgba(0,0,0,0.8)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                {app.label}
                            </span>
                        </motion.button>
                    );
                })}
            </motion.div>
        </div>
    );
}
