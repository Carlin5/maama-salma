import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Stars, Sparkles, Environment } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

function FloatingHeart({ position, scale = 1, color = '#ff4d6d', spin = 0.4 }: {
  position: [number, number, number]
  scale?: number
  color?: string
  spin?: number
}) {
  const ref = useRef<THREE.Group>(null!)
  // Heart shape via THREE.Shape
  const geometry = useMemo(() => {
    const x = 0
    const y = 0
    const heartShape = new THREE.Shape()
    heartShape.moveTo(x + 0.5, y + 0.5)
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y)
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7)
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9)
    heartShape.bezierCurveTo(x + 1.3, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7)
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y)
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5)
    const settings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.1,
      curveSegments: 32,
    }
    const geom = new THREE.ExtrudeGeometry(heartShape, settings)
    geom.center()
    geom.rotateZ(Math.PI)
    return geom
  }, [])

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * spin
    ref.current.rotation.x = Math.sin(performance.now() * 0.001) * 0.2
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          metalness={0.2}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.05}
        />
      </mesh>
    </group>
  )
}

function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.position.y = Math.sin(t * 0.8) * 0.2
    const mat = ref.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 1.2 + Math.sin(t * 3) * 0.4
  })
  return (
    <mesh ref={ref} position={[0, 0.4, -3]}>
      <sphereGeometry args={[0.45, 64, 64]} />
      <meshStandardMaterial
        color="#ffb070"
        emissive="#ff9533"
        emissiveIntensity={1.5}
        roughness={0.3}
      />
    </mesh>
  )
}

function RitualRing() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, dt) => {
    ref.current.rotation.z += dt * 0.15
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, -2.2, -3]}>
      <torusGeometry args={[3.4, 0.04, 16, 200]} />
      <meshStandardMaterial
        color="#f4d27a"
        emissive="#d9a441"
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.3}
      />
    </mesh>
  )
}

function RitualRing2() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, dt) => {
    ref.current.rotation.z -= dt * 0.08
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, -2.2, -3]}>
      <torusGeometry args={[4.2, 0.02, 16, 200]} />
      <meshStandardMaterial
        color="#ff4d6d"
        emissive="#ff4d6d"
        emissiveIntensity={0.6}
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  )
}

export default function RitualScene3D() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        camera={{ position: [0, 0.6, 9.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#070318']} />
          <fog attach="fog" args={['#070318', 10, 22]} />

          <ambientLight intensity={0.25} />
          <pointLight position={[0, 1, 3]} color="#ff9533" intensity={3} distance={10} />
          <pointLight position={[-3, 2, -2]} color="#7a3df5" intensity={2} distance={10} />
          <pointLight position={[3, -1, 2]} color="#ff4d6d" intensity={2.5} distance={10} />

          <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1}>
            <FloatingHeart position={[0, 0.6, -3]} scale={1.0} color="#ff4d6d" />
          </Float>
          <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.4}>
            <FloatingHeart position={[-3.8, 0.6, -3]} scale={0.55} color="#ff7aa8" />
          </Float>
          <Float speed={2.1} rotationIntensity={0.6} floatIntensity={1.2}>
            <FloatingHeart position={[3.8, -0.6, -3]} scale={0.5} color="#ffd27a" />
          </Float>
          <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
            <FloatingHeart position={[2.8, 2.2, -4]} scale={0.4} color="#7a3df5" spin={0.6} />
          </Float>
          <Float speed={1.9} rotationIntensity={0.5} floatIntensity={1.3}>
            <FloatingHeart position={[-2.8, -1.8, -4]} scale={0.45} color="#e6294b" spin={0.7} />
          </Float>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.1}>
            <FloatingHeart position={[0, 2.4, -5]} scale={0.3} color="#ffd27a" spin={0.4} />
          </Float>
          <Float speed={1.7} rotationIntensity={0.5} floatIntensity={1.1}>
            <FloatingHeart position={[0, -2.4, -5]} scale={0.3} color="#ff7aa8" spin={0.5} />
          </Float>

          <GlowOrb />
          <RitualRing />
          <RitualRing2 />

          <Sparkles count={120} scale={[10, 6, 6]} size={3} speed={0.3} color="#ffd27a" opacity={0.7} />
          <Stars radius={50} depth={50} count={1500} factor={3} fade speed={1} />

          <Environment preset="night" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate
            autoRotate
            autoRotateSpeed={0.6}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
