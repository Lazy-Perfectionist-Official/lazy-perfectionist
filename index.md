---
title: Home
layout: default
---

# Lazy Perfectionist

**Debut single *Orbit* out now**  
[Listen on YouTube](https://www.youtube.com/watch?v=Hw2a43RV1p0) · [Stream everywhere](https://distrokid.com/hyperfollow/lazyperfectionist/orbit)

> Instrumental progressive rock/metal from Hong Kong.  
> A "sound walk" through human contradictions — perfectionism vs. laziness, Earth vs. cosmos.

---

## Latest from Medium
<div id="medium-feed"></div>
<script>
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lazyperfectist')
    .then(r => r.json())
    .then(d => {
      document.getElementById('medium-feed').innerHTML = d.items.slice(0,3).map(p => `
        <article style="margin:2em 0;border-top:1px solid #ddd;padding-top:1em;">
          <h3><a href="${p.link}" target="_blank">${p.title}</a></h3>
          <p>${p.description.replace(/<[^>]*>/g, '').substring(0,180)}...</p>
          <small>${new Date(p.pubDate).toLocaleDateString()}</small>
        </article>
      `).join('');
    });
</script>