import React from 'react';
import Image from 'next/image';
import { MapPin, GraduationCap } from 'lucide-react';

export default function MobileAbout() {
    return (
        <div className="space-y-6 p-2 pb-20">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#2d3436] shadow-lg">
                    <Image
                        src="/images/profile.jpg"
                        alt="Ayaan Agarwal"
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-[#2d3436]">Ayaan Agarwal</h1>
                    <p className="text-sm text-[#636e72] font-mono">Full-Stack Developer</p>
                </div>
            </div>

            {/* Stats/Tags */}
            <div className="flex justify-center gap-2 text-xs font-bold text-[#2d3436]">
                <div className="px-2 py-1 bg-[#dfe6e9] rounded border-2 border-[#b2bec3] flex items-center gap-1">
                    <MapPin size={10} /> Singapore
                </div>
                <div className="px-2 py-1 bg-[#dfe6e9] rounded border-2 border-[#b2bec3] flex items-center gap-1">
                    <GraduationCap size={10} /> Class of '28
                </div>
            </div>

            {/* Bio */}
            <div className="bg-[#dfe6e9] p-3 rounded-lg border-2 border-[#b2bec3] shadow-sm">
                <h3 className="text-xs font-bold uppercase mb-2 border-b border-[#b2bec3] pb-1">Bio</h3>
                <p className="text-xs leading-relaxed font-mono text-[#2d3436]">
                    16-year-old student at UWCSEA. Passionate about coding, leadership, and making an impact.
                    Builder of things, learner of tech.
                </p>
            </div>

            {/* Quick Facts */}
            <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase px-1">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#81ecec] p-2 rounded border-2 border-[#00cec9] text-center">
                        <div className="text-lg font-bold">11+</div>
                        <div className="text-[10px] uppercase">MUN Confs</div>
                    </div>
                    <div className="bg-[#fab1a0] p-2 rounded border-2 border-[#e17055] text-center">
                        <div className="text-lg font-bold">Top 20</div>
                        <div className="text-[10px] uppercase">Squash SG</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
