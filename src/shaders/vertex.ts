const vertex = /*glsl*/ `
        attribute vec3 translate;
        attribute float offset; 
        attribute float scale; 

        varying vec2 vUv; 
        varying float vOffset; 

        void main() {
            vec3 transformedPosition = position + translate; 
            transformedPosition *= scale; 
            
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(transformedPosition, 1.0);
            vUv = uv; 
            vOffset = offset; 
        }  
`

export default vertex
