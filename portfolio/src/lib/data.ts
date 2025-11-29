import { FaReact, FaPython, FaJs, FaHtml5, FaCss3, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiFramer, SiMongodb, SiFirebase } from "react-icons/si";

export const skills = [
    {
        category: "Languages",
        items: [
            { name: "JavaScript", icon: FaJs, level: "Advanced" },
            { name: "TypeScript", icon: SiTypescript, level: "Intermediate" },
            { name: "Python", icon: FaPython, level: "Intermediate" },
            { name: "HTML5", icon: FaHtml5, level: "Advanced" },
            { name: "CSS3", icon: FaCss3, level: "Advanced" },
        ],
    },
    {
        category: "Frameworks & Libraries",
        items: [
            { name: "React", icon: FaReact, level: "Advanced" },
            { name: "Next.js", icon: SiNextdotjs, level: "Intermediate" },
            { name: "Tailwind CSS", icon: SiTailwindcss, level: "Advanced" },
            { name: "Framer Motion", icon: SiFramer, level: "Intermediate" },
        ],
    },
    {
        category: "Tools & Backend",
        items: [
            { name: "Node.js", icon: FaNodeJs, level: "Intermediate" },
            { name: "Git", icon: FaGitAlt, level: "Intermediate" },
            { name: "MongoDB", icon: SiMongodb, level: "Beginner" },
            { name: "Firebase", icon: SiFirebase, level: "Beginner" },
        ],
    },
];

export const projects = [
    {
        id: 1,
        title: "Personal Portfolio",
        description: "A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Features dark mode, smooth animations, and a clean design.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
        image: "/images/portfolio-preview.png", // Placeholder
        demoUrl: "#",
        githubUrl: "#",
        category: "Web",
        featured: true,
    },
    {
        id: 2,
        title: "Fridge Chef AI",
        description: "An AI-powered app that scans your fridge contents and suggests recipes based on what you have. Reduces food waste and makes cooking fun!",
        tags: ["React Native", "OpenAI API", "TensorFlow", "Python"],
        image: "/images/fridge-chef.png", // Placeholder
        demoUrl: "#",
        githubUrl: "#",
        category: "AI",
        featured: true,
    },
    {
        id: 3,
        title: "Air Drums",
        description: "A virtual drumming experience using computer vision. Play drums in the air using hand tracking technology.",
        tags: ["Python", "OpenCV", "MediaPipe", "PyAudio"],
        image: "/images/air-drums.png", // Placeholder
        demoUrl: "#",
        githubUrl: "#",
        category: "AI",
        featured: false,
    },
    {
        id: 4,
        title: "Melody Maker",
        description: "Create songs by playing notes on everyday objects. The app listens to the pitch and constructs a melody.",
        tags: ["Web Audio API", "React", "Machine Learning"],
        image: "/images/melody-maker.png", // Placeholder
        demoUrl: "#",
        githubUrl: "#",
        category: "Web",
        featured: false,
    },
];

export const timeline = [
    {
        year: "2024",
        title: "Building Cool Stuff",
        description: "Working on advanced AI projects and mastering Next.js. Launched this portfolio!",
    },
    {
        year: "2023",
        title: "Deep Dive into Web Dev",
        description: "Started learning React and modern frontend frameworks. Built my first full-stack app.",
    },
    {
        year: "2022",
        title: "Hello World",
        description: "Wrote my first line of Python code. Fell in love with automation and logic.",
    },
    {
        year: "2021",
        title: "Tech Enthusiast",
        description: "Joined the school robotics club and started exploring how computers work.",
    },
];

export const funFacts = [
    { title: "Gamer", description: "I love strategy games and FPS." },
    { title: "Music", description: "I play the guitar in my free time." },
    { title: "Coffee", description: "Powered by caffeine and code." },
    { title: "Robotics", description: "Built a line-following robot." },
];
