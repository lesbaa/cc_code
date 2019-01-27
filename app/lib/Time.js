const MAX_EXPIRY = 120000

export default class Time {
  pos = {
    x: 0,
    y: 0,
  }

  shouldDisplay = true

  constructor({
    datetime,
    globalState,
    ctx,
    timeframe = 10000,
  }) {
    this.timeframe = timeframe
    this.globalState = globalState
    this.datetime = datetime
    this.ctx = ctx
  }

  reset = () => {
    const datetimes = this.globalState
      .times
      .map(({ datetime }) => datetime)

    const nextFreeDateTime = Math.max(...datetimes)
    this.datetime = new Date(nextFreeDateTime + 1000)
    return
  }

  isOutwithBounds = () => {
    const {
      currentZoom,
    } = this.globalState

    return this.pos.x * currentZoom < -window.innerWidth / 2
  }

  setTransparency = () => {
    const {
      currentZoom,
    } = this.globalState

    const alpha = 1 - (Math.abs(this.pos.x * currentZoom) ** 1.1) / window.innerWidth

    this.ctx.fillStyle = `rgba(0,0,0,${alpha})`
    this.ctx.strokeStyle = `rgba(0,0,0,${alpha})`
  }

  update = () => {
    
    const { globalTime } = this.globalState
    const diff = Number(this.datetime) - Number(globalTime)
    this.pos.x = diff

    if (diff < -MAX_EXPIRY) {
      this.reset()
    }

    if (!this.isOutwithBounds()){
      this.draw()
    }

  }

  setFont = () => {
    this.ctx.textAlign = 'center'
    if (this.datetime.getSeconds() === 0) {
      this.ctx.lineWidth = '2'
      this.ctx.font = '1.5em sans-serif'
      return
    }
  }

  setStyle = () => {
    const isOnMinute = this.datetime.getSeconds() === 0
    const isOnTenMinutes = this.datetime.getMinutes() % 10 === 0
  }

  draw = () => {
    const {
      width,
      height,
      currentZoom,
    } = this.globalState
    this.ctx.translate(width / 2, height / 2)
    this.ctx.translate(this.pos.x * currentZoom, this.pos.y)

    this.setStyle()
    this.setTransparency()
    this.ctx.beginPath()
    this.ctx.moveTo(0, -25)
    this.ctx.fillText(this.datetime.toLocaleTimeString(), 0, -30)
    this.ctx.lineTo(0, 50)
    this.ctx.stroke()
    this.ctx.lineWidth = '1'
    this.ctx.font = '1em sans-serif'
    this.ctx.translate(-this.pos.x * currentZoom, -this.pos.y)
    this.ctx.translate(-width / 2, -height / 2)
  }
}
