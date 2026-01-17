'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useStore, AppId } from '@/lib/store';
import { useSounds } from '@/hooks/useSounds';
import {
    User, Briefcase, Code, Mail, Terminal, Clock, BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

// Static config
const appConfig = [
    { id: 'about', icon: User },
    { id: 'projects', icon: Briefcase },
    { id: 'skills', icon: Code },
    { id: 'timeline', icon: Clock },
    { id: 'terminal', icon: Terminal },
    { id: 'contact', icon: Mail },
    { id: 'blogs', icon: BookOpen, color: 'bg-orange-500' },
] as const;

interface DockIconProps {
    app: typeof appConfig[number];
    label: string;
    mouseX: ReturnType<typeof useMotionValue<number>>;
    isOpen: boolean;
    isMinimized: boolean;
    isActive: boolean;
    onClick: () => void;
}

function DockIcon({ app, label, mouseX, isOpen, isMinimized, isActive, onClick }: DockIconProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [48, 70, 48]);
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
            aria-label={`Open ${label}`}
        >
            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
                className="absolute -top-10 px-3 py-1 rounded-lg whitespace-nowrap pointer-events-none z-50 border border-cyan-500/20"
                style={{
                    background: 'rgba(10, 10, 15, 0.9)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <span className="text-xs font-medium text-cyan-300">{label}</span>
            </motion.div>

            {/* Icon container - Liquid Glass */}
            <motion.div
                className={cn(
                    "aspect-square rounded-xl flex items-center justify-center relative overflow-hidden",
                    "border border-cyan-500/20"
                )}
                style={{
                    width,
                    background: isHovered || isOpen
                        ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)',
                    boxShadow: isHovered || isOpen
                        ? '0 0 20px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
                whileTap={{ scale: 0.9 }}
            >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                <motion.div style={{ scale: useTransform(width, [48, 70], [1, 1.15]) }}>
                    <Icon className="text-cyan-400" size={22} />
                </motion.div>
            </motion.div>

            {/* Running indicator */}
            {isOpen && (
                <motion.div
                    layoutId={`dock-indicator-${app.id}`}
                    className={cn(
                        "absolute -bottom-1.5 w-1 h-1 rounded-full",
                        isMinimized ? "bg-cyan-500/40" : "bg-cyan-400"
                    )}
                    style={{
                        boxShadow: isMinimized ? 'none' : '0 0 6px rgba(34, 211, 238, 0.8)',
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
    const { openApps, minimizedApps, activeApp, openApp, minimizeApp, focusApp, theme } = useStore();
    const { playSound } = useSounds();
    const { t } = useLanguage();
    const isDark = theme === 'dark';

    const handleAppClick = (id: AppId) => {
        playSound('click');
        const isOpen = openApps.includes(id);
        const isMinimized = minimizedApps.includes(id);
        const isActive = activeApp === id;

        if (isOpen) {
            if (isMinimized || !isActive) {
                focusApp(id);
            } else {
                minimizeApp(id);
            }
        } else {
            openApp(id);
            playSound('open');
        }
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[100]"
        >
            <div
                className="flex items-end gap-1.5 px-2.5 py-2 border border-cyan-500/20"
                style={{
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, rgba(10, 10, 15, 0.9) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                    backdropFilter: 'blur(30px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                    borderRadius: '18px',
                    borderColor: isDark ? 'rgba(34, 211, 238, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                    boxShadow: isDark
                        ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
                        : '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
            >
                {appConfig.map((app) => (
                    <DockIcon
                        key={app.id}
                        app={app}
                        label={t.apps[app.id as keyof typeof t.apps] || app.id}
                        mouseX={mouseX}
                        isOpen={openApps.includes(app.id as AppId)}
                        isMinimized={minimizedApps.includes(app.id as AppId)}
                        isActive={activeApp === app.id}
                        onClick={() => handleAppClick(app.id as AppId)}
                    />
                ))}
            </div>
        </motion.div>
    );
}
