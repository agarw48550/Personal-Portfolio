'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Volume2, VolumeX } from 'lucide-react';
import WebcamFeed from '@/components/stringsync/WebcamFeed';
import { HandTracker } from '@/components/stringsync/HandTracker';
import { detectChord, ChordSmoother } from '@/components/stringsync/ChordDetector';
import { StrumDetector } from '@/components/stringsync/StrumDetector';
import { AudioEngine } from '@/components/stringsync/AudioEngine';
import { Results } from '@mediapipe/hands';

export default function StringSyncPage() {
    // Refs for logic engines (persist across renders)
    const handTracker = useRef<HandTracker | null>(null);
    const chordSmoother = useRef<ChordSmoother>(new ChordSmoother(5));
    const strumDetector = useRef<StrumDetector>(new StrumDetector());
    const audioEngine = useRef<AudioEngine>(new AudioEngine());

    // UI Refs
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // State
    const [isCtxLoaded, setIsCtxLoaded] = useState(false);
    const [status, setStatus] = useState<'initializing' | 'ready' | 'error'>('initializing');
    const [currentChord, setCurrentChord] = useState<string | null>(null);
    const [lastStrum, setLastStrum] = useState<number>(0);
    const [streamReady, setStreamReady] = useState(false);

    // Use a ref for currentChord to access it in the closure without re-binding
    const chordRef = useRef<string | null>(null);
    useEffect(() => { chordRef.current = currentChord; }, [currentChord]);

    // Initialize Logic
    useEffect(() => {
        let mounted = true;

        const onResults = (results: Results) => {
            if (!mounted || !canvasRef.current || !videoRef.current) return;

            // Draw visuals
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.canvas.width = videoRef.current.videoWidth;
                ctx.canvas.height = videoRef.current.videoHeight;
                handTracker.current?.draw(ctx, results);
            }

            // Logic Processing
            if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {

                let leftHandLandmarks = null;
                let rightHandLandmarks = null;

                // Naive classification based on X position
                // Mirrored View: 
                // User's Left Hand appears on Left side of screen (x < 0.5)
                // User's Right Hand appears on Right side of screen (x > 0.5)
                // Wait, standard mirror means if I raise my Left hand, it's on the Left side of the image.

                for (const landmarks of results.multiHandLandmarks) {
                    const avgX = landmarks[0].x; // Wrist position
                    if (avgX < 0.5) {
                        // Left Side -> Left Hand -> Chords
                        leftHandLandmarks = landmarks;
                    } else {
                        // Right Side -> Right Hand -> Strum
                        rightHandLandmarks = landmarks;
                    }
                }

                // 1. Detect Chord (Left Hand)
                if (leftHandLandmarks) {
                    const rawChord = detectChord(leftHandLandmarks);
                    const stableChord = chordSmoother.current.getStableChord(rawChord);
                    if (stableChord) {
                        setCurrentChord(stableChord);
                    }
                }

                // 2. Detect Strum (Right Hand)
                if (rightHandLandmarks) {
                    const isStrumming = strumDetector.current.detect(rightHandLandmarks);
                    // Use ref for current chord access
                    if (isStrumming && chordRef.current) {
                        // Trigger Sound
                        audioEngine.current.play(chordRef.current);
                        // Trigger Visual
                        setLastStrum(Date.now());
                    }
                }
            }
        };

        const init = async () => {
            try {
                await audioEngine.current.preload();
                // Pass the callback
                handTracker.current = new HandTracker(onResults);
                setIsCtxLoaded(true); // Dependencies loaded
            } catch (e) {
                console.error(e);
                setStatus('error');
            }
        };

        init();

        return () => {
            mounted = false;
            handTracker.current?.stop();
        };
    }, []); // Run once on mount

    // Start Camera when Video is ready
    const onVideoReady = async (video: HTMLVideoElement) => {
        if (handTracker.current && status === 'initializing') {
            setStatus('ready');
            await handTracker.current.start(video);
            setStreamReady(true);
        }
    };

    const startAudio = () => {
        audioEngine.current.resume();
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30" onClick={startAudio}>
            {/* Mobile/Tablet Warning Banner */}
            <div className="lg:hidden fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 text-center">
                <div className="text-4xl mb-4">🎸</div>
                <h2 className="text-2xl font-bold mb-2">Desktop Experience Only</h2>
                <p className="text-gray-400">
                    StringSync requires a webcam and keyboard/mouse for the best experience.
                    Please open this project on a desktop computer with Chrome.
                </p>
                <Link href="/" className="mt-8 px-6 py-3 bg-white/10 rounded-full text-white font-medium hover:bg-white/20 transition-colors">
                    Return to Portfolio
                </Link>
            </div>

            {/* Main Content */}
            <div className="hidden lg:flex flex-col min-h-screen p-8 max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-medium">Back to Portfolio</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🎸</span>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                            StringSync
                        </h1>
                    </div>

                    <div className="w-[140px] text-right text-xs text-gray-500">
                        {status === 'ready' ? (
                            <span className="flex items-center justify-end gap-2 text-green-400">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Active
                            </span>
                        ) : (
                            <span className="flex items-center justify-end gap-2 text-yellow-400">
                                <Loader2 className="animate-spin" size={12} />
                                Initializing
                            </span>
                        )}
                    </div>
                </header>

                {/* Main Workspace */}
                <main className="flex-1 flex flex-col items-center justify-center w-full">

                    {/* Webcam Container */}
                    <div className={`relative w-full max-w-4xl aspect-[4/3] bg-gray-900/50 rounded-3xl overflow-hidden border transition-all duration-100 shadow-2xl backdrop-blur-sm mb-12 group ${Date.now() - lastStrum < 150 ? 'border-purple-500 shadow-purple-500/20 scale-[1.01]' : 'border-white/10'
                        }`}>

                        {/* Webcam Feed */}
                        {isCtxLoaded && (
                            <WebcamFeed
                                onVideoReady={onVideoReady}
                                videoRef={videoRef}
                                canvasRef={canvasRef}
                                streamReady={streamReady}
                            />
                        )}

                        {/* Loading State */}
                        {!streamReady && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 bg-gray-900/80 z-10">
                                <div className="w-16 h-16 rounded-full border-2 border-gray-700 border-dashed flex items-center justify-center mb-4 animate-spin-slow">
                                    <div className="w-2 h-2 bg-gray-700 rounded-full" />
                                </div>
                                <p className="font-medium">Starting Camera...</p>
                            </div>
                        )}

                        {/* Overlay UI (Instructions) */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 text-xs text-gray-300 max-w-[200px]">
                                <p className="font-bold text-white mb-1">Left Screen (Your Left Hand)</p>
                                <p>Hold up fingers to form chords.</p>
                            </div>
                            <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 text-xs text-gray-300 max-w-[200px] text-right">
                                <p className="font-bold text-white mb-1">Right Screen (Your Right Hand)</p>
                                <p>Strum downwards to play.</p>
                            </div>
                        </div>

                        {/* Strum Flash */}
                        <div className={`absolute inset-0 bg-white/10 pointer-events-none transition-opacity duration-75 ${Date.now() - lastStrum < 100 ? 'opacity-100' : 'opacity-0'
                            }`} />

                    </div>

                    {/* Interactive Info */}
                    <div className="w-full max-w-4xl flex items-center justify-between px-8 bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
                        <div className="text-center w-1/3 border-r border-white/10">
                            <p className="text-gray-500 text-xs tracking-widest uppercase mb-2">Current Chord</p>
                            <div className="h-20 flex items-center justify-center">
                                <span className={`text-6xl font-bold transition-all duration-200 ${currentChord ? 'text-white scale-110' : 'text-gray-700 scale-100'
                                    }`}>
                                    {currentChord || '--'}
                                </span>
                            </div>
                        </div>

                        <div className="text-center w-1/3 border-r border-white/10">
                            <p className="text-gray-500 text-xs tracking-widest uppercase mb-2">Detection</p>
                            <div className="h-20 flex items-center justify-center flex-col gap-2">
                                <div className={`px-3 py-1.5 rounded-full text-xs font-mono border ${currentChord ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-white/5 text-gray-500 border-white/5'
                                    }`}>
                                    {currentChord ? 'CHORD LOCKED' : 'NO CHORD'}
                                </div>
                                <div className={`px-3 py-1.5 rounded-full text-xs font-mono border ${Date.now() - lastStrum < 300 ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-white/5 text-gray-500 border-white/5'
                                    }`}>
                                    {Date.now() - lastStrum < 300 ? 'STRUMMING' : 'IDLE'}
                                </div>
                            </div>
                        </div>

                        <div className="text-center w-1/3">
                            <p className="text-gray-500 text-xs tracking-widest uppercase mb-2">Audio Engine</p>
                            <div className="h-20 flex items-center justify-center">
                                <button className="flex flex-col items-center gap-2 group" onClick={startAudio}>
                                    <div className={`p-3 rounded-full transition-colors ${status === 'ready' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'
                                        }`}>
                                        {status === 'ready' ? <Volume2 size={24} /> : <VolumeX size={24} />}
                                    </div>
                                    <span className="text-[10px] text-gray-500 group-hover:text-white transition-colors">
                                        {status === 'ready' ? 'System Active' : 'Click to Enable'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-gray-600 text-sm">
                        Tip: Ensure good lighting and keep your hands visible in the frame.
                    </p>

                </main>
            </div>
        </div>
    );
}
