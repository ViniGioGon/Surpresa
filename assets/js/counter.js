/**
 * ==============================================================================
 * PROJETO: NOSSO PEQUENO UNIVERSO ❤️
 * Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne
 * CONTADOR DE TEMPO DESDE A PRIMEIRA CONVERSA (counter.js)
 * ==============================================================================
 */

class RomanticCounter {
  constructor() {
    this.daysEl = document.getElementById('count-days');
    this.hoursEl = document.getElementById('count-hours');
    this.minutesEl = document.getElementById('count-minutes');
    this.secondsEl = document.getElementById('count-seconds');

    this.statHoursEl = document.getElementById('stat-total-hours');
    this.statHeartbeatsEl = document.getElementById('stat-heartbeats');
    this.statEnergyEl = document.getElementById('stat-energy-cycles');

    // Data configurada: 08/03/2026
    const dateStr = (window.CONFIG && window.CONFIG.couple && window.CONFIG.couple.connection) 
      ? window.CONFIG.couple.connection.firstDate 
      : '2026-03-08T00:00:00';
    
    this.startDate = new Date(dateStr);
    this.formatter = new Intl.NumberFormat('pt-BR');

    this.init();
  }

  init() {
    this.update();
    setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date();
    let diffMs = now.getTime() - this.startDate.getTime();

    // Caso a data esteja no futuro (ex: fuso ou teste inicial)
    if (diffMs < 0) {
      diffMs = 0;
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const remainingHours = totalHours % 24;
    const remainingMinutes = totalMinutes % 60;
    const remainingSeconds = totalSeconds % 60;

    if (this.daysEl) this.daysEl.textContent = this.padZero(totalDays);
    if (this.hoursEl) this.hoursEl.textContent = this.padZero(remainingHours);
    if (this.minutesEl) this.minutesEl.textContent = this.padZero(remainingMinutes);
    if (this.secondsEl) {
      const formatted = this.padZero(remainingSeconds);
      if (this.secondsEl.textContent !== formatted) {
        this.secondsEl.textContent = formatted;
        this.secondsEl.classList.remove('pulse-tick');
        void this.secondsEl.offsetWidth;
        this.secondsEl.classList.add('pulse-tick');
      }
    }

    // Métricas Românticas Derivadas
    if (this.statHoursEl) {
      this.statHoursEl.textContent = this.formatter.format(totalHours) + 'h';
    }
    if (this.statHeartbeatsEl) {
      // Estimativa carinhosa de ~75 batimentos por minuto
      const beats = Math.floor(totalMinutes * 75);
      this.statHeartbeatsEl.textContent = this.formatter.format(beats);
    }
    if (this.statEnergyEl) {
      // Metáfora elétrica: frequência da rede ~60Hz = 60 ciclos por segundo
      const cycles = Math.floor(totalSeconds * 60);
      this.statEnergyEl.textContent = this.formatter.format(cycles) + ' Hz';
    }
  }

  padZero(num) {
    return num < 10 ? '0' + num : String(num);
  }
}

window.RomanticCounter = RomanticCounter;

