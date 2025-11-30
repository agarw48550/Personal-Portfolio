'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface MatrixParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    char: string;
    size: number;
    opacity: number;
    baseOpacity: number;
    glowMultiplier: number;
    glowVelocity: number;
    isOrbiting: boolean;
}

// Code snippets for the matrix rain
const codeSnippets = [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
    'class', 'import', 'export', 'default', 'async', 'await', 'try', 'catch',
    'new', 'this', 'super', 'extends', 'static', 'get', 'set', 'yield',
    'true', 'false', 'null', 'undefined', 'typeof', 'instanceof',
    '=>', '===', '!==', '&&', '||', '...', '?.', '??',
    'map', 'filter', 'reduce', 'forEach', 'find', 'some', 'every',
    'useState', 'useEffect', 'useRef', 'useCallback', 'useMemo',
    'React', 'Next', 'Node', 'API', 'REST', 'GraphQL', 'SQL',
    'npm', 'git', 'push', 'pull', 'commit', 'merge', 'branch',
    '<div>', '</div>', '<span>', '<button>', '<input>', '<form>',
    'onClick', 'onChange', 'onSubmit', 'className', 'style',
    'props', 'state', 'context', 'children', 'key', 'ref',
    '{ }', '[ ]', '( )', ';', ':', ',', '.', '!', '?',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'x', 'y', 'z', 'i', 'j', 'k',
];

