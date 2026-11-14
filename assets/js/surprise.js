/**
 * ==============================================================================
 * PROJETO: NOSSO PEQUENO UNIVERSO ❤️
 * Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne
 * SURPRESA FINAL: O GRANDE CIRCUITO (surprise.js)
 * ==============================================================================
 */

class GrandSurpriseCircuit {
  constructor() {
    this.switchBase = document.getElementById('knife-switch-base');
    this.plugAssembly = this.switchBase ? this.switchBase.querySelector('.plug-assembly') : null;
    this.plugCable = this.switchBase ? this.switchBase.querySelector('.plug-cable') : null;
    this.plugPins = this.switchBase ? this.switchBase.querySelector('.plug-pins') : null;
    this.indicator = document.getElementById('circuit-status-indicator');
    this.pledgeCard = document.getElementById('surprise-pledge-card');
    this.replayBtn = document.getElementById('surprise-replay-btn');

    this.isActivated = false;
    this.isDragging = false;
    this.startX = 0;
    this.currentDragX = 0;
    this.maxDragDistance = 149; // 209px final - 60px inicial = 149px de arrasto até o centro da tomada

    this.init();
  }

  init() {
    if (!this.switchBase) return;

    // Suporte tanto para arrastar (drag and drop) quanto para clique
    this.setupDraggablePlug();

    if (this.replayBtn) {
      this.replayBtn.addEventListener('click', () => {
        this.resetCircuit();
      });
    }
  }

  setupDraggablePlug() {
    let hasMoved = false;

    const onPointerDown = (e) => {
      if (this.isActivated) return;
      this.isDragging = true;
      hasMoved = false;
      this.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      this.switchBase.classList.add('dragging');

      if (this.plugCable) this.plugCable.style.transition = 'none';
      if (this.plugAssembly) this.plugAssembly.style.transition = 'none';
      if (this.plugPins) this.plugPins.style.transition = 'none';

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    };

    const onPointerMove = (e) => {
      if (!this.isDragging || this.isActivated) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - this.startX;

      if (Math.abs(deltaX) > 4) {
        hasMoved = true;
      }

      // Permite arrastar entre 0px e maxDragDistance (149px)
      this.currentDragX = Math.max(0, Math.min(this.maxDragDistance, deltaX));
      const progress = this.currentDragX / this.maxDragDistance;

      // Atualiza comprimento do cabo: 60px base + delta (até 209px no total, centro da tomada)
      const newCableWidth = 60 + (this.maxDragDistance * progress);
      if (this.plugCable) {
        this.plugCable.style.width = `${newCableWidth}px`;
      }

      // Os pinos vão diminuindo suavemente conforme entram na tomada
      if (this.plugPins) {
        const pinScale = Math.max(0, 1 - progress);
        this.plugPins.style.opacity = `${pinScale}`;
        this.plugPins.style.transform = `scaleX(${pinScale})`;
      }

      // Atualiza dica do indicador
      if (this.indicator && !this.isActivated) {
        if (progress > 0.85) {
          this.indicator.querySelector('span').textContent = 'Solte para conectar o Amor! ⚡';
        } else {
          this.indicator.querySelector('span').textContent = `Conectando... ${Math.round(progress * 100)}%`;
        }
      }
    };

    const onPointerUp = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.switchBase.classList.remove('dragging');

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      // Reativa as transições CSS suaves para animar até a tomada ou voltar
      if (this.plugCable) this.plugCable.style.transition = 'width 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2)';
      if (this.plugPins) this.plugPins.style.transition = 'all 0.4s ease';

      // Se arrastou mais de 40% ou se foi apenas um clique rápido, conecta até o fim!
      if (this.currentDragX > this.maxDragDistance * 0.4 || !hasMoved) {
        // Estica o cabo e recolhe os pinos até o centro exato da tomada (209px)
        if (this.plugCable) this.plugCable.style.width = '209px';
        if (this.plugPins) {
          this.plugPins.style.opacity = '0';
          this.plugPins.style.transform = 'scaleX(0)';
        }
        this.activateCircuit();
      } else {
        // Volta suavemente ao início
        this.resetPlugPosition();
      }
    };

