/**
 * ==============================================================================
 * PROJETO: NOSSO PEQUENO UNIVERSO ❤️
 * Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne
 * COMPANHEIRO NIKO — INTELIGÊNCIA & COMPORTAMENTOS (niko.js)
 * ==============================================================================
 */

class NikoCompanion {
  constructor() {
    this.container = document.getElementById('niko-companion');
    this.speechBubble = document.getElementById('niko-speech-bubble');
    this.bubbleText = document.getElementById('niko-bubble-text');
    this.avatarImg = document.getElementById('niko-avatar-img');

    // Botões de controle
    this.btnPet = document.getElementById('niko-btn-pet');
    this.btnSleep = document.getElementById('niko-btn-sleep');
    this.btnCall = document.getElementById('niko-btn-call');

    this.config = (window.CONFIG && window.CONFIG.niko) ? window.CONFIG.niko : {
      name: 'Niko',
      dialogues: ['Miau! ❤️']
    };

    // Estados do Mascote
    this.isSleeping = false;
    this.isWalking = false;
    this.isPlayingWithWire = false;
    this.isLickingPaw = false;
    this.soundCycleIndex = 0;
    this.currentPositionState = 'dock-right'; // 'dock-right', 'dock-left', 'wandering', 'section-nest'
    this.dialogueTimeout = null;
    this.behaviorTimer = null;

    // Respeito a preferência de movimento reduzido
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    if (!this.container) return;

    // Se houver foto personalizada configurada no config.js
    if (this.config.customPhoto && this.avatarImg) {
      this.avatarImg.src = this.config.customPhoto;
    }

    this.setupInteractions();
    this.setupScrollWatcher();
    this.startAutonomousLife();
  }

