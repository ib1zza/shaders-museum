uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;
varying vec2 vUv;

uniform float uTime;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main()
{
    float mixStrength = clamp((vElevation + uColorOffset) ,0.0,1.0) * uColorMultiplier;

    float strength = step(0.5, 1.0 - distance(gl_PointCoord, vec2(0.5)));

    float isInCircle = 1.0 - step(0.5,distance(vUv, vec2(0.5)));


    float speed = uTime / 10.0;

    float mul = mod((vUv.y + speed / 2.0) * 20.0, 1.0) *
    abs(sin(((vUv.x + vUv.y) * 10.0 + speed * 25.0)) + 0.2) *
    (abs(sin(((vUv.x - vUv.y) * 5.0 + speed * 3.0))));

    float time = uTime * 0.8 * 0.2;

//    vec3 vColor = vec3( abs(sin(time)) + 0.5, 0, abs(cos(time)) + 0.5);

    vec3 rgb = hsb2rgb(vec3(vUv.x * 0.1 + time, 1.0, 1.5));

    vec3 color = mix( uDepthColor, rgb, mixStrength );

//    vec3 color = vColor;
    gl_FragColor = vec4( color.rgb , isInCircle);





    // Set the final RGB color
//    gl_FragColor = vec4(color, 1.0);
}
