import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
    {
        id: 'dragonstv',
        title: 'DragonsTV',
        desc: 'School media platform',
        tech: 'Next.js, YouTube API',
        color: '#ff7675',
        links: { demo: 'https://youtube.com' }
    },
    {
        id: 'mun',
        title: 'MUN Dashboard',
        desc: 'Conference management',
        tech: 'React, Firebase',
        color: '#74b9ff',
        links: { repo: 'https://github.com' }
    },
    {
        id: 'portfolio',
        title: 'OS Portfolio',
        desc: 'Interactive desktop UI',
        tech: 'React, Framer Motion',
        color: '#a29bfe',
        links: { repo: 'https://github.com/agarw48550/portfolio' }
    }
];

export default function MobileProjects() {
    return (
        <div className="space-y-4 p-2 pb-20">
            {PROJECTS.map((project) => (
                <a
                    key={project.id}
                    href={project.links?.demo || project.links?.repo || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[#dfe6e9] rounded-lg border-2 border-[#b2bec3] overflow-hidden shadow-sm hover:translate-y-[-2px] transition-transform active:scale-95"
                >
                    <div className="h-24 bg-[#b2bec3] relative flex items-center justify-center">
                        {/* Placeholder for project thumbnail */}
                        <span className="font-bold text-[#636e72] opacity-50 text-2xl">{project.title[0]}</span>
                    </div>
                    <div className="p-3">
                        <h3 className="font-bold text-[#2d3436]">{project.title}</h3>
                        <p className="text-xs text-[#636e72] mb-2 font-mono">{project.desc}</p>
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-[10px] px-2 py-0.5 bg-white/50 rounded-full border border-[#b2bec3]">
                                {project.tech}
                            </span>
                            <div className="flex gap-2">
                                <button className="p-1 hover:bg-[#b2bec3] rounded">
                                    <Github size={14} />
                                </button>
                                <button className="p-1 hover:bg-[#b2bec3] rounded">
                                    <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
