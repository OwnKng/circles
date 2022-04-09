import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import "./App.css"
import Sketch from "./Sketch"

const App = () => {
  return (
    <div className='App'>
      <Canvas orthographic camera={{ zoom: 10, position: [0, -100, 50] }}>
        <OrbitControls />
        <Sketch />
      </Canvas>
    </div>
  )
}

export default App
