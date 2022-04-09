import fragment from "./shaders/fragment"
import vertex from "./shaders/vertex"
import * as THREE from "three"

const CircleMaterial = () => {
  const uniforms = {}

  return (
    <shaderMaterial
      uniforms={uniforms}
      fragmentShader={fragment}
      vertexShader={vertex}
    />
  )
}

export default CircleMaterial
