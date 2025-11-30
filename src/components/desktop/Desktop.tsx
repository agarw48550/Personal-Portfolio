'use client';

import React, { useEffect } from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import Dock from './Dock';
import StartMenu from './StartMenu';
import SystemTray from './SystemTray';
import Window from './Window';
import MatrixBackground from '@/components/ui/MatrixBackground';
import MatrixCursor from '@/components/ui/MatrixCursor';

// Import App Components - only functional ones
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import ContactApp from '@/components/apps/ContactApp';
import TerminalApp from '@/components/apps/TerminalApp';
import TimelineApp from '@/components/apps/TimelineApp';

export default function Desktop() {
    const { openWindow } = useWindowManager();

    // Cmd+K keyboard shortcut to open Terminal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                openWindow('terminal');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [openWindow]);

    return (
        <div className="fixed inset-0 overflow-hidden select-none">
            {/* Matrix Background */}
            <MatrixBackground />

            {/* Windows Layer */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="relative w-full h-full pointer-events-auto">
                    <Window id="about"><AboutApp /></Window>
                    <Window id="projects"><ProjectsApp /></Window>
                    <Window id="skills"><SkillsApp /></Window>
                    <Window id="contact"><ContactApp /></Window>
                    <Window id="terminal"><TerminalApp /></Window>
                    <Window id="timeline"><TimelineApp /></Window>
                </div>
            </div>

            {/* UI Layer */}
            <Dock />
            <StartMenu />
            <SystemTray />

            {/* Keyboard shortcut hint */}
            <div className="fixed bottom-20 right-4 z-50 text-cyan-400/20 text-xs font-mono">
                ⌘K Terminal • Click background to toggle mode
            </div>

            {/* Custom Matrix Cursor */}
            <MatrixCursor />
        </div>
    );
}
