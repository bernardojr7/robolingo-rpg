const canvas = document.querySelector('#gameCanvas')
const c = canvas.getContext('2d')

// ============================================================================
// 1. MAPAS E INTERIORES DO ROBOLINGO
// Legenda:
//   '#' = Parede / Obstáculo    | '.' = Chão livre
//   'P' = Porta de saída        | '1', '2', '3' = Portas de entrada
//   'S' = Ponto de chegada      | 'G' = Grama / Zona de missão surpresa
// ============================================================================
const MAPS = {
  // Mapa inicial: Vila da Ciência (40x24 = 1920x1152px)
  science_village: {
    imageSrc: './img/science_village.png',
    foregroundSrc: null,
    defaultSpawn: { col: 20, row: 14 }, // Praça central abaixo da fonte
    matrix: [
      "########################################",
      "########.......###...###################",
      "########..............####........###.##",
      "####......##..............#######.######",
      "####....####.............######.##.#####",
      "############..#####..###.##########.####",
      "#####...###.....#####..#.###...####.####",
      "####..######.....####..#.###111####.####", // '1' = Porta do Laboratório
      "###...####.#...#.##....#..........#.####",
      "##....####.#...#...22..#............####", // '2' = Casa superior
      "####.##.#..#...####..#######...####.####",
      "###.#####...........................####",
      "##..###...#.##...........##.........####",
      "##........######........####....#...####",
      "##..###...######........####....##..####",
      "###.###..####..#........##.......#..####",
      "#######..####22#..........22.....#..####", // '2' = Casas inferiores
      "#######......................###.#..####",
      "##############.......###.#######.##.####",
      "##################...###################",
      "##################...###.###############",
      "###############.........################",
      "###############.........#######.########",
      "################333#####################"  // '3' = Estrada para GraçaTown
    ],
    doors: {
      '1': { targetMap: 'robotics', targetSpawn: { col: 9, row: 12 } },
      '2': { targetMap: 'arcane_library', targetSpawn: { col: 9, row: 12 } },
      '3': { targetMap: 'gracatown', targetSpawn: { col: 19, row: 20 } }
    },
    mentors: [
      { col: 16, row: 11, theme: 'greetings' },
      { col: 23, row: 11, theme: 'travel' }
    ],
    chests: [
      { col: 25, row: 12, id: 'chest_village_1' }
    ]
  },

  // Interior do Laboratório de Robótica (20x16 = 960x768px)
  robotics: {
    imageSrc: './img/robotics.png',
    foregroundSrc: null,
    defaultSpawn: { col: 9, row: 12 },
    matrix: [
      "####################",
      "####################",
      "####################",
      "####################",
      "####################",
      "#..................#",
      "#...............#..#",
      "####...........#####",
      "####...........###.#",
      "#................#.#",
      "##................##",
      "##................##",
      "#######..S...####.##",
      "#########..#########",
      "#########PP#########",
      "####################"
    ],
    doors: {
      'P': { targetMap: 'return', fallbackMap: 'science_village' }
    },
    mentors: [
      { col: 10, row: 6, theme: 'technology' }
    ],
    chests: [
      { col: 4, row: 6, id: 'chest_lab_1' }
    ]
  },

  // Interior da Taverna / Biblioteca (20x16 = 960x768px)
  arcane_library: {
    imageSrc: './img/arcane_library.png',
    foregroundSrc: null,
    defaultSpawn: { col: 9, row: 12 },
    matrix: [
      "####################",
      "####################",
      "####################",
      "#########..#########",
      "#########...###..###",
      "##.######........###",
      "##............#..###",
      "##.####.....####.###",
      "##.####......###.###",
      "##...............###",
      "##...#........#...##",
      "##..###.....####..##",
      "###.###..S...####.##",
      "####..............##",
      "#########PP#########",
      "####################"
    ],
    doors: {
      'P': { targetMap: 'return', fallbackMap: 'science_village' }
    },
    mentors: [
      { col: 6, row: 6, theme: 'food' }
    ],
    chests: [
      { col: 12, row: 6, id: 'chest_tavern_1' }
    ]
  },

  // Cidade Eco-Tecnológica: GraçaTown (40x24 = 1920x1152px)
  gracatown: {
    imageSrc: './img/gracatown.png',
    foregroundSrc: null,
    defaultSpawn: { col: 19, row: 20 },
    matrix: [
  "########################################",
  "##############################.#########",
  "#########################............###",
  "######......#############.####.####..###",
  "##########..#.###########.####.####..###",
  "##########..#####...#####.#....#.###.###",
  "##########..######11###...#11###1....###",
  "######........####..###..........#######",
  "######...........................#######",
  "########.##......................#######",
  "########.##.#.#.......#.####.###########",
  "#######...#.###..####.#.##.#.##...######",
  "######....#.###..####.#..##.....#.######",
  "######....#.##...####.#........##..#####",
  "###############..####.#..2....2....#####",
  "###############..####.###..........#####",
  "##############.........########....#####",
  "##############....................######",
  "########.##.##.##...#####.#.#.###.######",
  "#######.1..1...#....#####.#1.1.#...#####",
  "#######........##...#####..........#####",
  "#############.###...#####.........######",
  "################.....###################",
  "################......##################"
    ],
    doors: {
      '1': { targetMap: 'robotics', targetSpawn: { col: 9, row: 12 } },
      '2': { targetMap: 'arcane_library', targetSpawn: { col: 9, row: 12 } },
      'P': { targetMap: 'science_village', targetSpawn: { col: 17, row: 21 } }
    },
    mentors: [
      { col: 19, row: 8, theme: 'nature' }
    ],
    chests: [
      { col: 24, row: 8, id: 'chest_graca_1' }
    ]
  },

  // Mapa clássico original (mantido como reserva)
  pellet_town: {
    imageSrc: './img/Pellet Town.png',
    foregroundSrc: './img/foregroundObjects.png',
    cols: 70,
    offset: { x: -735, y: -650 },
    useLegacyData: true,
    doors: []
  }
}

