import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function MobileBlog() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="bg-[#2d3436] p-4 rounded-full text-white mb-2">
                <ExternalLink size={32} />
            </div>
            <h2 className="text-xl font-bold text-[#2d3436]">Substack Blog</h2>
            <p className="text-sm text-[#636e72]">
                Read my latest thoughts on technology, AI, and development on Substack.
            </p>
            <a
                href="https://substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#2d3436] text-white rounded-lg font-bold text-sm active:scale-95 transition-transform w-full"
            >
                OPEN SUBSTACK
            </a>
        </div>
    );
}
