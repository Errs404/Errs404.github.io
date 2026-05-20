/* =========================================
   Squeezy Portfolio - Interactive Behavior
   ========================================= */
(function () {
    'use strict';

    // ---------- Theme Toggle ----------
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const STORAGE_KEY = 'squeezy-theme';

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    }

    function initTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(saved || (prefersLight ? 'light' : 'dark'));
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(STORAGE_KEY, next);
        });
    }
    initTheme();

    // ---------- Mobile Nav Toggle ----------
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function () {
            const isOpen = navbar.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        // Close nav when a link is clicked (mobile)
        navbar.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // ---------- Typing Effect ----------
    const typedEl = document.querySelector('.typed-word');
    if (typedEl) {
        const words = ['Web Developer', 'Streamer', 'Content Creator', 'Gamer', 'Programmer'];
        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function type() {
            const word = words[wordIndex];
            if (deleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typedEl.textContent = word.slice(0, charIndex);

            let delay = deleting ? 50 : 110;

            if (!deleting && charIndex === word.length) {
                delay = 1600;
                deleting = true;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 300;
            }

            setTimeout(type, delay);
        }

        type();
    }

    // ---------- Scroll Spy + Active Nav Link ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar a');

    function setActiveLink() {
        const scrollY = window.scrollY + 120;
        let currentId = '';

        sections.forEach(function (section) {
            if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                currentId = section.id;
            }
        });

        navLinks.forEach(function (link) {
            const target = link.getAttribute('href').replace('#', '');
            link.classList.toggle('active', target === currentId);
        });
    }

    // ---------- Back to top visibility ----------
    const backToTop = document.querySelector('.back-to-top');

    function updateBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Throttle scroll handler with requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                setActiveLink();
                updateBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    });

    setActiveLink();
    updateBackToTop();

    // ---------- Reveal on Scroll (IntersectionObserver) ----------
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(function (el) { observer.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    // ---------- Contact Form (mailto fallback) ----------
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = new FormData(form);
            const name = (data.get('name') || '').toString().trim();
            const email = (data.get('email') || '').toString().trim();
            const subject = (data.get('subject') || '').toString().trim();
            const message = (data.get('message') || '').toString().trim();

            if (!name || !email || !subject || !message) {
                showStatus('Mohon lengkapi semua field.', 'error');
                return;
            }

            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRe.test(email)) {
                showStatus('Format email tidak valid.', 'error');
                return;
            }

            const recipient = 'hello@example.com';
            const body = 'Nama: ' + name + '\nEmail: ' + email + '\n\n' + message;
            const mailto = 'mailto:' + recipient
                + '?subject=' + encodeURIComponent(subject)
                + '&body=' + encodeURIComponent(body);

            window.location.href = mailto;
            showStatus('Membuka aplikasi email kamu...', 'success');
            form.reset();
        });
    }

    function showStatus(text, kind) {
        if (!status) return;
        status.textContent = text;
        status.className = 'form-status ' + (kind || '');
        if (kind === 'success') {
            setTimeout(function () {
                status.textContent = '';
                status.className = 'form-status';
            }, 4000);
        }
    }

    // ---------- Footer year ----------
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
