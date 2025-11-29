"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
    text: string | string[];
    className?: string;
    once?: boolean;
    repeatDelay?: number;
}

export default function AnimatedText({
    text,
    className = "",
    once = false,
    repeatDelay = 2000,
}: AnimatedTextProps) {
    const textIndex = useMotionValue(0);
    const baseText = useTransform(textIndex, (latest) => {
        if (Array.isArray(text)) {
            return text[Math.round(latest) % text.length];
        }
        return text;
    });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => {
        const currentText = Array.isArray(text)
            ? text[Math.round(textIndex.get()) % text.length]
            : text;
        return currentText.slice(0, latest);
    });
    const [isCursorVisible, setIsCursorVisible] = useState(true);

    useEffect(() => {
        // Cursor blinking effect
        const cursorInterval = setInterval(() => {
            setIsCursorVisible((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        if (Array.isArray(text)) {
            const animateText = async () => {
                for (let i = 0; i < text.length; i++) {
                    textIndex.set(i);
                    const currentText = text[i];
                    await animate(count, currentText.length, {
                        duration: currentText.length * 0.05,
                        ease: "linear",
                    });
                    await new Promise((resolve) => setTimeout(resolve, repeatDelay));
                    if (!once || i < text.length - 1) {
                        await animate(count, 0, {
                            duration: currentText.length * 0.03,
                            ease: "linear",
                        });
                    }
                }
                if (!once) {
                    animateText();
                }
            };
            animateText();
        } else {
            animate(count, text.length, {
                duration: text.length * 0.05,
                ease: "linear",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, once, repeatDelay]);

    return (
        <span className={className}>
            <motion.span>{displayText}</motion.span>
            <span
                className={`${isCursorVisible ? "opacity-100" : "opacity-0"
                    } text-primary font-bold transition-opacity duration-100`}
            >
                |
            </span>
        </span>
    );
}
