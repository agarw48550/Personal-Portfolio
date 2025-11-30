"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { funFacts } from "@/lib/data";

// Typewriter effect cycling through phrases
function TypewriterEffect({ phrases }: { phrases: string[] }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    if (!isDeleting && displayText === currentPhrase) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentPhrase.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <span className="text-cyan-400">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Floating particle component for background
function FloatingParticle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
      initial={{ y: "100%", x: Math.random() * 100 + "%" }}
      animate={{
        y: "-100%",
        x: [
          Math.random() * 100 + "%",
          Math.random() * 100 + "%",
          Math.random() * 100 + "%",
        ],
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// Icon mapping for fun facts
const factIcons: Record<string, string> = {
  Gamer: "🎮",
  Music: "🎸",
  Coffee: "☕",
  Robotics: "🤖",
};

// Fun fact card
function FactCard({ fact, index }: { fact: typeof funFacts[0]; index: number }) {
  const icon = factIcons[fact.title] || "✨";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-300 group"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="text-cyan-400 font-medium mb-1">{fact.title}</h4>
          <p className="text-gray-400 text-sm">{fact.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutApp() {
  const [activeTab, setActiveTab] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const phrases = [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Creative Coder",
    "Tech Explorer",
  ];

  // Track mouse for parallax effect
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
    { id: "about", label: "About", icon: "��" },
    { id: "facts", label: "Fun Facts", icon: "🎯" },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Arc browser header */}
      <div className="bg-black/60 backdrop-blur-xl border-b border-white/5 px-4 py-2 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 flex-1 max-w-md">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-gray-400 text-sm">ayaanagarwal.dev/about</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-black/40 border-b border-white/5 px-4 flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? "text-cyan-400 border-cyan-400"
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="h-[calc(100%-90px)] overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8"
            >
              {/* Hero section with parallax */}
              <div className="max-w-3xl mx-auto">
                <motion.div
                  style={{
                    transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                  }}
                  className="relative mb-8 flex flex-col items-center"
                >
                  {/* Avatar with animated ring */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 animate-spin-slow blur-md opacity-50" style={{ animation: "spin 8s linear infinite" }} />
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400/50">
                      <Image
                        src="/images/avatar.jpg"
                        alt="Ayaan Agarwal"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Name and title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-white mt-6 mb-2"
                  >
                    Ayaan Agarwal
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl h-8"
                  >
                    <TypewriterEffect phrases={phrases} />
                  </motion.div>
                </motion.div>

                {/* Bio section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 mb-6"
                >
                  <h2 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                    <span>��</span> About Me
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Hey there! I&apos;m a passionate developer who loves building things that live on the internet.
                    I specialize in creating elegant, user-focused digital experiences using modern web technologies.
                    When I&apos;m not coding, you&apos;ll find me exploring new tech, contributing to open source,
                    or experimenting with creative projects.
                  </p>
                </motion.div>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {[
                    { label: "Projects", value: "10+", icon: "🚀" },
                    { label: "Technologies", value: "15+", icon: "⚡" },
                    { label: "Years Coding", value: "3+", icon: "💻" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 text-center hover:border-cyan-400/50 transition-colors"
                    >
                      <span className="text-2xl mb-2 block">{stat.icon}</span>
                      <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                      <div className="text-gray-500 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center gap-4 mt-8"
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                  <a
                    href="mailto:contact@ayaanagarwal.dev"
                    className="px-6 py-3 border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get In Touch
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "facts" && (
            <motion.div
              key="facts"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8"
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span>🎯</span> Fun Facts About Me
                </h2>
                <div className="grid gap-4">
                  {funFacts.map((fact, index) => (
                    <FactCard key={index} fact={fact} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
