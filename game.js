let components

export function init(options) {
  components = options.components
  options.data?.feed(components)
}

export function loop() {
  components.world.update(components)
  components.world.render(components)

  requestAnimationFrame(loop)
}
