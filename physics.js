export const engine = {
  baseX: 250,
  baseY: 100,
  range: 200,
  angle: 0,
  speed: 0.05,
  x: 150,
  y: 100,
  pinned: true,
}

export const bounce = 0.9
export const gravity = 0.5
export const friction = 0.99

export function addEngine(p0) {
  return { ...engine, baseX: p0?.x ?? engine.baseX, baseY: p0?.y ?? engine.baseY }
}

export function update() {
  engine.x = engine.baseX + Math.cos(engine.angle) * engine.range
  engine.angle += engine.speed
}

export function renderEngine(canvas) {
  const { context } = canvas

  context.beginPath()
  context.rect(engine.baseX - engine.range, engine.baseY - 5, engine.range * 2, 10)
  context.stroke()
  context.beginPath()

  context.arc(engine.x, engine.y, 5, 0, Math.PI * 2)
  context.fill()
}
