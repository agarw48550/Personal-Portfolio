"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function AboutApp() {
  const [activeTab, setActiveTab] = useState<'bio' | 'experience' | 'leadership' | 'education'>('bio');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const tabs = [
    { id: 'bio', label: 'Bio', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'leadership', label: 'Leadership', icon: '⚡' },
    { id: 'education', label: 'Education', icon: '🎓' },
  ] as const;

  return (
    <div className="h-full bg-[#0a192f] text-slate-300 overflow-hidden relative font-sans selection:bg-cyan-500/30 flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Header / Tabs */}
      <div className="p-6 pb-2 border-b border-white/10 shrink-0 z-20 bg-[#0a192f]/80 backdrop-blur-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white/10 shrink-0">
            <Image src="/images/profile.jpg" alt="Profile" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Ayaan Agarwal</h1>
            <p className="text-cyan-400 text-sm">{t.appContent.about.role}</p>
          </div>
        </div>

        <div className="flex gap-2 text-sm overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 z-10 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'bio' && (
              <div className="space-y-8 max-w-2xl mx-auto">
                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
                  <p>{t.appContent.about.bio1}</p>
                  <p>{t.appContent.about.bio2}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Facts</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3"><span className="text-cyan-400">📍</span> {t.appContent.about.fact5}</li>
                    <li className="flex items-center gap-3"><span className="text-cyan-400">🗣️</span> {t.appContent.about.fact1}</li>
                    <li className="flex items-center gap-3"><span className="text-cyan-400">🏸</span> {t.appContent.about.fact2}</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                {t.appContent.resume.internships.map((job: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-white text-lg">{job.role}</h3>
                        <div className="text-cyan-400">{job.company}</div>
                      </div>
                      <span className="text-xs font-mono text-slate-500 bg-black/20 px-2 py-1 rounded">{job.year}</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400 list-disc pl-4">
                      {job.points.map((pt: string, j: number) => (
                        <li key={j}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'leadership' && (
              <div className="space-y-6">
                {t.appContent.resume.leadership.map((role: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-lg">{role.role}</h3>
                      <span className="text-xs font-mono text-slate-500">{role.period}</span>
                    </div>
                    {role.org && <div className="text-cyan-400 mb-3">{role.org}</div>}
                    <ul className="space-y-2 text-sm text-slate-400 list-disc pl-4">
                      {role.points.map((pt: string, j: number) => (
                        <li key={j}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6">
                {t.appContent.resume.education.map((edu: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h3 className="font-bold text-white text-lg mb-1">{edu.school}</h3>
                    <div className="text-cyan-400 text-sm mb-3">{edu.period}</div>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p className="font-medium text-white/80">{edu.grade}</p>
                      <p className="italic text-slate-400">{edu.subjects}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
