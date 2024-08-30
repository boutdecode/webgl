import {useMemo} from 'react'
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'

import {Setup} from '@story/Setup.jsx'

import vertexShader from '@lib/shaders/water/vertex.glsl'
import fragmentShader from '@lib/shaders/water/fragment.glsl'

export default {
  title: 'Shader/Water',
  tags: ['autodocs'],
  argTypes: {
    uBigWavesElevation: {
      control: 'number',
      description: 'Big waves elevation'
    },
    uBigWavesFrequency: {
      control: 'object',
      description: 'Big waves frequency',
    },
    uSmallWavesElevation: {
      control: 'number',
      description: 'Small waves elevation',
    },
    uSmallWavesFrequency: {
      control: 'number',
      description: 'Small waves frequency',
    },
    uSmallWavesSpeed: {
      control: 'number',
      description: 'Small waves speed',
    },
    uSmallWavesIterations: {
      control: 'number',
      description: 'Small waves iterations',
    },
    uBigWavesSpeed: {
      control: 'number',
      description: 'Big waves speed',
    },
    uDepthColor: {
      control: 'color',
      description: 'Depth color',
    },
    uSurfaceColor: {
      control: 'color',
      description: 'Surface color',
    },
    uColorOffset: {
      control: 'number',
      description: 'Color offset',
    },
    uColorMultiplier: {
      control: 'number',
      description: 'Color multiplier',
    },
  },
  args: {
    uBigWavesElevation: 0.2,
    uBigWavesFrequency: { x: 4, y: 1.5 },
    uSmallWavesElevation: 0.15,
    uSmallWavesFrequency: 3,
    uSmallWavesSpeed: 0.2,
    uSmallWavesIterations: 4.0,
    uBigWavesSpeed: 0.75,
    uDepthColor: '#186691',
    uSurfaceColor: '#9bd8ff',
    uColorOffset: 0.1,
    uColorMultiplier: 5.0,
  },
  decorators: [
    (Story) => (
      <Setup cameraPosition={[1, 1, 2]}>
        <Story />
      </Setup>
    ),
  ],
}

export const Default = {
  render ({
    uBigWavesElevation,
    uBigWavesFrequency,
    uSmallWavesElevation,
    uSmallWavesFrequency,
    uSmallWavesSpeed,
    uSmallWavesIterations,
    uBigWavesSpeed,
    uDepthColor,
    uSurfaceColor,
    uColorOffset,
    uColorMultiplier
  }) {
    const geometry = useMemo(() => new THREE.PlaneGeometry(2, 2, 512, 512), [])
    const material = useMemo(() => new THREE.RawShaderMaterial({
      vertexShader, // @lib/shaders/water/vertex.glsl
      fragmentShader, // @lib/shaders/water/fragment.glsl
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },
        uBigWavesElevation: { value: uBigWavesElevation },
        uBigWavesFrequency: { value: new THREE.Vector2(uBigWavesFrequency.x, uBigWavesFrequency.y) },
        uSmallWavesElevation: { value: uSmallWavesElevation },
        uSmallWavesFrequency: { value: uSmallWavesFrequency },
        uSmallWavesSpeed: { value: uSmallWavesSpeed },
        uSmallWavesIterations: { value: uSmallWavesIterations },
        uBigWavesSpeed: { value: uBigWavesSpeed },
        uDepthColor: { value: new THREE.Color(uDepthColor) },
        uSurfaceColor: { value: new THREE.Color(uSurfaceColor) },
        uColorOffset: { value: uColorOffset },
        uColorMultiplier: { value: uColorMultiplier },
      },
      side: THREE.DoubleSide
    }), [
      uBigWavesElevation,
      uBigWavesFrequency,
      uSmallWavesElevation,
      uSmallWavesFrequency,
      uSmallWavesSpeed,
      uSmallWavesIterations,
      uBigWavesSpeed,
      uDepthColor,
      uSurfaceColor,
      uColorOffset,
      uColorMultiplier
    ])

    useFrame((state) => {
      const elapsedTime = state.clock.getElapsedTime()
      material.uniforms.uTime.value = elapsedTime
    })

    return <mesh rotation-x={Math.PI / 2} geometry={geometry} material={material} />
  }
}
