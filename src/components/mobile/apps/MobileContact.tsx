import React from 'react';
import { Mail, Phone, FileText, Send } from 'lucide-react';

export default function MobileContact() {
    return (
        <div className="space-y-6 p-2 pb-20">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-[#2d3436]">Get In Touch</h2>
                <p className="text-xs text-[#636e72]">Available for freelance & collaboration</p>
            </div>

            <div className="space-y-3">
                <a
                    href="mailto:agarw48550@gapps.uwcsea.edu.sg"
                    className="flex items-center gap-3 bg-[#dfe6e9] p-3 rounded-lg border-2 border-[#b2bec3] active:bg-[#b2bec3] transition-colors"
                >
                    <div className="w-8 h-8 bg-[#74b9ff] rounded-full flex items-center justify-center text-white">
                        <Mail size={16} />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-bold text-[#636e72]">Email</div>
                        <div className="text-xs font-bold text-[#2d3436]">agarw48550@gapps...</div>
                    </div>
                </a>

                <a
                    href="tel:+6582837800"
                    className="flex items-center gap-3 bg-[#dfe6e9] p-3 rounded-lg border-2 border-[#b2bec3] active:bg-[#b2bec3] transition-colors"
                >
                    <div className="w-8 h-8 bg-[#55efc4] rounded-full flex items-center justify-center text-white">
                        <Phone size={16} />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-bold text-[#636e72]">Phone</div>
                        <div className="text-xs font-bold text-[#2d3436]">+65 8283 7800</div>
                    </div>
                </a>

                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#dfe6e9] p-3 rounded-lg border-2 border-[#b2bec3] active:bg-[#b2bec3] transition-colors"
                >
                    <div className="w-8 h-8 bg-[#a29bfe] rounded-full flex items-center justify-center text-white">
                        <FileText size={16} />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-bold text-[#636e72]">Resume</div>
                        <div className="text-xs font-bold text-[#2d3436]">Download PDF</div>
                    </div>
                </a>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-[#b2bec3] border-dashed text-center">
                <p className="text-xs text-[#636e72] mb-3">Send a quick message</p>
                <button className="w-full bg-[#2d3436] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    <Send size={16} />
                    SAY HELLO
                </button>
            </div>
        </div>
    );
}
