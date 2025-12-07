import React from 'react';
import { SKILLS_DATA } from '@/lib/skillsData';

export default function MobileSkills() {
    return (
        <div className="space-y-4 p-2 pb-20">
            <div className="bg-[#2d3436] text-[#dfe6e9] p-3 rounded-lg font-mono text-xs mb-4 shadow-md">
                <p>{'>'} SYSTEM.CHECK_SKILLS()</p>
                <p className="text-green-400">{'>'} SUCCESS</p>
                <p>{'>'} LOADING_DATA...</p>
            </div>

            <div className="space-y-3">
                {SKILLS_DATA.map((skill) => {
                    const percentage = (skill.rating / skill.maxRating) * 100;
                    return (
                        <div key={skill.name} className="bg-[#dfe6e9] p-3 rounded-lg border-2 border-[#b2bec3] shadow-sm">
                            <div className="flex justify-between text-xs font-bold mb-2 text-[#2d3436]">
                                <span className="truncate pr-2">{skill.name}</span>
                                <span>{skill.rating}/{skill.maxRating}</span>
                            </div>
                            <div className="h-2.5 bg-[#b2bec3] rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out bg-green-500"
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
