// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded'); // Debug log
    
    // Image loading animations
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        // If image is already loaded from cache
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Scroll animations for sections
    const sections = document.querySelectorAll('.features, .units, .resources');
    
    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once the animation is done, we can stop observing this element
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add hover effects for unit cards
    const unitCards = document.querySelectorAll('.unit-card');
    unitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects for resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Chat widget functionality
    const chatMessages = document.getElementById('chatMessages');
    const promptButtons = document.querySelectorAll('.prompt-btn');
    const chatHeader = document.getElementById('chatHeader');
    const chatBody = document.getElementById('chatBody');
    const minimizeBtn = document.getElementById('minimizeBtn');

    const responses = {
        "What is the IA?": "The Design IA at AISVN is worth 40% of your final grade. Our Design & Technology department provides full support throughout your IA journey, including weekly consultations with teachers and access to our well-equipped design lab.",
        "How are exams structured?": "The IB Design & Technology exam consists of two papers. At AISVN, we prepare you thoroughly with regular mock exams and detailed feedback sessions. Our students historically perform well above the world average!",
        "What units are covered?": "At AISVN, we cover all 6 main IB Design units with a special focus on sustainable design and innovation. Our program includes hands-on projects and access to state-of-the-art design software and equipment.",
        "Tell me about AISVN Design": "AISVN's Design & Technology program is known for its innovative approach and excellent results. We have a fully equipped design lab, 3D printers, and dedicated teachers who are always ready to help. Our Phoenix spirit of creativity and perseverance shows in every project!"
    };

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handlePromptClick(e) {
        const question = e.target.getAttribute('data-question');
        addMessage(question, true);
        
        setTimeout(() => {
            addMessage(responses[question]);
        }, 500);
    }

    function toggleChat() {
        chatBody.classList.toggle('minimized');
        minimizeBtn.textContent = chatBody.classList.contains('minimized') ? '+' : '−';
    }

    // Add click handlers
    promptButtons.forEach(button => {
        button.addEventListener('click', handlePromptClick);
    });

    if (chatHeader) {
        chatHeader.addEventListener('click', (e) => {
            if (e.target !== minimizeBtn) {
                toggleChat();
            }
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', toggleChat);
    }

    // Initialize progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        setTimeout(() => {
            bar.style.width = `${percent}%`;
        }, 500);
    });
    // Back to Top Button - simplified version
    const backToTop = document.createElement('button');
    backToTop.textContent = '↑';
    backToTop.className = 'back-to-top show'; // Always visible for testing
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Add navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// IA Guide Functionality
function initIAGuide() {
    const floatNav = document.querySelector('.floating-nav');
    if (!floatNav) return; // Only run on IA guide page

    const floatNavToggle = document.querySelector('.float-nav-toggle');
    const floatNavMenu = document.querySelector('.float-nav-menu');

    // Floating Navigation Toggle
    floatNavToggle.addEventListener('click', () => {
        floatNavMenu.classList.toggle('show');
    });

    // Hide menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!floatNav.contains(e.target)) {
            floatNavMenu.classList.remove('show');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.float-nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
            floatNavMenu.classList.remove('show');
        });
    });

    // Collapsible sections
    document.querySelectorAll('.toggle-section').forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.ia-section');
            const content = section.querySelector('.section-content');
            const icon = button.querySelector('.toggle-icon');
            
            content.classList.toggle('collapsed');
            icon.textContent = content.classList.contains('collapsed') ? '▶' : '▼';
        });
    });

    // Progress tracking
    const sections = document.querySelectorAll('.ia-section');
    const progressBar = document.querySelector('.progress-bar');

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        let sectionsInView = 0;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                sectionsInView++;
            }
        });
        
        const progress = (sectionsInView / sections.length) * 100;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initIAGuide();
});