import { distance } from './distance.js'

const items = []

export function createFromPoints(pointsToStick) {
  const lastIndex = pointsToStick.length - 1
  pointsToStick.forEach((p, index) => {
    if (index < lastIndex) {
      add(p, pointsToStick[index + 1])
    }
  })
}

export function add(pointA, pointB, hidden) {
  return items.push({
    p0: pointA,
    p1: pointB,
    length: distance(pointA, pointB),
    hidden,
  })
}

export function render(canvas) {
  canvas.context.beginPath()
  for (let i = 0; i < items.length; i++) {
    const s = items[i]
    if (!s.hidden) {
      canvas.context.moveTo(s.p0.x, s.p0.y)
      canvas.context.lineTo(s.p1.x, s.p1.y)
    }
  }
  canvas.context.stroke()
}

export function update() {
  for (let i = 0; i < items.length; i++) {
    const s = items[i]
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
