"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaArrowUp, FaRocket } from "react-icons/fa";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button after scrolling 500px
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={scrollToTop}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Back to top"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div
                        animate={isHovered ? { y: -5 } : { y: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 10,
                            repeat: isHovered ? Infinity : 0,
                            repeatType: "reverse"
                        }}
                    >
                        {isHovered ? (
                            <FaRocket className="w-5 h-5 sm:w-6 sm:h-6 transform -rotate-45" />
                        ) : (
                            <FaArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                    </motion.div>

                    {/* Pulse ring effect */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-primary/30"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
