export default function drawBrackets({
  ctx,
  x = window.innerWidth / 2,
  y = window.innerHeight / 2,
  style = {
    width: 50,
    height: 20,
    stroke: '#333',
  },
}) {
  const {
    stroke,
    width,
    height,
  } = style

  ctx.strokeStyle = stroke

  ctx.translate(x, y)

  const drawBracket = () => {
    ctx.beginPath()
    
    ctx.moveTo(
      -width / 2,
      -height - 50,
    )

    ctx.lineTo(
      0,
      -50,
    )

    ctx.lineTo(
      width / 2,
      -height - 50,
    )

    ctx.stroke()
  }

  drawBracket()
  ctx.rotate(180 * Math.PI / 180)
  drawBracket()
  ctx.rotate(-180 * Math.PI / 180)
  ctx.translate(x, y)
}