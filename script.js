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

// Add chatbot functionality
function uglyCry() {
    // Clear previous chat
    const existingChat = document.getElementById('depression-bot');
    if (existingChat) existingChat.remove();

    // Create chat container
    const chat = document.createElement('div');
    chat.id = 'depression-bot';
    chat.innerHTML = `
        <div class="chat-header">
            <span>🤖 DepressionBot 3000</span>
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="chat-messages"></div>
    `;
    document.body.appendChild(chat);

    // Start conversation
    addBotMessage("Hey lonely human, let's simulate those feelings you can't get irl:", 1000);
    addBotMessage("On a scale of 1 to 'fuck my life', how pathetic is your Valentine's Day?", 2000);
    
    // Add typing indicator
    let isTyping = false;
    setInterval(() => {
        if (!isTyping && Math.random() < 0.3) {
            simulateTyping();
        }
    }, 5000);
}

// Chat message templates
const botResponses = [
    {
        triggers: ['1', 'not bad'],
        message: "Bullshit. I can see your Instagram stories. Pathetic.",
        replies: [
            { text: "😭 You're right", next: 4 },
            { text: "🖕 Fuck you", next: 5 }
        ]
    },
    {
        triggers: ['fuck my life'],
        message: "Finally some honesty! Let's wallow in mutual despair:",
        replies: [
            { text: "Cry together", next: 6 },
            { text: "Delete dating apps", next: 7 }
        ]
    }
];

function addBotMessage(text, delay = 0) {
    setTimeout(() => {
        const messages = document.querySelector('.chat-messages');
        const msg = document.createElement('div');
        msg.className = 'bot-msg';
        msg.innerHTML = `
            <div class="bubble">${text}</div>
            <div class="typing"></div>
        `;
        messages.appendChild(msg);
        msg.scrollIntoView();
    }, delay);
}

function simulateTyping() {
    isTyping = true;
    const typing = document.createElement('div');
    typing.className = 'typing';
    document.querySelector('.chat-messages').appendChild(typing);
    
    setTimeout(() => {
        typing.remove();
        addBotMessage("Still there? Of course you are. Who else would talk to you?", 500);
        isTyping = false;
    }, 2000);
}