'use client';

import React, { useRef, useEffect } from 'react';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

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

export function drawResults(ctx: CanvasRenderingContext2D, results: any) {
    ctx.save();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
            drawLandmarks(ctx, landmarks, { color: '#FF0000', lineWidth: 1, radius: 2 });
        }
    }
    ctx.restore();
}
