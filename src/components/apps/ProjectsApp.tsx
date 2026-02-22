'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, X, Play, Zap, Shield, Activity, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { PROJECTS_DATA } from '@/lib/projectData';
import { useStore } from '@/lib/store';

// Helper to get stat icon
const getStatIcon = (stat: string) => {
    switch (stat) {
        case 'hp': return <Zap size={14} />;
        case 'attack': return <Activity size={14} />;
        case 'defense': return <Shield size={14} />;
        case 'speed': return <Clock size={14} />;
        default: return <Activity size={14} />;
    }
};

export default function ProjectsApp() {
    const router = useRouter();
    const { t, language } = useLanguage();
    const projects = PROJECTS_DATA[language];

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedTech, setSelectedTech] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const categories = useMemo(() => ['All', ...new Set(projects.map(p => p.category))], [projects]);
    const allTech = useMemo(() => [...new Set(projects.flatMap(p => p.tech))].sort(), [projects]);

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

    const handleProjectClick = (project: any) => {
        if (project.internalRoute) {
            router.push(project.internalRoute);
        } else {
            setSelectedId(project.id);
        }
    };

    const hasActiveFilters = activeCategory !== 'All' || selectedTech.length > 0;

    return (
        <div className="h-full overflow-y-auto custom-scrollbar flex flex-col font-sans selection:bg-cyan-500/30" style={{ background: 'var(--ds-bg)' }}>
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" style={{ background: 'var(--ds-purple-surface)', opacity: 0.5 }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" style={{ background: 'var(--ds-brand-surface)', opacity: 0.5 }} />
            </div>

            {/* Header & Filters */}
            <div className="sticky top-0 z-20 backdrop-blur-md p-6 shadow-xl" style={{ background: 'var(--ds-glass)', borderBottom: '1px solid var(--ds-border)' }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--ds-text)' }}>
                        My Projects <span className="text-lg font-normal ml-2" style={{ color: 'var(--ds-brand)' }}>({filteredProjects.length})</span>
                    </h1>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            aria-expanded={showFilters}
                            aria-label={showFilters ? 'Hide tech filters' : 'Show tech filters'}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors"
                            style={showFilters
                                ? { background: 'var(--ds-brand-surface)', border: '1px solid var(--ds-brand)', color: 'var(--ds-brand)' }
                                : { background: 'rgba(255,255,255,0.05)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-muted)' }
                            }
                        >
                            <Filter size={16} />
                            {t.appContent.projects.filter}
                        </button>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                aria-label="Clear all filters"
                                className="px-3 py-1.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-1"
                            >
                                <X size={16} />
                                {t.appContent.projects.clear}
                            </button>
                        )}
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            aria-pressed={activeCategory === category}
                            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                            style={activeCategory === category
                                ? { background: 'var(--ds-brand)', color: '#000', boxShadow: '0 4px 14px var(--ds-brand-glow)' }
                                : { background: 'rgba(255,255,255,0.05)', color: 'var(--ds-text-muted)', border: '1px solid var(--ds-border)' }
                            }
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Tech Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-wrap gap-1.5 mt-4 pt-4" style={{ borderTop: '1px solid var(--ds-border)' }}>
                                {allTech.map(tech => (
                                    <button
                                        key={tech}
                                        onClick={() => toggleTech(tech)}
                                        aria-pressed={selectedTech.includes(tech)}
                                        className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
                                        style={selectedTech.includes(tech)
                                            ? { background: 'var(--ds-brand-surface)', color: 'var(--ds-brand)', border: '1px solid var(--ds-brand)' }
                                            : { background: 'rgba(255,255,255,0.05)', color: 'var(--ds-text-muted)', border: '1px solid var(--ds-border)' }
                                        }
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Grid */}
            <div className="p-6 pb-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                layoutId={`card-${project.id}`}
                                onClick={() => handleProjectClick(project)}
                                className="group relative rounded-xl overflow-hidden transition-colors cursor-pointer shadow-lg"
                                style={{
                                    background: 'var(--ds-bg-elevated)',
                                    border: '1px solid var(--ds-border)',
                                }}
                            >
                                {/* Image Area */}
                                <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                    <div className="absolute bottom-0 left-0 p-4 w-full" style={{ background: 'linear-gradient(to top, var(--ds-bg-elevated), transparent)' }}>
                                        <span className="inline-block px-2 py-1 bg-black/40 backdrop-blur-md rounded text-xs text-white/90" style={{ border: '1px solid var(--ds-border)' }}>
                                            {project.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold transition-colors line-clamp-1" style={{ color: 'var(--ds-text)' }}>{project.name}</h3>
                                        {project.featured && <Zap size={16} className="text-yellow-400 shrink-0" />}
                                    </div>
                                    <p className="text-sm line-clamp-2 mb-4 h-10" style={{ color: 'var(--ds-text-secondary)' }}>{project.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map(t => (
                                            <span key={t} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded" style={{ color: 'var(--ds-text-muted)', background: 'var(--ds-bg-inset)' }}>
                                                {t}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="text-[10px] px-1 py-1" style={{ color: 'var(--ds-text-muted)' }}>+ {project.tech.length - 3}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20" style={{ color: 'var(--ds-text-muted)' }}>
                        <p className="text-lg">{t.appContent.projects.noResults}</p>
                        <button onClick={clearFilters} className="mt-2 hover:underline" style={{ color: 'var(--ds-brand)' }}>
                            {t.appContent.projects.clear}
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedId(null)} role="dialog" aria-label="Project details" aria-modal="true">
                        <motion.div
                            layoutId={`project-${selectedId}`}
                            className="w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                            style={{ background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)' }}
                            onClick={e => e.stopPropagation()}
                        >
                            {(() => {
                                const project = projects.find(p => p.id === selectedId)!;
                                if (!project) return null;
                                return (
                                    <>
                                        {/* Initial LayoutId wrapper matching card */}
                                        <div className={`w-full md:w-5/12 bg-gradient-to-br ${project.color} p-8 text-white relative flex flex-col justify-between`}>
                                            <div>
                                                <div className="inline-block px-3 py-1 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium mb-4">
                                                    {project.type}
                                                </div>
                                                <h2 className="text-4xl font-bold mb-2">{project.name}</h2>
                                                <div className="h-1 w-20 rounded-full mb-6" style={{ background: 'var(--ds-brand)' }} />
                                            </div>

                                            <div className="space-y-4">
                                                {project.links.demo && (
                                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} live demo`} className="block w-full py-3 bg-white text-black font-bold text-center rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                                                        <ExternalLink size={18} /> Live Demo
                                                    </a>
                                                )}
                                                {project.links.repo && (
                                                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} source code`} className="block w-full py-3 bg-black/30 text-white font-bold text-center rounded-xl hover:bg-black/40 transition-colors border border-white/10 flex items-center justify-center gap-2">
                                                        <Github size={18} /> View Code
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-full md:w-7/12 p-8 overflow-y-auto" style={{ background: 'var(--ds-bg-elevated)' }}>
                                            <div className="space-y-8">
                                                <div>
                                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--ds-text)' }}><span style={{ color: 'var(--ds-brand)' }}>#</span> About</h3>
                                                    <p className="leading-relaxed text-sm" style={{ color: 'var(--ds-text-secondary)' }}>{project.description}</p>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--ds-text)' }}><span style={{ color: 'var(--ds-brand)' }}>#</span> Tech Stack</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tech.map(t => (
                                                            <span key={t} className="px-3 py-1.5 rounded-lg text-sm" style={{ background: 'var(--ds-bg-inset)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-secondary)' }}>
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--ds-text)' }}><span style={{ color: 'var(--ds-brand)' }}>#</span> Project Stats</h3>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {Object.entries(project.stats).map(([key, value]) => (
                                                            <div key={key} className="p-3 rounded-xl" style={{ background: 'var(--ds-bg-inset)', border: '1px solid var(--ds-border)' }}>
                                                                <div className="flex items-center gap-2 text-xs uppercase font-bold mb-2" style={{ color: 'var(--ds-text-muted)' }}>
                                                                    {getStatIcon(key)} {key}
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }} role="progressbar" aria-valuenow={value as number} aria-valuemin={0} aria-valuemax={100} aria-label={`${key}: ${value}%`}>
                                                                        <motion.div
                                                                            initial={{ width: 0 }}
                                                                            animate={{ width: `${value}%` }}
                                                                            transition={{ duration: 1, delay: 0.2 }}
                                                                            className={`h-full bg-gradient-to-r ${project.color}`}
                                                                        />
                                                                    </div>
                                                                    <span className="font-mono text-sm" style={{ color: 'var(--ds-text)' }}>{value}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
