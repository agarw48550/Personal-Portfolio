'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';

export default function ThemeController() {
    const { setTheme, theme } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const checkTimeAndSetTheme = () => {
            const now = new Date();
            const hours = now.getHours();

            // Day Mode: 06:00 - 18:00 (6am to 6pm)
            const isDayTime = hours >= 6 && hours < 18;
            const targetTheme = isDayTime ? 'light' : 'dark';

            // NOTE: We rely on the store's state for the "source of truth", 
            // but we want to initialize it to the correct time-based theme on first load
            // OR update it if the user crosses the boundary while on the site.

            // However, to respect manual overrides during the session, we use a simple heuristic:
            // If this is the *first* check (mount), we sync with time.
            // If we cross a boundary (e.g. 5:59 -> 6:00), we sync with time.

            // For now, let's just sync on mount to ensure the "Vibe" is correct on entry.
            // And we can set an interval to check for boundary crossings.
        };

        // Initial check on mount
        const now = new Date();
        const hours = now.getHours();
        const isDayTime = hours >= 6 && hours < 18;
        const timeBasedTheme = isDayTime ? 'light' : 'dark';

        // We enforce time-based theme on initial load to ensure the request "The website must feature an Automatic Theme Switcher" is met.
        // The user can manually toggle it afterwards.
        if (theme !== timeBasedTheme) {
            console.log(`[ThemeController] Aligning theme to local time (${hours}:00): Setting to ${timeBasedTheme}`);
            setTheme(timeBasedTheme);
        }

        // Optional: Watch for hour changes to auto-switch if the user leaves the tab open for hours
        const interval = setInterval(() => {
            const currentNow = new Date();
            const currentHours = currentNow.getHours();
            const currentIsDay = currentHours >= 6 && currentHours < 18;
            const expectedTheme = currentIsDay ? 'light' : 'dark';

            // We only urge a switch if we are strictly crossing the boundary? 
            // Or do we aggressively enforce it? 
            // User said: "automatically the time sets the theme, and if they want to change it they can"
            // Let's settle for: Sync on load. 
            // If we really wanted to be fancy, we'd store "lastManualChangeTime" but that's overkill.
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []); // Run once on mount

    // Apply the theme class to the document body or html
    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        const body = window.document.body;

        // Remove previous classes
        root.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');

        // Add current theme class
        root.classList.add(theme);
        body.classList.add(theme);

        // Also set color-scheme style for standard inputs
        root.style.colorScheme = theme;
    }, [theme, mounted]);

    return null; // This component renders nothing
}
