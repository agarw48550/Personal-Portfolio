"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import clsx from "clsx";

const categories = ["All", "Web", "AI", "Python"];

// Tilt Card Component with 3D effect and shine
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const mouseXSpring = useSpring(x, { damping: 20, stiffness: 300 });
    const mouseYSpring = useSpring(y, { damping: 20, stiffness: 300 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
    
    // Shine effect position
    const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "200%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY: isTouchDevice ? 0 : rotateY,
                rotateX: isTouchDevice ? 0 : rotateX,
                transformStyle: "preserve-3d",
            }}
            className={clsx(className, "relative")}
        >
            {/* Shine effect overlay */}
            {!isTouchDevice && (
                <motion.div
                    className="absolute inset-0 z-30 pointer-events-none rounded-2xl sm:rounded-3xl overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{ x: shineX }}
                    />
                </motion.div>
            )}
            {children}
        </motion.div>
    );
};

// Skeleton Loader
const ProjectSkeleton = () => (
    <div className="rounded-2xl sm:rounded-3xl bg-gray-200 dark:bg-gray-800 h-[250px] sm:h-[300px] md:h-[350px] relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
);

export default function Projects() {
    const [filter, setFilter] = useState("All");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const filteredProjects = projects.filter(
        (project) => filter === "All" || project.category === filter || project.tags.includes(filter)
    );

    return (
        <section id="projects" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                        My <span className="text-primary">Projects</span>
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-primary mx-auto rounded-full mb-6 sm:mb-8"></div>

                    {/* Filter Tabs - Mobile optimized */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={clsx(
                                    "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                                    filter === category
                                        ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Bento Grid - Mobile responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-[250px] sm:auto-rows-[280px] md:auto-rows-[320px] lg:auto-rows-[350px]">
                    {isLoading ? (
                        // Loading Skeletons
                        [...Array(3)].map((_, i) => <ProjectSkeleton key={i} />)
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <TiltCard
                                    key={project.id}
                                    className={clsx(
                                        "group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700",
                                        // Featured cards only span on larger screens
                                        project.featured ? "lg:col-span-2" : ""
                                    )}
                                >
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        {/* Featured Ribbon */}
                                        {project.featured && (
                                            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-yellow-400 text-black text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg transform translate-z-10 animate-pulse">
                                                ⭐ Featured
                                            </div>
                                        )}

                                        {/* Project Background (Specific Gradients) */}
                                        <div
                                            className={clsx(
                                                "absolute inset-0 transition-transform duration-500 group-hover:scale-110",
                                                project.category === "Web" ? "bg-gradient-to-br from-blue-500 to-cyan-400" :
                                                    project.category === "AI" ? "bg-gradient-to-br from-purple-600 to-indigo-500" :
                                                        "bg-gradient-to-br from-emerald-500 to-green-400"
                                            )}
                                        >
                                            {/* Abstract Pattern Overlay */}
                                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                                            {/* Icon/Symbol */}
                                            <div className="w-full h-full flex items-center justify-center text-white text-6xl sm:text-7xl md:text-8xl opacity-30 transform translate-z-0 group-hover:translate-z-10 transition-transform duration-500">
                                                {project.category === "Web" ? "🌐" : project.category === "AI" ? "🤖" : "💻"}
                                            </div>
                                        </div>

                                        {/* Overlay Content */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300"></div>

                                        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 lg:p-8 transform translate-z-20">
                                            <div className="transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 drop-shadow-md">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-200 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                                    {project.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-white/20 text-white backdrop-blur-md border border-white/10"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {project.tags.length > 3 && (
                                                        <span className="px-2 py-0.5 text-[10px] sm:text-xs text-white/60">
                                                            +{project.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex gap-2 sm:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0">
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-colors backdrop-blur-sm text-sm"
                                                >
                                                    <FaGithub size={16} /> <span className="hidden sm:inline">Code</span>
                                                </a>
                                                <a
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors shadow-lg shadow-primary/30 text-sm"
                                                >
                                                    <FaExternalLinkAlt size={14} /> <span className="hidden sm:inline">Demo</span>
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                </TiltCard>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </section>
    );
}
