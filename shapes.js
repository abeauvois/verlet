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

export function createChain(p0, size, n) {
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
