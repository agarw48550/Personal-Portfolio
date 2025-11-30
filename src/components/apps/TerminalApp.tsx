'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppId } from '@/lib/store';

interface Command {
    command: string;
    output: React.ReactNode;
}

export default function TerminalApp() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Command[]>([
        { command: 'welcome', output: 'Welcome to AyaanOS v1.0.0. Type "help" for available commands.' }
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { openWindow } = useWindowManager();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode = '';

        switch (trimmedCmd) {
            case 'help':
                output = (
                    <div className="space-y-1 text-gray-300">
                        <p>Available commands:</p>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-yellow-400">about</span>
                            <span>Display information about me</span>
                            <span className="text-yellow-400">projects</span>
                            <span>List my projects</span>
                            <span className="text-yellow-400">skills</span>
                            <span>Show my technical skills</span>
                            <span className="text-yellow-400">social</span>
                            <span>Display social media links</span>
                            <span className="text-yellow-400">clear</span>
                            <span>Clear the terminal history</span>
                            <span className="text-yellow-400">sudo hire-ayaan</span>
                            <span>???</span>
                        </div>
                    </div>
                );
                break;
            case 'about':
                output = "Opening About app...";
                openWindow('about');
                break;
            case 'projects':
                output = "Opening Projects app...";
                openWindow('projects');
                break;
            case 'skills':
                output = "Opening Skills app...";
                openWindow('skills');
                break;
            case 'social':
                output = (
                    <div className="space-y-1">
                        <p>LinkedIn: <a href="https://linkedin.com" target="_blank" className="text-blue-400 hover:underline">linkedin.com/in/ayaan-agarwal</a></p>
                        <p>GitHub: <a href="https://github.com" target="_blank" className="text-blue-400 hover:underline">github.com/agarw48550</a></p>
                        <p>Email: <a href="mailto:agarw48550@gapps.uwcsea.edu.sg" className="text-blue-400 hover:underline">agarw48550@gapps.uwcsea.edu.sg</a></p>
                    </div>
                );
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'sudo hire-ayaan':
                output = (
                    <div className="text-green-400 animate-pulse">
                        ACCESS GRANTED. Initiating hiring protocol...
                        <br />
                        Please contact via email to proceed! 🚀
                    </div>
                );
                break;
            case '':
                output = '';
                break;
            default:
                output = `Command not found: ${trimmedCmd}. Type "help" for available commands.`;
        }

        setHistory(prev => [...prev, { command: cmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div
            className="h-full bg-black/90 text-green-500 font-mono p-4 overflow-y-auto text-sm"
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((entry, i) => (
                <div key={i} className="mb-2">
                    <div className="flex gap-2">
                        <span className="text-blue-400">guest@ayaan-os:~$</span>
                        <span className="text-white">{entry.command}</span>
                    </div>
                    <div className="ml-4 mt-1 text-gray-300">{entry.output}</div>
                </div>
            ))}

            <div className="flex gap-2">
                <span className="text-blue-400">guest@ayaan-os:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-white"
                    autoFocus
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
}
