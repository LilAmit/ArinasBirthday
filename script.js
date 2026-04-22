// ============================================
// ARINA'S BIRTHDAY - MAGIC EFFECTS SCRIPT
// ============================================

// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================
const heartEmojis = ['💕', '💖', '💗', '💘', '💝', '💞', '💓', '💟', '❤️', '🩷'];
const heartsContainer = document.getElementById('bgHearts');

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 2 + 1.2) + 'rem';
    heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.4;
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 13000);
}

// Spawn hearts continuously
setInterval(createFloatingHeart, 400);
// Initial burst
for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// ============================================
// SPARKLES BACKGROUND
// ============================================
const sparklesContainer = document.getElementById('bgSparkles');

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    sparklesContainer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 4000);
}

setInterval(createSparkle, 150);
for (let i = 0; i < 40; i++) {
    setTimeout(createSparkle, i * 50);
}

// ============================================
// BALLOONS
// ============================================
const balloonColors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ff85c0', '#ffc0cb', '#ff6eb4'];
const balloonsContainer = document.getElementById('balloons');

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    balloon.style.background = `radial-gradient(circle at 30% 30%, #fff, ${color})`;
    balloon.style.color = color;
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.animationDuration = (Math.random() * 10 + 12) + 's';
    balloon.style.animationDelay = Math.random() * 2 + 's';
    balloon.style.transform = `scale(${Math.random() * 0.5 + 0.8})`;
    balloonsContainer.appendChild(balloon);

    setTimeout(() => balloon.remove(), 24000);
}

setInterval(createBalloon, 2500);
for (let i = 0; i < 5; i++) {
    setTimeout(createBalloon, i * 1500);
}

