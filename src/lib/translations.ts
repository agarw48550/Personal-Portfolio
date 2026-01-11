export type Language = 'en' | 'zh' | 'hi';

const RESUME_DATA = {
    education: [
        {
            school: "United World College of South East Asia - East Campus",
            period: "2013 - Present",
            grade: "Grade 10 | Curriculum: IGCSE",
            subjects: "Economics, Design Technology: Systems and Control, Foreign Language: Chinese, English Language and Literature, Mathematics (Additional) and Co-ordinated Science."
        }
    ],
    internships: [
        {
            company: "Kaira Global",
            role: "Product Operations & Inventory Intern",
            year: "2025",
            points: [
                "Streamlined product inventory by reconciling 300+ items across physical stock, online listings, and internal databases.",
                "Improved customers' online marketing experience by updating Shopify listings and backend records to maintain accurate, customer-facing information.",
                "Performed hands-on warehouse operations, including scanning and organizing inventory and preparing orders for shipment."
            ]
        },
        {
            company: "Tinkeracademy",
            role: "Project Intern",
            year: "2025",
            points: [
                "Tested and improved 10+ hands-on engineering projects designed for Raffles Institution students, increasing clarity and classroom usability.",
                "Created and piloted 5 new project modules for a companion course, contributing original designs that were later adopted into the curriculum.",
                "Gained practical engineering experience by completing 20+ precision prototypes using the Cricut system and implementing Bluetooth UART communication in project builds."
            ]
        }
    ],
    leadership: [
        {
            role: "Chair",
            org: "Goonj – India Service Initiative",
            period: "Chair since Sept. 2025; Participated from 2024–Present",
            points: [
                "Leading a high-impact service group focused on equity, dignity, and humanitarian relief; oversee strategic planning, fundraising, and school-wide engagement.",
                "Organized and executed multiple school-wide events raising awareness and thousands of dollars for charity.",
                "Set to raise 20,000 SGD this year."
            ]
        },
        {
            role: "Activities Executive",
            org: "UWC East",
            period: "Aug 2024–Present",
            points: [
                "Led a team responsible for planning, organizing, and elevating major student-led events across the high school.",
                "Spearhead initiatives to increase the visibility, participation, and overall impact of the Activities Executive group.",
                "Introduce innovative, large-scale, and inclusive events aimed at strengthening school culture and student engagement."
            ]
        },
        {
            role: "DragonsTV Leadership Executive (Producer)",
            org: "UWC East",
            period: "2024–Present",
            points: [
                "Leading the school’s official video news platform, producing weekly coverage of school-wide, local, and global events.",
                "Plan and script news segments, conduct interviews, and collaborate with the editing team to finalize episodes."
            ]
        },
        {
            role: "Model United Nations",
            org: "",
            period: "2021–Present",
            points: [
                "Participated in 11+ conferences as both delegate and chair. Won awards for being the best delegate.",
                "Developed strong skills in public speaking, negotiation, resolution writing, and committee leadership."
            ]
        }
    ],
    community: [
        {
            role: "Migrant Worker Support Project",
            period: "Aug 2024",
            desc: "Independently organized a community donation drive for migrant workers. Collected and delivered 4 large suitcases of essential items and clothing to ItsRainingRaincoats."
        },
        {
            role: "Soup Kitchen Volunteer — Willing Hearts",
            period: "2023–Present",
            desc: "Volunteer regularly with Willing Hearts, preparing meal packages for elderly and low-income families."
        }
    ],
    sports: [
        {
            name: "Squash",
            period: "2018–Present",
            desc: "Competitor in national-level tournaments. Recently came 3rd place in a Squash Competition."
        }
    ]
};

