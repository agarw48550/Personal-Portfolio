"use client";

import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, Moon, Sun, Cloud, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/store';

export default function TopBar() {
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const { theme, setTheme, setViewMode } = useStore();
    const { t, language, setLanguage } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            // Use different locale based on selected language if desired, or keep default
            const locale = language === 'zh' ? 'zh-CN' : 'en-US';
            setTime(now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }));
            setDate(now.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [language]);

    if (!mounted) return null;

    return (
        <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md z-50 flex items-center justify-between px-4 text-xs font-medium text-white select-none border-b border-white/5">
            {/* Left Side */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setViewMode('website')}
                    className="hover:text-cyan-400 transition-colors"
                >
                    <Apple size={14} fill="currentColor" />
                </button>
                <div className="flex gap-4">
                    <span className="font-bold hidden sm:inline">{t.desktop.appName}</span>
                    <button
                        onClick={() => setViewMode('website')}
                        className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors ml-2"
                    >
                        Switch to Website
                    </button>
                    <div className="hidden sm:flex gap-4 text-white/80 ml-2">
                        <button className="hover:text-white transition-colors">{t.desktop.menu.file}</button>
                        <button className="hover:text-white transition-colors">{t.desktop.menu.edit}</button>
                        <button className="hover:text-white transition-colors">{t.desktop.menu.view}</button>
                        <button className="hover:text-white transition-colors">{t.desktop.menu.go}</button>
                        <button className="hover:text-white transition-colors">{t.desktop.menu.window}</button>
                        <button className="hover:text-white transition-colors">{t.desktop.menu.help}</button>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {/* Weather Widget (Mock) */}
                <div className="hidden sm:flex items-center gap-2 text-white/90 hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">
                    <Cloud size={14} className="text-cyan-400" />
                    <span>{t.desktop.weather.temp}</span>
                    <span className="text-white/60">{t.desktop.weather.city}</span>
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-3 text-white/90">
                    <Battery size={16} className="text-green-400" />
                    <Wifi size={14} />
                    <Search size={14} />
                </div>

                {/* Language Toggle */}
                <button
                    onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors flex items-center gap-1"
                >
                    <Globe size={14} />
                    <span className="uppercase text-[10px]">{language}</span>
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                    {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                </button>

                {/* Date & Time */}
                <div className="flex items-center gap-2 cursor-default">
                    <span className="hidden sm:inline">{date}</span>
                    <span>{time}</span>
                </div>
            </div>
        </div>
    );
}
