'use client';

import React, { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, AppId } from '@/lib/store';
import { useSounds } from '@/hooks/useSounds';
import { cn } from '@/lib/utils';

import { useLanguage } from '@/lib/i18n';

interface WindowProps {
    id: AppId;
    children: React.ReactNode;
    title?: string;
}

export default function Window({ id, children, title }: WindowProps) {
    const { openApps, minimizedApps, activeApp, closeApp, minimizeApp, focusApp, zIndexes } = useStore();
    const { playSound } = useSounds();
    const { t } = useLanguage();
    const [isMaximized, setIsMaximized] = useState(false);

    const isOpen = openApps.includes(id);
    const isMinimized = minimizedApps.includes(id);
    const zIndex = zIndexes[id] || 10;

    // Resolve title from translations or prop
    // Use type assertion or check to ensure safe access to windowTitles
    const translatedTitle = t.desktop.windowTitles[id as keyof typeof t.desktop.windowTitles];
    const windowTitle = title || translatedTitle || id;

    if (!isOpen) return null;

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
        playSound('click');
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeApp(id);
        playSound('close');
    };

    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        minimizeApp(id);
        playSound('click');
    };

    return (
        <AnimatePresence>
            {!isMinimized && (
                <Rnd
                    default={{
                        x: 100 + Math.random() * 50,
                        y: 50 + Math.random() * 50,
                        width: 800,
                        height: 600,
                    }}
                    minWidth={320}
                    minHeight={200}
                    bounds="parent"
                    size={isMaximized ? { width: '100%', height: '100%' } : undefined}
                    position={isMaximized ? { x: 0, y: 0 } : undefined}
                    disableDragging={isMaximized}
                    enableResizing={!isMaximized}
                    onDragStart={() => {
                        focusApp(id);
                        playSound('drag');
                    }}
                    onResizeStart={() => focusApp(id)}
                    onMouseDown={() => focusApp(id)}
                    style={{ zIndex: zIndex + 10 }}
                    className={cn(
                        "flex flex-col overflow-hidden rounded-xl",
                        isMaximized ? "rounded-none" : ""
                    )}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                            "flex flex-col h-full w-full text-white",
                            "backdrop-blur-2xl backdrop-saturate-150",
                            "border border-cyan-500/20",
                            isMaximized ? "rounded-none" : "rounded-xl"
                        )}
                        style={{
                            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, rgba(15, 15, 25, 0.95) 50%, rgba(10, 10, 15, 0.98) 100%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(34, 211, 238, 0.1)'
                        }}
                    >
                        {/* Window Header - Liquid Glass */}
                        <div
                            className={cn(
                                "h-11 flex items-center px-4 select-none cursor-default flex-shrink-0",
                                "bg-gradient-to-b from-cyan-500/5 to-transparent",
                                "border-b border-cyan-500/10"
                            )}
                            onDoubleClick={handleMaximize}
                        >
                            {/* Traffic Light Buttons */}
                            <div className="flex items-center gap-2 group">
                                <button
                                    onClick={handleClose}
                                    className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all flex items-center justify-center"
                                    title="Close"
                                    aria-label="Close Window"
                                >
                                    <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2">
                                        <path d="M3 3l6 6M9 3l-6 6" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleMinimize}
                                    className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all flex items-center justify-center"
                                    title="Minimize"
                                    aria-label="Minimize Window"
                                >
                                    <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2">
                                        <path d="M2 6h8" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleMaximize}
                                    className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all flex items-center justify-center"
                                    title={isMaximized ? "Restore" : "Maximize"}
                                    aria-label={isMaximized ? "Restore Window" : "Maximize Window"}
                                >
                                    <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5">
                                        {isMaximized ? (
                                            <path d="M4 8l4-4M4 4v4h4" />
                                        ) : (
                                            <path d="M2 2h8v8H2z" />
                                        )}
                                    </svg>
                                </button>
                            </div>

                            {/* Window Title */}
                            <div className="flex-1 flex items-center justify-center">
                                <span className="text-sm font-medium text-cyan-300/70">{windowTitle}</span>
                            </div>

                            <div className="w-[52px]" />
                        </div>

                        {/* Window Content */}
                        <div className="flex-1 overflow-auto relative bg-[#0a0a0f]/90">
                            {children}
                        </div>
                    </motion.div>
                </Rnd>
            )}
        </AnimatePresence>
    );
}
