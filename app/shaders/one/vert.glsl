precision mediump float;

attribute vec3 position;

void main() {
  gl_PointSize = 250.0;
  gl_Position = vec4(position.xyz, 1.0);
}