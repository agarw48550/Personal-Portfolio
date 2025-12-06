"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function MatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
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
        const fontSize = 16;
        const gap = 20;
        const mouseRadius = 120;
        const returnSpeed = 0.08;
        const friction = 0.9;

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
            alpha: number;
            isHead: boolean; // Is this the "head" of a rain drop?

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
                this.vx = 0;
                this.vy = 0;
                this.char = chars[Math.floor(Math.random() * chars.length)];
                this.color = '#0e7490'; // Default dim cyan
                this.size = fontSize;
                this.alpha = 0.1; // Start invisible/dim
                this.isHead = false;
            }

            update() {
                // Distance to mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Interaction Force (Gravity/Swirl)
                if (mouse.active && distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius;
                    const angle = Math.atan2(dy, dx);

                    // Swirl effect: Tangential force + slight attraction
                    const swirlForce = force * 3;
                    const attractionForce = force * 0.5;

                    this.vx += Math.cos(angle) * attractionForce + Math.sin(angle) * swirlForce;
                    this.vy += Math.sin(angle) * attractionForce - Math.cos(angle) * swirlForce;
                }

                // Spring Force (return to grid origin)
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
                if (!ctx || this.alpha <= 0.05) return;

                ctx.fillStyle = this.isHead ? '#22d3ee' : this.color; // Bright cyan for head
                ctx.globalAlpha = this.alpha;
                ctx.font = `${this.size}px 'Fira Code', monospace`;
                ctx.fillText(this.char, this.x, this.y);
                ctx.globalAlpha = 1;
            }
        }

        // Rain Logic
        let drops: number[] = []; // Current row for each column

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            drops = [];

            const columns = Math.floor(canvas.width / gap);
            const rows = Math.floor(canvas.height / gap);

            // Initialize grid of particles
            for (let x = 0; x < columns; x++) {
                drops[x] = Math.floor(Math.random() * rows) - rows; // Start above screen
                for (let y = 0; y < rows; y++) {
                    particles.push(new Particle(x * gap, y * gap));
                }
            }
        };

        const animate = () => {
            // Clear with fade effect for trails
            ctx.fillStyle = isDark ? 'rgba(10, 25, 47, 0.3)' : 'rgba(248, 250, 252, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const columns = Math.floor(canvas.width / gap);
            const rows = Math.floor(canvas.height / gap);

            // Update Rain Drops
            for (let i = 0; i < columns; i++) {
                // Move drop down
                if (Math.random() > 0.95) { // Random speed variation
                    drops[i]++;
                }

                // Reset if off screen
                if (drops[i] * gap > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
            }

            // Update and Draw Particles
            particles.forEach(p => {
                // Find grid coordinates
                const col = Math.floor(p.originX / gap);
                const row = Math.floor(p.originY / gap);

                // Check if this particle is currently part of the rain trail
                const dropRow = drops[col];
                const distToHead = dropRow - row;

                if (distToHead === 0) {
                    // It's the head
                    p.isHead = true;
                    p.alpha = 1;
                    p.char = chars[Math.floor(Math.random() * chars.length)]; // Change char
                } else if (distToHead > 0 && distToHead < 15) {
                    // It's in the trail
                    p.isHead = false;
                    p.alpha = 1 - (distToHead / 15); // Fade out
                } else {
                    // It's inactive
                    p.isHead = false;
                    p.alpha = Math.max(0, p.alpha - 0.02); // Fade out slowly
                }

                p.update();
                p.draw();
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

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    return (
        <canvas ref={canvasRef} className="block w-full h-full" />
    );
}
