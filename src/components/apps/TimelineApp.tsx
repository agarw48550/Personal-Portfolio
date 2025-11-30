'use client';

import React from 'react';
import { Calendar, Award, BookOpen, Briefcase } from 'lucide-react';

const events = [
    {
        year: '2024',
        title: 'Activities Executive',
        description: 'Leading team for student events and innovative initiatives at UWCSEA.',
        icon: Briefcase,
        color: 'bg-blue-500'
    },
    {
        year: '2024',
        title: 'DragonsTV Leadership',
        description: 'Co-managing school video news platform. Content strategy and editing.',
        icon: Award,
        color: 'bg-purple-500'
    },
    {
        year: '2023',
        title: 'Willing Hearts Volunteer',
        description: 'Started regular volunteering at soup kitchen.',
        icon: Award,
        color: 'bg-red-500'
    },
    {
        year: '2021',
        title: 'Activities Council Chair',
        description: 'Led team and introduced creative formats like live Go-Kart demos.',
        icon: Calendar,
        color: 'bg-green-500'
    },
    {
        year: '2021',
        title: 'Great Books Ambassador',
        description: 'Elite reading program with U.S. professors, mentored participants.',
        icon: BookOpen,
        color: 'bg-yellow-500'
    }
];

export default function TimelineApp() {
    return (
        <div className="h-full bg-white p-8 overflow-y-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">My Journey</h2>

            <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                {events.map((event, index) => (
                    <div key={index} className="relative pl-8">
                        {/* Dot */}
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${event.color}`} />

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-500 mb-2 border border-gray-100 shadow-sm">
                                {event.year}
                            </span>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <event.icon size={20} className="text-gray-400" />
                                {event.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {event.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
