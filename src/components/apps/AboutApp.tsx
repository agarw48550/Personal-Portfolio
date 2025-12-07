"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function AboutApp() {
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

  return (
    <div className="h-full bg-[#0a192f] text-slate-300 overflow-y-auto relative font-sans selection:bg-cyan-500/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-4xl mx-auto p-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center gap-8 mb-12"
        >
          {/* Profile Image */}
          <motion.div
            className="relative group"
            style={{
              transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-white/10 bg-slate-800 shadow-2xl">
              <Image src="/images/profile.jpg" alt="Ayaan Agarwal" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Intro Text */}
          <div className="text-center md:text-left flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            >
              {t.appContent.about.greeting} <span className="inline-block animate-wave">👋</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-cyan-400 font-medium mb-6"
            >
              {t.appContent.about.role}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center md:justify-start gap-3"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">
                <MapPin size={14} className="text-cyan-400" />
                <span>{t.appContent.about.location}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">
                <span className="text-cyan-400">🎓</span>
                <span>{t.appContent.about.classOf}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-8 h-1 bg-cyan-500 rounded-full" />
              {t.appContent.about.aboutTitle}
            </h3>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
              <p>{t.appContent.about.bio1}</p>
              <p>{t.appContent.about.bio2}</p>
            </div>
          </div>

          {/* Quick Facts Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm h-fit">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>⚡</span> {t.appContent.about.factsTitle}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">🎤</span>
                <span>{t.appContent.about.fact1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">🏸</span>
                <span>{t.appContent.about.fact2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">🥁</span>
                <span>{t.appContent.about.fact3}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">🎸</span>
                <span>{t.appContent.about.fact4}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">🏫</span>
                <span>{t.appContent.about.fact5}</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/10 pt-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">{t.appContent.about.contactTitle}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="mailto:agarw48550@gapps.uwcsea.edu.sg"
              className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs text-slate-400">{t.appContent.about.email}</div>
                <div className="text-white font-medium truncate">agarw48550@gapps.uwcsea.edu.sg</div>
              </div>
            </a>

            <a
              href="tel:+6582837800"
              className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-xs text-slate-400">{t.appContent.about.phone}</div>
                <div className="text-white font-medium">+65 8283 7800</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
