import {useMemo} from 'react'
import * as THREE from 'three'
import {useTexture} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'

import {Setup} from '@story/Setup.jsx'

import vertexShader from '@lib/shaders/flag/vertex.glsl'
import fragmentShader from '@lib/shaders/flag/fragment.glsl'

export default {
  title: 'Shader/Flag',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
      description: 'Flag color',
    },
    frequency: {
      control: 'object',
      description: 'Flag frequency',
    }
  },
  args: {
    color: 'white',
    frequency: { x: 10, y: 5 }
  },
  decorators: [
    (Story) => (
      <Setup cameraPosition={[0, 0, 1]}>
        <Story />
      </Setup>
    ),
  ],
}

export const Default = {
  render ({color, frequency}) {
    const flagTexture = useTexture('/textures/flag-french.jpg')

    const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, 32, 32), [])
    const material = useMemo(() => new THREE.RawShaderMaterial({
      vertexShader, // @lib/shaders/flag/vertex.glsl
      fragmentShader, // @lib/shaders/flag/fragment.glsl
      uniforms: {
        uFrequency: { value: new THREE.Vector2(frequency.x, frequency.y) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uTexture: { value: flagTexture }
      },
      side: THREE.DoubleSide
    }), [color, frequency, flagTexture])

    useFrame((state) => {
      const elapsedTime = state.clock.getElapsedTime()
      material.uniforms.uTime.value = elapsedTime
    })

    return <mesh geometry={geometry} material={material}/>
  }
}
