document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    document.querySelector('.love-letter').addEventListener('click', revealLetter);
});

function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heartsContainer.appendChild(heart);
    }
}

function revealLetter() {
    const letter = document.getElementById('letter');
    letter.classList.toggle('hidden');
}

function explodeHearts() {
    for (let i = 0; i < 100; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💥';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = Math.random() * window.innerHeight + 'px';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.animation = `explode ${Math.random() * 0.5 + 0.5}s ease-out`;
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

// Add drunk effect to text
document.querySelectorAll('h1, p').forEach(element => {
    element.addEventListener('mousemove', () => {
        element.style.transform = `rotate(${Math.random() * 4 - 2}deg)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.act');
    const audio = document.getElementById('audio');
    
    // Animate sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                document.body.style.background = entry.target.dataset.bg;
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    // Horizontal fight animation
    gsap.to('.text-bubble', {
        x: () => Math.random() * 100 - 50,
        y: () => Math.random() * 50 - 25,
        duration: 2,
        repeat: -1,
        yoyo: true
    });

    // Ring animation
    gsap.from('.ring', {
        scale: 0,
        rotation: 720,
        duration: 3,
        ease: "elastic.out(1, 0.5)"
    });
});

function uglyCry() {
    const tears = document.createElement('div');
    tears.innerHTML = '😭'.repeat(50);
    tears.style.position = 'fixed';
    tears.style.fontSize = '2rem';
    tears.style.animation = 'cry-fall 2s linear';
    document.body.appendChild(tears);

    // Randomize tear positions
    Array.from(tears.children).forEach(tear => {
        tear.style.left = Math.random() * 100 + 'vw';
        gsap.to(tear, {
            y: window.innerHeight,
            rotation: Math.random() * 360,
            duration: 2,
            onComplete: () => tear.remove()
        });
    });

    // Make everything blurry
    gsap.to('body', {
        backdropFilter: 'blur(10px)',
        duration: 1,
        repeat: 1,
        yoyo: true
    });
}