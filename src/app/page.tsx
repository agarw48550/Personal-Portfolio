'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDevice } from '@/hooks/useDevice';

const Desktop = dynamic(() => import('@/components/desktop/Desktop'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const MobileLayout = dynamic(() => import('@/components/mobile/MobileLayout'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const StartupAnimation = dynamic(() => import('@/components/ui/StartupAnimation'), {
  ssr: false,
});

const LoadingScreen = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0f] text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-mono animate-pulse text-cyan-400">Loading...</p>
    </div>
  </div>
);

export default function Home() {
  const { isMobile } = useDevice();
  const [mounted, setMounted] = useState(false);
  const [showStartup, setShowStartup] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Always show startup animation on every visit
  }, []);

  const handleStartupComplete = () => {
    setShowStartup(false);
  };

  if (!mounted) return <LoadingScreen />;

  // Show startup animation for ALL devices on EVERY visit
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
