'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    baseOpacity: number;
    mass: number;
    glowMultiplier: number;
    glowVelocity: number;
}

interface GravityParticlesProps {
    particleCount?: number;
    particleSize?: number;
    particleOpacity?: number;
    glowIntensity?: number;
    movementSpeed?: number;
    mouseInfluence?: number;
    backgroundColor?: string;
    particleColor?: string;
    mouseGravity?: 'none' | 'attract' | 'repel';
    gravityStrength?: number;
    className?: string;
}

export default function GravityParticles({
    particleCount = 80,
    particleSize = 2,
    particleOpacity = 0.6,
    glowIntensity = 15,
    movementSpeed = 0.3,
    mouseInfluence = 150,
    backgroundColor = 'transparent',
    particleColor = '#ffffff',
    mouseGravity = 'attract',
    gravityStrength = 80,
    className = '',
}: GravityParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const initializeParticles = useCallback((width: number, height: number): Particle[] => {
        return Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * movementSpeed,
            vy: (Math.random() - 0.5) * movementSpeed,
            size: Math.random() * particleSize + 1,
            opacity: particleOpacity,
            baseOpacity: particleOpacity,
            mass: Math.random() * 0.5 + 0.5,
            glowMultiplier: 1,
            glowVelocity: 0,
        }));
    }, [particleCount, particleSize, particleOpacity, movementSpeed]);

    const updateParticles = useCallback((canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        const mouse = mouseRef.current;

        particlesRef.current.forEach((particle) => {
            // Calculate distance to mouse
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Mouse influence and gravity
            if (distance < mouseInfluence && distance > 0) {
                const force = (mouseInfluence - distance) / mouseInfluence;
                const normalizedDx = dx / distance;
                const normalizedDy = dy / distance;
                const gravityForce = force * (gravityStrength * 0.001);

                if (mouseGravity === 'attract') {
                    particle.vx += normalizedDx * gravityForce;
                    particle.vy += normalizedDy * gravityForce;
                } else if (mouseGravity === 'repel') {
                    particle.vx -= normalizedDx * gravityForce;
                    particle.vy -= normalizedDy * gravityForce;
                }

                particle.opacity = Math.min(1, particle.baseOpacity + force * 0.4);
                
                // Glow animation with spring effect
                const targetGlow = 1 + force * 2.5;
                const springForce = (targetGlow - particle.glowMultiplier) * 0.2;
                particle.glowVelocity = particle.glowVelocity * 0.85 + springForce;
                particle.glowMultiplier += particle.glowVelocity;
            } else {
                particle.opacity = Math.max(particle.baseOpacity * 0.3, particle.opacity - 0.02);
                
                // Return glow to normal
                const targetGlow = 1;
                const springForce = (targetGlow - particle.glowMultiplier) * 0.15;
                particle.glowVelocity = particle.glowVelocity * 0.9 + springForce;
                particle.glowMultiplier = Math.max(1, particle.glowMultiplier + particle.glowVelocity);
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Add subtle random movement
            particle.vx += (Math.random() - 0.5) * 0.002;
            particle.vy += (Math.random() - 0.5) * 0.002;

            // Damping
            particle.vx *= 0.998;
            particle.vy *= 0.998;

            // Boundary wrapping
            if (particle.x < 0) particle.x = rect.width;
            if (particle.x > rect.width) particle.x = 0;
            if (particle.y < 0) particle.y = rect.height;
            if (particle.y > rect.height) particle.y = 0;
        });
    }, [mouseInfluence, mouseGravity, gravityStrength]);

    const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        particlesRef.current.forEach((particle) => {
            ctx.save();
            
            // Create glow effect
            const currentGlowMultiplier = particle.glowMultiplier || 1;
            ctx.shadowColor = particleColor;
            ctx.shadowBlur = glowIntensity * currentGlowMultiplier * 2;
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particleColor;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * currentGlowMultiplier * 0.5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });

        // Draw connections between nearby particles
        ctx.strokeStyle = particleColor;
        particlesRef.current.forEach((particle, i) => {
            for (let j = i + 1; j < particlesRef.current.length; j++) {
                const other = particlesRef.current[j];
                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.save();
                    ctx.globalAlpha = (1 - distance / 100) * 0.15 * particle.opacity;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        });
    }, [particleColor, glowIntensity]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        updateParticles(canvas);
        drawParticles(ctx);
        animationRef.current = requestAnimationFrame(animate);
    }, [updateParticles, drawParticles]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }, []);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        if (particlesRef.current.length === 0) {
            particlesRef.current = initializeParticles(rect.width, rect.height);
        } else {
            // Redistribute particles
            particlesRef.current.forEach((particle) => {
                if (particle.x > rect.width) particle.x = Math.random() * rect.width;
                if (particle.y > rect.height) particle.y = Math.random() * rect.height;
            });
        }
    }, [initializeParticles]);

    useEffect(() => {
        if (!isClient) return;

        resizeCanvas();
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', resizeCanvas);

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isClient, handleMouseMove, resizeCanvas, animate]);

    if (!isClient) {
        return (
            <div
                ref={containerRef}
                className={`absolute inset-0 ${className}`}
                style={{ backgroundColor }}
            />
        );
    }

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 ${className}`}
            style={{ backgroundColor }}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: 'block' }}
            />
        </div>
    );
}
