// Enhanced JavaScript - Better Animations & Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100); // Staggered animations
            }
        });
    }, observerOptions);

    // Observe all main content sections
    document.querySelectorAll('main > div, article, section, .blog-post').forEach(el => {
        observer.observe(el);
    });

    // Enhanced smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced hover effects for interactive elements
    document.querySelectorAll('.cta-button, .blog-post, nav a').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero section
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const speed = 0.5;
            hero.style.transform = `translateY(${scrolled * speed}px)`;
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Enhanced loading animation for hero elements
    const heroH1 = document.querySelector('.hero h1');
    const heroNav = document.querySelector('.hero nav');
    
    if (heroH1) {
        setTimeout(() => {
            heroH1.style.opacity = '1';
            heroH1.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroNav) {
        setTimeout(() => {
            heroNav.style.opacity = '1';
            heroNav.style.transform = 'translateY(0)';
        }, 600);
    }

    // Add magnetic effect to CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translateY(-4px) scale(1.02) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });
    });

    // Enhanced scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #0066cc, #0052a3);
                z-index: 1000;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    // Add loading states for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Console log for debugging
    console.log('🎸 Lazy Perfectionist site loaded successfully');
    console.log('🚀 Enhanced animations and interactions active');
});