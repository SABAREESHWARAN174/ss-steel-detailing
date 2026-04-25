// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Core Elements
    const revealElements = document.querySelectorAll('.reveal');
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

    // Detailings Viewer
    const drawingViewer = document.getElementById('drawingViewer');
    const currentIdxDisplay = document.getElementById('currentIdx');
    const totalIdxDisplay = document.getElementById('totalIdx');
    const prevBtn = document.getElementById('prevDrawing');
    const nextBtn = document.getElementById('nextDrawing');
    const tabBtns = document.querySelectorAll('.tab-btn');

    const updateViewer = () => {
        if (!drawingViewer) return;
        const data = drawingsData[currentCategory][currentIdx];

        drawingViewer.style.opacity = '0';
        setTimeout(() => {
            if (data.type === 'contact') {
                drawingViewer.innerHTML = `
                    <div class="contact-slide fade-in">
                        <i data-lucide="message-square"></i>
                        <h3>Want to see more?</h3>
                        <p>Contact our team to view our full library of drawings.</p>
                        <a href="#contact" class="btn btn-primary">Contact Us</a>
                    </div>
                `;
            } else {
                // Force 100% zoom to ensure scrollbars appear exactly the same for all drawings
                drawingViewer.innerHTML = `<iframe src="${data.path}#toolbar=0&navpanes=0&zoom=100" width="100%" height="100%" style="border: none; background: white;" scrolling="yes" class="fade-in"></iframe>`;
            }
            if (currentIdxDisplay) currentIdxDisplay.innerText = currentIdx + 1;
            if (totalIdxDisplay) totalIdxDisplay.innerText = drawingsData[currentCategory].length;
            drawingViewer.style.opacity = '1';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 150);
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

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const len = drawingsData[currentCategory].length;
                currentIdx = (currentIdx - 1 + len) % len;
                updateViewer();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const len = drawingsData[currentCategory].length;
                currentIdx = (currentIdx + 1) % len;
                updateViewer();
            });
        }
        updateViewer();
    }

    // Other UI Logic
    const scrollReveal = () => {
        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', scrollReveal);
    scrollReveal();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.innerText = 'Sending...';
            setTimeout(() => {
                document.getElementById('successModal').classList.add('active');
                contactForm.reset();
                btn.innerText = 'Get a Quote';
            }, 1000);
        });
    }

    // Right-click protection for drawings
    if (drawingViewer) {
        drawingViewer.addEventListener('contextmenu', (e) => e.preventDefault());
    }
});
