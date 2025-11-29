"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-dark-bg text-foreground p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl md:text-4xl font-bold mb-6">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for seems to have wandered off into the
                    digital void.
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/30"
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
}
