import sketcher from 'canvas-sketch'
import {
  OrthographicCamera,
  Scene,
  BoxGeometry,
  AmbientLight,
  PerspectiveCamera,
  BoxBufferGeometry,
  WebGLRenderer,
  ShaderMaterial,
  MeshBasicMaterial,
  Mesh,
  Vector3,
} from 'three'
import { frag, vert, uniforms } from './shaders/sphere'
import createGrid from './utils/createGrid'

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

const sketch = async ({
  context,
  width,
  height,
}) => {
  const renderer = new WebGLRenderer({
    context,
  })

  renderer.setSize(width, height)

  const scene = new Scene()

  const cam = new OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 0.001, 1000)
  // const cam = PerspectiveCamera(45, 1, 0.01, 100)
  scene.add(cam)

  cam.position.z = 5
  // cam.lookAt(new Vector3(0, 0, 0))

  const material = new MeshBasicMaterial({
    color: 0xff5500,
  })

  // const cubes = createGrid()
  //   .map(({
  //     x,
  //     y: z,
  //     w,
  //     h,
  //   }) => {
  //     const geom = new BoxGeometry(w, w, h)
  //     console.log(x, z)
  //     return {
  //       geom,
  //       x,
  //       z,
  //     }
  //   })
  //   .forEach(({
  //     geom,
  //     x,
  //     z,
  //   }) => {
  //     const cube = new Mesh(geom, material)
  //     cube.position.set(x, 0, z)
  //     scene.add(cube)
  //   })

  const geom = new BoxGeometry(0.5,0.5,0.5)
  const cube = new Mesh(geom, material)
  cube.position.set(0,0,0)
  scene.add(new AmbientLight('#59314f'))
  scene.add(cube)

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

  return () => {
    renderer.render(scene, cam)
  }
}

sketcher(sketch, sketchSettings)

