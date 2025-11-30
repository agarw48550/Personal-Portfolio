'use client';

import React from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppId } from '@/lib/store';
import {
    User, Briefcase, Code, FileText, Mail, Terminal, Settings, Music, Clock,
    LayoutGrid
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const apps = [
    { id: 'about', icon: User, label: 'About' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'blog', icon: FileText, label: 'Blog' },
    { id: 'timeline', icon: Clock, label: 'Timeline' },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'contact', icon: Mail, label: 'Contact' },
    { id: 'settings', icon: Settings, label: 'Settings' },
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
            <div className="flex items-end gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#1a1a2e]/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                <button
                    onClick={toggleStartMenu}
                    data-start-button
                    className="p-2.5 sm:p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all hover:-translate-y-1 active:scale-95 group relative"
                >
                    <LayoutGrid className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Start
                    </span>
                </button>

                <div className="w-[1px] h-8 sm:h-10 bg-white/20 mx-0.5 sm:mx-1" />

                {apps.map((app) => {
                    const isOpen = windows[app.id as AppId]?.isOpen;
                    const isMinimized = windows[app.id as AppId]?.isMinimized;
                    const isActive = isOpen && !isMinimized;

                    return (
                        <button
                            key={app.id}
                            onClick={() => handleAppClick(app.id as AppId)}
                            className={cn(
                                "p-2.5 sm:p-3 rounded-xl transition-all duration-200 hover:-translate-y-2 active:scale-95 group relative",
                                isActive ? "bg-white/20" : isOpen ? "bg-white/10" : "hover:bg-white/10"
                            )}
                        >
                            <app.icon className={cn(
                                "w-5 h-5 sm:w-6 sm:h-6 transition-colors",
                                isActive ? "text-blue-400" : "text-white/80 group-hover:text-white"
                            )} />

                            {/* Dot indicator for open apps */}
                            {isOpen && (
                                <motion.div
                                    layoutId={`dot-${app.id}`}
                                    className={cn(
                                        "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full",
                                        isMinimized ? "bg-gray-400" : "bg-blue-400"
                                    )}
                                />
                            )}

                            {/* Tooltip */}
                            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-lg">
                                {app.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
