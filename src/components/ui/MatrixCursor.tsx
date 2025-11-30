'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MatrixCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Hide default cursor globally */}
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
            `}</style>

            {/* Outer ring */}
            <motion.div
                className="fixed pointer-events-none z-[99999] rounded-full border border-cyan-400/50"
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isClicking ? 0.8 : 1,
                    borderColor: isClicking ? 'rgba(34, 211, 238, 0.8)' : 'rgba(34, 211, 238, 0.5)',
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
                style={{
                    width: 40,
                    height: 40,
                }}
            />

            {/* Inner dot */}
            <motion.div
                className="fixed pointer-events-none z-[99999] rounded-full"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    scale: isClicking ? 1.5 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 1000,
                    damping: 35,
                }}
                style={{
                    width: 8,
                    height: 8,
                    background: 'linear-gradient(135deg, #22d3ee, #ffffff)',
                    boxShadow: '0 0 15px rgba(34, 211, 238, 0.8), 0 0 30px rgba(34, 211, 238, 0.4)',
                }}
            />

            {/* Matrix character that follows cursor */}
            <motion.div
                className="fixed pointer-events-none z-[99998] font-mono text-cyan-400 text-xs"
                animate={{
                    x: position.x + 15,
                    y: position.y - 15,
                    opacity: isClicking ? 1 : 0.6,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                }}
                style={{
                    textShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
                }}
            >
                ネオ
            </motion.div>
        </>
    );
}
