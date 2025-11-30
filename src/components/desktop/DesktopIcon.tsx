'use client';

import React from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppId } from '@/lib/store';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
    id: AppId;
    label: string;
    icon: LucideIcon;
}

// Icon colors for different apps
const iconColors: Record<string, string> = {
    about: 'from-blue-400 to-blue-600',
    projects: 'from-purple-400 to-purple-600',
    skills: 'from-green-400 to-green-600',
    timeline: 'from-orange-400 to-orange-600',
    terminal: 'from-gray-500 to-gray-700',
    contact: 'from-red-400 to-red-600',
};

export default function DesktopIcon({ id, label, icon: Icon }: DesktopIconProps) {
    const { openWindow, windows } = useWindowManager();
    const isOpen = windows[id]?.isOpen;

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openWindow(id)}
            onDoubleClick={() => openWindow(id)}
            className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl transition-all group w-20",
                isOpen ? "bg-white/10" : "hover:bg-white/5"
            )}
        >
            <div 
                className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                    "bg-gradient-to-br",
                    iconColors[id] || 'from-blue-500 to-purple-600',
                    "group-hover:shadow-lg group-hover:shadow-white/10"
                )}
                style={{
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
            >
                <Icon className="text-white w-7 h-7 drop-shadow-sm" />
            </div>
            <span className="text-white/90 text-[11px] font-medium text-center leading-tight drop-shadow-lg max-w-full truncate px-1">
                {label}
            </span>
            {isOpen && (
                <motion.div 
                    layoutId={`desktop-dot-${id}`}
                    className="w-1 h-1 rounded-full bg-white/80"
                    style={{ boxShadow: '0 0 4px rgba(255,255,255,0.5)' }}
                />
            )}
        </motion.button>
    );
}
