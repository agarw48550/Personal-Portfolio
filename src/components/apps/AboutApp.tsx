'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Check, CheckCheck, Phone, Video, MoreVertical } from 'lucide-react';
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
        text: "Hey! 👋 Thanks for stopping by my portfolio!",
        sender: 'ayaan',
        timestamp: new Date(Date.now() - 12000),
        isRead: true,
    },
    {
        id: '2',
        text: "I'm Ayaan — a 10th grader at UWC South East Asia, Singapore 🇸🇬",
        sender: 'ayaan',
        timestamp: new Date(Date.now() - 10000),
        isRead: true,
    },
    {
        id: '3',
        text: "I'm super into building things with code, especially AI and web apps. Currently learning Next.js and React — this portfolio is my latest project! 🚀",
        sender: 'ayaan',
        timestamp: new Date(Date.now() - 8000),
        isRead: true,
    },
    {
        id: '4',
        text: "Feel free to ask me anything! Try: skills, projects, hobbies, or just say hi 😊",
        sender: 'ayaan',
        timestamp: new Date(Date.now() - 5000),
        isRead: true,
    },
];

export default function AboutApp() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isOnline] = useState(true);
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

        // Variable response time based on response length
        const responseText = getResponse(inputValue);
        const typingTime = Math.min(1500 + responseText.length * 10, 3000);

        setTimeout(() => {
            setIsTyping(false);
            const responseMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ayaan',
                timestamp: new Date(),
                isRead: true,
            };
            setMessages(prev => 
                prev.map(m => m.id === newMessage.id ? { ...m, isRead: true } : m)
                    .concat(responseMessage)
            );
        }, typingTime);
    };

    const getResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();
        
        // Greetings
        if (lowerInput.match(/^(hi|hey|hello|sup|yo|hola)/)) {
            return "Hey there! 👋 Great to hear from you! What would you like to know about me?";
        }
        
        // School/Education
        if (lowerInput.includes('school') || lowerInput.includes('education') || lowerInput.includes('study') || lowerInput.includes('uwc')) {
            return "I'm at UWC South East Asia (East Campus) in Singapore! 🏫 Currently in 10th grade doing IGCSE — graduating in 2028. UWC is amazing because of how diverse and global it is. I love the community here!";
        }
        
        // Skills/Tech
        if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('programming') || lowerInput.includes('code') || lowerInput.includes('language')) {
            return "Oh I love talking tech! 💻 I'm mainly working with JavaScript/TypeScript and Python. Building web apps with Next.js and React is my jam right now. Also getting into AI/ML — it's fascinating! Check out the Skills app for more details~";
        }
        
        // Projects
        if (lowerInput.includes('project') || lowerInput.includes('built') || lowerInput.includes('made') || lowerInput.includes('create')) {
            return "I've been building some cool stuff! 🛠️ This portfolio you're on is one of them. Also working on Fridge Chef (AI recipe app), Air Drums (virtual drumming with hand tracking), and some school tech projects. Hit up the Projects app to see them all!";
        }
        
        // Contact
        if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach') || lowerInput.includes('connect')) {
            return "Would love to connect! 📬 Best way is email: agarw48550@gapps.uwcsea.edu.sg. Also on LinkedIn — just search Ayaan Agarwal. Or use the Contact app on the desktop!";
        }
        
        // Hobbies/Interests
        if (lowerInput.includes('hobby') || lowerInput.includes('interest') || lowerInput.includes('fun') || lowerInput.includes('free time')) {
            return "Outside of coding? I'm super into MUN (Model UN) — love debating world issues! 🌍 Also play squash competitively (Top 20 in Singapore! 🏆), drum in my free time 🥁, and build random DIY tech projects. Always something going on lol";
        }
        
        // Age
        if (lowerInput.includes('age') || lowerInput.includes('old') || lowerInput.includes('year')) {
            return "I'm 15! Turning 16 soon. Sometimes I forget I'm still in high school with all the stuff I get to work on 😅";
        }
        
        // Location
        if (lowerInput.includes('where') || lowerInput.includes('location') || lowerInput.includes('live') || lowerInput.includes('singapore')) {
            return "Living in Singapore 🇸🇬 — been here for a few years now for school. Originally from India though! Singapore is awesome for tech stuff, lots happening here.";
        }
        
        // Goals/Future
        if (lowerInput.includes('goal') || lowerInput.includes('future') || lowerInput.includes('plan') || lowerInput.includes('dream')) {
            return "Big dreams! 🌟 Want to study CS at a top uni, maybe Stanford or MIT. Long term? Building tech that actually helps people — maybe in AI/healthcare or education. But honestly just excited to keep learning and building!";
        }
        
        // Thanks
        if (lowerInput.includes('thank') || lowerInput.includes('thanks') || lowerInput.includes('awesome') || lowerInput.includes('cool')) {
            return "Aw thanks! 😊 Really appreciate you taking the time to check out my portfolio. If you have any opportunities or just want to chat, hit me up anytime!";
        }
        
        // Hire/Work
        if (lowerInput.includes('hire') || lowerInput.includes('work') || lowerInput.includes('intern') || lowerInput.includes('opportunity')) {
            return "Oh that's exciting! 🎉 I'm definitely open to internships, freelance projects, or collaborations. Would love to work on something cool together. Drop me an email and let's chat!";
        }
        
        // Portfolio/Website
        if (lowerInput.includes('portfolio') || lowerInput.includes('website') || lowerInput.includes('site') || lowerInput.includes('this')) {
            return "Glad you like it! 💜 Built this whole thing with Next.js, React, Tailwind, and Framer Motion. The OS-style interface was super fun to design. Took a while but totally worth it!";
        }
        
        // Default
        return "Interesting question! 🤔 Feel free to ask about my school, skills, projects, hobbies, or how to reach me. Or just chat — I'm friendly I promise! 😄";
    };

    return (
        <div className="flex flex-col h-full bg-[#0b141a] text-white">
            {/* Chat Header - WhatsApp style */}
            <div className="p-3 flex items-center gap-3 border-b border-white/5"
                style={{ background: 'linear-gradient(180deg, #202c33 0%, #1a262d 100%)' }}
            >
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                        AA
                    </div>
                    {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#202c33]" />
                    )}
                </div>
                <div className="flex flex-col flex-1">
                    <span className="font-medium text-sm">Ayaan Agarwal</span>
                    <span className="text-xs text-green-400">{isOnline ? 'online' : 'last seen recently'}</span>
                </div>
                <div className="flex items-center gap-4 text-white/60">
                    <Video size={20} className="cursor-pointer hover:text-white transition-colors" />
                    <Phone size={20} className="cursor-pointer hover:text-white transition-colors" />
                    <MoreVertical size={20} className="cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    backgroundColor: '#0b141a'
                }}
            >
                {messages.map((msg, index) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] p-3 rounded-lg text-sm relative shadow-sm ${msg.sender === 'me'
                                    ? 'bg-[#005c4b] text-white rounded-tr-none'
                                    : 'bg-[#202c33] text-white rounded-tl-none'
                                }`}
                            style={{
                                boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                            }}
                        >
                            <p className="leading-relaxed">{msg.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-1.5">
                                <span className="text-[10px] text-white/50">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {msg.sender === 'me' && (
                                    <span className={msg.isRead ? "text-blue-400" : "text-white/50"}>
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
                        <div className="bg-[#202c33] px-4 py-3 rounded-lg rounded-tl-none text-sm text-gray-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 flex items-center gap-3" style={{ background: '#202c33' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#2a3942] rounded-full px-5 py-2.5 text-sm text-white focus:outline-none placeholder:text-gray-500 transition-colors"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    className="p-2.5 bg-[#00a884] rounded-full hover:bg-[#00a884]/90 transition-colors text-white"
                >
                    <Send size={20} />
                </motion.button>
            </div>
        </div>
    );
}
