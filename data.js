import { createSquare, createChain } from './shapes.js'

// const file = files.get('./data.json')

export function feed({ physics, sticks, points }) {
  const square = createSquare({ x: 100, y: 100 }, 50)
  const chain = createChain({ x: 100, y: 100 }, 50, 3)
  const geometry = points.add([...square, ...chain])
  sticks.createFromPoints(geometry.slice(0, 4))
  sticks.add(geometry[3], geometry[0])
  // Add diagonal stick to square
  sticks.add(geometry[0], geometry[2], true)
  // Chain attached to the engine rotor
  sticks.add(physics.engine, geometry[4])
  sticks.add(geometry[4], geometry[5])
  sticks.add(geometry[5], geometry[0])
}
