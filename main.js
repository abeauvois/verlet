import { Canvas } from './canvas.js'

import { createSquare, createChain } from './shapes.js'
import * as physics from './physics.js'
import * as sticks from './sticks.js'
import * as points from './points.js'

var canvas = new Canvas({
  element: '#canvas',
  width: 500,
  height: 500,
})

export let geometry = createSquare({ x: 100, y: 100 }, 50)
const chain = createChain({ x: 100, y: 100 }, 50, 3)

geometry = [...geometry, ...chain]

points.add(geometry)

physics.createEngine({ x: 250, y: 100 })

sticks.createFromPoints(geometry.slice(0, 4))
sticks.add(geometry[3], geometry[0])
// Add diagonal to square
sticks.add(geometry[0], geometry[2], true)
// Chain
sticks.add(physics.engine, geometry[4])
sticks.add(geometry[4], geometry[5])
sticks.add(geometry[5], geometry[0])

update()

function update() {
  canvas.clean()
  physics.updateEngine()
  points.update(physics)
  for (let i = 0; i < 3; i++) {
    sticks.update()
    points.updateContraints(canvas, physics)
  }
  points.render(canvas)
  sticks.render(canvas)
  physics.renderEngine(canvas)
  //   renderShapes()
  requestAnimationFrame(update)
}

// function renderShapes() {
//   for (let i = 0; i < shapes.length; i++) {
//     const s = shapes[i]
//     canvas.context.beginPath()
//     canvas.context.fillStyle = s.color
//     canvas.context.moveTo(s.path[0].x, s.path[0].y)
//     for (let j = 0; j < s.path.length; j++) {
//       const p = s.path[j]
//       canvas.context.lineTo(p.x, p.y)
//       canvas.context.fill()
//     }
//   }
//   canvas.context.stroke()
// }
