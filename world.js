import { Canvas } from './canvas.js'

export let canvas
export let verletIterations = 3

export function init(options) {
  canvas = new Canvas({
    element: '#canvas',
    width: options.width || 500,
    height: options.height || 500,
    onClick: options.onClick,
  })
  return canvas
}

export function update({ physics, sticks, points }) {
  physics.update()
  points.update(physics)
  for (let i = 0; i < verletIterations; i++) {
    sticks.update()
    points.updateContraints(canvas, physics)
  }
}

export function render({ physics, sticks, points }) {
  canvas.clean()
  points.render(canvas)
  sticks.render(canvas)
  physics.renderEngine(canvas)
  //   renderShapes()
}
