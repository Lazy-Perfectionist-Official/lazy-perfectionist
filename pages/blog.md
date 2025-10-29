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

<div class="blog-posts">
  {% assign blog_posts = site.pages | where: "url", "/blog/orbit-journey/" %}
  {% for post in blog_posts %}
    <article class="blog-post">
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
      <div class="post-excerpt">
        <p>From university assignment to official release — the complete story behind Lazy Perfectionist's debut single "Orbit". Learn about the production process, creative struggles, and lessons learned.</p>
      </div>
      <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
    </article>
  {% endfor %}
  
  {% if blog_posts.size == 0 %}
    <div class="no-posts">
      <p>No blog posts yet. Check back soon for behind-the-scenes content and production insights!</p>
    </div>
  {% endif %}
</div>

<style>
.blog-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  color: #cccccc;
}

.no-posts {
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>