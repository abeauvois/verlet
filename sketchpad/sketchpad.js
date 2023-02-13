// sketpad.js

class Sketchpad {
  constructor(options) {
    this.element = options.element
    this.width = options.width
    this.height = options.height
    this.paths = []
    this.#init()
  }

  #init() {
    this.#createCanvas()
    this.#addEventListerners()
  }

  #createCanvas() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.border = '1px solid #000'
    this.context = this.canvas.getContext('2d')
    document.querySelector(this.element).appendChild(this.canvas)
  }

  #addEventListerners() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt)
      this.isDrawing = true
      this.paths.push([mouse])
    }

    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(evt)
        const lastPath = this.paths[this.paths.length - 1]
        lastPath.push(mouse)
        this.#redraw()
      }
    }

    this.canvas.onmouseup = (evt) => {
      this.isDrawing = false
    }

    this.canvas.ontouchstart = (evt) => {
      this.canvas.onmousedown(evt.touches[0])
    }

    this.canvas.ontouchmove = (evt) => {
      this.canvas.onmousemove(evt.touches[0])
    }

    this.canvas.ontouchup = (evt) => {
      this.canvas.onmouseuo(evt.touches[0])
    }
  }

  #getMouse(evt) {
    const rect = this.canvas.getBoundingClientRect()
    return [Math.round(evt.clientX - rect.left), Math.round(evt.clientY - rect.top)]
  }

  #redraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    draw.paths(this.context, this.paths)
  }
}

var sketchpad = new Sketchpad({
  element: '#sketchpad',
  width: 500,
  height: 500,
})
