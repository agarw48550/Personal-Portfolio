export type Language = 'en' | 'zh';

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
};

export type TranslationKey = keyof typeof translations.en;
