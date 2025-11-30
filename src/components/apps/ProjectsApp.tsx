'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, ChevronLeft } from 'lucide-react';

interface Project {
    id: string;
    name: string;
    type: string;
    description: string;
    stats: {
        hp: number; // Complexity
        attack: number; // Impact
        defense: number; // Stability/Testing
        speed: number; // Performance
    };
    tech: string[];
    image: string;
    color: string;
    links: {
        demo?: string;
        repo?: string;
    };
}

const projects: Project[] = [
    {
        id: '1',
        name: 'Portfolio OS',
        type: 'Web App',
        description: 'A fully functional operating system simulation in the browser using Next.js, React, and Three.js.',
        stats: { hp: 90, attack: 85, defense: 80, speed: 95 },
        tech: ['Next.js', 'React', 'Three.js', 'Tailwind'],
        image: '/projects/portfolio.png', // Placeholder
        color: 'from-purple-500 to-indigo-600',
        links: { repo: 'https://github.com/agarw48550/portfolio' }
    },
    {
        id: '2',
        name: 'DragonsTV',
        type: 'Media',
        description: 'Video news platform for UWCSEA. Managed content strategy, filming, and editing.',
        stats: { hp: 70, attack: 90, defense: 60, speed: 80 },
        tech: ['Premiere Pro', 'After Effects', 'YouTube'],
        image: '/projects/dragonstv.png', // Placeholder
        color: 'from-orange-500 to-amber-600',
        links: { demo: 'https://youtube.com' }
    },
    {
        id: '3',
        name: 'School Events',
        type: 'Leadership',
        description: 'Led the Activities Council to organize major school events and student initiatives.',
        stats: { hp: 85, attack: 95, defense: 75, speed: 70 },
        tech: ['Leadership', 'Planning', 'Management'],
        image: '/projects/events.png', // Placeholder
        color: 'from-blue-500 to-cyan-600',
        links: {}
    },
];

export default function ProjectsApp() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="h-full bg-gray-900 overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        layoutId={project.id}
                        onClick={() => setSelectedId(project.id)}
                        className={`relative h-80 sm:h-96 rounded-2xl bg-gradient-to-br ${project.color} p-[2px] cursor-pointer group`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <div className="h-full w-full bg-gray-900/95 backdrop-blur-sm rounded-[14px] p-4 sm:p-6 flex flex-col relative overflow-hidden">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 truncate" title={project.name}>{project.name}</h3>
                                    <span className="inline-block px-2 py-0.5 bg-white/10 rounded-full text-[10px] sm:text-xs text-white/80 border border-white/10">
                                        {project.type}
                                    </span>
                                </div>
                                <span className="text-white/20 font-bold text-2xl sm:text-4xl flex-shrink-0">#{project.id.padStart(3, '0')}</span>
                            </div>

                            {/* Image Placeholder */}
                            <div className="flex-1 bg-black/30 rounded-lg mb-3 sm:mb-4 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors min-h-0">
                                <span className="text-white/40 text-xs sm:text-sm">Project Preview</span>
                            </div>

                            {/* Stats Preview */}
                            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                {project.tech.slice(0, 4).map((t) => (
                                    <span key={t} className="text-[10px] sm:text-xs text-center py-1 px-1 bg-white/5 rounded text-gray-300 truncate" title={t}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedId(null)}>
                        <motion.div
                            layoutId={selectedId}
                            className="w-full max-w-2xl bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {(() => {
                                const project = projects.find(p => p.id === selectedId)!;
                                return (
                                    <div className="flex flex-col md:flex-row h-[600px]">
                                        {/* Left Side - Visuals */}
                                        <div className={`w-full md:w-1/2 bg-gradient-to-br ${project.color} p-8 flex flex-col text-white`}>
                                            <div className="flex justify-between items-start mb-8">
                                                <div>
                                                    <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
                                                    <span className="px-3 py-1 bg-black/20 rounded-full text-sm backdrop-blur-md">
                                                        {project.type}
                                                    </span>
                                                </div>
                                                <span className="text-white/40 font-bold text-5xl">#{project.id.padStart(3, '0')}</span>
                                            </div>

                                            <div className="flex-1 bg-black/20 rounded-2xl mb-8 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                                <span className="text-white/60">Project Image</span>
                                            </div>

                                            <div className="flex gap-4">
                                                {project.links.demo && (
                                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                                                        <ExternalLink size={18} /> Demo
                                                    </a>
                                                )}
                                                {project.links.repo && (
                                                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-black/40 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black/60 transition-colors border border-white/20">
                                                        <Github size={18} /> Code
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Side - Stats & Info */}
                                        <div className="w-full md:w-1/2 p-8 bg-gray-900 text-white overflow-y-auto">
                                            <h3 className="text-xl font-bold mb-4 text-gray-200">About</h3>
                                            <p className="text-gray-400 mb-8 leading-relaxed">
                                                {project.description}
                                            </p>

                                            <h3 className="text-xl font-bold mb-4 text-gray-200">Base Stats</h3>
                                            <div className="space-y-4 mb-8">
                                                {Object.entries(project.stats).map(([stat, value]) => (
                                                    <div key={stat} className="flex items-center gap-4">
                                                        <span className="w-16 text-xs font-bold uppercase text-gray-500">{stat}</span>
                                                        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${value}%` }}
                                                                transition={{ duration: 1, delay: 0.2 }}
                                                                className={`h-full bg-gradient-to-r ${project.color}`}
                                                            />
                                                        </div>
                                                        <span className="w-8 text-right text-xs font-bold text-gray-300">{value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <h3 className="text-xl font-bold mb-4 text-gray-200">Abilities (Tech Stack)</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm text-gray-300 border border-gray-700">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
