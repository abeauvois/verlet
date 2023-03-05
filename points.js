let items = []
let radius = 10

export function add(points) {
  items = items.concat(points)
  return items
}

export function all() {
  return items
}

export function update({ friction, gravity }) {
  for (let i = 0; i < items.length; i++) {
    const p = items[i]
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

export function render(canvas) {
  canvas.context.fillStyle = `rgba(255, 165, 10, 1)`
  for (let i = 0; i < items.length; i++) {
    const p = items[i]
    canvas.context.beginPath()
    canvas.context.arc(p.x, p.y, radius, 0, Math.PI * 2)
    canvas.context.fill()
  }
}

export function updateContraints(canvas, physics) {
  for (let i = 0; i < items.length; i++) {
    const p = items[i]
    if (!p.pinned) {
      const vx = (p.x - p.oldx) * physics.friction
      const vy = (p.y - p.oldy) * physics.friction

      if (p.x > canvas.width - radius) {
        p.x = canvas.width - radius
        p.oldx = p.x + vx * physics.bounce
      } else if (p.x < radius) {
        p.x = radius
        p.oldx = p.x + vx * physics.bounce
      }

      if (p.y > canvas.height - radius) {
        p.y = canvas.height - radius
        p.oldy = p.y + vy * physics.bounce
      } else if (p.y < radius) {
        p.y = radius
        p.oldy = p.y + vy * physics.bounce
      }
    }
  }
}
