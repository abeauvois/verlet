import * as engines from './engines.js'
import * as physics from './physics.js'
import * as sticks from './sticks.js'
import * as points from './points.js'
import * as world from './world.js'
import * as game from './game.js'

import * as data from './data.js'

const components = { world, engines, physics, sticks, points }

physics.addEngine({ engines, withTail: true })

world.init({
  onClick: ([x, y]) => {
    sticks.removeBy({ x, y })
  },
})

// physics.noGravity()

game.init({ components, data })

game.loop()
