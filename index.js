const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}

const boundaries = []
const offset = {
  x: -735,
  y: -650
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

const battleZones = []
battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

const villagerImg = new Image()
villagerImg.src = './img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/Idle.png'

const occupiedTiles = new Set(['25,18', '25,19', '26,18', '26,19'])

function isTileWalkable(col, row) {
  if (row < 1 || row >= collisionsMap.length - 1 || col < 1 || col >= 69) {
    return false
  }
  if (collisionsMap[row][col] === 1025) return false
  if (battleZonesMap[row] && battleZonesMap[row][col] === 1025) return false
  if (occupiedTiles.has(`${col},${row}`)) return false
  return true
}

function findWalkableTile(targetCol, targetRow) {
  for (let radius = 0; radius <= 8; radius++) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const cCol = targetCol + dx
        const cRow = targetRow + dy
        if (isTileWalkable(cCol, cRow)) {
          occupiedTiles.add(`${cCol},${cRow}`)
          return { col: cCol, row: cRow }
        }
      }
    }
  }
  return { col: targetCol, row: targetRow }
}

// Posiciona os 7 Mentores temáticos na vila
const characters = []
const mentorSpots = window.Robolingo ? window.Robolingo.MENTOR_SPOTS : []

mentorSpots.forEach((spot) => {
  const tile = findWalkableTile(spot.col, spot.row)
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

// Posiciona os 5 Baús de Vocabulário na vila
const chests = []
const chestSpots = window.Robolingo ? window.Robolingo.CHEST_SPOTS : []

chestSpots.forEach((spot) => {
  const tile = findWalkableTile(spot.col, spot.row)
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

const image = new Image()
image.src = './img/Pellet Town.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

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

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false }
}

const movables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...characters,
  ...chests
]

const battle = {
  initiated: false
}

window.lastKey = 's'

// Mantém o mapa em tela cheia e o personagem centralizado em qualquer resolução ou zoom
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

  // Atualiza sprites personalizados do aluno
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

  foreground.draw()
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

  if (battle.initiated || (window.Robolingo && window.Robolingo.isModalOpen())) {
    return
  }

  // Encontro surpresa na grama alta
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
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
window.syncViewportCamera()