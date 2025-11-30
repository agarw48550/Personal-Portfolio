'use client';

import React from 'react';
import { Moon, Sun, Monitor, Volume2, Wifi } from 'lucide-react';

export default function SettingsApp() {
    return (
        <div className="h-full bg-[#f3f4f6] flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-4">
                <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
                        <Monitor size={18} /> Display
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                        <Volume2 size={18} /> Sound
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                        <Wifi size={18} /> Network
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Display Settings</h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <h3 className="font-medium text-gray-900 mb-4">Appearance</h3>
                    <div className="flex gap-4">
                        <button className="flex-1 p-4 rounded-lg border-2 border-blue-500 bg-gray-50 flex flex-col items-center gap-2">
                            <div className="w-full h-24 bg-gray-200 rounded-md mb-2"></div>
                            <span className="font-medium text-gray-900">Light</span>
                        </button>
                        <button className="flex-1 p-4 rounded-lg border-2 border-transparent hover:border-gray-300 bg-gray-900 flex flex-col items-center gap-2">
                            <div className="w-full h-24 bg-gray-800 rounded-md mb-2"></div>
                            <span className="font-medium text-white">Dark</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Wallpaper</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg ring-2 ring-blue-500 ring-offset-2"></div>
                        <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-500 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"></div>
                        <div className="aspect-video bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
