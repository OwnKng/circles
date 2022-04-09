import { noise } from "./nosie"

const vertex = /*glsl*/ `
        uniform float uTime; 
        attribute vec3 translate;
        attribute float offset; 
        attribute float scale; 
        attribute float cIndex; 

        varying vec2 vUv; 
        varying float vOffset; 

        ${noise}

        void main() {
            float noise = cnoise(vec3(cIndex, uTime * 0.5, 123.0)) * 0.5 + 0.5;
            noise *= 5.0;
            
            vec3 transformedPosition = position + translate; 
            transformedPosition += noise; 
            transformedPosition *= scale; 
            
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(transformedPosition, 1.0);
            vUv = uv; 
            vOffset = offset; 
        }  
`

export default vertex
