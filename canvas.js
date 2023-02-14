export class Canvas {
  constructor(options) {
    this.element = options.element
    this.width = options.width
    this.height = options.height
    this.paths = []
    this.onClick = options.onClick
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
    this.style = this.canvas.style
    this.canvas.style.border = '1px solid #000'
    this.context = this.canvas.getContext('2d')
    document.querySelector(this.element).appendChild(this.canvas)
  }

  #addEventListerners() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt)
      this.isDrawing = true
      this.paths.push([mouse])
      this.onClick(mouse)
    }
  }

  #getMouse(evt) {
    const rect = this.canvas.getBoundingClientRect()
    return [Math.round(evt.clientX - rect.left), Math.round(evt.clientY - rect.top)]
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
