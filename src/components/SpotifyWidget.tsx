"use client";

import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";

export default function SpotifyWidget() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex items-center gap-4 bg-black/5 dark:bg-white/5 backdrop-blur-md p-3 rounded-full border border-black/5 dark:border-white/5 w-fit"
        >
            <div className="relative w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center flex-shrink-0">
                <FaSpotify className="text-white text-2xl" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
            </div>

            <div className="flex flex-col overflow-hidden">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                    Currently Listening
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground truncate max-w-[150px]">
                        Lo-Fi Beats to Code To
                    </span>

                    {/* Equalizer Animation */}
                    <div className="flex items-end gap-[2px] h-3">
                        {[1, 2, 3, 4].map((bar) => (
                            <motion.div
                                key={bar}
                                className="w-[2px] bg-primary rounded-full"
                                animate={{
                                    height: [4, 12, 4],
                                }}
                                transition={{
                                    duration: 0.5 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
