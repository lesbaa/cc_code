precision mediump float;

uniform vec4 uMouse;
uniform vec2 uRes;
uniform float uTime;

float plot(vec2 st, float pct) {
  return
    smoothstep( pct - 0.01, pct, st.y ) - 
    smoothstep( pct, pct + 0.01, st.y );

}

void main() {
  vec2 st = gl_FragCoord.xy / uRes;

  float y = (sin(st.x * 5.0 + uTime) + 1.0) / 2.0;

  vec3 color = vec3(0.0);

  float pct = plot(st, y);
  color = (1.0 - pct) * color + pct * vec3(0.0,1.0,0.0);

  gl_FragColor = vec4(color, 1.0);
}