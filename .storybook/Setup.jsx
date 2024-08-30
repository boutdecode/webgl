import * as React from 'react'
import {Canvas} from '@react-three/fiber'
import {OrbitControls, Stats} from '@react-three/drei'

export const Setup = ({
  children,
  cameraFov = 75,
  cameraPosition = [-2, 2, 2],
  controls = true,
  lights = true,
  background = '#F0FFF0',
  ...props
}) => (
  <Canvas shadows camera={{
    position: cameraPosition,
    fov: cameraFov,
  }} {...props} style={{background}}>
    <React.Suspense fallback={null}>
      {children}
    </React.Suspense>
    {lights && (
      <>
        <ambientLight intensity={1} />
        <directionalLight intensity={1} position={[-2, 3, -4]} />
      </>
    )}
    {controls && <OrbitControls makeDefault />}
    <Stats/>
  </Canvas>
)
