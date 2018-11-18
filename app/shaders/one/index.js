import vert from './vert.glsl'
import frag from './frag.glsl'

const uniforms = regl => ({
  uTime: regl.prop('uTime'),
  uLighting: regl.prop('uLighting'),
  uAmbient: regl.prop('uAmbient'),
  uMouseX: regl.prop('uMouseX'),
  uMouseY: regl.prop('uMouseY'),
  uWidth: regl.prop('uWidth'),
  uHeight: regl.prop('uHeight'),
  uAspect: regl.prop('uAspect'),
})

export {
  frag,
  vert,
  uniforms,
}
