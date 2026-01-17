"use client";

import { useEffect, useState } from "react";
import { LanguageProvider } from "@/lib/i18n";
import ThemeController from "./ThemeController";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <LanguageProvider>
            <ThemeController />
            {children}
        </LanguageProvider>
    );
}