    this.switchBase.addEventListener('pointerdown', onPointerDown);
  }

  resetPlugPosition() {
    if (this.plugCable) this.plugCable.style.width = '';
    if (this.plugPins) {
      this.plugPins.style.opacity = '';
      this.plugPins.style.transform = '';
    }
    if (this.indicator) {
      this.indicator.querySelector('span').textContent = 'Desconectado • Arraste ou clique na tomada para conectar';
    }
    this.currentDragX = 0;
  }

  activateCircuit() {
    this.isActivated = true;
    this.switchBase.classList.add('active');

    if (this.indicator) {
      this.indicator.classList.add('connected');
      this.indicator.querySelector('span').textContent = 'Circuito 100% Fechado • Amor em Ressonância Contínua';
    }

    // Sons de faísca elétrica e sino
    this.playElectricSurgeSound();

    // Efeito de partículas na tela
    this.triggerUniverseFireworks();

    // Easter Egg: circuito ativado
    if (window.trackEasterEggProgress) window.trackEasterEggProgress('circuit');

    // Participação Especial do Niko na Surpresa Final
    if (window.nikoInstance && typeof window.nikoInstance.celebrateSurpriseClimax === 'function') {
      window.nikoInstance.celebrateSurpriseClimax();
    }

    // Revela a carta solene
    setTimeout(() => {
      if (this.pledgeCard) {
        this.pledgeCard.classList.add('revealed');
        this.pledgeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (window.showRomanticToast) {
        window.showRomanticToast('⚡ O circuito do nosso amor foi completado para sempre!');
      }
    }, 800);
  }

  resetCircuit() {
    this.isActivated = false;
    this.switchBase.classList.remove('active');
    this.resetPlugPosition();

    if (this.pledgeCard) {
      this.pledgeCard.classList.remove('revealed');
    }
  }

  triggerUniverseFireworks() {
    const colors = ['#ff758f', '#ffb703', '#64dfdf', '#ffffff', '#ffd166', '#ff2a55'];
    const totalParticles = 80;

    for (let i = 0; i < totalParticles; i++) {
      const p = document.createElement('div');
      p.className = 'universe-firework-particle';
      const isHeart = Math.random() < 0.4;
      p.textContent = isHeart ? (Math.random() < 0.5 ? '❤️' : '⚡') : '✨';

      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2 + 100;

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 280 + 80;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - 120;

      p.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        font-size: ${Math.random() * 16 + 14}px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        z-index: 10000;
        transition: transform 1.5s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.5s ease;
        transform: translate(0, 0) scale(0.5);
        opacity: 1;
        filter: drop-shadow(0 0 8px currentColor);
      `;

      document.body.appendChild(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate(${destX}px, ${destY}px) scale(${Math.random() * 0.8 + 0.8})`;
        p.style.opacity = '0';
      });

      setTimeout(() => p.remove(), 1600);
    }
  }

  playElectricSurgeSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();

      // 1. Ruído elétrico / Spark
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);

      // 2. Chime Celestial Harmonioso logo em seguida
      setTimeout(() => {
        const chime = ctx.createOscillator();
        const chimeGain = ctx.createGain();

        chime.type = 'sine';
        chime.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        chime.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.6); // A5

        chimeGain.gain.setValueAtTime(0.12, ctx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        chime.connect(chimeGain);
        chimeGain.connect(ctx.destination);

        chime.start();
        chime.stop(ctx.currentTime + 1.2);
      }, 250);
    } catch (e) {
      // Ignora silenciosamente
    }
  }
}

window.GrandSurpriseCircuit = GrandSurpriseCircuit;

