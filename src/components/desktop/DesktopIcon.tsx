'use client';

import React from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppId } from '@/lib/store';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
    id: AppId;
    label: string;
    icon: LucideIcon;
}

export default function DesktopIcon({ id, label, icon: Icon }: DesktopIconProps) {
    const { openWindow, windows } = useWindowManager();
    const isOpen = windows[id]?.isOpen;

    return (
        <button
            onClick={() => openWindow(id)}
            className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white/10 transition-colors group w-24",
                isOpen && "bg-white/5"
            )}
        >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Icon className="text-white w-7 h-7" />
            </div>
            <span className="text-white text-xs font-medium drop-shadow-md text-center leading-tight">
                {label}
            </span>
        </button>
    );
}
