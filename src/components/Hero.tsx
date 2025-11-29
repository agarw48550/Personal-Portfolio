"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import { FiArrowDown } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-dark-bg dark:via-purple-950 dark:to-indigo-950">
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                {/* 3D Floating Shapes (CSS) */}
                <div className="absolute top-20 right-20 w-20 h-20 border-4 border-white/20 rounded-xl animate-float opacity-50 rotate-12"></div>
                <div className="absolute bottom-40 left-20 w-16 h-16 border-4 border-cyan-400/20 rounded-full animate-float opacity-50 animation-delay-2000"></div>
                <div className="absolute top-1/2 right-10 w-12 h-12 bg-pink-500/20 rotate-45 animate-float opacity-50 animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl md:text-2xl text-cyan-400 font-mono mb-4">
                        Hello, World! 👋
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Ayaan Agarwal</span>
                    </h1>

                    <div className="h-12 md:h-16 text-2xl md:text-4xl text-gray-300 font-light mb-8">
                        <AnimatedText
                            text={[
                                "I Build Cool Stuff",
                                "Aspiring Developer",
                                "Future Tech Leader",
                                "Tech Enthusiast",
                            ]}
                            repeatDelay={2000}
                        />
                    </div>

                    <div className="flex justify-center space-x-6 mb-12">
                        {[
                            { icon: FaGithub, href: "https://github.com" },
                            { icon: FaLinkedin, href: "https://linkedin.com" },
                            { icon: FaEnvelope, href: "mailto:hello@example.com" },
                        ].map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-white hover:text-cyan-400 text-3xl transition-colors"
                            >
                                <item.icon />
                            </motion.a>
                        ))}
                    </div>

                    <motion.a
                        href="#about"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-all"
                    >
                        Explore My Work
                    </motion.a>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <FiArrowDown size={32} />
            </motion.div>
        </section>
    );
}
