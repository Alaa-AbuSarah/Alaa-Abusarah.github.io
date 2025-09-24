// Show Achievement Notification
function showAchievement() {
    const achievement = document.getElementById('achievementNotification');
    achievement.classList.add('show');
    setTimeout(function () {
        achievement.classList.remove('show');
    }, 5000);
}

// Initialize achievement notification on page load
document.addEventListener('DOMContentLoaded', function () {
    showAchievement();
});

// Custom Cursor (only for desktop)
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(function () {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    document.addEventListener('mousedown', function () {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    document.addEventListener('mouseup', function () {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    // Links hover effect
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.border = '2px solid var(--highlight)';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.background = 'rgba(247, 129, 102, 0.2)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.border = '2px solid var(--accent)';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.background = 'rgba(88, 166, 255, 0.2)';
        });
    });
}

// Mobile Navigation with Animation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        // If closing menu, reset animation
        if (!navLinks.classList.contains('active')) {
            const navItems = navLinks.querySelectorAll('li');
            navItems.forEach(item => {
                item.style.transform = 'translateX(-50px)';
                item.style.opacity = '0';
            });
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        // Reset animation for next open
        const navItems = document.querySelectorAll('.nav-links li');
        navItems.forEach(item => {
            item.style.transform = 'translateX(-50px)';
            // item.style.opacity = '0';
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const animateElements = document.querySelectorAll('.animate');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Enhanced Project Card Animations
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    // Add staggered animation when cards come into view
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 * Array.from(projectCards).indexOf(card));
                cardObserver.unobserve(card);
            }
        });
    }, { threshold: 0.1 });
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    cardObserver.observe(card);
    // Level up animation on hover
    card.addEventListener('mouseenter', () => {
        card.classList.add('level-up');
        setTimeout(() => {
            card.classList.remove('level-up');
        }, 500);
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile touch enhancements
if ('ontouchstart' in window) {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.cta-button, .contact-button, .project-link');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 20px rgba(247, 129, 102, 0.6)';
        });
        button.addEventListener('touchend', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}