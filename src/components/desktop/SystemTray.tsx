'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, Moon, Sun, Bell } from 'lucide-react';

export default function SystemTray() {
    const [time, setTime] = useState<Date | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!isMounted || !time) return null;

    return (
        <div className="fixed top-2 right-4 z-50 flex items-center gap-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
            <div className="flex items-center gap-3 text-white/80">
                <Wifi size={16} />
                <Volume2 size={16} />
                <Battery size={16} />
            </div>

            <div className="w-[1px] h-4 bg-white/20" />

            <div className="flex items-center gap-3 text-white/80">
                <button className="hover:text-white transition-colors">
                    <Moon size={16} />
                </button>
                <button className="hover:text-white transition-colors relative">
                    <Bell size={16} />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
            </div>

            <div className="w-[1px] h-4 bg-white/20" />

            <div className="text-sm font-medium text-white tabular-nums">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
}