// ============================================
// CONFETTI CANVAS
// ============================================
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class ConfettiParticle {
    constructor(x, y, burst = false) {
        this.x = x ?? Math.random() * canvas.width;
        this.y = y ?? -20;
        this.size = Math.random() * 10 + 5;
        this.speedY = burst ? Math.random() * -15 - 5 : Math.random() * 3 + 2;
        this.speedX = burst ? (Math.random() - 0.5) * 15 : (Math.random() - 0.5) * 2;
        this.gravity = 0.2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffc0cb', '#c71585', '#ff85c0', '#ffd700', '#fff'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
        this.opacity = 1;
        this.life = 1;
        this.isHeart = Math.random() > 0.7;
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.life -= 0.005;
        this.opacity = Math.max(0, this.life);
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        if (this.isHeart) {
            ctx.fillStyle = this.color;
            ctx.font = `${this.size * 2}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText('💖', 0, 0);
        } else if (this.shape === 'rect') {
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
        } else {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    isDead() {
        return this.y > canvas.height + 50 || this.life <= 0;
    }
}

let particles = [];

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => !p.isDead());
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateConfetti);
}
animateConfetti();

function confettiBurst(x, y, amount = 80) {
    for (let i = 0; i < amount; i++) {
        particles.push(new ConfettiParticle(x, y, true));
    }
}

function confettiRain(amount = 100) {
    for (let i = 0; i < amount; i++) {
        setTimeout(() => {
            particles.push(new ConfettiParticle());
        }, i * 30);
    }
}

// Initial confetti burst
setTimeout(() => confettiRain(60), 500);

// ============================================
// ENVELOPE OPENING
// ============================================
const envelope = document.getElementById('envelope');
const letterBackdrop = document.getElementById('letterBackdrop');
const letterClose = document.getElementById('letterClose');
const letter = document.getElementById('letter');
let envelopeOpened = false;

const letterHome = letter.parentElement; // remember original location
let letterInBody = false;

function openLetter(originX, originY) {
    envelope.classList.add('opened');
    letterBackdrop.classList.add('visible');
    envelopeOpened = true;

    // Move letter into body so position:fixed is truly relative to the viewport
    // (envelope ancestors have transform/perspective which create a containing block).
    if (!letterInBody) {
        document.body.appendChild(letter);
        letterInBody = true;
    }
    requestAnimationFrame(() => letter.classList.add('open'));

    confettiBurst(originX, originY, 150);
    setTimeout(() => confettiBurst(originX - 100, originY, 50), 300);
    setTimeout(() => confettiBurst(originX + 100, originY, 50), 500);
    setTimeout(() => confettiRain(40), 800);

    heartExplosion(originX, originY);
}

function closeLetter() {
    envelope.classList.remove('opened');
    letter.classList.remove('open');
    letterBackdrop.classList.remove('visible');
    envelopeOpened = false;

    // Return letter to the envelope after the fade-out
    setTimeout(() => {
        if (letterInBody) {
            letterHome.appendChild(letter);
            letterInBody = false;
        }
    }, 600);
}

envelope.addEventListener('click', (e) => {
    if (e.target.closest('.letter-close')) return;
    if (e.target.closest('.letter') && envelopeOpened) return;

    if (!envelopeOpened) {
        const rect = envelope.getBoundingClientRect();
        openLetter(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
});

letterClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLetter();
});

letterBackdrop.addEventListener('click', closeLetter);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && envelopeOpened) closeLetter();
});

function heartExplosion(x, y) {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = '2.5rem';
            heart.style.zIndex = '998';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'none';

            const angle = (Math.PI * 2 * i) / 20;
            const distance = 150 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            heart.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(1.5)`, opacity: 1, offset: 0.5 },
                { transform: `translate(${tx * 1.5}px, ${ty * 1.5 - 100}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
        }, i * 30);
    }
}

// ============================================
// COLLAGE + LIGHTBOX
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(type, src) {
    lightboxContent.innerHTML = '';
    if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'זיכרון מתוק';
        lightboxContent.appendChild(img);
    } else if (type === 'video') {
        const vid = document.createElement('video');
        vid.src = src;
        vid.controls = true;
        vid.autoplay = true;
        vid.playsInline = true;
        lightboxContent.appendChild(vid);
    }
    lightbox.classList.add('visible');

    const rect = lightbox.getBoundingClientRect();
    confettiBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
}

function closeLightbox() {
    lightbox.classList.remove('visible');
    const vid = lightboxContent.querySelector('video');
    if (vid) vid.pause();
    setTimeout(() => { lightboxContent.innerHTML = ''; }, 350);
}

document.querySelectorAll('.collage-item, .floating-photo').forEach(item => {
    item.addEventListener('click', () => {
        const type = item.dataset.type;
        const src = item.dataset.src;
        openLightbox(type, src);
    });
});

// Make sure thumbnail videos keep playing (browsers sometimes pause when off-screen)
document.querySelectorAll('.thumb-video').forEach(v => {
    v.play().catch(() => {});
    v.addEventListener('pause', () => v.play().catch(() => {}));
});

lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('visible')) closeLightbox();
});

// ============================================
// SURPRISE BUTTON — MEGA CONFETTI
// ============================================
const surpriseBtn = document.getElementById('surpriseBtn');
surpriseBtn.addEventListener('click', () => {
    // Massive confetti storm
    for (let i = 0; i < 5; i++) {
        setTimeout(() => confettiRain(80), i * 300);
    }

    // Burst from button
    const rect = surpriseBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            confettiBurst(cx, cy, 80);
            heartExplosion(cx + (Math.random() - 0.5) * 200, cy + (Math.random() - 0.5) * 200);
        }, i * 200);
    }

    // Show surprise message
    showSurpriseMessage();
});

let surpriseOpen = false;

function closeSurprise() {
    const backdrop = document.getElementById('surpriseBackdrop');
    const msg = document.getElementById('surpriseMsg');
    if (!backdrop || !msg) return;
    backdrop.style.opacity = '0';
    msg.style.transform = 'translate(-50%, -50%) scale(0)';
    setTimeout(() => {
        backdrop.remove();
        msg.remove();
        surpriseOpen = false;
    }, 500);
}

function showSurpriseMessage() {
    if (surpriseOpen) return;
    surpriseOpen = true;

    // Backdrop (click anywhere to close)
    const backdrop = document.createElement('div');
    backdrop.id = 'surpriseBackdrop';
    backdrop.style.cssText = `
        position: fixed;
        inset: 0;
        background: radial-gradient(circle at center, rgba(255, 20, 147, 0.45), rgba(80, 0, 40, 0.8));
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.4s ease;
        cursor: pointer;
    `;
    document.body.appendChild(backdrop);

    // Message box
    const msg = document.createElement('div');
    msg.id = 'surpriseMsg';
    msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, #ff1493, #ff69b4);
        color: #fff;
        padding: clamp(1.8rem, 5vw, 3rem) clamp(1.2rem, 4vw, 2rem);
        border-radius: 25px;
        font-size: clamp(1rem, 3vw, 1.7rem);
        font-weight: 900;
        text-align: center;
        box-shadow: 0 20px 60px rgba(199, 21, 133, 0.6);
        border: 5px solid #fff;
        z-index: 10000;
        max-width: 92vw;
        max-height: 90vh;
        overflow-y: auto;
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-family: 'Heebo', sans-serif;
        -webkit-tap-highlight-color: transparent;
    `;
    msg.innerHTML = `
        <button id="surpriseClose" aria-label="סגור" style="
            position: absolute;
            top: 10px;
            left: 10px;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 2px solid #fff;
            background: rgba(255, 255, 255, 0.2);
            color: #fff;
            font-size: 1.3rem;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.25s ease, background 0.25s ease;
            -webkit-tap-highlight-color: transparent;
        " onmouseover="this.style.transform='scale(1.15) rotate(90deg)';this.style.background='rgba(255,255,255,0.4)'"
          onmouseout="this.style.transform='scale(1) rotate(0deg)';this.style.background='rgba(255,255,255,0.2)'">✕</button>
        <div style="font-size: 3rem; margin-bottom: 1rem;">💖✨🎉✨💖</div>
        <div>אני הכי אוהב אותך בכל העולם!</div>
        <div style="margin-top: 1rem; font-size: 0.85em;">ואנחנו בטוח נתחתן יום אחד!!!  💍💕</div>
        <div style="font-size: 2.5rem; margin-top: 1rem;">👰‍♀️🤵‍♂️💒</div>
    `;
    document.body.appendChild(msg);

    requestAnimationFrame(() => {
        backdrop.style.opacity = '1';
        msg.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Close triggers
    backdrop.addEventListener('click', closeSurprise);
    document.getElementById('surpriseClose').addEventListener('click', (e) => {
        e.stopPropagation();
        closeSurprise();
    });
    msg.addEventListener('click', (e) => e.stopPropagation());
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && surpriseOpen) closeSurprise();
});

// ============================================
// CLICK ANYWHERE — LITTLE HEART TRAIL
// ============================================
document.addEventListener('click', (e) => {
    // Don't add extra hearts for interactive elements already handled
    if (e.target.closest('.envelope') || e.target.closest('.photo-card') ||
        e.target.closest('.surprise-btn') || e.target.closest('button')) {
        return;
    }

    const heart = document.createElement('div');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        user-select: none;
    `;

    heart.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: `translate(-50%, -150px) scale(1.5)`, opacity: 1, offset: 0.5 },
        { transform: `translate(-50%, -250px) scale(0)`, opacity: 0 }
    ], {
        duration: 1200,
        easing: 'ease-out'
    });

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
});

// ============================================
// MOUSE TRAIL SPARKLES
// ============================================
let mouseTrailTimer;
document.addEventListener('mousemove', (e) => {
    clearTimeout(mouseTrailTimer);
    mouseTrailTimer = setTimeout(() => {
        if (Math.random() > 0.7) {
            const trail = document.createElement('div');
            trail.textContent = '✨';
            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: 1.2rem;
                pointer-events: none;
                z-index: 9998;
                user-select: none;
                transform: translate(-50%, -50%);
            `;
            trail.animate([
                { opacity: 1, transform: 'translate(-50%, -50%) scale(0.5) rotate(0deg)' },
                { opacity: 0, transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)' }
            ], { duration: 800, easing: 'ease-out' });
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 800);
        }
    }, 20);
});

