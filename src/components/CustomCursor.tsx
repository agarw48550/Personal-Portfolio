"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState<string>("hero");
    const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true to prevent flash
    
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Trailing effect with slower spring
    const trailX = useSpring(cursorX, { damping: 50, stiffness: 200 });
    const trailY = useSpring(cursorY, { damping: 50, stiffness: 200 });

    // Get cursor color based on current section
    const getCursorColor = () => {
        switch (currentSection) {
            case "hero":
                return "#8B5CF6"; // purple
            case "projects":
                return "#06B6D4"; // cyan
            case "skills":
                return "#EC4899"; // pink
            case "contact":
                return "#10B981"; // green
            default:
                return "#8B5CF6";
        }
    };

    // Set mounted state
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Check if touch device
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(isTouch);
        
        if (isTouch) {
            setIsVisible(false);
            return;
        }

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-none-target") ||
                target.getAttribute("role") === "button"
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        // Track which section the cursor is in
        const handleScroll = () => {
            const sections = ["hero", "about", "projects", "skills", "timeline", "contact"];
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setCurrentSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [mounted, cursorX, cursorY]);

    // Don't render until mounted or on touch devices
    if (!mounted || isTouchDevice) {
        return null;
    }

    return (
        <>
            {/* Main Cursor */}
            <motion.div
                className="custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    scale: isHovered ? 2.5 : 1,
                    backgroundColor: isHovered ? `${getCursorColor()}33` : "transparent",
                    borderColor: isHovered ? "transparent" : getCursorColor(),
                    borderWidth: isHovered ? 0 : 2,
                }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{ backgroundColor: getCursorColor() }}
                    animate={{
                        scale: isHovered ? 0 : 1,
                    }}
                />
            </motion.div>

            {/* Trailing Dot */}
            <motion.div
                className="cursor-trail fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9998] opacity-50"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: 12,
                    translateY: 12,
                    opacity: isVisible ? 0.5 : 0,
                }}
            />
        </>
    );
}
