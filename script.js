document.addEventListener('DOMContentLoaded', () => {
    // Status button handlers
    document.querySelectorAll('.status-btn').forEach(button => {
        button.addEventListener('click', handleStatusSelection);
    });

    // Mobile viewport fix
    const setVH = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
});

function handleStatusSelection(event) {
    const status = event.currentTarget.dataset.status;
    const selector = document.querySelector('.status-selector');
    const mainContent = document.querySelector('.main-content');

    // Show main content immediately
    mainContent.classList.remove('hidden');
    
    // Animate out selector
    gsap.to(selector, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            selector.remove();
            
            // Show selected content
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.add('hidden');
            });
            const activeSection = document.querySelector(`.${status}-content`);
            activeSection.classList.remove('hidden');

            // Animate content
            gsap.from(activeSection, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            });

            // Add trauma button listener
            const cryButton = activeSection.querySelector('.cry-button');
            cryButton.addEventListener('click', activateTraumaBot);
        }
    });
}

function activateTraumaBot() {
    const status = document.querySelector('.content-section:not(.hidden)').classList.contains('single-content') ? 'single' : 'situationship';
    
    // Trauma messages
    const messages = {
        single: [
            "😭 Last date: Before TikTok existed",
            "💌 Most recent text: 'Your Uber Eats is here'",
            "🍷 Nights out vs. nights in: 0-31",
            "📸 Gallery: 87% memes, 13% cat"
        ],
        situationship: [
            "🔥 Last 'I love you': Never existed",
            "💬 Unanswered texts: Stacking up",
            "⌛ Days since clarity: ∞",
            "💔 Mutual confusion level: 110%"
        ]
    };

    // Create trauma bot
    const traumaBot = document.createElement('div');
    traumaBot.id = 'trauma-bot';
    traumaBot.innerHTML = `
        <div class="bot-header">
            <h3>💔 Trauma Bot 3000</h3>
            <button class="close-btn">×</button>
        </div>
        <div class="bot-content">
            <ul>
                ${messages[status].map(msg => `<li>${msg}</li>`).join('')}
            </ul>
        </div>
    `;

    // Add close functionality
    traumaBot.querySelector('.close-btn').addEventListener('click', () => {
        gsap.to(traumaBot, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => traumaBot.remove()
        });
    });

    document.body.appendChild(traumaBot);
    gsap.from(traumaBot, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        ease: "power2.out"
    });
}