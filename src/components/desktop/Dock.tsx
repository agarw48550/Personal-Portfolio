'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppId } from '@/lib/store';
import {
    User, Briefcase, Code, Mail, Terminal, Clock,
    LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';

const apps = [
    { id: 'about', icon: User, label: 'About', color: '#3b82f6' },
    { id: 'projects', icon: Briefcase, label: 'Projects', color: '#8b5cf6' },
    { id: 'skills', icon: Code, label: 'Skills', color: '#22c55e' },
    { id: 'timeline', icon: Clock, label: 'Timeline', color: '#f97316' },
    { id: 'terminal', icon: Terminal, label: 'Terminal', color: '#6b7280' },
    { id: 'contact', icon: Mail, label: 'Contact', color: '#ef4444' },
] as const;

interface DockIconProps {
    app: typeof apps[number];
    mouseX: ReturnType<typeof useMotionValue<number>>;
    isOpen: boolean;
    isMinimized: boolean;
    onClick: () => void;
}

function DockIcon({ app, mouseX, isOpen, isMinimized, onClick }: DockIconProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Calculate distance from mouse
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Scale based on distance (magnification effect)
    const widthSync = useTransform(distance, [-150, 0, 150], [50, 75, 50]);
    const width = useSpring(widthSync, { stiffness: 400, damping: 30 });

    const Icon = app.icon;

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group flex flex-col items-center"
            style={{ width }}
        >
            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
                className="absolute -top-12 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-50"
                style={{
                    background: 'rgba(30, 30, 30, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                <span className="text-xs font-medium text-white">{app.label}</span>
                {/* Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 bg-[rgba(30,30,30,0.9)] border-r border-b border-white/10" />
            </motion.div>

            {/* Icon container */}
            <motion.div
                className={cn(
                    "aspect-square rounded-xl flex items-center justify-center relative overflow-hidden",
                    "transition-all duration-200"
                )}
                style={{
                    width,
                    background: `linear-gradient(135deg, ${app.color} 0%, ${app.color}dd 100%)`,
                    boxShadow: isHovered || isOpen
                        ? `0 0 20px ${app.color}40, 0 4px 12px rgba(0,0,0,0.3)`
                        : '0 4px 12px rgba(0,0,0,0.2)',
                }}
                whileTap={{ scale: 0.9 }}
            >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                
                {/* Icon */}
                <motion.div style={{ scale: useTransform(width, [50, 75], [1, 1.2]) }}>
                    <Icon className="text-white drop-shadow-sm" size={24} />
                </motion.div>
            </motion.div>

            {/* Running indicator dot */}
            {isOpen && (
                <motion.div
                    layoutId={`dock-indicator-${app.id}`}
                    className={cn(
                        "absolute -bottom-2 w-1 h-1 rounded-full",
                        isMinimized ? "bg-white/40" : "bg-white"
                    )}
                    style={{
                        boxShadow: isMinimized ? 'none' : '0 0 6px rgba(255,255,255,0.8)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                />
            )}
        </motion.button>
    );
}

export default function Dock() {
    const mouseX = useMotionValue(Infinity);
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
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[100]"
        >
            <div
                className="flex items-end gap-2 px-3 py-2"
                style={{
                    background: 'rgba(40, 40, 40, 0.6)',
                    backdropFilter: 'blur(30px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: `
                        0 0 0 0.5px rgba(255,255,255,0.1) inset,
                        0 8px 32px rgba(0, 0, 0, 0.4),
                        0 2px 8px rgba(0, 0, 0, 0.2)
                    `,
                }}
            >
                {/* Launchpad button */}
                <motion.button
                    onClick={toggleStartMenu}
                    data-start-button
                    className="w-[50px] h-[50px] rounded-xl flex items-center justify-center relative group"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <LayoutGrid className="text-white" size={24} />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                            background: 'rgba(30, 30, 30, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}
                    >
                        <span className="text-xs font-medium text-white">Launchpad</span>
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 bg-[rgba(30,30,30,0.9)] border-r border-b border-white/10" />
                    </div>
                </motion.button>

                {/* Separator */}
                <div className="w-[1px] h-10 bg-white/10 mx-1" />

                {/* App icons */}
                {apps.map((app) => (
                    <DockIcon
                        key={app.id}
                        app={app}
                        mouseX={mouseX}
                        isOpen={windows[app.id as AppId]?.isOpen || false}
                        isMinimized={windows[app.id as AppId]?.isMinimized || false}
                        onClick={() => handleAppClick(app.id as AppId)}
                    />
                ))}
            </div>
        </motion.div>
    );
}
