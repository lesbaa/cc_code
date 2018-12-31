precision mediump float;
attribute vec3 aPosition;
attribute vec3 aNormal;
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)


uniform mat4 uProjection;
uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uRotation;
uniform float uTime;
uniform vec2 uRes;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vNormal = aNormal;
  float noise = snoise3(
    vec3(
      aNormal.x,
      aNormal.y,
      aNormal.z + uTime
    )
  );
  vec3 pos = aPosition + aNormal * (noise * 2.0);
  gl_Position = uProjection * uModel * uView * vec4(pos, 1.0);
  vPosition = gl_Position.xyz;
}