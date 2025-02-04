document.addEventListener('DOMContentLoaded', () => {
    // Initialize status buttons
    document.querySelectorAll('.status-btn').forEach(button => {
        button.addEventListener('click', handleStatusSelection);
    });

    // Mobile viewport height fix
    const setVH = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
});

function handleStatusSelection(event) {
    const status = event.currentTarget.dataset.status;
    const selector = document.querySelector('.status-selector');
    const mainContent = document.querySelector('.main-content');
    const contentSections = document.querySelectorAll('.content-section');

    // Hide all content sections
    contentSections.forEach(section => section.classList.remove('active'));

    // Animate selector out
    gsap.to(selector, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            selector.remove();
            
            // Show main content
            mainContent.classList.add('active');
            
            // Show selected content
            const activeSection = document.querySelector(`.${status}-content`);
            activeSection.classList.add('active');

            // Animate content in
            gsap.from(activeSection, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            });

            // Animate grid items
            gsap.from('.grid-item', {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                delay: 0.3
            });

            // Add trauma button listener
            document.querySelector('.cry-button').addEventListener('click', activateTraumaBot);
        }
    });
}

function activateTraumaBot() {
    const status = document.querySelector('.content-section.active').classList.contains('single-content') ? 'single' : 'situationship';
    
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

    const traumaBot = document.getElementById('trauma-bot');
    traumaBot.innerHTML = `
        <div class="bot-header">
            <h3