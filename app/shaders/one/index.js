import vert from './vert.glsl'
import frag from './frag.glsl'

const uniforms = regl => ({
  uTime: regl.prop('uTime'),
  uMouse: regl.prop('uMouse'),
  uRes: regl.prop('uRes'),
  uMag: regl.prop('uMag'),
  uAspect: regl.prop('uAspect'),
})

export {
  frag,
  vert,
  uniforms,
}
