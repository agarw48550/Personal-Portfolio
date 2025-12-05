'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MatrixRain from '@/components/desktop/MatrixRain';

// Dynamic imports for heavy components
const Desktop = dynamic(() => import('@/components/desktop/Desktop'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-[#0a192f]" />,
});

const RetroPhone = dynamic(() => import('@/components/mobile/RetroPhone'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-[#c7d5e0]" />,
});

export default function Home() {
  const { setIsMobile, isMobile } = useStore();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [showStartup, setShowStartup] = useState(true);

  useEffect(() => {
    setIsMobile(isSmallScreen);
  }, [isSmallScreen, setIsMobile]);

  const handleStartupComplete = () => {
    setShowStartup(false);
  };

  return (
    <main className="h-screen w-screen overflow-hidden relative bg-[#0a192f]">
      {showStartup && (
        <MatrixRain onComplete={handleStartupComplete} />
      )}

      {!showStartup && (
        <>
          {isMobile ? <RetroPhone /> : <Desktop />}
        </>
      )}
    </main>
  );
}
