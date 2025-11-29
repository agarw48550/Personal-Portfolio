"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import AnimatedText from "./AnimatedText";
import { FiArrowDown } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import CustomCursor from "./CustomCursor";
import { useEffect, useState, MouseEvent } from "react";

// Particle component for background effect
const Particle = ({ delay }: { delay: number }) => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomDuration = 10 + Math.random() * 20;

    return (
        <motion.div
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{ x: `${randomX}vw`, y: `${randomY}vh`, opacity: 0 }}
            animate={{
                y: [0, -100, 0],
                opacity: [0, 0.5, 0],
                scale: [0, 1.5, 0],
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
            }}
        />
    );
};

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const [mounted, setMounted] = useState(false);

    // Spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        setMounted(true);

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(139, 92, 246, 0.15),
    transparent 80%
  )`;

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-dark-bg">
            {mounted && <CustomCursor />}

            {/* Spotlight Effect */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ background }}
            />

            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-black dark:via-purple-950 dark:to-indigo-950 animate-gradient-xy opacity-80 z-[-2]"></div>

            {/* Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <Particle key={i} delay={i * 0.5} />
                ))}
            </div>

            {/* Animated Background Shapes */}
            <motion.div style={{ y: y1 }} className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
            </motion.div>

            {/* Floating Code Snippets */}
            <motion.div style={{ y: y2 }} className="absolute inset-0 pointer-events-none opacity-20 font-mono text-sm text-cyan-400 hidden md:block z-0">
                <motion.div
                    className="absolute top-20 right-20 rotate-12 bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-white/10"
                    animate={{ y: [0, -20, 0], rotate: [12, 15, 12] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    {`const passion = "coding";`}
                </motion.div>
                <motion.div
                    className="absolute bottom-40 left-20 -rotate-12 bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-white/10"
                    animate={{ y: [0, 20, 0], rotate: [-12, -15, -12] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    {`while(alive) { build(); }`}
                </motion.div>
                <motion.div
                    className="absolute top-1/2 left-10 rotate-6 bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-white/10"
                    animate={{ y: [0, -15, 0], rotate: [6, 3, 6] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                    {`git commit -m "Future"`}
                </motion.div>
            </motion.div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mb-6 inline-block"
                    >
                        <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-sm font-mono tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                            🚀 WELCOME TO MY UNIVERSE
                        </span>
                    </motion.div>

                    {/* Gradient Text Animation */}
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                        I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text bg-[length:200%_auto]">Ayaan</span>
                    </h1>

                    <div className="h-16 md:h-20 text-3xl md:text-5xl text-gray-300 font-light mb-10 flex items-center justify-center">
                        <AnimatedText
                            text={[
                                "I Build Cool Stuff 💻",
                                "Aspiring Developer 🚀",
                                "Future Tech Leader 🌟",
                                "AI Enthusiast 🤖",
                            ]}
                            repeatDelay={2000}
                            className="font-mono"
                        />
                    </div>

                    <motion.div
                        className="flex justify-center space-x-8 mb-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
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
                                whileHover={{ scale: 1.2, rotate: 10, color: "#06B6D4" }}
                                whileTap={{ scale: 0.9 }}
                                className="text-white/80 hover:text-white text-4xl transition-colors cursor-none-target"
                            >
                                <item.icon />
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <a
                            href="#projects"
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-transparent font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                            <span className="relative inline-block px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg group-hover:shadow-purple-500/50 group-hover:scale-105 transition-transform duration-200">
                                Explore My Work
                            </span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-xs uppercase tracking-widest">Scroll Down</span>
                <FiArrowDown size={24} />
            </motion.div>
        </section>
    );
}
