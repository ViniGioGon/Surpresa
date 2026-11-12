/**
 * ==============================================================================
 * PROJETO: NOSSO PEQUENO UNIVERSO ❤️
 * Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne
 * CONTROLADOR PRINCIPAL (app.js)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification Helper
  window.showRomanticToast = function(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 4500);
  };

  // 2. Easter Egg: Rastreamento das 5 Descobertas → "Eu te amo S2"
  setupEasterEgg();

  // 3. Preenchimento de Dados do CONFIG
  populateCoupleData();
  populateLetterData();
  populateMetaphorsAndJapanese();

  // 4. Inicialização dos Módulos Especializados
  const canvas = new window.CircuitUniverseCanvas();
  const counter = new window.RomanticCounter();
  const player = new window.RomanticAudioPlayer();
  const timeline = new window.InteractiveTimeline();
  const gallery = new window.RomanticGallery();
  const secrets = new window.SecretMessages();
  const niko = new window.NikoCompanion();
  const surprise = new window.GrandSurpriseCircuit();

  // Exporta instâncias para acesso global
  window.nikoInstance = niko;
  window.playerInstance = player;

  // 5. Interatividade da Tela de Entrada "Surpresa" e Autoplay de Música
  setupWelcomeSurpriseScreen();

  // 6. Interatividade do Lacre de Cera da Carta
  setupWaxSealLetter();

  // 7. Interatividade do Orbe de Ressonância (Ponte entre os dois)
  setupResonanceOrb();

  // 8. Lógica do Vídeo da Call
  setupVideoCallSection();
});

// ============================================================
// EASTER EGG: "Eu te amo S2" — 5 Descobertas Necessárias
// ============================================================
function setupEasterEgg() {
  const conf = window.CONFIG;
  const ee = (conf && conf.easterEgg) ? conf.easterEgg : {};
  const discovered = new Set();

  const questEl    = document.getElementById('quest-count');
  const pillEl     = document.getElementById('quest-tracker-pill');
  const modal      = document.getElementById('easter-egg-modal');
  const textEl     = document.getElementById('easter-egg-text');
  const sigEl      = document.getElementById('easter-egg-signature');

  window.trackEasterEggProgress = function(key) {
    if (discovered.has(key)) return;
    discovered.add(key);

    // Atualiza pílula
    if (questEl) questEl.textContent = discovered.size;

    // Toast de progresso
    const msgs = {
      tarot:   '🃏 Arcano de Tarot revelado! +1 segredo descoberto',
      niko:    '🐾 O Niko gostou do carinho! +1 segredo descoberto',
      letter:  '📜 Carta de amor aberta! +1 segredo descoberto',
      circuit: '⚡ Circuito ativado! +1 segredo descoberto',
      gallery: '📷 Memória encontrada! +1 segredo descoberto'
    };
    if (window.showRomanticToast && msgs[key]) {
      window.showRomanticToast(msgs[key]);
    }

    // Vibração leve no mobile
    if (navigator.vibrate) navigator.vibrate([40, 20, 40]);

    // 5/5 — Easter Egg Final!
    if (discovered.size >= 5) {
      setTimeout(() => {
        if (textEl) textEl.textContent = ee.message || 'Isabelly, você descobriu todos os nossos segredos. Que essa jornada tenha sido tão especial para você quanto foi para mim criá-la. Eu te amo de verdade.';
        if (sigEl)  sigEl.textContent  = ee.signature || 'Vinícius (LIM4O) ❤️';

        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }

        if (pillEl) pillEl.classList.add('completed');

        // Fogos de artifício do Niko
        if (window.nikoInstance && typeof window.nikoInstance.celebrateSurpriseClimax === 'function') {
          window.nikoInstance.celebrateSurpriseClimax();
        }

        if (window.showRomanticToast) {
          window.showRomanticToast('💖 Eu te amo S2 — Segredo final revelado!');
        }
      }, 500);
    }
  };
}

// Preenche dados do casal a partir do config.js
function populateCoupleData() {
  const conf = window.CONFIG;
  if (!conf || !conf.couple) return;

  const { her, him, connection } = conf.couple;

  // Ela (Isabelly)
  const herName = document.getElementById('her-name');
  const herNickname = document.getElementById('her-nickname');
  const herTag = document.getElementById('her-tag');
  const herBio = document.getElementById('her-bio');
  const herAvatar = document.getElementById('her-avatar');

  if (herName) herName.textContent = her.name;
  if (herNickname) herNickname.textContent = her.nickname;
  if (herTag) herTag.textContent = her.tagline;
  if (herBio) herBio.textContent = her.bio;
  if (herAvatar && her.avatar) herAvatar.src = her.avatar;

  // Ele (Vinícius / LIM4O)
  const hisName = document.getElementById('his-name');
  const hisNickname = document.getElementById('his-nickname');
  const hisTag = document.getElementById('his-tag');
  const hisBio = document.getElementById('his-bio');
  const hisAvatar = document.getElementById('his-avatar');

  if (hisName && him) hisName.textContent = him.name;
  if (hisNickname && him) hisNickname.textContent = him.nickname;
  if (hisTag && him) hisTag.textContent = him.tagline;
  if (hisBio && him) hisBio.textContent = him.bio;
  if (hisAvatar && him && him.avatar) hisAvatar.src = him.avatar;

  // Título e Subtítulos do Contador
  const counterTitleEl = document.getElementById('counter-title');
  const counterDescEl = document.getElementById('counter-desc');
  const counterDisclaimerEl = document.getElementById('counter-disclaimer');

  if (counterTitleEl) counterTitleEl.textContent = connection.counterTitle;
  if (counterDescEl) counterDescEl.textContent = connection.counterDescription;
  if (counterDisclaimerEl) counterDisclaimerEl.textContent = connection.disclaimer;
}

// Preenche a Carta Romântica
function populateLetterData() {
  const conf = window.CONFIG;
  if (!conf || !conf.letter) return;

  const letter = conf.letter;
  const jpHeader = document.getElementById('letter-jp-header');
  const title = document.getElementById('letter-title');
  const dateStamp = document.getElementById('letter-date-stamp');
  const body = document.getElementById('letter-paragraphs');
  const closing = document.getElementById('letter-closing');
  const signature = document.getElementById('letter-signature');

  if (jpHeader) jpHeader.textContent = `${letter.japaneseHeader} — ${letter.japaneseHeaderTranslation}`;
  if (title) title.textContent = letter.title;
  if (dateStamp) dateStamp.textContent = letter.dateStamp;
  if (closing) closing.textContent = letter.closing;
  if (signature) signature.textContent = letter.signature;

  if (body && letter.paragraphs) {
    body.innerHTML = '';
    const salutation = document.createElement('p');
    salutation.className = 'letter-salutation';
    salutation.textContent = letter.salutation;
    body.appendChild(salutation);

    letter.paragraphs.forEach(pText => {
      const p = document.createElement('p');
      p.className = 'letter-paragraph';
      p.textContent = pText;
      body.appendChild(p);
    });
  }
}

// Configura a Página de Entrada com o Botão "Surpresa" e Autoplay
function setupWelcomeSurpriseScreen() {
  const welcomeScreen = document.getElementById('welcome-surprise-screen');
  const surpriseBtn = document.getElementById('entry-surprise-btn');

  if (!welcomeScreen || !surpriseBtn) return;

  // Trava a rolagem enquanto a tela de surpresa estiver visível
  document.body.style.overflow = 'hidden';

  surpriseBtn.addEventListener('click', () => {
    // 1. Inicia a música automaticamente no clique (atende à política de autoplay do navegador)
    if (window.playerInstance) {
      window.playerInstance.play();
    }

    // 2. Destrava a rolagem e remove suavemente a tela de surpresa com animação
    welcomeScreen.classList.add('unlocked');
    document.body.style.overflow = '';

    // 3. Som de boas-vindas do Niko e toast
    setTimeout(() => {
      if (window.nikoInstance) {
        window.nikoInstance.wakeUp();
        window.nikoInstance.playCatMeowSound();
        window.nikoInstance.say("Miau! Bem-vinda ao nosso universo, Isa! ❤️🐾");
      }
      if (window.showRomanticToast) {
        window.showRomanticToast('✨ Bem-vinda! A nossa música começou a tocar.');
      }
    }, 600);

    // Remove do fluxo visual após a animação de fade/zoom
    setTimeout(() => {
      welcomeScreen.style.display = 'none';
    }, 1100);
  });
}

// Configura o Lacre de Cera
function setupWaxSealLetter() {
  const sealBtn = document.getElementById('wax-seal-btn');
  const parchment = document.getElementById('letter-parchment');
  const sealTrigger = document.getElementById('wax-seal-trigger');

  if (!sealBtn || !parchment) return;

  sealBtn.addEventListener('click', () => {
    // Som de romper o lacre
    playWaxCrackSound();

    sealBtn.style.transform = 'scale(0.8) rotate(15deg)';
    sealBtn.style.opacity = '0.5';

    setTimeout(() => {
      sealTrigger.style.display = 'none';
      parchment.classList.add('open');
      parchment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      window.showRomanticToast('📜 Carta de amor aberta com sucesso!');
      // Easter Egg: carta aberta
      if (window.trackEasterEggProgress) window.trackEasterEggProgress('letter');
    }, 400);
  });
}

function playWaxCrackSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch(e) {}
}

// Preenche Metáforas e Expressões Japonesas
function populateMetaphorsAndJapanese() {
  const conf = window.CONFIG;
  if (!conf) return;

  // Metáforas Elétricas
  const metaphorsGrid = document.getElementById('metaphors-grid');
  if (metaphorsGrid && conf.electricalQuotes) {
    metaphorsGrid.innerHTML = '';
    conf.electricalQuotes.forEach(item => {
      const card = document.createElement('div');
      card.className = 'metaphor-card';
      card.innerHTML = `
        <div class="metaphor-icon"><i class="fa-solid fa-bolt"></i></div>
        <h4 class="metaphor-title">${item.title}</h4>
        <div class="metaphor-concept">${item.concept}</div>
        <p class="metaphor-quote">"${item.quote}"</p>
      `;
      metaphorsGrid.appendChild(card);
    });
  }

  // Lista de Expressões Japonesas Autênticas
  const japaneseList = document.getElementById('japanese-phrases-list');
  if (japaneseList && conf.japanesePhrases) {
    japaneseList.innerHTML = '';
    conf.japanesePhrases.forEach(jp => {
      const tag = document.createElement('div');
      tag.className = 'kanji-tag';
      tag.title = jp.meaning;
      tag.innerHTML = `
        <span class="kanji-char">${jp.kanji}</span>
        <span>(${jp.romaji}) — ${jp.pt}</span>
      `;
      japaneseList.appendChild(tag);
    });
  }
}

// Orbe de Ressonância entre as duas pessoas
function setupResonanceOrb() {
  const orb = document.getElementById('resonance-orb');
  if (!orb) return;

  orb.addEventListener('click', () => {
    orb.style.transform = 'scale(1.3) rotate(360deg)';
    orb.style.boxShadow = '0 0 45px var(--electric-cyan)';

    window.showRomanticToast('⚡ Frequência de ressonância atingida: atração total entre Vinícius e Isa!');

    setTimeout(() => {
      orb.style.transform = '';
      orb.style.boxShadow = '';
    }, 700);
  });
}

// Vídeo da Call do Discord: esconde mockup quando o vídeo carrega, oculta player se arquivo ausente
function setupVideoCallSection() {
  const vid     = document.getElementById('call-video-player');
  const mockup  = document.getElementById('discord-mockup-overlay');
  if (!vid || !mockup) return;

  vid.addEventListener('loadeddata', () => {
    mockup.style.display = 'none';
  });

  vid.addEventListener('error', () => {
    vid.style.display = 'none';
    mockup.style.display = 'flex';
  });
}
