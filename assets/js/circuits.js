/**
 * ==============================================================================
 * PROJETO: NOSSO PEQUENO UNIVERSO ❤️
 * Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne
 * CANVAS DE ELETRICIDADE, FAÍSCAS E UNIVERSO (circuits.js)
 * ==============================================================================
 */

class CircuitUniverseCanvas {
  constructor() {
    this.universeCanvas = document.getElementById('universe-canvas');
    this.circuitCanvas = document.getElementById('circuit-bg-canvas');
    if (!this.universeCanvas || !this.circuitCanvas) return;

    this.uCtx = this.universeCanvas.getContext('2d');
    this.cCtx = this.circuitCanvas.getContext('2d');

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.stars = [];
    this.sparks = [];
    this.circuitNodes = [];
    this.circuitLines = [];

    this.mouse = { x: -1000, y: -1000, active: false };

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Interatividade do mouse: faíscas românticas
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
      if (Math.random() < 0.3) {
        this.addSpark(e.clientX, e.clientY);
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.mouse.x = touch.clientX;
        this.mouse.y = touch.clientY;
        if (Math.random() < 0.4) {
          this.addSpark(touch.clientX, touch.clientY);
        }
      }
    }, { passive: true });

    this.createStars();
    this.generateCircuitTraces();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.universeCanvas.width = this.width;
    this.universeCanvas.height = this.height;
    this.circuitCanvas.width = this.width;
    this.circuitCanvas.height = this.height;
  }

  createStars() {
    this.stars = [];
    const count = Math.min(Math.floor((this.width * this.height) / 7500), 160);
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.4 ? '#ffccd5' : (Math.random() > 0.5 ? '#64dfdf' : '#ffea79')
      });
    }
  }

  generateCircuitTraces() {
    this.circuitNodes = [];
    this.circuitLines = [];
    const cols = Math.floor(this.width / 180) + 1;
    const rows = Math.floor(this.height / 180) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.45) {
          const x = c * 180 + (Math.random() * 60 - 30);
          const y = r * 180 + (Math.random() * 60 - 30);
          this.circuitNodes.push({ x, y, pulse: Math.random() * Math.PI * 2 });

          // Conecta a vizinhos
          if (c > 0 && Math.random() < 0.5) {
            this.circuitLines.push({
              x1: x, y1: y,
              x2: (c - 1) * 180 + 30, y2: y,
              pulseOffset: Math.random() * 10
            });
          }
          if (r > 0 && Math.random() < 0.5) {
            this.circuitLines.push({
              x1: x, y1: y,
              x2: x, y2: (r - 1) * 180 + 30,
              pulseOffset: Math.random() * 10
            });
          }
        }
      }
    }
  }

  addSpark(x, y, color = null) {
    const colors = ['#ff758f', '#ffb703', '#64dfdf', '#ffffff', '#ffd166'];
    const chosenColor = color || colors[Math.floor(Math.random() * colors.length)];
    this.sparks.push({
      x: x + (Math.random() * 12 - 6),
      y: y + (Math.random() * 12 - 6),
      vx: (Math.random() - 0.5) * 2.5,
      vy: (Math.random() - 0.5) * 2.5 - 0.8,
      size: Math.random() * 3 + 1.2,
      alpha: 1,
      decay: Math.random() * 0.025 + 0.015,
      color: chosenColor
    });
  }

  animate() {
    // 1. Desenha o Universo (estrelas e poeira estelar)
    this.uCtx.clearRect(0, 0, this.width, this.height);
    for (let s of this.stars) {
      s.alpha += Math.sin(Date.now() * s.twinkleSpeed) * 0.01;
      s.alpha = Math.max(0.15, Math.min(0.9, s.alpha));

      this.uCtx.beginPath();
      this.uCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.uCtx.fillStyle = s.color;
      this.uCtx.globalAlpha = s.alpha;
      this.uCtx.fill();
    }

    // 2. Desenha Linhas de Circuito Sutis
    this.cCtx.clearRect(0, 0, this.width, this.height);
    const now = Date.now() * 0.0015;

    this.cCtx.lineWidth = 1;
    this.cCtx.strokeStyle = 'rgba(255, 117, 143, 0.16)';
    this.cCtx.setLineDash([6, 6]);

    for (let l of this.circuitLines) {
      this.cCtx.beginPath();
      this.cCtx.moveTo(l.x1, l.y1);
      this.cCtx.lineTo(l.x2, l.y2);
      this.cCtx.stroke();

      // Pulso elétrico percorrendo a linha
      const progress = ((now + l.pulseOffset) % 4) / 4;
      const px = l.x1 + (l.x2 - l.x1) * progress;
      const py = l.y1 + (l.y2 - l.y1) * progress;

      this.cCtx.fillStyle = '#ffb703';
      this.cCtx.globalAlpha = 0.5;
      this.cCtx.beginPath();
      this.cCtx.arc(px, py, 2, 0, Math.PI * 2);
      this.cCtx.fill();
    }
    this.cCtx.setLineDash([]);

    // Nós de circuitos
    for (let n of this.circuitNodes) {
      const glow = (Math.sin(now * 2 + n.pulse) + 1) * 0.5;
      this.cCtx.beginPath();
      this.cCtx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
      this.cCtx.fillStyle = glow > 0.5 ? '#64dfdf' : '#ff758f';
      this.cCtx.globalAlpha = 0.35 + glow * 0.4;
      this.cCtx.fill();
    }

    // 3. Desenha Faíscas Interativas
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const sp = this.sparks[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.alpha -= sp.decay;

      if (sp.alpha <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }

      this.uCtx.beginPath();
      this.uCtx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
      this.uCtx.fillStyle = sp.color;
      this.uCtx.globalAlpha = sp.alpha;
      this.uCtx.shadowBlur = 8;
      this.uCtx.shadowColor = sp.color;
      this.uCtx.fill();
      this.uCtx.shadowBlur = 0;
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.CircuitUniverseCanvas = CircuitUniverseCanvas;

