---
title: Home
layout: default
---

<div data-aos="fade-down" class="hero-intro">
  <p class="subtitle">Instrumental progressive rock/metal from Hong Kong</p>
</div>

<div data-aos="zoom-in" id="yt-player">
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/Hw2a43RV1p0" 
    title="Orbit - Lazy Perfectionist (Official Video)" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>

<div data-aos="fade-up" class="description">
  <p><strong>Debut single <em>Orbit</em> out now</strong></p>
  <p>A "sound walk" through human contradictions — perfectionism vs. laziness, Earth vs. cosmos.</p>
</div>

---

<div data-aos="fade-right" class="cta-section">
  <h2>Connect & Listen</h2>
  <div class="cta-buttons">
    <a href="https://instagram.com/lazyperfectionist_official" class="cta-button" target="_blank" rel="noopener">
      <span>📸 Instagram</span>
    </a>
    <a href="https://tiktok.com/@lazyperfectionist_official" class="cta-button" target="_blank" rel="noopener">
      <span>🎵 TikTok</span>
    </a>
    <a href="https://youtube.com/watch?v=Hw2a43RV1p0" class="cta-button" target="_blank" rel="noopener">
      <span>🎬 YouTube</span>
    </a>
  </div>
</div>

---

<div data-aos="slide-up" class="latest-section">
  <h2>Latest Updates</h2>
  <div id="medium-feed"></div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lazyperfectist')
      .then(response => response.json())
      .then(data => {
        const feedContainer = document.getElementById('medium-feed');
        if (data.items && data.items.length > 0) {
          feedContainer.innerHTML = data.items.slice(0, 3).map(post => `
            <article data-aos="fade-up" data-aos-delay="${data.items.indexOf(post) * 100}">
              <h3><a href="${post.link}" target="_blank" rel="noopener">${post.title}</a></h3>
              <p>${post.description.replace(/<[^>]*>/g, '').substring(0, 180)}...</p>
              <small>${new Date(post.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
            </article>
          `).join('');
        } else {
          feedContainer.innerHTML = '<p>Stay tuned for the latest updates!</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching Medium feed:', error);
        document.getElementById('medium-feed').innerHTML = '<p>Follow us on social media for the latest updates!</p>';
      });
  });
</script>