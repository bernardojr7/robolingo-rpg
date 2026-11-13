window.Robolingo = (() => {
  const TEACHER_PIN = "RT26"
  const SALT = "ROBOLINGO_EDU_2026"

  const THEMES = {
    games: {
      label: "🎮 Games & Tech",
      npcName: "Mentor Axel",
      shortTag: "🎮 Axel",
      hatColor: "#2563eb",
      accentColor: "#38bdf8",
      outfitColor: "#1d4ed8",
      hairColor: "#06b6d4",
      skinColor: "#f8c9a0",
      spriteType: "villager",
      introEn: "Welcome to my zone! Ready to level up your English?",
      introPt:
        "E aí, {name}! Pronto para dar um <span class='jrpg-kw'>level up</span> no seu inglês com <span class='jrpg-kw'>quests</span> de Games & Tech?",
      replyEn: "Yes! Let's start the quest!",
      replyPt:
        "Com certeza! <span class='jrpg-kw'>Let's start</span> o desafio agora mesmo!"
    },
    manga: {
      label: "📚 HQs & Mangá",
      npcName: "Sensei Kenji",
      shortTag: "📚 Kenji",
      hatColor: "#dc2626",
      accentColor: "#f87171",
      outfitColor: "#991b1b",
      hairColor: "#1e293b",
      skinColor: "#f3c19d",
      spriteType: "villager",
      introEn: "True heroes train every day! Shall we read the next chapter?",
      introPt:
        "Verdadeiros heróis treinam todo dia, {name}! Vamos ler o próximo <span class='jrpg-kw'>chapter</span> juntos?",
      replyEn: "I am ready, Sensei!",
      replyPt:
        "Estou pronto! <span class='jrpg-kw'>Never give up</span>!"
    },
    cooking: {
      label: "🍔 Culinária",
      npcName: "Chef Mia",
      shortTag: "🍔 Mia",
      hatColor: "#f8fafc",
      accentColor: "#fb923c",
      outfitColor: "#ea580c",
      hairColor: "#92400e",
      skinColor: "#f8c9a0",
      spriteType: "villager",
      introEn: "Something smells delicious! Let's cook up new English words.",
      introPt:
        "Algo <span class='jrpg-kw'>smells delicious</span> por aqui, {name}! Vamos preparar novas palavras em inglês?",
      replyEn: "Sounds delicious! Let's cook!",
      replyPt:
        "Parece ótimo, Chef! <span class='jrpg-kw'>Let's go</span>!"
    },
    fashion: {
      label: "👟 Moda & Estilo",
      npcName: "Stylist Chloe",
      shortTag: "👟 Chloe",
      hatColor: "#db2777",
      accentColor: "#f472b6",
      outfitColor: "#be185d",
      hairColor: "#ec4899",
      skinColor: "#e0a370",
      spriteType: "villager",
      introEn: "Style is how you express yourself! Ready for a fashion challenge?",
      introPt:
        "Estilo é como você <span class='jrpg-kw'>express yourself</span>, {name}! Bora encarar um desafio de moda?",
      replyEn: "Totally! Show me the challenge!",
      replyPt:
        "Com certeza! <span class='jrpg-kw'>Awesome</span>, vamos nessa!"
    },
    science: {
      label: "🔬 Ciências",
      npcName: "Dr. Nova",
      shortTag: "🔬 Dr. Nova",
      hatColor: "#059669",
      accentColor: "#34d399",
      outfitColor: "#f8fafc",
      hairColor: "#cbd5e1",
      skinColor: "#f1c29b",
      spriteType: "oldMan",
      introEn: "Every discovery begins with curiosity! Ready for an experiment?",
      introPt:
        "Toda descoberta começa com <span class='jrpg-kw'>curiosity</span>, {name}! Pronto para um experimento em inglês?",
      replyEn: "Ready for science, Doctor!",
      replyPt:
        "Pronto para a ciência! <span class='jrpg-kw'>Let's explore</span>!"
    },
    movies: {
      label: "🎬 Filmes & Séries",
      npcName: "Diretor Leo",
      shortTag: "🎬 Leo",
      hatColor: "#d97706",
      accentColor: "#facc15",
      outfitColor: "#1e293b",
      hairColor: "#78350f",
      skinColor: "#d99b66",
      spriteType: "oldMan",
      introEn: "Lights, camera, action! Your English scene is about to begin.",
      introPt:
        "<span class='jrpg-kw'>Lights, camera, action</span>, {name}! Sua próxima cena em inglês vai começar.",
      replyEn: "Action! I'm ready for my scene!",
      replyPt:
        "<span class='jrpg-kw'>Action!</span> Estou pronto para gravar!"
    },
    reading: {
      label: "📖 Leitura",
      npcName: "Mestra Clara",
      shortTag: "📖 Clara",
      hatColor: "#7c3aed",
      accentColor: "#c084fc",
      outfitColor: "#5b21b6",
      hairColor: "#f1f5f9",
      skinColor: "#f8c9a0",
      spriteType: "oldMan",
      introEn: "Books open doors to magical worlds. Shall we turn the page?",
      introPt:
        "Os livros abrem portas para <span class='jrpg-kw'>magical worlds</span>, {name}. Vamos virar a página?",
      replyEn: "Yes! Let's turn the page!",
      replyPt:
        "Sim! <span class='jrpg-kw'>Turn the page</span> agora!"
    }
  }

  const AVATAR_OPTIONS = {
    hair: [
      { id: "brown", name: "Castanho", color: "#5c3a21" },
      { id: "black", name: "Preto", color: "#1e293b" },
      { id: "blonde", name: "Loiro", color: "#eab308" },
      { id: "silver", name: "Branco", color: "#e2e8f0" },
      { id: "cyan", name: "Azul Neon", color: "#06b6d4" },
      { id: "pink", name: "Rosa", color: "#ec4899" }
    ],
    outfit: [
      { id: "blue", name: "Azul", color: "#2563eb" },
      { id: "red", name: "Vermelho", color: "#dc2626" },
      { id: "green", name: "Verde", color: "#16a34a" },
      { id: "purple", name: "Roxo", color: "#7c3aed" },
      { id: "gold", name: "Dourado", color: "#d97706" },
      { id: "dark", name: "Grafite", color: "#334155" }
    ],
    skin: [
      { id: "light", name: "Claro", color: "#f8c9a0" },
      { id: "warm", name: "Médio", color: "#eab07e" },
      { id: "tan", name: "Moreno", color: "#c68642" },
      { id: "deep", name: "Retinto", color: "#8d5524" }
    ]
  }

  const MENTOR_SPOTS = [
    { theme: "games", col: 21, row: 18 },
    { theme: "manga", col: 31, row: 18 },
    { theme: "science", col: 25, row: 13 },
    { theme: "cooking", col: 18, row: 23 },
    { theme: "movies", col: 33, row: 23 },
    { theme: "fashion", col: 25, row: 26 },
    { theme: "reading", col: 38, row: 16 }
  ]

  const CHEST_SPOTS = [
    {
      id: "chest_1",
      col: 16,
      row: 15,
      word: "Level up!",
      meaning: "Subir de nível / Evoluir",
      example: "Keep practicing English to level up your skills!",
      tip: "Muito usada em jogos e estudos para indicar progresso."
    },
    {
      id: "chest_2",
      col: 36,
      row: 12,
      word: "Piece of cake",
      meaning: "Moleza / Muito fácil",
      example: "This English mission was a piece of cake!",
      tip: "Expressão idiomática usada quando algo é muito simples de fazer."
    },
    {
      id: "chest_3",
      col: 15,
      row: 27,
      word: "Never give up",
      meaning: "Nunca desista",
      example: "Even when a challenge is hard, never give up!",
      tip: "'Give up' significa desistir."
    },
    {
      id: "chest_4",
      col: 37,
      row: 27,
      word: "Awesome job!",
      meaning: "Trabalho incrível! / Mandou bem!",
      example: "You solved the puzzle. Awesome job!",
      tip: "'Awesome' é um elogio muito comum no dia a dia em inglês."
    },
    {
      id: "chest_5",
      col: 29,
      row: 14,
      word: "Hidden treasure",
      meaning: "Tesouro escondido",
      example: "You found a hidden treasure in Robolingo Village!",
      tip: "'Hidden' = escondido | 'Treasure' = tesouro."
    }
  ]

  const QUESTIONS = {
    games: {
      1: [
        {
          type: "quiz",
          en: "Press start to begin your new quest!",
          pt: "O que significa 'new quest' na frase acima?",
          options: ["Nova missão", "Novo controle", "Tela pausada"],
          correct: 0,
          tip: "'Quest' é muito usado em RPGs para significar missão ou jornada."
        },
        {
          type: "listen",
          en: "Collect the golden coins to unlock the next level.",
          pt: "Ouça o áudio e responda: qual é o objetivo da frase?",
          options: [
            "Coletar moedas douradas para desbloquear o próximo nível",
            "Vender a espada antes da batalha",
            "Salvar o jogo e desligar"
          ],
          correct: 0,
          tip: "'Unlock' = desbloquear | 'Next level' = próximo nível."
        },
        {
          type: "order",
          en: "Find the secret key inside the castle.",
          pt: "Monte a frase: 'Encontre a chave secreta dentro do castelo.'",
          words: ["Find", "the secret key", "inside", "the castle."],
          tip: "'Inside' significa dentro."
        }
      ],
      2: [
        {
          type: "quiz",
          en: "Your character needs more stamina before crossing the river.",
          pt: "Por que o personagem deve esperar antes de atravessar o rio?",
          options: [
            "Precisa de mais energia/vigor (stamina)",
            "Perdeu o mapa da vila",
            "Está sem moedas na mochila"
          ],
          correct: 0,
          tip: "'Stamina' indica fôlego ou energia para correr e agir."
        },
        {
          type: "listen",
          en: "Upgrade your shield before entering the dark cave.",
          pt: "Ouça com atenção: o que você deve melhorar antes de entrar na caverna?",
          options: [
            "Seu escudo (shield)",
            "Sua bota de corrida",
            "Seu capacete de ferro"
          ],
          correct: 0,
          tip: "'Upgrade' = melhorar/aprimorar | 'Shield' = escudo."
        },
        {
          type: "order",
          en: "We defeated the dragon and saved the village.",
          pt: "Monte a frase: 'Nós derrotamos o dragão e salvamos a vila.'",
          words: ["We defeated", "the dragon", "and saved", "the village."],
          tip: "Verbos no passado regular terminam em -ed (defeated, saved)."
        }
      ],
      3: [
        {
          type: "quiz",
          en: "Although the boss looked invincible, we discovered its weak spot.",
          pt: "Qual é a ideia principal dessa frase?",
          options: [
            "Embora o chefe parecesse invencível, descobrimos seu ponto fraco",
            "O chefe fugiu antes da batalha começar",
            "Precisamos reiniciar a fase desde o início"
          ],
          correct: 0,
          tip: "'Although' = embora | 'Weak spot' = ponto fraco."
        },
        {
          type: "listen",
          en: "Multiplayer games require teamwork and quick communication.",
          pt: "Ouça o áudio: o que jogos multiplayer exigem?",
          options: [
            "Trabalho em equipe e comunicação rápida",
            "Apenas gráficos ultra realistas",
            "Jogar sozinho sem conexão"
          ],
          correct: 0,
          tip: "'Require' = exigem/requerem | 'Teamwork' = trabalho em equipe."
        },
        {
          type: "order",
          en: "Strategy is more important than speed in this mission.",
          pt: "Monte a frase: 'Estratégia é mais importante que velocidade nesta missão.'",
          words: ["Strategy is", "more important", "than speed", "in this mission."],
          tip: "Para comparar adjetivos longos, usamos 'more ... than'."
        }
      ]
    },
    manga: {
      1: [
        {
          type: "quiz",
          en: "The young hero trains every morning to protect the village.",
          pt: "O que o jovem herói faz todas as manhãs?",
          options: [
            "Treina para proteger a vila",
            "Dorme até o meio-dia",
            "Viaja de trem para a capital"
          ],
          correct: 0,
          tip: "'Every morning' = todas as manhãs | 'Protect' = proteger."
        },
        {
          type: "listen",
          en: "Read the speech bubble from right to left!",
          pt: "Ouça a dica de leitura: em qual direção você deve ler o balão de fala?",
          options: [
            "Da direita para a esquerda",
            "De baixo para cima",
            "Da esquerda para a direita"
          ],
          correct: 0,
          tip: "'Right to left' = da direita para a esquerda."
        },
        {
          type: "order",
          en: "My favorite character has blue hair.",
          pt: "Monte a frase: 'Meu personagem favorito tem cabelo azul.'",
          words: ["My favorite", "character", "has", "blue hair."],
          tip: "Em inglês, o adjetivo (blue) vem antes do substantivo (hair)."
        }
      ],
      2: [
        {
          type: "quiz",
          en: "This special edition volume includes exclusive character sketches.",
          pt: "O que vem incluído nesta edição especial?",
          options: [
            "Rascunhos exclusivos dos personagens",
            "Um pôster gigante dobrável",
            "Adesivos brilhantes"
          ],
          correct: 0,
          tip: "'Sketches' significa esboços ou rascunhos desenhados."
        },
        {
          type: "listen",
          en: "The artist spent three months drawing the final battle.",
          pt: "Ouça o áudio: quanto tempo o artista levou para desenhar a batalha final?",
          options: ["Três meses", "Duas semanas", "Cinco anos"],
          correct: 0,
          tip: "'Spent three months' = passou/levou três meses."
        },
        {
          type: "order",
          en: "The tournament will start at noon tomorrow.",
          pt: "Monte a frase: 'O torneio começará ao meio-dia amanhã.'",
          words: ["The tournament", "will start", "at noon", "tomorrow."],
          tip: "'At noon' significa exatamente ao meio-dia."
        }
      ],
      3: [
        {
          type: "quiz",
          en: "Despite facing a stronger rival, she never gave up on her dream.",
          pt: "Qual atitude a personagem demonstrou?",
          options: [
            "Apesar de enfrentar uma rival mais forte, ela nunca desistiu do sonho",
            "Ela desistiu do torneio na primeira rodada",
            "Ela trocou de equipe durante a final"
          ],
          correct: 0,
          tip: "'Despite' = apesar de | 'Gave up' = desistiu."
        },
        {
          type: "listen",
          en: "The storyline explores themes of friendship, courage, and loyalty.",
          pt: "Ouça o áudio: quais temas o enredo explora?",
          options: [
            "Amizade, coragem e lealdade",
            "Culinária, viagens e esportes",
            "Comédia, música e dança"
          ],
          correct: 0,
          tip: "'Friendship' = amizade | 'Loyalty' = lealdade."
        },
        {
          type: "order",
          en: "Every warrior must overcome their own fears.",
          pt: "Monte a frase: 'Todo guerreiro deve superar seus próprios medos.'",
          words: ["Every warrior", "must overcome", "their own", "fears."],
          tip: "'Overcome' significa superar ou vencer um obstáculo."
        }
      ]
    },
    cooking: {
      1: [
        {
          type: "quiz",
          en: "Add two eggs, flour, and milk to the bowl.",
          pt: "Quais ingredientes vão na tigela ('bowl')?",
          options: [
            "Dois ovos, farinha e leite",
            "Açúcar, manteiga e limão",
            "Arroz, feijão e sal"
          ],
          correct: 0,
          tip: "'Flour' = farinha | 'Bowl' = tigela."
        },
        {
          type: "listen",
          en: "The fresh bread smells delicious!",
          pt: "Ouça o áudio: o que a frase diz sobre o pão fresco?",
          options: [
            "Tem um cheiro delicioso",
            "Está muito salgado",
            "Acabou de sair da geladeira"
          ],
          correct: 0,
          tip: "'Smells delicious' = tem um cheiro delicioso."
        },
        {
          type: "order",
          en: "Please pass me the salt and pepper.",
          pt: "Monte a frase: 'Por favor, me passe o sal e a pimenta.'",
          words: ["Please", "pass me", "the salt", "and pepper."],
          tip: "'Salt' = sal | 'Pepper' = pimenta."
        }
      ],
      2: [
        {
          type: "quiz",
          en: "Preheat the oven for ten minutes before baking the cake.",
          pt: "O que significa 'Preheat the oven'?",
          options: [
            "Pré-aquecer o forno",
            "Limpar a forma de bolo",
            "Misturar a cobertura"
          ],
          correct: 0,
          tip: "'Oven' = forno | 'Baking' = assar."
        },
        {
          type: "listen",
          en: "Chop the onions and tomatoes into small pieces.",
          pt: "Ouça a instrução: o que deve ser cortado em pedaços pequenos?",
          options: [
            "As cebolas e os tomates",
            "As maçãs e as bananas",
            "As batatas e as cenouras"
          ],
          correct: 0,
          tip: "'Chop' = picar/cortar | 'Onions' = cebolas."
        },
        {
          type: "order",
          en: "This soup needs a little more garlic.",
          pt: "Monte a frase: 'Esta sopa precisa de um pouco mais de alho.'",
          words: ["This soup", "needs", "a little more", "garlic."],
          tip: "'Garlic' = alho | 'A little more' = um pouco mais."
        }
      ],
      3: [
        {
          type: "quiz",
          en: "Stir the sauce constantly so it does not burn at the bottom.",
          pt: "Por que é preciso mexer o molho constantemente?",
          options: [
            "Para não queimar no fundo",
            "Para esfriar mais rápido",
            "Para mudar a cor do prato"
          ],
          correct: 0,
          tip: "'Stir' = mexer | 'Burn' = queimar."
        },
        {
          type: "listen",
          en: "Fresh herbs enhance the flavor of homemade dishes.",
          pt: "Ouça o áudio: qual é o efeito das ervas frescas nos pratos caseiros?",
          options: [
            "Realçam o sabor",
            "Reduzem o tempo de cozimento",
            "Deixam o prato mais doce"
          ],
          correct: 0,
          tip: "'Enhance' = realçam/melhoram | 'Homemade' = caseiro."
        },
        {
          type: "order",
          en: "Let the dough rest for thirty minutes before baking.",
          pt: "Monte a frase: 'Deixe a massa descansar por trinta minutos antes de assar.'",
          words: ["Let the dough", "rest for", "thirty minutes", "before baking."],
          tip: "'Dough' (pronuncia-se 'dôu') significa massa de pão ou torta."
        }
      ]
    },
    fashion: {
      1: [
        {
          type: "quiz",
          en: "She is wearing a blue jacket and white sneakers.",
          pt: "O que ela está vestindo?",
          options: [
            "Jaqueta azul e tênis brancos",
            "Vestido vermelho e botas",
            "Camiseta verde e boné"
          ],
          correct: 0,
          tip: "'Sneakers' = tênis | 'Wearing' = vestindo/usando."
        },
        {
          type: "listen",
          en: "Put on your warm coat because it is cold outside.",
          pt: "Ouça o conselho: por que você deve vestir seu casaco quente?",
          options: [
            "Porque está frio lá fora",
            "Porque vai chover dentro de casa",
            "Porque a festa já acabou"
          ],
          correct: 0,
          tip: "'Put on' = vestir/colocar | 'Coat' = casaco."
        },
        {
          type: "order",
          en: "I like your new red backpack.",
          pt: "Monte a frase: 'Eu gosto da sua mochila vermelha nova.'",
          words: ["I like", "your new", "red", "backpack."],
          tip: "'Backpack' = mochila."
        }
      ],
      2: [
        {
          type: "quiz",
          en: "Vintage outfits are becoming popular again this season.",
          pt: "O que está ficando popular novamente nesta estação?",
          options: [
            "Roupas estilo retrô/vintage",
            "Mochilas transparentes",
            "Relógios de bolso"
          ],
          correct: 0,
          tip: "'Outfits' = trajes/looks | 'Season' = estação/temporada."
        },
        {
          type: "listen",
          en: "Those sunglasses match perfectly with your summer hat.",
          pt: "Ouça o áudio: o que combina perfeitamente com o chapéu de verão?",
          options: [
            "Aqueles óculos de sol",
            "Aquelas luvas de inverno",
            "Aquele cachecol de lã"
          ],
          correct: 0,
          tip: "'Match' = combinar | 'Sunglasses' = óculos de sol."
        },
        {
          type: "order",
          en: "Bright colors are great for sunny days.",
          pt: "Monte a frase: 'Cores vibrantes são ótimas para dias ensolarados.'",
          words: ["Bright colors", "are great", "for", "sunny days."],
          tip: "'Bright' = brilhante/vibrante | 'Sunny' = ensolarado."
        }
      ],
      3: [
        {
          type: "quiz",
          en: "Sustainable fashion focuses on eco-friendly fabrics and fair production.",
          pt: "Em que a moda sustentável se concentra?",
          options: [
            "Tecidos ecológicos e produção justa",
            "Roupas descartáveis baratas",
            "Apenas desfiles de luxo"
          ],
          correct: 0,
          tip: "'Fabrics' = tecidos | 'Fair' = justa."
        },
        {
          type: "listen",
          en: "Designers often draw inspiration from street culture and art.",
          pt: "Ouça o áudio: de onde os estilistas costumam tirar inspiração?",
          options: [
            "Da cultura urbana (de rua) e da arte",
            "De manuais de matemática",
            "Apenas de uniformes antigos"
          ],
          correct: 0,
          tip: "'Draw inspiration' = tirar/buscar inspiração."
        },
        {
          type: "order",
          en: "Personal style is a creative way to express yourself.",
          pt: "Monte a frase: 'Estilo pessoal é uma forma criativa de se expressar.'",
          words: ["Personal style", "is a creative way", "to express", "yourself."],
          tip: "'Express yourself' = expressar a si mesmo."
        }
      ]
    },
    science: {
      1: [
        {
          type: "quiz",
          en: "Earth orbits around the Sun once every year.",
          pt: "O que a frase afirma sobre a Terra?",
          options: [
            "A Terra orbita ao redor do Sol uma vez por ano",
            "A Lua é maior que o Sol",
            "O Sol gira ao redor da Terra"
          ],
          correct: 0,
          tip: "'Earth' = Terra | 'Once every year' = uma vez por ano."
        },
        {
          type: "listen",
          en: "We can see millions of stars in the night sky.",
          pt: "Ouça o áudio: o que podemos ver no céu noturno?",
          options: [
            "Milhões de estrelas",
            "Apenas nuvens de chuva",
            "Três luas brilhantes"
          ],
          correct: 0,
          tip: "'Night sky' = céu noturno | 'Stars' = estrelas."
        },
        {
          type: "order",
          en: "Robots help scientists explore distant planets.",
          pt: "Monte a frase: 'Robôs ajudam cientistas a explorar planetas distantes.'",
          words: ["Robots help", "scientists", "explore", "distant planets."],
          tip: "'Scientists' = cientistas."
        }
      ],
      2: [
        {
          type: "quiz",
          en: "Water boils at one hundred degrees Celsius at sea level.",
          pt: "O que acontece com a água a 100 graus Celsius?",
          options: ["Ela ferve", "Ela congela", "Ela vira cristal"],
          correct: 0,
          tip: "'Boils' = ferve | 'Sea level' = nível do mar."
        },
        {
          type: "listen",
          en: "Gravity keeps all the planets in orbit around the Sun.",
          pt: "Ouça o áudio: qual força mantém os planetas em órbita ao redor do Sol?",
          options: ["A gravidade", "O magnetismo lunar", "O vento solar"],
          correct: 0,
          tip: "'Keeps' = mantém | 'Gravity' = gravidade."
        },
        {
          type: "order",
          en: "Sound travels much slower than light.",
          pt: "Monte a frase: 'O som viaja muito mais devagar que a luz.'",
          words: ["Sound travels", "much slower", "than", "light."],
          tip: "'Slower than' = mais devagar que."
        }
      ],
      3: [
        {
          type: "quiz",
          en: "Plants convert sunlight into chemical energy through photosynthesis.",
          pt: "Como as plantas convertem luz solar em energia química?",
          options: [
            "Através da fotossíntese",
            "Através da evaporação",
            "Através da gravidade"
          ],
          correct: 0,
          tip: "'Sunlight' = luz solar | 'Through' = através de."
        },
        {
          type: "listen",
          en: "Renewable energy sources reduce carbon emissions and protect nature.",
          pt: "Ouça o áudio: qual é o benefício das fontes de energia renovável?",
          options: [
            "Reduzem emissões de carbono e protegem a natureza",
            "Aumentam o consumo de combustíveis fósseis",
            "Funcionam apenas durante a noite"
          ],
          correct: 0,
          tip: "'Renewable' = renovável | 'Sources' = fontes."
        },
        {
          type: "order",
          en: "Every experiment begins with a clear hypothesis.",
          pt: "Monte a frase: 'Todo experimento começa com uma hipótese clara.'",
          words: ["Every experiment", "begins with", "a clear", "hypothesis."],
          tip: "'Begins with' = começa com."
        }
      ]
    },
    movies: {
      1: [
        {
          type: "quiz",
          en: "The movie starts at seven o’clock. Don’t forget the popcorn!",
          pt: "O que não se deve esquecer antes do filme começar?",
          options: ["A pipoca", "O guarda-chuva", "O fone de ouvido"],
          correct: 0,
          tip: "'Popcorn' = pipoca | 'Don't forget' = não se esqueça."
        },
        {
          type: "listen",
          en: "Let us watch a funny comedy tonight!",
          pt: "Ouça o convite: que tipo de filme vamos assistir hoje à noite?",
          options: [
            "Uma comédia engraçada",
            "Um documentário sobre vulcões",
            "Um filme de terror silencioso"
          ],
          correct: 0,
          tip: "'Tonight' = hoje à noite | 'Funny' = engraçado(a)."
        },
        {
          type: "order",
          en: "The main actor won a gold trophy.",
          pt: "Monte a frase: 'O ator principal ganhou um troféu de ouro.'",
          words: ["The main actor", "won", "a gold", "trophy."],
          tip: "'Won' é o passado de 'win' (ganhar)."
        }
      ],
      2: [
        {
          type: "quiz",
          en: "The soundtrack made the final scene even more emotional.",
          pt: "O que tornou a cena final ainda mais emocionante?",
          options: ["A trilha sonora", "Os efeitos de chuva", "Os créditos finais"],
          correct: 0,
          tip: "'Soundtrack' = trilha sonora | 'Scene' = cena."
        },
        {
          type: "listen",
          en: "I prefer watching foreign movies with original audio and subtitles.",
          pt: "Ouça o áudio: como a pessoa prefere assistir a filmes estrangeiros?",
          options: [
            "Com áudio original e legendas",
            "Sem som e em preto e branco",
            "Apenas no celular sem fones"
          ],
          correct: 0,
          tip: "'Subtitles' = legendas | 'Foreign' = estrangeiro."
        },
        {
          type: "order",
          en: "The director shouted action before the scene started.",
          pt: "Monte a frase: 'O diretor gritou ação antes da cena começar.'",
          words: ["The director", "shouted action", "before", "the scene started."],
          tip: "'Shouted' = gritou."
        }
      ],
      3: [
        {
          type: "quiz",
          en: "The plot twist at the end surprised the entire audience.",
          pt: "O que surpreendeu toda a plateia no final?",
          options: [
            "A reviravolta na história (plot twist)",
            "A falta de energia no cinema",
            "O atraso da sessão"
          ],
          correct: 0,
          tip: "'Plot twist' = reviravolta no enredo | 'Audience' = plateia."
        },
        {
          type: "listen",
          en: "Visual effects allow filmmakers to create entire fantasy worlds.",
          pt: "Ouça o áudio: o que os efeitos visuais permitem aos cineastas criar?",
          options: [
            "Mundos inteiros de fantasia",
            "Roteiros sem atores",
            "Salas de cinema maiores"
          ],
          correct: 0,
          tip: "'Allow' = permitem | 'Filmmakers' = cineastas."
        },
        {
          type: "order",
          en: "Behind the scenes footage reveals how stunts were filmed.",
          pt: "Monte a frase: 'Cenas de bastidores revelam como as acrobacias foram filmadas.'",
          words: ["Behind the scenes", "footage reveals", "how stunts", "were filmed."],
          tip: "'Behind the scenes' = nos bastidores | 'Stunts' = cenas de ação/acrobacias."
        }
      ]
    },
    reading: {
      1: [
        {
          type: "quiz",
          en: "I love reading adventure stories before going to sleep.",
          pt: "Que tipo de histórias a pessoa gosta de ler antes de dormir?",
          options: [
            "Histórias de aventura",
            "Receitas de bolo",
            "Manuais de computador"
          ],
          correct: 0,
          tip: "'Adventure stories' = histórias de aventura."
        },
        {
          type: "listen",
          en: "Open your book to page twelve and read the title.",
          pt: "Ouça a instrução: em qual página você deve abrir o livro?",
          options: ["Página 12", "Página 20", "Página 2"],
          correct: 0,
          tip: "'Twelve' = doze (12)."
        },
        {
          type: "order",
          en: "This magic book has a golden cover.",
          pt: "Monte a frase: 'Este livro mágico tem uma capa dourada.'",
          words: ["This magic book", "has", "a golden", "cover."],
          tip: "'Cover' = capa do livro."
        }
      ],
      2: [
        {
          type: "quiz",
          en: "The library is a quiet place where you can borrow books for free.",
          pt: "O que você pode fazer gratuitamente na biblioteca?",
          options: [
            "Pegar livros emprestados",
            "Comprar videogames",
            "Assistir a shows ao vivo"
          ],
          correct: 0,
          tip: "'Borrow' = pegar emprestado | 'For free' = de graça."
        },
        {
          type: "listen",
          en: "The mysterious map was hidden inside an ancient dictionary.",
          pt: "Ouça o áudio: onde o mapa misterioso estava escondido?",
          options: [
            "Dentro de um dicionário antigo",
            "Debaixo de uma ponte de pedra",
            "Atrás de um quadro na escola"
          ],
          correct: 0,
          tip: "'Hidden' = escondido | 'Ancient' = antigo."
        },
        {
          type: "order",
          en: "Reading every day improves your vocabulary quickly.",
          pt: "Monte a frase: 'Ler todos os dias melhora seu vocabulário rapidamente.'",
          words: ["Reading every day", "improves", "your vocabulary", "quickly."],
          tip: "'Improves' = melhora."
        }
      ],
      3: [
        {
          type: "quiz",
          en: "A well-written chapter leaves the reader eager to turn the page.",
          pt: "Qual efeito um capítulo bem escrito causa no leitor?",
          options: [
            "Deixa o leitor ansioso para virar a página",
            "Faz o leitor fechar o livro imediatamente",
            "Confunde o final da história"
          ],
          correct: 0,
          tip: "'Eager' = ansioso/entusiasmado | 'Turn the page' = virar a página."
        },
        {
          type: "listen",
          en: "Science fiction novels often imagine how technology will shape the future.",
          pt: "Ouça o áudio: o que os romances de ficção científica costumam imaginar?",
          options: [
            "Como a tecnologia moldará o futuro",
            "Como eram as cidades na Idade Média",
            "Como cultivar jardins sem água"
          ],
          correct: 0,
          tip: "'Shape the future' = moldar/transformar o futuro."
        },
        {
          type: "order",
          en: "The narrator described the storm with vivid details.",
          pt: "Monte a frase: 'O narrador descreveu a tempestade com detalhes vívidos.'",
          words: ["The narrator", "described the storm", "with", "vivid details."],
          tip: "'Storm' = tempestade | 'Vivid' = vívido/intenso."
        }
      ]
    }
  }

  const SHOP_ITEMS = [
    { id: "cap", slot: "hat", name: "🧢 Boné Clássico", price: 0, desc: "Boné da Academia" },
    { id: "headset", slot: "hat", name: "🎧 Headset Neon", price: 25, desc: "Fone gamer para ouvir inglês" },
    { id: "glasses", slot: "hat", name: "🕶️ Óculos Pixel", price: 45, desc: "Estilo lendário na vila" },
    { id: "crown", slot: "hat", name: "👑 Coroa de Ouro", price: 80, desc: "Para mestres do vocabulário" },
    { id: "aura", slot: "hat", name: "✨ Aura Dourada", price: 120, desc: "Brilho especial ao caminhar" },
    { id: "pet_dog", slot: "pet", name: "🤖 Pet: Robô-Cão", price: 50, desc: "Companheiro fiel que segue você" },
    { id: "pet_owl", slot: "pet", name: "🦉 Pet: Coruja Pixel", price: 75, desc: "Guardiã da sabedoria no mapa" },
    { id: "pet_dragon", slot: "pet", name: "🐉 Pet: Mini Dragão", price: 110, desc: "Dragão lendário seguidor" }
  ]

  const CLASSMATES = [
    { name: "Ana Clara", theme: "📚 HQs & Mangá", xp: 240 },
    { name: "Lucas M.", theme: "🎮 Games & Tech", xp: 185 },
    { name: "Gabriel S.", theme: "🔬 Ciências", xp: 130 },
    { name: "Mariana R.", theme: "🎬 Filmes & Séries", xp: 90 }
  ]

  const STORAGE_KEY = "robolingo_rpg_save_v7"
  const TEACHER_STORAGE_KEY = "robolingo_teacher_records_v1"

  let state = {
    registered: false,
    name: "Explorador",
    theme: "games",
    level: 1,
    xp: 0,
    coins: 20,
    streak: 0,
    owned: ["cap"],
    equipped: "cap",
    equippedPet: null,
    openedChests: [],
    solvedCount: 0,
    totalAttempts: 0,
    avatarHair: "brown",
    avatarOutfit: "blue",
    avatarSkin: "light",
    avatarPortrait: "player",
    zoom: 1.0,
    showMinimap: true
  }

  let teacherRecords = []
  let teacherUnlocked = false

  let currentQuestion = null
  let activeMissionTheme = "games"
  let lastQuestionEn = ""
  let questionAnswered = false
  let textRevealed = false
  let selectedWordIndices = []
  let shuffledWords = []
  let activeChest = null
  let petPos = { x: null, y: null }

  // Estado dos Diálogos JRPG / Visual Novel
  let dialogueState = {
    active: false,
    lines: [],
    index: 0,
    charIndex: 0,
    fullPlainText: "",
    fullHtmlText: "",
    timer: null,
    onComplete: null
  }

  let customSpriteCache = null
  let customSpriteKey = ""
  let minimapBaseCanvas = null

  // Cache dos retratos de alta resolução em img/portraits/
  const portraitCache = {}

  function hexToRgb(hex) {
    const clean = hex.replace("#", "")
    const num = parseInt(clean, 16)
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    }
  }

  function getOptionColor(group, id) {
    const list = AVATAR_OPTIONS[group] || []
    const found = list.find((item) => item.id === id) || list[0]
    return found ? found.color : "#2563eb"
  }

  function loadState() {
    try {
      const raw =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem("robolingo_rpg_save_v6") ||
        localStorage.getItem("robolingo_rpg_save_v5")
      if (raw) {
        state = { ...state, ...JSON.parse(raw) }
        if (!state.totalAttempts || state.totalAttempts < state.solvedCount) {
          state.totalAttempts = state.solvedCount
        }
      }
      const savedTeacher = localStorage.getItem(TEACHER_STORAGE_KEY)
      if (savedTeacher) {
        teacherRecords = JSON.parse(savedTeacher)
      }
    } catch (e) {
      console.warn("Erro ao carregar progresso local:", e)
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn("Erro ao salvar progresso local:", e)
    }
    updateHUD()
  }

  function saveTeacherRecords() {
    try {
      localStorage.setItem(TEACHER_STORAGE_KEY, JSON.stringify(teacherRecords))
    } catch (_) {}
  }

  function computeChecksum(payload) {
    const str = `${payload}::${SALT}`
    let hash = 2166136261
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i)
      hash = Math.imul(hash, 16777619)
    }
    return (hash >>> 0).toString(36).toUpperCase().padStart(4, "0").slice(0, 4)
  }

  function getAccuracyPercent() {
    if (!state.totalAttempts || state.totalAttempts === 0) return 100
    return Math.round((state.solvedCount / state.totalAttempts) * 100)
  }

  function generateStudentCode() {
    const acc = getAccuracyPercent()
    const raw = `${state.name}|${state.theme}|${state.level}|${state.xp}|${state.solvedCount}|${acc}|${state.openedChests.length}`
    const b64 = btoa(unescape(encodeURIComponent(raw)))
    const sig = computeChecksum(raw)
    return `RB-${b64}-${sig}`
  }

  function parseStudentCode(codeStr) {
    const match = codeStr.match(/^RB-([A-Za-z0-9+/=]+)-([A-Z0-9]{4})$/)
    if (!match) return null
    try {
      const b64 = match[1]
      const sig = match[2]
      const raw = decodeURIComponent(escape(atob(b64)))
      const valid = computeChecksum(raw) === sig
      const parts = raw.split("|")
      if (parts.length < 7) return null
      return {
        name: parts[0],
        theme: parts[1],
        level: Number(parts[2]) || 1,
        xp: Number(parts[3]) || 0,
        solved: Number(parts[4]) || 0,
        accuracy: Number(parts[5]) || 0,
        chests: Number(parts[6]) || 0,
        valid
      }
    } catch (_) {
      return null
    }
  }

  function shuffleArray(arr) {
    const copy = arr.map((word, originalIdx) => ({ word, originalIdx }))
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    if (copy.length > 1 && copy.every((item, idx) => item.originalIdx === idx)) {
      ;[copy[0], copy[1]] = [copy[1], copy[0]]
    }
    return copy
  }

  function playTone(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      if (type === "win") {
        osc.type = "triangle"
        osc.frequency.setValueAtTime(523.25, ctx.currentTime)
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1)
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2)
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45)
        osc.start()
        osc.stop(ctx.currentTime + 0.45)
      } else if (type === "wrong") {
        osc.type = "sawtooth"
        osc.frequency.setValueAtTime(190, ctx.currentTime)
        osc.frequency.setValueAtTime(145, ctx.currentTime + 0.15)
        gain.gain.setValueAtTime(0.12, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
        osc.start()
        osc.stop(ctx.currentTime + 0.35)
      } else if (type === "blip") {
        osc.type = "square"
        osc.frequency.setValueAtTime(480 + Math.random() * 140, ctx.currentTime)
        gain.gain.setValueAtTime(0.025, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
        osc.start()
        osc.stop(ctx.currentTime + 0.04)
      } else {
        osc.type = "sine"
        osc.frequency.setValueAtTime(660, ctx.currentTime)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
        osc.start()
        osc.stop(ctx.currentTime + 0.12)
      }
    } catch (_) {}
  }

  function speakEnglish(text, rate = 0.92) {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = "en-US"
    utter.rate = rate
    const voices = window.speechSynthesis.getVoices()
    const enVoice =
      voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
      voices.find((v) => v.lang.startsWith("en"))
    if (enVoice) utter.voice = enVoice
    window.speechSynthesis.speak(utter)
  }

  function updateHUD() {
    const hudName = document.getElementById("hudPlayerName")
    const hudMeta = document.getElementById("hudPlayerMeta")
    const hudXp = document.getElementById("hudXp")
    const hudCoins = document.getElementById("hudCoins")
    const hudStreak = document.getElementById("hudStreak")
    const hudChests = document.getElementById("hudChests")
    const hudZoom = document.getElementById("hudZoomBtn")

    if (!hudName) return
    const themeInfo = THEMES[state.theme] || THEMES.games
    hudName.textContent = state.name
    hudMeta.textContent = `Nv.${state.level} • ${themeInfo.label}`
    hudXp.textContent = `${state.xp} XP`
    hudCoins.textContent = `${state.coins}`

    if (hudChests) {
      hudChests.textContent = `${state.openedChests.length}/${CHEST_SPOTS.length}`
    }

    if (hudZoom) {
      hudZoom.textContent = `🔍 ${state.zoom.toFixed(2).replace(".00", ".0")}x`
    }

    if (hudStreak) {
      if (state.streak > 0) {
        hudStreak.style.display = "flex"
        hudStreak.style.borderColor = state.streak >= 3 ? "#f97316" : "#334155"
        hudStreak.style.color = state.streak >= 3 ? "#fb923c" : "#f8fafc"
        hudStreak.innerHTML = `🔥 ${state.streak}${state.streak >= 3 ? " (1.5x)" : ""}`
      } else {
        hudStreak.style.display = "none"
      }
    }
  }

  function cycleZoom() {
    const levels = [0.75, 1.0, 1.25]
    const idx = levels.findIndex((z) => Math.abs(z - state.zoom) < 0.05)
    state.zoom = levels[(idx + 1) % levels.length]
    saveState()
    playTone("click")
    if (typeof window.syncViewportCamera === "function") {
      window.syncViewportCamera()
    }
  }

  function toggleMinimap() {
    state.showMinimap = !state.showMinimap
    saveState()
    const mm = document.getElementById("minimapBox")
    if (mm) {
      mm.style.opacity = state.showMinimap ? "1" : "0.35"
    }
    playTone("click")
  }

  function isModalOpen() {
    if (dialogueState.active) return true
    return [
      "loginModal",
      "missionModal",
      "shopModal",
      "rankModal",
      "chestModal",
      "reportModal",
      "teacherModal"
    ].some((id) => {
      const el = document.getElementById(id)
      return el && el.style.display === "flex"
    })
  }

  function closeAllModals() {
    if (dialogueState.timer) {
      clearInterval(dialogueState.timer)
      dialogueState.timer = null
    }
    dialogueState.active = false
    const dlgOverlay = document.getElementById("jrpgDialogueOverlay")
    if (dlgOverlay) dlgOverlay.style.display = "none"

    ;[
      "missionModal",
      "shopModal",
      "rankModal",
      "chestModal",
      "reportModal",
      "teacherModal"
    ].forEach((id) => {
      const el = document.getElementById(id)
      if (el) el.style.display = "none"
    })
    if (typeof battle !== "undefined") {
      battle.initiated = false
    }
  }

  // =========================================================================
  // RETRATOS JRPG (CARREGA img/portraits/*.png + FALLBACK PIXEL ART)
  // =========================================================================
  function drawHighResPortrait(canvasEl, img) {
    if (!canvasEl || !img) return
    const ctx = canvasEl.getContext("2d")
    const cw = canvasEl.width
    const ch = canvasEl.height
    ctx.clearRect(0, 0, cw, ch)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    const scale = Math.min(cw / img.width, ch / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    const dx = (cw - dw) / 2
    const dy = ch - dh
    ctx.drawImage(img, dx, dy, dw, dh)
  }

  function drawPixelBustPortrait(canvasEl, profile) {
    if (!canvasEl) return
    const ctx = canvasEl.getContext("2d")
    const size = 32
    const off = document.createElement("canvas")
    off.width = size
    off.height = size
    const p = off.getContext("2d")

    const skin = profile.skinColor || "#f8c9a0"
    const skinShadow = "#c68642"
    const hair = profile.hairColor || "#5c3a21"
    const outfit = profile.outfitColor || "#2563eb"
    const accent = profile.accentColor || "#38bdf8"
    const eyeColor = profile.eyeColor || "#0f172a"

    p.clearRect(0, 0, size, size)

    if (profile.style === "reading" || profile.hat === "aura") {
      p.fillStyle = profile.hat === "aura" ? "#facc15" : "#4c1d95"
      p.fillRect(5, 19, 22, 13)
    }

    p.fillStyle = outfit
    p.fillRect(7, 21, 18, 11)
    p.fillStyle = "#0f172a"
    p.fillRect(6, 22, 1, 10)
    p.fillRect(25, 22, 1, 10)

    if (profile.style === "science") {
      p.fillStyle = "#f8fafc"
      p.fillRect(7, 21, 18, 11)
      p.fillStyle = "#059669"
      p.fillRect(15, 22, 2, 8)
    } else if (profile.style === "cooking") {
      p.fillStyle = "#f8fafc"
      p.fillRect(7, 21, 18, 11)
      p.fillStyle = "#fb923c"
      p.fillRect(11, 21, 10, 3)
    } else if (profile.style === "games") {
      p.fillStyle = "#1e3a8a"
      p.fillRect(7, 21, 18, 11)
      p.fillStyle = "#38bdf8"
      p.fillRect(10, 21, 2, 11)
      p.fillRect(20, 21, 2, 11)
    } else if (profile.style === "manga") {
      p.fillStyle = "#b91c1c"
      p.fillRect(7, 21, 18, 11)
      p.fillStyle = "#facc15"
      p.fillRect(11, 21, 10, 2)
    } else if (profile.style === "movies") {
      p.fillStyle = "#1e293b"
      p.fillRect(7, 21, 18, 11)
      p.fillStyle = "#facc15"
      p.fillRect(13, 21, 6, 9)
    } else {
      p.fillStyle = accent
      p.fillRect(12, 21, 8, 2)
    }

    p.fillStyle = skinShadow
    p.fillRect(14, 18, 4, 3)

    if (profile.style === "reading" || profile.style === "fashion" || profile.style === "cooking") {
      p.fillStyle = hair
      p.fillRect(7, 8, 18, 15)
    }

    p.fillStyle = skin
    p.fillRect(10, 8, 12, 11)
    p.fillStyle = skinShadow
    p.fillRect(10, 17, 12, 2)

    p.fillStyle = "#ffffff"
    p.fillRect(11, 12, 3, 3)
    p.fillRect(18, 12, 3, 3)
    p.fillStyle = eyeColor
    p.fillRect(12, 12, 2, 3)
    p.fillRect(19, 12, 2, 3)

    p.fillStyle = "#f472b6"
    p.fillRect(10, 15, 2, 1)
    p.fillRect(20, 15, 2, 1)
    p.fillStyle = "#9f1239"
    p.fillRect(15, 16, 2, 1)

    p.fillStyle = hair
    p.fillRect(9, 5, 14, 4)
    p.fillRect(9, 8, 2, 6)
    p.fillRect(21, 8, 2, 6)
    p.fillRect(12, 8, 3, 2)
    p.fillRect(17, 8, 2, 2)

    if (profile.style === "cooking") {
      p.fillStyle = "#ffffff"
      p.fillRect(10, 1, 12, 5)
      p.fillRect(9, 2, 14, 3)
    } else if (profile.style === "manga") {
      p.fillStyle = "#ef4444"
      p.fillRect(9, 7, 14, 2)
      p.fillStyle = "#cbd5e1"
      p.fillRect(13, 7, 6, 2)
    } else if (profile.style === "science") {
      p.fillStyle = "#34d399"
      p.fillRect(10, 6, 5, 2)
      p.fillRect(17, 6, 5, 2)
    } else if (profile.style === "movies") {
      p.fillStyle = "#d97706"
      p.fillRect(9, 4, 15, 3)
    } else if (profile.style === "reading") {
      p.fillStyle = "#6d28d9"
      p.fillRect(8, 4, 16, 3)
      p.fillRect(8, 6, 2, 12)
      p.fillRect(22, 6, 2, 12)
    }

    if (profile.hat === "cap") {
      p.fillStyle = "#2563eb"
      p.fillRect(9, 4, 14, 3)
      p.fillStyle = "#60a5fa"
      p.fillRect(12, 6, 12, 2)
    } else if (profile.hat === "crown") {
      p.fillStyle = "#facc15"
      p.fillRect(10, 3, 12, 3)
      p.fillRect(10, 1, 2, 2)
      p.fillRect(15, 1, 2, 2)
      p.fillRect(20, 1, 2, 2)
    } else if (profile.hat === "headset" || profile.style === "games") {
      p.fillStyle = "#a855f7"
      p.fillRect(8, 5, 16, 2)
      p.fillStyle = "#22d3ee"
      p.fillRect(7, 10, 3, 5)
      p.fillRect(22, 10, 3, 5)
    } else if (profile.hat === "glasses" || profile.style === "fashion") {
      p.fillStyle = "#0f172a"
      p.fillRect(10, 12, 12, 3)
      p.fillStyle = "#38bdf8"
      p.fillRect(11, 12, 4, 2)
      p.fillRect(17, 12, 4, 2)
    }

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(off, 0, 0, canvasEl.width, canvasEl.height)
  }

  function renderJrpgPortrait(canvasEl, portraitKey, fallbackProfile) {
    if (!canvasEl) return

    const cached = portraitCache[portraitKey]
    if (cached && cached.status === "loaded" && cached.img) {
      drawHighResPortrait(canvasEl, cached.img)
      return
    }

    // Desenha o retrato pixel art imediatamente enquanto carrega (ou se não houver arquivo)
    drawPixelBustPortrait(canvasEl, fallbackProfile)

    if (cached && (cached.status === "loading" || cached.status === "error")) {
      return
    }

    const extensions = ["png", "webp", "jpg", "jpeg"]
    let extIdx = 0
    const img = new Image()
    portraitCache[portraitKey] = { status: "loading", img }

    const tryNext = () => {
      if (extIdx >= extensions.length) {
        portraitCache[portraitKey] = { status: "error", img: null }
        return
      }
      const ext = extensions[extIdx++]
      img.src = `./img/portraits/${portraitKey}.${ext}`
    }

    img.onload = () => {
      portraitCache[portraitKey] = { status: "loaded", img }
      drawHighResPortrait(canvasEl, img)
    }
    img.onerror = tryNext
    tryNext()
  }

  function drawMascotIcon(canvasEl, themeKey) {
    if (!canvasEl) return
    const ctx = canvasEl.getContext("2d")
    const theme = THEMES[themeKey] || THEMES.games
    const off = document.createElement("canvas")
    off.width = 16
    off.height = 16
    const p = off.getContext("2d")

    p.fillStyle = theme.accentColor
    p.fillRect(3, 4, 10, 9)
    p.fillStyle = "#facc15"
    p.fillRect(7, 1, 2, 3)
    p.fillStyle = "#0f172a"
    p.fillRect(5, 7, 2, 2)
    p.fillRect(9, 7, 2, 2)
    p.fillStyle = "#ffffff"
    p.fillRect(6, 10, 4, 1)

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(off, 0, 0, canvasEl.width, canvasEl.height)
  }

  function togglePortraitStyle() {
    state.avatarPortrait = state.avatarPortrait === "player" ? "player_girl" : "player"
    const btn = document.getElementById("btnTogglePortrait")
    if (btn) {
      btn.textContent =
        state.avatarPortrait === "player_girl" ? "👧 Aventureira" : "🧑 Aventureiro"
    }
    playTone("click")
    updateAvatarPreview()
  }

  function renderAvatarSwatches() {
    const groups = [
      { key: "hair", stateProp: "avatarHair", containerId: "swatchHair" },
      { key: "outfit", stateProp: "avatarOutfit", containerId: "swatchOutfit" },
      { key: "skin", stateProp: "avatarSkin", containerId: "swatchSkin" }
    ]

    groups.forEach((g) => {
      const box = document.getElementById(g.containerId)
      if (!box) return
      box.innerHTML = ""
      AVATAR_OPTIONS[g.key].forEach((opt) => {
        const btn = document.createElement("button")
        btn.type = "button"
        btn.title = opt.name
        btn.style.width = "24px"
        btn.style.height = "24px"
        btn.style.borderRadius = "6px"
        btn.style.background = opt.color
        btn.style.border =
          state[g.stateProp] === opt.id ? "3px solid #facc15" : "2px solid #475569"
        btn.onclick = () => {
          state[g.stateProp] = opt.id
          customSpriteCache = null
          playTone("click")
          renderAvatarSwatches()
          updateAvatarPreview()
        }
        box.appendChild(btn)
      })
    })
  }

  function updateAvatarPreview() {
    const preview = document.getElementById("avatarPreviewCanvas")
    if (!preview) return
    const btn = document.getElementById("btnTogglePortrait")
    if (btn) {
      btn.textContent =
        state.avatarPortrait === "player_girl" ? "👧 Aventureira" : "🧑 Aventureiro"
    }

    renderJrpgPortrait(preview, state.avatarPortrait || "player", {
      hairColor: getOptionColor("hair", state.avatarHair),
      outfitColor: getOptionColor("outfit", state.avatarOutfit),
      skinColor: getOptionColor("skin", state.avatarSkin),
      accentColor: "#facc15",
      hat: state.equipped
    })
  }

  function openLoginModal() {
    const modal = document.getElementById("loginModal")
    if (!modal) return
    document.getElementById("inputStudentName").value =
      state.name !== "Explorador" ? state.name : ""
    document.getElementById("selectStudentTheme").value = state.theme
    document.getElementById("selectStudentLevel").value = String(state.level)
    renderAvatarSwatches()
    updateAvatarPreview()
    modal.style.display = "flex"
  }

  function submitLogin() {
    const nameInput = document.getElementById("inputStudentName").value.trim()
    const themeVal = document.getElementById("selectStudentTheme").value
    const levelVal = Number(document.getElementById("selectStudentLevel").value) || 1

    state.name = nameInput || "Explorador"
    state.theme = themeVal
    state.level = levelVal
    state.registered = true
    customSpriteCache = null
    saveState()
    playTone("win")

    document.getElementById("loginModal").style.display = "none"
    if (typeof audio !== "undefined" && audio.Map && !audio.Map.playing()) {
      audio.Map.play()
    }
  }

  function recolorSpriteImage(img, outfitHex, hairHex, skinHex) {
    if (!img || !img.complete || img.width === 0) return img
    try {
      const c = document.createElement("canvas")
      c.width = img.width
      c.height = img.height
      const ctx = c.getContext("2d")
      ctx.drawImage(img, 0, 0)
      const imgData = ctx.getImageData(0, 0, c.width, c.height)
      const d = imgData.data

      const outfitRgb = hexToRgb(outfitHex)
      const hairRgb = hexToRgb(hairHex)
      const skinRgb = hexToRgb(skinHex)

      for (let i = 0; i < d.length; i += 4) {
        const a = d[i + 3]
        if (a < 128) continue
        const r = d[i]
        const g = d[i + 1]
        const b = d[i + 2]

        if (r > 135 && g < 95 && b < 95) {
          const lum = r / 220
          d[i] = Math.min(255, Math.round(outfitRgb.r * lum))
          d[i + 1] = Math.min(255, Math.round(outfitRgb.g * lum))
          d[i + 2] = Math.min(255, Math.round(outfitRgb.b * lum))
        } else if (r > 25 && r < 85 && g > 20 && g < 75 && b > 20 && b < 75) {
          const lum = (r + g + b) / 150
          d[i] = Math.min(255, Math.round(hairRgb.r * Math.max(0.65, lum)))
          d[i + 1] = Math.min(255, Math.round(hairRgb.g * Math.max(0.65, lum)))
          d[i + 2] = Math.min(255, Math.round(hairRgb.b * Math.max(0.65, lum)))
        } else if (r > 195 && g > 135 && g < 215 && b > 95 && b < 185 && r > g && g > b) {
          const lum = r / 245
          d[i] = Math.min(255, Math.round(skinRgb.r * lum))
          d[i + 1] = Math.min(255, Math.round(skinRgb.g * lum))
          d[i + 2] = Math.min(255, Math.round(skinRgb.b * lum))
        }
      }

      ctx.putImageData(imgData, 0, 0)
      return c
    } catch (_) {
      return img
    }
  }

  function getCustomPlayerSprites(baseSprites) {
    if (!baseSprites) return baseSprites
    const key = `${state.avatarOutfit}_${state.avatarHair}_${state.avatarSkin}`
    if (customSpriteCache && customSpriteKey === key) {
      return customSpriteCache
    }
    if (
      !baseSprites.down.complete ||
      !baseSprites.up.complete ||
      !baseSprites.left.complete ||
      !baseSprites.right.complete
    ) {
      return baseSprites
    }

    const outfitHex = getOptionColor("outfit", state.avatarOutfit)
    const hairHex = getOptionColor("hair", state.avatarHair)
    const skinHex = getOptionColor("skin", state.avatarSkin)

    customSpriteKey = key
    customSpriteCache = {
      down: recolorSpriteImage(baseSprites.down, outfitHex, hairHex, skinHex),
      up: recolorSpriteImage(baseSprites.up, outfitHex, hairHex, skinHex),
      left: recolorSpriteImage(baseSprites.left, outfitHex, hairHex, skinHex),
      right: recolorSpriteImage(baseSprites.right, outfitHex, hairHex, skinHex)
    }
    return customSpriteCache
  }

  // =========================================================================
  // SISTEMA DE DIÁLOGO JRPG / VISUAL NOVEL
  // =========================================================================
  function stripHtmlTags(html) {
    const tmp = document.createElement("div")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  function renderCurrentDialogueLine() {
    const line = dialogueState.lines[dialogueState.index]
    if (!line) return

    const nameEl = document.getElementById("jrpgSpeakerName")
    const roleEl = document.getElementById("jrpgSpeakerRole")
    const textEl = document.getElementById("jrpgDialogueText")
    const leftWrap = document.getElementById("jrpgLeftWrap")
    const rightWrap = document.getElementById("jrpgRightWrap")
    const nextHint = document.getElementById("jrpgNextHint")

    nameEl.textContent = line.speaker
    roleEl.textContent = line.role || ""

    if (line.side === "left") {
      leftWrap.classList.add("speaking")
      leftWrap.classList.remove("listening")
      rightWrap.classList.add("listening")
      rightWrap.classList.remove("speaking")
    } else {
      rightWrap.classList.add("speaking")
      rightWrap.classList.remove("listening")
      leftWrap.classList.add("listening")
      leftWrap.classList.remove("speaking")
    }

    if (dialogueState.timer) {
      clearInterval(dialogueState.timer)
      dialogueState.timer = null
    }

    dialogueState.fullHtmlText = line.html
    dialogueState.fullPlainText = stripHtmlTags(line.html)
    dialogueState.charIndex = 0
    textEl.textContent = ""
    nextHint.textContent =
      dialogueState.index === dialogueState.lines.length - 1 ? "▶ Iniciar Missão" : "▼"

    dialogueState.timer = setInterval(() => {
      dialogueState.charIndex += 2
      if (dialogueState.charIndex >= dialogueState.fullPlainText.length) {
        clearInterval(dialogueState.timer)
        dialogueState.timer = null
        textEl.innerHTML = dialogueState.fullHtmlText
      } else {
        textEl.textContent = dialogueState.fullPlainText.slice(0, dialogueState.charIndex)
        if (dialogueState.charIndex % 6 === 0) {
          playTone("blip")
        }
      }
    }, 24)

    if (line.speechEn) {
      setTimeout(() => speakEnglish(line.speechEn, 0.94), 120)
    }
  }

  function startNpcDialogue(npc) {
    closeAllModals()
    if (typeof battle !== "undefined") battle.initiated = true

    const themeKey = npc && npc.themeKey ? npc.themeKey : state.theme
    const theme = THEMES[themeKey] || THEMES.games

    // Carrega os retratos da pasta img/portraits/ (com fallback pixel art automático)
    renderJrpgPortrait(
      document.getElementById("jrpgLeftCanvas"),
      state.avatarPortrait || "player",
      {
        hairColor: getOptionColor("hair", state.avatarHair),
        outfitColor: getOptionColor("outfit", state.avatarOutfit),
        skinColor: getOptionColor("skin", state.avatarSkin),
        accentColor: "#facc15",
        hat: state.equipped
      }
    )

    renderJrpgPortrait(document.getElementById("jrpgRightCanvas"), themeKey, {
      style: themeKey,
      hairColor: theme.hairColor,
      outfitColor: theme.outfitColor,
      skinColor: theme.skinColor,
      accentColor: theme.accentColor,
      eyeColor: themeKey === "reading" ? "#059669" : "#0f172a"
    })

    drawMascotIcon(document.getElementById("jrpgMascotCanvas"), themeKey)

    dialogueState.active = true
    dialogueState.index = 0
    dialogueState.lines = [
      {
        side: "right",
        speaker: theme.npcName,
        role: theme.label,
        html: theme.introPt.replace("{name}", state.name),
        speechEn: theme.introEn
      },
      {
        side: "left",
        speaker: state.name,
        role: `Nv.${state.level} • Explorador`,
        html: theme.replyPt,
        speechEn: theme.replyEn
      }
    ]
    dialogueState.onComplete = () => {
      openMission("npc", themeKey)
    }

    document.getElementById("jrpgDialogueOverlay").style.display = "flex"
    renderCurrentDialogueLine()
  }

  function advanceDialogue() {
    if (!dialogueState.active) return

    if (dialogueState.timer) {
      clearInterval(dialogueState.timer)
      dialogueState.timer = null
      document.getElementById("jrpgDialogueText").innerHTML = dialogueState.fullHtmlText
      playTone("click")
      return
    }

    dialogueState.index += 1
    if (dialogueState.index < dialogueState.lines.length) {
      playTone("click")
      renderCurrentDialogueLine()
    } else {
      const callback = dialogueState.onComplete
      dialogueState.active = false
      document.getElementById("jrpgDialogueOverlay").style.display = "none"
      if (typeof callback === "function") {
        callback()
      } else if (typeof battle !== "undefined") {
        battle.initiated = false
      }
    }
  }

  function speakDialogueLine() {
    const line = dialogueState.lines[dialogueState.index]
    if (line && line.speechEn) {
      speakEnglish(line.speechEn, 0.92)
    }
  }

  // =========================================================================
  // MISSÕES, BAÚS, LOJA, RANKING E PAINEL DO PROFESSOR
  // =========================================================================
  function getRandomQuestion(themeKey) {
    const targetTheme = THEMES[themeKey] ? themeKey : state.theme
    const themeBank = QUESTIONS[targetTheme] || QUESTIONS.games
    const levelBank = themeBank[state.level] || themeBank[1]
    const candidates = levelBank.filter((q) => q.en !== lastQuestionEn)
    const pool = candidates.length > 0 ? candidates : levelBank
    const chosen = pool[Math.floor(Math.random() * pool.length)]
    lastQuestionEn = chosen.en
    return chosen
  }

  function revealListeningText() {
    if (!currentQuestion || textRevealed) return
    textRevealed = true
    const enText = document.getElementById("missionEnText")
    const revealBtn = document.getElementById("btnRevealText")
    enText.textContent = `"${currentQuestion.en}"`
    if (revealBtn) revealBtn.style.display = "none"
    playTone("click")
  }

  function renderWordBuilder() {
    const targetBox = document.getElementById("wordBuilderTarget")
    const bankBox = document.getElementById("wordBuilderBank")
    targetBox.innerHTML = ""
    bankBox.innerHTML = ""

    if (selectedWordIndices.length === 0) {
      targetBox.innerHTML =
        '<span style="font-size:8px; color:#64748b;">Toque nos blocos abaixo na ordem correta...</span>'
    } else {
      selectedWordIndices.forEach((shuffledIdx, posInAnswer) => {
        const chip = document.createElement("button")
        chip.className = "robo-word-chip selected"
        chip.textContent = shuffledWords[shuffledIdx].word
        chip.disabled = questionAnswered
        chip.onclick = () => {
          if (questionAnswered) return
          selectedWordIndices.splice(posInAnswer, 1)
          playTone("click")
          renderWordBuilder()
        }
        targetBox.appendChild(chip)
      })
    }

    shuffledWords.forEach((item, shuffledIdx) => {
      const isUsed = selectedWordIndices.includes(shuffledIdx)
      const btn = document.createElement("button")
      btn.className = "robo-word-chip"
      btn.textContent = item.word
      btn.disabled = isUsed || questionAnswered
      if (isUsed) {
        btn.style.opacity = "0.35"
      }
      btn.onclick = () => {
        if (questionAnswered || isUsed) return
        selectedWordIndices.push(shuffledIdx)
        playTone("click")
        renderWordBuilder()
      }
      bankBox.appendChild(btn)
    })
  }

  function checkWordOrder(source) {
    if (questionAnswered || !currentQuestion) return
    if (selectedWordIndices.length !== currentQuestion.words.length) {
      playTone("wrong")
      const feedback = document.getElementById("missionFeedback")
      feedback.style.display = "block"
      feedback.style.background = "#422006"
      feedback.style.borderColor = "#f59e0b"
      feedback.innerHTML =
        '<div style="color:#fcd34d;">⚠️ Use todos os blocos de palavras antes de verificar!</div>'
      return
    }

    const builtSentence = selectedWordIndices
      .map((idx) => shuffledWords[idx].word)
      .join(" ")
    const expectedSentence = currentQuestion.words.join(" ")
    const isCorrect = builtSentence === expectedSentence

    finalizeMissionResult(isCorrect, source, expectedSentence)
  }

  function openMission(source = "hud", customTheme = null) {
    closeAllModals()
    if (typeof battle !== "undefined") {
      battle.initiated = true
    }

    activeMissionTheme = customTheme || state.theme
    currentQuestion = getRandomQuestion(activeMissionTheme)
    questionAnswered = false
    textRevealed = currentQuestion.type !== "listen"
    selectedWordIndices = []

    const themeInfo = THEMES[activeMissionTheme] || THEMES.games
    const badge = document.getElementById("missionSourceBadge")
    const streakBanner = document.getElementById("missionStreakBanner")
    const enText = document.getElementById("missionEnText")
    const revealBtn = document.getElementById("btnRevealText")
    const ptText = document.getElementById("missionPtText")
    const optionsBox = document.getElementById("missionOptions")
    const wordBuilderBox = document.getElementById("wordBuilderContainer")
    const feedback = document.getElementById("missionFeedback")

    if (source === "npc") {
      badge.textContent = `💬 ${themeInfo.npcName.toUpperCase()} (${themeInfo.label})`
      badge.style.background = "#1d4ed8"
    } else if (currentQuestion.type === "listen") {
      badge.textContent = "🎧 ESCUTA PURA • 2X MOEDAS"
      badge.style.background = "#0e7490"
    } else if (currentQuestion.type === "order") {
      badge.textContent = "🧩 MONTE A FRASE"
      badge.style.background = "#6d28d9"
    } else if (source === "grass") {
      badge.textContent = "⚡ ENCONTRO NA GRAMA"
      badge.style.background = "#15803d"
    } else {
      badge.textContent = `🎯 MISSÃO • ${themeInfo.label.toUpperCase()}`
      badge.style.background = "#7e22ce"
    }

    if (state.streak >= 2) {
      streakBanner.style.display = "block"
      streakBanner.textContent =
        state.streak >= 3
          ? `🔥 COMBO ATIVO (${state.streak} acertos): +50% XP e Moedas!`
          : `🔥 ${state.streak} acertos seguidos! Acerte mais 1 para ativar o bônus 1.5x!`
    } else {
      streakBanner.style.display = "none"
    }

    if (currentQuestion.type === "listen") {
      enText.textContent = "🎧 Ouça a pronúncia nos botões abaixo..."
      revealBtn.style.display = "inline-block"
    } else {
      enText.textContent = `"${currentQuestion.en}"`
      revealBtn.style.display = "none"
    }

    ptText.textContent = currentQuestion.pt
    feedback.style.display = "none"
    feedback.innerHTML = ""
    optionsBox.innerHTML = ""

    if (currentQuestion.type === "order") {
      optionsBox.style.display = "none"
      wordBuilderBox.style.display = "block"
      shuffledWords = shuffleArray(currentQuestion.words)
      const checkBtn = document.getElementById("btnCheckOrder")
      checkBtn.disabled = false
      checkBtn.onclick = () => checkWordOrder(source)
      renderWordBuilder()
    } else {
      wordBuilderBox.style.display = "none"
      optionsBox.style.display = "block"

      const shuffledOpts = currentQuestion.options.map((text, idx) => ({
        text,
        isCorrect: idx === currentQuestion.correct
      }))
      for (let i = shuffledOpts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledOpts[i], shuffledOpts[j]] = [shuffledOpts[j], shuffledOpts[i]]
      }

      shuffledOpts.forEach((optObj, idx) => {
        const btn = document.createElement("button")
        btn.className = "robo-option-btn"
        btn.dataset.correct = optObj.isCorrect ? "true" : "false"
        btn.textContent = `${["A", "B", "C"][idx]}) ${optObj.text}`
        btn.onclick = () => handleQuizAnswer(optObj.isCorrect, btn, source)
        optionsBox.appendChild(btn)
      })
    }

    document.getElementById("missionModal").style.display = "flex"
    setTimeout(() => speakEnglish(currentQuestion.en, 0.92), 250)
  }

  function handleQuizAnswer(isCorrect, btnEl, source) {
    if (questionAnswered) return
    const allBtns = document.querySelectorAll(".robo-option-btn")
    allBtns.forEach((b) => {
      b.disabled = true
      if (b.dataset.correct === "true") {
        b.style.background = "#16a34a"
        b.style.color = "#fff"
        b.style.borderColor = "#bbf7d0"
      }
    })

    if (!isCorrect) {
      btnEl.style.background = "#dc2626"
      btnEl.style.color = "#fff"
    }

    finalizeMissionResult(isCorrect, source)
  }

  function finalizeMissionResult(isCorrect, source, extraCorrectInfo = "") {
    questionAnswered = true
    state.totalAttempts += 1

    const feedback = document.getElementById("missionFeedback")
    const enText = document.getElementById("missionEnText")
    const revealBtn = document.getElementById("btnRevealText")
    const checkBtn = document.getElementById("btnCheckOrder")

    enText.textContent = `"${currentQuestion.en}"`
    if (revealBtn) revealBtn.style.display = "none"
    if (checkBtn) checkBtn.disabled = true

    if (isCorrect) {
      state.streak += 1
      const grassBonus = source === "grass" ? 5 : 0
      const listeningDouble = currentQuestion.type === "listen" && !textRevealed ? 2 : 1
      const comboMultiplier = state.streak >= 3 ? 1.5 : 1

      const earnedXp = Math.round((20 + state.level * 10) * comboMultiplier)
      const earnedCoins = Math.round(
        (10 + state.level * 5 + grassBonus) * listeningDouble * comboMultiplier
      )

      state.xp += earnedXp
      state.coins += earnedCoins
      state.solvedCount += 1

      if (state.xp >= state.level * 150 && state.level < 3) {
        state.level += 1
      }

      saveState()
      playTone("win")

      const badges = []
      if (listeningDouble === 2) badges.push("🎧 2x Escuta Pura")
      if (comboMultiplier > 1) badges.push(`🔥 Combo ${state.streak}x`)

      feedback.style.display = "block"
      feedback.style.background = "#052e16"
      feedback.style.borderColor = "#22c55e"
      feedback.innerHTML = `
        <div style="color:#4ade80; margin-bottom:6px;">
          ✅ EXCELENTE! +${earnedXp} XP e +${earnedCoins} EduCoins!
        </div>
        ${
          badges.length
            ? `<div style="color:#facc15; font-size:8px; margin-bottom:6px;">${badges.join(
                " • "
              )}</div>`
            : ""
        }
        <div style="color:#e2e8f0; font-size:9px; line-height:1.5;">💡 ${
          currentQuestion.tip
        }</div>
        <button onclick="Robolingo.openMission('${source}', '${activeMissionTheme}')" style="margin-top:10px; width:100%; padding:9px; background:#16a34a; color:#fff; border-radius:8px; font-size:9px;">
          ▶ Próxima Missão
        </button>
      `
    } else {
      state.streak = 0
      saveState()
      playTone("wrong")

      feedback.style.display = "block"
      feedback.style.background = "#450a0a"
      feedback.style.borderColor = "#ef4444"
      feedback.innerHTML = `
        <div style="color:#fca5a5; margin-bottom:6px;">❌ QUASE LÁ! Sequência reiniciada.</div>
        ${
          extraCorrectInfo
            ? `<div style="color:#86efac; font-size:9px; margin-bottom:6px;">Ordem correta: "${extraCorrectInfo}"</div>`
            : ""
        }
        <div style="color:#e2e8f0; font-size:9px; line-height:1.5;">💡 ${
          currentQuestion.tip
        }</div>
        <button onclick="Robolingo.openMission('${source}', '${activeMissionTheme}')" style="margin-top:10px; width:100%; padding:9px; background:#dc2626; color:#fff; border-radius:8px; font-size:9px;">
          ↻ Tentar Novo Desafio
        </button>
      `
    }
  }

  function openChest(chestSpot) {
    closeAllModals()
    if (typeof battle !== "undefined") battle.initiated = true
    activeChest = chestSpot

    const alreadyOpened = state.openedChests.includes(chestSpot.id)
    const rewardBox = document.getElementById("chestRewardBanner")

    document.getElementById("chestWord").textContent = `"${chestSpot.word}"`
    document.getElementById("chestMeaning").textContent = `Tradução: ${chestSpot.meaning}`
    document.getElementById("chestExample").textContent = `Exemplo: "${chestSpot.example}"`
    document.getElementById("chestTip").textContent = `💡 ${chestSpot.tip}`

    if (!alreadyOpened) {
      state.openedChests.push(chestSpot.id)
      state.xp += 15
      state.coins += 15
      saveState()
      playTone("win")
      rewardBox.style.background = "#052e16"
      rewardBox.style.borderColor = "#22c55e"
      rewardBox.style.color = "#4ade80"
      rewardBox.textContent = `🎉 BAÚ DESCOBERTO (${state.openedChests.length}/${CHEST_SPOTS.length})! +15 XP e +15 EduCoins!`
    } else {
      playTone("click")
      rewardBox.style.background = "#1e293b"
      rewardBox.style.borderColor = "#64748b"
      rewardBox.style.color = "#cbd5e1"
      rewardBox.textContent = `📦 Baú já coletado (${state.openedChests.length}/${CHEST_SPOTS.length}). Revise a expressão!`
    }

    document.getElementById("chestModal").style.display = "flex"
    setTimeout(() => speakEnglish(chestSpot.word, 0.9), 200)
  }

  function openShop() {
    closeAllModals()
    if (typeof battle !== "undefined") battle.initiated = true

    const list = document.getElementById("shopItemsList")
    document.getElementById("shopBalance").textContent = `Saldo: 🪙 ${state.coins} EduCoins`
    list.innerHTML = ""

    SHOP_ITEMS.forEach((item) => {
      const owned = state.owned.includes(item.id)
      const equipped =
        item.slot === "pet"
          ? state.equippedPet === item.id
          : state.equipped === item.id

      const card = document.createElement("div")
      card.className = "robo-shop-card"
      card.innerHTML = `
        <div>
          <div style="font-size:10px; color:#f8fafc; margin-bottom:4px;">${item.name}</div>
          <div style="font-size:8px; color:#94a3b8; line-height:1.4;">${item.desc}</div>
        </div>
        <button class="robo-mini-btn" style="background:${
          equipped ? "#16a34a" : owned ? "#2563eb" : "#d97706"
        }">
          ${equipped ? "Equipado" : owned ? "Equipar" : `🪙 ${item.price}`}
        </button>
      `
      card.querySelector("button").onclick = () => {
        if (owned) {
          if (item.slot === "pet") {
            state.equippedPet = state.equippedPet === item.id ? null : item.id
          } else {
            state.equipped = item.id
          }
          saveState()
          playTone("click")
          openShop()
        } else if (state.coins >= item.price) {
          state.coins -= item.price
          state.owned.push(item.id)
          if (item.slot === "pet") {
            state.equippedPet = item.id
          } else {
            state.equipped = item.id
          }
          saveState()
          playTone("win")
          openShop()
        } else {
          playTone("wrong")
          alert("EduCoins insuficientes! Fale com os Mentores ou abra Baús na vila.")
        }
      }
      list.appendChild(card)
    })

    document.getElementById("shopModal").style.display = "flex"
  }

  function openRanking() {
    closeAllModals()
    if (typeof battle !== "undefined") battle.initiated = true

    const themeInfo = THEMES[state.theme] || THEMES.games
    const combined = [
      ...CLASSMATES,
      { name: `${state.name} (Você)`, theme: themeInfo.label, xp: state.xp, isMe: true }
    ].sort((a, b) => b.xp - a.xp)

    const list = document.getElementById("rankingList")
    list.innerHTML = ""

    combined.forEach((entry, idx) => {
      const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`
      const row = document.createElement("div")
      row.className = "robo-rank-row"
      if (entry.isMe) {
        row.style.borderColor = "#facc15"
        row.style.background = "#1e293b"
      }
      row.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px;">${medal}</span>
          <div>
            <div style="font-size:10px; color:${entry.isMe ? "#facc15" : "#f8fafc"};">${
        entry.name
      }</div>
            <div style="font-size:8px; color:#94a3b8; margin-top:3px;">${entry.theme}</div>
          </div>
        </div>
        <div style="font-size:10px; color:#38bdf8;">${entry.xp} XP</div>
      `
      list.appendChild(row)
    })

    document.getElementById("rankModal").style.display = "flex"
  }

  function getFormattedReceiptText() {
    const themeInfo = THEMES[state.theme] || THEMES.games
    const acc = getAccuracyPercent()
    const code = generateStudentCode()
    return [
      "🤖 COMPROVANTE ROBOLINGO RPG",
      `👤 Aluno: ${state.name}`,
      `🎯 Tema: ${themeInfo.label} (Nível ${state.level})`,
      `⭐ XP Total: ${state.xp} XP`,
      `✅ Missões Concluídas: ${state.solvedCount} (${acc}% de acertos)`,
      `🎁 Baús Descobertos: ${state.openedChests.length}/${CHEST_SPOTS.length}`,
      `🔐 Código: ${code}`
    ].join("\n")
  }

  function openReportModal() {
    closeAllModals()
    if (typeof battle !== "undefined") battle.initiated = true

    const themeInfo = THEMES[state.theme] || THEMES.games
    const acc = getAccuracyPercent()

    document.getElementById("reportStudentSummary").innerHTML = `
      <div style="font-size:11px; color:#facc15; margin-bottom:8px;">👤 ${state.name}</div>
      <div style="font-size:9px; color:#e2e8f0; line-height:1.7;">
        • Tema: <span style="color:#38bdf8;">${themeInfo.label}</span> (Nível ${state.level})<br/>
        • Pontuação: <span style="color:#c084fc;">${state.xp} XP</span> | 🪙 ${state.coins} EduCoins<br/>
        • Missões Certas: <span style="color:#4ade80;">${state.solvedCount}</span> (${acc}% de aproveitamento)<br/>
        • Baús Encontrados: <span style="color:#34d399;">${state.openedChests.length}/${CHEST_SPOTS.length}</span>
      </div>
    `
    document.getElementById("reportPreviewText").value = getFormattedReceiptText()
    const copyBtn = document.getElementById("btnCopyReceipt")
    copyBtn.textContent = "📋 Copiar Comprovante para Enviar"
    copyBtn.style.background = "#16a34a"

    document.getElementById("reportModal").style.display = "flex"
  }

  function copyReceipt() {
    const text = document.getElementById("reportPreviewText").value
    const copyBtn = document.getElementById("btnCopyReceipt")

    const onCopied = () => {
      playTone("win")
      copyBtn.textContent = "✅ Copiado! Cole no WhatsApp/Classroom"
      copyBtn.style.background = "#0284c7"
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(onCopied)
        .catch(() => {
          const area = document.getElementById("reportPreviewText")
          area.select()
          document.execCommand("copy")
          onCopied()
        })
    } else {
      const area = document.getElementById("reportPreviewText")
      area.select()
      document.execCommand("copy")
      onCopied()
    }
  }

  function openTeacherModal() {
    closeAllModals()
    if (typeof battle !== "undefined") battle.initiated = true

    const lockBox = document.getElementById("teacherLockBox")
    const panelBox = document.getElementById("teacherDashboardBox")

    if (teacherUnlocked) {
      lockBox.style.display = "none"
      panelBox.style.display = "block"
      renderTeacherTable()
    } else {
      lockBox.style.display = "block"
      panelBox.style.display = "none"
      document.getElementById("inputTeacherPin").value = ""
      document.getElementById("teacherPinError").style.display = "none"
    }

    document.getElementById("teacherModal").style.display = "flex"
  }

  function unlockTeacherPanel() {
    const pin = document.getElementById("inputTeacherPin").value.trim()
    if (pin === TEACHER_PIN) {
      teacherUnlocked = true
      playTone("win")
      document.getElementById("teacherLockBox").style.display = "none"
      document.getElementById("teacherDashboardBox").style.display = "block"
      renderTeacherTable()
    } else {
      playTone("wrong")
      document.getElementById("teacherPinError").style.display = "block"
    }
  }

  function processTeacherCodes() {
    const rawInput = document.getElementById("teacherPasteArea").value
    const statusEl = document.getElementById("teacherImportStatus")
    const matches = rawInput.match(/RB-[A-Za-z0-9+/=]+-[A-Z0-9]{4}/g)

    if (!matches || matches.length === 0) {
      playTone("wrong")
      statusEl.style.display = "block"
      statusEl.style.color = "#fca5a5"
      statusEl.textContent = "⚠️ Nenhum código 'RB-...' encontrado no texto colado."
      return
    }

    let validCount = 0
    let invalidCount = 0

    matches.forEach((token) => {
      const parsed = parseStudentCode(token)
      if (!parsed || !parsed.valid) {
        invalidCount += 1
        return
      }
      validCount += 1
      const existingIdx = teacherRecords.findIndex(
        (r) => r.name.toLowerCase() === parsed.name.toLowerCase()
      )
      if (existingIdx >= 0) {
        if (parsed.xp >= teacherRecords[existingIdx].xp) {
          teacherRecords[existingIdx] = parsed
        }
      } else {
        teacherRecords.push(parsed)
      }
    })

    teacherRecords.sort((a, b) => b.xp - a.xp)
    saveTeacherRecords()
    renderTeacherTable()

    document.getElementById("teacherPasteArea").value = ""
    statusEl.style.display = "block"
    if (invalidCount > 0) {
      playTone("wrong")
      statusEl.style.color = "#fcd34d"
      statusEl.textContent = `✅ ${validCount} importado(s) | 🚨 ${invalidCount} código(s) inválido(s) ignorado(s).`
    } else {
      playTone("win")
      statusEl.style.color = "#4ade80"
      statusEl.textContent = `✅ ${validCount} comprovante(s) validado(s) com sucesso!`
    }
  }

  function renderTeacherTable() {
    const statsEl = document.getElementById("teacherClassStats")
    const listEl = document.getElementById("teacherStudentList")

    if (teacherRecords.length === 0) {
      statsEl.innerHTML = "Nenhum aluno importado ainda."
      listEl.innerHTML =
        '<div style="font-size:8px; color:#94a3b8; padding:10px; text-align:center;">Cole acima os comprovantes enviados pelos alunos para gerar o boletim da turma.</div>'
      return
    }

    const totalStudents = teacherRecords.length
    const avgXp = Math.round(
      teacherRecords.reduce((acc, r) => acc + r.xp, 0) / totalStudents
    )
    const avgAcc = Math.round(
      teacherRecords.reduce((acc, r) => acc + r.accuracy, 0) / totalStudents
    )

    statsEl.innerHTML = `👥 ${totalStudents} aluno(s) • ⭐ Média: ${avgXp} XP • 🎯 Acertos: ${avgAcc}%`
    listEl.innerHTML = ""

    teacherRecords.forEach((rec, idx) => {
      const themeInfo = THEMES[rec.theme] || { label: rec.theme }
      const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`
      const row = document.createElement("div")
      row.className = "robo-rank-row"
      row.innerHTML = `
        <div>
          <div style="font-size:10px; color:#facc15;">${medal} ${rec.name} <span style="color:#94a3b8; font-size:8px;">(Nv.${rec.level})</span></div>
          <div style="font-size:8px; color:#cbd5e1; margin-top:4px;">
            ${themeInfo.label} • ✅ ${rec.solved} (${rec.accuracy}%) • 🎁 ${rec.chests}/5
          </div>
        </div>
        <div style="font-size:10px; color:#38bdf8; white-space:nowrap;">${rec.xp} XP</div>
      `
      listEl.appendChild(row)
    })
  }

  function exportTeacherCSV() {
    if (teacherRecords.length === 0) {
      playTone("wrong")
      alert("Importe pelo menos um comprovante antes de baixar a planilha.")
      return
    }

    const header = [
      "Posicao",
      "Aluno",
      "Tema",
      "Nivel",
      "XP_Total",
      "Missoes_Certas",
      "Aproveitamento_%",
      "Baus_Coletados"
    ].join(";")

    const rows = teacherRecords.map((r, idx) => {
      const themeLabel = (THEMES[r.theme] ? THEMES[r.theme].label : r.theme)
        .replace(/[^\w\sÀ-ÿ&]/g, "")
        .trim()
      return [
        idx + 1,
        `"${r.name.replace(/"/g, '""')}"`,
        `"${themeLabel}"`,
        r.level,
        r.xp,
        r.solved,
        `${r.accuracy}%`,
        `${r.chests}/5`
      ].join(";")
    })

    const csvContent = "\uFEFF" + [header, ...rows].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `relatorio_robolingo_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    playTone("win")
  }

  function clearTeacherRecords() {
    if (!confirm("Deseja limpar a lista atual de alunos importados?")) return
    teacherRecords = []
    saveTeacherRecords()
    renderTeacherTable()
    playTone("click")
  }

  // =========================================================================
  // DESENHO DOS 7 MENTORES ÚNICOS, BAÚS, PETS E MINIMAPA
  // =========================================================================
  function drawNpcDecorations(ctx, char) {
    const themeKey = char.themeKey || "games"
    const themeInfo = THEMES[themeKey] || THEMES.games
    const x = char.position.x
    const y = char.position.y
    const w = char.width || 48
    const floatY = Math.sin(Date.now() / 220 + x) * 2.5

    ctx.save()

    if (themeKey === "science") {
      ctx.fillStyle = "#f8fafc"
      ctx.fillRect(x + 12, y + 34, 24, 22)
      ctx.fillStyle = "#059669"
      ctx.fillRect(x + 22, y + 36, 4, 14)
    } else if (themeKey === "cooking") {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(x + 14, y - 3, 20, 10)
      ctx.fillStyle = "#fb923c"
      ctx.fillRect(x + 14, y + 36, 20, 18)
    } else if (themeKey === "games") {
      ctx.fillStyle = "#2563eb"
      ctx.fillRect(x + 12, y + 34, 24, 18)
      ctx.fillStyle = "#38bdf8"
      ctx.fillRect(x + 9, y + 12, 5, 10)
      ctx.fillRect(x + 34, y + 12, 5, 10)
    } else if (themeKey === "manga") {
      ctx.fillStyle = "#dc2626"
      ctx.fillRect(x + 11, y + 9, 26, 5)
      ctx.fillRect(x + 12, y + 34, 24, 18)
    } else if (themeKey === "fashion") {
      ctx.fillStyle = "#db2777"
      ctx.fillRect(x + 12, y + 34, 24, 18)
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(x + 14, y + 16, 20, 5)
      ctx.fillStyle = "#f472b6"
      ctx.fillRect(x + 15, y + 17, 7, 3)
      ctx.fillRect(x + 26, y + 17, 7, 3)
    } else if (themeKey === "movies") {
      ctx.fillStyle = "#d97706"
      ctx.fillRect(x + 11, y + 3, 26, 7)
      ctx.fillStyle = "#facc15"
      ctx.fillRect(x + 20, y + 34, 8, 18)
    } else if (themeKey === "reading") {
      ctx.fillStyle = "#7c3aed"
      ctx.fillRect(x + 11, y + 4, 26, 8)
      ctx.fillRect(x + 11, y + 34, 26, 22)
    }

    ctx.font = 'bold 8px "Press Start 2P", monospace'
    const tag = themeInfo.shortTag
    const textW = ctx.measureText(tag).width
    ctx.fillStyle = "rgba(15, 23, 42, 0.88)"
    ctx.fillRect(x + w / 2 - textW / 2 - 5, y - 22, textW + 10, 14)
    ctx.strokeStyle = themeInfo.accentColor
    ctx.lineWidth = 1.5
    ctx.strokeRect(x + w / 2 - textW / 2 - 5, y - 22, textW + 10, 14)

    ctx.fillStyle = "#f8fafc"
    ctx.fillText(tag, x + w / 2 - textW / 2, y - 12)

    ctx.fillStyle = "#facc15"
    ctx.fillText("!", x + w / 2 - 4, y - 28 + floatY)

    ctx.restore()
  }

  function drawChest(ctx, chest) {
    const opened = state.openedChests.includes(chest.id)
    const x = chest.position.x + 8
    const y = chest.position.y + 12

    ctx.save()
    ctx.fillStyle = "rgba(0,0,0,0.35)"
    ctx.fillRect(x + 2, y + 22, 28, 6)

    ctx.fillStyle = opened ? "#78350f" : "#b45309"
    ctx.fillRect(x, y + 8, 32, 16)
    ctx.strokeStyle = "#0f172a"
    ctx.lineWidth = 2
    ctx.strokeRect(x, y + 8, 32, 16)

    ctx.fillStyle = opened ? "#451a03" : "#d97706"
    ctx.fillRect(x, opened ? y : y + 2, 32, 8)
    ctx.strokeRect(x, opened ? y : y + 2, 32, 8)

    if (!opened) {
      ctx.fillStyle = "#facc15"
      ctx.fillRect(x + 13, y + 8, 6, 7)
    }

    ctx.restore()
  }

  function drawFollowerPet(ctx, playerObj) {
    if (!state.equippedPet || !playerObj || !playerObj.position) return

    const dir = window.lastKey || "s"
    let offsetX = -34
    let offsetY = 22
    if (dir === "d") {
      offsetX = -36
      offsetY = 24
    } else if (dir === "a") {
      offsetX = 50
      offsetY = 24
    } else if (dir === "w") {
      offsetX = 10
      offsetY = 54
    } else {
      offsetX = -34
      offsetY = 18
    }

    const targetX = playerObj.position.x + offsetX
    const targetY = playerObj.position.y + offsetY

    if (petPos.x === null || Math.hypot(targetX - petPos.x, targetY - petPos.y) > 220) {
      petPos.x = targetX
      petPos.y = targetY
    } else {
      petPos.x += (targetX - petPos.x) * 0.08
      petPos.y += (targetY - petPos.y) * 0.08
    }

    const bounce = Math.sin(Date.now() / 170) * 2.5
    const px = petPos.x
    const py = petPos.y + bounce

    ctx.save()
    ctx.fillStyle = "rgba(0,0,0,0.35)"
    ctx.beginPath()
    ctx.ellipse(px + 13, petPos.y + 25, 11, 4, 0, 0, Math.PI * 2)
    ctx.fill()

    if (state.equippedPet === "pet_dog") {
      ctx.fillStyle = "#38bdf8"
      ctx.fillRect(px + 4, py + 8, 18, 13)
      ctx.fillStyle = "#1d4ed8"
      ctx.fillRect(px + 2, py + 4, 6, 7)
      ctx.fillRect(px + 18, py + 4, 6, 7)
      ctx.fillStyle = "#facc15"
      ctx.fillRect(px + 8, py + 12, 3, 3)
      ctx.fillRect(px + 15, py + 12, 3, 3)
    } else if (state.equippedPet === "pet_owl") {
      ctx.fillStyle = "#7e22ce"
      ctx.fillRect(px + 5, py + 5, 16, 17)
      ctx.fillStyle = "#facc15"
      ctx.fillRect(px + 7, py + 9, 4, 4)
      ctx.fillRect(px + 15, py + 9, 4, 4)
      ctx.fillStyle = "#fb923c"
      ctx.fillRect(px + 12, py + 13, 3, 3)
    } else if (state.equippedPet === "pet_dragon") {
      ctx.fillStyle = "#16a34a"
      ctx.fillRect(px + 4, py + 6, 18, 16)
      ctx.fillStyle = "#facc15"
      ctx.fillRect(px + 6, py + 2, 4, 4)
      ctx.fillRect(px + 16, py + 2, 4, 4)
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(px + 8, py + 10, 3, 3)
      ctx.fillRect(px + 15, py + 10, 3, 3)
    }

    ctx.restore()
  }

  function drawPlayerCosmetics(ctx, playerObj) {
    if (!playerObj || !playerObj.position) return
    drawFollowerPet(ctx, playerObj)

    const x = playerObj.position.x
    const y = playerObj.position.y
    const w = playerObj.width || 48
    const h = playerObj.height || 68

    ctx.save()

    if (state.equipped === "aura") {
      ctx.strokeStyle = "rgba(250, 204, 21, 0.85)"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.ellipse(x + w / 2, y + h - 8, 22, 10, 0, 0, Math.PI * 2)
      ctx.stroke()
    }

    if (state.equipped === "cap") {
      ctx.fillStyle = getOptionColor("outfit", state.avatarOutfit)
      ctx.fillRect(x + 12, y + 4, 24, 8)
      ctx.fillStyle = "#93c5fd"
      ctx.fillRect(x + 16, y + 10, 20, 4)
    } else if (state.equipped === "crown") {
      ctx.fillStyle = "#facc15"
      ctx.fillRect(x + 14, y + 2, 20, 7)
      ctx.fillRect(x + 14, y - 3, 4, 5)
      ctx.fillRect(x + 22, y - 4, 4, 6)
      ctx.fillRect(x + 30, y - 3, 4, 5)
    } else if (state.equipped === "headset") {
      ctx.fillStyle = "#a855f7"
      ctx.fillRect(x + 11, y + 4, 26, 4)
      ctx.fillStyle = "#22d3ee"
      ctx.fillRect(x + 9, y + 8, 5, 10)
      ctx.fillRect(x + 34, y + 8, 5, 10)
    } else if (state.equipped === "glasses") {
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(x + 14, y + 16, 20, 5)
      ctx.fillStyle = "#38bdf8"
      ctx.fillRect(x + 15, y + 17, 7, 3)
      ctx.fillRect(x + 26, y + 17, 7, 3)
    }

    ctx.font = 'bold 9px "Press Start 2P", monospace'
    const label = `${state.name} [Nv.${state.level}]`
    const textW = ctx.measureText(label).width
    ctx.fillStyle = "rgba(15, 23, 42, 0.82)"
    ctx.fillRect(x + w / 2 - textW / 2 - 6, y - 22, textW + 12, 16)
    ctx.fillStyle = "#facc15"
    ctx.fillText(label, x + w / 2 - textW / 2, y - 10)

    ctx.restore()
  }

  function buildMinimapBase(collisionsMap, battleZonesMap) {
    const off = document.createElement("canvas")
    off.width = 140
    off.height = 80
    const ctx = off.getContext("2d")

    ctx.fillStyle = "#166534"
    ctx.fillRect(0, 0, 140, 80)

    for (let r = 0; r < collisionsMap.length; r++) {
      for (let c = 0; c < collisionsMap[r].length; c++) {
        if (collisionsMap[r][c] === 1025) {
          ctx.fillStyle = "#0f172a"
          ctx.fillRect(c * 2, r * 2, 2, 2)
        } else if (battleZonesMap[r] && battleZonesMap[r][c] === 1025) {
          ctx.fillStyle = "#22c55e"
          ctx.fillRect(c * 2, r * 2, 2, 2)
        }
      }
    }
    return off
  }

  function drawMinimap(playerObj, backgroundObj, characters, chests, collisionsMap, battleZonesMap) {
    const mmCanvas = document.getElementById("minimapCanvas")
    if (!mmCanvas || !playerObj || !backgroundObj) return
    const ctx = mmCanvas.getContext("2d")

    if (!minimapBaseCanvas && collisionsMap && battleZonesMap) {
      minimapBaseCanvas = buildMinimapBase(collisionsMap, battleZonesMap)
    }

    ctx.clearRect(0, 0, mmCanvas.width, mmCanvas.height)
    if (minimapBaseCanvas) {
      ctx.drawImage(minimapBaseCanvas, 0, 0, mmCanvas.width, mmCanvas.height)
    }

    const scaleX = mmCanvas.width / (70 * 48)
    const scaleY = mmCanvas.height / (40 * 48)

    chests.forEach((ch) => {
      if (state.openedChests.includes(ch.id)) return
      const wx = ch.position.x - backgroundObj.position.x + 24
      const wy = ch.position.y - backgroundObj.position.y + 24
      ctx.fillStyle = "#facc15"
      ctx.fillRect(wx * scaleX - 2, wy * scaleY - 2, 4, 4)
    })

    characters.forEach((npc) => {
      const theme = THEMES[npc.themeKey] || THEMES.games
      const wx = npc.position.x - backgroundObj.position.x + 24
      const wy = npc.position.y - backgroundObj.position.y + 34
      ctx.fillStyle = theme.accentColor
      ctx.fillRect(wx * scaleX - 2.5, wy * scaleY - 2.5, 5, 5)
    })

    const px = playerObj.position.x - backgroundObj.position.x + 24
    const py = playerObj.position.y - backgroundObj.position.y + 34
    const pulse = Math.sin(Date.now() / 160) > 0 ? 3.5 : 2.5
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.arc(px * scaleX, py * scaleY, pulse, 0, Math.PI * 2)
    ctx.fill()
  }

  function bindTouchControls() {
    const dirButtons = document.querySelectorAll("[data-dir]")
    dirButtons.forEach((btn) => {
      const dir = btn.getAttribute("data-dir")
      const press = (e) => {
        e.preventDefault()
        if (typeof keys !== "undefined" && keys[dir]) {
          keys[dir].pressed = true
          if (typeof lastKey !== "undefined") window.lastKey = dir
        }
      }
      const release = (e) => {
        e.preventDefault()
        if (typeof keys !== "undefined" && keys[dir]) {
          keys[dir].pressed = false
        }
      }
      btn.addEventListener("touchstart", press, { passive: false })
      btn.addEventListener("touchend", release, { passive: false })
      btn.addEventListener("touchcancel", release, { passive: false })
      btn.addEventListener("mousedown", press)
      btn.addEventListener("mouseup", release)
      btn.addEventListener("mouseleave", release)
    })

    const actionBtn = document.getElementById("btnMobileAction")
    if (actionBtn) {
      const act = (e) => {
        e.preventDefault()
        if (dialogueState.active) {
          advanceDialogue()
          return
        }
        if (typeof window.triggerInteraction === "function") {
          window.triggerInteraction()
        }
      }
      actionBtn.addEventListener("touchstart", act, { passive: false })
      actionBtn.addEventListener("click", act)
    }
  }

  function init() {
    loadState()
    updateHUD()
    bindTouchControls()

    if (!state.registered) {
      openLoginModal()
    }
  }

  return {
    THEMES,
    MENTOR_SPOTS,
    CHEST_SPOTS,
    init,
    openLoginModal,
    submitLogin,
    togglePortraitStyle,
    cycleZoom,
    toggleMinimap,
    getZoom: () => state.zoom || 1.0,
    getCustomPlayerSprites,
    startNpcDialogue,
    advanceDialogue,
    speakDialogueLine,
    isDialogueOpen: () => dialogueState.active,
    openMission,
    openChest,
    openShop,
    openRanking,
    openReportModal,
    copyReceipt,
    openTeacherModal,
    unlockTeacherPanel,
    processTeacherCodes,
    exportTeacherCSV,
    clearTeacherRecords,
    closeAllModals,
    revealListeningText,
    speakCurrent: () => currentQuestion && speakEnglish(currentQuestion.en, 0.92),
    speakSlow: () => currentQuestion && speakEnglish(currentQuestion.en, 0.62),
    speakChestWord: () => activeChest && speakEnglish(activeChest.word, 0.9),
    speakChestExample: () => activeChest && speakEnglish(activeChest.example, 0.9),
    drawNpcDecorations,
    drawChest,
    drawPlayerCosmetics,
    drawMinimap,
    isModalOpen
  }
})()
