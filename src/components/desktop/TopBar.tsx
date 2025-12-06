"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Apple, Wifi, Battery, Search, Moon, Sun, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopBar() {
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md z-50 flex items-center justify-between px-4 text-xs font-medium text-white select-none border-b border-white/5">
            {/* Left Side */}
            <div className="flex items-center gap-4">
                <button className="hover:text-cyan-400 transition-colors">
                    <Apple size={14} fill="currentColor" />
                </button>
                <span className="font-bold hidden sm:inline">AyaanOS</span>
                <div className="hidden sm:flex gap-4 text-white/80">
                    <button className="hover:text-white transition-colors">File</button>
                    <button className="hover:text-white transition-colors">Edit</button>
                    <button className="hover:text-white transition-colors">View</button>
                    <button className="hover:text-white transition-colors">Go</button>
                    <button className="hover:text-white transition-colors">Window</button>
                    <button className="hover:text-white transition-colors">Help</button>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {/* Weather Widget (Mock) */}
                <div className="hidden sm:flex items-center gap-2 text-white/90 hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">
                    <Cloud size={14} className="text-cyan-400" />
                    <span>28°C</span>
                    <span className="text-white/60">Singapore</span>
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-3 text-white/90">
                    <Battery size={16} className="text-green-400" />
                    <Wifi size={14} />
                    <Search size={14} />
                </div>

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
