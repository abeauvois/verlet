import * as tail from './tail.js'
import * as engines from './engines.js'

export let bounce = 0.9
export let gravity = 0.3
export let friction = 0.999

export function addEngine({ engines, p0, withTail = false }) {
  engines.add({ baseX: p0?.x, baseY: p0?.y, pinned: true, withTail })
}

export function update(engines) {
  engines.update()
}

export function noGravity() {
  gravity = 0
}
