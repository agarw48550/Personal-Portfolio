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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const subject = `Portfolio Contact from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

        window.location.href = `mailto:agarw48550@gapps.uwcsea.edu.sg?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setStatus('success');
        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setStatus('idle');
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="h-full flex flex-col md:flex-row overflow-hidden" style={{ background: 'var(--ds-bg)' }}>
            {/* Contact Info Sidebar */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-full md:w-2/5 p-6 md:p-8 flex flex-col"
                style={{ background: 'var(--ds-bg-elevated)', borderRight: '1px solid var(--ds-border)', color: 'var(--ds-text)' }}
            >
                <div>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--ds-brand)' }}>Let&apos;s Connect</h2>
                    <p className="mb-8 text-sm" style={{ color: 'var(--ds-text-secondary)' }}>
                        I'm always excited to collaborate on interesting projects or just chat about tech!
                    </p>

                    <div className="space-y-5">
                        <motion.a
                            href="mailto:agarw48550@gapps.uwcsea.edu.sg"
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-4 group cursor-pointer"
                        >
                            <div className="p-2 rounded-lg transition-colors" style={{ background: 'var(--ds-brand-surface)' }}>
                                <Mail style={{ color: 'var(--ds-brand)' }} size={20} />
                            </div>
                            <div>
                                <h3 className="font-medium" style={{ color: 'var(--ds-text)' }}>Email</h3>
                                <p className="text-sm transition-colors" style={{ color: 'var(--ds-text-muted)' }}>
                                    agarw48550@gapps.uwcsea.edu.sg
                                </p>
                            </div>
                        </motion.a>

                        <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-4"
                        >
                            <div className="p-2 rounded-lg" style={{ background: 'var(--ds-brand-surface)' }}>
                                <MapPin style={{ color: 'var(--ds-brand)' }} size={20} />
                            </div>
                            <div>
                                <h3 className="font-medium" style={{ color: 'var(--ds-text)' }}>Location</h3>
                                <p className="text-sm" style={{ color: 'var(--ds-text-muted)' }}>Singapore 🇸🇬</p>
                            </div>
                        </motion.div>

                        {/* Resume Download */}
                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-4 group cursor-pointer"
                        >
                            <div className="p-2 rounded-lg transition-colors" style={{ background: 'var(--ds-brand-surface)' }}>
                                <FileText style={{ color: 'var(--ds-brand)' }} size={20} />
                            </div>
                            <div>
                                <h3 className="font-medium" style={{ color: 'var(--ds-text)' }}>Resume</h3>
                                <p className="text-sm transition-colors" style={{ color: 'var(--ds-text-muted)' }}>
                                    Download PDF →
                                </p>
                            </div>
                        </motion.a>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-auto pt-8">
                    <p className="text-xs mb-3" style={{ color: 'var(--ds-text-muted)' }}>Find me online</p>
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2.5 rounded-lg transition-colors"
                                style={{ background: 'var(--ds-bg-inset)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-muted)' }}
                                title={social.name}
                                aria-label={`Visit ${social.name} profile`}
                            >
                                <social.icon size={18} aria-hidden="true" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Form Section */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto" style={{ background: 'var(--ds-bg)' }}>
                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="h-full flex flex-col items-center justify-center text-center"
                            role="status"
                            aria-live="polite"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.1 }}
                                className="w-16 h-16 text-green-400 rounded-full flex items-center justify-center mb-4"
                                style={{ background: 'var(--ds-emerald-surface)' }}
                            >
                                <CheckCircle size={32} />
                            </motion.div>
                            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--ds-text)' }}>Message Sent!</h2>
                            <p className="mb-6" style={{ color: 'var(--ds-text-muted)' }}>Thanks for reaching out. I&apos;ll get back to you soon.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="ds-btn ds-btn-primary"
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
                                <label htmlFor="contact-name" className="block text-sm font-medium mb-2" style={{ color: 'var(--ds-text-secondary)' }}>Name</label>
                                <input
                                    id="contact-name"
                                    required
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="ds-input w-full"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium mb-2" style={{ color: 'var(--ds-text-secondary)' }}>Email</label>
                                <input
                                    id="contact-email"
                                    required
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="ds-input w-full"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium mb-2" style={{ color: 'var(--ds-text-secondary)' }}>Message</label>
                                <textarea
                                    id="contact-message"
                                    required
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="ds-input w-full resize-none"
                                    placeholder="Tell me about your project or just say hi..."
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={status === 'sending'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="ds-btn ds-btn-primary w-full"
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

                            <p className="text-center text-xs mt-4" style={{ color: 'var(--ds-text-muted)' }}>
                                I typically respond within 24-48 hours
                            </p>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
