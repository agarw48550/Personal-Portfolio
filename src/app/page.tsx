'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import Scene from '@/components/3d/Scene';
import { useDevice } from '@/hooks/useDevice';

const Desktop = dynamic(() => import('@/components/desktop/Desktop'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const MobileLayout = dynamic(() => import('@/components/mobile/MobileLayout'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const LoadingScreen = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-[#1a1a2e] text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-mono animate-pulse">Booting AyaanOS...</p>
    </div>
  </div>
);

export default function Home() {
  const { isMobile } = useDevice();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingScreen />;

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Desktop />
    </main>
  );
}
