/**
 * ==============================================================================
 * PROJETO: NOSSO PEQUENO UNIVERSO ❤️
 * Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne
 * GALERIA DE FOTOS & LIGHTBOX (gallery.js)
 * ==============================================================================
 */

class RomanticGallery {
  constructor() {
    this.container = document.getElementById('gallery-grid');
    this.filterContainer = document.getElementById('gallery-filters');
    this.photos = (window.CONFIG && window.CONFIG.gallery) ? window.CONFIG.gallery : [];
    this.currentFilter = 'todos';
    this.currentIndex = 0;
    this.filteredPhotos = [...this.photos];

    // Lightbox modal elements
    this.modal = document.getElementById('lightbox-modal');
    this.modalImg = document.getElementById('lightbox-img');
    this.modalTitle = document.getElementById('lightbox-title');
    this.modalCaption = document.getElementById('lightbox-caption');
    this.modalJapanese = document.getElementById('lightbox-japanese');
    this.closeBtn = document.getElementById('lightbox-close');
    this.prevBtn = document.getElementById('lightbox-prev');
    this.nextBtn = document.getElementById('lightbox-next');

    this.init();
  }

  init() {
    this.renderFilters();
    this.renderPhotos();
    this.setupLightboxListeners();
  }

  renderFilters() {
    if (!this.filterContainer) return;
    const categories = [
      { key: 'todos', label: 'Todas as Lembranças' },
      { key: 'momentos', label: 'Momentos Especiais' },
      { key: 'isabelly', label: 'Isabelly' },
      { key: 'niko', label: 'Gatinho Niko 🐾' },
      { key: 'memorias', label: 'Sintonia & Futuro' }
    ];

    this.filterContainer.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `gallery-filter-btn ${cat.key === this.currentFilter ? 'active' : ''}`;
      btn.textContent = cat.label;
      btn.addEventListener('click', () => {
        this.currentFilter = cat.key;
        this.filterContainer.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderPhotos();
      });
      this.filterContainer.appendChild(btn);
    });
  }

  renderPhotos() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.filteredPhotos = this.currentFilter === 'todos' 
      ? this.photos 
      : this.photos.filter(p => p.category === this.currentFilter);

    if (this.filteredPhotos.length === 0) {
      this.container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Nenhuma foto nessa categoria ainda.</div>`;
      return;
    }

    this.filteredPhotos.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.innerHTML = `
        <div class="gallery-thumb-wrapper">
          <img src="${photo.src}" alt="${photo.title}" class="gallery-thumb" loading="lazy">
          <span class="gallery-overlay-badge">${photo.tag || 'Foto'}</span>
        </div>
        <div class="gallery-caption-box">
          <h4 class="gallery-title">${photo.title}</h4>
          ${photo.japanese ? `<span class="gallery-japanese-label">${photo.japanese}</span>` : ''}
          <p class="gallery-caption">${photo.caption}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        this.openLightbox(idx);
      });

      this.container.appendChild(card);
    });
  }

  setupLightboxListeners() {
    if (!this.modal) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeLightbox());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prevPhoto();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextPhoto();
      });
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeLightbox();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevPhoto();
      if (e.key === 'ArrowRight') this.nextPhoto();
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    const photo = this.filteredPhotos[index];
    if (!photo) return;

    if (this.modalImg) this.modalImg.src = photo.src;
    if (this.modalTitle) this.modalTitle.textContent = photo.title;
    if (this.modalCaption) this.modalCaption.textContent = photo.caption;
    if (this.modalJapanese) this.modalJapanese.textContent = photo.japanese || '';

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Easter Egg: primeira foto aberta conta como descoberta
    if (window.trackEasterEggProgress) window.trackEasterEggProgress('gallery');
  }

  closeLightbox() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  prevPhoto() {
    let newIdx = this.currentIndex - 1;
    if (newIdx < 0) newIdx = this.filteredPhotos.length - 1;
    this.openLightbox(newIdx);
  }

  nextPhoto() {
    let newIdx = this.currentIndex + 1;
    if (newIdx >= this.filteredPhotos.length) newIdx = 0;
    this.openLightbox(newIdx);
  }
}

window.RomanticGallery = RomanticGallery;

