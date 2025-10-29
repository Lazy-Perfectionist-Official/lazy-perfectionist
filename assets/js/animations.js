// GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Hero parallax effect (only if hero exists)
    const hero = document.querySelector('.hero');
    if (hero) {
        gsap.to('.hero', {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Fade in hero content with stagger (only if hero elements exist)
    const heroH1 = document.querySelector('.hero h1');
    const heroNav = document.querySelector('.hero nav');
    
    if (heroH1 && heroNav) {
        const heroTimeline = gsap.timeline();
        heroTimeline
            .from('.hero h1', {
                duration: 1.5,
                y: -50,
                opacity: 0,
                ease: 'power3.out'
            })
            .from('.hero nav', {
                duration: 1.5,
                y: -30,
                opacity: 0,
                ease: 'power3.out'
            }, '-=0.8');
    }

    // Animate content sections on scroll
    gsap.utils.toArray('main > div, article, h2, h3').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Social link hover effects
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Smooth scroll for navigation (only for same-page anchor links)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle smooth scroll for same-page anchor links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 50
                        },
                        ease: 'power2.inOut'
                    });
                }
            }
            // Let normal navigation work for page links (starting with /)
        });
    });

    // YouTube player animation (only if element exists)
    const ytPlayer = document.querySelector('#yt-player');
    if (ytPlayer) {
        gsap.from('#yt-player', {
            scrollTrigger: {
                trigger: '#yt-player',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    }

    // Floating animation for hero background (using pseudo-element alternative)
    if (hero) {
        // Create a floating background element if needed
        if (!hero.querySelector('.hero-bg')) {
            const heroBg = document.createElement('div');
            heroBg.className = 'hero-bg';
            heroBg.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1));
                z-index: -1;
            `;
            hero.insertBefore(heroBg, hero.firstChild);
        }
        
        gsap.to('.hero-bg', {
            backgroundPosition: '200% 200%',
            duration: 20,
            ease: 'none',
            repeat: -1,
            yoyo: true
        });
    }

    // Mouse parallax effect for hero (only if hero h1 exists)
    if (heroH1) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;

            gsap.to('.hero h1', {
                x: moveX * 20,
                y: moveY * 20,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }

    // Table row hover effects
    document.querySelectorAll('tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            gsap.to(this, {
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        row.addEventListener('mouseleave', function() {
            gsap.to(this, {
                backgroundColor: 'transparent',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});