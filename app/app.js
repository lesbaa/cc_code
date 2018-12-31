import sketcher from 'canvas-sketch'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'

import createRegl from 'regl'
import Primitives from 'primitive-geometry'
import createCamera from 'canvas-orbit-camera'
import { frag, vert, uniforms } from './shaders/sphere'

const canvas = document.querySelector('#c')
const camera = createCamera(
  canvas,
  {
    rotate: false,
    scale: false,
    pan: false,
  }
)

const sphere = Primitives.sphere(15)

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

const sketch = async ({
  gl,
}) => {
  const regl = createRegl({
    gl,
    extensions: [
      'OES_standard_derivatives',
    ],
  })

  const rotationDir = vec3.create()
  vec3.set(rotationDir, 1, 1, 1)
  
  const moveToOrigin = vec3.create()
  vec3.set(moveToOrigin, -1, -1, -1)

  const drawSphere = regl({
    frag,
    vert,
    uniforms: {
      ...uniforms(regl),
      uProjection: ({
        viewportWidth,
        viewportHeight,
      }) => mat4.perspective(
        [],
        Math.PI / 2,
        viewportWidth / viewportHeight,
        0.01,
        1000,
      ),
      uModel: () => mat4.identity([]),
      uRotation: regl.prop('uRotation'),
      uView: () => camera.view(),
    },
    attributes: {
      aPosition: sphere.positions,
      aNormal: sphere.normals,
    },
    elements: sphere.cells,
  })

  let mouseX = 0
  let mouseY = 0
  let mouseClickX = 0
  let mouseClickY = 0

  window.addEventListener('mousemove', ({ clientX, clientY }) => {
    mouseX = clientX
    mouseY = clientY
  })

  canvas.addEventListener('click', ({ clientX, clientY }) => {
    mouseClickX = clientX
    mouseClickY = clientY
  })

  return {
    render({
      // context,
      time: uTime,
      width,
      height,
    }) {
      regl.poll()

      regl.clear({
        color: [0.0, 0.0, 0.0, 0.0],
        depth: 1,
      })

      camera.tick()

      const rotation = 0

      const uRotation = [
        Math.cos(rotation), -Math.sin(rotation), 0, 0,
        Math.sin(rotation), Math.cos(rotation), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ]

      const uMouse = [
        mouseX,
        mouseY,
        mouseClickX,
        mouseClickY,
      ]

      const uRes = [
        width,
        height,
      ]

      drawSphere({
        uRes,
        uTime,
        uRotation,
        uMouse,
      })
    },
  }
}

sketcher(sketch, sketchSettings)

