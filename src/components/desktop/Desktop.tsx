'use client';

import React from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import SystemTray from './SystemTray';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import {
    User, Briefcase, Code, FileText, Mail, Terminal, Settings, Music, Clock
} from 'lucide-react';

// Import App Components
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import BlogApp from '@/components/apps/BlogApp';
import ContactApp from '@/components/apps/ContactApp';
import TerminalApp from '@/components/apps/TerminalApp';
import SettingsApp from '@/components/apps/SettingsApp';
import MusicApp from '@/components/apps/MusicApp';
import TimelineApp from '@/components/apps/TimelineApp';

const desktopIcons = [
    { id: 'about', icon: User, label: 'About Me' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'blog', icon: FileText, label: 'Blog' },
    { id: 'contact', icon: Mail, label: 'Contact' },
] as const;

export default function Desktop() {
    const { windows } = useWindowManager();

    return (
        <div className="fixed inset-0 overflow-hidden select-none bg-[#0f0f1a]">
            {/* Background - Clean solid gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />

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

            {/* Windows Layer */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="relative w-full h-full pointer-events-auto">
                    <Window id="about"><AboutApp /></Window>
                    <Window id="projects"><ProjectsApp /></Window>
                    <Window id="skills"><SkillsApp /></Window>
                    <Window id="blog"><BlogApp /></Window>
                    <Window id="contact"><ContactApp /></Window>
                    <Window id="terminal"><TerminalApp /></Window>
                    <Window id="settings"><SettingsApp /></Window>
                    <Window id="music"><MusicApp /></Window>
                    <Window id="timeline"><TimelineApp /></Window>
                </div>
            </div>

            {/* UI Layer */}
            <Taskbar />
            <StartMenu />
            <SystemTray />
        </div>
    );
}
