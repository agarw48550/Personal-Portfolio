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
                                viewport={{ once: true }}
                                className="grid grid-cols-2 gap-4"
                            >
                                {category.items.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        variants={item}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center gap-3 group"
                                    >
                                        <div className="text-4xl text-gray-400 group-hover:text-primary transition-colors duration-300">
                                            <skill.icon />
                                        </div>
                                        <span className="font-medium text-foreground">{skill.name}</span>
                                        <span className="text-xs text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                                            {skill.level}
                                        </span>
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
