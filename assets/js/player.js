/**
 * ==============================================================================
 * PROJETO: NOSSO PEQUENO UNIVERSO ❤️
 * Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne
 * PLAYER DE MÚSICA & PLAYLIST (player.js)
 * ==============================================================================
 */

class RomanticAudioPlayer {
  constructor() {
    this.audio = new Audio();
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.isShuffled = false;
    this.repeatMode = 'all'; // 'off', 'all', 'one'
    this.volume = 0.8;

    this.playlist = (window.CONFIG && window.CONFIG.music && window.CONFIG.music.playlist)
      ? window.CONFIG.music.playlist
      : [];

    // Elementos da UI
    this.playBtn = document.getElementById('player-play-btn');
    this.prevBtn = document.getElementById('player-prev-btn');
    this.nextBtn = document.getElementById('player-next-btn');
    this.repeatBtn = document.getElementById('player-repeat-btn');
    this.shuffleBtn = document.getElementById('player-shuffle-btn');

    this.scrubber = document.getElementById('player-scrubber');
    this.scrubberFilled = document.getElementById('player-scrubber-filled');
    this.currentTimeEl = document.getElementById('player-current-time');
    this.durationEl = document.getElementById('player-duration');

    this.volumeSlider = document.getElementById('player-volume');
    this.volumeIcon = document.getElementById('player-volume-icon');

    this.vinylDisk = document.getElementById('vinyl-disk');
    this.trackTitleEl = document.getElementById('player-track-title');
    this.trackArtistEl = document.getElementById('player-track-artist');
    this.trackCoverEl = document.getElementById('player-track-cover');
    this.playlistContainer = document.getElementById('playlist-tracks');

    // Visualizador de Ondas
    this.visualizerCanvas = document.getElementById('audio-visualizer-canvas');
    this.vCtx = this.visualizerCanvas ? this.visualizerCanvas.getContext('2d') : null;

    // Web Audio Synthesizer Fallback (para quando o MP3 ainda não foi baixado)
    this.audioCtx = null;
    this.synthInterval = null;
    this.isSynthesizing = false;

    this.init();
  }

  init() {
    this.setupAudioListeners();
    this.setupControls();
    this.renderPlaylist();
    this.loadTrack(0, false);
    this.initVisualizer();
  }

  setupAudioListeners() {
    this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.audio.addEventListener('loadedmetadata', () => this.onMetadataLoaded());
    this.audio.addEventListener('ended', () => this.onTrackEnded());

    // Se o arquivo MP3 não for encontrado localmente, aciona o sintetizador ambiente romântico
    this.audio.addEventListener('error', (e) => {
      console.warn('Arquivo de áudio local não encontrado. Iniciando sintetizador romântico ambiente.', e);
      this.startSynthesizerMelody();
    });
  }

