'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MapPin, Github, Linkedin, Twitter, FileText, CheckCircle, Loader2 } from 'lucide-react';

const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/agarw48550', color: 'hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/', color: 'hover:text-sky-400' },
];

export default function ContactApp() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        
        // Simulate sending - in production, connect to email service like EmailJS or Resend
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
        
        // Reset after showing success
        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
        }, 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="h-full flex flex-col md:flex-row bg-gray-900 overflow-hidden">
            {/* Contact Info Sidebar */}
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-full md:w-2/5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 md:p-8 flex flex-col border-r border-gray-800"
            >
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-cyan-400">Let's Connect</h2>
                    <p className="text-gray-400 mb-8 text-sm">
                        I'm always excited to collaborate on interesting projects or just chat about tech!
                    </p>

                    <div className="space-y-5">
                        <motion.a 
                            href="mailto:agarw48550@gapps.uwcsea.edu.sg"
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-4 group cursor-pointer"
                        >
                            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                                <Mail className="text-cyan-400" size={20} />
                            </div>
                            <div>
                                <h3 className="font-medium text-white">Email</h3>
                                <p className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
                                    agarw48550@gapps.uwcsea.edu.sg
                                </p>
                            </div>
                        </motion.a>

                        <motion.div 
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-4"
                        >
                            <div className="p-2 bg-cyan-500/10 rounded-lg">
                                <MapPin className="text-cyan-400" size={20} />
                            </div>
                            <div>
                                <h3 className="font-medium text-white">Location</h3>
                                <p className="text-sm text-gray-400">Singapore 🇸🇬</p>
                            </div>
                        </motion.div>

                        {/* Resume Download */}
                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-4 group cursor-pointer"
                        >
                            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                                <FileText className="text-cyan-400" size={20} />
                            </div>
                            <div>
                                <h3 className="font-medium text-white">Resume</h3>
                                <p className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
                                    Download PDF →
                                </p>
                            </div>
                        </motion.a>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-auto pt-8">
                    <p className="text-xs text-gray-500 mb-3">Find me online</p>
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-2.5 bg-gray-800 rounded-lg text-gray-400 ${social.color} transition-colors border border-gray-700 hover:border-gray-600`}
                                title={social.name}
                            >
                                <social.icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Form Section */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-900">
                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="h-full flex flex-col items-center justify-center text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.1 }}
                                className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4"
                            >
                                <CheckCircle size={32} />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                            <p className="text-gray-400 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="px-6 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors"
                            >
                                Send Another
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleSubmit}
                            className="max-w-md mx-auto space-y-5"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                <textarea
                                    required
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Tell me about your project or just say hi..."
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={status === 'sending'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} />
                                    </>
                                )}
                            </motion.button>

                            <p className="text-center text-xs text-gray-500 mt-4">
                                I typically respond within 24-48 hours
                            </p>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
