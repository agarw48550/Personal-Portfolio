"use client";

import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaEnvelope, href: "mailto:hello@example.com", label: "Email" },
];

export default function Footer() {
    return (
        <footer className="relative bg-gray-100 dark:bg-gray-900 pt-20 pb-10 overflow-hidden">
            {/* Animated Wave */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white dark:fill-dark-bg"
                    ></path>
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex space-x-6"
                    >
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-2xl"
                                aria-label={link.label}
                            >
                                <link.icon />
                            </a>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center"
                    >
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                            Built with <span className="text-red-500">❤️</span> and lots of{" "}
                            <span className="text-amber-700">☕</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            © {new Date().getFullYear()} Ayaan Agarwal. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
