export const DeltaX = 5
export let oldx = 0
export const EngineTailLength = 10
export let items = []
let count = 0

export function init(engine) {
  oldx = engine.x
  return this
}

export function getAlpha(index) {
  const alpha = (index * 10 + 1) / (100 + count)
  //   console.log('🚀 ~ getAlpha ~ alpha', alpha)
  if (alpha < 0.1) {
    count = 0
    // items.shift()
  }
  return alpha
}

export function renderItem(canvas, point, color) {
  const { context } = canvas
  context.beginPath()
  context.fillStyle = color
  context.arc(point.x, point.y, 5, 0, Math.PI * 2)
  context.fill()
}

export function render(canvas) {
  items.forEach((point, index) => {
    if (point.withTail) {
      renderItem(canvas, point, `rgba(255, 165, 30, ${getAlpha(index)})`)
    }
  })
}

export function update(engine) {
  //   count += 2
  if (!engine.withTail) return
  if (Math.abs(engine.x - oldx) > DeltaX) {
    if (items.length >= EngineTailLength) {
      items.shift()
      oldx = engine.x
    } else {
      items.push({ ...engine })
    }
  }
}
