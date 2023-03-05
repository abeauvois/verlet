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
  return this
}

export function update({ physics, engines, sticks, points }) {
  physics.update(engines)
  points.update(physics)
  for (let i = 0; i < verletIterations; i++) {
    sticks.update()
    points.updateContraints(canvas, physics)
  }
}

export function render({ engines, physics, sticks, points }) {
  canvas.clean()
  points.render(canvas)
  sticks.render(canvas)
  engines.render(canvas)
  //   renderShapes()
}
