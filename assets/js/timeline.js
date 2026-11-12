/**
 * ==============================================================================
 * PROJETO: NOSSO PEQUENO UNIVERSO ❤️
 * Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne
 * LINHA DO TEMPO INTERATIVA (timeline.js)
 * ==============================================================================
 */

class InteractiveTimeline {
  constructor() {
    this.container = document.getElementById('timeline-items');
    this.milestones = (window.CONFIG && window.CONFIG.timeline) ? window.CONFIG.timeline : [];
    this.init();
  }

  init() {
    if (!this.container || !this.milestones) return;
    this.render();
  }

  render() {
    this.container.innerHTML = '';

    this.milestones.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'timeline-item';

      el.innerHTML = `
        <div class="timeline-node-icon" title="${item.category}">
          <i class="${item.icon || 'fa-solid fa-heart'}"></i>
        </div>
        <div class="timeline-card">
          <div class="timeline-date-badge">
            <i class="fa-regular fa-clock"></i>
            <span>${item.date}</span> • <span>${item.category}</span>
          </div>
          <h3 class="timeline-item-title">${item.title}</h3>
          ${item.japaneseBadge ? `<span class="timeline-japanese-badge">${item.japaneseBadge}</span>` : ''}
          <p class="timeline-desc">${item.description}</p>
          ${item.electricalHighlight ? `
            <div class="timeline-electrical-note">
              <i class="fa-solid fa-bolt"></i>
              <span>${item.electricalHighlight}</span>
            </div>
          ` : ''}
        </div>
      `;

      this.container.appendChild(el);
    });
  }
}

window.InteractiveTimeline = InteractiveTimeline;

