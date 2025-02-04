document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.status-btn').forEach(button => {
        button.addEventListener('click', handleStatusSelection);
    });
});

function handleStatusSelection(event) {
    const status = event.currentTarget.dataset.status;
    const selector = document.querySelector('.status-selector');
    const mainContent = document.querySelector('.main-content');
    const contentSection = document.querySelector(`.${status}-content`);

    // Show main content immediately
    mainContent.classList.remove('hidden');
    
    // Animate out selector
    gsap.to(selector, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            selector.remove();
            
            // Show selected content section
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.add('hidden');
            });
            contentSection.classList.remove('hidden');
            
            // Animate content entrance
            gsap.to(mainContent, {
                opacity: 1,
                duration: 1,
                ease: "power4.out"
            });
            
            gsap.from(contentSection, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            });

            gsap.from('.grid-item', {
                y: 100,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                delay: 0.3
            });

            // Add trauma button listener
            document.querySelector('.cry-button').addEventListener('click', activateTraumaBot);
        }
    });
}

function activateTraumaBot() {
    const activeSection = document.querySelector('.content-section:not(.hidden)');
    const status = activeSection.classList.contains('single-content') ? 'single' : 'situationship';
    
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