"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ExternalLink } from 'lucide-react';

export default function BlogsApp() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="h-full w-full bg-white relative flex flex-col">
            {/* Header / Address Bar style */}
            <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-2">
                <div className="flex-1 bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-gray-400">🔒</span>
                    <span>ayaanagarwal.substack.com</span>
                </div>
                <a
                    href="https://ayaanagarwal.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:bg-gray-200 rounded text-gray-600 transition-colors"
                    title="Open in new tab"
                >
                    <ExternalLink size={16} />
                </a>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 top-[45px] flex items-center justify-center bg-white z-10">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                        <p className="text-gray-500 text-sm font-medium">Loading Substack...</p>
                    </div>
                </div>
            )}

            {/* Substack Iframe */}
            <iframe
                src="https://ayaanagarwal.substack.com/embed"
                className="flex-1 w-full border-none bg-white"
                onLoad={() => setIsLoading(false)}
                title="Ayaan's Blog"
            />
        </div>
    );
}
