precision mediump float;

uniform vec3 uLighting;
uniform vec4 uAmbient;
uniform float uMouseX;
uniform float uMouseY;
uniform float uWidth;
uniform float uTime;

void main() {

  float x = gl_PointCoord.x * 2.0 - 1.0;
  float y = gl_PointCoord.y * 2.0 - 1.0;

  float z = sqrt(1.0 - (pow(x, 2.0) + pow(y, 2.0)));

  vec3 position = vec3(x, y, z);

  float mag = dot(position.xy, position.xy);
  if(mag > 1.0) discard;

  vec3 normal = normalize(position);

  vec3 normal_col = normal * 0.5 + 0.5;
  vec3 lightPos = normalize(uLighting);

  float diffuse = dot(lightPos, normal);
  gl_FragColor = diffuse * vec4(0.5, 0.4, 0.9, 1.0);
}