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
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-end gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                <button
                    onClick={toggleStartMenu}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all hover:-translate-y-1 active:scale-95 group relative"
                >
                    <LayoutGrid className="text-white w-6 h-6" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Start
                    </span>
                </button>

                <div className="w-[1px] h-10 bg-white/20 mx-1" />

                {apps.map((app) => {
                    const isOpen = windows[app.id as AppId]?.isOpen;
                    const isMinimized = windows[app.id as AppId]?.isMinimized;

                    return (
                        <button
                            key={app.id}
                            onClick={() => handleAppClick(app.id as AppId)}
                            className={cn(
                                "p-3 rounded-xl transition-all duration-200 hover:-translate-y-2 active:scale-95 group relative",
                                isOpen ? "bg-white/10" : "hover:bg-white/5"
                            )}
                        >
                            <app.icon className="text-white w-6 h-6" />

                            {/* Dot indicator for open apps */}
                            {isOpen && (
                                <motion.div
                                    layoutId="active-dot"
                                    className={cn(
                                        "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                                        isMinimized ? "bg-gray-400" : "bg-blue-400"
                                    )}
                                />
                            )}

                            {/* Tooltip */}
                            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900/90 backdrop-blur text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                                {app.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
