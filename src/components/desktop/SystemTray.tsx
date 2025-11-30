'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function SystemTray() {
    const [time, setTime] = useState<Date | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!isMounted || !time) return null;

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const isDark = resolvedTheme === 'dark';

    return (
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="fixed top-3 right-4 z-50 flex items-center gap-3 px-4 py-2"
            style={{
                background: isDark 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '12px',
                border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.1)',
                boxShadow: isDark 
                    ? '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
        >
            {/* Theme Toggle Button */}
            <motion.button
                onClick={toggleTheme}
                className={`relative p-1 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
                whileTap={{ scale: 0.9 }}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={resolvedTheme}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isDark ? (
                            <Moon size={14} className="text-cyan-400" />
                        ) : (
                            <Sun size={14} className="text-amber-500" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.button>

            <div className="w-[1px] h-4 bg-white/15 dark:bg-white/15" />

            <div className={`flex items-center gap-2.5 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                <Wifi size={14} className={`hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors cursor-pointer`} />
                <Volume2 size={14} className={`hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors cursor-pointer`} />
                <div className="flex items-center gap-0.5">
                    <Battery size={14} className={`hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors cursor-pointer`} />
                    <span className="text-[10px] font-medium">100%</span>
                </div>
            </div>

            <div className="w-[1px] h-4 bg-white/15 dark:bg-white/15" />

            <div className="flex flex-col items-end">
                <span className={`text-xs font-medium tabular-nums leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className={`text-[10px] leading-none mt-0.5 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    {formatDate(time)}
                </span>
            </div>
        </motion.div>
    );
}
