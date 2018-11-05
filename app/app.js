/* global p5 */
import Victor from 'victor'
import { resolve } from 'uri-js';

const c = document.querySelector('#c')

const ctx = c.getContext('2d')
const loadImg = (url) => new Promise((res, rej) => {
  const img = document.createElement('img')
  img.src = url
  img.addEventListener('load', () => {
    resolve(img)
  })
})

async function go() {
  const img = await loadImg()
}

go()
