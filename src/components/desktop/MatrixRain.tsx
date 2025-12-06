"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export default function MatrixRain({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [opacity, setOpacity] = useState(1);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: -1000, y: -1000, active: false };

        // Configuration
        const fontSize = 14;
        const gap = 20; // Spacing between characters
        const mouseRadius = 150; // Radius of influence
        const returnSpeed = 0.05; // How fast they snap back
        const friction = 0.9; // Damping

        // English code snippets/words for the matrix
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]*&^%$#@!~";

        class Particle {
            x: number;
            y: number;
            originX: number;
            originY: number;
            vx: number;
            vy: number;
            char: string;
            color: string;
            size: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
                this.vx = 0;
                this.vy = 0;
                this.char = chars[Math.floor(Math.random() * chars.length)];
                // Cyan/Blue theme colors
                this.color = Math.random() > 0.8
                    ? '#22d3ee' // Cyan-400 (Highlight)
                    : '#0e7490'; // Cyan-700 (Dim)
                this.size = fontSize;
            }

            update() {
                // Distance to mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Interaction Force
                if (mouse.active && distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius;

                    // Gravity/Attraction (pull towards mouse)
                    const angle = Math.atan2(dy, dx);
                    const attractionForce = force * 2;

                    // Swirl (tangential force)
                    const swirlForce = force * 2;

                    this.vx += Math.cos(angle) * attractionForce + Math.sin(angle) * swirlForce;
                    this.vy += Math.sin(angle) * attractionForce - Math.cos(angle) * swirlForce;
                }

                // Spring Force (return to origin)
                const homeDx = this.originX - this.x;
                const homeDy = this.originY - this.y;

                this.vx += homeDx * returnSpeed;
                this.vy += homeDy * returnSpeed;

                // Physics
                this.vx *= friction;
                this.vy *= friction;
                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.font = `${this.size}px 'Fira Code', monospace`;
                ctx.fillText(this.char, this.x, this.y);
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];

            const columns = Math.floor(canvas.width / gap);
            const rows = Math.floor(canvas.height / gap);

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < columns; x++) {
                    // Only create particles for some grid points to create a "code" look rather than a dense block
                    if (Math.random() > 0.1) {
                        particles.push(new Particle(x * gap, y * gap));
                    }
                }
            }
        };

        const animate = () => {
            ctx.fillStyle = isDark ? '#0a192f' : '#f8fafc';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        // Event Listeners
        const handleResize = () => init();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Sequence timing
        const fadeOutTimer = setTimeout(() => {
            setOpacity(0);
        }, 3000); // Start fading out after 3s

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 4000); // Complete after 4s

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(fadeOutTimer);
            clearTimeout(completeTimer);
        };
    }, [isDark, onComplete]);

    return (
        <div
            className="fixed inset-0 z-[100] transition-opacity duration-1000 ease-in-out pointer-events-none"
            style={{ opacity }}
        >
            <canvas ref={canvasRef} className="block pointer-events-auto" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 animate-pulse tracking-widest opacity-80 mix-blend-screen">
                    SYSTEM INITIALIZED
                </h1>
            </div>
        </div>
    );
}
