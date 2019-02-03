import {
  Vector2,
} from 'three'

const createCircleBounder = (cx, cy, cr) => (x, y) => {
  const coord = new Vector2(x, y)
  const circlePos = new Vector2(cx, cy)
  return Math.abs(circlePos.distanceTo(coord)) < cr
}

export default function createGrid ({
  cx = 0,
  cy = 0,
  cr = 1,
  numX = 10,
  numY = 10,
} = {}) {
  const isWithinCircle = createCircleBounder(cx, cy, cr)

  const d = cr * 2
  
  const points = []

  for (let y = 0; y < numY; y++) {
    for (let x = 0; x < numX; x++) {
      if (isWithinCircle(x, y)) {
        points.push({
          x: d * (x + cx) - cr,
          y: d * (y + cy) - cr,
          w: d / numX,
          h: d / numY,
        })
      }
    }
  }

  return points

}