export const translations = {
    en: {
        desktop: {
            appName: 'AyaanOS',
            menu: {
                file: 'File',
                edit: 'Edit',
                view: 'View',
                go: 'Go',
                window: 'Window',
                help: 'Help',
            },
            weather: {
                city: 'Singapore',
                temp: '28°C',
            },
            windowTitles: {
                about: 'About Me',
                projects: 'My Projects',
                skills: 'Technical Skills',
                contact: 'Contact Me',
                terminal: 'Terminal',
                timeline: 'Journey Timeline',
                blogs: 'My Blogs',
                stringsync: 'StringSync',
            },
        },
        apps: {
            about: 'About',
            projects: 'Projects',
            skills: 'Skills',
            timeline: 'Timeline',
            terminal: 'Terminal',
            contact: 'Contact',
            blogs: 'Blogs',
            stringsync: 'StringSync',
        },
        appContent: {
            about: {
                greeting: "Hi, I'm Ayaan",
                role: "Student • Leader • Developer",
                location: "Singapore",
                classOf: "Class of 2028",
                aboutTitle: "About Me",
                bio1: "I'm a 16-year-old student at UWC South East Asia in Singapore, passionate about leadership, service, and making an impact. Whether I'm chairing MUN conferences, producing school news for DragonsTV, organizing community service initiatives, or competing in squash, I bring energy and dedication to everything I do.",
                bio2: "Currently learning to code through this portfolio project – proof that anyone can start somewhere! I believe in the power of technology to solve real-world problems and bring communities together.",
                factsTitle: "Quick Facts",
                fact1: "11+ MUN Conferences",
                fact2: "Top 20 Squash Player (Age Group, Singapore)",
                fact3: "Self-taught Drummer",
                fact4: "Learning Guitar",
                fact5: "UWCSEA East Campus",
                contactTitle: "Get In Touch",
                email: "Email",
                phone: "Phone",
            },
            resume: RESUME_DATA,
            projects: {
                filter: "Filter Projects",
                clear: "Clear",
                showFilters: "Show Tech Filters",
                hideFilters: "Hide Tech Filters",
                noResults: "No projects match your filters",
                featured: "Featured",
                clickToPlay: "Click to Play",
                preview: "Project Preview",
                demo: "Demo",
                code: "Code",
                about: "About",
                stats: "Base Stats",
                tech: "Abilities (Tech Stack)",
            },
            stringsync: {
                back: "Back to Portfolio",
                desktopHeader: "Desktop Experience Only",
                desktopBody: "StringSync requires a webcam and keyboard/mouse for the best experience. Please open this project on a desktop computer with Chrome.",
                returnPortfolio: "Return to Portfolio",
                initializing: "Initializing",
                active: "Active",
                startingCamera: "Starting Camera...",
                cameraPermission: "Please allow camera access",
                leftScreen: "Left Screen",
                leftInstructions: "Hold up fingers to form chords.",
                rightScreen: "Right Screen",
                rightInstructions: "Strum downwards to play.",
                currentChord: "Current Chord",
                detection: "Detection",
                chordLocked: "CHORD LOCKED",
                noChord: "NO CHORD",
                strumming: "STRUMMING",
                idle: "IDLE",
                audioEngine: "Audio Engine",
                systemActive: "System Active",
                clickEnable: "Click to Enable",
                tip: "Tip: Ensure good lighting and keep your hands visible in the frame."
            }
        },
        common: {
            loading: 'Loading...',
            error: 'Error',
            back: 'Back',
            close: 'Close',
            menu: 'MENU',
            select: 'SELECT',
        },
        mobile: {
            unlock: 'Slide to Unlock',
            camera: 'Camera',
            photos: 'Photos',
            settings: 'Settings',
            carrier: 'AYAAN-TEL',
        }
    },
    zh: {
        desktop: {
            appName: 'AyaanOS',
            menu: {
                file: '文件',
                edit: '编辑',
                view: '视图',
                go: '前往',
                window: '窗口',
                help: '帮助',
            },
            weather: {
                city: '新加坡',
                temp: '28°C',
            },
            windowTitles: {
                about: '关于我',
                projects: '我的项目',
                skills: '技术技能',
                contact: '联系我',
                terminal: '终端',
                timeline: '旅程时间轴',
                blogs: '我的博客',
                stringsync: 'StringSync',
            },
        },
        apps: {
            about: '关于我',
            projects: '项目',
            skills: '技能',
            timeline: '时间轴',
            terminal: '终端',
            contact: '联系',
            blogs: '博客',
            stringsync: 'StringSync',
        },
        appContent: {
            about: {
                greeting: "嗨，我是 Ayaan",
                role: "学生 • 领导者 • 开发者",
                location: "新加坡",
                classOf: "2028届",
                aboutTitle: "关于我",
                bio1: "我是一名 16 岁的 UWC South East Asia 学生，热衷于领导力、社会服务和创造影响力。无论是主持模联会议、为 DragonsTV 制作新闻、组织社区服务，还是打壁球，我都全力以赴。",
                bio2: "目前正在通过这个作品集项目学习编程——证明任何人都可以从零开始！我相信科技的力量可以解决现实问题并连接社区。",
                factsTitle: "快速事实",
                fact1: "参加过 11+ 次模联会议",
                fact2: "前 20 名壁球选手 (新加坡分龄组)",
                fact3: "自学鼓手",
                fact4: "吉他初学者",
                fact5: "UWCSEA 东校区",
                contactTitle: "联系我",
                email: "电子邮件",
                phone: "电话",
            },
            resume: RESUME_DATA,
            projects: {
                filter: "筛选项目",
                clear: "清除",
                showFilters: "显示技术筛选",
                hideFilters: "隐藏技术筛选",
                noResults: "没有匹配的项目",
                featured: "精选",
                clickToPlay: "点击播放",
                preview: "项目预览",
                demo: "演示",
                code: "代码",
                about: "关于",
                stats: "基础属性",
                tech: "技能 (技术栈)",
            },
            stringsync: {
                back: "返回作品集",
                desktopHeader: "仅限桌面体验",
                desktopBody: "StringSync 需要网络摄像头和键盘/鼠标以获得最佳体验。请在带有 Chrome 的台式电脑上打开此项目。",
                returnPortfolio: "返回作品集",
                initializing: "正在初始化",
                active: "系统正常",
                startingCamera: "正在启动相机...",
                cameraPermission: "请允许相机访问权限",
                leftScreen: "左侧屏幕",
                leftInstructions: "举起手指组成和弦。",
                rightScreen: "右侧屏幕",
                rightInstructions: "向下扫弦以演奏。",
                currentChord: "当前和弦",
                detection: "检测状态",
                chordLocked: "和弦锁定",
                noChord: "无和弦",
                strumming: "正在扫弦",
                idle: "空闲",
                audioEngine: "音频引擎",
                systemActive: "系统已激活",
                clickEnable: "点击启用",
                tip: "提示：确保光线充足，并保持双手在画面中可见。"
            }
        },
        common: {
            loading: '加载中...',
            error: '错误',
            back: '返回',
            close: '关闭',
            menu: '菜单',
            select: '选择',
        },
        mobile: {
            unlock: '滑动解锁',
            camera: '相机',
            photos: '照片',
            settings: '设置',
            carrier: 'Ayaan电信',
        }
    },
    hi: {
        desktop: {
            appName: 'AyaanOS',
            menu: {
                file: 'फ़ाइल',
                edit: 'संपादन',
                view: 'दृश्य',
                go: 'जाना',
                window: 'खिड़की',
                help: 'मदद',
            },
            weather: {
                city: 'सिंगापुर',
                temp: '28°C',
            },
            windowTitles: {
                about: 'मेरे बारे में',
                projects: 'मेरे प्रोजेक्ट्स',
                skills: 'तकनीकी कौशल',
                contact: 'संपर्क करें',
                terminal: 'टर्मिनल',
                timeline: 'मेरी यात्रा',
                blogs: 'मेरे ब्लॉग',
                stringsync: 'StringSync',
            },
        },
        apps: {
            about: 'मेरे बारे में',
            projects: 'प्रोजेक्ट्स',
            skills: 'कौशल',
            timeline: 'समयरेखा',
            terminal: 'टर्मिनल',
            contact: 'संपर्क',
            blogs: 'ब्लॉग',
            stringsync: 'StringSync',
        },
        appContent: {
            about: {
                greeting: "नमस्ते, मैं अयान हूँ",
                role: "छात्र • नेता • डेवलपर",
                location: "सिंगापुर",
                classOf: "कक्षा 2028",
                aboutTitle: "मेरे बारे में",
                bio1: "मैं सिंगापुर के UWC South East Asia में 16 वर्षीय छात्र हूँ, जो नेतृत्व, सेवा और प्रभाव डालने के बारे में भावुक हूँ। चाहे मैं MUN सम्मेलनों की अध्यक्षता कर रहा हूँ, DragonsTV के लिए स्कूल समाचार का निर्माण कर रहा हूँ, सामुदायिक सेवा पहल का आयोजन कर रहा हूँ, या स्क्वैश में प्रतिस्पर्धा कर रहा हूँ, मैं जो कुछ भी करता हूँ उसमें ऊर्जा और समर्पण लाता हूँ।",
                bio2: "वर्तमान में इस पोर्टफोलियो प्रोजेक्ट के माध्यम से कोडिंग सीख रहा हूँ - इस बात का प्रमाण कि कोई भी कहीं से भी शुरू कर सकता है! मैं वास्तविक दुनिया की समस्याओं को हल करने और समुदायों को एक साथ लाने के लिए प्रौद्योगिकी की शक्ति में विश्वास करता हूँ।",
                factsTitle: "त्वरित तथ्य",
                fact1: "11+ MUN सम्मेलन",
                fact2: "शीर्ष 20 स्क्वैश खिलाड़ी (आयु समूह, सिंगापुर)",
                fact3: "स्वयं सिखाया ड्रमर",
                fact4: "गिटार सीख रहा हूँ",
                fact5: "UWCSEA East Campus",
                contactTitle: "संपर्क में रहें",
                email: "ईमेल",
                phone: "फ़ोन",
            },
            resume: RESUME_DATA,
            projects: {
                filter: "प्रोजेक्ट्स फ़िल्टर करें",
                clear: "साफ़ करें",
                showFilters: "तकनीकी फ़िल्टर दिखाएं",
                hideFilters: "तकनीकी फ़िल्टर छिपाएं",
                noResults: "कोई प्रोजेक्ट आपके फ़िल्टर से मेल नहीं खाता",
                featured: "विशेष रुप से प्रदर्शित",
                clickToPlay: "खेलने के लिए क्लिक करें",
                preview: "प्रोजेक्ट पूर्वावलोकन",
                demo: "डेमो",
                code: "कोड",
                about: "के बारे में",
                stats: "बुनियादी आँकड़े",
                tech: "क्षमताएं (तकनीकी स्टैक)",
            },
            stringsync: {
                back: "पोर्टफोलियो पर वापस जाएं",
                desktopHeader: "केवल डेस्कटॉप अनुभव",
                desktopBody: "StringSync को सर्वोत्तम अनुभव के लिए वेबकैम और कीबोर्ड/माउस की आवश्यकता है। कृपया क्रोम के साथ डेस्कटॉप कंप्यूटर पर इस प्रोजेक्ट को खोलें।",
                returnPortfolio: "पोर्टफोलियो पर वापस जाएं",
                initializing: "शुरुआत हो रही है",
                active: "सक्रिय",
                startingCamera: "कैमरा शुरू हो रहा है...",
                cameraPermission: "कृपया कैमरा एक्सेस की अनुमति दें",
                leftScreen: "बाईं स्क्रीन",
                leftInstructions: "कॉर्ड्स बनाने के लिए उंगलियां उठाएं।",
                rightScreen: "दाहिनी स्क्रीन",
                rightInstructions: "बजाने के लिए नीचे की ओर स्ट्रम करें।",
                currentChord: "वर्तमान कॉर्ड",
                detection: "खोज",
                chordLocked: "कॉर्ड लॉक",
                noChord: "कोई कॉर्ड नहीं",
                strumming: "स्ट्रमिंग",
                idle: "निष्क्रिय",
                audioEngine: "ऑडियो इंजन",
                systemActive: "सिस्टम सक्रिय",
                clickEnable: "सक्षम करने के लिए क्लिक करें",
                tip: "सुझाव: सुनिश्चित करें कि अच्छी रोशनी है और अपने हाथों को फ्रेम में दिखाई दें।"
            }
        },
        common: {
            loading: 'लोड हो रहा है...',
            error: 'त्रुटि',
            back: 'वापस',
            close: 'बंद करें',
            menu: 'मेन्यू',
            select: 'चुनें',
        },
        mobile: {
            unlock: 'अनलॉक करने के लिए स्लाइड करें',
            camera: 'कैमरा',
            photos: 'तस्वीरें',
            settings: 'सेटिंग्स',
            carrier: 'अयान-टेल',
        }
    }
};

export type TranslationKey = keyof typeof translations.en;
