import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHaptics } from '@/hooks/useHaptics';
import { useSounds } from '@/hooks/useSounds';
import { Battery, Wifi, Signal, Globe, Moon, Sun, ChevronDown, User, Briefcase, Code, Mail, BookOpen, Edit3 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import Image from 'next/image';

// App Components
import MobileProjects from './apps/MobileProjects';
import MobileAbout from './apps/MobileAbout';
import MobileSkills from './apps/MobileSkills';
import MobileContact from './apps/MobileContact';
import MobileBlog from './apps/MobileBlog';

export default function RetroPhone() {
    const { triggerHaptic } = useHaptics();
    const { playSound } = useSounds();
    const { t, language, setLanguage } = useLanguage();
    const { theme, setTheme } = useStore();
    const [activeApp, setActiveApp] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState('');
    const [showControlCenter, setShowControlCenter] = useState(false);

    // Swipe Detection
    const touchStart = useRef<{ x: number, y: number } | null>(null);

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

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart.current) return;

        const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        const deltaX = touchEnd.x - touchStart.current.x;
        const deltaY = touchEnd.y - touchStart.current.y;

        // Swipe Down (positive Y delta) from Top Right (start X > screen width * 0.5)
        const screenWidth = window.innerWidth;
        // This logic needs to be relative to the phone frame, not window.innerWidth
        // For simplicity, let's assume the phone frame is centered and roughly 375px wide on mobile
        const phoneFrameWidth = 375; // Approximate max-w-sm
        const isTopRight = touchStart.current.x > (screenWidth / 2 + phoneFrameWidth / 4) && touchStart.current.y < 100; // top 100px of the screen

        if (deltaY > 50 && isTopRight) {
            setShowControlCenter(true);
        } else if (deltaY < -50 && showControlCenter) {
            setShowControlCenter(false);
        }

        touchStart.current = null;
    };

    // App Config with Translated Labels
    const APP_CONFIG = [
        { id: 'about', name: t.apps.about, icon: User, color: '#ff7675', component: MobileAbout },
        { id: 'projects', name: t.apps.projects, icon: Briefcase, color: '#74b9ff', component: MobileProjects },
        { id: 'skills', name: t.apps.skills, icon: Code, color: '#55efc4', component: MobileSkills },
        { id: 'blog', name: t.apps.blogs, icon: Edit3, color: '#fab1a0', component: MobileBlog },
        { id: 'contact', name: t.apps.contact, icon: Mail, color: '#fdcb6e', component: MobileContact },
        // { id: 'stringsync', name: t.apps.stringsync, icon: '🎸', color: 'bg-red-500', component: null, isLink: '/stringsync' }, // Removed for retro phone context
    ];

    const cycleLanguage = () => {
        const next = language === 'en' ? 'zh' : language === 'zh' ? 'hi' : 'en';
        setLanguage(next);
    };

    const ActiveComponent = activeApp ? APP_CONFIG.find(app => app.id === activeApp)?.component : null;

    return (
        <div className="min-h-screen bg-[#c7d5e0] p-4 flex items-center justify-center font-retro text-[#2d3436]">
            {/* Phone Frame */}
            <div
                className="w-full max-w-sm bg-[#dfe6e9] rounded-[30px] p-4 shadow-xl border-4 border-[#b2bec3] relative"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >

                {/* Screen */}
                <div className="bg-[#9cb0a5] rounded-lg h-[600px] overflow-hidden relative retro-screen-effect border-4 border-[#636e72] shadow-inner flex flex-col">

                    {/* Status Bar */}
                    <div className="h-8 bg-[#2d3436] text-[#9cb0a5] flex items-center justify-between px-2 text-xs font-mono">
                        <div className="flex gap-1">
                            <Signal size={14} />
                            <span className="text-[10px]">{t.mobile.carrier}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span>{currentTime}</span>
                            <Wifi size={14} />
                            <Battery size={14} />
                        </div>
                    </div>

                    {/* Hint for Control Center */}
                    <div className="absolute top-8 right-4 w-10 h-1 bg-[#9cb0a5]/50 rounded-full z-10 opacity-50" />

                    {/* Control Center Overlay */}
                    <AnimatePresence>
                        {showControlCenter && (
                            <motion.div
                                initial={{ y: '-100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm"
                                onClick={() => setShowControlCenter(false)}
                            >
                                <div
                                    className="bg-[#dfe6e9] rounded-b-3xl p-6 shadow-2xl pt-12 text-[#2d3436]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold">Control Center</h3>
                                        <button onClick={() => setShowControlCenter(false)} className="p-2">
                                            <ChevronDown size={20} className="text-[#636e72]" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Language Toggle */}
                                        <button
                                            onClick={cycleLanguage}
                                            className="flex flex-col items-center justify-center gap-3 p-4 bg-[#b2bec3] rounded-2xl active:scale-95 transition-transform"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-[#0984e3] text-white flex items-center justify-center">
                                                <Globe size={20} />
                                            </div>
                                            <span className="font-medium">{language === 'en' ? 'English' : language === 'zh' ? '中文' : 'हिंदी'}</span>
                                        </button>

                                        {/* Theme Toggle */}
                                        <button
                                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                            className="flex flex-col items-center justify-center gap-3 p-4 bg-[#b2bec3] rounded-2xl active:scale-95 transition-transform"
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${theme === 'dark' ? 'bg-[#6c5ce7]' : 'bg-[#fdcb6e]'}`}>
                                                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                                            </div>
                                            <span className="font-medium">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Content */}
                    <div className="flex-1 p-4 overflow-y-auto relative">
                        {!activeApp ? (
                            // Home Screen
                            <div className="grid grid-cols-3 gap-4 mt-8 justify-items-center">
                                {APP_CONFIG.map((app) => (
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
                                        <span className="text-xs font-bold uppercase tracking-wider">
                                            {app.name}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>
                        ) : (
                            // App View
                            <div className="h-full flex flex-col">
                                <div className="flex items-center gap-2 mb-4 border-b-2 border-[#2d3436] pb-2 sticky top-0 bg-[#9cb0a5] z-10 pt-2">
                                    <button onClick={handleBack} className="p-1 hover:bg-[#2d3436]/10 rounded active:scale-90 transition-transform">
                                        <User size={20} /> {/* Changed to User icon for consistency with retro theme */}
                                    </button>
                                    <h2 className="text-lg font-bold uppercase">
                                        {APP_CONFIG.find(a => a.id === activeApp)?.name}
                                    </h2>
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
                            {activeApp ? t.common.back.toUpperCase() : t.common.menu.toUpperCase()}
                        </button>
                        <button className="active:text-white">{t.common.select.toUpperCase()}</button>
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
