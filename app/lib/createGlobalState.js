import lerp from 'lerp'

const zooms = [
  0.00875,
  0.0175,
  0.025,
  0.05,
  0.1,
  0.2,
  0.4,
  0.8,
  1.0,
  1.6,
]

const canZoom = (zoomChange, globalState) => {
  if (zoomChange === undefined) return false

  const nextZoomIndex = globalState.zoomIndex + zoomChange

  const isWithinBounds = (
    nextZoomIndex >= 0 &&
    nextZoomIndex < zooms.length - 1
  )

  return isWithinBounds
}

const createGlobalState = ({
  width,
  height,
  times,
}) => {

  const globalState = {
    globalTime: Date.now(),
    width,
    height,
    zoomIndex: ~~(zooms.length - 1 / 2),
    previousZoom: 0,
    targetZoom: 0,
    zoomAlpha: 0,
    displayZoom: zooms[~~(zooms.length - 1 / 2)],
    times,
  }
  
  const updateGlobalState = ({
    width,
    height,
    zoomChange,
  } = {}) => {
    globalState.globalTime = Date.now()

    if (width) globalState.width = width
    if (height) globalState.height = height

    const zoom = canZoom(zoomChange, globalState)

    if (zoom) {
      globalState.previousZoom = globalState.zoomIndex
      globalState.zoomIndex = globalState.zoomIndex + zoomChange
      globalState.zoomAlpha = 0
      globalState.displayZoom = zooms[globalState.zoomIndex]
    }

    if (globalState.zoomAlpha < 1) {
      globalState.zoomAlpha += 0.1
      globalState.currentZoom = lerp(
        zooms[globalState.previousZoom],
        zooms[globalState.zoomIndex],
        globalState.zoomAlpha,
      )
    }
  }

  return {
    globalState,
    updateGlobalState,
  }
}

export default createGlobalState
