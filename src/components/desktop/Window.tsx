'use client';

import React, { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
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
                    style={{ zIndex: windowState.zIndex }}
                    className={cn(
                        "flex flex-col overflow-hidden rounded-lg shadow-2xl border border-white/10 backdrop-blur-xl transition-all duration-200",
                        windowState.isMaximized ? "rounded-none border-none" : ""
                    )}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full w-full bg-[#16213e]/95 text-white"
                    >
                        {/* Window Header */}
                        <div
                            className="h-10 flex items-center justify-between px-4 bg-[#0f3460] select-none cursor-default"
                            onDoubleClick={() => maximizeWindow(id)}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-200">{windowState.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <Minus size={14} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    {windowState.isMaximized ? <Square size={12} /> : <Maximize2 size={12} />}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                                    className="p-1.5 hover:bg-red-500/80 rounded-full transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Window Content */}
                        <div className="flex-1 overflow-auto relative">
                            {children}
                        </div>
                    </motion.div>
                </Rnd>
            )}
        </AnimatePresence>
    );
}
