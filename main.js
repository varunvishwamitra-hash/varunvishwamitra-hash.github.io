document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));

    // High-Precision Stats Counter
    const stats = document.querySelectorAll('.stat-number');
    
    const animateStats = (stat) => {
        const target = +stat.getAttribute('data-target');
        let current = 0;
        const increment = target / 100;
        const speed = 15;

        const update = () => {
            if (current < target) {
                current += increment;
                stat.innerText = Math.ceil(current);
                setTimeout(update, speed);
            } else {
                stat.innerText = target;
            }
        };
        update();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Extraordinary Nav Logic
    const nav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.querySelector('div').classList.remove('py-3');
            nav.querySelector('div').classList.add('py-1', 'shadow-2xl');
            nav.classList.add('scrolled');
        } else {
            nav.querySelector('div').classList.add('py-3');
            nav.querySelector('div').classList.remove('py-1', 'shadow-2xl');
            nav.classList.remove('scrolled');
        }
    });

    const toggleMenu = () => {
        mobileMenu.classList.toggle('opacity-0');
        mobileMenu.classList.toggle('pointer-events-none');
    };

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (menuClose) menuClose.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // Kinetic System Card Interactions
    const systemCards = document.querySelectorAll('#systems .glass');
    systemCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02) translateY(-5px)';
            card.style.boxShadow = '0 25px 50px -12px rgba(99, 102, 241, 0.25)';
            card.style.borderColor = 'rgba(99, 102, 241, 0.4)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) translateY(0)';
            card.style.boxShadow = 'none';
            card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        });
    });


    // Ambient Cursor Glow
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none;
        z-index: 40;
        background: radial-gradient(circle 800px at 50% 50%, rgba(99, 102, 241, 0.08), transparent 40%);
        transition: opacity 0.5s ease;
        opacity: 0;
    `;
    document.body.appendChild(glow);

    window.addEventListener('mousemove', (e) => {
        glow.style.opacity = '1';
        glow.style.background = `radial-gradient(circle 800px at ${e.clientX}px ${e.clientY}px, rgba(99, 102, 241, 0.08), transparent 40%)`;
        
        // Subtle Parallax on Hero
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        const heroAvatar = document.querySelector('.lg\\:col-span-2');
        if (heroAvatar) {
            heroAvatar.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    window.addEventListener('mouseout', () => {
        glow.style.opacity = '0';
    });
});
