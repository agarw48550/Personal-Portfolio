'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Check, CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'ayaan';
    timestamp: Date;
    isRead?: boolean;
}

const initialMessages: Message[] = [
    {
        id: '1',
        text: "Hi there! I'm Ayaan Agarwal 👋",
        sender: 'ayaan',
        timestamp: new Date(Date.now() - 10000),
        isRead: true,
    },
    {
        id: '2',
        text: "I'm a 10th-grade student at UWC South East Asia in Singapore, passionate about technology, AI, and robotics. 🤖",
        sender: 'ayaan',
        timestamp: new Date(Date.now() - 8000),
        isRead: true,
    },
    {
        id: '3',
        text: "I built this OS-style portfolio to showcase my journey as an aspiring developer. Feel free to ask me anything!",
        sender: 'ayaan',
        timestamp: new Date(Date.now() - 5000),
        isRead: true,
    },
];

export default function AboutApp() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'me',
            timestamp: new Date(),
            isRead: false,
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate response
        setTimeout(() => {
            setIsTyping(false);
            const responseText = getResponse(inputValue);
            const responseMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ayaan',
                timestamp: new Date(),
                isRead: true,
            };
            setMessages(prev => [...prev, responseMessage]);
        }, 1500 + Math.random() * 1000);
    };

    const getResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('school') || lowerInput.includes('education')) {
            return "I'm currently studying at UWC South East Asia (East Campus), graduating in 2028. I'm an IGCSE student.";
        }
        if (lowerInput.includes('skill') || lowerInput.includes('tech')) {
            return "I'm learning Python and exploring web development with Next.js and React. I also have experience with block-based programming like Scratch and MakeCode.";
        }
        if (lowerInput.includes('project')) {
            return "Check out the Projects app on the desktop! I've worked on this portfolio, school leadership initiatives, and DragonsTV episodes.";
        }
        if (lowerInput.includes('contact') || lowerInput.includes('email')) {
            return "You can reach me at agarw48550@gapps.uwcsea.edu.sg or connect with me on LinkedIn!";
        }
        if (lowerInput.includes('hobby') || lowerInput.includes('interest')) {
            return "I love MUN, playing squash (Top 20 in SG!), drumming, and building DIY tech projects.";
        }
        return "That's interesting! Tell me more, or ask about my school, skills, projects, or hobbies.";
    };

    return (
        <div className="flex flex-col h-full bg-[#0b141a] text-white">
            {/* Chat Header */}
            <div className="p-3 bg-[#202c33] flex items-center gap-3 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                    AA
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-sm">Ayaan Agarwal</span>
                    <span className="text-xs text-gray-400">Online</span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-10">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-lg text-sm relative shadow-sm ${msg.sender === 'me'
                                    ? 'bg-[#005c4b] text-white rounded-tr-none'
                                    : 'bg-[#202c33] text-white rounded-tl-none'
                                }`}
                        >
                            <p>{msg.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-[10px] text-gray-400">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {msg.sender === 'me' && (
                                    <span className="text-blue-400">
                                        {msg.isRead ? <CheckCheck size={14} /> : <Check size={14} />}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="bg-[#202c33] p-3 rounded-lg rounded-tl-none text-sm text-gray-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#202c33] flex items-center gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#2a3942] rounded-lg px-4 py-2 text-sm text-white focus:outline-none placeholder:text-gray-500"
                />
                <button
                    onClick={handleSend}
                    className="p-2 bg-[#005c4b] rounded-full hover:bg-[#004f40] transition-colors text-white"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}
