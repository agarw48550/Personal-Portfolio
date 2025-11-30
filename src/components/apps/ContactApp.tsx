'use client';

import React, { useState } from 'react';
import { Mail, Send, MapPin, Phone } from 'lucide-react';

export default function ContactApp() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-white text-gray-800 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Send size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                <p className="text-gray-500 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Send Another
                </button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col md:flex-row bg-gray-50">
            {/* Contact Info */}
            <div className="w-full md:w-1/3 bg-gray-900 text-white p-8 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
                    <p className="text-gray-400 mb-8">
                        I'm always interested in hearing about new projects and opportunities.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Mail className="text-blue-400 mt-1" />
                            <div>
                                <h3 className="font-medium">Email</h3>
                                <p className="text-sm text-gray-400">agarw48550@gapps.uwcsea.edu.sg</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="text-blue-400 mt-1" />
                            <div>
                                <h3 className="font-medium">Location</h3>
                                <p className="text-sm text-gray-400">Singapore</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="text-blue-400 mt-1" />
                            <div>
                                <h3 className="font-medium">School</h3>
                                <p className="text-sm text-gray-400">UWC South East Asia</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex gap-4">
                        {/* Social Icons would go here */}
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 p-8 overflow-y-auto">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            required
                            type="email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {status === 'sending' ? (
                            <>Sending...</>
                        ) : (
                            <>Send Message <Send size={18} /></>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
