"use client";

import { useCallback } from 'react';
import { useStore } from '@/lib/store';

type HapticPattern =
    | 'soft'
    | 'medium'
    | 'heavy'
    | 'success'
    | 'error'
    | 'retroClick'
    | 'retroLong';

export const useHaptics = () => {
    const { hapticsEnabled } = useStore();

    const triggerHaptic = useCallback((pattern: HapticPattern) => {
        if (!hapticsEnabled || typeof navigator === 'undefined' || !navigator.vibrate) return;

        switch (pattern) {
            case 'soft':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(40);
                break;
            case 'heavy':
                navigator.vibrate(70);
                break;
            case 'success':
                navigator.vibrate([50, 30, 50]);
                break;
            case 'error':
                navigator.vibrate([50, 100, 50, 100, 50]);
                break;
            case 'retroClick':
                navigator.vibrate(25);
                break;
            case 'retroLong':
                navigator.vibrate(200);
                break;
        }
    }, [hapticsEnabled]);

    return { triggerHaptic };
};
