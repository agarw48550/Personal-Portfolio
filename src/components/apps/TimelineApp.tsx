'use client';

import React, { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, Award, BookOpen, Briefcase, Code, GraduationCap, Rocket, Filter, X } from 'lucide-react';

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    category: 'work' | 'education' | 'achievement' | 'project';
}

const events: TimelineEvent[] = [
    {
        year: '2024',
        title: 'Portfolio OS Launch',
        description: 'Built this interactive OS-style portfolio with Next.js, Framer Motion, and a matrix-effect background.',
        icon: Rocket,
        color: 'from-cyan-500 to-blue-500',
        category: 'project'
    },
    {
        year: '2024',
        title: 'Activities Executive',
        description: 'Leading team for student events and innovative initiatives at UWCSEA. Organizing school-wide activities.',
        icon: Briefcase,
        color: 'from-blue-500 to-indigo-500',
        category: 'work'
    },
    {
        year: '2024',
        title: 'DragonsTV Leadership',
        description: 'Co-managing school video news platform. Content strategy, filming, and editing.',
        icon: Award,
        color: 'from-purple-500 to-pink-500',
        category: 'achievement'
    },
    {
        year: '2023',
        title: 'Started Web Development',
        description: 'Deep dive into React, Next.js, and modern web technologies. First major projects completed.',
        icon: Code,
        color: 'from-green-500 to-emerald-500',
        category: 'education'
    },
    {
        year: '2023',
        title: 'Willing Hearts Volunteer',
        description: 'Started regular volunteering at soup kitchen, giving back to the community.',
        icon: Award,
        color: 'from-red-500 to-rose-500',
        category: 'achievement'
    },
    {
        year: '2022',
        title: 'Activities Council Chair',
        description: 'Led team and introduced creative formats like live Go-Kart demos at school events.',
        icon: Calendar,
        color: 'from-amber-500 to-orange-500',
        category: 'work'
    },
    {
        year: '2021',
        title: 'Great Books Ambassador',
        description: 'Elite reading program with U.S. professors, mentored junior participants.',
        icon: BookOpen,
        color: 'from-yellow-500 to-amber-500',
        category: 'education'
    },
    {
        year: '2021',
        title: 'First Code Written',
        description: 'Started coding journey with Python. Discovered passion for building things.',
        icon: GraduationCap,
        color: 'from-teal-500 to-cyan-500',
        category: 'education'
    }
];

const categories = ['All', 'work', 'education', 'achievement', 'project'];

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const Icon = event.icon;
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`flex items-center gap-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'} relative`}
        >
            {/* Content Card */}
            <motion.div
                className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <div className={`bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all group ${isLeft ? 'mr-4' : 'ml-4'}`}>
                    {/* Year Badge */}
                    <span className={`inline-block px-3 py-1 bg-gradient-to-r ${event.color} rounded-full text-xs font-bold text-white mb-3`}>
                        {event.year}
                    </span>

                    <h3 className={`text-lg font-bold text-white mb-2 flex items-center gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                        {!isLeft && <Icon size={18} className="text-cyan-400" />}
                        {event.title}
                        {isLeft && <Icon size={18} className="text-cyan-400" />}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">
                        {event.description}
                    </p>

                    {/* Category tag */}
                    <div className={`mt-3 flex ${isLeft ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                            {event.category}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Center Line Node */}
            <div className="relative flex-shrink-0 z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${event.color} border-4 border-gray-900 shadow-lg`}
                    style={{ boxShadow: `0 0 20px rgba(34, 211, 238, 0.3)` }}
                />
            </div>

            {/* Spacer for opposite side */}
            <div className="flex-1" />
        </motion.div>
    );
}

export default function TimelineApp() {
    const [activeCategory, setActiveCategory] = useState('All');
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true });

    const filteredEvents = useMemo(() => {
        return activeCategory === 'All'
            ? events
            : events.filter(e => e.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="h-full bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-y-auto">
            {/* Header */}
            <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: -20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 p-6"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Calendar className="text-cyan-400" />
                            My Journey
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">A timeline of milestones and achievements</p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${activeCategory === cat
                                        ? 'bg-cyan-500 text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative px-6 py-8">
                {/* Center Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent" />

                {/* Timeline Items */}
                <div className="space-y-8">
                    <AnimatePresence mode="popLayout">
                        {filteredEvents.map((event, index) => (
                            <TimelineItem key={event.title} event={event} index={index} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* End marker */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex justify-center mt-12"
                >
                    <div className="text-center">
                        <div className="w-3 h-3 rounded-full bg-cyan-500/30 mx-auto mb-2" />
                        <span className="text-gray-600 text-xs">The journey continues...</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
