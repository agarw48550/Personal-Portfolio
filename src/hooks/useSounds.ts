"use client";

import { useCallback, useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';

type SoundType =
    | 'click'
    | 'open'
    | 'close'
    | 'notification'
    | 'typing'
    | 'drag'
    | 'startup'
    | 'retroBeep'
    | 'retroDial';

// We'll use simple synthesized sounds or base64 placeholders if actual files aren't available yet.
// For a premium feel, we should ideally load real assets. 
// For now, we will implement the logic.

export const useSounds = () => {
    const { soundEnabled, isMuted, viewMode } = useStore();
    const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

    useEffect(() => {
        // Preload sounds
        const sounds: Record<SoundType, string> = {
            click: '/sounds/click.mp3',
            open: '/sounds/open.mp3',
            close: '/sounds/close.mp3',
            notification: '/sounds/notification.mp3',
            typing: '/sounds/typing.mp3',
            drag: '/sounds/drag.mp3',
            startup: '/sounds/startup.mp3',
            retroBeep: '/sounds/retro-beep.mp3',
            retroDial: '/sounds/retro-dial.mp3',
        };

        Object.entries(sounds).forEach(([key, src]) => {
            const audio = new Audio(src);
            audio.volume = 0.2; // Softer volume
            audioRefs.current[key] = audio;
        });
    }, []);

    const playSound = useCallback((type: SoundType) => {
        // Only play sounds if enabled, not muted, and in desktop mode
        if (!soundEnabled || isMuted || viewMode !== 'desktop') return;

        const audio = audioRefs.current[type];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {
                // Ignore autoplay errors
            });
        }
    }, [soundEnabled, isMuted, viewMode]);

    return { playSound };
};
