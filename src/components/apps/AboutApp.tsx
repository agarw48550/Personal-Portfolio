'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe, ChevronLeft, ChevronRight, RotateCcw, Lock, Star, Share2, Sidebar, PanelLeftClose } from 'lucide-react';

// Typing Animation Component
const TypingEffect = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        // Small delay before starting
        const timer = setTimeout(() => setStarted(true), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (started && currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 25);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, started, text]);

    return (
        <span>
            {displayedText}
            {currentIndex < text.length && <span className="animate-pulse text-cyan-400">|</span>}
        </span>
    );
};

// Flip Card Component
const FlipCard = ({ fact }: { fact: { title: string; description: string } }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full h-24 cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: '1000px' }}
        >
            <motion.div
                className="w-full h-full relative"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div 
                    className="absolute inset-0 w-full h-full rounded-xl flex items-center justify-center p-4 border border-cyan-500/20"
                    style={{ 
                        backfaceVisibility: 'hidden',
                        background: 'rgba(34, 211, 238, 0.05)',
                    }}
                >
                    <h4 className="font-bold text-cyan-400 text-lg">{fact.title}</h4>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 w-full h-full rounded-xl flex items-center justify-center p-4 text-center"
                    style={{ 
                        transform: "rotateY(180deg)",
                        backfaceVisibility: 'hidden',
                        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0.1) 100%)',
                    }}
                >
                    <p className="text-sm text-white font-medium">{fact.description}</p>
                </div>
            </motion.div>
        </div>
    );
};

// Fun facts data
const funFacts = [
    { title: "🎮 Gamer", description: "I love strategy games and FPS." },
    { title: "🎸 Music", description: "I play the guitar in my free time." },
    { title: "☕ Coffee", description: "Powered by caffeine and code." },
    { title: "🤖 Robotics", description: "Built a line-following robot." },
];

// Arc Browser Tabs
const tabs = [
    { id: 'about', title: 'About Me', icon: '👨‍💻', url: 'ayaan.dev/about' },
];

export default function AboutApp() {
    const [activeTab] = useState('about');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="h-full flex bg-[#1a1a2e] text-white overflow-hidden rounded-b-xl">
            {/* Arc Sidebar */}
            <motion.div 
                className="flex flex-col border-r border-white/10"
                animate={{ width: sidebarCollapsed ? 48 : 200 }}
                transition={{ duration: 0.2 }}
                style={{
                    background: 'linear-gradient(180deg, rgba(34, 211, 238, 0.05) 0%, rgba(10, 10, 30, 0.8) 100%)',
                }}
            >
                {/* Sidebar Header */}
                <div className="p-2 flex items-center justify-between border-b border-white/5">
                    <button 
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {sidebarCollapsed ? <Sidebar size={16} className="text-cyan-400" /> : <PanelLeftClose size={16} className="text-cyan-400" />}
                    </button>
                </div>

                {/* Spaces */}
                {!sidebarCollapsed && (
                    <div className="p-2">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="w-3 h-3 rounded-full bg-cyan-400" />
                            <span className="text-xs font-medium text-cyan-300">Portfolio</span>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex-1 p-2">
                    {tabs.map(tab => (
                        <div 
                            key={tab.id}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                                activeTab === tab.id 
                                    ? 'bg-cyan-500/20 border border-cyan-500/30' 
                                    : 'hover:bg-white/5'
                            }`}
                        >
                            <span className="text-base">{tab.icon}</span>
                            {!sidebarCollapsed && (
                                <span className="text-xs text-white/80 truncate">{tab.title}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Actions */}
                {!sidebarCollapsed && (
                    <div className="p-2 border-t border-white/5">
                        <div className="flex items-center gap-2 p-2 text-white/50 text-xs">
                            <Star size={12} />
                            <span>Favorites</span>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* URL Bar */}
                <div className="flex items-center gap-2 p-2 border-b border-white/10 bg-black/20">
                    {/* Navigation */}
                    <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40">
                            <ChevronLeft size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40">
                            <ChevronRight size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40">
                            <RotateCcw size={14} />
                        </button>
                    </div>

                    {/* URL Input */}
                    <div 
                        className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(34, 211, 238, 0.2)',
                        }}
                    >
                        <Lock size={12} className="text-cyan-400" />
                        <span className="text-xs text-white/60">https://</span>
                        <span className="text-xs text-white font-medium">ayaan.dev</span>
                        <span className="text-xs text-white/60">/about</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40">
                            <Share2 size={14} />
                        </button>
                    </div>
                </div>

                {/* Page Content - Original About Design */}
                <div className="flex-1 overflow-auto">
                    <div 
                        className="min-h-full p-6"
                        style={{
                            background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 100%)',
                        }}
                    >
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-8"
                        >
                            <h2 className="text-3xl font-bold mb-3 text-white">
                                About <span className="text-cyan-400">Me</span>
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full"></div>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
                            {/* Avatar */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="flex-shrink-0"
                            >
                                <div className="relative w-48 h-48 group">
                                    {/* Animated Border */}
                                    <div 
                                        className="absolute inset-0 rounded-full opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: 'linear-gradient(45deg, #22d3ee, #a855f7, #ec4899, #22d3ee)',
                                            backgroundSize: '400% 400%',
                                            animation: 'gradient-spin 3s ease infinite',
                                        }}
                                    />
                                    <div 
                                        className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#0a0a1a] z-10 flex items-center justify-center text-7xl"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                                        }}
                                    >
                                        👨‍💻
                                    </div>

                                    {/* Floating Badge */}
                                    <motion.div
                                        className="absolute -bottom-2 -right-2 p-2 rounded-xl shadow-lg border border-cyan-500/20 z-20"
                                        style={{
                                            background: 'rgba(10, 10, 30, 0.9)',
                                        }}
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <span className="text-xl">🚀</span>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex-1"
                            >
                                <h3 className="text-xl font-bold mb-3 text-white">
                                    Aspiring Developer | Tech Enthusiast
                                </h3>

                                <div className="text-sm text-white/70 mb-4 leading-relaxed min-h-[60px]">
                                    <TypingEffect text="Hi, I'm Ayaan! I'm a 10th-grade student based in Singapore with a burning passion for technology. I started my coding journey exploring how things work, and now I'm building full-stack applications and experimenting with AI." />
                                </div>

                                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                                    When I&apos;m not coding, you can find me gaming, exploring new tech
                                    trends, or working on my next big idea. I believe in learning by
                                    doing and am always looking for new challenges.
                                </p>

                                {/* Fun Facts */}
                                <div className="grid grid-cols-2 gap-3">
                                    {funFacts.map((fact, index) => (
                                        <FlipCard key={index} fact={fact} />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for gradient animation */}
            <style jsx>{`
                @keyframes gradient-spin {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
}