// ============================================
// MUSIC (toggle button — click to play/pause)
// ============================================
const musicToggle = document.getElementById('musicToggle');
let audioCtx = null;
let musicPlaying = false;
let musicInterval = null;

// Happy-birthday-like melody
const melody = [
    { note: 392, duration: 0.35 },
    { note: 392, duration: 0.2 },
    { note: 440, duration: 0.55 },
    { note: 392, duration: 0.55 },
    { note: 523, duration: 0.55 },
    { note: 494, duration: 1.0 },
    { note: 392, duration: 0.35 },
    { note: 392, duration: 0.2 },
    { note: 440, duration: 0.55 },
    { note: 392, duration: 0.55 },
    { note: 587, duration: 0.55 },
    { note: 523, duration: 1.0 },
    { note: 392, duration: 0.35 },
    { note: 392, duration: 0.2 },
    { note: 784, duration: 0.55 },
    { note: 659, duration: 0.55 },
    { note: 523, duration: 0.55 },
    { note: 494, duration: 0.55 },
    { note: 440, duration: 1.0 },
];

function playTone(freq, duration, when = 0) {
    if (!audioCtx) return;
    const t0 = audioCtx.currentTime + when;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.12, t0 + 0.04);
    gain.gain.linearRampToValueAtTime(0, t0 + duration);
    osc.start(t0);
    osc.stop(t0 + duration);
}

