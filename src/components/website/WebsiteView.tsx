import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { useEffect, useState, useMemo } from 'react';
import { Monitor, Moon, Sun, Globe, Volume2, VolumeX, Mail, Github, Linkedin, ExternalLink, Code2, Briefcase, GraduationCap, Trophy, Users, Zap, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { PROJECTS_DATA } from '@/lib/projectData';

export default function WebsiteView() {
    const { setTheme, theme, setViewMode, isMuted, toggleMute } = useStore();
    const { t, language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const projects = useMemo(() => PROJECTS_DATA[language].filter(p => p.featured), [language]);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const sections = ['about', 'education', 'internships', 'leadership', 'projects', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!mounted) return null;

    const navItems = [
        { name: 'About', id: 'about', icon: Users },
        { name: 'Education', id: 'education', icon: GraduationCap },
        { name: 'Internships', id: 'internships', icon: Briefcase },
        { name: 'Leadership', id: 'leadership', icon: Trophy },
        { name: 'Projects', id: 'projects', icon: Code2 },
        { name: 'Contact', id: 'contact', icon: Mail },
    ];

    return (
        <div className={`selection:bg-cyan-500/30 min-h-screen w-full transition-colors duration-500 ${theme === 'dark' ? 'bg-[#030712] text-slate-200' : 'bg-slate-50 text-slate-800'
            }`}>
            {/* Mesh Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-200'
                    }`} />
                <div className={`absolute top-1/2 -left-1/4 w-1/2 h-1/2 rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-200'
                    }`} />
                <div className={`absolute -bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full blur-[120px] opacity-10 transition-colors duration-1000 ${theme === 'dark' ? 'bg-cyan-600' : 'bg-cyan-200'
                    }`} />
            </div>

            {/* Navigation */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b backdrop-blur-xl ${theme === 'dark' ? 'bg-[#030712]/80 border-white/5' : 'bg-white/80 border-slate-200'
                }`}>
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-black tracking-tighter text-cyan-500 cursor-default"
                    >
                        AYAAN<span className="text-slate-500 font-light">.DEV</span>
                    </motion.div>

                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === item.id
                                    ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-900')
                                    : (theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleMute}
                            className={`p-2.5 rounded-xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white' : 'bg-black/5 border-slate-200 text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`p-2.5 rounded-xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white' : 'bg-black/5 border-slate-200 text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button
                            onClick={() => setViewMode('desktop')}
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-all font-bold shadow-lg shadow-cyan-500/25 active:scale-95"
                        >
                            <Monitor size={18} />
                            <span>OS Mode</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 pt-20">
                {/* Hero */}
                <section id="hero" className="min-h-[90vh] flex items-center px-6 relative overflow-hidden">
                    <div className="container mx-auto">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-xs font-bold uppercase tracking-widest mb-6"
                            >
                                <Zap size={14} className="animate-pulse" />
                                Aspiring Developer & Student
                            </motion.div>

                            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-cyan-500/20 shadow-2xl shrink-0"
                                >
                                    <img src="/images/profile.jpg" alt="Ayaan Agarwal" className="object-cover w-full h-full" />
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]"
                                >
                                    Building <span className="text-cyan-500">Cool Stuff</span> with &nbsp;
                                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">Code.</span>
                                </motion.h1>
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className={`text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
                            >
                                {t.appContent.about.bio1}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-wrap gap-5"
                            >
                                <a href="#projects" className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center gap-2 group">
                                    Check Out My Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a href="#contact" className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-all">
                                    Let's Chat!
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* About & Quick Facts */}
                <section id="about" className="py-32 px-6">
                    <div className="container mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-4xl font-black mb-8">Passionate about <span className="text-cyan-500">Impact.</span></h2>
                                <p className={`text-lg leading-relaxed mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {t.appContent.about.bio2}
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { label: 'Role', value: t.appContent.about.role, icon: MapPin },
                                        { label: 'Based in', value: t.appContent.about.location, icon: MapPin },
                                        { label: 'Education', value: 'UWCSEA East', icon: GraduationCap },
                                        { label: 'Graduating', value: t.appContent.about.classOf, icon: Calendar },
                                    ].map((item, i) => (
                                        <div key={i} className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                                            <p className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-1">{item.label}</p>
                                            <p className="font-bold">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { title: t.appContent.about.fact1, desc: 'Public Speaking' },
                                    { title: t.appContent.about.fact2, desc: 'Ranking (SG)' },
                                    { title: t.appContent.about.fact3, desc: 'Musical Skill' },
                                    { title: t.appContent.about.fact5, desc: 'Institution' },
                                ].map((fact, i) => (
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        key={i}
                                        className={`p-6 rounded-3xl border flex flex-col justify-center text-center ${theme === 'dark' ? 'bg-[#112240]/50 border-white/5' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
                                            }`}
                                    >
                                        <p className="text-3xl font-black text-cyan-500 mb-2">{fact.title.split(' ')[0]}</p>
                                        <p className="text-sm font-bold opacity-80 leading-tight">{fact.title.split(' ').slice(1).join(' ')}</p>
                                        <p className="text-[10px] uppercase tracking-tighter opacity-50 mt-2 font-mono">{fact.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Education Section */}
                <section id="education" className="py-32 px-6 bg-cyan-500/5 relative overflow-hidden">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-4 mb-16">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                                <GraduationCap size={24} />
                            </div>
                            <h2 className="text-4xl font-black tracking-tight italic uppercase">Education</h2>
                        </div>
                        {t.appContent.resume.education.map((edu, i) => (
                            <div key={i} className={`group p-10 rounded-3xl border transition-all hover:border-cyan-500/50 ${theme === 'dark' ? 'bg-[#0a0a12] border-white/5' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'
                                }`}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-black text-cyan-500 group-hover:scale-[1.01] transition-transform origin-left">{edu.school}</h3>
                                        <p className="text-xl font-bold mt-2 opacity-80">{edu.grade}</p>
                                        <p className={`mt-6 text-lg max-w-3xl italic ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {edu.subjects}
                                        </p>
                                    </div>
                                    <div className="shrink-0 flex flex-col items-end">
                                        <span className="px-4 py-2 bg-cyan-500/10 text-cyan-500 rounded-full font-mono font-bold text-sm border border-cyan-500/20">{edu.period}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Internships Section */}
                <section id="internships" className="py-32 px-6">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-4 mb-16">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                                <Briefcase size={24} />
                            </div>
                            <h2 className="text-4xl font-black tracking-tight italic uppercase">Internships</h2>
                        </div>
                        <div className="space-y-12">
                            {t.appContent.resume.internships.map((intern, i) => (
                                <div key={i} className="relative pl-12 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-purple-500 before:to-transparent">
                                    <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-purple-500/20" />
                                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                                        <div>
                                            <h3 className="text-3xl font-black italic">{intern.role}</h3>
                                            <p className="text-xl font-bold text-purple-500">{intern.company}</p>
                                        </div>
                                        <span className="font-mono text-slate-500 font-bold">{intern.year}</span>
                                    </div>
                                    <ul className="grid md:grid-cols-2 gap-4">
                                        {intern.points.map((point, pi) => (
                                            <li key={pi} className={`p-5 rounded-2xl border flex items-start gap-4 ${theme === 'dark' ? 'bg-white/5 border-white/5 text-slate-400' : 'bg-white border-slate-200 shadow-sm text-slate-600'
                                                }`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                                                <p className="text-sm leading-relaxed">{point}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Leadership Section */}
                <section id="leadership" className="py-32 px-6 bg-blue-500/5 relative">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-4 mb-16">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                <Trophy size={24} />
                            </div>
                            <h2 className="text-4xl font-black tracking-tight italic uppercase">Leadership</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {t.appContent.resume.leadership.map((lead, i) => (
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    key={i}
                                    className={`p-10 rounded-3xl border group transition-all ${theme === 'dark' ? 'bg-[#0a0a12] border-white/10 hover:border-blue-500/50' : 'bg-white border-slate-200 shadow-xl'
                                        }`}
                                >
                                    <h3 className="text-2xl font-black mb-1 group-hover:text-blue-500 transition-colors uppercase italic leading-tight">{lead.role}</h3>
                                    <p className="font-bold text-lg opacity-80 mb-4">{lead.org}</p>
                                    <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-black rounded-lg mb-8 uppercase tracking-tighter">{lead.period}</span>
                                    <ul className="space-y-4">
                                        {lead.points.map((point, pi) => (
                                            <li key={pi} className="flex gap-3 text-sm italic opacity-70 leading-relaxed">
                                                <Zap size={16} className="text-blue-500 shrink-0" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-32 px-6">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 mb-16">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
                                    <Code2 size={24} />
                                </div>
                                <h2 className="text-4xl font-black tracking-tight italic uppercase">Projects</h2>
                            </div>
                            <button
                                onClick={() => setViewMode('desktop')}
                                className="group flex items-center gap-2 text-pink-500 font-black italic uppercase tracking-tighter hover:gap-4 transition-all"
                            >
                                View full portfolio <ArrowRight size={20} />
                            </button>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`group relative rounded-[2.5rem] overflow-hidden border transition-all hover:scale-[1.02] active:scale-[0.98] ${theme === 'dark' ? 'bg-[#112240] border-white/5 shadow-2xl' : 'bg-white border-slate-100 shadow-xl'
                                        }`}
                                >
                                    <div className={`h-64 bg-gradient-to-br ${project.color} p-8 flex flex-col justify-end relative overflow-hidden`}>
                                        <div className="absolute top-6 right-6 flex gap-2">
                                            {project.links.demo && (
                                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                            {project.links.repo && (
                                                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                                                    <Github size={20} />
                                                </a>
                                            )}
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70 mb-2">{project.type}</p>
                                            <h3 className="text-3xl font-black text-white italic group-hover:tracking-wider transition-all duration-500 leading-tight">{project.name}</h3>
                                        </div>
                                        {/* Abstract Shape */}
                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:w-60 group-hover:h-60 transition-all duration-700" />
                                    </div>
                                    <div className="p-8">
                                        <p className={`text-sm leading-relaxed mb-6 line-clamp-3 italic ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.slice(0, 4).map(tech => (
                                                <span key={tech} className={`px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] uppercase font-black italic tracking-tighter opacity-70`}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-32 px-6 bg-gradient-to-t from-cyan-500/10 to-transparent">
                    <div className="container mx-auto">
                        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-white/10 shadow-3xl shadow-cyan-500/20">
                            <div className="absolute inset-0 bg-cyan-600 opacity-5" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase mb-8">Let's <span className="text-cyan-500">Collaborate.</span></h2>
                                <p className={`text-xl md:text-2xl mb-12 max-w-2xl italic leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Whether you have a question, a potential project, or just want to say hi, I'm always open to connecting!
                                </p>

                                <div className="flex flex-wrap justify-center gap-6 mb-16">
                                    <a href="mailto:agarw48550@gapps.uwcsea.edu.sg" className="px-10 py-5 bg-cyan-500 text-white font-black italic uppercase rounded-3xl hover:bg-cyan-600 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-cyan-500/40 flex items-center gap-3">
                                        <Mail size={24} /> Send Email
                                    </a>
                                </div>

                                <div className="flex items-center justify-center gap-8">
                                    {[
                                        { icon: Github, href: "https://github.com/agarw48550", label: "GitHub" },
                                        { icon: Linkedin, href: "https://linkedin.com/in/ayaanagarwal", label: "LinkedIn" },
                                    ].map((social, i) => (
                                        <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 font-black transition-all hover:text-cyan-500 group`}>
                                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-500 transition-all">
                                                <social.icon size={24} />
                                            </div>
                                            <span className="hidden sm:inline italic text-sm">{social.label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-6 border-t border-white/5">
                    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-50 text-xs font-black uppercase tracking-[0.2em] italic">
                        <p>© {new Date().getFullYear()} Ayaan Agarwal. Built with Passion & Code.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-cyan-500 transition-colors">Back to top</a>
                            <button onClick={() => setViewMode('desktop')} className="hover:text-cyan-500 transition-colors">View as OS</button>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
