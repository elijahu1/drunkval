 // Create floating hearts background
        function createHearts() {
            const hearts = document.querySelector('.hearts');
            setInterval(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
                hearts.appendChild(heart);
                setTimeout(() => heart.remove(), 6000);
            }, 300);
        }

        // Chat responses
        const singleResponses = [
            "You're a whole awesome package! Who needs a plus one?",
            "Treat yourself to something nice today. You deserve it!",
            "Being single means more pizza for you!",
            "Your relationship status doesn't define your worth!",
            "Time to plan that solo adventure you've been dreaming of!",
        ];

        const relationshipResponses = [
            "Aww, you two are relationship goals!",
            "Have you planned something special for your partner?",
            "Communication is key - keep that love flowing!",
            "Time for a cute date night!",
            "Remember to appreciate the little things about each other.",
        ];

        function selectStatus(status) {
            document.getElementById('single-content').style.display = 'none';
            document.getElementById('relationship-content').style.display = 'none';
            document.getElementById(`${status}-content`).style.display = 'block';
        }

        function sendMessage(type) {
            const input = document.getElementById(`${type}-input`);
            const chatContainer = document.getElementById(`${type}-chat`);
            const message = input.value.trim();
            
            if (!message) return;

            // Add user message
            const userMsg = document.createElement('div');
            userMsg.classList.add('message', 'user-message');
            userMsg.textContent = message;
            chatContainer.appendChild(userMsg);

            // Add bot response
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.classList.add('message', 'bot-message');
                const responses = type === 'single' ? singleResponses : relationshipResponses;
                botMsg.textContent = responses[Math.floor(Math.random() * responses.length)];
                chatContainer.appendChild(botMsg);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 1000);

            input.value = '';
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        // Initialize
        createHearts();

        // Add enter key support for chat
        document.getElementById('single-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage('single');
        });
        document.getElementById('relationship-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage('relationship');
        });