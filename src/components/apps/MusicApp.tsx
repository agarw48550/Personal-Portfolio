'use client';

import React from 'react';
import { Play, SkipBack, SkipForward, Heart, Repeat, Shuffle } from 'lucide-react';

export default function MusicApp() {
    return (
        <div className="h-full bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
            <div className="flex-1 p-8 flex flex-col items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-tr from-green-400 to-blue-500 rounded-2xl shadow-2xl mb-8 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white/20">Album Art</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Coding Lo-Fi</h2>
                <p className="text-gray-400">Ayaan's Playlist</p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-lg border-t border-white/10">
                <div className="w-full h-1 bg-gray-700 rounded-full mb-4">
                    <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
                </div>

                <div className="flex items-center justify-between">
                    <button className="text-gray-400 hover:text-white"><Shuffle size={20} /></button>
                    <div className="flex items-center gap-6">
                        <button className="text-white hover:scale-110 transition-transform"><SkipBack size={24} /></button>
                        <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
                            <Play size={24} fill="currentColor" />
                        </button>
                        <button className="text-white hover:scale-110 transition-transform"><SkipForward size={24} /></button>
                    </div>
                    <button className="text-gray-400 hover:text-white"><Repeat size={20} /></button>
                </div>
            </div>
        </div>
    );
}