function playMelody() {
    let time = 0;
    melody.forEach(({ note, duration }) => {
        playTone(note, duration, time);
        time += duration;
    });
    return time * 1000;
}

function startMusic() {
    if (musicPlaying) return;
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    musicPlaying = true;
    musicToggle.classList.add('playing');
    musicToggle.textContent = '🎶';
    const loopTime = playMelody();
    musicInterval = setInterval(playMelody, loopTime + 600);
}

function stopMusic() {
    if (!musicPlaying) return;
    musicPlaying = false;
    musicToggle.classList.remove('playing');
    musicToggle.textContent = '🎵';
    if (musicInterval) { clearInterval(musicInterval); musicInterval = null; }
    if (audioCtx) audioCtx.suspend();
}

musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (musicPlaying) stopMusic();
    else startMusic();
});

// ============================================
// SCROLL-TRIGGERED EFFECTS
// ============================================
const observerOptions = {
    threshold: 0.3
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger confetti when wish section appears
            if (entry.target.classList.contains('wish-section')) {
                confettiRain(50);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.wish-section').forEach(el => scrollObserver.observe(el));

// ============================================
// KONAMI-STYLE EASTER EGG: Type "ARINA"
// ============================================
let typedKeys = '';
document.addEventListener('keydown', (e) => {
    typedKeys += e.key.toUpperCase();
    if (typedKeys.length > 10) typedKeys = typedKeys.slice(-10);
    if (typedKeys.includes('ARINA')) {
        typedKeys = '';
        // MEGA CELEBRATION
        for (let i = 0; i < 10; i++) {
            setTimeout(() => confettiRain(100), i * 200);
        }
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        for (let i = 0; i < 5; i++) {
            setTimeout(() => heartExplosion(cx, cy), i * 300);
        }
    }
});

// ============================================
// PRINT WELCOME TO CONSOLE
// ============================================
console.log('%c💕 יום הולדת שמח ארינה! 💕', 'color: #ff1493; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cטיפ: הקלידי ARINA להפתעה מיוחדת ✨', 'color: #c71585; font-size: 14px;');
