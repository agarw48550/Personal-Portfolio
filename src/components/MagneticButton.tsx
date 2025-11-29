"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
    disabled?: boolean;
    strength?: number; // How strongly the button moves toward cursor (0-1)
}

export default function MagneticButton({
    children,
    className = "",
    onClick,
    href,
    target,
    rel,
    disabled = false,
    strength = 0.3,
}: MagneticButtonProps) {
    const ref = useRef<HTMLElement>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (isTouchDevice || disabled) return;

        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * strength);
        y.set(distanceY * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const commonProps = {
        ref: ref as React.RefObject<HTMLButtonElement> & React.RefObject<HTMLAnchorElement>,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: { x: xSpring, y: ySpring },
        className: `magnetic-button ${className}`,
    };

    // Render as anchor if href is provided
    if (href) {
        return (
            <motion.a
                {...commonProps}
                href={href}
                target={target}
                rel={rel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {children}
            </motion.a>
        );
    }

    // Render as button
    return (
        <motion.button
            {...commonProps}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
            {children}
        </motion.button>
    );
}
