// Out of Oven - Main JavaScript File
// Sophisticated animations and interactions for premium bakery website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initCarousel();
    initTypewriter();
    initChatWidget();
    initContactForm();
    initScrollEffects();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Sticky navigation on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('nav-sticky');
        } else {
            navbar.classList.remove('nav-sticky');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
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
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
        });
    });
}

// GSAP Animations
function initAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Splitting.js for text animations
    Splitting();
    
    // Hero text animation - word by word reveal
    const heroTitle = document.querySelector('[data-splitting]');
    if (heroTitle) {
        const chars = heroTitle.querySelectorAll('.char');
        
        gsap.fromTo(chars, 
            {
                opacity: 0,
                y: 50,
                filter: 'blur(10px)'
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.8,
                stagger: 0.05,
                ease: 'power2.out',
                delay: 0.5
            }
        );
    }
    
    // Reveal animations on scroll
    gsap.utils.toArray('.reveal-up').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 30,
                filter: 'blur(5px)'
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 95%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Process step animations
    gsap.utils.toArray('.process-step').forEach((step, index) => {
        gsap.fromTo(step,
            {
                opacity: 0,
                scale: 0.8,
                rotation: -10
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: step,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                delay: index * 0.2
            }
        );
    });
    
    // Liquid reveal animations for images
    gsap.utils.toArray('.liquid-reveal').forEach(element => {
        const image = element.querySelector('img');
        
        gsap.fromTo(element,
            {
                clipPath: 'circle(0% at 50% 50%)'
            },
            {
                clipPath: 'circle(100% at 50% 50%)',
                duration: 1.2,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 95%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Add hover effect
        element.addEventListener('mouseenter', function() {
            gsap.to(image, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        element.addEventListener('mouseleave', function() {
            gsap.to(image, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Product carousel initialization
function initCarousel() {
    const carousel = document.getElementById('product-carousel');
    if (carousel) {
        new Splide('#product-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                },
                768: {
                    perPage: 1,
                }
            }
        }).mount();
    }
}

// Typewriter effect for hero subtitle
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'Discover Bhopal\'s home for genuinely artisanal cakes and confections.',
                'Where every bite tells a story of passion and craftsmanship.',
                'Creating sweet memories one masterpiece at a time.'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Chat widget functionality
function initChatWidget() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatPanel = document.getElementById('chat-panel');
    
    if (chatToggle && chatPanel) {
        chatToggle.addEventListener('click', function() {
            chatPanel.classList.toggle('hidden');
            
            // Animate chat button
            gsap.to(chatToggle, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
        
        // Chat option clicks
        const chatOptions = chatPanel.querySelectorAll('button');
        chatOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Simulate chat response
                const originalText = this.textContent;
                this.textContent = 'Connecting you with our team...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = 'Thanks! We\'ll get back to you soon.';
                }, 2000);
                
                setTimeout(() => {
                    chatPanel.classList.add('hidden');
                    this.textContent = originalText;
                    this.disabled = false;
                }, 4000);
            });
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Animate submit button
            gsap.to(submitBtn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // Simulate form submission
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = 'linear-gradient(45deg, #22c55e, #16a34e)';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = 'Send Inquiry';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }
}

// Additional scroll effects
function initScrollEffects() {
    // Parallax effect for hero background
    gsap.to('.hero-bg', {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Floating animation for process icons
    gsap.utils.toArray('.process-step svg').forEach((icon, index) => {
        gsap.to(icon, {
            y: -10,
            duration: 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
            delay: index * 0.3
        });
    });
    
    // Card hover animations
    gsap.utils.toArray('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -8,
                rotationX: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                rotationX: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Button click animations
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary')) {
        gsap.to(e.target, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    }
});

// Add loading animation
window.addEventListener('load', function() {
    // Hide any loading screen if present
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => loader.remove()
        });
    }
    
    // Animate page entrance
    gsap.from('body', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
});

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('Animation element not found:', e.message);
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Scroll handling code here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);