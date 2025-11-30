'use client';

import React, { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppId } from '@/lib/store';
import { cn } from '@/lib/utils';

interface WindowProps {
    id: AppId;
    children: React.ReactNode;
}

export default function Window({ id, children }: WindowProps) {
    const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, setWindowPosition, setWindowSize } = useWindowManager();
    const windowState = windows[id];
    const nodeRef = useRef(null);

    if (!windowState.isOpen) return null;

    return (
        <AnimatePresence>
            {!windowState.isMinimized && (
                <Rnd
                    default={{
                        x: windowState.position?.x || 100 + Math.random() * 50,
                        y: windowState.position?.y || 50 + Math.random() * 50,
                        width: windowState.size?.width || 800,
                        height: windowState.size?.height || 600,
                    }}
                    minWidth={320}
                    minHeight={200}
                    bounds="parent"
                    size={windowState.isMaximized ? { width: '100%', height: '100%' } : undefined}
                    position={windowState.isMaximized ? { x: 0, y: 0 } : undefined}
                    disableDragging={windowState.isMaximized}
                    enableResizing={!windowState.isMaximized}
                    onDragStop={(e, d) => {
                        setWindowPosition(id, { x: d.x, y: d.y });
                        focusWindow(id);
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        setWindowSize(id, {
                            width: parseInt(ref.style.width),
                            height: parseInt(ref.style.height)
                        });
                        setWindowPosition(id, position);
                        focusWindow(id);
                    }}
                    onMouseDown={() => focusWindow(id)}
                    style={{ zIndex: windowState.zIndex + 10 }}
                    className={cn(
                        "flex flex-col overflow-hidden rounded-xl",
                        windowState.isMaximized ? "rounded-none" : ""
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
                            windowState.isMaximized ? "rounded-none" : "rounded-xl"
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
                            onDoubleClick={() => maximizeWindow(id)}
                        >
                            {/* Traffic Light Buttons */}
                            <div className="flex items-center gap-2 group">
                                <button
                                    onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                                    className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all flex items-center justify-center"
                                    title="Close"
                                >
                                    <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2">
                                        <path d="M3 3l6 6M9 3l-6 6" />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                                    className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all flex items-center justify-center"
                                    title="Minimize"
                                >
                                    <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2">
                                        <path d="M2 6h8" />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
                                    className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all flex items-center justify-center"
                                    title={windowState.isMaximized ? "Restore" : "Maximize"}
                                >
                                    <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5">
                                        {windowState.isMaximized ? (
                                            <path d="M4 8l4-4M4 4v4h4" />
                                        ) : (
                                            <path d="M2 2h8v8H2z" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Window Title */}
                            <div className="flex-1 flex items-center justify-center">
                                <span className="text-sm font-medium text-cyan-300/70">{windowState.title}</span>
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
