import * as physics from './physics.js'
import * as sticks from './sticks.js'
import * as points from './points.js'
import * as world from './world.js'
import * as game from './game.js'

import * as data from './data.js'

const components = { world, physics, sticks, points }

world.init({
  onClick: ([x, y]) => {
    sticks.removeBy({ x, y })
  },
})

physics.addEngine({ x: 250, y: 100 })

data.feed(components)

game.init({
  world,
  physics,
  sticks,
  points,
})

game.loop()
