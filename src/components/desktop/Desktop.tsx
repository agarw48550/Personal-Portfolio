'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/lib/store';
import Dock from './Dock';
import Window from './Window'; // We'll need to ensure this component is compatible or update it
import CustomCursor from './CustomCursor';
import { useSounds } from '@/hooks/useSounds';

// Import App Components
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import ContactApp from '@/components/apps/ContactApp';
import TerminalApp from '@/components/apps/TerminalApp';
import TimelineApp from '@/components/apps/TimelineApp';
import BlogsApp from '@/components/apps/BlogsApp';

export default function Desktop() {
    const { openApp, activeApp } = useStore();
    const { playSound } = useSounds();

    // Cmd+K keyboard shortcut to open Terminal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                openApp('terminal');
                playSound('open');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [openApp, playSound]);

    return (
        <div className="fixed inset-0 overflow-hidden select-none bg-[#0a192f] text-white">
            {/* Custom Cursor */}
            <CustomCursor />

            {/* Wallpaper / Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] opacity-80" />

            {/* Windows Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="relative w-full h-full pointer-events-auto">
                    <Window id="about"><AboutApp /></Window>
                    <Window id="projects"><ProjectsApp /></Window>
                    <Window id="skills"><SkillsApp /></Window>
                    <Window id="contact"><ContactApp /></Window>
                    <Window id="terminal"><TerminalApp /></Window>
                    <Window id="timeline"><TimelineApp /></Window>
                    <Window id="blogs"><BlogsApp /></Window>
                </div>
            </div>

            {/* UI Layer */}
            <Dock />

            {/* Keyboard shortcut hint */}
            <div className="fixed bottom-24 right-4 z-0 text-slate-500 text-xs font-mono opacity-50 hover:opacity-100 transition-opacity">
                ⌘K Terminal
            </div>
        </div>
    );
}
