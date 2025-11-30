'use client';

import React from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import BottomNav from './BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import { AppId } from '@/lib/store';

// Import Apps
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import ContactApp from '@/components/apps/ContactApp';
import TerminalApp from '@/components/apps/TerminalApp';
import BlogApp from '@/components/apps/BlogApp';
import SettingsApp from '@/components/apps/SettingsApp';

// Mobile Home Screen Icons
import { User, Briefcase, Code, FileText, Mail, Terminal, Settings, Music, Clock } from 'lucide-react';

const apps = [
    { id: 'about', icon: User, label: 'About', color: 'bg-blue-500' },
    { id: 'projects', icon: Briefcase, label: 'Projects', color: 'bg-purple-500' },
    { id: 'skills', icon: Code, label: 'Skills', color: 'bg-green-500' },
    { id: 'blog', icon: FileText, label: 'Blog', color: 'bg-orange-500' },
    { id: 'contact', icon: Mail, label: 'Contact', color: 'bg-red-500' },
    { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'bg-gray-700' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'bg-gray-500' },
    { id: 'timeline', icon: Clock, label: 'Timeline', color: 'bg-yellow-500' },
];

export default function MobileLayout() {
    const { activeWindowId, openWindow } = useWindowManager();

    const renderActiveApp = () => {
        switch (activeWindowId) {
            case 'about': return <AboutApp />;
            case 'projects': return <ProjectsApp />;
            case 'skills': return <SkillsApp />;
            case 'contact': return <ContactApp />;
            case 'terminal': return <TerminalApp />;
            case 'blog': return <BlogApp />;
            case 'settings': return <SettingsApp />;
            case 'timeline': return <div className="p-4 text-white">Timeline App</div>; // Placeholder
            default: return null;
        }
    };

    return (
        <div className="h-screen w-screen bg-[#1a1a2e] overflow-hidden flex flex-col">
            {/* Status Bar Placeholder */}
            <div className="h-12 w-full bg-transparent z-10" />

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeWindowId ? (
                        <motion.div
                            key="app"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute inset-0 bg-gray-900 pb-20 overflow-hidden"
                        >
                            {renderActiveApp()}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 p-6 overflow-y-auto pb-24"
                        >
                            {/* Header */}
                            <div className="mb-8 mt-4">
                                <h1 className="text-3xl font-bold text-white mb-1">Good Morning,</h1>
                                <p className="text-gray-400">Welcome to AyaanOS Mobile</p>
                            </div>

                            {/* App Grid */}
                            <div className="grid grid-cols-4 gap-6">
                                {apps.map((app) => (
                                    <button
                                        key={app.id}
                                        onClick={() => openWindow(app.id as AppId)}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center shadow-lg text-white`}>
                                            <app.icon size={24} />
                                        </div>
                                        <span className="text-xs text-gray-300 font-medium">{app.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Widgets Area */}
                            <div className="mt-8 space-y-4">
                                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-4 text-white shadow-lg">
                                    <h3 className="font-bold mb-1">Latest Project</h3>
                                    <p className="text-sm opacity-80 mb-3">Portfolio OS Redesign</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">Next.js</span>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">3D</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-4 text-white shadow-lg">
                                    <h3 className="font-bold mb-1">Currently Learning</h3>
                                    <p className="text-sm opacity-80">Advanced Three.js & Shaders</p>
                                    <div className="w-full bg-black/20 h-1.5 rounded-full mt-3">
                                        <div className="w-3/4 h-full bg-white rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
