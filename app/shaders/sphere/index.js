import vert from './vert.glsl'
import frag from './frag.glsl'

const uniforms = regl => ({
  uTime: regl.prop('uTime'),
  uMouse: regl.prop('uMouse'),
  uRes: regl.prop('uRes'),
  uAspect: regl.prop('uAspect'),
  uSampler: regl.prop('uSampler'),
})

export {
  frag,
  vert,
  uniforms,
}
