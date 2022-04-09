const fragment = /*glsl*/ `
    varying vec2 vUv; 
    varying float vOffset; 
    uniform float uTime; 

    void main() {
        float wave = mod(uTime + vOffset * 3.0, 1.0); 
        wave = 1.0 - smoothstep(wave, wave + 0.1, vUv.x) + smoothstep(wave - 0.1, wave, vUv.x); 
        wave = wave - 1.0; 

        if(wave < 0.1) discard; 

        gl_FragColor = vec4(vec3(wave), 1.0);
    }
`

export default fragment
