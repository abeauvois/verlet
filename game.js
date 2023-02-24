export let components

export function init(options) {
  components = options
}

export function loop() {
  components.world.update(components)
  components.world.render(components)

  requestAnimationFrame(loop)
}
