"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { timeline } from "@/lib/data";
import { useRef } from "react";

// Interactive Timeline Dot Component
const TimelineDot = ({ isActive, index }: { isActive: boolean; index: number }) => {
    return (
        <div className="relative">
            {/* Outer ring - pulses when active */}
            <motion.div
                className="absolute -inset-2 rounded-full bg-primary/30"
                animate={isActive ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Main dot */}
            <motion.div
                className="relative w-4 h-4 sm:w-6 sm:h-6 rounded-full border-4 border-white dark:border-gray-900 z-10"
                animate={{
                    backgroundColor: isActive ? "#8B5CF6" : "#D1D5DB",
                    scale: isActive ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
};

// Timeline Entry Component
const TimelineEntry = ({ item, index, totalItems }: { 
    item: { year: string; title: string; description: string }; 
    index: number;
    totalItems: number;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative mb-8 sm:mb-12 last:mb-0"
        >
            {/* Mobile Layout (default) - Timeline on left */}
            <div className="flex md:hidden">
                {/* Left side - Timeline line and dot */}
                <div className="flex flex-col items-center mr-4">
                    <TimelineDot isActive={isInView} index={index} />
                    {/* Connecting line */}
                    {index < totalItems - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2" />
                    )}
                </div>
                
                {/* Right side - Content */}
                <div className="flex-1 pb-8">
                    <motion.div 
                        className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="inline-block px-3 py-1 mb-2 text-xs sm:text-sm font-bold text-white bg-primary rounded-full">
                            {item.year}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                            {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                            {item.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Desktop Layout - Alternating sides */}
            <div className="hidden md:flex items-center justify-between">
                {/* Left Content (for even indexes) */}
                <div className={`w-5/12 ${isEven ? '' : 'order-last'}`}>
                    {isEven && (
                        <motion.div 
                            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.02, x: -5 }}
                        >
                            <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-white bg-primary rounded-full">
                                {item.year}
                            </span>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {item.description}
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Center - Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                    <TimelineDot isActive={isInView} index={index} />
                </div>

                {/* Right Content (for odd indexes) */}
                <div className={`w-5/12 ${isEven ? 'order-last' : ''}`}>
                    {!isEven && (
                        <motion.div 
                            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.02, x: 5 }}
                        >
                            <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-white bg-primary rounded-full">
                                {item.year}
                            </span>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {item.description}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default function Timeline() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    
    // Animate the line fill based on scroll
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="timeline" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                        My <span className="text-primary">Journey</span>
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </motion.div>

                <div ref={containerRef} className="relative max-w-4xl mx-auto">
                    {/* Desktop Vertical Line with scroll animation */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 dark:bg-gray-700 rounded-full">
                        <motion.div
                            className="w-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Timeline Entries */}
                    {timeline.map((item, index) => (
                        <TimelineEntry 
                            key={index} 
                            item={item} 
                            index={index} 
                            totalItems={timeline.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
