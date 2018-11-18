import sketcher from 'canvas-sketch'
import createRegl from 'regl'
import createQuad from 'primitive-quad'
import { frag, vert, uniforms } from './shaders/one'

const sketchSettings = {
  pixelsPerInch: 300,
  animate: true,
  scaleToView: true,
  context: 'webgl',
  canvas: document.querySelector('#c'),
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

  const position = [
    [ 0, 0, 0 ],
    // [ -1, 1, 0 ],
    // [ -1, -1, 0 ],
    // [ 1, 1, 0 ],
  ]

  const cells = [
    [ 0 ],
    // [ 2, 3, 0 ],
  ]

  const drawQuad = regl({
    frag,
    vert,
    uniforms: uniforms(regl),
    attributes: {
      position,
    },
    elements: cells,
    primitive: 'points',
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

  let uMouseX = 0
  let uMouseY = 0

  window.addEventListener('mousemove', ({ clientX, clientY }) => {
    console.log('moving...')
    uMouseX = clientX
    uMouseY = clientY
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
        uMouseX,
        uMouseY,
        uLighting: [width / uMouseX - 2.0, (width / uMouseY) / -20.0, 0.5],
        uAmbient: [0.1, 0.1, 0.6, 1.0],
        uWidth: width,
        uHeight: height,
        uAspect: width / height,
      })
      gl.flush()
    },
  }
}

sketcher(sketch, sketchSettings)