precision mediump float;

uniform vec4 uMouse;
uniform vec2 uRes;
uniform float uMag;
uniform float uTime;

vec3 mandelIter(float x, float y, float alpha) {
  float r = x;
  float i = y;
  for (int a = 0; a < 100; a++) {
    float tmpr = r * r - i * i + x;
    float tmpi = 2.0 * r * i + y;

    r = tmpr;
    i = tmpi;
    if (r * i > 4.0) {
      return vec3(float(a / 100), 0.0, 0.0);
    }
  }

  return vec3(1.0, r, i);
}

void main() {
  vec2 st = gl_FragCoord.xy / uRes;
  vec2 stMouse = uMouse.xy / uRes;
  vec3 mandelbrotVal = mandelIter(
    st.x / uMag + stMouse.x,
    st.y / uMag - stMouse.y,
    uTime
  );

  gl_FragColor = vec4(mandelbrotVal.xyz, 1.0);
}