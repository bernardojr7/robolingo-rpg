window.Robolingo = (() => {
  const THEMES = {
    games: { label: '🎮 Games & Tech', npcName: 'Mentor Axel (Games)' },
    manga: { label: '📚 HQs & Mangá', npcName: 'Sensei Kenji (Mangá)' },
    cooking: { label: '🍔 Culinária', npcName: 'Chef Mia (Culinária)' },
    fashion: { label: '👟 Moda & Estilo', npcName: 'Stylist Chloe (Moda)' },
    science: { label: '🔬 Ciências', npcName: 'Dr. Nova (Ciências)' },
    movies: { label: '🎬 Filmes & Séries', npcName: 'Diretor Leo (Cinema)' },
    reading: { label: '📖 Leitura', npcName: 'Mestra Clara (Livros)' }
  }

  const QUESTIONS = {
    games: {
      1: [
        {
          en: 'Press start to begin your new quest!',
          pt: "O que significa 'new quest' na frase acima?",
          options: ['Nova missão', 'Novo controle', 'Tela pausada'],
          correct: 0,
          tip: "'Quest' é muito usado em RPGs para significar missão ou jornada."
        },
        {
          en: 'Collect the golden coins to unlock the next level.',
          pt: "Qual é o objetivo da frase em inglês?",
          options: [
            'Coletar moedas douradas para desbloquear o próximo nível',
            'Vender a espada antes da batalha',
            'Salvar o jogo e sair'
          ],
          correct: 0,
          tip: "'Unlock' = desbloquear | 'Next level' = próximo nível."
        }
      ],
      2: [
        {
          en: 'Your character needs more stamina before crossing the river.',
          pt: "Por que o personagem deve esperar antes de atravessar o rio?",
          options: [
            'Precisa de mais energia/vigor (stamina)',
            'Perdeu o mapa da vila',
            'Está sem moedas na mochila'
          ],
          correct: 0,
          tip: "'Stamina' indica fôlego ou energia para correr e agir."
        }
      ],
      3: [
        {
          en: 'Although the boss looked invincible, we discovered its weak spot.',
          pt: "Qual é a ideia principal dessa frase?",
          options: [
            'Embora o chefe parecesse invencível, descobrimos seu ponto fraco',
            'O chefe fugiu antes da batalha começar',
            'Precisamos reiniciar a fase desde o início'
          ],
          correct: 0,
          tip: "'Although' = embora | 'Weak spot' = ponto fraco."
        }
      ]
    },
    manga: {
      1: [
        {
          en: 'The young hero trains every morning to protect the village.',
          pt: "O que o jovem herói faz todas as manhãs?",
          options: [
            'Treina para proteger a vila',
            'Dorme até o meio-dia',
            'Viaja de trem para a capital'
          ],
          correct: 0,
          tip: "'Every morning' = todas as manhãs | 'Protect' = proteger."
        },
        {
          en: 'Read the speech bubble from right to left!',
          pt: "O que 'speech bubble' significa nos mangás?",
          options: ['Balão de fala', 'Capa colorida', 'Capítulo final'],
          correct: 0,
          tip: "'Speech' = fala | 'Bubble' = bolha/balão."
        }
      ],
      2: [
        {
          en: 'This special edition volume includes exclusive character sketches.',
          pt: "O que vem incluído nesta edição especial?",
          options: [
            'Rascunhos exclusivos dos personagens',
            'Um pôster gigante dobrável',
            'Adesivos brilhantes'
          ],
          correct: 0,
          tip: "'Sketches' significa esboços ou rascunhos desenhados."
        }
      ],
      3: [
        {
          en: 'Despite facing a stronger rival, she never gave up on her dream.',
          pt: "Qual atitude a personagem demonstrou?",
          options: [
            'Apesar de enfrentar uma rival mais forte, ela nunca desistiu do sonho',
            'Ela desistiu do torneio na primeira rodada',
            'Ela trocou de equipe durante a final'
          ],
          correct: 0,
          tip: "'Despite' = apesar de | 'Gave up' = desistiu."
        }
      ]
    },
    cooking: {
      1: [
        {
          en: 'Add two eggs, flour, and milk to the bowl.',
          pt: "Quais ingredientes vão na tigela ('bowl')?",
          options: [
            'Dois ovos, farinha e leite',
            'Açúcar, manteiga e limão',
            'Arroz, feijão e sal'
          ],
          correct: 0,
          tip: "'Flour' = farinha | 'Bowl' = tigela."
        },
        {
          en: 'The fresh bread smells delicious!',
          pt: "O que a frase diz sobre o pão fresco?",
          options: [
            'Tem um cheiro delicioso',
            'Está muito quente para cortar',
            'Acabou de cair no chão'
          ],
          correct: 0,
          tip: "'Smells delicious' = tem um cheiro delicioso."
        }
      ],
      2: [
        {
          en: 'Preheat the oven for ten minutes before baking the cake.',
          pt: "O que significa 'Preheat the oven'?",
          options: [
            'Pré-aquecer o forno',
            'Limpar a forma de bolo',
            'Misturar a cobertura'
          ],
          correct: 0,
          tip: "'Oven' = forno | 'Baking' = assar."
        }
      ],
      3: [
        {
          en: 'Stir the sauce constantly so it does not burn at the bottom.',
          pt: "Por que é preciso mexer o molho constantemente?",
          options: [
            'Para não queimar no fundo',
            'Para esfriar mais rápido',
            'Para mudar a cor do prato'
          ],
          correct: 0,
          tip: "'Stir' = mexer | 'Burn' = queimar."
        }
      ]
    },
    fashion: {
      1: [
        {
          en: 'She is wearing a blue jacket and white sneakers.',
          pt: "O que ela está vestindo?",
          options: [
            'Jaqueta azul e tênis brancos',
            'Vestido vermelho e botas',
            'Camiseta verde e boné'
          ],
          correct: 0,
          tip: "'Sneakers' = tênis | 'Wearing' = vestindo/usando."
        }
      ],
      2: [
        {
          en: 'Vintage outfits are becoming popular again this season.',
          pt: "O que está ficando popular novamente nesta estação?",
          options: [
            'Roupas estilo retrô/vintage',
            'Mochilas transparentes',
            'Relógios de bolso'
          ],
          correct: 0,
          tip: "'Outfits' = trajes/looks | 'Season' = estação/temporada."
        }
      ],
      3: [
        {
          en: 'Sustainable fashion focuses on eco-friendly fabrics and fair production.',
          pt: "Em que a moda sustentável se concentra?",
          options: [
            'Tecidos ecológicos e produção justa',
            'Roupas descartáveis baratas',
            'Apenas desfiles de luxo'
          ],
          correct: 0,
          tip: "'Fabrics' = tecidos | 'Fair' = justa."
        }
      ]
    },
    science: {
      1: [
        {
          en: 'Earth orbits around the Sun once every year.',
          pt: "O que a frase afirma sobre a Terra?",
          options: [
            'A Terra orbita ao redor do Sol uma vez por ano',
            'A Lua é maior que o Sol',
            'O Sol gira ao redor da Terra'
          ],
          correct: 0,
          tip: "'Earth' = Terra | 'Once every year' = uma vez por ano."
        }
      ],
      2: [
        {
          en: 'Water boils at one hundred degrees Celsius at sea level.',
          pt: "O que acontece com a água a 100 graus Celsius?",
          options: ['Ela ferve', 'Ela congela', 'Ela vira cristal'],
          correct: 0,
          tip: "'Boils' = ferve | 'Sea level' = nível do mar."
        }
      ],
      3: [
        {
          en: 'Plants convert sunlight into chemical energy through photosynthesis.',
          pt: "Como as plantas convertem luz solar em energia química?",
          options: [
            'Através da fotossíntese',
            'Através da evaporação',
            'Através da gravidade'
          ],
          correct: 0,
          tip: "'Sunlight' = luz solar | 'Through' = através de."
        }
      ]
    },
    movies: {
      1: [
        {
          en: 'The movie starts at seven o’clock. Don’t forget the popcorn!',
          pt: "O que não se deve esquecer antes do filme começar?",
          options: ['A pipoca', 'O guarda-chuva', 'O fone de ouvido'],
          correct: 0,
          tip: "'Popcorn' = pipoca | 'Don't forget' = não se esqueça."
        }
      ],
      2: [
        {
          en: 'The soundtrack made the final scene even more emotional.',
          pt: "O que tornou a cena final ainda mais emocionante?",
          options: ['A trilha sonora', 'Os efeitos de chuva', 'Os créditos finais'],
          correct: 0,
          tip: "'Soundtrack' = trilha sonora | 'Scene' = cena."
        }
      ],
      3: [
        {
          en: 'The plot twist at the end surprised the entire audience.',
          pt: "O que surpreendeu toda a plateia no final?",
          options: [
            'A reviravolta na história (plot twist)',
            'A falta de energia no cinema',
            'O atraso da sessão'
          ],
          correct: 0,
          tip: "'Plot twist' = reviravolta no enredo | 'Audience' = plateia."
        }
      ]
    },
    reading: {
      1: [
        {
          en: 'I love reading adventure stories before going to sleep.',
          pt: "Que tipo de histórias a pessoa gosta de ler antes de dormir?",
          options: [
            'Histórias de aventura',
            'Receitas de bolo',
            'Manuais de computador'
          ],
          correct: 0,
          tip: "'Adventure stories' = histórias de aventura."
        }
      ],
      2: [
        {
          en: 'The library is a quiet place where you can borrow books for free.',
          pt: "O que você pode fazer gratuitamente na biblioteca?",
          options: [
            'Pegar livros emprestados',
            'Comprar videogames',
            'Assistir a shows ao vivo'
          ],
          correct: 0,
          tip: "'Borrow' = pegar emprestado | 'For free' = de graça."
        }
      ],
      3: [
        {
          en: 'A well-written chapter leaves the reader eager to turn the page.',
          pt: "Qual efeito um capítulo bem escrito causa no leitor?",
          options: [
            'Deixa o leitor ansioso para virar a página',
            'Faz o leitor fechar o livro imediatamente',
            'Confunde o final da história'
          ],
          correct: 0,
          tip: "'Eager' = ansioso/entusiasmado | 'Turn the page' = virar a página."
        }
      ]
    }
  }

  const SHOP_ITEMS = [
    { id: 'cap', name: '🧢 Boné Azul', price: 0, desc: 'Boné clássico da Academia' },
    { id: 'headset', name: '🎧 Headset Neon', price: 25, desc: 'Fone gamer para ouvir inglês' },
    { id: 'glasses', name: '🕶️ Óculos Pixel', price: 45, desc: 'Estilo lendário na vila' },
    { id: 'crown', name: '👑 Coroa de Ouro', price: 80, desc: 'Para mestres do vocabulário' },
    { id: 'aura', name: '✨ Aura Dourada', price: 120, desc: 'Brilho especial ao caminhar' }
  ]

  const CLASSMATES = [
    { name: 'Ana Clara', theme: '📚 HQs & Mangá', xp: 240 },
    { name: 'Lucas M.', theme: '🎮 Games & Tech', xp: 185 },
    { name: 'Gabriel S.', theme: '🔬 Ciências', xp: 130 },
    { name: 'Mariana R.', theme: '🎬 Filmes & Séries', xp: 90 }
  ]

  const STORAGE_KEY = 'robolingo_rpg_save_v1'

  let state = {
    registered: false,
    name: 'Explorador',
    theme: 'games',
    level: 1,
    xp: 0,
    coins: 20,
    owned: ['cap'],
    equipped: 'cap',
    solvedCount: 0
  }

  let currentQuestion = null
  let questionAnswered = false

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        state = { ...state, ...JSON.parse(raw) }
      }
    } catch (e) {
      console.warn('Erro ao carregar progresso local:', e)
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn('Erro ao salvar progresso local:', e)
    }
    updateHUD()
  }

  function playTone(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      if (type === 'win') {
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(523.25, ctx.currentTime)
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1)
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2)
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45)
        osc.start()
        osc.stop(ctx.currentTime + 0.45)
      } else if (type === 'wrong') {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(190, ctx.currentTime)
        osc.frequency.setValueAtTime(145, ctx.currentTime + 0.15)
        gain.gain.setValueAtTime(0.12, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
        osc.start()
        osc.stop(ctx.currentTime + 0.35)
      } else {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(660, ctx.currentTime)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
        osc.start()
        osc.stop(ctx.currentTime + 0.12)
      }
    } catch (_) {}
  }

  function speakEnglish(text, rate = 0.92) {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'
    utter.rate = rate
    const voices = window.speechSynthesis.getVoices()
    const enVoice =
      voices.find((v) => v.lang === 'en-US' && v.name.includes('Google')) ||
      voices.find((v) => v.lang.startsWith('en'))
    if (enVoice) utter.voice = enVoice
    window.speechSynthesis.speak(utter)
  }

  function updateHUD() {
    const hudName = document.getElementById('hudPlayerName')
    const hudMeta = document.getElementById('hudPlayerMeta')
    const hudXp = document.getElementById('hudXp')
    const hudCoins = document.getElementById('hudCoins')

    if (!hudName) return
    const themeInfo = THEMES[state.theme] || THEMES.games
    hudName.textContent = state.name
    hudMeta.textContent = `Nv.${state.level} • ${themeInfo.label}`
    hudXp.textContent = `${state.xp} XP`
    hudCoins.textContent = `${state.coins}`
  }

  function isModalOpen() {
    const login = document.getElementById('loginModal')
    const mission = document.getElementById('missionModal')
    const shop = document.getElementById('shopModal')
    const rank = document.getElementById('rankModal')
    return (
      (login && login.style.display === 'flex') ||
      (mission && mission.style.display === 'flex') ||
      (shop && shop.style.display === 'flex') ||
      (rank && rank.style.display === 'flex')
    )
  }

  function closeAllModals() {
    ;['missionModal', 'shopModal', 'rankModal'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) el.style.display = 'none'
    })
    if (typeof battle !== 'undefined') {
      battle.initiated = false
    }
  }

  function openLoginModal() {
    const modal = document.getElementById('loginModal')
    if (!modal) return
    document.getElementById('inputStudentName').value =
      state.name !== 'Explorador' ? state.name : ''
    document.getElementById('selectStudentTheme').value = state.theme
    document.getElementById('selectStudentLevel').value = String(state.level)
    modal.style.display = 'flex'
  }

  function submitLogin() {
    const nameInput = document.getElementById('inputStudentName').value.trim()
    const themeVal = document.getElementById('selectStudentTheme').value
    const levelVal = Number(document.getElementById('selectStudentLevel').value) || 1

    state.name = nameInput || 'Explorador'
    state.theme = themeVal
    state.level = levelVal
    state.registered = true
    saveState()
    playTone('win')

    document.getElementById('loginModal').style.display = 'none'
    if (typeof audio !== 'undefined' && audio.Map && !audio.Map.playing()) {
      audio.Map.play()
    }
  }

  function getRandomQuestion() {
    const themeBank = QUESTIONS[state.theme] || QUESTIONS.games
    const levelBank = themeBank[state.level] || themeBank[1]
    return levelBank[Math.floor(Math.random() * levelBank.length)]
  }

  function openMission(source = 'hud') {
    closeAllModals()
    if (typeof battle !== 'undefined') {
      battle.initiated = true
    }

    currentQuestion = getRandomQuestion()
    questionAnswered = false

    const themeInfo = THEMES[state.theme] || THEMES.games
    const badge = document.getElementById('missionSourceBadge')
    const enText = document.getElementById('missionEnText')
    const ptText = document.getElementById('missionPtText')
    const optionsBox = document.getElementById('missionOptions')
    const feedback = document.getElementById('missionFeedback')

    if (source === 'grass') {
      badge.textContent = '⚡ ENCONTRO NA GRAMA • DESAFIO BÔNUS'
      badge.style.background = '#15803d'
    } else if (source === 'npc') {
      badge.textContent = `💬 ${themeInfo.npcName.toUpperCase()}`
      badge.style.background = '#1d4ed8'
    } else {
      badge.textContent = `🎯 MISSÃO • ${themeInfo.label.toUpperCase()}`
      badge.style.background = '#7e22ce'
    }

    enText.textContent = `"${currentQuestion.en}"`
    ptText.textContent = currentQuestion.pt
    feedback.style.display = 'none'
    feedback.innerHTML = ''
    optionsBox.innerHTML = ''

    currentQuestion.options.forEach((opt, idx) => {
      const btn = document.createElement('button')
      btn.className = 'robo-option-btn'
      btn.textContent = `${['A', 'B', 'C'][idx]}) ${opt}`
      btn.onclick = () => handleAnswer(idx, btn, source)
      optionsBox.appendChild(btn)
    })

    document.getElementById('missionModal').style.display = 'flex'
    setTimeout(() => speakEnglish(currentQuestion.en, 0.92), 250)
  }

  function handleAnswer(selectedIdx, btnEl, source) {
    if (questionAnswered) return
    questionAnswered = true

    const feedback = document.getElementById('missionFeedback')
    const allBtns = document.querySelectorAll('.robo-option-btn')
    allBtns.forEach((b, i) => {
      b.disabled = true
      if (i === currentQuestion.correct) {
        b.style.background = '#16a34a'
        b.style.color = '#fff'
        b.style.borderColor = '#bbf7d0'
      }
    })

    if (selectedIdx === currentQuestion.correct) {
      const bonus = source === 'grass' ? 5 : 0
      const earnedXp = 20 + state.level * 10
      const earnedCoins = 10 + state.level * 5 + bonus

      state.xp += earnedXp
      state.coins += earnedCoins
      state.solvedCount += 1

      if (state.xp >= state.level * 120 && state.level < 3) {
        state.level += 1
      }

      saveState()
      playTone('win')

      feedback.style.display = 'block'
      feedback.style.background = '#052e16'
      feedback.style.borderColor = '#22c55e'
      feedback.innerHTML = `
        <div style="color:#4ade80; margin-bottom:6px;">✅ EXCELENTE! +${earnedXp} XP e +${earnedCoins} EduCoins!</div>
        <div style="color:#e2e8f0; font-size:9px; line-height:1.5;">💡 ${currentQuestion.tip}</div>
      `
    } else {
      btnEl.style.background = '#dc2626'
      btnEl.style.color = '#fff'
      playTone('wrong')

      feedback.style.display = 'block'
      feedback.style.background = '#450a0a'
      feedback.style.borderColor = '#ef4444'
      feedback.innerHTML = `
        <div style="color:#fca5a5; margin-bottom:6px;">❌ QUASE LÁ! Veja a resposta verde acima.</div>
        <div style="color:#e2e8f0; font-size:9px; line-height:1.5;">💡 ${currentQuestion.tip}</div>
      `
    }
  }

  function openShop() {
    closeAllModals()
    if (typeof battle !== 'undefined') battle.initiated = true

    const list = document.getElementById('shopItemsList')
    document.getElementById('shopBalance').textContent = `Saldo: 🪙 ${state.coins} EduCoins`
    list.innerHTML = ''

    SHOP_ITEMS.forEach((item) => {
      const owned = state.owned.includes(item.id)
      const equipped = state.equipped === item.id

      const card = document.createElement('div')
      card.className = 'robo-shop-card'
      card.innerHTML = `
        <div>
          <div style="font-size:10px; color:#f8fafc; margin-bottom:4px;">${item.name}</div>
          <div style="font-size:8px; color:#94a3b8; line-height:1.4;">${item.desc}</div>
        </div>
        <button class="robo-mini-btn" style="background:${
          equipped ? '#16a34a' : owned ? '#2563eb' : '#d97706'
        }">
          ${equipped ? 'Equipado' : owned ? 'Equipar' : `🪙 \${item.price}`}
        </button>
      `
      card.querySelector('button').onclick = () => {
        if (owned) {
          state.equipped = item.id
          saveState()
          playTone('click')
          openShop()
        } else if (state.coins >= item.price) {
          state.coins -= item.price
          state.owned.push(item.id)
          state.equipped = item.id
          saveState()
          playTone('win')
          openShop()
        } else {
          playTone('wrong')
          alert('EduCoins insuficientes! Complete mais missões de inglês na vila.')
        }
      }
      list.appendChild(card)
    })

    document.getElementById('shopModal').style.display = 'flex'
  }

  function openRanking() {
    closeAllModals()
    if (typeof battle !== 'undefined') battle.initiated = true

    const themeInfo = THEMES[state.theme] || THEMES.games
    const combined = [
      ...CLASSMATES,
      { name: `${state.name} (Você)`, theme: themeInfo.label, xp: state.xp, isMe: true }
    ].sort((a, b) => b.xp - a.xp)

    const list = document.getElementById('rankingList')
    list.innerHTML = ''

    combined.forEach((entry, idx) => {
      const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`
      const row = document.createElement('div')
      row.className = 'robo-rank-row'
      if (entry.isMe) {
        row.style.borderColor = '#facc15'
        row.style.background = '#1e293b'
      }
      row.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px;">${medal}</span>
          <div>
            <div style="font-size:10px; color:${entry.isMe ? '#facc15' : '#f8fafc'};">${entry.name}</div>
            <div style="font-size:8px; color:#94a3b8; margin-top:3px;">${entry.theme}</div>
          </div>
        </div>
        <div style="font-size:10px; color:#38bdf8;">${entry.xp} XP</div>
      `
      list.appendChild(row)
    })

    document.getElementById('rankModal').style.display = 'flex'
  }

  function drawPlayerCosmetics(ctx, playerObj) {
    if (!playerObj || !playerObj.position) return
    const x = playerObj.position.x
    const y = playerObj.position.y
    const w = playerObj.width || 48
    const h = playerObj.height || 68

    ctx.save()

    // Aura Dourada
    if (state.equipped === 'aura') {
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.ellipse(x + w / 2, y + h - 8, 22, 10, 0, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Acessórios na cabeça
    if (state.equipped === 'cap') {
      ctx.fillStyle = '#2563eb'
      ctx.fillRect(x + 12, y + 4, 24, 8)
      ctx.fillStyle = '#60a5fa'
      ctx.fillRect(x + 16, y + 10, 20, 4)
    } else if (state.equipped === 'crown') {
      ctx.fillStyle = '#facc15'
      ctx.fillRect(x + 14, y + 2, 20, 7)
      ctx.fillRect(x + 14, y - 3, 4, 5)
      ctx.fillRect(x + 22, y - 4, 4, 6)
      ctx.fillRect(x + 30, y - 3, 4, 5)
    } else if (state.equipped === 'headset') {
      ctx.fillStyle = '#a855f7'
      ctx.fillRect(x + 11, y + 4, 26, 4)
      ctx.fillStyle