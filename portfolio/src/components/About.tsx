"use client";

import { motion } from "framer-motion";
import { funFacts } from "@/lib/data";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-20 bg-white dark:bg-dark-bg transition-colors">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4 text-foreground">
                        About <span className="text-primary">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Left Side: Image/Avatar */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 flex justify-center"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl rotate-6 opacity-50 blur-lg animate-pulse-slow"></div>
                            <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 transform hover:-rotate-2 transition-transform duration-300">
                                {/* Placeholder for Avatar */}
                                <div className="w-full h-full flex items-center justify-center text-6xl">
                                    👨‍💻
                                </div>
                                {/* <Image src="/images/avatar.jpg" alt="Ayaan Agarwal" fill className="object-cover" /> */}
                            </div>
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
                        <h3 className="text-2xl font-bold mb-4 text-foreground">
                            Aspiring Developer | Tech Enthusiast
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            Hi, I'm Ayaan! I'm a 10th-grade student based in Singapore with a
                            burning passion for technology. I started my coding journey exploring
                            how things work, and now I'm building full-stack applications and
                            experimenting with AI.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            When I'm not coding, you can find me gaming, exploring new tech
                            trends, or working on my next big idea. I believe in learning by
                            doing and am always looking for new challenges.
                        </p>

                        {/* Fun Facts Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {funFacts.map((fact, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
                                >
                                    <h4 className="font-bold text-primary mb-1">{fact.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {fact.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
