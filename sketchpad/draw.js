const draw = {
  path(context, path, color = 'black') {
    context.strokeStyle = color
    context.lineWidth = 3
    context.beginPath()
    context.moveTo(...path[0])

    path.slice(1).forEach((point, i) => {
      context.lineTo(...path[i])
    })

    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.stroke()
  },

  paths(context, paths, color = 'black') {
    paths.forEach((p) => draw.path(context, p, color))
  },
}
