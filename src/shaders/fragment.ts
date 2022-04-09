import { hsl2rgb } from "./hsl2rgb"

const fragment = /*glsl*/ `
    varying vec2 vUv; 
    varying float vOffset; 
    uniform float uTime; 

    ${hsl2rgb} 

    void main() {
        float wave = mod(uTime * 0.5 + vOffset * 3.0, 1.0); 
        wave = 1.0 - smoothstep(wave, wave + 0.15, vUv.x) + smoothstep(wave - 0.15, wave, vUv.x); 
        wave = wave - 1.0; 

        vec3 color = hsl2rgb(0.55, wave * 0.6, 0.5 + wave * 0.5); 

        if(wave < 0.25) discard; 

        gl_FragColor = vec4(color, 1.0);
    }
`

export default fragment
