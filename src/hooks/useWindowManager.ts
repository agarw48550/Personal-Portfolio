import { useOSStore, AppId } from '@/lib/store';

export const useWindowManager = () => {
    const {
        windows,
        activeWindowId,
        isMenuOpen,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        toggleStartMenu,
        closeStartMenu,
        setWindowPosition,
        setWindowSize
    } = useOSStore();

    const getWindow = (id: AppId) => windows[id];

    return {
        windows,
        activeWindowId,
        isMenuOpen,
        getWindow,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        toggleStartMenu,
        closeStartMenu,
        setWindowPosition,
        setWindowSize
    };
};
