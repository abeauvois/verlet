import { distance } from './distance.js'

const items = []

export function createFromPoints(pointsToStick) {
  const lastIndex = pointsToStick.length - 1
  pointsToStick.forEach((p, index) => {
    if (index < lastIndex) {
      add(p, pointsToStick[index + 1])
      if (index % 3 && index - 2 >= 0) {
        add(p, pointsToStick[index - 2])
      }
    }
  })
  add(pointsToStick[lastIndex - 1], pointsToStick[0])
}

export function add(pointA, pointB, hidden) {
  return items.push({
    p0: pointA,
    p1: pointB,
    length: distance(pointA, pointB),
    hidden,
  })
}

export function removeBy(point) {
  const stickIndex = items.findIndex((stick, i) => {
    const d = distance(stick.p0, point)
    console.log('🚀 ~ stickIndex ~ stick.p0', stick.p0.x, stick.p0.y)
    console.log('🚀 ~ stickIndex ~ point', i, point, d.toFixed(0))
    return d < 60
  })
  if (stickIndex > -1) {
    console.log('🚀 ~ removeBy ~ stickIndex', stickIndex)
    items[stickIndex].color = 'red'
    items.map((s) => ({ ...s, color: undefined }))
    const head = items.shift()
    items[stickIndex] = head
  }
}

export function render(canvas) {
  for (let i = 0; i < items.length; i++) {
    const s = items[i]
    if (!s.hidden) {
      const textX = +((s.p0.x + s.p1.x) / 2) + 4
      const textY = +((s.p0.y + s.p1.y) / 2)
      canvas.context.beginPath()
      if (s.color) {
        canvas.context.strokeStyle = 'red'
        canvas.context.lineWidth = 4
      } else {
        canvas.context.strokeStyle = 'black'
        canvas.context.lineWidth = 2
      }
      canvas.context.moveTo(s.p0.x, s.p0.y)
      canvas.context.lineTo(s.p1.x, s.p1.y)
      canvas.context.stroke()
      canvas.context.fillText(`${i}`, textX, textY)
    }
  }
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
