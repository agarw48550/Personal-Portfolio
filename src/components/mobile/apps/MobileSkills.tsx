import React from 'react';

const SKILLS = [
    { name: 'React / Next.js', level: 90, color: '#61dafb' },
    { name: 'TypeScript', level: 85, color: '#3178c6' },
    { name: 'Python', level: 80, color: '#ffd43b' },
    { name: 'Tailwind CSS', level: 95, color: '#38bdf8' },
    { name: 'Node.js', level: 75, color: '#68a063' },
    { name: 'UI/UX Design', level: 70, color: '#ff7675' },
];

export default function MobileSkills() {
    return (
        <div className="space-y-4 p-2 pb-20">
            <div className="bg-[#2d3436] text-[#dfe6e9] p-3 rounded-lg font-mono text-xs mb-4">
                <p>{'>'} SYSTEM.CHECK_SKILLS()</p>
                <p className="text-green-400">{'>'} SUCCESS</p>
                <p>{'>'} LOADING_DATA...</p>
            </div>

            <div className="space-y-3">
                {SKILLS.map((skill) => (
                    <div key={skill.name} className="bg-[#dfe6e9] p-2 rounded border-2 border-[#b2bec3]">
                        <div className="flex justify-between text-xs font-bold mb-1 text-[#2d3436]">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-[#b2bec3] rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{
                                    width: `${skill.level}%`,
                                    backgroundColor: skill.color
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
