/**
 * Stackly Main Javascript
 * Consolidated project scripts into a single codebase.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('loaded');
        });
    }

    // 2. Init AOS Animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // 3. Sticky Header
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky-top');
            } else {
                navbar.classList.remove('sticky-top');
            }
        });
    }

    // 4. Init Swiper for Hero
    if (document.querySelector('.hero-slider') && typeof Swiper !== 'undefined') {
        new Swiper('.hero-slider', {
            loop: true,
            effect: 'fade',
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // 5. Init Swiper for Testimonials
    if (document.querySelector('.testimonial-slider') && typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });
    }

    // 6. Init Swiper for Menu Gallery
    if (document.querySelector('.menu-gallery-slider') && typeof Swiper !== 'undefined') {
        new Swiper('.menu-gallery-slider', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // 6b. Init Swiper for Dish Slider (Home 2)
    if (document.querySelector('.dish-slider') && typeof Swiper !== 'undefined') {
        new Swiper('.dish-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: '.dish-next',
                prevEl: '.dish-prev',
            },
            breakpoints: {
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
            }
        });
    }

    // 7. Dark / Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-bs-theme', 'light');
                themeToggleBtn.innerHTML = '<i class="ph ph-moon"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-bs-theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="ph ph-sun"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });

        // Check local storage 
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            document.documentElement.setAttribute('data-bs-theme', storedTheme);
            themeToggleBtn.innerHTML = storedTheme === 'dark' ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
        }
    }

    // 8. Scroll to Top
    const stt = document.getElementById('scroll-to-top');
    if (stt) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) stt.style.display = 'block';
            else stt.style.display = 'none';
        });
        stt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 9. Counter Animations (About page)
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length > 0) {
        const speed = 100; // The higher the slower
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const updateCount = () => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        const count = parseFloat(counter.innerText);
                        const inc = target / speed;
                        
                        if (count < target) {
                            let nextValue = count + inc;
                            if (counter.hasAttribute('data-decimals')) {
                                counter.innerText = nextValue.toFixed(1);
                            } else {
                                counter.innerText = Math.ceil(nextValue);
                            }
                            setTimeout(updateCount, 15);
                        } else {
                            if (counter.hasAttribute('data-decimals')) {
                                counter.innerText = target.toFixed(1);
                            } else {
                                counter.innerText = target;
                            }
                        }
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.1 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // 10. Front-end Menu Search Filter (Menu 2)
    const searchInput = document.getElementById("menuSearch");
    if (searchInput) {
        const cards = Array.from(document.querySelectorAll(".menu-item-card"));
        searchInput.addEventListener("input", () => {
            const q = (searchInput.value || "").trim().toLowerCase();
            cards.forEach(card => {
                const title = (card.getAttribute("data-title") || "").toLowerCase();
                card.style.display = title.includes(q) ? "" : "none";
            });
        });
    }

    // 11. Admin Sidebar Toggle
    const toggle = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('sidebar-close');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    function toggleSidebar() {
        if (sidebar) sidebar.classList.toggle('show');
        if (overlay) overlay.classList.toggle('show');
    }

    if (toggle) toggle.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);

    // 12. Admin Chart.js Initialization
    const canvas = document.getElementById('revenueChart');
    if (canvas && typeof Chart !== 'undefined') {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets: [{
                    data: [12, 19, 15, 22, 28, 35, 31],
                    borderColor: '#c5a059',
                    backgroundColor: 'rgba(197, 160, 89, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { display: false },
                    x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.3)' } }
                }
            }
        });
    }

    // 13. Contact Form Submission Validation & Redirect
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (contactForm.checkValidity()) {
                window.location.href = '404.html';
            }
        });
    }

    const contactForm2 = document.getElementById('contactForm2');
    if (contactForm2) {
        contactForm2.addEventListener('submit', (e) => {
            e.preventDefault();
            if (contactForm2.checkValidity()) {
                window.location.href = '404.html';
            }
        });
    }

    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (reservationForm.checkValidity()) {
                window.location.href = '404.html';
            }
        });
    }
});
