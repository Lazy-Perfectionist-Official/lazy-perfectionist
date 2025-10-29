// Lazy Perfectionist - Linktree Inspired Interactions
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
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all main content sections
    document.querySelectorAll('.update-card, .video-section, .content-section').forEach(el => {
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
    document.querySelectorAll('.cta-button, .update-card, nav a').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const speed = 0.3;
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
    const logoContainer = document.querySelector('.logo-container');
    const heroH1 = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .subtitle');
    
    if (logoContainer) {
        setTimeout(() => {
            logoContainer.style.opacity = '1';
            logoContainer.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }
    
    if (heroH1) {
        setTimeout(() => {
            heroH1.style.opacity = '1';
            heroH1.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 800);
    }

    // Add magnetic effect to CTA buttons and navigation
    document.querySelectorAll('.cta-button, nav a').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translateY(-2px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });

    // Enhanced scroll progress indicator with orange theme
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
                height: 4px;
                background: linear-gradient(90deg, #ED8734, #1c205d);
                z-index: 1000;
                transition: width 0.3s ease;
                box-shadow: 0 2px 10px rgba(237, 135, 52, 0.5);
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
            this.style.transform = 'translateY(0) scale(0.95)';
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'translateY(0) scale(1)';
            }, 200);
        });
    });

    // Video play button interaction
    const playOverlay = document.querySelector('.play-overlay');
    const videoContainer = document.querySelector('.video-container');
    
    if (playOverlay && videoContainer) {
        playOverlay.addEventListener('click', function() {
            const iframe = videoContainer.querySelector('iframe');
            if (iframe) {
                const src = iframe.src;
                iframe.src = src + '&autoplay=1';
                playOverlay.style.display = 'none';
            }
        });
    }

    // Logo hover effect
    const logo = document.querySelector('.logo-container img');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 25px 50px rgba(28, 32, 93, 0.4)) brightness(1.1)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 20px 40px rgba(28, 32, 93, 0.3)) brightness(1)';
        });
    }

    // Console log for debugging
    console.log('🎸 Lazy Perfectionist site loaded successfully');
    console.log('🟠 Linktree-inspired design with orange theme active');
});