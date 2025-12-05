"use client";

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/lib/store';

const CODE_SNIPPETS = [
    "const portfolio = new Portfolio();",
    "import { Future } from 'ayaan';",
    "await displaySkills();",
    "if (user.isImpressed) { hire(); }",
    "function init() { return true; }",
    "console.log('Hello World');",
    "git commit -m 'Initial commit'",
    "npm install success",
    "while(alive) { learn(); }",
    "sudo make me a sandwich",
    "404 Error: Boredom not found",
    "<Button onClick={hire} />",
    "export default Awesome;",
    "class Developer extends Human {}",
    "interface Dreams { big: boolean; }",
];

export default function MatrixRain({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(10, 25, 47, 0.05)'; // Using primary background color
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffc107'; // Accent color (Gold)
            ctx.font = `${fontSize}px 'Fira Code', monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random code snippet or character
                const text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
                // We'll just draw one character from the snippet to keep it matrix-like but English chars
                const char = text[Math.floor(Math.random() * text.length)];

                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        // Sequence timing
        const fadeOutTimer = setTimeout(() => {
            setOpacity(0);
        }, 2500); // Start fading out after 2.5s

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3500); // Complete after 3.5s

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            clearTimeout(fadeOutTimer);
            clearTimeout(completeTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, [onComplete]);

    return (
        <div
            className="fixed inset-0 z-[100] bg-[#0a192f] transition-opacity duration-1000 ease-in-out pointer-events-none"
            style={{ opacity }}
        >
            <canvas ref={canvasRef} className="block" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-4xl md:text-6xl font-bold text-accent animate-pulse tracking-widest opacity-80">
                    INITIALIZING...
                </h1>
            </div>
        </div>
    );
}
