'use client';

import React from 'react';

interface WebcamFeedProps {
    onVideoReady: (video: HTMLVideoElement) => void;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    streamReady: boolean;
}

export default function WebcamFeed({ onVideoReady, videoRef, canvasRef, streamReady }: WebcamFeedProps) {

    // Auto-fill parent container
    return (
        <div className="relative w-full h-full">
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover -scale-x-100" // Mirror effect
                playsInline
                muted
                onLoadedData={(e) => onVideoReady(e.currentTarget)}
                style={{ display: streamReady ? 'block' : 'none' }}
            />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover -scale-x-100 pointer-events-none" // Overlay mirror
            />
        </div>
    );
}
