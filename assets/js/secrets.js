/**
 * ==============================================================================
 * PROJETO: NOSSO PEQUENO UNIVERSO ❤️
 * Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne
 * CARTAS DE TAROT DO NOSSO DESTINO (secrets.js)
 * ==============================================================================
 */

class SecretMessages {
  constructor() {
    this.container = document.getElementById('secrets-grid');
    this.modal = document.getElementById('secret-modal');
    this.modalTitle = document.getElementById('secret-modal-title');
    this.modalKanji = document.getElementById('secret-modal-kanji');
    this.modalBody = document.getElementById('secret-modal-body');
    this.modalClose = document.getElementById('secret-modal-close');

    // Suporta os Arcanos de Tarot configurados no config.js
    const conf = window.CONFIG;
    this.cards = (conf && conf.tarotCards) ? conf.tarotCards : ((conf && conf.secrets) ? conf.secrets : []);

    this.init();
  }

  init() {
    this.render();
    this.setupListeners();
  }

  render() {
    if (!this.container || !this.cards) return;
    this.container.innerHTML = '';

    this.cards.forEach((cardData) => {
      const card = document.createElement('div');
      card.className = 'tarot-card';

      const num = cardData.number || '★';
      const title = cardData.arcana || cardData.title;
      const subtitle = cardData.subtitle || cardData.kanji || '';
      const preview = cardData.preview || '';
      const icon = cardData.icon || 'fa-solid fa-star';
      const symbol = cardData.symbol || '✨';

      card.innerHTML = `
        <div class="tarot-card-frame">
          <div class="tarot-ornament-corner tl"></div>
          <div class="tarot-ornament-corner tr"></div>
          <div class="tarot-ornament-corner bl"></div>
          <div class="tarot-ornament-corner br"></div>
          
          <div class="tarot-numeral">${num}</div>
          
          <div class="tarot-icon-circle">
            <i class="${icon}"></i>
          </div>

          <h3 class="tarot-arcana-title">${title}</h3>
          <span class="tarot-japanese-sub">${subtitle}</span>

          <div class="tarot-astral-symbol">${symbol}</div>
          <p class="tarot-preview-text">${preview}</p>

          <div class="tarot-cta-badge">
            <i class="fa-solid fa-sparkles"></i>
            <span>Consultar Destino</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.openSecret(cardData);
      });

      this.container.appendChild(card);
    });
  }

  setupListeners() {
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeSecret());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeSecret();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeSecret();
      }
    });
  }

  openSecret(cardData) {
    if (!this.modal) return;

    const num = cardData.number ? `${cardData.number} • ` : '';
    const title = cardData.arcana || cardData.title;
    const subtitle = cardData.subtitle || cardData.kanjiText || '';
    const theme = cardData.theme ? ` (${cardData.theme})` : '';
    const content = cardData.revelation || cardData.content;

    if (this.modalTitle) this.modalTitle.textContent = `${num}${title}`;
    if (this.modalKanji) this.modalKanji.textContent = `${subtitle}${theme}`;
    if (this.modalBody) this.modalBody.textContent = content;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Rastreia progresso para o Easter Egg "Eu te amo S2"
    if (window.trackEasterEggProgress) {
      window.trackEasterEggProgress('tarot');
    }

    // Som suave de sino celestial
    this.playChime();
  }

  closeSecret() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  playChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.35); // C6

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch (e) {}
  }
}

window.SecretMessages = SecretMessages;
