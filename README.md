# Nosso Pequeno Universo ❤️
### Uma homenagem de Vinícius (LIM4O) para Isabelly Lavigne

Um site romântico, interativo e sofisticado desenvolvido como uma homenagem exclusiva e pessoal de **Vinícius (LIM4O)** para **Isabelly Lavigne**. O projeto une narrativa poética, memórias reais, músicas, cartas secretas, referências sutis ao universo da física e eletricidade, expressivas citações em japonês e a presença carinhosa do mascote oficial do casal, o gato **Niko**.

---

## 🌟 Destaques do Projeto

1. **Abertura Cinematográfica**:
   - Apresentação visual imersiva dedicada a Isabelly, com estrelas, constelações e a frase tradicional japonesa *運命 (Unmei — Destino)*.
   - Badge com a data inicial das conversas no Discord: `08/03/2026`.

2. **Apresentação de Isabelly e Vinícius**:
   - Cards sofisticados com estética glassmorphism e paleta nobre (vinho, preto obsidiana, rosa delicado e toques elétricos).
   - Ponte de conexão interativa com corrente elétrica contínua e um orbe de ressonância clicável.

3. **Nossa História & Metáforas de Eletricidade**:
   - Narrativa verdadeira e romântica sobre o início pelo Discord em 08/03/2026.
   - Metáforas sutis de circuitos elétricos (*Diferença de Potencial, Circuito Fechado, Ressonância, Campo Magnético*), simbolizando que a atração e o carinho mútuo operam como uma força natural indispensável.

4. **Linha do Tempo Interativa**:
   - Marco inicial verificado: **08/03/2026 — Nossa primeira conversa pelo Discord**.
   - Estrutura pronta e dinâmica para novos acontecimentos configuráveis diretamente no arquivo de configuração.

5. **Contador em Tempo Real**:
   - Título explícito: *"Desde a nossa primeira conversa."*
   - Contagem precisa de **dias, horas, minutos e segundos** decorridos.
   - Indicadores carinhosos de horas iluminadas, batimentos cardíacos sincronizados e ciclos de frequência.

6. **Carta Romântica com Lacre de Cera 3D**:
   - Lacre de cera vermelho com o monograma "V & I" que se rompe com efeito sonoro ao toque.
   - Pergaminho que se desdobra suavemente com tipografia clássica e texto romântico autoral.

7. **Player Dedicado de "Glue Song" (beabadoobee)**:
   - Toca-discos em vinil animado com tampa de álbum e agulha.
   - Letra e citações da música com tradução.
   - Sintetizador sonoro integrado em Web Audio API: mesmo antes de você baixar o arquivo MP3, o player toca uma melodia suave em piano/chimes românticos para que a experiência nunca falhe!

8. **Playlist Completa com MP3s Locais**:
   - Controle total: Play, Pause, Próxima, Anterior, Repetição (uma / todas), Modo Aleatório, Barra de Progresso arrastável e Volume.
   - Visualizador de ondas de áudio em tempo real renderizado em Canvas.

9. **Galeria de Fotografias Reais**:
   - Grade responsiva com filtros de categorias (*Momentos, Isabelly, Niko, Memórias*).
   - Modal Lightbox com zoom, navegação por setas (teclado e botões) e legendas poéticas.
   - Espaços reservados elegantes prontos para você adicionar suas fotos reais.

10. **Cartas & Mensagens Secretas**:
    - Envelopes em cera, cápsula elétrica, corações de origami, pétalas de cerejeira (sakura), recados do Niko e estrelas cadentes.
    - Cada item abre uma mensagem romântica exclusiva.

11. **Presença Especial do Gato Niko 🐾**:
    - Gatinho animado com movimentos fluidos, orelhas expressivas, rabo animado e olhos vivos.
    - Brinca com um fio elétrico estilizado e persegue faíscas de luz.
    - Ao receber carinho (clique), ronrona, solta corações e exibe balões de fala com pensamentos fofos.
    - Barra de controle flutuante: permite fazer carinho, colocar em modo soneca ou chamá-lo de volta sem atrapalhar a navegação ou leitura.
    - Estrutura preparada para trocar a ilustração por uma foto real do Niko.

12. **Surpresa Final — O Grande Circuito**:
    - Alavanca estilizada de acionamento elétrico (*Knife Switch*).
    - Ao fechar o circuito, dispara efeitos de luz, faíscas estelares, chuva de corações e revela uma declaração solene.

---

## 📁 Estrutura de Arquivos

