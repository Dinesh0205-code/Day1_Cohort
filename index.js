// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
        showAlert('Please fill in all required fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showAlert('Thank you for your message! We will get back to you soon.', 'success');
    this.reset();
});

// Alert function
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert-message alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="alert-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    `;
    
    // Add close button functionality
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
    `;
    
    closeBtn.addEventListener('click', () => alert.remove());
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.academic-card, .stat, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add animate-in class styles
const animateStyle = document.createElement('style');
animateStyle.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .academic-card:nth-child(1) { transition-delay: 0.1s; }
    .academic-card:nth-child(2) { transition-delay: 0.2s; }
    .academic-card:nth-child(3) { transition-delay: 0.3s; }
    .academic-card:nth-child(4) { transition-delay: 0.4s; }
    .academic-card:nth-child(5) { transition-delay: 0.5s; }
    .academic-card:nth-child(6) { transition-delay: 0.6s; }
    
    .stat:nth-child(1) { transition-delay: 0.1s; }
    .stat:nth-child(2) { transition-delay: 0.2s; }
    .stat:nth-child(3) { transition-delay: 0.3s; }
    .stat:nth-child(4) { transition-delay: 0.4s; }
    
    .contact-item:nth-child(1) { transition-delay: 0.1s; }
    .contact-item:nth-child(2) { transition-delay: 0.2s; }
    .contact-item:nth-child(3) { transition-delay: 0.3s; }
    .contact-item:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(animateStyle);

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    
    if (email) {
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    }
});

// Header reveal animation on page load
window.addEventListener('load', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-100%)';
    
    setTimeout(() => {
        navbar.style.transition = 'all 0.5s ease';
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }, 100);
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