const INITIAL_MAP = 'science_village'

// ============================================================================
// 2. ESTADO DO MUNDO E ENTIDADES ATIVAS
// ============================================================================
let collisionsMap = []
let battleZonesMap = []
let boundaries = []
let battleZones = []
let doorZones = []
let characters = []
let chests = []
const movables = []

let currentMapId = INITIAL_MAP
let returnPortal = null
let isTransitioning = false

const villagerImg = new Image()
villagerImg.src = './img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/Idle.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const basePlayerSprites = {
  up: playerUpImage,
  left: playerLeftImage,
  right: playerRightImage,
  down: playerDownImage
}

const player = new Sprite({
  position: {
    x: 1024 / 2 - 48 / 2,
    y: 576 / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: basePlayerSprites
})

const bgImage = new Image()
const fgImage = new Image()

const background = new Sprite({
  position: { x: 0, y: 0 },
  image: bgImage
})

const foreground = new Sprite({
  position: { x: 0, y: 0 },
  image: fgImage
})
let hasForeground = false

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false }
}

const battle = {
  initiated: false
}

window.lastKey = 's'

// ============================================================================
// 3. CONSTRUTOR DE MAPAS E TRANSIÇÃO DE PORTAS
// ============================================================================
function buildMap(mapId, customSpawn = null) {
  const mapConfig = MAPS[mapId]
  if (!mapConfig) {
    console.warn(`Mapa "${mapId}" não encontrado.`)
    return
  }

  currentMapId = mapId
  collisionsMap = []
  battleZonesMap = []
  boundaries = []
  battleZones = []
  doorZones = []
  characters = []
  chests = []

  let retryCount = 0
  background.image.onerror = () => {
    if (retryCount < 2) {
      retryCount++
      setTimeout(() => {
        background.image.src = `${mapConfig.imageSrc}?retry=${retryCount}`
      }, 400)
    } else {
      console.error('Falha ao carregar imagem do mapa:', mapConfig.imageSrc)
    }
  }
  background.image.src = mapConfig.imageSrc

  if (mapConfig.foregroundSrc) {
    foreground.image.src = mapConfig.foregroundSrc
    hasForeground = true
  } else {
    hasForeground = false
  }

  let spawnTile = customSpawn || mapConfig.defaultSpawn || { col: 10, row: 10 }
  const occupiedTiles = new Set()

  if (mapConfig.useLegacyData) {
    const cols = mapConfig.cols || 70
    for (let i = 0; i < collisions.length; i += cols) {
      collisionsMap.push(collisions.slice(i, cols + i))
    }
    for (let i = 0; i < battleZonesData.length; i += cols) {
      battleZonesMap.push(battleZonesData.slice(i, cols + i))
    }

    const offset = mapConfig.offset || { x: -735, y: -650 }
    background.position = { x: offset.x, y: offset.y }
    foreground.position = { x: offset.x, y: offset.y }

    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025) {
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
              }
            })
          )
        }
      })
    })

    battleZonesMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025) {
          battleZones.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
              }
            })
          )
        }
      })
    })

    const mentorSpots = window.Robolingo ? window.Robolingo.MENTOR_SPOTS : []
    const chestSpots = window.Robolingo ? window.Robolingo.CHEST_SPOTS : []
    spawnEntitiesOnMap(mentorSpots, chestSpots, offset, occupiedTiles)
  } else if (Array.isArray(mapConfig.matrix)) {
    const rows = mapConfig.matrix.length
    const cols = mapConfig.matrix[0].length

    for (let r = 0; r < rows; r++) {
      const cRow = []
      const bRow = []
      for (let c = 0; c < cols; c++) {
        const cell = mapConfig.matrix[r][c] || '.'
        cRow.push(cell === '#' ? 1025 : 0)
        bRow.push(cell === 'G' ? 1025 : 0)

        const worldX = c * Boundary.width
        const worldY = r * Boundary.height

        if (cell === '#') {
          boundaries.push(new Boundary({ position: { x: worldX, y: worldY } }))
        } else if (cell === 'G') {
          battleZones.push(new Boundary({ position: { x: worldX, y: worldY } }))
        } else if (cell === 'S' && !customSpawn && !mapConfig.defaultSpawn) {
          spawnTile = { col: c, row: r }
        } else if (mapConfig.doors && mapConfig.doors[cell]) {
          const doorInfo = mapConfig.doors[cell]
          doorZones.push({
            col: c,
            row: r,
            targetMap: doorInfo.targetMap,
            fallbackMap: doorInfo.fallbackMap,
            targetSpawn: doorInfo.targetSpawn || null,
            position: { x: worldX, y: worldY },
            width: Boundary.width,
            height: Boundary.height
          })
        }
      }
      collisionsMap.push(cRow)
      battleZonesMap.push(bRow)
    }

    const offset = {
      x: player.position.x - spawnTile.col * Boundary.width,
      y: player.position.y - spawnTile.row * Boundary.height
    }

    background.position = { x: offset.x, y: offset.y }
    foreground.position = { x: offset.x, y: offset.y }

    boundaries.forEach((b) => {
      b.position.x += offset.x
      b.position.y += offset.y
    })
    battleZones.forEach((bz) => {
      bz.position.x += offset.x
      bz.position.y += offset.y
    })
    doorZones.forEach((dz) => {
      dz.position.x += offset.x
      dz.position.y += offset.y
    })

    occupiedTiles.add(`${spawnTile.col},${spawnTile.row}`)
    spawnEntitiesOnMap(
      mapConfig.mentors || [],
      mapConfig.chests || [],
      offset,
      occupiedTiles
    )
  }

  movables.length = 0
  movables.push(
    background,
    ...boundaries,
    foreground,
    ...battleZones,
    ...doorZones,
    ...characters,
    ...chests
  )

  if (window.syncViewportCamera) {
    window.syncViewportCamera()
  }
}

