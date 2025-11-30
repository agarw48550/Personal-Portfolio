'use client';

import React, { useEffect } from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import SystemTray from './SystemTray';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import {
    User, Briefcase, Code, Mail, Terminal, Clock
} from 'lucide-react';

// Import App Components - only functional ones
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import ContactApp from '@/components/apps/ContactApp';
import TerminalApp from '@/components/apps/TerminalApp';
import TimelineApp from '@/components/apps/TimelineApp';

// Only functional apps for desktop icons
const desktopIcons = [
    { id: 'about', icon: User, label: 'About Me' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'timeline', icon: Clock, label: 'Timeline' },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'contact', icon: Mail, label: 'Contact' },
] as const;

export default function Desktop() {
    const { windows, openWindow } = useWindowManager();

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
            {/* Animated Gradient Background with Liquid Glass Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3e] to-[#0f0f2a]">
                {/* Animated gradient orbs for liquid glass effect */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
                </div>
                {/* Subtle noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
            </div>

            {/* Desktop Icons */}
            <div className="absolute top-16 left-4 flex flex-col gap-4 z-0">
                {desktopIcons.map((icon) => (
                    <DesktopIcon
                        key={icon.id}
                        id={icon.id as any}
                        label={icon.label}
                        icon={icon.icon}
                    />
                ))}
            </div>

            {/* Windows Layer - only functional apps */}
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
            <Taskbar />
            <StartMenu />
            <SystemTray />

            {/* Keyboard shortcut hint */}
            <div className="fixed bottom-20 right-4 z-50 text-white/30 text-xs font-mono">
                Press ⌘K for Terminal
            </div>
        </div>
    );
}
