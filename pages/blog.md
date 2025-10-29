---
title: Blog
layout: default
permalink: /blog/
---

# Blog

<div data-aos="fade-up">
  Welcome to the Lazy Perfectionist blog. Here you'll find behind-the-scenes content, production insights, and updates on new releases.
</div>

## Latest Posts

<div class="blog-posts">
  {% for post in site.pages %}
    {% if post.url contains '/blog/' and post.url != '/blog/' %}
      <article class="blog-post" data-aos="fade-up" data-aos-delay="{{ forloop.index | times: 100 }}">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <div class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
          {% if post.categories %}
            <span class="categories">
              {% for category in post.categories %}
                <span class="category">{{ category }}</span>
              {% endfor %}
            </span>
          {% endif %}
        </div>
        {% if post.excerpt %}
          <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
        {% endif %}
        <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
      </article>
    {% endif %}
  {% endfor %}
</div>

<style>
  .blog-posts {
    margin-top: 2rem;
  }
  
  .blog-post {
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .blog-post h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .blog-post h2 a {
    color: #fff;
    text-decoration: none;
  }
  
  .blog-post h2 a:hover {
    color: #ff6b6b;
  }
  
  .post-meta {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .categories {
    margin-left: 1rem;
  }
  
  .category {
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
  
  .post-excerpt {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .read-more {
    color: #ff6b6b;
    text-decoration: none;
    font-weight: 500;
  }
  
  .read-more:hover {
    text-decoration: underline;
  }
</style>