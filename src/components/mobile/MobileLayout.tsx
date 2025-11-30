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
import TimelineApp from '@/components/apps/TimelineApp';

import { User, Briefcase, Code, Mail, Terminal, Clock } from 'lucide-react';

const apps = [
    { id: 'about', icon: User, label: 'About' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'contact', icon: Mail, label: 'Contact' },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'timeline', icon: Clock, label: 'Timeline' },
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
            case 'timeline': return <TimelineApp />;
            default: return null;
        }
    };

    return (
        <div className="h-screen w-screen bg-[#0a0a0f] overflow-hidden flex flex-col">
            {/* Status Bar */}
            <div className="h-12 w-full bg-transparent z-10" />

            {/* Main Content */}
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeWindowId ? (
                        <motion.div
                            key="app"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-[#0a0a0f] pb-20 overflow-hidden"
                        >
                            {renderActiveApp()}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 p-5 overflow-y-auto pb-24"
                        >
                            {/* Header */}
                            <div className="mb-8 mt-2">
                                <h1 className="text-2xl font-bold text-white mb-1">
                                    Welcome to{' '}
                                    <span className="text-cyan-400">AyaanOS</span>
                                </h1>
                                <p className="text-cyan-500/50 text-sm font-mono">Mobile Edition</p>
                            </div>

                            {/* App Grid - Liquid Glass */}
                            <div className="grid grid-cols-3 gap-4">
                                {apps.map((app) => (
                                    <button
                                        key={app.id}
                                        onClick={() => openWindow(app.id as AppId)}
                                        className="flex flex-col items-center gap-2 group"
                                    >
                                        <div 
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center border border-cyan-500/20 transition-all group-active:scale-95"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.05) 100%)',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                                            }}
                                        >
                                            <app.icon size={26} className="text-cyan-400" />
                                        </div>
                                        <span className="text-xs text-cyan-300/70 font-medium">{app.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Widget - Liquid Glass */}
                            <div className="mt-8">
                                <div 
                                    className="rounded-2xl p-5 border border-cyan-500/20"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(10, 10, 15, 0.9) 100%)',
                                        backdropFilter: 'blur(20px)',
                                    }}
                                >
                                    <h3 className="font-bold text-cyan-300 mb-2">About Me</h3>
                                    <p className="text-sm text-cyan-500/60 mb-3">
                                        Software developer passionate about creating beautiful interfaces
                                    </p>
                                    <button 
                                        onClick={() => openWindow('about')}
                                        className="text-xs text-cyan-400 font-medium"
                                    >
                                        Learn more →
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div 
                                    className="rounded-2xl p-5 border border-cyan-500/20"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, rgba(10, 10, 15, 0.9) 100%)',
                                        backdropFilter: 'blur(20px)',
                                    }}
                                >
                                    <h3 className="font-bold text-cyan-300 mb-2">Latest Project</h3>
                                    <p className="text-sm text-cyan-500/60 mb-3">AyaanOS Portfolio</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">Next.js</span>
                                        <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">React</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <BottomNav />
        </div>
    );
}
