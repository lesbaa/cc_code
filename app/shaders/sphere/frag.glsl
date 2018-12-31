precision mediump float;

uniform vec4 uMouse;
uniform vec2 uRes;
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  float mixAmount = smoothstep(0.0, 1.0, sin(vPosition.z / 10.0 + sin(uTime)));
  vec3 color1 = vec3(.740708, .650910, .872571);
  vec3 color2 = vec3(.502285, .524200, .883597);
  vec3 colorOut = mix(color1, color2, mixAmount);
  gl_FragColor = vec4(colorOut, 1.0);
}