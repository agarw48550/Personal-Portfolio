"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiCommand, FiHome, FiUser, FiCode, FiCpu, FiMail, FiMoon, FiSun } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const actions = [
    { id: "home", label: "Home", icon: FiHome, href: "#" },
    { id: "about", label: "About Me", icon: FiUser, href: "#about" },
    { id: "projects", label: "Projects", icon: FiCode, href: "#projects" },
    { id: "skills", label: "Skills", icon: FiCpu, href: "#skills" },
    { id: "contact", label: "Contact", icon: FiMail, href: "#contact" },
];

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
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
    }, []);

    const filteredActions = actions.filter((action) =>
        action.label.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (href: string) => {
        router.push(href);
        setIsOpen(false);
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                        <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                            <FiSearch className="text-gray-400 mr-3" size={20} />
                            <input
                                type="text"
                                placeholder="Type a command or search..."
                                className="w-full bg-transparent border-none focus:outline-none text-lg text-foreground placeholder-gray-400"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                            <div className="flex items-center text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                <span className="mr-1">ESC</span> to close
                            </div>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto p-2">
                            <div className="text-xs font-semibold text-gray-400 px-2 py-1 mb-1 uppercase tracking-wider">
                                Navigation
                            </div>
                            {filteredActions.map((action) => (
                                <button
                                    key={action.id}
                                    onClick={() => handleSelect(action.href)}
                                    className="w-full flex items-center px-3 py-2 rounded-lg text-left text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                                >
                                    <action.icon className="mr-3 text-gray-400 group-hover:text-primary" />
                                    <span>{action.label}</span>
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
                                className="w-full flex items-center px-3 py-2 rounded-lg text-left text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                            >
                                {theme === "dark" ? (
                                    <FiSun className="mr-3 text-gray-400 group-hover:text-yellow-500" />
                                ) : (
                                    <FiMoon className="mr-3 text-gray-400 group-hover:text-purple-500" />
                                )}
                                <span>Toggle Theme</span>
                            </button>
                        </div>

                        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                                <FiCommand className="mr-1" />
                                <span>+ K to open</span>
                            </div>
                            <div>
                                Use arrows to navigate
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
