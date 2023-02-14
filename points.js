let items = []

export function add(points) {
  items = items.concat(points)
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
  for (let i = 0; i < items.length; i++) {
    const p = items[i]
    canvas.context.beginPath()
    canvas.context.arc(p.x, p.y, 10, 0, Math.PI * 2)
    canvas.context.fill()
  }
}

export function updateContraints(canvas, physics) {
  for (let i = 0; i < items.length; i++) {
    const p = items[i]
    if (!p.pinned) {
      const vx = (p.x - p.oldx) * physics.friction
      const vy = (p.y - p.oldy) * physics.friction

      if (p.x > canvas.width) {
        p.x = canvas.width
        p.oldx = p.x + vx * physics.bounce
      } else if (p.x < 0) {
        p.x = 0
        p.oldx = p.x + vx * physics.bounce
      }

      if (p.y > canvas.height) {
        p.y = canvas.height
        p.oldy = p.y + vy * physics.bounce
      } else if (p.y < 0) {
        p.y = 0
        p.oldy = p.y + vy * physics.bounce
      }
    }
  }
}