function isTileWalkable(col, row, occupiedTiles) {
  if (
    row < 1 ||
    row >= collisionsMap.length - 1 ||
    col < 1 ||
    col >= (collisionsMap[0] ? collisionsMap[0].length - 1 : 69)
  ) {
    return false
  }
  if (collisionsMap[row][col] === 1025) return false
  if (battleZonesMap[row] && battleZonesMap[row][col] === 1025) return false
  if (occupiedTiles.has(`${col},${row}`)) return false
  return true
}

function findWalkableTile(targetCol, targetRow, occupiedTiles) {
  for (let radius = 0; radius <= 8; radius++) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const cCol = targetCol + dx
        const cRow = targetRow + dy
        if (isTileWalkable(cCol, cRow, occupiedTiles)) {
          occupiedTiles.add(`${cCol},${cRow}`)
          return { col: cCol, row: cRow }
        }
      }
    }
  }
  return { col: targetCol, row: targetRow }
}

function spawnEntitiesOnMap(mentorSpots, chestSpots, offset, occupiedTiles) {
  mentorSpots.forEach((spot) => {
    const tile = findWalkableTile(spot.col, spot.row, occupiedTiles)
    const themeMeta =
      window.Robolingo && window.Robolingo.THEMES[spot.theme]
        ? window.Robolingo.THEMES[spot.theme]
        : { spriteType: 'villager' }

    const worldX = tile.col * Boundary.width + offset.x
    const worldY = tile.row * Boundary.height + offset.y

    const npc = new Character({
      position: { x: worldX, y: worldY },
      image: themeMeta.spriteType === 'oldMan' ? oldManImg : villagerImg,
      frames: { max: 4, hold: 60 },
      scale: 3,
      animate: true,
      dialogue: ['Hello! Ready to practice English?']
    })
    npc.themeKey = spot.theme
    characters.push(npc)

    boundaries.push(
      new Boundary({
        position: { x: worldX, y: worldY }
      })
    )
  })

  chestSpots.forEach((spot) => {
    const tile = findWalkableTile(spot.col, spot.row, occupiedTiles)
    const worldX = tile.col * Boundary.width + offset.x
    const worldY = tile.row * Boundary.height + offset.y

    chests.push({
      ...spot,
      position: { x: worldX, y: worldY },
      width: Boundary.width,
      height: Boundary.height
    })

    boundaries.push(
      new Boundary({
        position: { x: worldX, y: worldY }
      })
    )
  })
}

