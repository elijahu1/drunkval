document.addEventListener('DOMContentLoaded', () => {
    // Status selection
    document.querySelectorAll('.status-btn').forEach(button => {
        button.addEventListener('click', handleStatusSelection);
    });
});

function handleStatusSelection(event) {
    const status = event.currentTarget.dataset.status;
    const selector = document.querySelector('.status-selector');
    const mainContent = document.querySelector('.main-content');
    
    // Animate out selector
    gsap.to(selector, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            selector.remove();
            // Show main content
            mainContent.classList.add('active');
            // Show specific content section
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.querySelector(`.${status}-content`).classList.add('active');
            // Add event listeners for trauma buttons
            document.querySelectorAll('.cry-button').forEach(btn => {
                btn.addEventListener('click', activateTraumaBot);
            });
            // Animate content
            gsap.from(`.${status}-content`, {
                duration: 1,
                opacity: 0,
                y: 50,
                ease: "power4.out"
            });
            gsap.from('.grid-item', {
                duration: 0.8,
                y: 100,
                opacity: 0,
                stagger: 0.15,
                ease: "back.out(1.7)",
                delay: 0.3
            });
        }
    });
}

function activateTraumaBot() {
    const status = document.querySelector('.content-section.active').classList[1].replace('-content', '');
    const messages = {
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
    gsap.to(traumaBot, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    });
}