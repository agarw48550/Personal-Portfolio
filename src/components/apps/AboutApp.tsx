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
    <div className="h-full overflow-hidden relative font-sans selection:bg-cyan-500/30 flex flex-col" style={{ background: 'var(--ds-bg)', color: 'var(--ds-text-secondary)' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ background: 'var(--ds-brand-surface)', opacity: 0.3 }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" style={{ background: 'var(--ds-blue-surface)', opacity: 0.3 }} />
      </div>

      {/* Header / Tabs */}
      <div className="p-6 pb-2 shrink-0 z-20 backdrop-blur-md" style={{ borderBottom: '1px solid var(--ds-border)', background: 'var(--ds-glass)' }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ border: '2px solid var(--ds-border)' }}>
            <Image src="/images/profile.jpg" alt="Profile" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--ds-text)' }}>Ayaan Agarwal</h1>
            <p className="text-sm" style={{ color: 'var(--ds-brand)' }}>{t.appContent.about.role}</p>
          </div>
        </div>

        <div className="flex gap-2 text-sm overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                ? ''
                : 'hover:bg-white/10'
                }`}
              style={activeTab === tab.id
                ? { background: 'var(--ds-brand-surface)', color: 'var(--ds-brand)', border: '1px solid var(--ds-brand)' }
                : { background: 'rgba(255,255,255,0.05)', color: 'var(--ds-text-muted)', border: '1px solid transparent' }
              }
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
                <div className="prose prose-invert max-w-none leading-relaxed space-y-4" style={{ color: 'var(--ds-text-secondary)' }}>
                  <p>{t.appContent.about.bio1}</p>
                  <p>{t.appContent.about.bio2}</p>
                </div>

                <div className="rounded-2xl p-6" style={{ background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)' }}>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--ds-text)' }}>Quick Facts</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3"><span style={{ color: 'var(--ds-brand)' }}>📍</span> {t.appContent.about.fact5}</li>
                    <li className="flex items-center gap-3"><span style={{ color: 'var(--ds-brand)' }}>🗣️</span> {t.appContent.about.fact1}</li>
                    <li className="flex items-center gap-3"><span style={{ color: 'var(--ds-brand)' }}>🏸</span> {t.appContent.about.fact2}</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                {t.appContent.resume.internships.map((job: any, i: number) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)' }}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: 'var(--ds-text)' }}>{job.role}</h3>
                        <div style={{ color: 'var(--ds-brand)' }}>{job.company}</div>
                      </div>
                      <span className="text-xs font-mono px-2 py-1 rounded" style={{ color: 'var(--ds-text-muted)', background: 'var(--ds-bg-inset)' }}>{job.year}</span>
                    </div>
                    <ul className="space-y-2 text-sm list-disc pl-4" style={{ color: 'var(--ds-text-secondary)' }}>
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
                  <div key={i} className="rounded-xl p-5" style={{ background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)' }}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg" style={{ color: 'var(--ds-text)' }}>{role.role}</h3>
                      <span className="text-xs font-mono" style={{ color: 'var(--ds-text-muted)' }}>{role.period}</span>
                    </div>
                    {role.org && <div className="mb-3" style={{ color: 'var(--ds-brand)' }}>{role.org}</div>}
                    <ul className="space-y-2 text-sm list-disc pl-4" style={{ color: 'var(--ds-text-secondary)' }}>
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
                  <div key={i} className="rounded-xl p-5" style={{ background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)' }}>
                    <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--ds-text)' }}>{edu.school}</h3>
                    <div className="text-sm mb-3" style={{ color: 'var(--ds-brand)' }}>{edu.period}</div>
                    <div className="space-y-2 text-sm" style={{ color: 'var(--ds-text-secondary)' }}>
                      <p className="font-medium" style={{ color: 'var(--ds-text)', opacity: 0.8 }}>{edu.grade}</p>
                      <p className="italic" style={{ color: 'var(--ds-text-muted)' }}>{edu.subjects}</p>
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