function enterDoor(door) {
  if (isTransitioning) return

  let destinationMap = door.targetMap
  let destinationSpawn = door.targetSpawn

  if (destinationMap === 'return') {
    if (returnPortal) {
      destinationMap = returnPortal.mapId
      destinationSpawn = { col: returnPortal.col, row: returnPortal.row }
      returnPortal = null
    } else {
      destinationMap = door.fallbackMap || INITIAL_MAP
    }
  } else {
    returnPortal = {
      mapId: currentMapId,
      col: door.col,
      row: door.row + 1
    }
  }

  const targetConfig = MAPS[destinationMap]
  if (!targetConfig || (!targetConfig.useLegacyData && !targetConfig.matrix)) {
    console.warn(`Mapa "${destinationMap}" ainda não tem matriz configurada.`)
    return
  }

  isTransitioning = true
  keys.w.pressed = false
  keys.a.pressed = false
  keys.s.pressed = false
  keys.d.pressed = false
  player.animate = false

  gsap.to('#overlappingDiv', {
    opacity: 1,
    duration: 0.3,
    onComplete() {
      buildMap(destinationMap, destinationSpawn)
      gsap.to('#overlappingDiv', {
        opacity: 0,
        duration: 0.3,
        onComplete() {
          isTransitioning = false
        }
      })
    }
  })
}

