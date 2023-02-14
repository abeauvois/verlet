import { createSquare, createChain } from './shapes.js'
import * as physics from './physics.js'
import * as sticks from './sticks.js'
import * as points from './points.js'
import * as world from './world.js'

world.init({
  onClick: ([x, y]) => {
    sticks.removeBy({ x, y })
  },
})

const square = createSquare({ x: 100, y: 100 }, 50)
const chain = createChain({ x: 100, y: 100 }, 50, 3)

const geometry = points.add([...square, ...chain])

physics.addEngine({ x: 250, y: 100 })

sticks.createFromPoints(geometry.slice(0, 4))
sticks.add(geometry[3], geometry[0])
// Add diagonal stick to square
sticks.add(geometry[0], geometry[2], true)
// Chain attached to the engine rotor
sticks.add(physics.engine, geometry[4])
sticks.add(geometry[4], geometry[5])
sticks.add(geometry[5], geometry[0])

update()

function update() {
  world.update({ physics, sticks, points })
  world.render({ physics, sticks, points })

  requestAnimationFrame(update)
}
