"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
}

// Word-by-word reveal animation
export function TextReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    once = true,
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    // Convert children to string and split into words
    const text = typeof children === "string" ? children : "";
    const words = text.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: delay,
            },
        },
    };

    const wordVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: duration,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`inline-flex flex-wrap ${className}`}
            style={{ perspective: "1000px" }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-[0.25em]"
                    style={{ transformOrigin: "center bottom" }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Mask reveal animation for headings
interface MaskRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    once?: boolean;
}

export function MaskReveal({
    children,
    className = "",
    delay = 0,
    once = true,
}: MaskRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}

// Character-by-character reveal
interface CharRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    once?: boolean;
}

export function CharReveal({
    text,
    className = "",
    delay = 0,
    staggerDelay = 0.02,
    once = true,
}: CharRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const characters = text.split("");

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const charVariants = {
        hidden: {
            opacity: 0,
            y: 50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
            aria-label={text}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={charVariants}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}

export default TextReveal;
