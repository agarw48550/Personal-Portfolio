import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHaptics } from '@/hooks/useHaptics';
import { useSounds } from '@/hooks/useSounds';
import { Battery, Signal, Wifi, Menu, ChevronLeft, User, Briefcase, Code, Mail, BookOpen, Edit3 } from 'lucide-react';
import MobileAbout from './apps/MobileAbout';
import MobileProjects from './apps/MobileProjects';
import MobileSkills from './apps/MobileSkills';
import MobileContact from './apps/MobileContact';
import MobileBlog from './apps/MobileBlog';

// Simple pixel-art style icons using Lucide for now, but styled to look retro
const APPS = [
    { id: 'about', name: 'About', icon: User, color: '#ff7675' },
    { id: 'projects', name: 'Projects', icon: Briefcase, color: '#74b9ff' },
    { id: 'skills', name: 'Skills', icon: Code, color: '#55efc4' },
    { id: 'blog', name: 'Blog', icon: Edit3, color: '#fab1a0' },
    { id: 'contact', name: 'Contact', icon: Mail, color: '#fdcb6e' },
];

export default function RetroPhone() {
    const { triggerHaptic } = useHaptics();
    const { playSound } = useSounds();
    const [activeApp, setActiveApp] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleAppClick = (appId: string) => {
        if (navigator.vibrate) navigator.vibrate(10); // Direct haptic call
        triggerHaptic('retroClick');
        playSound('retroBeep');
        setActiveApp(appId);
    };

    const handleBack = () => {
        if (navigator.vibrate) navigator.vibrate(10);
        triggerHaptic('retroClick');
        playSound('close');
        setActiveApp(null);
    };

    return (
        <div className="min-h-screen bg-[#c7d5e0] p-4 flex items-center justify-center font-retro text-[#2d3436]">
            {/* Phone Frame */}
            <div className="w-full max-w-sm bg-[#dfe6e9] rounded-[30px] p-4 shadow-xl border-4 border-[#b2bec3] relative">

                {/* Screen */}
                <div className="bg-[#9cb0a5] rounded-lg h-[600px] overflow-hidden relative retro-screen-effect border-4 border-[#636e72] shadow-inner flex flex-col">

                    {/* Status Bar */}
                    <div className="h-8 bg-[#2d3436] text-[#9cb0a5] flex items-center justify-between px-2 text-xs font-mono">
                        <div className="flex gap-1">
                            <Signal size={14} />
                            <span className="text-[10px]">AYAAN-TEL</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span>{currentTime}</span>
                            <Battery size={14} />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-4 overflow-y-auto relative">
                        {!activeApp ? (
                            // Home Screen
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                {APPS.map((app) => (
                                    <motion.button
                                        key={app.id}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleAppClick(app.id)}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <div
                                            className="w-14 h-14 bg-[#2d3436] rounded-xl flex items-center justify-center text-[#9cb0a5] border-b-4 border-r-4 border-black/20 active:border-0 active:translate-y-1 transition-all"
                                        >
                                            <app.icon size={24} />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider">{app.name}</span>
                                    </motion.button>
                                ))}
                            </div>
                        ) : (
                            // App View
                            <div className="h-full flex flex-col">
                                <div className="flex items-center gap-2 mb-4 border-b-2 border-[#2d3436] pb-2 sticky top-0 bg-[#9cb0a5] z-10 pt-2">
                                    <button onClick={handleBack} className="p-1 hover:bg-[#2d3436]/10 rounded active:scale-90 transition-transform">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <h2 className="text-lg font-bold uppercase">{APPS.find(a => a.id === activeApp)?.name}</h2>
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    {activeApp === 'about' && <MobileAbout />}
                                    {activeApp === 'projects' && <MobileProjects />}
                                    {activeApp === 'skills' && <MobileSkills />}
                                    {activeApp === 'contact' && <MobileContact />}
                                    {activeApp === 'blog' && <MobileBlog />}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Nav (Soft Keys) */}
                    <div className="h-12 bg-[#2d3436] text-[#9cb0a5] flex items-center justify-between px-4 text-sm font-bold border-t-2 border-[#9cb0a5]/20">
                        <button onClick={activeApp ? handleBack : undefined} className="active:text-white">
                            {activeApp ? 'BACK' : 'MENU'}
                        </button>
                        <button className="active:text-white">SELECT</button>
                    </div>
                </div>

                {/* Physical Keys (Visual Only) */}
                <div className="mt-4 grid grid-cols-3 gap-2 px-8">
                    <div className="h-2 bg-[#b2bec3] rounded-full col-span-3 mb-2" />
                    {/* Just visual decoration for the 'phone' look */}
                </div>

            </div>
        </div>
    );
}