```
Isa Lavigne/
├── index.html                           # Estrutura principal e semântica HTML5
├── README.md                            # Guia completo e instruções
├── assets/
│   ├── css/
│   │   ├── style.css                    # Variáveis de design, reset e layout base
│   │   ├── electricity.css              # Linhas de circuito, nós e alavanca elétrica
│   │   ├── components.css               # Hero, player, timeline, galeria, cartas
│   │   ├── niko.css                     # Animações, balão de fala e mascot controller
│   │   └── responsive.css               # Otimização para celulares e tablets
│   ├── js/
│   │   ├── config.js                    # ARQUIVO CENTRAL DE PERSONALIZAÇÃO
│   │   ├── app.js                       # Controlador principal e orquestrador
│   │   ├── counter.js                   # Contador de tempo em tempo real
│   │   ├── player.js                    # Player de música e sintetizador sonoro
│   │   ├── timeline.js                  # Linha do tempo dinâmica
│   │   ├── gallery.js                   # Galeria de fotos e modal lightbox
│   │   ├── secrets.js                   # Mensagens secretas e revelações
│   │   ├── niko.js                      # Inteligência e comportamentos do Niko
│   │   ├── circuits.js                  # Canvas de partículas estelares e circuitos
│   │   └── surprise.js                  # Efeitos da surpresa final e alavanca
│   ├── images/
│   │   ├── gallery/                     # Fotos reais ou ilustrações
│   │   ├── niko/                        # Ilustração vetorial e foto do Niko
│   │   ├── covers/                      # Capas de álbuns (Glue Song, etc.)
│   │   └── icons/                       # Selos de cera, avatares e ícones
│   └── audio/
│       └── songs/                       # Pasta onde colocar o glue-song.mp3
```

---

## 🛠️ Como Personalizar o Site (Muito Fácil!)

Todas as informações editáveis estão centralizadas em um único arquivo: **`assets/js/config.js`**.

Você não precisa mexer em lógica de programação complexa. Basta abrir o `config.js` em qualquer editor de texto (como VS Code ou Bloco de Notas) e modificar:

### 1. Adicionar suas Músicas
1. Coloque o arquivo de áudio da música **Glue Song** na pasta:
   `assets/audio/songs/glue-song.mp3`
2. Para adicionar mais faixas, coloque os arquivos MP3 na mesma pasta e edite a lista `playlist` no `config.js`.

### 2. Adicionar suas Fotografias Reais
1. Copie suas fotos para a pasta:
   `assets/images/gallery/`
2. No `config.js`, na seção `gallery`, aponte para o nome do seu arquivo (ex: `assets/images/gallery/minha-foto.jpg`).
3. Altere o título e a legenda carinhosa.

### 3. Foto Real do Gato Niko
Se quiser que o Niko apareça com uma foto real dele:
1. Salve a foto dele como `assets/images/niko/niko-real.jpg`.
2. No `config.js`, na seção `niko`, descomente a linha:
   `customPhoto: "assets/images/niko/niko-real.jpg"`

### 4. Adicionar Novos Acontecimentos na Linha do Tempo
Basta acrescentar um novo objeto na lista `timeline` do `config.js` com a data, título e descrição do momento especial de vocês!

---

## 🚀 Como Publicar Gratuitamente no GitHub Pages

Este site foi desenvolvido com tecnologias puras (**HTML5, CSS3 e JavaScript puro**), sem depender de servidores Node.js, PHP ou bancos de dados. Por isso, funciona perfeitamente e de forma 100% gratuita no **GitHub Pages**:

1. Crie uma conta no [GitHub](https://github.com/) (se ainda não tiver).
2. Crie um novo repositório público chamado, por exemplo: `nosso-pequeno-universo` ou `isabelly`.
3. Faça o upload de todos os arquivos desta pasta para a raiz do repositório (o arquivo `index.html` deve ficar na raiz principal).
4. No seu repositório no GitHub, clique em **Settings** (Configurações) ➔ no menu lateral esquerdo, clique em **Pages**.
5. Em **Branch**, selecione `main` (ou `master`) e a pasta `/(root)`. Clique em **Save**.
6. Aguarde cerca de 1 a 2 minutos. O GitHub fornecerá um link público seguro com HTTPS (exemplo: `https://seu-usuario.github.io/nosso-pequeno-universo/`).
7. Envie o link para a Isabelly e prepare-se para ver o sorriso dela! ❤️

---

## 💻 Teste Local Imediato

Para visualizar no seu computador agora mesmo:
- Dê dois cliques no arquivo `index.html` para abrir diretamente no seu navegador padrão (Chrome, Edge, Firefox, Safari).
- Ou, caso utilize o XAMPP onde a pasta já se encontra (`c:\xampp\htdocs\sites\Isa Lavigne`), inicie o Apache e acesse:
  `http://localhost/sites/Isa%20Lavigne/`

---

*Com amor, respeito e admiração sincera por Isabelly Lavigne.*  
*二人の物語 • 永遠に (A história de nós dois • Para sempre)*

