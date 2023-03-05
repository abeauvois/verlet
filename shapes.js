let shapes = []

export function createSquare(p0, size) {
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

export function createCircle(p0, size, n) {
  const items = []
  for (let i = 1; i <= n; i++) {
    items.push({
      x: p0.x + Math.cos(((i - 1) * 2 * Math.PI) / n) * size,
      y: p0.y + Math.sin(((i - 1) * 2 * Math.PI) / n) * size,
      oldx: p0.x + Math.cos(((i - 1) * 2 * Math.PI) / n) * size,
      oldy: p0.y + Math.sin(((i - 1) * 2 * Math.PI) / n) * size,
    })
  }
  return items
}
export function createChain(p0, size, n) {
  const items = []
  for (let i = 1; i <= n; i++) {
    items.push({
      x: p0.x + i * size,
      y: 50,
      oldx: p0.x + i * size,
      oldy: 50,
    })
  }
  return items
}

export function renderShapes(canvas) {
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