  setupControls() {
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlay());
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevTrack());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextTrack());
    }
    if (this.repeatBtn) {
      this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
    }
    if (this.shuffleBtn) {
      this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    }

    if (this.scrubber) {
      this.scrubber.addEventListener('click', (e) => this.seek(e));
    }

    if (this.volumeSlider) {
      this.volumeSlider.value = this.volume * 100;
      this.volumeSlider.addEventListener('input', (e) => {
        this.setVolume(e.target.value / 100);
      });
    }

    if (this.volumeIcon) {
      this.volumeIcon.addEventListener('click', () => {
        if (this.audio.volume > 0) {
          this.previousVol = this.audio.volume;
          this.setVolume(0);
          this.volumeSlider.value = 0;
        } else {
          this.setVolume(this.previousVol || 0.8);
          this.volumeSlider.value = (this.previousVol || 0.8) * 100;
        }
      });
    }

    // Botão de tocar Glue Song no Hero
    const heroPlayBtn = document.getElementById('hero-play-glue');
    if (heroPlayBtn) {
      heroPlayBtn.addEventListener('click', () => {
        this.loadTrack(0, true);
        const playerSec = document.getElementById('musica');
        if (playerSec) {
          playerSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  renderPlaylist() {
    if (!this.playlistContainer) return;
    this.playlistContainer.innerHTML = '';

    this.playlist.forEach((track, idx) => {
      const li = document.createElement('li');
      li.className = `playlist-track-item ${idx === this.currentTrackIndex ? 'active' : ''}`;
      li.innerHTML = `
        <div class="track-meta">
          <img src="${track.cover}" alt="${track.title}" class="track-thumb">
          <div>
            <div class="track-name">${track.title}</div>
            <div class="track-artist">${track.artist}</div>
          </div>
        </div>
        <div class="track-duration">${track.duration || '--:--'}</div>
      `;
      li.addEventListener('click', () => {
        this.loadTrack(idx, true);
      });
      this.playlistContainer.appendChild(li);
    });
  }

  loadTrack(index, autoplay = false) {
    if (!this.playlist || this.playlist.length === 0) return;
    this.stopSynthesizerMelody();

    this.currentTrackIndex = index;
    const track = this.playlist[index];

    this.audio.src = track.file;
    this.audio.volume = this.volume;

    if (this.trackTitleEl) this.trackTitleEl.textContent = track.title;
    if (this.trackArtistEl) this.trackArtistEl.textContent = track.artist;
    if (this.trackCoverEl) this.trackCoverEl.src = track.cover;

    this.updateActiveTrackInPlaylist();

    if (autoplay) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updatePlayStateUI();
    }).catch((err) => {
      // Caso o navegador bloqueie autoplay ou o arquivo não exista
      this.startSynthesizerMelody();
      this.isPlaying = true;
      this.updatePlayStateUI();
    });
  }

  pause() {
    this.audio.pause();
    this.stopSynthesizerMelody();
    this.isPlaying = false;
    this.updatePlayStateUI();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  prevTrack() {
    let nextIdx = this.currentTrackIndex - 1;
    if (nextIdx < 0) nextIdx = this.playlist.length - 1;
    this.loadTrack(nextIdx, true);
  }

  nextTrack() {
    let nextIdx = this.currentTrackIndex + 1;
    if (this.isShuffled) {
      nextIdx = Math.floor(Math.random() * this.playlist.length);
    } else if (nextIdx >= this.playlist.length) {
      nextIdx = 0;
    }
    this.loadTrack(nextIdx, true);
  }

  toggleRepeat() {
    if (this.repeatMode === 'all') {
      this.repeatMode = 'one';
      this.repeatBtn.classList.add('active');
      this.repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i><span style="font-size: 10px; position:absolute; bottom:2px;">1</span>';
    } else if (this.repeatMode === 'one') {
      this.repeatMode = 'off';
      this.repeatBtn.classList.remove('active');
      this.repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
    } else {
      this.repeatMode = 'all';
      this.repeatBtn.classList.add('active');
      this.repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
    }
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
    if (this.shuffleBtn) {
      this.shuffleBtn.classList.toggle('active', this.isShuffled);
    }
  }

  seek(e) {
    if (!this.audio.duration && !this.isSynthesizing) return;
    const rect = this.scrubber.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    if (this.audio.duration) {
      this.audio.currentTime = percent * this.audio.duration;
    }
  }

  setVolume(val) {
    this.volume = val;
    this.audio.volume = val;
    if (this.volumeIcon) {
      if (val === 0) {
        this.volumeIcon.className = 'fa-solid fa-volume-xmark';
      } else if (val < 0.5) {
        this.volumeIcon.className = 'fa-solid fa-volume-low';
      } else {
        this.volumeIcon.className = 'fa-solid fa-volume-high';
      }
    }
  }

  onTimeUpdate() {
    if (!this.audio.duration) return;
    const current = this.audio.currentTime;
    const duration = this.audio.duration;
    const percent = (current / duration) * 100;

    if (this.scrubberFilled) this.scrubberFilled.style.width = `${percent}%`;
    if (this.currentTimeEl) this.currentTimeEl.textContent = this.formatTime(current);
  }

  onMetadataLoaded() {
    if (this.durationEl && this.audio.duration) {
      this.durationEl.textContent = this.formatTime(this.audio.duration);
    }
  }

  onTrackEnded() {
    if (this.repeatMode === 'one') {
      this.audio.currentTime = 0;
      this.play();
    } else if (this.repeatMode === 'all') {
      this.nextTrack();
    } else {
      this.pause();
    }
  }

  updatePlayStateUI() {
    if (this.playBtn) {
      this.playBtn.innerHTML = this.isPlaying 
        ? '<i class="fa-solid fa-pause"></i>' 
        : '<i class="fa-solid fa-play"></i>';
    }
    if (this.vinylDisk) {
      this.vinylDisk.classList.toggle('spinning', this.isPlaying);
    }
  }

  updateActiveTrackInPlaylist() {
    if (!this.playlistContainer) return;
    const items = this.playlistContainer.querySelectorAll('.playlist-track-item');
    items.forEach((item, idx) => {
      item.classList.toggle('active', idx === this.currentTrackIndex);
    });
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  }

  // ==========================================
  // SINTETIZADOR WEB AUDIO API (FALLBACK ELEGANTE)
  // Gera uma progressão romântica suave quando não há MP3 físico
  // ==========================================
  startSynthesizerMelody() {
    if (this.isSynthesizing) return;
    this.isSynthesizing = true;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      // Notas da melodia doce (D, F#, A, B, E, C#)
      const notes = [293.66, 369.99, 440.00, 493.88, 329.63, 554.37, 440.00, 369.99];
      let step = 0;

      this.synthInterval = setInterval(() => {
        if (!this.isPlaying || !this.isSynthesizing) return;
        this.playSoftBell(notes[step % notes.length]);
        step++;
      }, 700);

      // Exibe dica amigável
      if (window.showRomanticToast) {
        window.showRomanticToast('🎶 Tocando melodia ambiente de Glue Song. Adicione o arquivo MP3 em assets/audio/songs/ para a faixa original!');
      }
    } catch (e) {
      console.warn('Web Audio sintetizador:', e);
    }
  }

  playSoftBell(freq) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08 * this.volume, this.audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 1.2);
  }

  stopSynthesizerMelody() {
    this.isSynthesizing = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  // Visualizador Canvas Animado
  initVisualizer() {
    if (!this.visualizerCanvas || !this.vCtx) return;
    const render = () => {
      const w = this.visualizerCanvas.width = this.visualizerCanvas.offsetWidth;
      const h = this.visualizerCanvas.height = this.visualizerCanvas.offsetHeight;

      this.vCtx.clearRect(0, 0, w, h);
      const bars = 24;
      const barWidth = w / bars;

      for (let i = 0; i < bars; i++) {
        let barHeight = 4;
        if (this.isPlaying) {
          const t = Date.now() * 0.006 + i * 0.4;
          barHeight = (Math.sin(t) * 0.5 + 0.5) * (h * 0.8) + 4;
        }

        const x = i * barWidth;
        const y = h - barHeight;

        const grad = this.vCtx.createLinearGradient(0, y, 0, h);
        grad.addColorStop(0, '#ff758f');
        grad.addColorStop(1, '#700c24');

        this.vCtx.fillStyle = grad;
        this.vCtx.fillRect(x + 2, y, barWidth - 4, barHeight);
      }

      requestAnimationFrame(render);
    };
    render();
  }
}

window.RomanticAudioPlayer = RomanticAudioPlayer;

