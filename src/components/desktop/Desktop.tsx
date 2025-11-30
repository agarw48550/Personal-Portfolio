'use client';

import React, { useEffect } from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import Dock from './Dock';
import StartMenu from './StartMenu';
import SystemTray from './SystemTray';
import Window from './Window';
import GravityParticles from '@/components/ui/GravityParticles';

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
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a12] via-[#0d0d1a] to-[#050510]">
                {/* Gradient orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
                    <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[180px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
                </div>
            </div>

            {/* Gravity Particles Background */}
            <GravityParticles
                particleCount={60}
                particleSize={2}
                particleOpacity={0.5}
                glowIntensity={12}
                movementSpeed={0.2}
                mouseInfluence={180}
                particleColor="#ffffff"
                mouseGravity="attract"
                gravityStrength={100}
            />

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
            <div className="fixed bottom-20 right-4 z-50 text-white/20 text-xs font-mono">
                ⌘K Terminal
            </div>
        </div>
    );
}
