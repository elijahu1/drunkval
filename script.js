document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners properly
    document.querySelectorAll('.status-btn').forEach(button => {
        button.addEventListener('click', handleStatusSelection);
    });
});

function handleStatusSelection(e) {
    const status = e.currentTarget.dataset.status;
    const selector = document.querySelector('.status-selector');
    const mainContent = document.querySelector('.main-content');
    
    // Animate selector exit
    gsap.to(selector, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            selector.remove();
            showRelevantContent(status);
        }
    });
}

function showRelevantContent(status) {
    const mainContent = document.querySelector('.main-content');
    const contentSection = document.querySelector(`.${status}-content`);
    
    // Show main content
    mainContent.classList.remove('hidden');
    
    // Show specific content section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
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

// Rest of your existing trauma bot code...


let currentStatus = null;

function selectStatus(status) {
    currentStatus = status;
    const selector = document.querySelector('.status-selector');
    const mainContent = document.querySelector('.main-content');
    const imageGrid = document.querySelector('.image-grid');

    // Animate out selector
    gsap.to(selector, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => selector.remove()
    });

    // Reveal main content
    mainContent.classList.remove('hidden');
    gsap.to(mainContent, {
        opacity: 1,
        duration: 1,
        ease: "power4.out"
    });

    // Show relevant content section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.querySelector(`.${status}-content`).classList.remove('hidden');

    // Animate grid items
    gsap.from('.grid-item', {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3
    });

    // Background based on status
    document.body.style.background = status === 'single' 
        ? 'linear-gradient(45deg, #2a2a2a, #1a1a1a)' 
        : 'linear-gradient(45deg, #4a0000, #2a0000)';
}

function activateTraumaBot() {
    const bot = document.getElementById('trauma-bot');
    bot.classList.add('active');
    bot.innerHTML = `
        <div class="bot-header">
            <h3>🖤 Trauma Bot 3000</h3>
            <button onclick="this.parentElement.parentElement.classList.remove('active')">×</button>
        </div>
        <div class="bot-content">
            <p>${currentStatus === 'single' 
                ? "Let's analyze why you're alone:" 
                : "Diagnosing your situationship:"}</p>
            <ul class="trauma-list">
                ${generateTraumaList()}
            </ul>
        </div>
    `;

    // Animate list items
    gsap.from('.trauma-list li', {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    });
}

function generateTraumaList() {
    const singleTraumas = [
        "😭 Last match: 3 months ago",
        "💔 97% of your texts are to food delivery",
        "🍷 Wine > dates this month: 8-0",
        "📸 Most photos: Cat/Dog"
    ];

    const situationshipTraumas = [
        "🔥 Last 'I love you': ???",
        "💌 Unanswered texts: 14",
        "⏳ Days since intimacy: 27",
        "💔 Mutual delusion level: 98%"
    ];

    const traumas = currentStatus === 'single' ? singleTraumas : situationshipTraumas;
    
    return traumas.map(t => `<li>${t}</li>`).join('');
}

// Add chaotic hover effects
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        button.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2) / 4}deg)
            rotateY(${-(x - rect.width/2) / 4}deg)
        `;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});