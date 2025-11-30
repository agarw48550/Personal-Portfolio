import { create } from 'zustand';

export type AppId = 'about' | 'projects' | 'skills' | 'blog' | 'contact' | 'terminal' | 'settings' | 'music' | 'timeline';

export interface WindowState {
    id: AppId;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    position?: { x: number; y: number };
    size?: { width: number; height: number };
}

interface OSState {
    windows: Record<AppId, WindowState>;
    activeWindowId: AppId | null;
    maxZIndex: number;
    isMenuOpen: boolean;

    // Actions
    openWindow: (id: AppId) => void;
    closeWindow: (id: AppId) => void;
    minimizeWindow: (id: AppId) => void;
    maximizeWindow: (id: AppId) => void;
    focusWindow: (id: AppId) => void;
    toggleStartMenu: () => void;
    closeStartMenu: () => void;
    setWindowPosition: (id: AppId, position: { x: number; y: number }) => void;
    setWindowSize: (id: AppId, size: { width: number; height: number }) => void;
}

const defaultWindows: Record<AppId, WindowState> = {
    about: { id: 'about', title: 'About Me', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 1 },
    projects: { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    skills: { id: 'skills', title: 'Skills', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    blog: { id: 'blog', title: 'Blog', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    contact: { id: 'contact', title: 'Contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    terminal: { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    settings: { id: 'settings', title: 'Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    music: { id: 'music', title: 'Music', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    timeline: { id: 'timeline', title: 'Timeline', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
};

export const useOSStore = create<OSState>((set) => ({
    windows: defaultWindows,
    activeWindowId: 'about',
    maxZIndex: 1,
    isMenuOpen: false,

    openWindow: (id) => set((state) => {
        const newZIndex = state.maxZIndex + 1;
        return {
            windows: {
                ...state.windows,
                [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: newZIndex },
            },
            activeWindowId: id,
            maxZIndex: newZIndex,
            isMenuOpen: false,
        };
    }),

    closeWindow: (id) => set((state) => ({
        windows: {
            ...state.windows,
            [id]: { ...state.windows[id], isOpen: false, isMaximized: false },
        },
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

    minimizeWindow: (id) => set((state) => ({
        windows: {
            ...state.windows,
            [id]: { ...state.windows[id], isMinimized: true },
        },
        activeWindowId: null,
    })),

    maximizeWindow: (id) => set((state) => {
        const newZIndex = state.maxZIndex + 1;
        return {
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    isMaximized: !state.windows[id].isMaximized,
                    zIndex: newZIndex
                },
            },
            activeWindowId: id,
            maxZIndex: newZIndex,
        };
    }),

    focusWindow: (id) => set((state) => {
        if (state.activeWindowId === id) return {};
        const newZIndex = state.maxZIndex + 1;
        return {
            windows: {
                ...state.windows,
                [id]: { ...state.windows[id], isMinimized: false, zIndex: newZIndex },
            },
            activeWindowId: id,
            maxZIndex: newZIndex,
        };
    }),

    toggleStartMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    closeStartMenu: () => set({ isMenuOpen: false }),

    setWindowPosition: (id, position) => set((state) => ({
        windows: {
            ...state.windows,
            [id]: { ...state.windows[id], position },
        },
    })),

    setWindowSize: (id, size) => set((state) => ({
        windows: {
            ...state.windows,
            [id]: { ...state.windows[id], size },
        },
    })),
}));
