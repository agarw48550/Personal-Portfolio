'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, X, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { PROJECTS_DATA } from '@/lib/projectData';

// Interface defined in projectData.ts effectively, but we can keep local interface if it matches
interface Project {
    id: string;
    name: string;
    type: string;
    category: string;
    description: string;
    stats: {
        hp: number; // Complexity
        attack: number; // Impact
        defense: number; // Stability/Testing
        speed: number; // Performance
    };
    tech: string[];
    image: string;
    video?: string; // YouTube video ID
    color: string;
    featured: boolean;
    links: {
        demo?: string;
        repo?: string;
    };
    internalRoute?: string;
}

export default function ProjectsApp() {
    const router = useRouter();
    const { t, language } = useLanguage();
    const projects = PROJECTS_DATA[language];

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedTech, setSelectedTech] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    // Extract unique categories and tech for filters from CURRENT language data
    const categories = useMemo(() => ['All', ...new Set(projects.map(p => p.category))], [projects]);
    const allTech = useMemo(() => [...new Set(projects.flatMap(p => p.tech))].sort(), [projects]);

    // Filter projects based on category and tech
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const categoryMatch = activeCategory === 'All' || project.category === activeCategory;
            const techMatch = selectedTech.length === 0 || selectedTech.some(t => project.tech.includes(t));
            return categoryMatch && techMatch;
        });
    }, [activeCategory, selectedTech, projects]);

    const toggleTech = (tech: string) => {
        setSelectedTech(prev =>
            prev.includes(tech)
                ? prev.filter(t => t !== tech)
                : [...prev, tech]
        );
    };

    const clearFilters = () => {
        setActiveCategory('All');
        setSelectedTech([]);
    };

    const handleProjectClick = (project: Project) => {
        if (project.internalRoute) {
            router.push(project.internalRoute);
        } else {
            setSelectedId(project.id);
        }
    };

    const hasActiveFilters = activeCategory !== 'All' || selectedTech.length > 0;

    return (
        <div className="h-full bg-gray-900 overflow-y-auto">
            {/* Filter Bar */}
            <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-white/10 p-4">
                <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-cyan-400" />
                        <span className="text-sm font-medium text-gray-300">{t.appContent.projects.filter}</span>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                            >
                                <X size={12} /> {t.appContent.projects.clear}
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                        {showFilters ? t.appContent.projects.hideFilters : t.appContent.projects.showFilters}
                    </button>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === category
                                ? 'bg-cyan-500 text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Tech Filter Chips */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                                {allTech.map(tech => (
                                    <button
                                        key={tech}
                                        onClick={() => toggleTech(tech)}
                                        className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${selectedTech.includes(tech)
                                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                            : 'bg-white/5 text-gray-500 hover:text-gray-300 border border-transparent'
                                            }`}
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Projects Grid */}
            <div className="p-4 sm:p-6 pb-20">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-12"
                        >
                            <p className="text-gray-500">{t.appContent.projects.noResults}</p>
                            <button
                                onClick={clearFilters}
                                className="mt-2 text-cyan-400 text-sm hover:underline"
                            >
                                {t.appContent.projects.clear}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    layoutId={project.id}
                                    onClick={() => handleProjectClick(project)}
                                    className={`relative rounded-2xl bg-gradient-to-br ${project.color} p-[2px] cursor-pointer group h-full`}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="h-full w-full bg-gray-900/95 backdrop-blur-sm rounded-[14px] p-6 flex flex-col relative overflow-hidden min-h-[320px]">
                                        {/* Featured Badge */}
                                        {project.featured && (
                                            <div className="absolute top-4 right-4 px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/50 rounded-full z-10">
                                                <span className="text-[10px] text-cyan-400 font-medium">{t.appContent.projects.featured}</span>
                                            </div>
                                        )}

                                        {/* Card Header */}
                                        <div className="flex justify-between items-start mb-4 gap-2 pr-16">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-2xl font-bold text-white mb-1 truncate" title={project.name}>{project.name}</h3>
                                                <span className="inline-block px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/80 border border-white/10">
                                                    {project.type}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Image Placeholder */}
                                        <div className="flex-1 bg-black/30 rounded-lg mb-4 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors min-h-[140px] relative overflow-hidden">
                                            {project.video ? (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                    <Play className="text-white/50 w-12 h-12" />
                                                </div>
                                            ) : (
                                                <span className="text-white/40 text-sm">{project.internalRoute ? t.appContent.projects.clickToPlay : t.appContent.projects.preview}</span>
                                            )}
                                        </div>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.slice(0, 4).map((t) => (
                                                <span key={t} className="text-xs py-1 px-2 bg-white/5 rounded text-gray-300 border border-white/5">
                                                    {t}
                                                </span>
                                            ))}
                                            {project.tech.length > 4 && (
                                                <span className="text-xs py-1 px-2 bg-white/5 rounded text-gray-500 border border-white/5">
                                                    +{project.tech.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
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
                                if (!project) return null;
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

                                            <div className="flex-1 bg-black/20 rounded-2xl mb-8 flex items-center justify-center backdrop-blur-sm border border-white/10 overflow-hidden relative">
                                                {project.video ? (
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src={`https://www.youtube.com/embed/${project.video}`}
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        className="absolute inset-0"
                                                    ></iframe>
                                                ) : (
                                                    <span className="text-white/60">{t.appContent.projects.preview}</span>
                                                )}
                                            </div>

                                            <div className="flex gap-4">
                                                {project.links.demo && (
                                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                                                        <ExternalLink size={18} /> {t.appContent.projects.demo}
                                                    </a>
                                                )}
                                                {project.links.repo && (
                                                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-black/40 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black/60 transition-colors border border-white/20">
                                                        <Github size={18} /> {t.appContent.projects.code}
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Side - Stats & Info */}
                                        <div className="w-full md:w-1/2 p-8 bg-gray-900 text-white overflow-y-auto">
                                            <h3 className="text-xl font-bold mb-4 text-gray-200">{t.appContent.projects.about}</h3>
                                            <p className="text-gray-400 mb-8 leading-relaxed">
                                                {project.description}
                                            </p>

                                            <h3 className="text-xl font-bold mb-4 text-gray-200">{t.appContent.projects.stats}</h3>
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

                                            <h3 className="text-xl font-bold mb-4 text-gray-200">{t.appContent.projects.tech}</h3>
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
