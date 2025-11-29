"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import clsx from "clsx";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Close mobile menu on scroll
    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 50);
        if (isOpen && window.scrollY > 100) {
            setIsOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Close menu when clicking outside or pressing escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            // Prevent body scroll when menu is open
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <nav
            className={clsx(
                "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md safe-area-top",
                scrolled
                    ? "bg-white/80 dark:bg-dark-bg/80 shadow-lg py-2"
                    : "bg-transparent py-3 sm:py-4"
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo - slightly smaller on mobile */}
                <Link 
                    href="/" 
                    className="text-xl sm:text-2xl font-bold font-mono text-primary hover:text-primary/80 transition-colors"
                    onClick={handleLinkClick}
                >
                    &lt;Ayaan /&gt;
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <div className="flex space-x-4 lg:space-x-6 relative">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="text-foreground hover:text-primary transition-colors font-medium relative px-2 py-1"
                            >
                                {link.name}
                                {hoveredIndex === index && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute left-0 top-full block h-[2px] w-full bg-primary"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-3 sm:space-x-4">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
                        aria-label="Toggle Menu"
                        aria-expanded={isOpen}
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden bg-white/95 dark:bg-dark-bg/95 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
                        >
                            <div className="flex flex-col items-center py-6 space-y-4">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-foreground hover:text-primary text-lg font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                            onClick={handleLinkClick}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
