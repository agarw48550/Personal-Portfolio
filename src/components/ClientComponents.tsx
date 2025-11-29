"use client";

import dynamic from "next/dynamic";

// Dynamic imports for client-only components that use window/document APIs
// These must be in a Client Component because ssr: false is not allowed in Server Components

const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), {
    ssr: false,
});

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
    ssr: false,
});

const KonamiCode = dynamic(() => import("@/components/KonamiCode"), {
    ssr: false,
});

const BackToTop = dynamic(() => import("@/components/BackToTop"), {
    ssr: false,
});

export default function ClientComponents() {
    return (
        <>
            <ScrollProgress />
            <CommandPalette />
            <KonamiCode />
            <BackToTop />
        </>
    );
}
