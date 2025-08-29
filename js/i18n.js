// 多言語対応システム
class LanguageManager {
    constructor() {
        this.currentLanguage = 'ja'; // デフォルト言語
        this.translations = {};
        this.init();
    }

    init() {
        this.loadTranslations();
        this.setupEventListeners();
        this.applySavedLanguage();
    }

    // 翻訳データの定義
    loadTranslations() {
        this.translations = {
            ja: {
                'nav.home': 'ホーム',
                'nav.about': '自己紹介',
                'nav.skills': 'スキル',
                'nav.contact': 'お問い合わせ',
                
                'hero.title': 'Music Soul',
                'hero.subtitle': '音楽と共に歩む人生 🎶',
                'hero.welcome': '私の音楽の旅へようこそ',
                
                'about.title': '自己紹介',
                'about.greeting': 'こんにちは！',
                'about.intro': '音楽を愛するクリエイターです。幼い頃からピアノを始め、その後ギター、作曲、音楽制作へと興味を広げてきました。音楽は私の人生そのものであり、日々新しいサウンドやメロディーを探求し続けています。',
                'about.passion': 'クラシックからジャズ、ロック、エレクトロニックまで、ジャンルを問わず音楽の可能性を追求することが私の情熱です。現在は楽曲制作やライブパフォーマンス、音楽教育にも力を入れています。',
                'about.future': '音楽を通じて人々の心に響く何かを伝えられるよう、これからも成長し続けたいと思います。',
                
                'skills.title': '音楽スキル',
                'skills.piano.title': 'ピアノ',
                'skills.piano.desc': '15年の経験を持つピアノ演奏。クラシックからジャズまで幅広いスタイルに対応。',
                'skills.guitar.title': 'ギター',
                'skills.guitar.desc': 'アコースティック、エレキギター両方を演奏。フィンガーピッキングからロックソロまで。',
                'skills.composition.title': '作曲',
                'skills.composition.desc': 'オリジナル楽曲の作曲・編曲。様々なジャンルの楽曲制作が可能。',
                'skills.production.title': '音楽制作',
                'skills.production.desc': 'DAWを使用した音楽制作。レコーディング、ミキシング、マスタリングまで。',
                'skills.vocal.title': 'ボーカル',
                'skills.vocal.desc': 'ボーカルパフォーマンス。コーラスワークや声楽技術にも精通。',
                'skills.theory.title': '音楽理論',
                'skills.theory.desc': '音楽理論の深い理解。楽曲分析や音楽教育にも活用。',
                
                'contact.title': 'お問い合わせ',
                'contact.intro': '音楽について語り合いませんか？',
                'contact.description': '楽曲制作のご依頼やコラボレーション、音楽教育に関するお問い合わせなど、お気軽にご連絡ください。',
                'contact.email': 'Eメール',
                'contact.twitter': 'Twitter',
                'contact.soundcloud': 'SoundCloud',
                
                'footer.copyright': '© 2025 Music Soul. All rights reserved. Made with 🎶 and ❤️',

                'player.track1': 'ピアノメロディー',
                'player.track2': 'ギターハーモニー',
                'player.track3': 'エレクトロニックドリームス',

                // 自己紹介ページ専用
                'profile.name': 'Music Soul',
                'profile.role': '音楽クリエイター',
                'stats.experience': '年の経験',
                'stats.songs': '楽曲制作',
                'stats.performances': 'ライブ出演',
                'stats.passion': '音楽への愛',
                
                'intro.title': 'はじめまして',
                'intro.content': '音楽を愛するクリエイターです。幼い頃からピアノを始め、その後ギター、作曲、音楽制作へと興味を広げてきました。音楽は私の人生そのものであり、日々新しいサウンドやメロディーを探求し続けています。',
                
                'passion.title': '音楽への情熱',
                'passion.content': 'クラシックからジャズ、ロック、エレクトロニックまで、ジャンルを問わず音楽の可能性を追求することが私の情熱です。現在は楽曲制作やライブパフォーマンス、音楽教育にも力を入れています。音楽を通じて人々の心に響く何かを伝えられるよう、これからも成長し続けたいと思います。',
                
                'philosophy.title': '音楽哲学',
                'philosophy.content': '音楽は言葉を超えた普遍的な言語だと信じています。文化や国境を越えて人々の心を繋ぐ力を持つ音楽を通じて、より良い世界を作ることができると考えています。一つ一つの音符に想いを込めて、聴く人の人生に少しでも彩りを添えられれば幸いです。',
                
                'interests.title': '趣味・興味',
                'interests.piano.title': 'ピアノ演奏',
                'interests.piano.desc': 'クラシックからジャズまで幅広いスタイル',
                'interests.guitar.title': 'ギター',
                'interests.guitar.desc': 'アコースティック・エレキ両方',
                'interests.composition.title': '作曲・編曲',
                'interests.composition.desc': 'オリジナル楽曲の創作',
                'interests.production.title': '音楽制作',
                'interests.production.desc': 'DAWを使用したプロダクション',
                'interests.learning.title': '音楽理論研究',
                'interests.learning.desc': '理論と実践の融合',
                'interests.performance.title': 'ライブ演奏',
                'interests.performance.desc': '観客との音楽体験の共有',
                
                'timeline.title': '音楽の歩み',
                'timeline.childhood.year': '幼少期 (5歳)',
                'timeline.childhood.content': '初めてピアノに触れる。音楽の美しさに魅了され、基礎的な演奏技術を身につける。',
                'timeline.teen.year': '中学時代 (13歳)',
                'timeline.teen.content': 'ギターとの出会い。バンド活動を開始し、様々なジャンルの音楽に興味を持つ。',
                'timeline.highschool.year': '高校時代 (16歳)',
                'timeline.highschool.content': '作曲を始める。初めてのオリジナル楽曲を制作し、音楽制作の楽しさを知る。',
                'timeline.college.year': '大学時代 (18歳)',
                'timeline.college.content': '本格的な音楽制作を学ぶ。DAWの使用方法を習得し、プロダクションスキルを向上。',
                'timeline.present.year': '現在',
                'timeline.present.content': '音楽クリエイターとして活動中。楽曲制作、ライブ演奏、音楽教育など幅広く活動。',
                
                'footer.back': '← メインページに戻る'
            },
            
            en: {
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.skills': 'Skills',
                'nav.contact': 'Contact',
                
                'hero.title': 'Music Soul',
                'hero.subtitle': 'Life with Music 🎶',
                'hero.welcome': 'Welcome to my musical journey',
                
                'about.title': 'About Me',
                'about.greeting': 'Hello!',
                'about.intro': 'I am a music-loving creator. I started with piano in my early years and have since expanded my interests to guitar, composition, and music production. Music is my life itself, and I continue to explore new sounds and melodies every day.',
                'about.passion': 'From classical to jazz, rock to electronic, my passion is to pursue the possibilities of music regardless of genre. I currently focus on music production, live performances, and music education.',
                'about.future': 'I will continue to grow so that I can convey something that touches people\'s hearts through music.',
                
                'skills.title': 'Musical Skills',
                'skills.piano.title': 'Piano',
                'skills.piano.desc': '15 years of piano experience. Versatile in styles from classical to jazz.',
                'skills.guitar.title': 'Guitar',
                'skills.guitar.desc': 'Both acoustic and electric guitar. From fingerpicking to rock solos.',
                'skills.composition.title': 'Composition',
                'skills.composition.desc': 'Original music composition and arrangement. Capable of creating music in various genres.',
                'skills.production.title': 'Music Production',
                'skills.production.desc': 'Music production using DAW. From recording to mixing and mastering.',
                'skills.vocal.title': 'Vocal',
                'skills.vocal.desc': 'Vocal performance. Proficient in chorus work and vocal techniques.',
                'skills.theory.title': 'Music Theory',
                'skills.theory.desc': 'Deep understanding of music theory. Applied to music analysis and education.',
                
                'contact.title': 'Contact',
                'contact.intro': 'Would you like to talk about music?',
                'contact.description': 'Please feel free to contact me for music production requests, collaborations, music education inquiries, and more.',
                'contact.email': 'Email',
                'contact.twitter': 'Twitter',
                'contact.soundcloud': 'SoundCloud',
                
                'footer.copyright': '© 2025 Music Soul. All rights reserved. Made with 🎶 and ❤️',

                'player.track1': 'Piano Melody',
                'player.track2': 'Guitar Harmony',
                'player.track3': 'Electronic Dreams',

                // Introduction page
                'profile.name': 'Music Soul',
                'profile.role': 'Music Creator',
                'stats.experience': 'Years Experience',
                'stats.songs': 'Songs Created',
                'stats.performances': 'Live Shows',
                'stats.passion': 'Music Love',
                
                'intro.title': 'Nice to Meet You',
                'intro.content': 'I am a music-loving creator. I started with piano in my early years and have since expanded my interests to guitar, composition, and music production. Music is my life itself, and I continue to explore new sounds and melodies every day.',
                
                'passion.title': 'Passion for Music',
                'passion.content': 'From classical to jazz, rock to electronic, my passion is to pursue the possibilities of music regardless of genre. I currently focus on music production, live performances, and music education. I will continue to grow so that I can convey something that touches people\'s hearts through music.',
                
                'philosophy.title': 'Music Philosophy',
                'philosophy.content': 'I believe music is a universal language that transcends words. Through music that has the power to connect people\'s hearts across cultures and borders, I think we can create a better world. I hope to add some color to the lives of listeners by putting my thoughts into each note.',
                
                'interests.title': 'Hobbies & Interests',
                'interests.piano.title': 'Piano Performance',
                'interests.piano.desc': 'Wide range from classical to jazz',
                'interests.guitar.title': 'Guitar',
                'interests.guitar.desc': 'Both acoustic and electric',
                'interests.composition.title': 'Composition',
                'interests.composition.desc': 'Original music creation',
                'interests.production.title': 'Music Production',
                'interests.production.desc': 'DAW-based production',
                'interests.learning.title': 'Music Theory',
                'interests.learning.desc': 'Theory and practice fusion',
                'interests.performance.title': 'Live Performance',
                'interests.performance.desc': 'Sharing musical experiences',
                
                'timeline.title': 'Musical Journey',
                'timeline.childhood.year': 'Childhood (Age 5)',
                'timeline.childhood.content': 'First touched the piano. Fascinated by the beauty of music and learned basic performance techniques.',
                'timeline.teen.year': 'Middle School (Age 13)',
                'timeline.teen.content': 'Met the guitar. Started band activities and became interested in various genres of music.',
                'timeline.highschool.year': 'High School (Age 16)',
                'timeline.highschool.content': 'Started composing. Created my first original song and discovered the joy of music production.',
                'timeline.college.year': 'College (Age 18)',
                'timeline.college.content': 'Learned serious music production. Mastered DAW usage and improved production skills.',
                'timeline.present.year': 'Present',
                'timeline.present.content': 'Active as a music creator. Engaged in a wide range of activities including music production, live performances, and music education.',
                
                'footer.back': '← Back to Main Page'
            }
        };
    }

