export interface Skill {
    name: string;
    rating: number; // 1-5
    maxRating: number;
}

export const SKILLS_DATA: Skill[] = [
    { name: 'Public Speaking & Communication', rating: 5, maxRating: 5 },
    { name: 'Leadership & Team Coordination', rating: 5, maxRating: 5 },
    { name: 'Event Planning & Organizing', rating: 4, maxRating: 5 },
    { name: 'Research & Academic Writing', rating: 4, maxRating: 5 },
    { name: 'Video Production & Interviewing', rating: 4, maxRating: 5 },
    { name: 'Digital Literacy & Cyber Safety', rating: 4, maxRating: 5 },
    { name: 'Innovation & Creative Problem-Solving', rating: 4, maxRating: 5 },
    { name: 'Coding & Robotics (FLL Experience)', rating: 2, maxRating: 5 },
];
