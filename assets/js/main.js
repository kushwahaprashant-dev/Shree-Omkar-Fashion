document.addEventListener('DOMContentLoaded', function () {
            // ── LOADER ──
            window.addEventListener('load', () => {
                const loader = document.getElementById('loader');
                
                if (loader) {
                    setTimeout(() => {
                        loader.style.transition = 'opacity 0.8s';
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.style.display = 'none';
                            const navbar = document.getElementById('navbar');
                            if (navbar) navbar.classList.add('visible');
                        }, 800);
                    }, 2800);
                } else {
                    const navbar = document.getElementById('navbar');
                    if (navbar) navbar.classList.add('visible');
                }
            });

            // ── MOBILE MENU ──
            document.addEventListener('headerLoaded', () => {
                const menuBtn = document.getElementById('mobileMenuBtn');
                const navLinks = document.getElementById('navLinks');
                const navOverlay = document.getElementById('navOverlay');
                const navbar = document.getElementById('navbar');
                
                // If no loader or loader already finished, make navbar visible now
                const loader = document.getElementById('loader');
                if (navbar) {
                    if (!loader || loader.style.display === 'none') {
                        navbar.classList.add('visible');
                    }
                }

                function toggleMenu() {
                    if (!navLinks) return;
                    navLinks.classList.toggle('active');
                    if(navOverlay) navOverlay.classList.toggle('active');
                    
                    if (navLinks.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }

                if(menuBtn) {
                    menuBtn.addEventListener('click', toggleMenu);
                }
                if(navOverlay) {
                    navOverlay.addEventListener('click', toggleMenu);
                }

                if(navLinks) {
                    navLinks.querySelectorAll('a').forEach(link => {
                        link.addEventListener('click', () => {
                            if (navLinks.classList.contains('active')) {
                                toggleMenu();
                            }
                        });
                    });
                }
            });

            // ── CUSTOM CURSOR (Desktop Only) ──
            if (window.innerWidth >= 1024) {
                const cursor = document.getElementById('cursor');
                const ring = document.getElementById('cursorRing');

                document.addEventListener('mousemove', e => {
                    requestAnimationFrame(() => {
                        if (cursor && ring) {
                            cursor.style.left = e.clientX + 'px';
                            cursor.style.top = e.clientY + 'px';
                            setTimeout(() => {
                                ring.style.left = e.clientX + 'px';
                                ring.style.top = e.clientY + 'px';
                            }, 60);
                        }
                    });
                }, { passive: true });

                document.querySelectorAll('a, button, .cat-card').forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                        if (ring) ring.style.transform = 'translate(-50%, -50%) scale(1.3)';
                    });
                    el.addEventListener('mouseleave', () => {
                        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                        if (ring) ring.style.transform = 'translate(-50%, -50%) scale(1)';
                    });
                });
            }

            // ── BACK TO TOP ──
            const backToTop = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                requestAnimationFrame(() => {
                    const nav = document.getElementById('navbar');
                    nav.classList.toggle('scrolled', window.scrollY > 50);

                    if (backToTop) {
                        backToTop.classList.toggle('visible', window.scrollY > 300);
                    }
                });
            });

            // ── SCROLL REVEAL ──
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => entry.target.classList.add('visible'), index * 50);
                    }
                });
            }, { threshold: 0.15 });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

            // ── COUNT UP ANIMATION ──
            const countTargets = [
                { el: document.getElementById('count1'), target: 5000, suffix: '+', current: 0 },
                { el: document.getElementById('count2'), target: 500, suffix: '+', current: 0 },
                { el: document.getElementById('count3'), target: 15, suffix: '+', current: 0 }
            ];

            let counted = false;
            const aboutSection = document.getElementById('about');

            const countObserver = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && !counted) {
                    counted = true;

                    const animateCount = () => {
                        let allComplete = true;
                        countTargets.forEach(item => {
                            if (item.current < item.target) {
                                allComplete = false;
                                const step = Math.ceil(item.target / 50);
                                item.current = Math.min(item.current + step, item.target);
                                if (item.el) item.el.textContent = item.current.toLocaleString() + item.suffix;
                            }
                        });

                        if (!allComplete) {
                            requestAnimationFrame(animateCount);
                        }
                    };

                    requestAnimationFrame(animateCount);
                }
            }, { threshold: 0.3 });

            if (aboutSection) countObserver.observe(aboutSection);



            // ────────────────────────────────────────────────────────────────
            // ✨ NEW: WHATSAPP QUICK MESSAGE BUTTON
            // ────────────────────────────────────────────────────────────────
            const whatsappBtn = document.getElementById('whatsappBtn');
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', function () {
                    // Get values from the email form fields
                    const name = document.querySelector('input[name="name"]')?.value.trim() || '';
                    const phone = document.querySelector('input[name="phone"]')?.value.trim() || '';
                    const looking = document.querySelector('input[name="looking_for"]')?.value.trim() || '';
                    const message = document.querySelector('textarea[name="message"]')?.value.trim() || '';

                    if (!name || !phone) {
                        alert('Please enter your name and phone number.');
                        return;
                    }

                    const text = `New enquiry from ${name} (${phone}):%0A%0ALooking for: ${looking}%0AMessage: ${message}`;
                    const waNumber = '918359970016'; // Your WhatsApp number (country code + number, no '+')
                    const url = `https://wa.me/${waNumber}?text=${text}`;
                    window.open(url, '_blank');
                });
            }



            // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href !== '') {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                });
            });
        });