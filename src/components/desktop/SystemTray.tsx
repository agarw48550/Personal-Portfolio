'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, BatteryCharging } from 'lucide-react';
import { motion } from 'framer-motion';

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

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="fixed top-3 right-4 z-50 flex items-center gap-3 px-4 py-2"
            style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
        >
            <div className="flex items-center gap-2.5 text-white/70">
                <Wifi size={14} className="hover:text-white transition-colors cursor-pointer" />
                <Volume2 size={14} className="hover:text-white transition-colors cursor-pointer" />
                <div className="flex items-center gap-0.5">
                    <Battery size={14} className="hover:text-white transition-colors cursor-pointer" />
                    <span className="text-[10px] font-medium">100%</span>
                </div>
            </div>

            <div className="w-[1px] h-4 bg-white/15" />

            <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-white tabular-nums leading-none">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="text-[10px] text-white/50 leading-none mt-0.5">
                    {formatDate(time)}
                </span>
            </div>
        </motion.div>
    );
}
