// Navigation scroll effect
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate stats when hero is visible
            if (entry.target.classList.contains('hero-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

// Stagger animation for service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    const delay = card.getAttribute('data-delay') || 0;
    card.style.transitionDelay = `${delay}ms`;
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message (in a real app, this would send to a server)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span>Enviando...</span>';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = `
                <span>✓ Mensaje enviado</span>
            `;
            submitButton.style.background = 'linear-gradient(135deg, #00cc6e, #00995a)';
            
            setTimeout(() => {
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
                
                // Show alert
                alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            }, 2000);
        }, 1500);
    });
}

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Terminal typing effect
function typeText(element, text, speed = 50) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Initialize terminal typing when visible
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typingElements = entry.target.querySelectorAll('.typing');
            typingElements.forEach((element, index) => {
                setTimeout(() => {
                    const text = element.textContent;
                    element.textContent = '';
                    typeText(element, text);
                }, index * 1000);
            });
            terminalObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const terminal = document.querySelector('.terminal-body');
if (terminal) {
    terminalObserver.observe(terminal);
}

// Add dynamic cursor effect for terminal
const terminalWindow = document.querySelector('.terminal-window');
if (terminalWindow) {
    terminalWindow.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'text';
    });
    
    terminalWindow.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
}

// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Add hover sound effect for buttons (optional, commented out by default)
/*
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        // Add subtle haptic feedback if supported
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });
});
*/

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-intensive functions
window.addEventListener('scroll', debounce(() => {
    // Heavy scroll operations here
}));

// Add easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
        document.body.style.animation = '';
        alert('🎮 ¡Error 404 encontrado! Has desbloqueado el modo desarrollador 🚀');
    }, 2000);
}

// Add CSS for rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Console message for developers
console.log('%c¡Hola Developer! 👋', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%c¿Buscando bugs? Nosotros también, pero los arreglamos. 🐛', 'color: #a0a0bb; font-size: 14px;');
console.log('%cError 404 - Cuando la tecnología falla, nosotros la encontramos', 'color: #00ff88; font-size: 12px;');

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
