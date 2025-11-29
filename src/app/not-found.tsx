"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 overflow-hidden relative">
            {/* Glitch Background Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] w-full bg-white"
                        initial={{ top: `${Math.random() * 100}%`, opacity: 0 }}
                        animate={{
                            top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 0.2 + Math.random() * 0.5,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center z-10"
            >
                <div className="relative inline-block">
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse">
                        404
                    </h1>
                    <motion.div
                        className="absolute inset-0 text-9xl font-bold text-cyan-400 opacity-50 mix-blend-screen"
                        animate={{ x: [-2, 2, -2], y: [1, -1, 1] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    >
                        404
                    </motion.div>
                    <motion.div
                        className="absolute inset-0 text-9xl font-bold text-pink-500 opacity-50 mix-blend-screen"
                        animate={{ x: [2, -2, 2], y: [-1, 1, -1] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                    >
                        404
                    </motion.div>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold mb-6 mt-4 font-mono">
                    SYSTEM FAILURE: PAGE MISSING
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto font-mono">
                    The coordinates you entered point to a void in the digital universe.
                    Initiating emergency return protocol...
                </p>

                <Link
                    href="/"
                    className="inline-block px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-cyan-400 hover:text-black transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                >
                    RETURN HOME
                </Link>
            </motion.div>
        </div>
    );
}
