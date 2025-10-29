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

    // Hero parallax effect
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

    // Fade in hero content with stagger
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

    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
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
        });
    });

    // YouTube player animation
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

    // Floating animation for hero background
    gsap.to('.hero::before', {
        backgroundPosition: '200% 200%',
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true
    });

    // Mouse parallax effect for hero
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