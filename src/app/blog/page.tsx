import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 p-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to OS
                </Link>

                <h1 className="text-4xl font-bold mb-8">Blog</h1>

                <div className="space-y-8">
                    <article className="border-b border-gray-100 pb-8">
                        <span className="text-sm text-gray-500">November 30, 2025</span>
                        <h2 className="text-2xl font-bold mt-2 mb-3 hover:text-blue-600 cursor-pointer">
                            Building an OS in the Browser
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            How I used Next.js, React Three Fiber, and Zustand to create a performant operating system simulation...
                        </p>
                        <Link href="/blog/building-os" className="text-blue-600 font-medium hover:underline">
                            Read more →
                        </Link>
                    </article>
                </div>
            </div>
        </div>
    );
}
