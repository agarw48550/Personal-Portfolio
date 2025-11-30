'use client';

import React from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppId } from '@/lib/store';
import { User, Briefcase, Code, Mail, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'contact', icon: Mail, label: 'Contact' },
] as const;

export default function BottomNav() {
    const { activeWindowId, openWindow, closeWindow } = useWindowManager();

    const handleNavClick = (id: string) => {
        if (id === 'home') {
            // Close all windows to show home screen
            if (activeWindowId) closeWindow(activeWindowId);
        } else {
            openWindow(id as AppId);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#16213e]/95 backdrop-blur-xl border-t border-white/10 pb-safe z-50">
            <div className="flex justify-around items-center p-2">
                {navItems.map((item) => {
                    const isActive = item.id === 'home' ? !activeWindowId : activeWindowId === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors w-16",
                                isActive ? "text-blue-400" : "text-gray-400 hover:text-gray-200"
                            )}
                        >
                            <item.icon size={24} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
