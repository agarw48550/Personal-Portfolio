import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to OS
                </Link>

                <h1 className="text-4xl font-bold mb-8">Projects</h1>

                <div className="grid gap-6">
                    {/* Project List - Simplified for SEO/No-JS users */}
                    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                        <h2 className="text-2xl font-bold mb-2">Portfolio OS</h2>
                        <p className="text-gray-400 mb-4">A fully functional operating system simulation in the browser.</p>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Next.js</span>
                            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Three.js</span>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                        <h2 className="text-2xl font-bold mb-2">DragonsTV</h2>
                        <p className="text-gray-400 mb-4">Video news platform for UWCSEA.</p>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Video Production</span>
                            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Leadership</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
