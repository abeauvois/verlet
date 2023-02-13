import { Canvas } from './canvas.js'

var canvas = new Canvas({
  element: '#canvas',
  width: 500,
  height: 500,
})

const bounce = 0.9
const gravity = 0.5
const friction = 0.99

const engine = {
  baseX: 250,
  baseY: 100,
  range: 200,
  angle: 0,
  speed: 0.05,
  x: 150,
  y: 100,
  pinned: true,
}

function createSquare(p0, size) {
  return [
    {
      x: p0.x,
      y: p0.y,
      oldx: p0.x,
      oldy: p0.y,
    },
    {
      x: p0.x + size,
      y: p0.y,
      oldx: p0.x + size,
      oldy: p0.y,
    },
    {
      x: p0.x + size,
      y: p0.y + size,
      oldx: p0.x + size,
      oldy: p0.y + size,
    },
    {
      x: p0.x,
      y: p0.y + size,
      oldx: p0.x,
      oldy: p0.y + size,
    },
  ]
}

function createChain(p0, size, n) {
  const items = []
  for (let i = 1; i < n; i++) {
    items.push({
      x: p0.x + i * size,
      y: 50,
      oldx: p0.x + i * size,
      oldy: 50,
    })
  }
  return items
}

let points = createSquare({ x: 100, y: 100 }, 50)
const chain = createChain({ x: 100, y: 100 }, 50, 3)

points = [...points, ...chain]

function createSticks(pointsToStick) {
  const lastIndex = pointsToStick.length - 1
  const items = []
  pointsToStick.forEach((p, index) => {
    if (index < lastIndex) {
      items.push({
        p0: p,
        p1: pointsToStick[index + 1],
        length: distance(p, pointsToStick[index + 1]),
      })
    }
  })
  return items
}

let sticks = createSticks(points.slice(0, 4))
sticks.push({
  p0: points[3],
  p1: points[0],
  length: distance(points[3], points[0]),
})

// Add diagonal to square
sticks.push({
  p0: points[0],
  p1: points[2],
  length: distance(points[0], points[2]),
  hidden: true,
})
// Chain
sticks.push({
  p0: engine,
  p1: points[4],
  length: distance(engine, points[4]),
})
sticks.push({
  p0: points[4],
  p1: points[5],
  length: distance(points[4], points[5]),
})
sticks.push({
  p0: points[5],
  p1: points[0],
  length: distance(points[5], points[0]),
})

// const shapes = []
// shapes.push({
//   path: [points[0], points[1], points[2], points[3]],
//   color: 'green',
// })

function distance(p0, p1) {
  const dx = p1.x - p0.x
  const dy = p1.y - p0.y
  return Math.sqrt(dx * dx + dy * dy)
}

update()

function update() {
  canvas.clean()
  updateEngine()
  updatePoints()
  for (let i = 0; i < 3; i++) {
    updateSticks()
    updateContraints()
  }
  renderPoints()
  renderSticks()
  renderEngine()
  //   renderShapes()
  requestAnimationFrame(update)
}

function updatePoints() {
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    if (!p.pinned) {
      const vx = (p.x - p.oldx) * friction
      const vy = (p.y - p.oldy) * friction
      p.oldx = p.x
      p.oldy = p.y
      p.x += vx
      p.y += vy
      p.y += gravity
    }
  }
}
function updateContraints() {
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    if (!p.pinned) {
      const vx = (p.x - p.oldx) * friction
      const vy = (p.y - p.oldy) * friction

      if (p.x > canvas.width) {
        p.x = canvas.width
        p.oldx = p.x + vx * bounce
      } else if (p.x < 0) {
        p.x = 0
        p.oldx = p.x + vx * bounce
      }

      if (p.y > canvas.height) {
        p.y = canvas.height
        p.oldy = p.y + vy * bounce
      } else if (p.y < 0) {
        p.y = 0
        p.oldy = p.y + vy * bounce
      }
    }
  }
}

function renderPoints() {
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    canvas.context.beginPath()
    canvas.context.arc(p.x, p.y, 10, 0, Math.PI * 2)
    canvas.context.fill()
  }
}

function renderSticks() {
  canvas.context.beginPath()
  for (let i = 0; i < sticks.length; i++) {
    const s = sticks[i]
    if (!s.hidden) {
      canvas.context.moveTo(s.p0.x, s.p0.y)
      canvas.context.lineTo(s.p1.x, s.p1.y)
    }
  }
  canvas.context.stroke()
}

function renderShapes() {
  for (let i = 0; i < shapes.length; i++) {
    const s = shapes[i]
    canvas.context.beginPath()
    canvas.context.fillStyle = s.color
    canvas.context.moveTo(s.path[0].x, s.path[0].y)
    for (let j = 0; j < s.path.length; j++) {
      const p = s.path[j]
      canvas.context.lineTo(p.x, p.y)
      canvas.context.fill()
    }
  }
  canvas.context.stroke()
}

function updateSticks() {
  for (let i = 0; i < sticks.length; i++) {
    const s = sticks[i]
    const dx = s.p1.x - s.p0.x
    const dy = s.p1.y - s.p0.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const difference = s.length - distance
    const percent = difference / distance / 2
    const offsetX = dx * percent
    const offsetY = dy * percent
    if (!s.p0.pinned) {
      s.p0.x -= offsetX
      s.p0.y -= offsetY
    }
    if (!s.p1.pinned) {
      s.p1.x += offsetX
      s.p1.y += offsetY
    }
  }
}

function updateEngine() {
  engine.x = engine.baseX + Math.cos(engine.angle) * engine.range
  engine.angle += engine.speed
}

function renderEngine() {
  const { context } = canvas

  context.beginPath()
  context.rect(engine.baseX - engine.range, engine.baseY - 5, engine.range * 2, 10)
  context.stroke()
  context.beginPath()

  context.arc(engine.x, engine.y, 5, 0, Math.PI * 2)
  context.fill()
}
