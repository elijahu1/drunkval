document.addEventListener('DOMContentLoaded', () => {
    // Add status button click handlers
    document.querySelectorAll('.status-btn').forEach(button => {
        button.addEventListener('click', handleStatusSelection);
    });

    // Add trauma button click handlers
    document.querySelectorAll('.cry-button').forEach(button => {
        button.addEventListener('click', activateTraumaBot);
    });
});

function handleStatusSelection(event) {
    const status = event.currentTarget.dataset.status;
    const selector = document.querySelector('.status-selector');
    
    // Animate selector exit
    gsap.to(selector, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            selector.remove();
            showContent(status);
        }
    });
}

function showContent(status) {
    const mainContent = document.querySelector('.main-content');
    const contentSection = document.querySelector(`.${status}-content`);
    
    // Show main content
    mainContent.classList.add('active');
    contentSection.classList.remove('hidden');

    // Animate content entrance
    gsap.from(contentSection, {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power4.out"
    });

    // Animate grid items
    gsap.from('.grid-item', {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.3
    });

    // Set background
    document.body.style.background = status === 'single' 
        ? 'linear-gradient(45deg, #2a2a2a, #1a1a1a)'
        : 'linear-gradient(45deg, #4a0000, #2a0000)';
}

function activateTraumaBot() {
    const traumaMessages = {
        single: [
            "😭 Last date: Sometime during the Obama administration",
            "💔 97% of your texts are to Uber Eats",
            "🍷 Wine > dates this month: 8-0",
            "📸 Most photos: Cat/Dog/Memes"
        ],
        situationship: [
            "🔥 Last 'I love you': ???",
            "💌 Unanswered texts: 14 and counting",
            "⏳ Days since intimacy: Could be 27, could be 37...",
            "💔 Mutual delusion level: 98%"
        ]
    };

    const status = document.querySelector('.content-section:not(.hidden)').classList[1].replace('-content', '');
    const messages = traumaMessages[status];
    
    // Create trauma bot element
    const traumaBot = document.createElement('div');
    traumaBot.className = 'trauma-bot';
    traumaBot.innerHTML = `
        <div class="bot-header">
            <h3>💔 Trauma Bot 3000</h3>
            <button class="close-btn">×</button>
        </div>
        <div class="bot-content">
            <ul>
                ${messages.map(msg => `<li>${msg}</li>`).join('')}
            </ul>
        </div>
    `;

    // Add close functionality
    traumaBot.querySelector('.close-btn').addEventListener('click', () => {
        traumaBot.remove();
    });

    // Add to page and animate
    document.body.appendChild(traumaBot);
    gsap.from(traumaBot, {
        duration: 0.5,
        y: 100,
        opacity: 0,
        ease: "power2.out"
    });
}