import sketcher from 'canvas-sketch'
import drawBrackets from './lib/drawBrackets'
import createGlobalState from './lib/createGlobalState'
import Time from './lib/Time'

const canvas = document.querySelector('#c')

const displayZoomElement = document.getElementById('displayZoom')

const MAX_TIMES = 100

const sketchSettings = {
  pixelsPerInch: 300,
  animate: true,
  scaleToView: true,
  context: '2d',
  canvas,
}

const sketch = async ({
  context,
  width,
  height,
}) => {

  const {
    globalState,
    updateGlobalState,
  } = createGlobalState({
    width,
    height,
  })

  const times = new Array(MAX_TIMES)
    .fill({})
    .map((el, i) => new Time({
      ctx: context,
      globalState,
      datetime: new Date(~~(Date.now() / 1000) * 1000 + (i - MAX_TIMES / 2) * 1000),
    }))

  globalState.times = times

  // let mouseX = 0
  // let mouseY = 0
  // let mouseClickX = 0
  // let mouseClickY = 0

  // window.addEventListener('mousemove', ({ clientX, clientY }) => {
  //   mouseX = clientX
  //   mouseY = clientY
  // })

  // canvas.addEventListener('click', ({ clientX, clientY }) => {
  //   mouseClickX = clientX
  //   mouseClickY = clientY
  // })

  const updateStats = () => {
    displayZoomElement.innerText = `${globalState.displayZoom}x`
  }

  updateStats()

  document.getElementById('zoom-in').addEventListener('click', () => {
    updateGlobalState({
      zoomChange: 1,
    })
    updateStats()
  })

  document.getElementById('zoom-out').addEventListener('click', () => {
    updateGlobalState({
      zoomChange: -1,
    })
    updateStats()
  })

  return ({
    context: ctx,
    width,
    height,
  }) => {
    
    ctx.font = '1em sans-serif'
    updateGlobalState()

    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < globalState.times.length; i++) {
      const time = times[i]
      time.update()
    }

    drawBrackets({
      ctx,
      x: width / 2,
      y: height / 2,
    })

    // for each frame check the times, remove old ones and add new ones, update all
    // object pool
  }
}

sketcher(sketch, sketchSettings)
