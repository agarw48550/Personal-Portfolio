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
        <div className="fixed top-0 left-0 right-0 h-8 backdrop-blur-md z-50 flex items-center justify-between px-4 text-xs font-medium select-none" style={{ background: 'var(--ds-glass)', borderBottom: '1px solid var(--ds-border)', color: 'var(--ds-text)' }} role="banner">
            {/* Left Side */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setViewMode('website')}
                    className="transition-colors"
                    style={{ color: 'var(--ds-text-muted)' }}
                    aria-label="Switch to website view"
                >
                    <Apple size={14} fill="currentColor" />
                </button>
                <div className="flex gap-4">
                    <span className="font-bold hidden sm:inline">{t.desktop.appName}</span>
                    <button
                        onClick={() => setViewMode('website')}
                        className="font-bold ml-2 transition-colors"
                        style={{ color: 'var(--ds-brand)' }}
                    >
                        Switch to Website
                    </button>
                    <nav className="hidden sm:flex gap-4 ml-2" style={{ color: 'var(--ds-text-secondary)' }} aria-label="Desktop menu">
                        <button className="hover:text-[var(--ds-text)] transition-colors">{t.desktop.menu.file}</button>
                        <button className="hover:text-[var(--ds-text)] transition-colors">{t.desktop.menu.edit}</button>
                        <button className="hover:text-[var(--ds-text)] transition-colors">{t.desktop.menu.view}</button>
                        <button className="hover:text-[var(--ds-text)] transition-colors">{t.desktop.menu.go}</button>
                        <button className="hover:text-[var(--ds-text)] transition-colors">{t.desktop.menu.window}</button>
                        <button className="hover:text-[var(--ds-text)] transition-colors">{t.desktop.menu.help}</button>
                    </nav>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {/* Weather Widget (Mock) */}
                <div className="hidden sm:flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default" style={{ color: 'var(--ds-text-secondary)' }} aria-label={`Weather: ${t.desktop.weather.temp} in ${t.desktop.weather.city}`}>
                    <Cloud size={14} style={{ color: 'var(--ds-brand)' }} aria-hidden="true" />
                    <span>{t.desktop.weather.temp}</span>
                    <span style={{ color: 'var(--ds-text-muted)' }}>{t.desktop.weather.city}</span>
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-3 text-white/90" aria-label="System status">
                    <Battery size={16} className="text-green-400" aria-hidden="true" />
                    <span className="sr-only">Battery full</span>
                    <Wifi size={14} aria-hidden="true" />
                    <span className="sr-only">Wi-Fi connected</span>
                    <Search size={14} aria-hidden="true" />
                    <span className="sr-only">Search</span>
                </div>

                {/* Language Toggle */}
                <button
                    onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors flex items-center gap-1"
                    aria-label={`Switch language to ${language === 'en' ? 'Chinese' : 'English'}`}
                >
                    <Globe size={14} />
                    <span className="uppercase text-[10px]">{language}</span>
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    {theme === 'dark' ? <Moon size={14} aria-hidden="true" /> : <Sun size={14} aria-hidden="true" />}
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
