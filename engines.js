import * as tail from './tail.js'

export const items = []

export function add(options) {
  const engine = {
    baseX: options.baseX || 250,
    baseY: options.baseY || 100,
    range: options.range || 150,
    angle: options.angle || 0,
    speed: options.speed || 0.05,
    x: options.x || 150,
    y: options.y || 100,
    pinned: options.pinned || false,
    withTail: options.withTail || false,
  }

  if (options.withTail) {
    tail.init(engine)
  }

  return items.push(engine)
}

export function update() {
  items.forEach((engine) => {
    engine.x = engine.baseX + Math.cos(engine.angle) * engine.range
    engine.angle += engine.speed
    tail.update(engine)
  })
}

function renderBox(canvas, engine) {
  const { context } = canvas
  context.beginPath()
  context.rect(engine.baseX - engine.range, engine.baseY - 5, engine.range * 2, 10)
  context.stroke()
}

function renderPoint(canvas, engine, color) {
  const { context } = canvas
  context.beginPath()
  context.fillStyle = color
  context.arc(engine.x, engine.y, 5, 0, Math.PI * 2)
  context.fill()
}

export function render(canvas) {
  items.forEach((item) => {
    tail.render(canvas, item)
    renderBox(canvas, item)
    renderPoint(canvas, item, `rgba(255, 165, 30, 1)`)
  })
}
