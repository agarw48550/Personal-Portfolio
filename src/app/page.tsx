'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
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
  <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-mono animate-pulse text-green-400">Loading...</p>
    </div>
  </div>
);

export default function Home() {
  const { isMobile } = useDevice();
  const [mounted, setMounted] = useState(false);
  const [showStartup, setShowStartup] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has visited before in this session
    const visited = sessionStorage.getItem('ayaanos-visited');
    if (visited) {
      setShowStartup(false);
      setHasVisited(true);
    }
  }, []);

  const handleStartupComplete = () => {
    setShowStartup(false);
    sessionStorage.setItem('ayaanos-visited', 'true');
  };

  if (!mounted) return <LoadingScreen />;

  // Show startup animation only for desktop and first visit
  if (showStartup && !isMobile && !hasVisited) {
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
