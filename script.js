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

// Detailings Viewer Logic
const drawingsData = {
    assembly: [
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1001C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1002C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1003C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1004C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1005C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1006C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1007C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1008C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1009C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1010C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1011C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1012C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1013C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1014C.pdf" },
        { path: "./MODEL/MODEL/ASSEMBLY DRAWING/1015C.pdf" },
        { type: "contact" }
    ],
    wsheets: [
        { path: "./MODEL/MODEL/E-SHEETS/E1.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E2.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E3.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E4.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E5.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E6.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E7.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E8.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E9.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E10.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E11.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/E12.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/AB-01.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/AB-02.pdf" },
        { path: "./MODEL/MODEL/E-SHEETS/EP-01.pdf" },
        { type: "contact" }
    ]
};

let currentCategory = 'assembly';
let currentIdx = 0;

const drawingViewer = document.getElementById('drawingViewer');
const currentIdxDisplay = document.getElementById('currentIdx');
const totalIdxDisplay = document.getElementById('totalIdx');
const prevBtn = document.getElementById('prevDrawing');
const nextBtn = document.getElementById('nextDrawing');
const tabBtns = document.querySelectorAll('.tab-btn');

const updateViewer = () => {
    const data = drawingsData[currentCategory][currentIdx];
    
    // Animate out
    drawingViewer.style.opacity = '0';
    
    setTimeout(() => {
        if (data.type === 'contact') {
            drawingViewer.innerHTML = `
                <div class="contact-slide fade-in">
                    <i data-lucide="message-square"></i>
                    <h3>Want to see more?</h3>
                    <p>We have a comprehensive library of samples available upon request.</p>
                    <a href="#contact" class="btn btn-primary">Contact Our Team</a>
                </div>
            `;
        } else {
            // Added view=Fit to help landscape drawings fill the viewer
            drawingViewer.innerHTML = `<embed src="${data.path}#toolbar=0&navpanes=0&scrollbar=0&view=Fit" type="application/pdf" width="100%" height="100%" class="fade-in">`;
        }
        
        currentIdxDisplay.innerText = currentIdx + 1;
        totalIdxDisplay.innerText = drawingsData[currentCategory].length;
        
        // Animate in
        drawingViewer.style.opacity = '1';
        lucide.createIcons();
    }, 300);
};

if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-target');
            currentIdx = 0;
            updateViewer();
        });
    });

    prevBtn.addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + drawingsData[currentCategory].length) % drawingsData[currentCategory].length;
        updateViewer();
    });

    nextBtn.addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % drawingsData[currentCategory].length;
        updateViewer();
    });

    // Initialize first view
    updateViewer();
}
