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