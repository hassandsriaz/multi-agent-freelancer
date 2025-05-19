document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js for background effect
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#22d3ee"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#38bdf8",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.6
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Generate random stars
    function generateStars() {
        const stars = document.querySelector('.stars');
        if (stars) {
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                // Random position
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                // Random animation duration and delay
                star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
                star.style.setProperty('--delay', `${Math.random() * 5}s`);
                star.style.setProperty('--opacity', `${0.3 + Math.random() * 0.7}`);
                
                stars.appendChild(star);
            }
        }
    }
    
    generateStars();
    
    // Animate data packets flowing through neural connections
    function animateDataPackets() {
        const neuralNetwork = document.getElementById('neuralNetwork');
        if (!neuralNetwork) return;
        
        const connections = [
            { start: 'node-1', end: 'node-2', color: 'var(--accent-teal)' },
            { start: 'node-2', end: 'node-4', color: 'var(--accent-blue)' },
            { start: 'node-3', end: 'node-4', color: 'var(--accent-purple)' },
            { start: 'node-4', end: 'node-5', color: 'var(--accent-orange)' },
            { start: 'node-1', end: 'node-6', color: 'var(--accent-teal)' },
            { start: 'node-5', end: 'node-7', color: 'var(--accent-orange)' }
        ];
        
        function createPacket(startNode, endNode, color) {
            const startEl = document.querySelector(`.${startNode}`);
            const endEl = document.querySelector(`.${endNode}`);
            
            if (!startEl || !endEl) return;
            
            const startRect = startEl.getBoundingClientRect();
            const endRect = endEl.getBoundingClientRect();
            const networkRect = neuralNetwork.getBoundingClientRect();
            
            // Calculate relative positions
            const startX = startRect.left - networkRect.left + startRect.width/2;
            const startY = startRect.top - networkRect.top + startRect.height/2;
            const endX = endRect.left - networkRect.left + endRect.width/2;
            const endY = endRect.top - networkRect.top + endRect.height/2;
            
            const packet = document.createElement('div');
            packet.classList.add('connection-active');
            packet.style.setProperty('--startX', `${startX}px`);
            packet.style.setProperty('--startY', `${startY}px`);
            packet.style.setProperty('--endX', `${endX}px`);
            packet.style.setProperty('--endY', `${endY}px`);
            packet.style.backgroundColor = color;
            
            neuralNetwork.appendChild(packet);
            
            // Remove packet after animation completes
            setTimeout(() => {
                packet.remove();
            }, 3000);
        }
        
        // Periodically create packets
        connections.forEach((connection, index) => {
            setInterval(() => {
                createPacket(connection.start, connection.end, connection.color);
            }, 3000 + index * 1000);
        });
    }
    
    setTimeout(animateDataPackets, 1000);

    // Typewriter effect for hero title
    function typewriterEffect() {
        const element = document.querySelector('.typewriter h1');
        if (!element) return;
        
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const speed = 50; // typing speed in milliseconds
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        setTimeout(type, 500);
    }
    
    typewriterEffect();
    
    // Animate counting for stat values
    function animateCounter() {
        const counters = document.querySelectorAll('.stat-value');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // milliseconds
            const step = Math.ceil(target / (duration / 30)); // Update every 30ms
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, 30);
        });
    }
    
    // Start counter animation when element is in view
    const statsSection = document.querySelector('.stats-row');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Mobile navigation toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Enhanced Agents Carousel with 3D effect
    const agentsCarousel = document.getElementById('agentsCarousel');
    const prevButton = document.getElementById('prevAgent');
    const nextButton = document.getElementById('nextAgent');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    
    if (agentsCarousel && prevButton && nextButton) {
        const agentCards = agentsCarousel.querySelectorAll('.agent-card');
        let currentIndex = 0;
        
        function updateCarousel() {
            agentCards.forEach((card, index) => {
                card.classList.remove('active');
                card.style.transform = '';
                card.style.opacity = '';
                card.style.zIndex = '';
                
                // Reset indicators
                if (indicators[index]) {
                    indicators[index].classList.remove('active');
                }
                
                // Calculate position relative to current card
                const position = (index - currentIndex + agentCards.length) % agentCards.length;
                
                // Apply different transforms based on position
                if (position === 0) {
                    // Active card
                    card.classList.add('active');
                    card.style.transform = 'translateX(0) rotateY(0) scale(1)';
                    card.style.opacity = '1';
                    card.style.zIndex = '2';
                    if (indicators[index]) indicators[index].classList.add('active');
                } else if (position === 1 || position === agentCards.length - 1) {
                    // Adjacent cards
                    const direction = position === 1 ? 1 : -1;
                    card.style.transform = `translateX(${direction * 120}%) rotateY(${direction * 45}deg) scale(0.8)`;
                    card.style.opacity = '0.7';
                    card.style.zIndex = '1';
                } else {
                    // Further cards
                    const direction = position <= agentCards.length / 2 ? 1 : -1;
                    const distance = Math.min(position, agentCards.length - position);
                    card.style.transform = `translateX(${direction * (120 + 30 * distance)}%) rotateY(${direction * (45 + 15 * distance)}deg) scale(${Math.max(0.5, 0.8 - 0.1 * distance)})`;
                    card.style.opacity = `${Math.max(0.1, 0.7 - 0.2 * distance)}`;
                    card.style.zIndex = '0';
                }
            });
        }
        
        // Initialize carousel
        updateCarousel();
        
        // Prev button click
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + agentCards.length) % agentCards.length;
            updateCarousel();
        });
        
        // Next button click
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % agentCards.length;
            updateCarousel();
        });
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        agentsCarousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        agentsCarousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left
                nextButton.click();
            } else if (touchEndX > touchStartX + 50) {
                // Swipe right
                prevButton.click();
            }
        }
        
        // Auto carousel
        let autoCarouselInterval = setInterval(function() {
            if (!document.hidden) {
                currentIndex = (currentIndex + 1) % agentCards.length;
                updateCarousel();
            }
        }, 5000);
        
        // Pause auto-carousel on hover
        agentsCarousel.addEventListener('mouseenter', () => {
            clearInterval(autoCarouselInterval);
        });
        
        agentsCarousel.addEventListener('mouseleave', () => {
            autoCarouselInterval = setInterval(function() {
                if (!document.hidden) {
                    currentIndex = (currentIndex + 1) % agentCards.length;
                    updateCarousel();
                }
            }, 5000);
        });
    }
    
    // Rest of your existing JavaScript
    // Dashboard tabs interaction, neural network animation, etc.
    
    // Add parallax effect
    window.addEventListener('mousemove', (e) => {
        const parallaxElements = document.querySelectorAll('.parallax');
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 1;
            el.style.transform = `translate(${mouseX * 20 * speed}px, ${mouseY * 20 * speed}px)`;
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Add interactive glow effect to buttons
    const glowButtons = document.querySelectorAll('.glow-on-hover');
    
    glowButtons.forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
    
    // Expand feature cards on hover to show more details
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const detail = card.querySelector('.feature-detail');
            if (detail) detail.style.maxHeight = `${detail.scrollHeight}px`;
        });
        
        card.addEventListener('mouseleave', () => {
            const detail = card.querySelector('.feature-detail');
            if (detail) detail.style.maxHeight = '0';
        });
    });
}); 