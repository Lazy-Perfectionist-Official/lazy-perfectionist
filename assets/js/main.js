// Main JavaScript - Clean and Minimal
document.addEventListener('DOMContentLoaded', function() {
    
    // Simple fade-in animation for content
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all main content sections
    document.querySelectorAll('main > div, article, section').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for anchor links only
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

    // Simple hover effects for interactive elements
    document.querySelectorAll('.cta-button, .blog-post').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Console log for debugging
    console.log('Lazy Perfectionist site loaded successfully');
});