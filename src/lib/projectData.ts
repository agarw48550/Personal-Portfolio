export const PROJECTS_DATA = {
    en: [
        {
            id: 'stringsync',
            name: 'StringSync',
            type: 'Interactive',
            category: 'AI',
            description: 'Play air guitar with just your hands and a webcam. Powered by MediaPipe hand tracking and Web Audio API.',
            stats: { hp: 85, attack: 95, defense: 60, speed: 100 },
            tech: ['MediaPipe', 'TensorFlow.js', 'Web Audio API', 'React'],
            image: '/projects/stringsync.png', // Placeholder, using solid color for now
            color: 'from-pink-500 to-rose-600',
            featured: true,
            links: {},
            internalRoute: '/stringsync'
        },
        {
            id: '1',
            name: 'Portfolio OS',
            type: 'Web App',
            category: 'Web',
            description: 'A fully functional operating system simulation in the browser using Next.js, React, and Framer Motion.',
            stats: { hp: 90, attack: 85, defense: 80, speed: 95 },
            tech: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
            image: '/projects/portfolio.png',
            color: 'from-cyan-500 to-blue-600',
            featured: true,
            links: { repo: 'https://github.com/agarw48550/portfolio' }
        },
        {
            id: '2',
            name: 'Fridge Chef AI',
            type: 'AI App',
            category: 'AI',
            description: 'AI-powered app that scans your fridge and suggests recipes based on available ingredients.',
            stats: { hp: 85, attack: 95, defense: 70, speed: 80 },
            tech: ['React Native', 'OpenAI', 'TensorFlow', 'Python'],
            image: '/projects/fridgechef.png',
            color: 'from-green-500 to-emerald-600',
            featured: true,
            links: { demo: 'https://fridgechef.app' }
        },
        {
            id: '3',
            name: 'Air Drums',
            type: 'Computer Vision',
            category: 'AI',
            description: 'Virtual drumming experience using hand tracking technology. Play drums in the air!',
            stats: { hp: 70, attack: 90, defense: 60, speed: 95 },
            tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAudio'],
            image: '/projects/airdrums.png',
            color: 'from-purple-500 to-pink-600',
            featured: false,
            links: { repo: 'https://github.com/agarw48550/air-drums' }
        },
        {
            id: '4',
            name: 'DragonsTV',
            type: 'Media',
            category: 'Other',
            description: 'Video news platform for UWCSEA. Managed content strategy, filming, and editing.',
            stats: { hp: 70, attack: 90, defense: 60, speed: 80 },
            tech: ['Premiere Pro', 'After Effects', 'YouTube'],
            image: '/projects/dragonstv.png',
            video: 'dQw4w9WgXcQ', // Placeholder
            color: 'from-orange-500 to-amber-600',
            featured: false,
            links: { demo: 'https://youtube.com' }
        },
    ],
    zh: [
        {
            id: 'stringsync',
            name: 'StringSync',
            type: '交互式',
            category: '人工智能',
            description: '只需双手和摄像头即可弹奏空气吉他。由 MediaPipe 手部追踪和 Web Audio API 驱动。',
            stats: { hp: 85, attack: 95, defense: 60, speed: 100 },
            tech: ['MediaPipe', 'TensorFlow.js', 'Web Audio API', 'React'],
            image: '/projects/stringsync.png',
            color: 'from-pink-500 to-rose-600',
            featured: true,
            links: {},
            internalRoute: '/stringsync'
        },
        {
            id: '1',
            name: '作品集操作系统',
            type: 'Web 应用',
            category: 'Web',
            description: '一个使用 Next.js、React 和 Framer Motion 在浏览器中完全可用的操作系统模拟。',
            stats: { hp: 90, attack: 85, defense: 80, speed: 95 },
            tech: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
            image: '/projects/portfolio.png',
            color: 'from-cyan-500 to-blue-600',
            featured: true,
            links: { repo: 'https://github.com/agarw48550/portfolio' }
        },
        {
            id: '2',
            name: '冰箱大厨 AI',
            type: 'AI 应用',
            category: '人工智能',
            description: 'AI 驱动的应用，扫描您的冰箱并根据现有食材推荐食谱。',
            stats: { hp: 85, attack: 95, defense: 70, speed: 80 },
            tech: ['React Native', 'OpenAI', 'TensorFlow', 'Python'],
            image: '/projects/fridgechef.png',
            color: 'from-green-500 to-emerald-600',
            featured: true,
            links: { demo: 'https://fridgechef.app' }
        },
        {
            id: '3',
            name: '空气鼓',
            type: '计算机视觉',
            category: '人工智能',
            description: '使用手部追踪技术的虚拟击鼓体验。在空中击鼓！',
            stats: { hp: 70, attack: 90, defense: 60, speed: 95 },
            tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAudio'],
            image: '/projects/airdrums.png',
            color: 'from-purple-500 to-pink-600',
            featured: false,
            links: { repo: 'https://github.com/agarw48550/air-drums' }
        },
        {
            id: '4',
            name: 'DragonsTV',
            type: '媒体',
            category: '其他',
            description: 'UWCSEA 的视频新闻平台。管理内容策略、拍摄和剪辑。',
            stats: { hp: 70, attack: 90, defense: 60, speed: 80 },
            tech: ['Premiere Pro', 'After Effects', 'YouTube'],
            image: '/projects/dragonstv.png',
            video: 'dQw4w9WgXcQ', // Placeholder
            color: 'from-orange-500 to-amber-600',
            featured: false,
            links: { demo: 'https://youtube.com' }
        },
    ]
};
