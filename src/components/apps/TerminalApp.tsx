'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useStore, AppId } from '@/lib/store';
import { motion } from 'framer-motion';

interface Command {
    command: string;
    output: React.ReactNode;
}

const asciiArt = `
    _                          ___  ____  
   / \\  _   _  __ _  __ _ _ __ / _ \\/ ___| 
  / _ \\| | | |/ _\` |/ _\` | '_ \\ | | \\___ \\ 
 / ___ \\ |_| | (_| | (_| | | | | |_| |___) |
/_/   \\_\\__, |\\__,_|\\__,_|_| |_|\\___/|____/ 
        |___/                              
`;

export default function TerminalApp() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Command[]>([
        {
            command: '', output: (
                <div className="text-green-400 whitespace-pre font-mono text-[10px] sm:text-xs leading-tight mb-2">
                    {asciiArt}
                </div>
            )
        },
        {
            command: 'welcome', output: (
                <div className="space-y-1">
                    <p className="text-white">Welcome to <span className="text-cyan-400 font-semibold">AyaanOS</span> v2.0.0</p>
                    <p className="text-gray-400">Type <span className="text-yellow-400">"help"</span> for available commands.</p>
                    <p className="text-gray-500 text-xs mt-2">Last login: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                </div>
            )
        }
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { openApp } = useStore();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode = '';

        // Add to command history
        if (trimmedCmd) {
            setCommandHistory(prev => [...prev, cmd]);
            setHistoryIndex(-1);
        }

        switch (true) {
            case trimmedCmd === 'help':
                output = (
                    <div className="space-y-2 text-gray-300">
                        <p className="text-white font-semibold">Available commands:</p>
                        <div className="grid grid-cols-[120px_1fr] gap-y-1.5 text-sm">
                            <span className="text-yellow-400">about</span>
                            <span className="text-gray-400">Learn about me</span>
                            <span className="text-yellow-400">projects</span>
                            <span className="text-gray-400">View my projects</span>
                            <span className="text-yellow-400">skills</span>
                            <span className="text-gray-400">See my tech stack</span>
                            <span className="text-yellow-400">contact</span>
                            <span className="text-gray-400">Get in touch</span>
                            <span className="text-yellow-400">social</span>
                            <span className="text-gray-400">Social media links</span>
                            <span className="text-yellow-400">whoami</span>
                            <span className="text-gray-400">Who am I?</span>
                            <span className="text-yellow-400">date</span>
                            <span className="text-gray-400">Current date & time</span>
                            <span className="text-yellow-400">clear</span>
                            <span className="text-gray-400">Clear terminal</span>
                            <span className="text-yellow-400">neofetch</span>
                            <span className="text-gray-400">System info</span>
                            <span className="text-green-400">sudo hire-ayaan</span>
                            <span className="text-gray-400">???</span>
                        </div>
                    </div>
                );
                break;
            case trimmedCmd === 'about':
                output = (
                    <div className="text-gray-300">
                        <p>Opening <span className="text-cyan-400">About</span> app...</p>
                    </div>
                );
                openApp('about');
                break;
            case trimmedCmd === 'projects':
                output = (
                    <div className="text-gray-300">
                        <p>Opening <span className="text-purple-400">Projects</span> app...</p>
                    </div>
                );
                openApp('projects');
                break;
            case trimmedCmd === 'skills':
                output = (
                    <div className="text-gray-300">
                        <p>Opening <span className="text-green-400">Skills</span> app...</p>
                    </div>
                );
                openApp('skills');
                break;
            case trimmedCmd === 'contact':
                output = (
                    <div className="text-gray-300">
                        <p>Opening <span className="text-red-400">Contact</span> app...</p>
                    </div>
                );
                openApp('contact');
                break;
            case trimmedCmd === 'social':
                output = (
                    <div className="space-y-1.5 text-sm">
                        <p className="text-white font-semibold">Social Links:</p>
                        <p>🔗 LinkedIn: <a href="https://linkedin.com/in/ayaan-agarwal" target="_blank" className="text-blue-400 hover:underline">linkedin.com/in/ayaan-agarwal</a></p>
                        <p>🐙 GitHub: <a href="https://github.com/agarw48550" target="_blank" className="text-blue-400 hover:underline">github.com/agarw48550</a></p>
                        <p>📧 Email: <a href="mailto:agarw48550@gapps.uwcsea.edu.sg" className="text-blue-400 hover:underline">agarw48550@gapps.uwcsea.edu.sg</a></p>
                    </div>
                );
                break;
            case trimmedCmd === 'whoami':
                output = <p className="text-cyan-400">guest@ayaan-os</p>;
                break;
            case trimmedCmd === 'date':
                output = <p className="text-gray-300">{new Date().toString()}</p>;
                break;
            case trimmedCmd === 'neofetch':
                output = (
                    <div className="flex gap-4 text-sm">
                        <div className="text-cyan-400 whitespace-pre font-mono text-xs">
                            {`   _____ 
  /     \\
 | () () |
  \\  ^  /
   |||||`}
                        </div>
                        <div className="space-y-0.5 text-gray-300">
                            <p><span className="text-cyan-400">OS:</span> AyaanOS v2.0.0</p>
                            <p><span className="text-cyan-400">Host:</span> Portfolio Website</p>
                            <p><span className="text-cyan-400">Kernel:</span> Next.js 15</p>
                            <p><span className="text-cyan-400">Shell:</span> ayaan-terminal</p>
                            <p><span className="text-cyan-400">Theme:</span> Liquid Glass Dark</p>
                            <p><span className="text-cyan-400">Built with:</span> React, TypeScript, Tailwind</p>
                        </div>
                    </div>
                );
                break;
            case trimmedCmd === 'clear':
                setHistory([]);
                return;
            case trimmedCmd === 'hire-ayaan':
            case trimmedCmd === 'sudo hire-ayaan':
                output = (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-2"
                    >
                        <p className="text-green-400 font-mono">🔓 ACCESS GRANTED</p>
                        <p className="text-white">Initiating hiring protocol...</p>
                        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mt-2">
                            <p className="text-green-400 font-semibold">✨ Excellent Choice!</p>
                            <p className="text-gray-300 text-sm mt-1">Redirecting to contact channels... 🚀</p>
                        </div>
                    </motion.div>
                );
                setTimeout(() => {
                    openApp('contact');
                }, 1500);
                break;
            case trimmedCmd === '':
                output = '';
                break;
            default:
                output = (
                    <p className="text-red-400">
                        Command not found: <span className="text-white">{trimmedCmd}</span>
                        <span className="text-gray-500 ml-2">Type "help" for available commands.</span>
                    </p>
                );
        }

        setHistory(prev => [...prev, { command: cmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    return (
        <div
            className="h-full text-sm font-mono p-4 overflow-y-auto cursor-text"
            style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(10,10,20,0.98) 100%)',
            }}
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((entry, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-3"
                >
                    {entry.command && (
                        <div className="flex gap-2 items-center">
                            <span className="text-green-400">➜</span>
                            <span className="text-cyan-400">~</span>
                            <span className="text-white">{entry.command}</span>
                        </div>
                    )}
                    <div className="ml-6 mt-1 text-gray-300">{entry.output}</div>
                </motion.div>
            ))}

            <div className="flex gap-2 items-center">
                <span className="text-green-400">➜</span>
                <span className="text-cyan-400">~</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-white caret-green-400"
                    autoFocus
                    spellCheck={false}
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
}
