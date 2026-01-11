import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun, Globe, Volume2, VolumeX } from 'lucide-react';

export default function WebsiteView() {
    const { setTheme, theme, setViewMode, isMuted, toggleMute } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={`min-h-screen w-full overflow-y-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a192f] text-slate-200' : 'bg-slate-50 text-slate-800'
            }`}>
            {/* Header */}
            <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${theme === 'dark' ? 'bg-[#0a192f]/80 border-slate-800' : 'bg-white/80 border-slate-200'
                }`}>
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-2xl font-bold font-mono text-cyan-500">
                        {'<Ayaan />'}
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        {[
                            { name: 'About', href: '#about' },
                            { name: 'Experience', href: '#internships' },
                            { name: 'Projects', href: '#projects' },
                            { name: 'Leadership', href: '#leadership' },
                            { name: 'Contact', href: '#contact' }
                        ].map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium hover:text-cyan-500 transition-colors ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleMute}
                            className="p-2 rounded-full hover:bg-black/5 transition-colors"
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-black/5 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={() => setViewMode('desktop')}
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-500 rounded-lg hover:bg-cyan-500/20 transition-colors border border-cyan-500/20"
                        >
                            <Monitor size={18} />
                            <span className="font-medium">OS Mode</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section id="about" className="pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                            Ayaan Agarwal
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 mb-8">
                            Student • Developer • Innovator
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-slate-500">
                            <span className="px-3 py-1 border border-slate-700 rounded-full">📍 Singapore</span>
                            <span className="px-3 py-1 border border-slate-700 rounded-full">🏫 UWCSEA East</span>
                            <span className="px-3 py-1 border border-slate-700 rounded-full">🎓 Class of 2027</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Resume Content Sections */}
            <div className="container mx-auto px-6 space-y-20 pb-20">

                {/* Education */}
                <section id="education">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                        <span className="text-cyan-500">01.</span> Education
                    </h2>
                    <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-[#112240] border-[#233554]' : 'bg-white border-slate-200 shadow-md'}`}>
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-cyan-400">United World College of South East Asia - East Campus</h3>
                                <p className="text-slate-400 mt-1">Grade 10 | Curriculum: IGCSE</p>
                            </div>
                            <span className="font-mono text-sm text-slate-500 mt-2 md:mt-0">2013 - Present</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Subjects: Economics, Design Technology: Systems and Control, Foreign Language: Chinese, English Language and Literature, Mathematics (Additional) and Co-ordinated Science.
                        </p>
                    </div>
                </section>

                {/* Internships */}
                <section id="internships">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                        <span className="text-cyan-500">02.</span> Internships
                    </h2>
                    <div className="space-y-8">
                        <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-[#112240] border-[#233554]' : 'bg-white border-slate-200 shadow-md'}`}>
                            <div className="flex flex-col md:flex-row justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Product Operations & Inventory Intern</h3>
                                    <div className="text-cyan-400 font-medium">Kaira Global</div>
                                </div>
                                <span className="font-mono text-sm text-slate-500">2025</span>
                            </div>
                            <ul className="space-y-3 text-slate-400 list-disc pl-5">
                                <li>Streamlined product inventory by reconciling 300+ items across physical stock, online listings, and internal databases.</li>
                                <li>Improved customers' online marketing experience by updating Shopify listings and backend records to maintain accurate, customer-facing information.</li>
                                <li>Performed hands-on warehouse operations, including scanning and organizing inventory and preparing orders for shipment.</li>
                            </ul>
                        </div>

                        <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-[#112240] border-[#233554]' : 'bg-white border-slate-200 shadow-md'}`}>
                            <div className="flex flex-col md:flex-row justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Project Intern</h3>
                                    <div className="text-cyan-400 font-medium">Tinkeracademy</div>
                                </div>
                                <span className="font-mono text-sm text-slate-500">2025</span>
                            </div>
                            <ul className="space-y-3 text-slate-400 list-disc pl-5">
                                <li>Tested and improved 10+ hands-on engineering projects designed for Raffles Institution students, increasing clarity and classroom usability.</li>
                                <li>Created and piloted 5 new project modules for a companion course, contributing original designs that were later adopted into the curriculum.</li>
                                <li>Gained practical engineering experience by completing 20+ precision prototypes using the Cricut system and implementing Bluetooth UART communication in project builds.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Leadership */}
                <section id="leadership">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                        <span className="text-cyan-500">03.</span> Leadership Initiatives
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Goonj */}
                        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#112240] border-[#233554]' : 'bg-white border-slate-200 shadow-md'}`}>
                            <h3 className="text-lg font-bold text-white">Chair, Goonj – India Service Initiative</h3>
                            <p className="text-xs font-mono text-slate-500 mb-4">Since Sept. 2025</p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Leading a high-impact service group focused on equity, dignity, and humanitarian relief. Organized multiple school-wide events raising thousands for charity. Set to raise 20,000 SGD this year.
                            </p>
                        </div>

                        {/* Activities Executive */}
                        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#112240] border-[#233554]' : 'bg-white border-slate-200 shadow-md'}`}>
                            <h3 className="text-lg font-bold text-white">Activities Executive</h3>
                            <p className="text-xs font-mono text-slate-500 mb-4">Aug 2024–Present</p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Led a team responsible for planning, organizing, and elevating major student-led events. Spearhead initiatives to increase visibility and introduce innovative, inclusive events.
                            </p>
                        </div>

                        {/* DragonsTV */}
                        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#112240] border-[#233554]' : 'bg-white border-slate-200 shadow-md'}`}>
                            <h3 className="text-lg font-bold text-white">DragonsTV Leadership Executive (Producer)</h3>
                            <p className="text-xs font-mono text-slate-500 mb-4">2024–Present</p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Leading the school’s official video news platform. Plan and script news segments, conduct interviews, and collaborate with the editing team.
                            </p>
                        </div>

                        {/* MUN */}
                        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#112240] border-[#233554]' : 'bg-white border-slate-200 shadow-md'}`}>
                            <h3 className="text-lg font-bold text-white">Model United Nations</h3>
                            <p className="text-xs font-mono text-slate-500 mb-4">2021–Present</p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Participated in 11+ conferences as both delegate and chair. Best delegate awards. Developed public speaking, negotiation, and leadership skills.
                            </p>
                        </div>
                    </div>
                </section>

            </div>

            <section id="experience" className="hidden">
                {/* Legacy ID kept for compatibility if needed, but using Internships above */}
            </section>
            <section id="projects" className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                        <span className="text-cyan-500">04.</span> Projects
                    </h2>
                    {/* Project Grid */}
                </div>
            </section>
        </div>
    );
}
