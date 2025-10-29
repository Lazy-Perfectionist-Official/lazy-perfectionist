---
title: Blog
layout: default
permalink: /blog/
---

# Blog

<div class="blog-intro">
  <p>Welcome to Lazy Perfectionist blog. Here you'll find behind-the-scenes content, production insights, and updates on new releases.</p>
</div>

## Latest Posts

<div class="blog-posts" id="medium-posts">
  <div class="loading-indicator">
    <div class="spinner"></div>
    <p>Loading latest posts from Medium...</p>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Fetch Medium posts
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lazyperfectionist')
    .then(response => response.json())
    .then(data => {
      const postsContainer = document.getElementById('medium-posts');
      
      if (data.items && data.items.length > 0) {
        const postsHTML = data.items.slice(0, 6).map((post, index) => {
          const pubDate = new Date(post.pubDate);
          const formattedDate = pubDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          
          // Extract first image from content
          const imageMatch = post.content.match(/<img[^>]+src="([^"]+)"/);
          const imageUrl = imageMatch ? imageMatch[1] : '/assets/img/orbit-cover.jpg';
          
          // Clean description
          const cleanDescription = post.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
          
          return `
            <article class="blog-post medium-post" style="animation-delay: ${index * 0.1}s">
              <div class="post-image">
                <img src="${imageUrl}" alt="${post.title}" loading="lazy">
              </div>
              <div class="post-content">
                <h2><a href="${post.link}" target="_blank" rel="noopener">${post.title}</a></h2>
                <div class="post-meta">
                  <time datetime="${post.pubDate}">${formattedDate}</time>
                  <span class="external-indicator">📝 Medium</span>
                </div>
                <div class="post-excerpt">
                  <p>${cleanDescription}</p>
                </div>
                <a href="${post.link}" class="read-more" target="_blank" rel="noopener">
                  Read on Medium →
                </a>
              </div>
            </article>
          `;
        }).join('');
        
        postsContainer.innerHTML = postsHTML;
      } else {
        postsContainer.innerHTML = `
          <div class="no-posts">
            <p>No posts found on Medium yet. Check back soon for latest updates!</p>
          </div>
        `;
      }
    })
    .catch(error => {
      console.error('Error fetching Medium posts:', error);
      document.getElementById('medium-posts').innerHTML = `
        <div class="error-message">
          <p>Unable to load Medium posts at the moment. Please check back later.</p>
        </div>
      `;
    });
});
</script>

<style>
.blog-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 1.1rem;
  color: #cccccc;
}

.loading-indicator {
  text-align: center;
  padding: 4rem 2rem;
  color: #888888;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 102, 204, 0.2);
  border-top: 3px solid #0066cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.medium-post {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
  align-items: start;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.medium-post:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 102, 204, 0.3);
}

.post-image {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 16/9;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.medium-post:hover .post-image img {
  transform: scale(1.05);
}

.post-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.post-content h2 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.post-content h2 a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-content h2 a:hover {
  color: #0066cc;
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  color: #888888;
  font-size: 0.9rem;
}

.external-indicator {
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.2) 0%, rgba(0, 102, 204, 0.1) 100%);
  color: #0066cc;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(0, 102, 204, 0.3);
}

.post-excerpt {
  flex: 1;
  margin-bottom: 2rem;
  line-height: 1.7;
  color: #cccccc;
}

.error-message {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 102, 102, 0.1);
  border: 1px solid rgba(255, 102, 102, 0.3);
  border-radius: 8px;
  color: #ff6b6b;
}

.no-posts {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Mobile responsive for blog posts */
@media (max-width: 768px) {
  .medium-post {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .post-image {
    aspect-ratio: 16/9;
    margin-bottom: 1rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>