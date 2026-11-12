/**
 * ==============================================================================
 * PROJETO: NOSSO PEQUENO UNIVERSO ❤️
 * Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne
 *
 * ARQUIVO DE CONFIGURAÇÃO CENTRAL (config.js)
 * ==============================================================================
 */

const CONFIG = {
  // ==========================================
  // 1. INFORMAÇÕES DO CASAL & DADOS PRINCIPAIS
  // ==========================================
  app: {
    siteTitle: "Nosso Pequeno Universo ❤️ | Vinícius & Isabelly",
    heroSubtitle: "二人の物語 • A história de nós dois",
    dedication: "Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne",
    startYear: 2026
  },

  couple: {
    her: {
      name: "Isabelly Lavigne",
      nickname: "Isa",
      role: "Ela",
      tagline: "A luz e a doçura do meu universo",
      avatar: "assets/images/icons/avatar-isa.svg",
      bio: "Dona de um sorriso que desarma qualquer dia cinza e com quem cada conversa parece voar no tempo. A pessoa que torna o mundo muito mais bonito de se viver.",
      color: "#ff758f",
      symbol: "🌸"
    },
    him: {
      name: "Vinícius",
      nickname: "LIM4O",
      role: "Ele",
      tagline: "Fascinado por eletricidade e por você",
      avatar: "assets/images/icons/avatar-vini.svg",
      bio: "Alguém que encontrou na física e na eletricidade um fascínio pelo funcionamento do mundo — mas descobriu em você a única atração que nenhuma fórmula matemática consegue mensurar.",
      color: "#64dfdf",
      symbol: "⚡"
    },
    connection: {
      platform: "Discord",
      firstDate: "2026-03-08T00:00:00",
      formattedDate: "08 de Março de 2026",
      counterTitle: "Desde a nossa primeira conversa.",
      counterDescription: "Contando cada fração de segundo desde o momento exato em que nossas mensagens se cruzaram no Discord.",
      disclaimer: "Essa data celebra o primeiro instante em que começamos a nos falar — o ponto de partida de tudo."
    }
  },

  // ==========================================
  // 2. NOSSO GATINHO NIKO (MASCOTE DO SITE)
  // ==========================================
  niko: {
    name: "Niko",
    title: "Mascote & Guardião do Nosso Amor",
    avatar: "assets/images/niko/niko.svg",
    customPhoto: null, // Caso queira foto real, ponha: "assets/images/niko/niko-real.jpg"
    bio: "Nosso gatinho branco de olhos azuis safira! Adora cochilar perto de cabos elétricos, lamber a patinha, brincar com faíscas e encher a Isa de carinho.",
    
    // Os 3 Sons de Gato Reais do Niko
    sounds: [
      { id: 1, name: "Miado Fofinho", file: "assets/audio/sfx/meow1.wav", desc: "Miau doce e carinhoso" },
      { id: 2, name: "Miado Dengoso & Ronrom", file: "assets/audio/sfx/meow2.wav", desc: "Mraaww dengoso pedindo carinho" },
      { id: 3, name: "Chirp Curto de Filhote", file: "assets/audio/sfx/meow3.wav", desc: "Mrrp! Miadinho alegre e curioso" }
    ],
    // Modo de som ao clicar: 'cycle' (alterna os 3 sons) ou o número do som fixo (1, 2 ou 3)
    activeSoundMode: 'cycle',

    dialogues: [
      "Miau! O Vinícius me disse que você é a garota mais incrível do mundo inteiro! 🐾",
      "Purrr... Lambendo a patinha pra ficar bem elegante pra você! ✨🐱",
      "Achei um fio elétrico pra brincar, mas tomei todo o cuidado! ⚡",
      "Dormindo um pouquinho perto da carta de amor... Zzz... ❤️",
      "Minha missão oficial: garantir que a Isa sorria ao ver essa página! ✨",
      "Patas cheias de carinho! Ronrom... 🐾",
      "Vocês dois são a minha família favorita do universo! 💖",
      "Fui flagrado correndo atrás de uma faísca de luz! ⚡🐾",
      "運命 (Unmei)... O destino de vocês dois é lindo demais!"
    ]
  },

  // ==========================================
  // 3. PLAYER DE MÚSICA & PLAYLIST LIMPA
  // (Apenas as músicas adicionadas por você)
  // ==========================================
  music: {
    featured: {
      title: "Glue Song",
      artist: "beabadoobee",
      file: "assets/audio/songs/glue-song.mp3",
      cover: "assets/images/covers/glue-song.svg",
      tag: "Tema Principal",
      quote: "I've never known someone like you... Tangled in love, stuck by you from the glue.",
      quoteTranslation: "Nunca conheci alguém como você... Preso no amor, colado a você como cola.",
      duration: "2:15"
    },

    // AQUI: Apenas as músicas que você adicionar!
    playlist: [
      {
        id: 1,
        title: "Glue Song",
        artist: "beabadoobee",
        file: "assets/audio/songs/glue-song.mp3",
        cover: "assets/images/covers/glue-song.svg",
        duration: "2:15",
        note: "Nossa música especial"
      },
      {
        id: 2,
        title: "Fase Neutro",
        artist: "Músicas Nossas",
        file: "assets/audio/songs/faseeneutro.mp3",
        cover: "assets/images/covers/default-cover.svg",
        duration: "",
        note: "Mais uma faixa especial"
      },
      {
        id: 3,
        title: "I can't stop singing",
        artist: "Teen beach movie",
        file: "assets/audio/songs/icantstopsinging.mp3",
        cover: "assets/images/covers/default-cover.svg",
        duration: "",
        note: "Mais uma faixa especial"
      }
      // Para adicionar mais músicas, copie o arquivo MP3 para assets/audio/songs/
      // e adicione um novo bloco aqui como no exemplo abaixo:
      // ,{
      //   id: 3,
      //   title: "Nome da Música",
      //   artist: "Nome do Artista",
      //   file: "assets/audio/songs/nome-do-arquivo.mp3",
      //   cover: "assets/images/covers/default-cover.svg",
      //   duration: "3:10",
      //   note: "Lembrança especial"
      // }
    ]
  },

  // ==========================================
  // 4. VÍDEO DA GENTE EM CALL NO DISCORD
  // ==========================================
  videoCall: {
    enabled: true,
    title: "Nossas Madrugadas em Chamada no Discord 🎧",
    subtitle: "Aquele momento em que as horas voam, a gente não para de rir e o mundo lá fora simplesmente desaparece.",
    // Coloque seu arquivo de vídeo em assets/video/call-zuando.mp4
    videoSrc: "assets/video/call-zuando.mp4",
    poster: "assets/images/gallery/photo1.svg",
    badge: "Discord Voice Call • Memória Real",
    quote: "A risada mais gostosa de ouvir no fone de ouvido."
  },

  // ==========================================
  // 5. LINHA DO TEMPO (ACONTECIMENTOS REAIS)
  // ==========================================
  timeline: [
    {
      id: 1,
      date: "08/03/2026",
      fullDateText: "08 de Março de 2026",
      title: "Nossa Primeira Conversa no Discord",
      category: "Início de Tudo",
      icon: "fa-brands fa-discord",
      japaneseBadge: "運命の始まり (Unmei no hajimari) — O início do destino",
      description: "O dia em que duas pessoas no Discord começaram uma conversa despretensiosa que viria a mudar tudo. Entre mensagens, risadas e afinidades, a primeira faísca da nossa conexão foi acesa.",
      electricalHighlight: "Circuito em aberto ganha seu primeiro pulso de corrente contínua.",
      tag: "Marco Inicial"
    },
    {
      id: 2,
      date: "Março de 2026",
      fullDateText: "As primeiras madrugadas conversando",
      title: "Descoberta de Afinidades & Risadas Fáceis",
      category: "Sintonia",
      icon: "fa-solid fa-comments",
      japaneseBadge: "心の繋がり (Kokoro no tsunagari) — Conexão de corações",
      description: "As conversas foram ficando cada vez mais longas e naturais. Perceber que tínhamos assuntos sem fim, que o tempo voava ao seu lado e que rir com você se tornava a melhor parte do meu dia.",
      electricalHighlight: "Frequência de ressonância atingida: nenhuma interferência externa.",
      tag: "Afinidade"
    },
    {
      id: 3,
      date: "Evolução Diária",
      fullDateText: "Ao longo dos nossos dias",
      title: "A Chegada & Companhia do Nosso Niko",
      category: "Nosso Pequeno Universo",
      icon: "fa-solid fa-cat",
      japaneseBadge: "大切な存在 (Taisetsu na sonzai) — Presença preciosa",
      description: "O Niko passou a fazer parte do nosso dia a dia, sendo nossa mascote, nossa alegria e o motivo de muitas risadas compartilhadas. Um pedacinho de carinho que une ainda mais nós dois.",
      electricalHighlight: "Estabilidade magnética e ronrons em alta frequência.",
      tag: "Família"
    },
    {
      id: 4,
      date: "Hoje & Sempre",
      fullDateText: "O presente que construímos",
      title: "Este Pequeno Universo Criado para Você",
      category: "Homenagem",
      icon: "fa-solid fa-bolt",
      japaneseBadge: "二人の物語 (Futari no monogatari) — Nossa história",
      description: "Cada linha de código, cada detalhe elétrico e cada nota musical reunidos aqui para te lembrar do quanto você é especial, admirável e importante na minha vida.",
      electricalHighlight: "Circuito fechado: fluxo de carinho ininterrupto.",
      tag: "Amor & Respeito"
    }
  ],

  // ==========================================
  // 6. CARTA ROMÂNTICA PERSONALIZADA
  // ==========================================
  letter: {
    waxSealMonogram: "V & I",
    japaneseHeader: "大切な人へ (Taisetsu na hito e)",
    japaneseHeaderTranslation: "Para a pessoa mais especial",
    title: "Para Isabelly Lavigne, com todo o meu coração",
    dateStamp: "Desde 08/03/2026 até o infinito",
    salutation: "Minha querida Isabelly,",
    paragraphs: [
      "Se há algo que aprendi estudando eletricidade, é que para uma corrente existir de verdade, não basta apenas haver condutores — é preciso haver uma diferença de potencial autêntica, algo invisível aos olhos que faça a energia escolher fluir.",
      "Quando nos conhecemos pelo Discord, naquele dia 08 de março de 2026, eu não imaginava que uma conversa na tela do computador seria capaz de acender uma luz tão pura e verdadeira na minha rotina. Você tem esse dom raro de transformar momentos simples em lembranças que aquecem a memória.",
      "Gosto de pensar em nós como dois circuitos que encontraram a mesma frequência de ressonância. Com você, não há ruído, não há resistência desnecessária; há apenas a tranquilidade de poder ser exatamente quem sou, com o privilégio de ter ao lado alguém cuja inteligência, risada e carinho me inspiram todos os dias.",
      "O Niko aqui ao lado é testemunha dos meus sorrisos bobos a cada mensagem sua que chega. Este pequeno universo digital é apenas uma singela forma de colocar em palavras, cores e notas musicais aquilo que sinto.",
      "Obrigado por ter entrado na minha vida e por permitir que a nossa história continue sendo escrita, um dia lindo de cada vez."
    ],
    closing: "Com todo o meu carinho, admiração e amor,",
    signature: "Vinícius (LIM4O)"
  },

  // ==========================================
  // 7. ARCANOS DO DESTINO (CARTAS DE TAROT)
  // Referência mágica a cartas de Tarot românticas
  // ==========================================
  tarotCards: [
    {
      id: "tarot-1",
      number: "VI",
      arcana: "Os Enamorados",
      subtitle: "二人の恋人 (Futari no koibito)",
      theme: "Conexão & Harmonia",
      icon: "fa-solid fa-heart",
      symbol: "⚡❤️",
      preview: "O encontro de duas almas que vibram na mesma frequência.",
      revelation: "Isabelly, a carta dos Enamorados no Tarot não fala sobre acaso, mas sobre escolha sincera e harmonia mútua. Escolher conversar com você todos os dias é a coisa mais fácil e natural do mundo. Nossa sintonia é uma corrente contínua que nunca perde força."
    },
    {
      id: "tarot-2",
      number: "XVII",
      arcana: "A Estrela",
      subtitle: "希望の星 (Kibou no hoshi)",
      theme: "Luz & Inspiração",
      icon: "fa-solid fa-star",
      symbol: "✨⭐",
      preview: "A luz que guia o caminho e dissipa qualquer dia nublado.",
      revelation: "Você é a minha carta da Estrela, Isa. Aquele ponto de luz no céu que traz paz imediata só de olhar. Quando meu dia está cansativo ou pesado, basta ouvir sua voz ou ler uma mensagem sua para tudo ficar leve de novo."
    },
    {
      id: "tarot-3",
      number: "X",
      arcana: "A Roda do Destino",
      subtitle: "運命の輪 (Unmei no wa)",
      theme: "08/03/2026 • O Início",
      icon: "fa-solid fa-dharmachakra",
      symbol: "🌌🎡",
      preview: "O alinhamento cósmico que cruzou nossas mensagens no Discord.",
      revelation: "Entre bilhões de pessoas no mundo e milhões de servidores no Discord, a Roda do Destino girou de forma perfeita para colocar você no meu caminho no dia 08 de março de 2026. A probabilidade matemática era quase nula — o que prova que a nossa conexão é muito mais do que física."
    },
    {
      id: "tarot-4",
      number: "XIX",
      arcana: "O Sol",
      subtitle: "輝く太陽 (Kagayaku taiyou)",
      theme: "Calor & Risadas",
      icon: "fa-solid fa-sun",
      symbol: "☀️🐾",
      preview: "A alegria radiante das nossas madrugadas em chamada.",
      revelation: "O Sol representa a pureza das risadas, o calor do afeto e a presença do nosso gatinho Niko brincando por perto. Com você não tem tempo ruim: a gente ri até a barriga doer e cada instante se torna precioso."
    },
    {
      id: "tarot-5",
      number: "XIV",
      arcana: "A Temperança",
      subtitle: "調和と共鳴 (Chouwa to kyoumei)",
      theme: "Circuito Sem Resistência",
      icon: "fa-solid fa-bolt",
      symbol: "⚡💧",
      preview: "O equilíbrio suave onde a energia flui sem barreiras.",
      revelation: "Na física, quando um circuito atinge ressonância perfeita, a energia transita sem perdas por efeito Joule. Na nossa história, a Temperança é isso: o conforto de podermos ser nós mesmos, sem máscaras, com respeito e muito carinho."
    },
    {
      id: "tarot-6",
      number: "XXI",
      arcana: "O Mundo / Universo",
      subtitle: "二人の宇宙 (Futari no uchuu)",
      theme: "Nosso Pequeno Universo",
      icon: "fa-solid fa-infinity",
      symbol: "🪐💖",
      preview: "A totalidade de tudo o que estamos construindo juntos.",
      revelation: "A carta final do Tarot representa a realização e o infinito. Este site é a representação do nosso pequeno universo particular: um refúgio de paz, música, memórias e um amor que cresce a cada dia."
    }
  ],

  // ==========================================
  // 8. GALERIA DE FOTOS
  // ==========================================
  gallery: [
    {
      id: 1,
      title: "O Ponto de Partida",
      category: "momentos",
      tag: "08/03/2026",
      date: "08 de Março de 2026",
      src: "assets/images/gallery/photo1.svg",
      caption: "O dia em que trocamos nossas primeiras palavras no Discord. O começo de tudo o que estamos construindo juntos.",
      japanese: "すべての始まり (Subete no hajimari)"
    },
    {
      id: 2,
      title: "A Luz do Seu Sorriso",
      category: "isabelly",
      tag: "Especial",
      date: "Momento Guardado",
      src: "assets/images/gallery/sorriso.gif",
      caption: "Seu sorriso tem uma luz que ilumina qualquer dia cinza. Minha foto favorita da garota mais linda.",
      japanese: "笑顔の光 (Egao no hikari)"
    },
    {
      id: 3,
      title: "Nosso Gatinho Niko",
      category: "niko",
      tag: "Mascote",
      date: "Companheiro Fiel",
      src: "assets/images/gallery/photo-niko.jpg",
      caption: "Niko em um dos seus momentos de preguiça e fofura. O pequeno companheiro que ilumina ainda mais o nosso universo.",
      japanese: "愛猫ニコ (Aibyou Niko)"
    },
    {
      id: 4,
      title: "Circuitos & Sintonia",
      category: "memorias",
      tag: "Eletricidade",
      date: "Nossa Conexão",
      src: "assets/images/gallery/circuito.png",
      caption: "Uma metáfora perfeita para nós dois: dois polos que encontraram o caminho ideal para gerar energia e carinho contínuo.",
      japanese: "二人の繋がり (Futari no tsunagari)"
    },
    {
      id: 5,
      title: "Nosso Pequeno Universo",
      category: "momentos",
      tag: "Universo",
      date: "Infinito Particular",
      src: "assets/images/gallery/universo.png",
      caption: "No meio da imensidão do mundo, encontramos nosso próprio canto de paz, respeito e gargalhadas sinceras.",
      japanese: "私たちの小さな宇宙 (Watashitachi no chiisana uchuu)"
    },
    {
      id: 6,
      title: "O Que Ainda Vamos Viver",
      category: "memorias",
      tag: "Futuro",
      date: "Amanhã & Sempre",
      src: "assets/images/gallery/photo6.svg",
      caption: "Este espaço é uma lembrança de que muitas páginas, fotografias e viagens ainda serão registradas nessa nossa história.",
      japanese: "未来への約束 (Mirai e no yakusoku)"
    }
  ],

  // ==========================================
  // 9. METÁFORAS ELÉTRICAS
  // ==========================================
  electricalQuotes: [
    {
      title: "Diferença de Potencial",
      concept: "Tensão Elétrica (V)",
      quote: "Assim como a corrente necessita de uma diferença de potencial para se mover, bastou uma faísca do seu olhar para colocar todo o meu coração em movimento."
    },
    {
      title: "Circuito Fechado",
      concept: "Continuidade",
      quote: "Em um circuito aberto nada flui, mas contigo encontrei o caminho fechado ideal: a energia do carinho corre de forma contínua, sem resistência."
    },
    {
      title: "Ressonância",
      concept: "Sintonia Pura",
      quote: "Quando dois sistemas oscilam na mesma frequência, a amplitude atinge seu valor máximo. Com você, cada risada e conversa atinge ressonância perfeita."
    },
    {
      title: "Campo Magnético",
      concept: "Força de Lorentz",
      quote: "Cargas elétricas em movimento criam campos magnéticos intensos. A nossa convivência cria esse campo protetor que nos mantém unidos e seguros."
    }
  ],

  // ==========================================
  // 10. EXPRESSÕES JAPONESAS
  // ==========================================
  japanesePhrases: [
    { kanji: "運命", romaji: "Unmei", pt: "Destino", meaning: "O alinhamento silencioso que nos fez encontrar no vasto mundo." },
    { kanji: "大切な人", romaji: "Taisetsu na hito", pt: "Pessoa especial", meaning: "Alguém indispensável, cujo valor é inestimável para o coração." },
    { kanji: "愛", romaji: "Ai", pt: "Amor", meaning: "O sentimento profundo, paciente e protetor que nutro por você." },
    { kanji: "二人の物語", romaji: "Futari no monogatari", pt: "A história de nós dois", meaning: "O livro mais bonito que a vida já me deu para escrever junto." },
    { kanji: "一期一会", romaji: "Ichigo Ichie", pt: "Encontro único", meaning: "Viver cada segundo juntos como uma joia irrepetível." },
    { kanji: "心", romaji: "Kokoro", pt: "Coração & Alma", meaning: "Onde sua lembrança e sua presença moram de verdade." },
    { kanji: "永遠", romaji: "Eien", pt: "Eternidade", meaning: "A vontade de continuar cuidando de você pelo tempo que o tempo durar." },
    { kanji: "繋がり", romaji: "Tsunagari", pt: "Conexão profunda", meaning: "O laço invisível que nos mantém próximos a cada instante." }
  ],

  // ==========================================
  // 11. SURPRESA FINAL (O GRANDE CIRCUITO)
  // ==========================================
  surprise: {
    badge: "Surpresa Especial",
    title: "O Grande Circuito do Nosso Universo",
    subtitle: "Puxe a alavanca para fechar o circuito e iluminar todas as estrelas",
    switchLabel: "Conectar Polos & Acender Nosso Amor",
    sparkMessage: "⚡ Conexão estabelecida com 100% de eficiência!",
    pledgeTitle: "Para Sempre Isabelly & Vinícius",
    pledgeText: "Isabelly, você é a faísca mais brilhante e a certeza mais doce da minha vida. Obrigado por construir esse pequeno universo comigo. Que a nossa energia nunca se esgote!",
    replayLabel: "Iluminar Novamente ✨"
  },

  // ==========================================
  // 12. EASTER EGG FINAL: "EU TE AMO S2"
  // Desbloqueado quando completar as descobertas
  // ==========================================
  easterEgg: {
    title: "Eu te amo S2",
    badge: "Segredo Supremo Desbloqueado 💖",
    japaneseQuote: "心から愛しています (Kokoro kara aishiteimasu) — Te amo do fundo do meu coração",
    message: "Isabelly, você explorou cada cantinho, cada carta de tarot e cada detalhe do nosso universo... Mas a verdade mais simples, verdadeira e infinita de todas é essa: Eu te amo S2. Hoje, amanhã e em cada segundo que a vida nos der.",
    signature: "Com todo o meu amor, Vinícius (LIM4O)"
  }
};

window.CONFIG = CONFIG;
