// 音楽サイト用のJavaScript機能

// 音楽プレイヤー機能
class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentTrack = 0;
        this.tracks = [
            { title: "Piano Melody", titleKey: "player.track1", duration: "3:45" },
            { title: "Guitar Harmony", titleKey: "player.track2", duration: "4:12" },
            { title: "Electronic Dreams", titleKey: "player.track3", duration: "5:30" }
        ];
        this.init();
    }

    init() {
        this.createPlayer();
        this.attachEventListeners();
    }

    createPlayer() {
        const playerHTML = `
            <div class="music-player" id="musicPlayer">
                <div class="player-controls">
                    <button class="control-btn" id="prevBtn">⏮️</button>
                    <button class="control-btn play-pause" id="playPauseBtn">▶️</button>
                    <button class="control-btn" id="nextBtn">⏭️</button>
                </div>
                <div class="track-info">
                    <div class="track-title" id="trackTitle">${this.tracks[0].title}</div>
                    <div class="track-duration" id="trackDuration">${this.tracks[0].duration}</div>
                </div>
                <div class="progress-bar">
                    <div class="progress" id="progress"></div>
                </div>
            </div>
        `;
        
        // プレイヤーをヘッダーに追加
        const header = document.querySelector('.header');
        header.insertAdjacentHTML('beforeend', playerHTML);
        
        // プレイヤーのスタイルを追加
        this.addPlayerStyles();
    }

    addPlayerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .music-player {
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 1.5rem;
                min-width: 300px;
                z-index: 10;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .player-controls {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .control-btn {
                background: none;
                border: none;
                color: #fff;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.3s ease;
            }

            .control-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }

            .play-pause {
                font-size: 2rem;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .track-info {
                text-align: center;
                margin-bottom: 1rem;
            }

            .track-title {
                font-weight: bold;
                margin-bottom: 0.25rem;
            }

            .track-duration {
                font-size: 0.9rem;
                opacity: 0.7;
            }

            .progress-bar {
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                overflow: hidden;
            }

            .progress {
                width: 0%;
                height: 100%;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                transition: width 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    attachEventListeners() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        playPauseBtn?.addEventListener('click', () => this.togglePlay());
        prevBtn?.addEventListener('click', () => this.previousTrack());
        nextBtn?.addEventListener('click', () => this.nextTrack());
    }

    togglePlay() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const progress = document.getElementById('progress');
        
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            playPauseBtn.textContent = '⏸️';
            this.simulateProgress();
        } else {
            playPauseBtn.textContent = '▶️';
        }
    }

    simulateProgress() {
        if (!this.isPlaying) return;
        
        const progress = document.getElementById('progress');
        let width = 0;
        
        const interval = setInterval(() => {
            if (!this.isPlaying || width >= 100) {
                clearInterval(interval);
                if (width >= 100) {
                    this.nextTrack();
                }
                return;
            }
            
            width += 0.5;
            progress.style.width = width + '%';
        }, 100);
    }

    previousTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        this.updateTrackInfo();
        this.resetProgress();
    }

    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        this.updateTrackInfo();
        this.resetProgress();
    }

    updateTrackInfo() {
        const trackTitle = document.getElementById('trackTitle');
        const trackDuration = document.getElementById('trackDuration');
        
        if (trackTitle && trackDuration) {
            trackTitle.textContent = this.tracks[this.currentTrack].title;
            trackDuration.textContent = this.tracks[this.currentTrack].duration;
        }
    }

    resetProgress() {
        const progress = document.getElementById('progress');
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (progress) progress.style.width = '0%';
        if (playPauseBtn) playPauseBtn.textContent = '▶️';
        this.isPlaying = false;
    }
}

// パーティクル効果
class MusicParticles {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.init();
    }

    init() {
        this.createCanvas();
        this.generateParticles();
        this.animate();
        this.handleResize();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.6';
        
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    generateParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${Math.random() * 60 + 200}, 70%, 70%)`
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // パーティクルの移動
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 画面端での反射
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // パーティクルの描画
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });
        
        // パーティクル間の線を描画
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
    }
}

// 音楽の波形効果
class AudioVisualizer {
    constructor() {
        this.frequencies = [];
        this.init();
    }

    init() {
        this.createVisualizer();
        this.animate();
    }

    createVisualizer() {
        const visualizerHTML = `
            <div class="audio-visualizer" id="audioVisualizer">
                <div class="bars-container" id="barsContainer"></div>
            </div>
        `;
        
        const skillsSection = document.querySelector('#skills');
        skillsSection.insertAdjacentHTML('afterbegin', visualizerHTML);
        
        this.addVisualizerStyles();
        this.createBars();
    }

    addVisualizerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .audio-visualizer {
                margin: 2rem 0;
                text-align: center;
            }

            .bars-container {
                display: flex;
                justify-content: center;
                align-items: end;
                height: 100px;
                gap: 3px;
            }

            .bar {
                width: 6px;
                background: linear-gradient(to top, #ff6b6b, #4ecdc4);
                border-radius: 3px;
                transition: height 0.1s ease;
                min-height: 5px;
            }
        `;
        document.head.appendChild(style);
    }

    createBars() {
        const container = document.getElementById('barsContainer');
        const barCount = 32;
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = '5px';
            container.appendChild(bar);
        }
    }

    animate() {
        const bars = document.querySelectorAll('.bar');
        
        bars.forEach((bar, index) => {
            const height = Math.random() * 80 + 10;
            bar.style.height = height + 'px';
        });
        
        setTimeout(() => this.animate(), 150);
    }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 音楽プレイヤーの初期化
    new MusicPlayer();
    
    // パーティクル効果の初期化
    new MusicParticles();
    
    // オーディオビジュアライザーの初期化
    new AudioVisualizer();
    
    // タイピング効果
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // ヘッダーテキストにタイピング効果を適用
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle && heroSubtitle) {
            typeWriter(heroTitle, 'Music', 150);
            setTimeout(() => {
                typeWriter(heroSubtitle, '音楽を日常に', 100);
            }, 2000);
        }
    }, 1000);
});

// キーボードショートカット
document.addEventListener('keydown', function(e) {
    // スペースキーで音楽の再生/停止
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.click();
        }
    }
});
