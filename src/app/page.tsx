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

const WebsiteView = dynamic(() => import('@/components/website/WebsiteView'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-[#0a192f]" />,
});

export default function Home() {
  const { setIsMobile, isMobile, viewMode } = useStore();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [showMatrix, setShowMatrix] = useState(true);

  // Handle initial efficient check
  useEffect(() => {
    setIsMobile(isSmallScreen);
  }, [isSmallScreen, setIsMobile]);

  // Trigger matrix rain when switching to desktop mode
  useEffect(() => {
    if (viewMode === 'desktop') {
      setShowMatrix(true);
    }
  }, [viewMode]);

  const handleStartupComplete = () => {
    setShowMatrix(false);
  };

  return (
    <main className="h-screen w-screen overflow-hidden relative bg-[#0a192f]">
      {showMatrix && (
        <MatrixRain onComplete={handleStartupComplete} />
      )}

      {/* Website View */}
      {!showMatrix && viewMode === 'website' && (
        <WebsiteView />
      )}

      {/* Desktop/OS View */}
      {!showMatrix && viewMode === 'desktop' && (
        <>
          {isMobile ? <RetroPhone /> : <Desktop />}
        </>
      )}
    </main>
  );
}
