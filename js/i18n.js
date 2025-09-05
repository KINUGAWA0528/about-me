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
                'cat.title': 'CAT',
                'cat.rato.title': 'ラト',
                'cat.rabi.title': 'ラビ',
                'watch.bocchi.title': 'ぼっち・ざ・ろっく！',
                'watch.bocchi.desc': '音楽をテーマにした青春アニメ。',
                'watch.conan.title': '名探偵コナン',
                'watch.conan.desc': '長年愛され続けている推理アニメ。',
                'watch.haikyu.title': 'ハイキュー‼',
                'watch.haikyu.desc': 'バレーボールを題材にしたスポーツアニメ。',
                'watch.hp.title': 'Harry Potter',
                'watch.hp.desc': '魔法と友情の物語。',
                'watch.itaewon.title': '梨泰院クラス',
                'watch.itaewon.desc': '韓国のヒューマンドラマ。',
                'watch.venom.title': 'ヴェノム',
                'watch.venom.desc': 'ヒーローと悪役の境界を描いたアクション映画。',
                
            ja: {
                'nav.home': 'HOME',
                'nav.about': 'ABOUT',
                'nav.hololive': 'HOLOLIVE',
                'nav.music': 'MUSIC',
                'nav.watch': 'WATCH',
                'nav.contact': 'CONTACT',
                'nav.cat': 'CAT',
                // index.html用
                'hololive.title': 'HOLOLIVE',
                'hololive.3d.title': '3D Live',
                'hololive.3d.desc': 'Hololiveの様々なメンバーの3Dライブを楽しんでいます。',
                'hololive.game.title': 'ゲーム配信',
                'hololive.game.desc': 'Hololiveの様々なメンバーの配信を楽しんでいます。',
                'hololive.song.title': '歌枠',
                'hololive.song.desc': 'Hololiveの様々なメンバーの歌配信を楽しんでいます。',
                'hololive.variety.title': '企画・バラエティ',
                'hololive.variety.desc': 'Hololiveの様々なメンバーの企画やバラエティ配信を楽しんでいます。',
                'hololive.cooking.title': '料理',
                'hololive.cooking.desc': 'Hololiveの様々なメンバーの料理配信を楽しんでいます。',

                'music.title': 'MUSIC',
                'music.guitar.title': 'Guitar',
                'music.guitar.desc': 'アコギでは、弾き語りやソロギターを嗜んでいます。エレキギターでは、ロックやボカロを中心に嗜んでいます。',
                'music.bass.title': 'Bass',
                'music.bass.desc': 'ロックやジャズを中心に嗜んでいます。',
                'music.drums.title': 'Drums',
                'music.drums.desc': 'ロックやジャズを中心に嗜んでいます。',
                'music.violin.title': 'Violin',
                'music.violin.desc': 'クラシックを中心に嗜んでいます。',
                'music.keyboard.title': 'Keyboard',
                'music.keyboard.desc': 'ボカロやバラード、クラシックを中心に嗜んでいます。',
                'music.dtm.title': 'DTM',
                'music.dtm.desc': 'ロックやボカロ、バラードなどのオリジナル曲を制作しています。',

                'about.title': 'ABOUT',
                'about.greeting': 'このサイトでは',
                'about.intro': '私の推しについて紹介しています。ホロライブや音楽、アニメ・映画、そして愛猫に情熱を注いでいます！',

                'skills.title': 'INTERESTS',
                'skills.hololive.title': 'Hololive',
                'skills.hololive.desc': '毎日配信を観たり、音楽を聴いたり、推し活したりしています。',
                'skills.music.title': 'Music',
                'skills.music.desc': '様々なジャンルの音楽を楽しんでいます。J-POP、ロック、クラシックまで幅広く聴きます。また、楽器を演奏したり、作詞作曲・編曲・MIX・マスタリングにも挑戦しています。',
                'skills.live.title': 'Live',
                'skills.live.desc': 'ほぼホロライブのライブですが、ぼっちざろっくやアーティストさんのライブも嗜んでいます。',
                'skills.anime.title': 'Anime',
                'skills.anime.desc': 'アニメ鑑賞が趣味です。感動的な作品から日常系まで、様々な作品を楽しんでいます。',
                'skills.movies.title': 'Movies',
                'skills.movies.desc': '映画鑑賞も好きです。洋画から邦画、アニメ映画まで様々なジャンルを楽しんでいます。',
                'skills.cat.title': 'Cat',
                'skills.cat.desc': '愛猫の寝顔やご飯を食べている時の姿を見るのと、一緒に遊んでいる時が幸せです。',

                // for hololive.html
                'hololive-hero-subtitle': 'ホロライブの魅力とは',
                'hololive-today': '🌟 今日のホロメン 🌟',
                'hololive-today-desc': '毎日新しい推しメンバーを発見しよう！',
                'hololive-select-button': '🎲 ホロメンを選ぶ 🎲',
                'hololive-member-display': 'ここにホロライブメンバーが表示されます ✨',
                'hololive-member-description': '今日の推しメンバーです！🎉',
                'hololive-about': 'ホロライブとは',
                'hololive-about-desc': 'ホロライブは、カバー株式会社が運営する世界最大級の女性VTuber（バーチャルユーチューバー）グループです。YouTubeでのゲーム実況、歌、雑談などのライブ配信を中心に活動し、クオリティの高い3Dキャラクターモデルを使用したオンラインライブやイベントも開催しています。',
                
                'hero.title': 'MUSIC',
                'hero.subtitle': '音楽を日常に',
                'home.title': 'HOME',
                'home.subtitle': 'このサイトについて',
                
                'skills.title': 'スキル',
                'skills.piano.title': 'Guitar',
                'skills.piano.desc': '15年の経験を持つギター演奏。クラシックからジャズまで幅広いスタイルに対応。',
                'skills.guitar.title': 'Bass',
                'skills.guitar.desc': 'アコースティック、エレキギター両方を演奏。フィンガーピッキングからロックソロまで。',
                'skills.composition.title': 'Drums',
                'skills.composition.desc': 'オリジナル楽曲の作曲・編曲。様々なジャンルの楽曲制作が可能。',
                'skills.production.title': 'Violin',
                'skills.production.desc': 'DAWを使用した音楽制作。レコーディング、ミキシング、マスタリングまで。',
                'skills.vocal.title': 'Keyboard',
                'skills.vocal.desc': 'ボーカルパフォーマンス。コーラスワークや声楽技術にも精通。',
                'skills.theory.title': 'DTM',
                'skills.theory.desc': '音楽理論の深い理解。楽曲分析や音楽教育にも活用。',

                'player.track1': 'ギターメロディー',
                'player.track2': 'ベースハーモニー',
                'player.track3': 'エレクトロニックドリームス',

               
            },
            
            en: {
                'nav.home': 'HOME',
                'nav.about': 'ABOUT',
                'nav.hololive': 'HOLOLIVE',
                'nav.music': 'MUSIC',
                'nav.watch': 'WATCH',
                'nav.contact': 'CONTACT',
                'nav.cat': 'CAT',
                // for index.html
                'hololive.title': 'HOLOLIVE',
                'hololive.3d.title': '3D Live',
                'hololive.3d.desc': 'I enjoy the 3D live performances of various Hololive members.',
                'hololive.game.title': 'Game Streaming',
                'hololive.game.desc': 'I enjoy the game streams of various Hololive members.',
                'hololive.song.title': 'Singing',
                'hololive.song.desc': 'I enjoy the singing streams of various Hololive members.',
                'hololive.variety.title': 'Variety Shows',
                'hololive.variety.desc': 'I enjoy the variety and special event streams of various Hololive members.',
                'hololive.cooking.title': 'Cooking',
                'hololive.cooking.desc': 'I enjoy the cooking streams of various Hololive members.',

                'music.title': 'MUSIC',
                'music.guitar.title': 'Guitar',
                'music.guitar.desc': 'I enjoy playing acoustic guitar (singing and solo) and electric guitar (mainly rock and Vocaloid).',
                'music.bass.title': 'Bass',
                'music.bass.desc': 'Mainly enjoy rock and jazz.',
                'music.drums.title': 'Drums',
                'music.drums.desc': 'Mainly enjoy rock and jazz.',
                'music.violin.title': 'Violin',
                'music.violin.desc': 'Mainly enjoy classical music.',
                'music.keyboard.title': 'Keyboard',
                'music.keyboard.desc': 'Mainly enjoy Vocaloid, ballads, and classical music.',
                'music.dtm.title': 'DTM',
                'music.dtm.desc': 'I create original songs such as rock, Vocaloid, and ballads.',

                'about.title': 'ABOUT',
                'about.greeting': 'About This Site',
                'about.intro': 'This site introduces my favorites. I am passionate about Hololive, music, anime, movies, and my beloved cats!',

                'skills.title': 'INTERESTS',
                'skills.hololive.title': 'Hololive',
                'skills.hololive.desc': 'I watch streams, listen to music, and support my favorites every day.',
                'skills.music.title': 'Music',
                'skills.music.desc': 'I enjoy a wide variety of music genres: J-POP, rock, classical, and more. I also play instruments, write lyrics, compose, arrange, mix, and master music.',
                'skills.live.title': 'Live',
                'skills.live.desc': 'Mainly Hololive concerts, but also enjoy Bocchi the Rock and other artists’ live shows.',
                'skills.anime.title': 'Anime',
                'skills.anime.desc': 'I love watching anime, from moving stories to slice-of-life series.',
                'skills.movies.title': 'Movies',
                'skills.movies.desc': 'I enjoy movies of all kinds, from Western and Japanese films to anime movies.',
                'skills.cat.title': 'Cat',
                'skills.cat.desc': 'I am happiest when watching my cat sleep, eat, or play together.',

                'watch.title': 'WATCH',
                'watch.bocchi.title': 'Bocchi the Rock!',
                'watch.bocchi.desc': 'A youth anime themed around music.',
                'watch.conan.title': 'Detective Conan',
                'watch.conan.desc': 'A long-loved detective anime.',
                'watch.haikyu.title': 'Haikyu!!',
                'watch.haikyu.desc': 'A sports anime about volleyball.',
                'watch.hp.title': 'Harry Potter',
                'watch.hp.desc': 'A story of magic and friendship.',
                'watch.itaewon.title': 'Itaewon Class',
                'watch.itaewon.desc': 'A Korean human drama.',
                'watch.venom.title': 'Venom',
                'watch.venom.desc': 'An action movie depicting the boundary between hero and villain.',

                'cat.title': 'CAT',
                'cat.rato.title': 'Rato',
                'cat.rabi.title': 'Rabi',
                // for hololive.html
                'hololive-hero-subtitle': 'What Makes Hololive Special',
                'hololive-today': '🌟 Today\'s Holomem 🌟',
                'hololive-today-desc': 'Discover a new favorite member every day!',
                'hololive-select-button': '🎲 Choose a Hololive Member 🎲',
                'hololive-member-display': 'Hololive member will be displayed here ✨',
                'hololive-member-description': 'Today\'s favorite member! 🎉',
                'hololive-about': 'About Hololive',
                'hololive-about-desc': 'Hololive is the world\'s largest virtual YouTuber agency, featuring a diverse range of talents and content. They primarily engage in live streaming on YouTube, including game commentary, singing, and chatting, and also hold online live performances and events using high-quality 3D character models.',

                'hero.title': 'MUSIC',
                'hero.subtitle': 'Life with Music',
                'home.title': 'HOME',
                'home.subtitle': 'About This Site',
                
                'about.title': 'ABOUT',
                'about.greeting': 'this site is about',
                'about.intro': 'My favorite topics are introduced here. I am passionate about Hololive, music, anime, movies, and my beloved cats!',
                'about.enjoy': 'Please enjoy watching!',
                
                'skills.title': 'SKILLS',
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
