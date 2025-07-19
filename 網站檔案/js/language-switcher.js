// 多語言切換功能
class LanguageSwitcher {
    constructor() {
        this.currentLang = 'zh-Hant';
        this.translations = {
            'zh-Hant': {
                // 導航
                'nav.about': '關於我們',
                'nav.services': '服務內容',
                'nav.services.content': '服務內容',
                'nav.services.process': '服務流程',
                'nav.services.fees': '服務收費',
                'nav.services.membership': '會員專享',
                'nav.services.newMember': '新會員優惠',
                'nav.news': '最新消息',
                'nav.news.service': '服務最新消息',
                'nav.news.chronic': '慢病共治計劃最新消息',
                'nav.events': '活動',
                'nav.events.themed': '主題活動',
                'nav.events.vaccination': '疫苗注射活動',
                'nav.events.schedule': '活動時間表',
                'nav.events.lottery': '活動抽籤結果',
                'nav.health': '健康資訊',
                'nav.resources': '地區資源庫',
                'nav.resources.providers': '網絡服務提供者',
                'nav.resources.regional': '地區資源',
                'nav.contact': '聯絡我們',
                'nav.contact.methods': '聯絡方法',
                'nav.contact.feedback': '提交意見',
                'nav.join': '加入我們',
                'nav.join.member': '成為會員',
                'nav.join.volunteer': '成為義工',
                'nav.join.provider': '成為網絡服務提供者',
                'nav.join.partner': '成為社區協作伙伴',
                
                // 首頁內容
                'hero.title': '專業復康服務 提升生活質素',
                'hero.subtitle': '香港復康會致力為殘疾人士提供全面的復康服務，協助他們重拾自信，融入社會。',
                'hero.learnMore': '了解更多',
                'hero.contact': '聯絡我們',
                
                // 特色服務
                'features.title': '我們的服務特色',
                'features.physical.title': '物理治療',
                'features.physical.desc': '專業的物理治療師提供個人化的治療計劃，幫助改善身體機能和減輕痛楚。',
                'features.occupational.title': '職業治療',
                'features.occupational.desc': '協助殘疾人士提升日常生活技能，增強獨立生活能力。',
                'features.speech.title': '言語治療',
                'features.speech.desc': '改善溝通能力，提升語言表達和理解能力。',
                'features.community.title': '社區支援',
                'features.community.desc': '提供社區資源和支援服務，協助融入社會。',
                
                // 最新消息
                'news.title': '最新消息',
                'news.viewAll': '查看所有消息',
                'news.facility.title': '復康服務新設施正式啟用',
                'news.facility.desc': '我們很高興宣佈新的復康設施已經正式啟用，為會員提供更優質的服務...',
                'news.chronic.title': '慢病共治計劃正式啟動',
                'news.chronic.desc': '與政府合作推出的慢病共治計劃現已正式啟動，為慢性病患者提供全面支援...',
                
                // 活動
                'events.title': '即將舉行的活動',
                'events.stroke.title': '健康講座：預防中風',
                'events.stroke.time': '下午2:00 - 4:00',
                'events.stroke.location': '香港復康會總部',
                'events.stroke.learnMore': '了解更多',
                'events.vaccine.title': '流感疫苗注射活動',
                'events.vaccine.time': '上午9:00 - 下午5:00',
                'events.vaccine.location': '各區服務中心',
                'events.vaccine.book': '立即預約',
                
                // 統計
                'stats.members': '服務會員',
                'stats.therapists': '專業治療師',
                'stats.centers': '服務中心',
                'stats.satisfaction': '滿意度百分比',
                
                // 頁尾
                'footer.contact.title': '聯絡資訊',
                'footer.contact.address': '地址：香港九龍旺角彌敦道123號',
                'footer.contact.phone': '電話：',
                'footer.contact.email': '電郵：',
                'footer.quick.title': '快速連結',
                'footer.member.title': '會員服務',
                'footer.social.title': '關注我們',
                'footer.privacy': '私隱政策',
                'footer.disclaimer': '免責聲明',
                'footer.accessibility': '無障礙聲明',
                'footer.copyright': '版權所有.'
            },
            'zh-Hans': {
                // 導航
                'nav.about': '关于我们',
                'nav.services': '服务内容',
                'nav.services.content': '服务内容',
                'nav.services.process': '服务流程',
                'nav.services.fees': '服务收费',
                'nav.services.membership': '会员专享',
                'nav.services.newMember': '新会员优惠',
                'nav.news': '最新消息',
                'nav.news.service': '服务最新消息',
                'nav.news.chronic': '慢病共治计划最新消息',
                'nav.events': '活动',
                'nav.events.themed': '主题活动',
                'nav.events.vaccination': '疫苗注射活动',
                'nav.events.schedule': '活动时间表',
                'nav.events.lottery': '活动抽签结果',
                'nav.health': '健康资讯',
                'nav.resources': '地区资源库',
                'nav.resources.providers': '网络服务提供者',
                'nav.resources.regional': '地区资源',
                'nav.contact': '联络我们',
                'nav.contact.methods': '联络方法',
                'nav.contact.feedback': '提交意见',
                'nav.join': '加入我们',
                'nav.join.member': '成为会员',
                'nav.join.volunteer': '成为义工',
                'nav.join.provider': '成为网络服务提供者',
                'nav.join.partner': '成为社区协作伙伴',
                
                // 首頁內容
                'hero.title': '专业康复服务 提升生活质素',
                'hero.subtitle': '香港康复会致力为残疾人士提供全面的康复服务，协助他们重拾自信，融入社会。',
                'hero.learnMore': '了解更多',
                'hero.contact': '联络我们',
                
                // 特色服務
                'features.title': '我们的服务特色',
                'features.physical.title': '物理治疗',
                'features.physical.desc': '专业的物理治疗师提供个人化的治疗计划，帮助改善身体机能和减轻痛楚。',
                'features.occupational.title': '职业治疗',
                'features.occupational.desc': '协助残疾人士提升日常生活技能，增强独立生活能力。',
                'features.speech.title': '言语治疗',
                'features.speech.desc': '改善沟通能力，提升语言表达和理解能力。',
                'features.community.title': '社区支援',
                'features.community.desc': '提供社区资源和支援服务，协助融入社会。',
                
                // 最新消息
                'news.title': '最新消息',
                'news.viewAll': '查看所有消息',
                'news.facility.title': '康复服务新设施正式启用',
                'news.facility.desc': '我们很高兴宣布新的康复设施已经正式启用，为会员提供更优质的服务...',
                'news.chronic.title': '慢病共治计划正式启动',
                'news.chronic.desc': '与政府合作推出的慢病共治计划现已正式启动，为慢性病患者提供全面支援...',
                
                // 活動
                'events.title': '即将举行的活动',
                'events.stroke.title': '健康讲座：预防中风',
                'events.stroke.time': '下午2:00 - 4:00',
                'events.stroke.location': '香港康复会总部',
                'events.stroke.learnMore': '了解更多',
                'events.vaccine.title': '流感疫苗注射活动',
                'events.vaccine.time': '上午9:00 - 下午5:00',
                'events.vaccine.location': '各区服务中心',
                'events.vaccine.book': '立即预约',
                
                // 統計
                'stats.members': '服务会员',
                'stats.therapists': '专业治疗师',
                'stats.centers': '服务中心',
                'stats.satisfaction': '满意度百分比',
                
                // 頁尾
                'footer.contact.title': '联络资讯',
                'footer.contact.address': '地址：香港九龙旺角弥敦道123号',
                'footer.contact.phone': '电话：',
                'footer.contact.email': '电邮：',
                'footer.quick.title': '快速链接',
                'footer.member.title': '会员服务',
                'footer.social.title': '关注我们',
                'footer.privacy': '隐私政策',
                'footer.disclaimer': '免责声明',
                'footer.accessibility': '无障碍声明',
                'footer.copyright': '版权所有.'
            },
            'en': {
                // Navigation
                'nav.about': 'About Us',
                'nav.services': 'Services',
                'nav.services.content': 'Service Content',
                'nav.services.process': 'Service Process',
                'nav.services.fees': 'Service Fees',
                'nav.services.membership': 'Member Benefits',
                'nav.services.newMember': 'New Member Offers',
                'nav.news': 'Latest News',
                'nav.news.service': 'Service News',
                'nav.news.chronic': 'Chronic Disease Management News',
                'nav.events': 'Events',
                'nav.events.themed': 'Themed Events',
                'nav.events.vaccination': 'Vaccination Events',
                'nav.events.schedule': 'Event Schedule',
                'nav.events.lottery': 'Event Lottery Results',
                'nav.health': 'Health Information',
                'nav.resources': 'Regional Resources',
                'nav.resources.providers': 'Network Service Providers',
                'nav.resources.regional': 'Regional Resources',
                'nav.contact': 'Contact Us',
                'nav.contact.methods': 'Contact Methods',
                'nav.contact.feedback': 'Submit Feedback',
                'nav.join': 'Join Us',
                'nav.join.member': 'Become a Member',
                'nav.join.volunteer': 'Become a Volunteer',
                'nav.join.provider': 'Become a Service Provider',
                'nav.join.partner': 'Become a Community Partner',
                
                // Homepage content
                'hero.title': 'Professional Rehabilitation Services Enhancing Quality of Life',
                'hero.subtitle': 'Hong Kong Rehabilitation Society is committed to providing comprehensive rehabilitation services for people with disabilities, helping them regain confidence and integrate into society.',
                'hero.learnMore': 'Learn More',
                'hero.contact': 'Contact Us',
                
                // Features
                'features.title': 'Our Service Features',
                'features.physical.title': 'Physical Therapy',
                'features.physical.desc': 'Professional physiotherapists provide personalized treatment plans to help improve physical function and reduce pain.',
                'features.occupational.title': 'Occupational Therapy',
                'features.occupational.desc': 'Assist people with disabilities to enhance daily living skills and increase independence.',
                'features.speech.title': 'Speech Therapy',
                'features.speech.desc': 'Improve communication skills and enhance language expression and comprehension abilities.',
                'features.community.title': 'Community Support',
                'features.community.desc': 'Provide community resources and support services to assist social integration.',
                
                // News
                'news.title': 'Latest News',
                'news.viewAll': 'View All News',
                'news.facility.title': 'New Rehabilitation Facilities Officially Opened',
                'news.facility.desc': 'We are pleased to announce that new rehabilitation facilities have been officially opened, providing better services for members...',
                'news.chronic.title': 'Chronic Disease Management Program Officially Launched',
                'news.chronic.desc': 'The chronic disease management program launched in collaboration with the government is now officially launched, providing comprehensive support for chronic disease patients...',
                
                // Events
                'events.title': 'Upcoming Events',
                'events.stroke.title': 'Health Talk: Stroke Prevention',
                'events.stroke.time': '2:00 PM - 4:00 PM',
                'events.stroke.location': 'Hong Kong Rehabilitation Society Headquarters',
                'events.stroke.learnMore': 'Learn More',
                'events.vaccine.title': 'Flu Vaccination Event',
                'events.vaccine.time': '9:00 AM - 5:00 PM',
                'events.vaccine.location': 'All District Service Centers',
                'events.vaccine.book': 'Book Now',
                
                // Statistics
                'stats.members': 'Service Members',
                'stats.therapists': 'Professional Therapists',
                'stats.centers': 'Service Centers',
                'stats.satisfaction': 'Satisfaction Rate',
                
                // Footer
                'footer.contact.title': 'Contact Information',
                'footer.contact.address': 'Address: 123 Nathan Road, Mong Kok, Kowloon, Hong Kong',
                'footer.contact.phone': 'Phone: ',
                'footer.contact.email': 'Email: ',
                'footer.quick.title': 'Quick Links',
                'footer.member.title': 'Member Services',
                'footer.social.title': 'Follow Us',
                'footer.privacy': 'Privacy Policy',
                'footer.disclaimer': 'Disclaimer',
                'footer.accessibility': 'Accessibility Statement',
                'footer.copyright': 'All Rights Reserved.'
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadSavedLanguage();
        this.updateLanguage();
    }
    
    bindEvents() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }
    
    switchLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            this.updateLanguage();
            this.saveLanguage();
            this.updateLanguageButtons();
        }
    }
    
    updateLanguage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[this.currentLang][key];
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // 更新頁面標題
        const titleMap = {
            'zh-Hant': '香港復康會 - 專業復康服務',
            'zh-Hans': '香港康复会 - 专业康复服务',
            'en': 'Hong Kong Rehabilitation Society - Professional Rehabilitation Services'
        };
        document.title = titleMap[this.currentLang] || titleMap['zh-Hant'];
        
        // 更新HTML lang屬性
        document.documentElement.lang = this.currentLang;
    }
    
    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLang) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }
    
    saveLanguage() {
        try {
            localStorage.setItem('wtsdhc-language', this.currentLang);
        } catch (e) {
            console.warn('無法保存語言設定到本地存儲');
        }
    }
    
    loadSavedLanguage() {
        try {
            const savedLang = localStorage.getItem('wtsdhc-language');
            if (savedLang && this.translations[savedLang]) {
                this.currentLang = savedLang;
            }
        } catch (e) {
            console.warn('無法從本地存儲讀取語言設定');
        }
    }
    
    getText(key) {
        return this.translations[this.currentLang][key] || key;
    }
    
    getCurrentLanguage() {
        return this.currentLang;
    }
}

// 初始化語言切換器
document.addEventListener('DOMContentLoaded', function() {
    window.languageSwitcher = new LanguageSwitcher();
});

// 導出供其他模組使用
window.LanguageSwitcher = LanguageSwitcher; 