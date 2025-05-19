"use client"

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { getAgentWorkloadColor } from '@/lib/utils'

interface ParticleProps {
  position: [number, number, number]
  color: string
  size?: number
  speed?: number
  trail?: boolean
}

function Particle({ position, color, size = 0.5, speed = 0.5, trail = false }: ParticleProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [randomOffset] = useState(() => Math.random() * Math.PI * 2)
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() * speed + randomOffset) * 0.002
      
      // Subtle rotation
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.z += 0.005
    }
  })
  
  return (
    <>
      {trail ? (
        <Trail
          width={0.5}
          length={8}
          color={new THREE.Color(color)}
          attenuation={(t) => t * t}
        >
          <Sphere ref={meshRef} args={[size, 16, 16]} position={position}>
            <meshStandardMaterial 
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Trail>
      ) : (
        <Sphere ref={meshRef} args={[size, 16, 16]} position={position}>
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      )}
    </>
  )
}

interface AgentNodeProps {
  position: [number, number, number]
  name: string
  workload: number
  connections: Array<[number, number, number]>
}

function AgentNode({ position, name, workload, connections }: AgentNodeProps) {
  const color = getAgentWorkloadColor(workload)
  
  return (
    <group>
      {/* Main agent node */}
      <Particle 
        position={position} 
        color={color} 
        size={0.7} 
        trail={workload > 0.5}
      />
      
      {/* Connection particles */}
      {connections.map((connPos, index) => (
        <React.Fragment key={index}>
          {/* Draw line connection */}
          <line>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([...position, ...connPos])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial 
              attach="material" 
              color={color} 
              opacity={0.3} 
              transparent={true} 
              linewidth={1}
            />
          </line>
          
          {/* Small particles along connection */}
          {[0.3, 0.6, 0.9].map((t, i) => {
            const x = position[0] + (connPos[0] - position[0]) * t
            const y = position[1] + (connPos[1] - position[1]) * t
            const z = position[2] + (connPos[2] - position[2]) * t
            
            return (
              <Particle 
                key={i}
                position={[x, y, z]} 
                color={color} 
                size={0.1}
                speed={1 + workload}
              />
            )
          })}
        </React.Fragment>
      ))}
      
      {/* Text label would be added here in a production app */}
    </group>
  )
}

interface AgentModelProps {
  agents: Array<{
    id: string
    name: string
    workload: number
    position: [number, number, number]
    connections: Array<[number, number, number]>
  }>
}

export default function AgentModel({ agents }: AgentModelProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 8], fov: 50 }}
      className="w-full h-full"
    >
      <color attach="background" args={['transparent']} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} castShadow />
      
      {/* Agent network */}
      {agents.map((agent) => (
        <AgentNode 
          key={agent.id}
          position={agent.position}
          name={agent.name}
          workload={agent.workload}
          connections={agent.connections}
        />
      ))}
      
      {/* Background galaxy particles */}
      {Array.from({ length: 200 }).map((_, i) => (
        <Particle 
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
          color={i % 5 === 0 ? '#88eeff' : i % 3 === 0 ? '#aa88ff' : '#ffffff'}
          size={0.03 + Math.random() * 0.05}
          speed={0.2}
        />
      ))}
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxDistance={20}
        minDistance={4}
      />
    </Canvas>
  )
} 