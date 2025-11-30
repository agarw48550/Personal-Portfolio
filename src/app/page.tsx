'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useDevice } from '@/hooks/useDevice';

// Matrix transition component (no loading spinners)
const MatrixTransition = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const chars = 'アイウエオカキクケコ01';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -30;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillStyle = '#fff';
        ctx.fillText(char, x, y);
        ctx.fillStyle = '#22d3ee';
        ctx.fillText(char, x, y - fontSize);

        drops[i] += 1.5;

        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    const timer = setTimeout(() => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      onComplete();
    }, 800);

    return () => {
      clearTimeout(timer);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0f]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

const Desktop = dynamic(() => import('@/components/desktop/Desktop'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-[#0a0a0f]" />,
});

const MobileLayout = dynamic(() => import('@/components/mobile/MobileLayout'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-[#0a0a0f]" />,
});

const StartupAnimation = dynamic(() => import('@/components/ui/StartupAnimation'), {
  ssr: false,
});

export default function Home() {
  const { isMobile } = useDevice();
  const [mounted, setMounted] = useState(false);
  const [showStartup, setShowStartup] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Quick load check
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  const handleStartupComplete = () => {
    setShowStartup(false);
  };

  // Show nothing while mounting
  if (!mounted) return <div className="h-screen w-screen bg-[#0a0a0f]" />;

  // Matrix transition while loading
  if (isLoading) {
    return <MatrixTransition onComplete={() => setIsLoading(false)} />;
  }

  // Startup animation
  if (showStartup) {
    return <StartupAnimation onComplete={handleStartupComplete} />;
  }

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      <Desktop />
    </main>
  );
}