    // イベントリスナーの設定
    setupEventListeners() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const language = e.target.getAttribute('data-lang');
                this.changeLanguage(language);
            });
        });
    }

    // 言語切り替え
    changeLanguage(language) {
        if (!this.translations[language]) {
            console.warn(`Translation for language "${language}" not found`);
            return;
        }

        this.currentLanguage = language;
        this.updateActiveButton();
        this.applyTranslations();
        this.saveLanguagePreference();
        this.updateHtmlLang();
    }

    // アクティブなボタンの更新
    updateActiveButton() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === this.currentLanguage) {
                btn.classList.add('active');
            }
        });
    }

    // 翻訳の適用
    applyTranslations() {
        const elements = document.querySelectorAll('[data-lang-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            const translation = this.translations[this.currentLanguage][key];
            
            if (translation) {
                element.textContent = translation;
            }
        });

        // HTMLのlang属性も更新
        document.documentElement.lang = this.currentLanguage;
    }

    // HTMLのlang属性を更新
    updateHtmlLang() {
        document.documentElement.lang = this.currentLanguage;
    }

    // 言語設定の保存
    saveLanguagePreference() {
        localStorage.setItem('preferredLanguage', this.currentLanguage);
    }

    // 保存された言語設定の適用
    applySavedLanguage() {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && this.translations[savedLanguage]) {
            this.changeLanguage(savedLanguage);
        } else {
            // デフォルト言語を適用
            this.changeLanguage(this.currentLanguage);
        }
    }

    // 現在の言語を取得
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // 特定のキーの翻訳を取得
    getTranslation(key, language = this.currentLanguage) {
        return this.translations[language] && this.translations[language][key] || key;
    }
}

// ページ読み込み時に多言語機能を初期化
document.addEventListener('DOMContentLoaded', function() {
    // 既存のMusicPlayerクラスの初期化前に言語管理を初期化
    window.languageManager = new LanguageManager();
    
    // 言語変更時の通知機能（他のコンポーネントが使用可能）
    window.addEventListener('languageChanged', function(event) {
        console.log('Language changed to:', event.detail.language);
        // 他のコンポーネントが言語変更に対応できるようにイベントを発行
    });
});

// 言語変更イベントを発行する関数
function notifyLanguageChange(language) {
    const event = new CustomEvent('languageChanged', {
        detail: { language: language }
    });
    window.dispatchEvent(event);
}
