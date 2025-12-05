import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppId = 'about' | 'projects' | 'skills' | 'contact' | 'terminal' | 'timeline' | 'blogs';

interface AppState {
    // System Preferences
    theme: 'dark' | 'light';
    soundEnabled: boolean;
    hapticsEnabled: boolean;
    isMobile: boolean;

    // Desktop State
    activeApp: AppId | null;
    openApps: AppId[];
    minimizedApps: AppId[];
    zIndexes: Record<string, number>;

    // Actions
    setTheme: (theme: 'dark' | 'light') => void;
    toggleSound: () => void;
    toggleHaptics: () => void;
    setIsMobile: (isMobile: boolean) => void;

    openApp: (appId: AppId) => void;
    closeApp: (appId: AppId) => void;
    minimizeApp: (appId: AppId) => void;
    focusApp: (appId: AppId) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            theme: 'dark',
            soundEnabled: true,
            hapticsEnabled: true,
            isMobile: false,

            activeApp: null,
            openApps: [],
            minimizedApps: [],
            zIndexes: {},

            setTheme: (theme) => set({ theme }),
            toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
            toggleHaptics: () => set((state) => ({ hapticsEnabled: !state.hapticsEnabled })),
            setIsMobile: (isMobile) => set({ isMobile }),

            openApp: (appId) => set((state) => {
                if (state.openApps.includes(appId)) {
                    return { activeApp: appId, minimizedApps: state.minimizedApps.filter(id => id !== appId) };
                }
                return {
                    openApps: [...state.openApps, appId],
                    activeApp: appId,
                    zIndexes: { ...state.zIndexes, [appId]: Math.max(0, ...Object.values(state.zIndexes)) + 1 }
                };
            }),

            closeApp: (appId) => set((state) => ({
                openApps: state.openApps.filter((id) => id !== appId),
                activeApp: state.activeApp === appId ? null : state.activeApp,
                minimizedApps: state.minimizedApps.filter((id) => id !== appId),
            })),

            minimizeApp: (appId) => set((state) => ({
                minimizedApps: [...state.minimizedApps, appId],
                activeApp: null,
            })),

            focusApp: (appId) => set((state) => ({
                activeApp: appId,
                minimizedApps: state.minimizedApps.filter((id) => id !== appId),
                zIndexes: { ...state.zIndexes, [appId]: Math.max(0, ...Object.values(state.zIndexes)) + 1 }
            })),
        }),
        {
            name: 'portfolio-storage',
            partialize: (state) => ({
                theme: state.theme,
                soundEnabled: state.soundEnabled,
                hapticsEnabled: state.hapticsEnabled
            }),
        }
    )
);
