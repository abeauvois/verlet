import { createSquare, createChain, createCircle } from './shapes.js'

// const file = files.get('./data.json')

export function stickify({ sticks, points }) {
  sticks.createFromPoints(points)
  sticks.add(points[points.length - 1], points[0])
}

export function feed({ engines, physics, sticks, points }) {
  const square = createSquare({ x: 100, y: 100 }, 50)
  const chain = createChain({ x: 100, y: 100 }, 50, 3)
  const circle = createCircle({ x: 100, y: 100 }, 50, 6)
  const geometry = points.add([...circle, ...chain])
  stickify({ sticks, points: geometry.slice(0, 6) })
  sticks.add(engines.items[0], chain[0])
  sticks.add(chain[0], chain[1])
  sticks.add(chain[1], chain[2])
  sticks.add(chain[2], circle[0])
}
