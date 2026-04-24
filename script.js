// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon based on state
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const scrollReveal = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);
// Run once on load
scrollReveal();

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '1rem 0';
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        navbar.style.padding = '1.5rem 0';
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
    }
});

// Modal Elements
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');

const showModal = () => {
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
};

const hideModal = () => {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
};

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideModal);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        hideModal();
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        // Simulate form processing
        setTimeout(() => {
            showModal(); // Show custom popup
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
}
