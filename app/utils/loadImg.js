export default (url) => new Promise((resolve, reject) => {
  const img = new Image()
  img.addEventListener('load', () => resolve(img))
  img.addEventListener('error', (e) => reject(e, 'didnae load image...'))
  img.src = url
})
