'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface MatrixParticle {
    x: number;
    y: number;
    char: string;
    speed: number;
    opacity: number;
    size: number;
    angle: number;
    distance: number;
    orbitSpeed: number;
    trail: { x: number; y: number; opacity: number }[];
}

export default function MatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<MatrixParticle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationIdRef = useRef<number | null>(null);
    const [mode, setMode] = useState<'orbit' | 'warp'>('orbit');
    const modeRef = useRef(mode);

    // Update ref when mode changes
    useEffect(() => {
        modeRef.current = mode;
    }, [mode]);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const createParticle = useCallback((width: number, height: number): MatrixParticle => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 200;
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            char: chars[Math.floor(Math.random() * chars.length)],
            speed: 0.5 + Math.random() * 2,
            opacity: 0.3 + Math.random() * 0.7,
            size: 10 + Math.random() * 8,
            angle,
            distance,
            orbitSpeed: 0.005 + Math.random() * 0.015,
            trail: [],
        };
    }, [chars]);

    const handleClick = useCallback(() => {
        setMode(prev => prev === 'orbit' ? 'warp' : 'orbit');
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // High DPI setup
        const dpr = window.devicePixelRatio || 1;
        const updateSize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };
        updateSize();

        // Initialize particles
        const particleCount = 150;
        particlesRef.current = [];
        for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push(createParticle(window.innerWidth, window.innerHeight));
        }

        // Falling matrix columns
        const fontSize = 14;
        const columns = Math.floor(window.innerWidth / fontSize);
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        const draw = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const mouse = mouseRef.current;
            const currentMode = modeRef.current;

            // Semi-transparent black for trail effect
            ctx.fillStyle = 'rgba(10, 10, 18, 0.15)';
            ctx.fillRect(0, 0, width, height);

            // Draw falling matrix rain (background layer)
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Distance from mouse
                const dx = x - mouse.x;
                const dy = y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (currentMode === 'warp' && dist < 200) {
                    // Warp effect - curve around mouse
                    const angle = Math.atan2(dy, dx);
                    const warpStrength = (200 - dist) / 200;
                    const warpX = x + Math.cos(angle + Math.PI / 2) * warpStrength * 30;
                    const warpY = y + Math.sin(angle + Math.PI / 2) * warpStrength * 30;
                    
                    ctx.fillStyle = `rgba(34, 211, 238, ${0.3 + warpStrength * 0.5})`;
                    ctx.fillText(char, warpX, warpY);
                } else {
                    // Normal falling
                    const brightness = dist < 300 ? 0.1 + (300 - dist) / 300 * 0.3 : 0.1;
                    ctx.fillStyle = `rgba(34, 211, 238, ${brightness})`;
                    ctx.fillText(char, x, y);
                }

                drops[i] += 0.5;
                if (drops[i] * fontSize > height && Math.random() > 0.98) {
                    drops[i] = 0;
                }
            }

            // Draw orbiting particles
            particlesRef.current.forEach((particle, index) => {
                if (currentMode === 'orbit') {
                    // Orbit around cursor
                    particle.angle += particle.orbitSpeed;
                    
                    // Smoothly move towards orbit position
                    const targetX = mouse.x + Math.cos(particle.angle) * particle.distance;
                    const targetY = mouse.y + Math.sin(particle.angle) * particle.distance;
                    
                    particle.x += (targetX - particle.x) * 0.05;
                    particle.y += (targetY - particle.y) * 0.05;

                    // Add to trail
                    particle.trail.unshift({ x: particle.x, y: particle.y, opacity: particle.opacity });
                    if (particle.trail.length > 8) particle.trail.pop();

                    // Draw trail
                    particle.trail.forEach((point, i) => {
                        const trailOpacity = point.opacity * (1 - i / particle.trail.length) * 0.5;
                        ctx.fillStyle = `rgba(34, 211, 238, ${trailOpacity})`;
                        ctx.font = `${particle.size * (1 - i * 0.1)}px monospace`;
                        ctx.fillText(particle.char, point.x, point.y);
                    });

                    // Draw main character
                    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                    ctx.font = `${particle.size}px monospace`;
                    ctx.fillText(particle.char, particle.x, particle.y);

                    // Glow effect
                    ctx.shadowColor = '#22d3ee';
                    ctx.shadowBlur = 15;
                    ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity * 0.8})`;
                    ctx.fillText(particle.char, particle.x, particle.y);
                    ctx.shadowBlur = 0;

                } else {
                    // Warp mode - particles dispel outward then curve around
                    const dx = particle.x - mouse.x;
                    const dy = particle.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx);
                    
                    const warpRadius = 150;
                    
                    if (dist < warpRadius) {
                        // Push particles out of the warp zone
                        const pushForce = (warpRadius - dist) / warpRadius;
                        particle.x += Math.cos(angle) * pushForce * 8;
                        particle.y += Math.sin(angle) * pushForce * 8;
                    } else if (dist < warpRadius + 100) {
                        // Particles curve around the warp zone
                        const curveAngle = angle + Math.PI / 2;
                        particle.x += Math.cos(curveAngle) * 2;
                        particle.y += Math.sin(curveAngle) * 2;
                        
                        // Maintain distance from center
                        const targetDist = warpRadius + 50;
                        const distDiff = dist - targetDist;
                        particle.x -= Math.cos(angle) * distDiff * 0.02;
                        particle.y -= Math.sin(angle) * distDiff * 0.02;
                    } else {
                        // Far particles drift slowly
                        particle.y += particle.speed * 0.3;
                        if (particle.y > height + 50) {
                            particle.y = -50;
                            particle.x = Math.random() * width;
                        }
                    }

                    // Change character occasionally
                    if (Math.random() < 0.02) {
                        particle.char = chars[Math.floor(Math.random() * chars.length)];
                    }

                    // Draw particle
                    const brightness = dist < warpRadius + 100 ? 0.9 : 0.5;
                    ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity * brightness})`;
                    ctx.font = `${particle.size}px monospace`;
                    ctx.fillText(particle.char, particle.x, particle.y);

                    // Extra glow for particles near warp zone
                    if (dist < warpRadius + 100) {
                        ctx.shadowColor = '#22d3ee';
                        ctx.shadowBlur = 20;
                        ctx.fillText(particle.char, particle.x, particle.y);
                        ctx.shadowBlur = 0;
                    }
                }
            });

            // Draw cursor glow
            const glowGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, currentMode === 'warp' ? 150 : 80);
            if (currentMode === 'warp') {
                glowGradient.addColorStop(0, 'rgba(34, 211, 238, 0)');
                glowGradient.addColorStop(0.7, 'rgba(34, 211, 238, 0.1)');
                glowGradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
            } else {
                glowGradient.addColorStop(0, 'rgba(34, 211, 238, 0.15)');
                glowGradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.05)');
                glowGradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
            }
            ctx.fillStyle = glowGradient;
            ctx.fillRect(0, 0, width, height);

            // Mode indicator near cursor
            ctx.font = '10px monospace';
            ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
            ctx.fillText(currentMode === 'orbit' ? '[ ORBIT ]' : '[ WARP ]', mouse.x - 25, mouse.y - 30);

            animationIdRef.current = requestAnimationFrame(draw);
        };

        draw();

        // Event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', updateSize);

        return () => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', updateSize);
        };
    }, [createParticle, handleMouseMove, chars]);

    return (
        <canvas
            ref={canvasRef}
            onClick={handleClick}
            className="fixed inset-0 w-full h-full cursor-none"
            style={{ background: '#0a0a12' }}
        />
    );
}
