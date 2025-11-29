"use client";

import { motion, useInView } from "framer-motion";
import { funFacts } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

// Typing Animation Component
const TypingEffect = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView && currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 30); // Typing speed
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, isInView, text]);

    return (
        <span ref={ref}>
            {displayedText}
            <span className="animate-pulse text-primary">|</span>
        </span>
    );
};

// Flip Card Component
const FlipCard = ({ fact }: { fact: { title: string; description: string } }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full h-24 sm:h-32 cursor-pointer perspective-1000"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center p-3 sm:p-4">
                    <h4 className="font-bold text-primary text-base sm:text-lg">{fact.title}</h4>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-primary to-accent rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center p-3 sm:p-4 text-center"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <p className="text-xs sm:text-sm text-white font-medium">{fact.description}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default function About() {
    return (
        <section id="about" className="py-16 sm:py-20 bg-white dark:bg-dark-bg transition-colors overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                        About <span className="text-primary">Me</span>
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
                    {/* Left Side: Image/Avatar */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 flex justify-center"
                    >
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 group">
                            {/* Animated Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-900 z-10 transform hover:-rotate-3 transition-transform duration-300">
                                {/* Placeholder for Avatar */}
                                <div className="w-full h-full flex items-center justify-center text-6xl sm:text-7xl md:text-8xl bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                                    👨‍💻
                                </div>
                                {/* <Image src="/images/avatar.jpg" alt="Ayaan Agarwal" fill className="object-cover" /> */}
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-20"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span className="text-xl sm:text-2xl">🚀</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side: Text & Facts */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground text-center md:text-left">
                            Aspiring Developer | Tech Enthusiast
                        </h3>

                        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed min-h-[80px] sm:min-h-[100px]">
                            <TypingEffect text="Hi, I'm Ayaan! I'm a 10th-grade student based in Singapore with a burning passion for technology. I started my coding journey exploring how things work, and now I'm building full-stack applications and experimenting with AI." />
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                            When I&apos;m not coding, you can find me gaming, exploring new tech
                            trends, or working on my next big idea. I believe in learning by
                            doing and am always looking for new challenges.
                        </p>

                        {/* Fun Facts Cards (Flip Effect) - Mobile responsive */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {funFacts.map((fact, index) => (
                                <FlipCard key={index} fact={fact} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
