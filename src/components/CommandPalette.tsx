"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiCommand, FiHome, FiUser, FiCode, FiCpu, FiMail, FiMoon, FiSun } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

const actions = [
    { id: "home", label: "Home", icon: FiHome, href: "#" },
    { id: "about", label: "About Me", icon: FiUser, href: "#about" },
    { id: "projects", label: "Projects", icon: FiCode, href: "#projects" },
    { id: "skills", label: "Skills", icon: FiCpu, href: "#skills" },
    { id: "contact", label: "Contact", icon: FiMail, href: "#contact" },
];

export default function CommandPalette() {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const { theme, setTheme } = useStore();

    const filteredActions = actions.filter((action) =>
        action.label.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = useCallback((href: string) => {
        router.push(href);
        setIsOpen(false);
        setQuery("");
    }, [router]);

    const toggleTheme = useCallback(() => {
        setTheme(theme === "dark" ? "light" : "dark");
        setIsOpen(false);
        setQuery("");
    }, [theme, setTheme]);

    // Set mounted state
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mounted]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!mounted || !isOpen) return;

        const handleNavigation = (e: KeyboardEvent) => {
            const totalItems = filteredActions.length + 1; // +1 for theme toggle

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % totalItems);
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
            }
            if (e.key === "Enter") {
                e.preventDefault();
                if (selectedIndex < filteredActions.length) {
                    handleSelect(filteredActions[selectedIndex].href);
                } else {
                    toggleTheme();
                }
            }
        };

        window.addEventListener("keydown", handleNavigation);
        return () => window.removeEventListener("keydown", handleNavigation);
    }, [mounted, isOpen, selectedIndex, filteredActions, handleSelect, toggleTheme]);

    // Reset selected index when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => {
                            setIsOpen(false);
                            setQuery("");
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-[calc(100%-2rem)] sm:max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                        <div className="flex items-center px-3 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                            <FiSearch className="text-gray-400 mr-2 sm:mr-3 flex-shrink-0" size={18} />
                            <input
                                type="text"
                                placeholder="Type a command or search..."
                                className="w-full bg-transparent border-none focus:outline-none text-base sm:text-lg text-foreground placeholder-gray-400"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                            <div className="hidden sm:flex items-center text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex-shrink-0">
                                <span className="mr-1">ESC</span> to close
                            </div>
                        </div>

                        <div className="max-h-[50vh] sm:max-h-[300px] overflow-y-auto p-2">
                            <div className="text-xs font-semibold text-gray-400 px-2 py-1 mb-1 uppercase tracking-wider">
                                Navigation
                            </div>
                            {filteredActions.map((action, index) => (
                                <button
                                    key={action.id}
                                    onClick={() => handleSelect(action.href)}
                                    className={`w-full flex items-center px-3 py-2.5 sm:py-2 rounded-lg text-left text-foreground transition-colors group ${selectedIndex === index
                                        ? "bg-primary/10 text-primary"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <action.icon className={`mr-3 flex-shrink-0 ${selectedIndex === index ? "text-primary" : "text-gray-400 group-hover:text-primary"
                                        }`} />
                                    <span className="text-sm sm:text-base">{action.label}</span>
                                </button>
                            ))}

                            {filteredActions.length === 0 && (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    No results found.
                                </div>
                            )}

                            <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>

                            <div className="text-xs font-semibold text-gray-400 px-2 py-1 mb-1 uppercase tracking-wider">
                                Settings
                            </div>
                            <button
                                onClick={toggleTheme}
                                className={`w-full flex items-center px-3 py-2.5 sm:py-2 rounded-lg text-left text-foreground transition-colors group ${selectedIndex === filteredActions.length
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                {theme === "dark" ? (
                                    <FiSun className={`mr-3 flex-shrink-0 ${selectedIndex === filteredActions.length ? "text-yellow-500" : "text-gray-400 group-hover:text-yellow-500"
                                        }`} />
                                ) : (
                                    <FiMoon className={`mr-3 flex-shrink-0 ${selectedIndex === filteredActions.length ? "text-purple-500" : "text-gray-400 group-hover:text-purple-500"
                                        }`} />
                                )}
                                <span className="text-sm sm:text-base">Toggle Theme</span>
                            </button>
                        </div>

                        <div className="px-3 sm:px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                                <FiCommand className="mr-1" size={12} />
                                <span>+ K to open</span>
                            </div>
                            <div className="hidden sm:block">
                                ↑↓ to navigate • Enter to select
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