// ============================================================================
// 4. CÂMERA, INTERAÇÕES E LOOP PRINCIPAL
// ============================================================================
window.syncViewportCamera = function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const zoom = window.Robolingo ? window.Robolingo.getZoom() : 1.0
  const targetX = canvas.width / zoom / 2 - 24
  const targetY = canvas.height / zoom / 2 - 34

  const dx = targetX - player.position.x
  const dy = targetY - player.position.y

  player.position.x += dx
  player.position.y += dy

  movables.forEach((m) => {
    m.position.x += dx
    m.position.y += dy
  })
}

window.addEventListener('resize', window.syncViewportCamera)

function getNearbyEntity() {
  const px = player.position.x + (player.width || 48) / 2
  const py = player.position.y + (player.height || 68) / 2

  for (const char of characters) {
    const cx = char.position.x + (char.width || 48) / 2
    const cy = char.position.y + (char.height || 68) / 2
    if (Math.hypot(px - cx, py - cy) < 78) {
      return { type: 'npc', entity: char }
    }
  }

  for (const chest of chests) {
    const cx = chest.position.x + 24
    const cy = chest.position.y + 24
    if (Math.hypot(px - cx, py - cy) < 76) {
      return { type: 'chest', entity: chest }
    }
  }

  return null
}

function drawInteractionHint(nearby) {
  if (!nearby) return
  c.save()
  const text =
    nearby.type === 'chest'
      ? '🎁 Toque em Falar: Abrir Baú'
      : '💬 Toque em Falar: Conversar'
  c.font = 'bold 9px "Press Start 2P", monospace'
  const w = c.measureText(text).width + 18
  const x = canvas.width / 2 - w / 2
  const y = 64

  c.fillStyle = 'rgba(15, 23, 42, 0.9)'
  c.fillRect(x, y, w, 24)
  c.strokeStyle = nearby.type === 'chest' ? '#facc15' : '#38bdf8'
  c.lineWidth = 2
  c.strokeRect(x, y, w, 24)

  c.fillStyle = '#f8fafc'
  c.fillText(text, x + 9, y + 15)
  c.restore()
}

function animate() {
  window.requestAnimationFrame(animate)

  if (window.Robolingo) {
    const customSprites = window.Robolingo.getCustomPlayerSprites(basePlayerSprites)
    if (customSprites) {
      player.sprites = customSprites
      const dirKey =
        window.lastKey === 'w'
          ? 'up'
          : window.lastKey === 'a'
          ? 'left'
          : window.lastKey === 'd'
          ? 'right'
          : 'down'
      player.image = customSprites[dirKey] || customSprites.down
    }
  }

  const zoom = window.Robolingo ? window.Robolingo.getZoom() : 1.0

  c.save()
  c.fillStyle = '#090d16'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.scale(zoom, zoom)
  c.imageSmoothingEnabled = false

  background.draw()
  boundaries.forEach((b) => b.draw())
  battleZones.forEach((bz) => bz.draw())

  if (window.Robolingo) {
    chests.forEach((chest) => window.Robolingo.drawChest(c, chest))
  }

  characters.forEach((char) => {
    char.draw()
    if (window.Robolingo) {
      window.Robolingo.drawNpcDecorations(c, char)
    }
  })

  player.draw()

  if (window.Robolingo) {
    window.Robolingo.drawPlayerCosmetics(c, player)
  }

  if (hasForeground) {
    foreground.draw()
  }
  c.restore()

  const nearby = getNearbyEntity()
  if (!window.Robolingo || !window.Robolingo.isDialogueOpen()) {
    drawInteractionHint(nearby)
  }

  if (window.Robolingo) {
    window.Robolingo.drawMinimap(
      player,
      background,
      characters,
      chests,
      collisionsMap,
      battleZonesMap
    )
  }

  let moving = true
  player.animate = false

  if (
    isTransitioning ||
    battle.initiated ||
    (window.Robolingo && window.Robolingo.isModalOpen())
  ) {
    return
  }

  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < doorZones.length; i++) {
      const door = doorZones[i]
      const overlapX =
        Math.min(player.position.x + player.width, door.position.x + door.width) -
        Math.max(player.position.x, door.position.x)
      const overlapY =
        Math.min(player.position.y + player.height, door.position.y + door.height) -
        Math.max(player.position.y, door.position.y)

      if (overlapX > 20 && overlapY > 20) {
        enterDoor(door)
        return
      }
    }

    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y))

      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.012
      ) {
        battle.initiated = true
        keys.w.pressed = false
        keys.a.pressed = false
        keys.s.pressed = false
        keys.d.pressed = false

        gsap.to('#overlappingDiv', {
          opacity: 1,
          repeat: 2,
          yoyo: true,
          duration: 0.25,
          onComplete() {
            gsap.to('#overlappingDiv', {
              opacity: 0,
              duration: 0.25
            })
            if (window.Robolingo) {
              window.Robolingo.openMission('grass')
            } else {
              battle.initiated = false
            }
          }
        })
        break
      }
    }
  }

  if (keys.w.pressed && window.lastKey === 'w') {
    player.animate = true
    player.image = player.sprites.up

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: 3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3
      })
  } else if (keys.a.pressed && window.lastKey === 'a') {
    player.animate = true
    player.image = player.sprites.left

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3
      })
  } else if (keys.s.pressed && window.lastKey === 's') {
    player.animate = true
    player.image = player.sprites.down

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3
      })
  } else if (keys.d.pressed && window.lastKey === 'd') {
    player.animate = true
    player.image = player.sprites.right

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3
      })
  }
}

