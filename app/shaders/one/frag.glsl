precision mediump float;

#define TWO_PI 6.28318530718

uniform vec4 uMouse;
uniform vec2 uRes;
uniform float uTime;

float random(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 st = gl_FragCoord.xy / uRes;
  vec3 color = vec3(0.0);

  vec2 toCenter = vec2(0.5) - st;
  float dist = length(toCenter);
  float radius = dist * sin(30.0 * dist - uTime * 5.0) * random(st / 500.0);
  float angle = atan(toCenter.x, toCenter.y) * 10.0 - radius * 10.0 + uTime * 5.0;

  color = vec3(
    step(0.4 + (cos(angle + TWO_PI / 2.0) + 0.5) * 0.3, 0.5),
    step(0.6 + (cos(angle - 0.5) + 0.3) * 5.0, 0.25),
    step(0.4 + (cos(angle) + 0.8) * 0.4, 0.5)
  );

  gl_FragColor = vec4(color, 1.0);
}