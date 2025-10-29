---
title: Home
layout: default
---

<div class="hero-intro">
  <p class="subtitle">Instrumental progressive rock/metal from Hong Kong</p>
</div>

<div id="yt-player">
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

<div class="description">
  <p><strong>Debut single <em>Orbit</em> out now</strong></p>
  <p>A "sound walk" through human contradictions — perfectionism vs. laziness, Earth vs. cosmos.</p>
</div>

---

<div class="cta-section">
  <h2>Connect & Listen</h2>
  <div class="cta-buttons">
    <a href="https://instagram.com/lazyperfectionist_official" class="cta-button" target="_blank" rel="noopener">
      <span>📸</span> Instagram
    </a>
    <a href="https://tiktok.com/@lazyperfectionist_official" class="cta-button" target="_blank" rel="noopener">
      <span>🎵</span> TikTok
    </a>
    <a href="https://youtube.com/watch?v=Hw2a43RV1p0" class="cta-button" target="_blank" rel="noopener">
      <span>🎬</span> YouTube
    </a>
  </div>
</div>

---

<div class="latest-section">
  <h2>Latest Updates</h2>
  <div class="update-cards">
    <div class="update-card featured">
      <div class="card-icon">🎵</div>
      <h3>New Single Released</h3>
      <p><strong>Orbit</strong> is now available on all major streaming platforms. This instrumental journey explores the tension between perfection and imperfection.</p>
      <div class="card-stats">
        <span class="stat">📅 Oct 17, 2025</span>
        <span class="stat">🎸 Progressive Rock</span>
      </div>
      <a href="https://youtube.com/watch?v=Hw2a43RV1p0" target="_blank" rel="noopener" class="card-link">Watch Now →</a>
    </div>
    
    <div class="update-card">
      <div class="card-icon">🎸</div>
      <h3>EP in Progress</h3>
      <p>Working on a 4-track EP that expands the "sound walk" concept. Each track represents different aspects of human duality.</p>
      <div class="card-stats">
        <span class="stat">📀 4 Tracks</span>
        <span class="stat">🎹 Coming Soon</span>
      </div>
      <a href="/ep/" class="card-link">Learn More →</a>
    </div>
    
    <div class="update-card">
      <div class="card-icon">📝</div>
      <h3>Behind the Scenes</h3>
      <p>From university assignment to official release. Read the complete story of how <em>Orbit</em> came to life.</p>
      <div class="card-stats">
        <span class="stat">📚 Production Story</span>
        <span class="stat">💡 Creative Process</span>
      </div>
      <a href="/blog/orbit-journey/" class="card-link">Read Story →</a>
    </div>
  </div>
</div>

<style>
.update-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.update-card {
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.update-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0066cc, #0052a3);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.update-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(0, 102, 204, 0.3);
}

.update-card:hover::before {
  transform: scaleX(1);
}

.featured {
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.08) 0%, rgba(0, 102, 204, 0.03) 100%);
  border-color: rgba(0, 102, 204, 0.3);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  display: block;
  text-align: center;
  animation: bounce 2s ease-in-out infinite;
}

.featured .card-icon {
  animation-delay: 0s;
}

.update-card:nth-child(2) .card-icon {
  animation-delay: 0.5s;
}

.update-card:nth-child(3) .card-icon {
  animation-delay: 1s;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.update-card h3 {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  color: #ffffff;
  text-align: center;
}

.update-card p {
  margin-bottom: 2rem;
  line-height: 1.7;
  color: #cccccc;
  text-align: center;
}

.card-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat {
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.15) 0%, rgba(0, 102, 204, 0.05) 100%);
  color: #0066cc;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(0, 102, 204, 0.3);
}

.card-link {
  display: block;
  text-align: center;
  color: #0066cc;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  padding: 0.8rem 1.5rem;
  border: 2px solid #0066cc;
  border-radius: 8px;
  background: rgba(0, 102, 204, 0.05);
}

.card-link:hover {
  background: #0066cc;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 102, 204, 0.3);
}

/* Mobile responsive for update cards */
@media (max-width: 768px) {
  .update-cards {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .update-card {
    padding: 2rem;
  }
  
  .card-stats {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
  
  .card-link {
    width: 100%;
    text-align: center;
  }
}
</style>