window.triggerInteraction = function () {
  if (window.Robolingo && window.Robolingo.isDialogueOpen()) {
    window.Robolingo.advanceDialogue()
    return
  }

  if (window.Robolingo && window.Robolingo.isModalOpen()) return

  const nearby = getNearbyEntity()

  if (nearby && nearby.type === 'chest') {
    if (window.Robolingo) {
      window.Robolingo.openChest(nearby.entity)
    }
    return
  }

  const targetNpc =
    player.interactionAsset || (nearby && nearby.type === 'npc' ? nearby.entity : null)

  if (!targetNpc) {
    if (window.Robolingo) {
      window.Robolingo.openMission('hud')
    }
    return
  }

  if (window.Robolingo) {
    window.Robolingo.startNpcDialogue(targetNpc)
  }
}

window.addEventListener('keydown', (e) => {
  if (window.Robolingo && window.Robolingo.isDialogueOpen()) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      window.Robolingo.advanceDialogue()
    }
    return
  }

  if (window.Robolingo && window.Robolingo.isModalOpen()) return

  switch (e.key.toLowerCase()) {
    case ' ':
      window.triggerInteraction()
      break
    case 'w':
    case 'arrowup':
      keys.w.pressed = true
      window.lastKey = 'w'
      break
    case 'a':
    case 'arrowleft':
      keys.a.pressed = true
      window.lastKey = 'a'
      break
    case 's':
    case 'arrowdown':
      keys.s.pressed = true
      window.lastKey = 's'
      break
    case 'd':
    case 'arrowright':
      keys.d.pressed = true
      window.lastKey = 'd'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key.toLowerCase()) {
    case 'w':
    case 'arrowup':
      keys.w.pressed = false
      break
    case 'a':
    case 'arrowleft':
      keys.a.pressed = false
      break
    case 's':
    case 'arrowdown':
      keys.s.pressed = false
      break
    case 'd':
    case 'arrowright':
      keys.d.pressed = false
      break
  }
})

let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    if (typeof audio !== 'undefined' && audio.Map) {
      audio.Map.play()
    }
    clicked = true
  }
})

if (window.Robolingo) {
  window.Robolingo.init()
}
buildMap(INITIAL_MAP)
