import sketcher from 'canvas-sketch'
import createRegl from 'regl'
import createQuad from 'primitive-quad'
import { frag, vert, uniforms } from './shaders/one'

const canvas = document.querySelector('#c')

const sketchSettings = {
  pixelsPerInch: 300,
  animate: true,
  scaleToView: false,
  dimensions: [
    window.innerHeight,
    window.innerHeight,
  ],
  context: 'webgl',
  canvas,
}

const sketch = ({
  gl,
  update,
  render,
  pause,
}) => {

  const regl = createRegl({
    gl,
    extensions: [
      'OES_standard_derivatives',
    ],
  })

  const quad = createQuad()
  console.log(quad)

  // const position = [
  //   [ 0, 0, 0 ],
  //   // [ -1, 1, 0 ],
  //   // [ -1, -1, 0 ],
  //   // [ 1, 1, 0 ],
  // ]

  // const cells = [
  //   [ 0 ],
  //   // [ 2, 3, 0 ],
  // ]

  const drawQuad = regl({
    frag,
    vert,
    uniforms: uniforms(regl),
    attributes: {
      position: quad.positions,
    },
    elements: quad.cells,
    primitive: 'triangles',
    blend: {
      enable: true,
      func: {
        srcRGB: 'src alpha',
        srcAlpha: 1,
        dstRGB: 'one minus src alpha',
        dstAlpha: 1,
      },
    },
  })

  let mouseX = 0
  let mouseY = 0
  let mouseClickX = 0
  let mouseClickY = 0
  let mag = 1

  const requestPointerLock = () => canvas.requestPointerLock()
  canvas.addEventListener('click', () => {
    requestPointerLock()
    canvas.removeEventListener('click', requestPointerLock)
  })

  window.addEventListener('mousemove', ({ movementX, movementY }) => {
    console.log('moving...')
    mouseX += movementX
    mouseY += movementY
  })

  window.addEventListener('keydown', ({ key }) => {
    if (key === 'ArrowUp') {
      mag *= 1.05
      console.log(mag)
    }
    if (key === 'ArrowDown') {
      mag /= 1.05
      console.log(mag)
    }
  })

  canvas.addEventListener('click', ({ clientX, clientY }) => {
    console.log('click...')
    mouseClickX = clientX
    mouseClickY = clientY
  })

  return {
    render({ context, time, width, height }) {

      regl.poll()
      regl.clear({
        color: [0, 0, 0, 0],
        depth: 1,
        stencil: 0,
      })

      drawQuad({
        uTime: time,
        uMouse: [mouseX, mouseY, mouseClickX, mouseClickY],
        uRes: [width, height],
        uMag: mag,
        uAspect: width / height,
      })
      gl.flush()
    },
  }
}

sketcher(sketch, sketchSettings)