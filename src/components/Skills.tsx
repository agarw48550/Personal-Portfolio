"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

// Circular Progress Component
const CircularProgress = ({ level, color }: { level: string; color: string }) => {
    const percentage = level === "Advanced" ? 100 : level === "Intermediate" ? 66 : 33;
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="transform -rotate-90 w-12 h-12">
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    className="text-gray-200 dark:text-gray-700"
                />
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke={color}
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-[10px] font-bold text-gray-500 dark:text-gray-400">
                {percentage}%
            </span>
        </div>
    );
};

export default function Skills() {
    return (
        <section id="skills" className="py-20 bg-white dark:bg-dark-bg transition-colors">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4 text-foreground">
                        Tech <span className="text-primary">Stack</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skills.map((category, catIndex) => (
                        <div key={catIndex} className="space-y-6">
                            <h3 className="text-xl font-bold text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {category.category}
                            </h3>
                            <motion.div
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-50px" }}
                                className="grid grid-cols-1 gap-4"
                            >
                                {category.items.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        variants={item}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between group relative overflow-hidden"
                                    >
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

                                        <div className="flex items-center gap-4">
                                            <motion.div
                                                className="text-3xl text-gray-400 group-hover:text-primary transition-colors duration-300"
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                                            >
                                                <skill.icon />
                                            </motion.div>
                                            <span className="font-medium text-foreground text-lg">{skill.name}</span>
                                        </div>

                                        <CircularProgress
                                            level={skill.level}
                                            color={
                                                category.category.includes("Languages") ? "#8B5CF6" :
                                                    category.category.includes("Frameworks") ? "#06B6D4" : "#EC4899"
                                            }
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
