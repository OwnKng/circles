// @ts-nocheck
import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { ShaderMaterial } from "three"
import fragment from "./shaders/fragment"
import vertex from "./shaders/vertex"

const radius = 5
const precision = 100
const numberOfRings = 200

const CircleMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  vertex,
  fragment
)

extend({ CircleMaterial })

const Sketch = () => {
  const ref = useRef<ShaderMaterial>(null!)

  const geometry = useMemo(() => {
    const points = []

    //_ create curve
    for (let i = 0; i < precision; i++) {
      const x = radius * Math.sin((Math.PI * 2 * i) / precision)
      const y = radius * Math.cos((Math.PI * 2 * i) / precision)

      points.push(new THREE.Vector3(x, y, 0))
    }

    const curve = new THREE.CatmullRomCurve3(points)
    const tube = new THREE.TubeBufferGeometry(curve, 100, 0.1, 8, false)

    //_ create instanced buffer geometry
    const geometry = new THREE.InstancedBufferGeometry()
    geometry.index = tube.index
    geometry.attributes = tube.attributes

    //_ set translate
    const translate = new Float32Array(numberOfRings * 3)
    const scale = new Float32Array(numberOfRings)
    const offset = new Float32Array(numberOfRings)

    for (let i = 0; i < numberOfRings; i++) {
      const x = Math.random()
      const y = Math.random()
      const z = i * 0.1

      translate[i * 3 + 0] = x
      translate[i * 3 + 1] = y
      translate[i * 3 + 2] = z

      scale[i] = i * 0.4

      offset[i] = Math.random()
    }

    geometry.setAttribute(
      "translate",
      new THREE.InstancedBufferAttribute(translate, 3)
    )

    geometry.setAttribute("scale", new THREE.InstancedBufferAttribute(scale, 1))

    geometry.setAttribute(
      "offset",
      new THREE.InstancedBufferAttribute(offset, 1)
    )

    return geometry
  }, [])

  useFrame(({ clock }) => {
    ref.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <instancedMesh
      scale={[0.3, 0.3, 0.3]}
      args={[undefined, undefined, numberOfRings]}
    >
      <primitive object={geometry} attach='geometry' />
      <circleMaterial ref={ref} transparent={true} />
    </instancedMesh>
  )
}

export default Sketch
