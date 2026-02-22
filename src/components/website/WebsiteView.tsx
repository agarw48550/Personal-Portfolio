'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { useEffect, useState, useMemo } from 'react';
import {
  Monitor, Moon, Sun, Volume2, VolumeX, Mail, Github, Linkedin,
  ExternalLink, Code2, Briefcase, GraduationCap, Trophy, Users,
  Zap, MapPin, Calendar, ArrowRight, Cpu, Activity,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { PROJECTS_DATA } from '@/lib/projectData';

import MobileBottomNav from './MobileBottomNav';
import BlockToCode from './BlockToCode';
import JarvisTerminal from './JarvisTerminal';

/* -- Framer Motion shared presets ----------------------------------------- */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};
const stagger = (i: number) => ({
  ...fadeUp,
  transition: { duration: 0.5, delay: i * 0.08 },
});

/* ========================================================================= */

export default function WebsiteView() {
  const { setTheme, theme, setViewMode, isMuted, toggleMute } = useStore();
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isDark = theme === 'dark';

  const projects = useMemo(
    () => PROJECTS_DATA[language].filter((p) => p.featured),
    [language],
  );

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sections = [
        'hero','about','skills','education',
        'internships','leadership','projects','jarvis','contact',
      ];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const r = el.getBoundingClientRect();
          return r.top <= 300 && r.bottom >= 300;
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
    { name: 'About',       id: 'about',       icon: Users },
    { name: 'Education',   id: 'education',   icon: GraduationCap },
    { name: 'Internships', id: 'internships', icon: Briefcase },
    { name: 'Leadership',  id: 'leadership',  icon: Trophy },
    { name: 'Projects',    id: 'projects',    icon: Code2 },
    { name: 'Contact',     id: 'contact',     icon: Mail },
  ];

  /* ---------------------------------------------------------------------- */

  return (
    <div
      className={`selection:bg-cyan-500/30 min-h-screen w-full transition-colors duration-500 pb-20 md:pb-0 ${
        isDark
          ? 'bg-[var(--ds-bg)] text-[var(--ds-text)]'
          : 'bg-[var(--ds-bg)] text-[var(--ds-text)]'
      }`}
    >
      {/* -- Mesh Background ------------------------------------------------ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={`absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[120px] opacity-15 transition-colors duration-1000 ${isDark ? 'bg-blue-600' : 'bg-blue-200'}`} />
        <div className={`absolute top-1/2 -left-1/4 w-1/2 h-1/2 rounded-full blur-[120px] opacity-15 transition-colors duration-1000 ${isDark ? 'bg-purple-600' : 'bg-purple-200'}`} />
        <div className={`absolute -bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full blur-[120px] opacity-8 transition-colors duration-1000 ${isDark ? 'bg-cyan-600' : 'bg-cyan-200'}`} />
      </div>

      <MobileBottomNav activeSection={activeSection} />

      {/* -- Desktop Navigation --------------------------------------------- */}
      <header
        className={`hidden md:block fixed top-0 w-full z-50 transition-all duration-300 border-b backdrop-blur-xl ${
          isDark
            ? 'bg-[var(--ds-bg)]/80 border-[var(--ds-border)]'
            : 'bg-white/80 border-[var(--ds-border)]'
        }`}
      >
        <div className="container mx-auto px-8 h-20 flex items-center justify-between max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter cursor-default"
            style={{ color: 'var(--ds-brand)' }}
          >
            AYAAN
            <span className="font-light" style={{ color: 'var(--ds-text-muted)' }}>
              .DEV
            </span>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? isDark
                      ? 'bg-white/10 text-white'
                      : 'bg-black/5 text-slate-900'
                    : isDark
                      ? 'text-[var(--ds-text-muted)] hover:text-white'
                      : 'text-[var(--ds-text-muted)] hover:text-slate-900'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-white/5 border-[var(--ds-border)] text-[var(--ds-text-muted)] hover:text-white'
                  : 'bg-black/5 border-[var(--ds-border)] text-[var(--ds-text-secondary)] hover:text-slate-900'
              }`}
              aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            >
              {isMuted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
            </button>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-white/5 border-[var(--ds-border)] text-[var(--ds-text-muted)] hover:text-white'
                  : 'bg-black/5 border-[var(--ds-border)] text-[var(--ds-text-secondary)] hover:text-slate-900'
              }`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>

            <button
              onClick={() => setViewMode('desktop')}
              className="ds-btn ds-btn-primary ds-btn-sm hidden sm:flex items-center gap-2 shadow-lg"
              style={{ boxShadow: '0 4px 14px var(--ds-brand-glow)' }}
            >
              <Monitor size={18} /> <span>OS Mode</span>
            </button>
          </div>
        </div>
      </header>

      {/* -- Mobile Header -------------------------------------------------- */}
      <header
        className="md:hidden fixed top-0 w-full z-40 backdrop-blur-md bg-transparent px-6 h-16 flex items-center justify-between"
        role="banner"
      >
        <div
          className="text-xl font-black tracking-tighter"
          style={{ color: 'var(--ds-brand)' }}
        >
          AYAAN
          <span style={{ color: 'var(--ds-text-muted)' }} className="font-light">
            .DEV
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-900'}`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className="p-2 rounded-full text-white"
            style={{ background: 'var(--ds-brand)' }}
            aria-label="Switch to OS desktop mode"
          >
            <Monitor size={16} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ================================================================== */}
      {/*  MAIN CONTENT                                                      */}
      {/* ================================================================== */}
      <main className="relative z-10 pt-20">
        {/* -- HERO --------------------------------------------------------- */}
        <section
          id="hero"
          className="min-h-[85vh] flex items-center px-6 md:px-8 relative overflow-hidden"
          aria-label="Introduction"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-5xl pt-10 md:pt-0">
              <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center mb-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="relative w-36 h-36 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-2xl shrink-0"
                  style={{
                    border: '2px solid var(--ds-brand)',
                    boxShadow: 'var(--ds-shadow-glow)',
                  }}
                >
                  <img
                    src="/images/profile.jpg"
                    alt="Ayaan Agarwal"
                    className="object-cover w-full h-full"
                  />
                </motion.div>

                <div className="text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="ds-chip mb-5"
                    style={{
                      background: 'var(--ds-brand-surface)',
                      borderColor: 'var(--ds-brand)',
                      color: 'var(--ds-brand)',
                    }}
                  >
                    <MapPin size={12} /> Singapore &bull; UWCSEA East
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="ds-display-xl mb-4"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    Hi, I&apos;m <span style={{ color: 'var(--ds-brand)' }}>Ayaan</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="ds-body-lg max-w-xl leading-relaxed"
                    style={{ color: 'var(--ds-text-secondary)' }}
                  >
                    Student leader, service advocate, and aspiring developer. I
                    chair humanitarian initiatives, produce school media, compete
                    in squash nationally, and build things with code.
                  </motion.p>
                </div>
              </div>

              {/* Identity Chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-wrap gap-3 justify-center md:justify-start mb-10"
              >
                {[
                  { label: 'Service Chair',          bg: 'var(--ds-emerald-surface)', color: 'var(--ds-emerald)', border: 'var(--ds-emerald)' },
                  { label: 'MUN Delegate & Chair',   bg: 'var(--ds-blue-surface)',    color: 'var(--ds-blue)',    border: 'var(--ds-blue)' },
                  { label: 'News Producer',           bg: 'var(--ds-amber-surface)',   color: 'var(--ds-amber)',   border: 'var(--ds-amber)' },
                  { label: 'Squash Athlete',          bg: 'var(--ds-purple-surface)',  color: 'var(--ds-purple)',  border: 'var(--ds-purple)' },
                  { label: 'Developer',               bg: 'var(--ds-brand-surface)',   color: 'var(--ds-brand)',   border: 'var(--ds-brand)' },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className="ds-chip"
                    style={{
                      background: chip.bg,
                      color: chip.color,
                      borderColor: chip.border,
                    }}
                  >
                    {chip.label}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <a href="#about" className="ds-btn ds-btn-primary ds-btn-lg group">
                  Learn More About Me{' '}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
                <a href="#contact" className="ds-btn ds-btn-secondary ds-btn-lg">
                  Get In Touch
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* -- ABOUT & QUICK FACTS ------------------------------------------ */}
        <section id="about" className="py-24 md:py-32 px-6 md:px-8" aria-label="About me">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="ds-section-icon shadow-lg"
                    style={{
                      background: 'var(--ds-brand)',
                      boxShadow: '0 8px 24px var(--ds-brand-glow)',
                    }}
                  >
                    <Users size={24} />
                  </div>
                  <h2 className="ds-heading-1">About Me</h2>
                </div>
                <p className="ds-body-lg mb-6" style={{ color: 'var(--ds-text-secondary)' }}>
                  {t.appContent.about.bio1}
                </p>
                <p className="ds-body-lg mb-8" style={{ color: 'var(--ds-text-secondary)' }}>
                  {t.appContent.about.bio2}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Role',       value: t.appContent.about.role,    icon: MapPin },
                    { label: 'Based in',   value: t.appContent.about.location, icon: MapPin },
                    { label: 'Education',  value: 'UWCSEA East',              icon: GraduationCap },
                    { label: 'Graduating', value: t.appContent.about.classOf,  icon: Calendar },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border"
                      style={{
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'var(--ds-bg-card)',
                        borderColor: 'var(--ds-border)',
                        boxShadow: isDark ? 'none' : 'var(--ds-shadow-sm)',
                      }}
                    >
                      <p className="ds-overline mb-1" style={{ color: 'var(--ds-brand)' }}>
                        {item.label}
                      </p>
                      <p className="font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '11+',    label: 'MUN Conferences',          desc: 'Public Speaking' },
                  { value: 'Top 20', label: 'Squash (SG Age Group)',    desc: 'Athletics' },
                  { value: '\uD83E\uDD41', label: 'Self-taught Drummer', desc: 'Musical Skill' },
                  { value: 'UWC',    label: 'East Campus',              desc: 'Institution' },
                ].map((fact, i) => (
                  <motion.div
                    {...stagger(i)}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    key={i}
                    className="p-6 rounded-3xl border flex flex-col justify-center text-center"
                    style={{
                      background: isDark ? 'var(--ds-bg-elevated)' : 'var(--ds-bg-card)',
                      borderColor: 'var(--ds-border)',
                      boxShadow: 'var(--ds-shadow-card)',
                    }}
                  >
                    <p
                      className="text-2xl md:text-3xl font-black mb-2"
                      style={{ color: 'var(--ds-brand)' }}
                    >
                      {fact.value}
                    </p>
                    <p className="ds-body-sm font-bold opacity-80 leading-tight">
                      {fact.label}
                    </p>
                    <p
                      className="ds-overline mt-2 opacity-50"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {fact.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -- SKILLS / BLOCK-TO-CODE --------------------------------------- */}
        <section
          id="skills"
          className="py-24 md:py-32 px-6 md:px-8"
          style={{
            background: isDark ? 'rgba(255,255,255,0.02)' : 'var(--ds-bg-surface)',
          }}
        >
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="ds-heading-1 mb-4">
                The <span style={{ color: 'var(--ds-brand)' }}>Evolution</span>
              </h2>
              <p className="ds-body-lg" style={{ color: 'var(--ds-text-secondary)' }}>
                My journey started with drag-and-drop logic. Now, I engineer
                systems with clean code. The logic remains the same &mdash; only
                the syntax changes.
              </p>
            </div>
            <BlockToCode />
          </div>
        </section>

        {/* -- EDUCATION ---------------------------------------------------- */}
        <section
          id="education"
          className="py-24 md:py-32 px-6 md:px-8 relative overflow-hidden"
          style={{ background: 'var(--ds-brand-surface)' }}
        >
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-16">
              <div
                className="ds-section-icon shadow-lg"
                style={{
                  background: 'var(--ds-brand)',
                  boxShadow: '0 8px 24px var(--ds-brand-glow)',
                }}
              >
                <GraduationCap size={24} />
              </div>
              <h2 className="ds-heading-1">Education</h2>
            </div>

            {t.appContent.resume.education.map((edu, i) => (
              <motion.div
                {...stagger(i)}
                key={i}
                className="group p-8 md:p-10 rounded-3xl border transition-all hover:border-[var(--ds-brand)]"
                style={{
                  background: isDark ? 'var(--ds-bg-inset)' : 'var(--ds-bg-card)',
                  borderColor: 'var(--ds-border)',
                  boxShadow: isDark ? 'none' : 'var(--ds-shadow-lg)',
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3
                      className="ds-heading-2 group-hover:scale-[1.01] transition-transform origin-left"
                      style={{ color: 'var(--ds-brand)' }}
                    >
                      {edu.school}
                    </h3>
                    <p className="text-xl font-bold mt-2 opacity-80">{edu.grade}</p>
                    <p
                      className="ds-body-lg mt-6 max-w-3xl"
                      style={{ color: 'var(--ds-text-secondary)' }}
                    >
                      {edu.subjects}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span
                      className="ds-chip"
                      style={{
                        background: 'var(--ds-brand-surface)',
                        color: 'var(--ds-brand)',
                        borderColor: 'var(--ds-brand)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {edu.period}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* -- INTERNSHIPS -------------------------------------------------- */}
        <section id="internships" className="py-24 md:py-32 px-6 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-16">
              <div
                className="ds-section-icon shadow-lg"
                style={{
                  background: 'var(--ds-purple)',
                  boxShadow: '0 8px 24px rgba(139,92,246,0.3)',
                }}
              >
                <Briefcase size={24} />
              </div>
              <h2 className="ds-heading-1">Internships</h2>
            </div>

            <div className="space-y-12">
              {t.appContent.resume.internships.map((intern, i) => (
                <motion.div
                  {...stagger(i)}
                  key={i}
                  className="relative pl-8 md:pl-12 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[var(--ds-purple)] before:to-transparent"
                >
                  <div
                    className="absolute left-[-6px] top-2 w-3 h-3 rounded-full ring-4 ring-[var(--ds-purple-surface)]"
                    style={{ background: 'var(--ds-purple)' }}
                  />
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                    <div>
                      <h3 className="ds-heading-2">{intern.role}</h3>
                      <p className="text-xl font-bold" style={{ color: 'var(--ds-purple)' }}>
                        {intern.company}
                      </p>
                    </div>
                    <span
                      className="font-mono font-bold"
                      style={{ color: 'var(--ds-text-muted)' }}
                    >
                      {intern.year}
                    </span>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {intern.points.map((point, pi) => (
                      <li
                        key={pi}
                        className="p-5 rounded-2xl border flex items-start gap-4"
                        style={{
                          background: isDark
                            ? 'rgba(255,255,255,0.03)'
                            : 'var(--ds-bg-card)',
                          borderColor: 'var(--ds-border)',
                          color: 'var(--ds-text-secondary)',
                          boxShadow: isDark ? 'none' : 'var(--ds-shadow-sm)',
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ background: 'var(--ds-purple)' }}
                        />
                        <p className="ds-body-sm leading-relaxed">{point}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* -- LEADERSHIP --------------------------------------------------- */}
        <section
          id="leadership"
          className="py-24 md:py-32 px-6 md:px-8 relative"
          style={{ background: 'var(--ds-blue-surface)' }}
        >
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-16">
              <div
                className="ds-section-icon shadow-lg"
                style={{
                  background: 'var(--ds-blue)',
                  boxShadow: '0 8px 24px rgba(59,130,246,0.3)',
                }}
              >
                <Trophy size={24} />
              </div>
              <h2 className="ds-heading-1">Leadership</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {t.appContent.resume.leadership.map((lead, i) => (
                <motion.div
                  {...stagger(i)}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  key={i}
                  className="p-10 rounded-3xl border group transition-all"
                  style={{
                    background: isDark ? 'var(--ds-bg-inset)' : 'var(--ds-bg-card)',
                    borderColor: 'var(--ds-border)',
                    boxShadow: 'var(--ds-shadow-card)',
                  }}
                >
                  <h3 className="ds-heading-2 mb-1 group-hover:text-[var(--ds-blue)] transition-colors leading-tight">
                    {lead.role}
                  </h3>
                  <p className="font-bold text-lg opacity-80 mb-4">{lead.org}</p>
                  <span
                    className="ds-chip mb-8 inline-block"
                    style={{
                      background: 'var(--ds-blue-surface)',
                      color: 'var(--ds-blue)',
                      borderColor: 'var(--ds-blue)',
                    }}
                  >
                    {lead.period}
                  </span>
                  <ul className="space-y-4">
                    {lead.points.map((point, pi) => (
                      <li
                        key={pi}
                        className="flex gap-3 ds-body-sm opacity-70 leading-relaxed"
                      >
                        <Zap
                          size={16}
                          className="shrink-0"
                          style={{ color: 'var(--ds-blue)' }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* -- PROJECTS ----------------------------------------------------- */}
        <section id="projects" className="py-24 md:py-32 px-6 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 mb-16">
              <div className="flex items-center gap-4">
                <div
                  className="ds-section-icon shadow-lg"
                  style={{
                    background: 'var(--ds-pink)',
                    boxShadow: '0 8px 24px rgba(236,72,153,0.3)',
                  }}
                >
                  <Code2 size={24} />
                </div>
                <h2 className="ds-heading-1">Projects</h2>
              </div>
              <button
                onClick={() => setViewMode('desktop')}
                className="ds-btn ds-btn-ghost ds-btn-sm group"
              >
                View all projects{' '}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  {...stagger(i)}
                  className="min-w-[85vw] md:min-w-0 snap-center group relative rounded-3xl overflow-hidden border transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: isDark
                      ? 'var(--ds-bg-elevated)'
                      : 'var(--ds-bg-card)',
                    borderColor: 'var(--ds-border)',
                    boxShadow: 'var(--ds-shadow-card)',
                  }}
                >
                  <div
                    className={`h-64 bg-gradient-to-br ${project.color} p-8 flex flex-col justify-end relative overflow-hidden`}
                  >
                    <div className="absolute top-6 right-6 flex gap-2">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                          aria-label={`View ${project.name} demo`}
                        >
                          <ExternalLink size={20} aria-hidden="true" />
                        </a>
                      )}
                      {project.links.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                          aria-label={`View ${project.name} source code`}
                        >
                          <Github size={20} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                    <div className="relative z-10">
                      <p className="ds-overline text-white/70 mb-2">{project.type}</p>
                      <h3 className="text-3xl font-black text-white group-hover:tracking-wider transition-all duration-500 leading-tight">
                        {project.name}
                      </h3>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:w-60 group-hover:h-60 transition-all duration-700" />
                  </div>
                  <div className="p-8">
                    <p
                      className="ds-body-sm leading-relaxed mb-6 line-clamp-3"
                      style={{ color: 'var(--ds-text-secondary)' }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="ds-overline px-3 py-1 rounded-lg"
                          style={{
                            background: isDark
                              ? 'rgba(255,255,255,0.05)'
                              : 'var(--ds-bg-surface)',
                            color: 'var(--ds-text-muted)',
                            border: '1px solid var(--ds-border)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* -- JARVIS SHOWCASE ---------------------------------------------- */}
        <section
          id="jarvis"
          className="py-24 md:py-32 px-6 md:px-8 relative overflow-hidden"
          style={{
            background: isDark ? 'var(--ds-bg-elevated)' : '#0f172a',
            borderTop: '1px solid var(--ds-border)',
            borderBottom: '1px solid var(--ds-border)',
          }}
        >
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -mr-64 -mt-64"
            style={{ background: 'var(--ds-brand-surface)', opacity: 0.4 }}
          />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] -ml-64 -mb-64"
            style={{ background: 'var(--ds-purple-surface)', opacity: 0.4 }}
          />

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
              <motion.div
                {...fadeUp}
                className="ds-chip mb-6"
                style={{
                  background: 'var(--ds-brand-surface)',
                  color: 'var(--ds-brand)',
                  borderColor: 'var(--ds-brand)',
                }}
              >
                Featured Project Spotlight
              </motion.div>
              <h2 className="ds-display text-white mb-6">
                Project <span style={{ color: 'var(--ds-brand)' }}>Jarvis</span>
              </h2>
              <p className="ds-body-lg text-slate-400">
                A high-performance personal AI companion built in Python.
                Features real-time voice interaction, screen analysis, and system
                automation. Designed to be the nervous system of my digital life.
              </p>
            </div>

            <div className="relative group">
              <div
                className="absolute -inset-4 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"
                style={{
                  background:
                    'linear-gradient(135deg, var(--ds-brand-surface), var(--ds-purple-surface))',
                }}
              />
              <JarvisTerminal />
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-4">
              {[
                { icon: Cpu,      label: 'Faster-Whisper',      color: 'var(--ds-brand)' },
                { icon: Activity, label: 'Real-time STT/TTS',   color: 'var(--ds-purple)' },
                { icon: Zap,      label: 'Tool-Calling Engine', color: 'var(--ds-amber)' },
              ].map((tech, i) => (
                <div
                  key={i}
                  className="ds-chip px-6 py-3 rounded-2xl backdrop-blur-md ds-body-sm font-bold text-slate-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'var(--ds-border)',
                  }}
                >
                  <tech.icon size={14} style={{ color: tech.color }} /> {tech.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- CONTACT ------------------------------------------------------ */}
        <section
          id="contact"
          className="py-24 md:py-32 px-6 md:px-8"
          style={{
            background: 'linear-gradient(to top, var(--ds-brand-surface), transparent)',
          }}
          aria-label="Contact"
        >
          <div className="container mx-auto max-w-7xl">
            <div
              className="max-w-5xl mx-auto rounded-[3rem] p-8 md:p-20 relative overflow-hidden border"
              style={{
                borderColor: 'var(--ds-border)',
                boxShadow: '0 20px 60px var(--ds-brand-glow)',
              }}
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{ background: 'var(--ds-brand)' }}
              />
              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="ds-display mb-8">
                  Let&apos;s <span style={{ color: 'var(--ds-brand)' }}>Connect</span>
                </h2>
                <p
                  className="ds-body-lg mb-12 max-w-2xl leading-relaxed"
                  style={{ color: 'var(--ds-text-secondary)' }}
                >
                  Whether you have a question, a potential project, or just want
                  to say hi &mdash; I&apos;m always open to connecting.
                </p>
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                  <a
                    href="mailto:agarw48550@gapps.uwcsea.edu.sg"
                    className="ds-btn ds-btn-primary ds-btn-lg"
                  >
                    <Mail size={24} /> Send Email
                  </a>
                </div>
                <div className="flex items-center justify-center gap-8">
                  {[
                    { icon: Github,   href: 'https://github.com/agarw48550',        label: 'GitHub' },
                    { icon: Linkedin, href: 'https://linkedin.com/in/ayaanagarwal', label: 'LinkedIn' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-bold transition-all hover:text-[var(--ds-brand)] group"
                      aria-label={`Visit my ${social.label} profile`}
                    >
                      <div
                        className="p-3 rounded-2xl border transition-all group-hover:border-[var(--ds-brand)]"
                        style={{
                          background: isDark
                            ? 'rgba(255,255,255,0.05)'
                            : 'var(--ds-bg-surface)',
                          borderColor: 'var(--ds-border)',
                        }}
                      >
                        <social.icon size={24} aria-hidden="true" />
                      </div>
                      <span className="hidden sm:inline ds-body-sm">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -- FOOTER ------------------------------------------------------- */}
        <footer
          className="py-12 px-6 md:px-8 pb-24 md:pb-12"
          style={{ borderTop: '1px solid var(--ds-border)' }}
        >
          <div
            className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 ds-caption"
            style={{ color: 'var(--ds-text-muted)' }}
          >
            <p>
              &copy; {new Date().getFullYear()} Ayaan Agarwal. Built with
              Passion &amp; Code.
            </p>
            <div className="flex gap-8">
              <a
                href="#hero"
                className="hover:text-[var(--ds-brand)] transition-colors"
              >
                Back to top
              </a>
              <button
                onClick={() => setViewMode('desktop')}
                className="hover:text-[var(--ds-brand)] transition-colors"
              >
                View as OS
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