  setupInteractions() {
    // Clique direto no Niko
    this.container.addEventListener('click', (e) => {
      e.stopPropagation();
      this.interact();
    });

    // Fazer Carinho
    if (this.btnPet) {
      this.btnPet.addEventListener('click', (e) => {
        e.stopPropagation();
        this.petNiko();
      });
    }

    // Modo Soneca
    if (this.btnSleep) {
      this.btnSleep.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleSleep();
      });
    }

    // Chamar Niko para o canto da tela
    if (this.btnCall) {
      this.btnCall.addEventListener('click', (e) => {
        e.stopPropagation();
        this.wakeAndCall();
      });
    }

    // Fecha o balão de fala se clicar fora
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.hideBubble();
      }
    });
  }

  // Interação ao clicar no Niko
  interact() {
    if (this.isSleeping) {
      this.wakeUp();
      this.playCatMeowSound();
      this.say("Miau? Acordei! Senti o carinho da Isa de longe... 🐾");
      if (window.trackEasterEggProgress) window.trackEasterEggProgress('niko');
      return;
    }

    // Animação de Salto Alegre
    this.triggerHappyJump();
    this.spawnSparksAndHearts(4);
    this.playCatMeowSound();
    this.sayRandomDialogue();
    if (window.trackEasterEggProgress) window.trackEasterEggProgress('niko');
  }

  petNiko() {
    if (this.isSleeping) this.wakeUp();
    this.triggerHappyJump();
    this.spawnSparksAndHearts(6);
    this.playCatMeowSound();
    this.say("Miau! Purrr... Adoro esse carinho! Minhas patinhas agradecem, Isa! 💖🐾");
    if (window.trackEasterEggProgress) window.trackEasterEggProgress('niko');
  }

  triggerHappyJump() {
    if (this.prefersReducedMotion) return;
    this.container.classList.remove('jump-happy');
    // Força reflow para reiniciar animação
    void this.container.offsetWidth;
    this.container.classList.add('jump-happy');
    setTimeout(() => {
      this.container.classList.remove('jump-happy');
    }, 700);
  }

  toggleSleep() {
    this.isSleeping = !this.isSleeping;
    this.container.classList.toggle('sleeping', this.isSleeping);

    if (this.btnSleep) {
      this.btnSleep.innerHTML = this.isSleeping 
        ? '<i class="fa-solid fa-sun"></i> <span>Acordar</span>' 
        : '<i class="fa-solid fa-moon"></i> <span>Dormir</span>';
    }

    if (this.isSleeping) {
      this.container.classList.remove('walking');
      this.say("Zzz... Enroladinho quentinho tirando uma soneca... ❤️");
    } else {
      this.say("Miau! Baterias 100% recarregadas para brincar! ⚡🐾");
    }
  }

  wakeUp() {
    this.isSleeping = false;
    this.container.classList.remove('sleeping');
    if (this.btnSleep) {
      this.btnSleep.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Dormir</span>';
    }
  }

  wakeAndCall() {
    this.wakeUp();
    this.moveTo('right', '28px', '20px');
    this.triggerHappyJump();
    this.spawnSparksAndHearts(3);
    this.say("Cheguei rapidinho! Estou aqui pertinho de você! ✨🐾");
  }

  say(text) {
    if (!this.speechBubble || !this.bubbleText) return;
    this.bubbleText.textContent = text;
    this.speechBubble.classList.add('visible');

    if (this.dialogueTimeout) clearTimeout(this.dialogueTimeout);
    this.dialogueTimeout = setTimeout(() => {
      this.hideBubble();
    }, 6000);
  }

  sayRandomDialogue() {
    const list = this.config.dialogues || [
      "Miau! O Vinícius me disse que você é a garota mais incrível do mundo! 🐾",
      "Purrr... Achei um fio elétrico pra brincar, mas tomei cuidado! ⚡",
      "Cuidando de cada detalhe com amor! ✨",
      "Vocês dois são a minha família favorita do universo! 💖"
    ];
    const text = list[Math.floor(Math.random() * list.length)];
    this.say(text);
  }

  hideBubble() {
    if (this.speechBubble) {
      this.speechBubble.classList.remove('visible');
    }
  }

  // Gera corações e faíscas ao redor do Niko
  spawnSparksAndHearts(count = 3) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'niko-heart-particle';
      const isSpark = Math.random() < 0.4;
      p.textContent = isSpark ? '⚡' : (Math.random() < 0.5 ? '❤️' : '🐾');
      p.style.left = `${50 + (Math.random() * 40 - 20)}%`;
      p.style.top = '30%';
      if (p.style && typeof p.style.setProperty === 'function') {
        p.style.setProperty('--rand-x', `${(Math.random() - 0.5) * 70}px`);
      } else if (p.style) {
        p.style['--rand-x'] = `${(Math.random() - 0.5) * 70}px`;
      }

      this.container.appendChild(p);
      setTimeout(() => p.remove(), 1800);
    }
  }

  // Movimenta suavemente o container para posições seguras (nunca cobre botões)
  moveTo(side, offsetHorizontal, offsetBottom) {
    if (this.prefersReducedMotion) return;
    if (side === 'right') {
      this.container.style.right = offsetHorizontal;
      this.container.style.left = 'auto';
    } else {
      this.container.style.left = offsetHorizontal;
      this.container.style.right = 'auto';
    }
    this.container.style.bottom = offsetBottom;
  }

  // Inteligência Autônoma do Niko: varia comportamentos de forma suave e espaçada
  startAutonomousLife() {
    if (this.prefersReducedMotion) return;

    // Intervalo inteligente entre 22 e 38 segundos
    const scheduleNextAction = () => {
      const delay = Math.floor(Math.random() * 16000) + 22000;
      this.behaviorTimer = setTimeout(() => {
        if (!this.isSleeping) {
          this.performRandomBehavior();
        }
        scheduleNextAction();
      }, delay);
    };

    scheduleNextAction();
  }

  performRandomBehavior() {
    const behaviors = [
      'stroll_bottom',
      'lick_paw',
      'play_wire',
      'chase_spark',
      'observe_gently',
      'purr_dialogue'
    ];
    const chosen = behaviors[Math.floor(Math.random() * behaviors.length)];

    switch (chosen) {
      case 'stroll_bottom':
        this.strollAlongBottom();
        break;
      case 'lick_paw':
        this.lickPaw();
        break;
      case 'play_wire':
        this.playWithWire();
        break;
      case 'chase_spark':
        this.chaseSpark();
        break;
      case 'observe_gently':
        this.observeGently();
        break;
      case 'purr_dialogue':
        if (!this.speechBubble.classList.contains('visible')) {
          this.sayRandomDialogue();
        }
        break;
    }
  }

  // Animação Fofa: Lambendo a Patinha
  lickPaw() {
    if (this.isLickingPaw || this.isSleeping) return;
    this.isLickingPaw = true;
    this.container.classList.add('licking-paw');
    this.spawnSparksAndHearts(2);

    setTimeout(() => {
      this.container.classList.remove('licking-paw');
      this.isLickingPaw = false;
    }, 3800);
  }

  // 1. Passear pelo rodapé de forma suave e voltar
  strollAlongBottom() {
    if (this.isWalking || this.isSleeping || window.innerWidth < 640) return;
    this.isWalking = true;
    this.container.classList.add('walking');

    // Anda suavemente até uma posição intermediária segura
    const targetRight = (this.currentPositionState === 'dock-right') ? '220px' : '30px';
    this.container.style.right = targetRight;

    setTimeout(() => {
      this.container.classList.remove('walking');
      this.isWalking = false;
      this.currentPositionState = (targetRight === '30px') ? 'dock-right' : 'dock-mid';
    }, 2800);
  }

  // 4. Brincar com o fio elétrico e faísca
  playWithWire() {
    this.isPlayingWithWire = true;
    this.container.classList.add('playing');
    this.spawnSparksAndHearts(3);

    setTimeout(() => {
      this.container.classList.remove('playing');
      this.isPlayingWithWire = false;
    }, 3500);
  }

  // 5. Perseguir pequenas faíscas
  chaseSpark() {
    this.spawnSparksAndHearts(4);
    this.container.style.transform = 'translateY(-12px) rotate(4deg)';
    setTimeout(() => {
      this.container.style.transform = 'translateY(0) rotate(0deg)';
    }, 600);
  }

  // 7. Sentar e observar a visitante
  observeGently() {
    this.container.style.transform = 'scale(1.04)';
    setTimeout(() => {
      this.container.style.transform = '';
    }, 3000);
  }

  // 8. Reação ao navegar perto de seções especiais (ex: Carta Romântica)
  setupScrollWatcher() {
    const letterSection = document.getElementById('carta');
    if (!letterSection) return;

    let hasGreetedNearLetter = false;

    window.addEventListener('scroll', () => {
      const rect = letterSection.getBoundingClientRect();
      const isVisible = rect.top >= -200 && rect.bottom <= (window.innerHeight + 200);

      if (isVisible && !hasGreetedNearLetter && !this.isSleeping) {
        hasGreetedNearLetter = true;
        this.say("Essa carta de amor é tão linda... O Vinícius escreveu com muito carinho! ❤️📜");
      }
    }, { passive: true });
  }

  // 13. Aparição especial durante a Surpresa Final
  celebrateSurpriseClimax() {
    this.wakeUp();
    this.moveTo('right', '28px', '30px');
    this.triggerHappyJump();
    this.spawnSparksAndHearts(12);
    this.say("⚡ O circuito do amor de vocês dois tá brilhando no universo inteiro! Miau! 🎉💖");
  }

  // Reproduz som autêntico de gatinho miando (Opções 1, 2 e 3)
  playCatMeowSound() {
    // Escolhe entre as 3 opções de som (meow1.wav, meow2.wav, meow3.wav)
    const soundList = ['assets/audio/sfx/meow1.wav', 'assets/audio/sfx/meow2.wav', 'assets/audio/sfx/meow3.wav'];
    let chosenSound = soundList[0];

    const mode = (this.config && this.config.activeSoundMode) ? this.config.activeSoundMode : 'cycle';
    if (mode === 'meow1' || mode === 1) chosenSound = soundList[0];
    else if (mode === 'meow2' || mode === 2) chosenSound = soundList[1];
    else if (mode === 'meow3' || mode === 3) chosenSound = soundList[2];
    else {
      // Alterna ciclicamente entre as 3 opções de miado
      chosenSound = soundList[this.soundCycleIndex % soundList.length];
      this.soundCycleIndex++;
    }

    // 1. Toca o arquivo de áudio WAV do miado real
    try {
      const audio = new Audio(chosenSound);
      audio.volume = 0.85;
      audio.play().catch(() => {});
    } catch (e) {}

    // 2. Síntese acústica complementar felina ("Miau!" + ronrom)
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Glissando clássico do miado de gato (M - I - A - U)
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(390, now);
      osc.frequency.linearRampToValueAtTime(740, now + 0.16);
      osc.frequency.exponentialRampToValueAtTime(460, now + 0.62);

      // Filtro formante simulando a garganta e focinho do gatinho
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1300, now);
      filter.frequency.linearRampToValueAtTime(2100, now + 0.2);
      filter.frequency.linearRampToValueAtTime(1050, now + 0.62);
      filter.Q.value = 3.5;

      // Envelope de amplitude natural
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.68);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.68);
    } catch (e) {}
  }

  // Sintetizador de Ronrom Aconchegante via Web Audio API
  playPurrSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.15);
      osc.frequency.linearRampToValueAtTime(75, ctx.currentTime + 0.38);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.42);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.42);
    } catch (e) {
      // Silencioso se bloqueado
    }
  }
}

window.NikoCompanion = NikoCompanion;