export default function MatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<MatrixParticle[]>([]);
    const dropsRef = useRef<{ y: number; speed: number; chars: string[] }[]>([]);
    const lastClickRef = useRef(0);

    const getRandomChar = useCallback(() => {
        return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    }, []);

    const initializeDrops = useCallback((width: number, height: number) => {
        const fontSize = 14;
        const columns = Math.floor(width / fontSize);
        const drops: { y: number; speed: number; chars: string[] }[] = [];
        
        for (let i = 0; i < columns; i++) {
            const chars: string[] = [];
            const numChars = Math.floor(height / fontSize) + 10;
            for (let j = 0; j < numChars; j++) {
                chars.push(getRandomChar());
            }
            drops.push({
                y: Math.random() * -100,
                speed: 0.3 + Math.random() * 0.7,
                chars,
            });
        }
        return drops;
    }, [getRandomChar]);

    const initializeParticles = useCallback((width: number, height: number): MatrixParticle[] => {
        const particles: MatrixParticle[] = [];
        const count = 60; // Reduced from 120
        
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                char: getRandomChar(),
                size: 10 + Math.random() * 4,
                opacity: 0.15 + Math.random() * 0.2, // Much lower opacity
                baseOpacity: 0.15 + Math.random() * 0.2,
                glowMultiplier: 1,
                glowVelocity: 0,
                isOrbiting: false,
            });
        }
        return particles;
    }, [getRandomChar]);

    const dispelParticles = useCallback(() => {
        const mouse = mouseRef.current;
        particlesRef.current.forEach((particle) => {
            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 400) {
                const angle = Math.atan2(dy, dx);
                const force = (400 - distance) / 400 * 15;
                particle.vx += Math.cos(angle) * force;
                particle.vy += Math.sin(angle) * force;
                particle.isOrbiting = false;
            }
        });
    }, []);

    const handleClick = useCallback(() => {
        const now = Date.now();
        if (now - lastClickRef.current > 100) {
            lastClickRef.current = now;
            dispelParticles();
        }
    }, [dispelParticles]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        
        const updateSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            
            // Re-initialize on resize
            dropsRef.current = initializeDrops(width, height);
            if (particlesRef.current.length === 0) {
                particlesRef.current = initializeParticles(width, height);
            }
        };
        
        updateSize();

        const fontSize = 14;
        const mouseInfluence = 200;
        const gravityStrength = 120;

        const draw = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const mouse = mouseRef.current;

            // Fade effect for trails
            ctx.fillStyle = 'rgba(10, 10, 18, 0.08)'; // Slower fade for subtler trails
            ctx.fillRect(0, 0, width, height);

            // Draw falling matrix rain (more subtle)
            ctx.font = `${fontSize}px "Fira Code", "SF Mono", Monaco, monospace`;
            
            dropsRef.current.forEach((drop, i) => {
                // Only render every 3rd column for sparser rain
                if (i % 3 !== 0) {
                    drop.y += drop.speed * 0.5;
                    if (drop.y * fontSize > height + 200) {
                        drop.y = Math.random() * -20;
                    }
                    return;
                }
                
                const x = i * fontSize;
                
                // Draw the column of characters
                for (let j = 0; j < 10; j++) { // Reduced trail length
                    const charIndex = Math.floor(drop.y) - j;
                    if (charIndex >= 0 && charIndex < drop.chars.length) {
                        const y = (drop.y - j) * fontSize;
                        
                        if (y > 0 && y < height) {
                            // Calculate distance from mouse
                            const dx = x - mouse.x;
                            const dy = y - mouse.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            
                            // Much lower base brightness
                            let alpha = 0.04 - j * 0.003;
                            if (j === 0) alpha = 0.4; // Head less bright
                            else if (j === 1) alpha = 0.2;
                            else if (j === 2) alpha = 0.12;
                            
                            // Subtle brighten near mouse
                            if (dist < 150) {
                                alpha = Math.min(0.6, alpha + (150 - dist) / 150 * 0.15);
                            }
                            
                            if (alpha > 0) {
                                // Head character is white, rest is cyan
                                if (j === 0) {
                                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                                } else {
                                    ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
                                }
                                
                                const char = drop.chars[charIndex % drop.chars.length];
                                ctx.fillText(char, x, y);
                            }
                        }
                    }
                }
                
                // Update drop position
                drop.y += drop.speed * 0.4; // Slower falling
                
                // Reset when off screen
                if (drop.y * fontSize > height + 200) {
                    drop.y = Math.random() * -40; // More staggered starts
                    drop.speed = 0.2 + Math.random() * 0.4; // Slower speeds
                    // Shuffle some characters
                    for (let k = 0; k < 5; k++) {
                        const idx = Math.floor(Math.random() * drop.chars.length);
                        drop.chars[idx] = getRandomChar();
                    }
                }
            });

            // Update and draw orbiting particles (gravity effect)
            particlesRef.current.forEach((particle) => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Gravity attraction when mouse is near
                if (distance < mouseInfluence && distance > 20) {
                    const force = (mouseInfluence - distance) / mouseInfluence;
                    const normalizedDx = dx / distance;
                    const normalizedDy = dy / distance;
                    const gravityForce = force * (gravityStrength * 0.001);

                    // Attract towards mouse
                    particle.vx += normalizedDx * gravityForce;
                    particle.vy += normalizedDy * gravityForce;
                    
                    // Add slight orbital velocity for swirling effect
                    particle.vx += normalizedDy * gravityForce * 0.5;
                    particle.vy -= normalizedDx * gravityForce * 0.5;

                    particle.opacity = Math.min(0.5, particle.baseOpacity + force * 0.3); // Lower max opacity
                    particle.isOrbiting = true;
                    
                    // Glow spring effect (reduced)
                    const targetGlow = 1 + force * 1.2;
                    const springForce = (targetGlow - particle.glowMultiplier) * 0.12;
                    particle.glowVelocity = particle.glowVelocity * 0.85 + springForce;
                    particle.glowMultiplier += particle.glowVelocity;
                } else {
                    particle.opacity = Math.max(particle.baseOpacity * 0.5, particle.opacity - 0.015);
                    particle.isOrbiting = false;
                    
                    // Return glow to normal
                    const springForce = (1 - particle.glowMultiplier) * 0.1;
                    particle.glowVelocity = particle.glowVelocity * 0.9 + springForce;
                    particle.glowMultiplier = Math.max(1, particle.glowMultiplier + particle.glowVelocity);
                }

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Subtle random drift
                particle.vx += (Math.random() - 0.5) * 0.01;
                particle.vy += (Math.random() - 0.5) * 0.01;

                // Damping
                particle.vx *= 0.995;
                particle.vy *= 0.995;

                // Boundary wrapping
                if (particle.x < -50) particle.x = width + 50;
                if (particle.x > width + 50) particle.x = -50;
                if (particle.y < -50) particle.y = height + 50;
                if (particle.y > height + 50) particle.y = -50;

                // Occasionally change character
                if (Math.random() < 0.005) {
                    particle.char = getRandomChar();
                }

                // Draw particle
                ctx.save();
                
                const glowSize = particle.size * particle.glowMultiplier * 0.7;
                
                // Subtle glow effect
                ctx.shadowColor = '#22d3ee';
                ctx.shadowBlur = 8 * particle.glowMultiplier; // Reduced glow
                ctx.globalAlpha = particle.opacity;
                ctx.fillStyle = particle.isOrbiting ? 'rgba(255, 255, 255, 0.9)' : 'rgba(34, 211, 238, 0.7)';
                ctx.font = `${glowSize}px "Fira Code", "SF Mono", Monaco, monospace`;
                ctx.fillText(particle.char, particle.x, particle.y);
                
                // Second pass for brighter core (more subtle)
                if (particle.isOrbiting) {
                    ctx.shadowBlur = 12 * particle.glowMultiplier;
                    ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
                    ctx.globalAlpha = particle.opacity * 0.3;
                    ctx.fillText(particle.char, particle.x, particle.y);
                }
                
                ctx.restore();
            });

            // Draw very subtle cursor glow
            if (mouse.x > 0 && mouse.y > 0) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
                gradient.addColorStop(0, 'rgba(34, 211, 238, 0.04)');
                gradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.015)');
                gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(mouse.x - 80, mouse.y - 80, 160, 160);
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', updateSize);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', updateSize);
        };
    }, [initializeDrops, initializeParticles, getRandomChar, handleMouseMove]);

    return (
        <canvas
            ref={canvasRef}
            onClick={handleClick}
            className="fixed inset-0 w-full h-full"
            style={{ background: '#0a0a12' }}
        />
    );
}
