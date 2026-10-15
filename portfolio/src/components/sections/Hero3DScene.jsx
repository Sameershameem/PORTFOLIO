import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, PerspectiveCamera, useTexture } from '@react-three/drei'
import {
  ExtrudeGeometry,
  LinearFilter,
  LinearMipmapLinearFilter,
  LatheGeometry,
  MathUtils,
  SRGBColorSpace,
  Shape,
  Vector2,
  Vector3,
} from 'three'

/* ── Premium material presets matching Dribbble reference ── */
const obsidianMetal = {
  color: '#292b28',
  metalness: 0.78,
  roughness: 0.2,
  clearcoat: 0.9,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.2,
  reflectivity: 0.9,
}

const chromeAccent = {
  color: '#aeb1ad',
  metalness: 0.82,
  roughness: 0.16,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  envMapIntensity: 1.4,
  reflectivity: 1,
}

/* ── Reusable lathe geometry helper ── */
function LatheForm({ points, material = obsidianMetal, ...props }) {
  const geometry = useMemo(
    () => new LatheGeometry(points.map(([radius, height]) => new Vector2(radius, height)), 64),
    [points],
  )

  return (
    <mesh geometry={geometry} castShadow receiveShadow {...props}>
      <meshPhysicalMaterial {...material} />
    </mesh>
  )
}

/* ── Shared base for all pieces ── */
function PieceBase() {
  return (
    <>
      <LatheForm
        points={[
          [0, 0], [0.2, 0], [0.26, 0.035], [0.29, 0.08], [0.27, 0.115],
          [0.21, 0.145], [0.18, 0.19], [0.15, 0.22], [0, 0.22],
        ]}
        material={chromeAccent}
      />
      <LatheForm
        points={[[0, 0.14], [0.16, 0.14], [0.19, 0.17], [0.16, 0.2], [0, 0.2]]}
        material={obsidianMetal}
      />
    </>
  )
}

/* ── Individual chess pieces ── */

function Pawn() {
  return (
    <>
      <PieceBase />
      <LatheForm
        points={[
          [0.12, 0.19], [0.1, 0.25], [0.12, 0.31], [0.15, 0.38],
          [0.13, 0.48], [0.1, 0.58], [0.14, 0.64], [0.19, 0.68],
          [0.2, 0.73], [0.18, 0.78], [0.13, 0.81], [0, 0.81],
        ]}
      />
      <mesh position={[0, 1.04, 0]} castShadow>
        <sphereGeometry args={[0.18, 48, 40]} />
        <meshPhysicalMaterial {...chromeAccent} />
      </mesh>
    </>
  )
}

function Rook() {
  return (
    <>
      <PieceBase />
      <LatheForm
        points={[
          [0.15, 0.18], [0.13, 0.24], [0.17, 0.3], [0.18, 0.88],
          [0.22, 0.94], [0.25, 0.99], [0.25, 1.07], [0.22, 1.12],
          [0, 1.12],
        ]}
      />
      <LatheForm
        points={[[0, 1.08], [0.25, 1.08], [0.25, 1.15], [0.21, 1.19], [0, 1.19]]}
        material={chromeAccent}
      />
      {[-1, 1].flatMap((x) => [-1, 1].map((z) => (
        <mesh key={`${x}-${z}`} position={[x * 0.15, 1.28, z * 0.15]} castShadow>
          <boxGeometry args={[0.11, 0.2, 0.11]} />
          <meshPhysicalMaterial {...obsidianMetal} />
        </mesh>
      )))}
    </>
  )
}

function Bishop() {
  return (
    <>
      <PieceBase />
      <LatheForm
        points={[
          [0.13, 0.19], [0.11, 0.25], [0.15, 0.31], [0.13, 0.57],
          [0.19, 0.73], [0.16, 0.88], [0.11, 0.96], [0.08, 1.05],
          [0.04, 1.1], [0, 1.12],
        ]}
      />
      <LatheForm
        points={[[0, 1.04], [0.11, 1.04], [0.15, 1.1], [0.11, 1.16], [0.06, 1.21], [0, 1.25]]}
        material={chromeAccent}
      />
      <mesh position={[0, 1.22, 0.115]} rotation={[0, 0, -0.55]} castShadow>
        <boxGeometry args={[0.035, 0.2, 0.018]} />
        <meshStandardMaterial color="#161715" metalness={0.5} roughness={0.26} />
      </mesh>
    </>
  )
}

function Queen() {
  return (
    <>
      <PieceBase />
      <LatheForm
        points={[
          [0.13, 0.19], [0.11, 0.25], [0.16, 0.32], [0.13, 0.62],
          [0.18, 0.78], [0.21, 0.93], [0.17, 1.02], [0.14, 1.08],
          [0, 1.1],
        ]}
      />
      <mesh position={[0, 1.15, 0]}>
        <torusGeometry args={[0.17, 0.035, 20, 64]} />
        <meshPhysicalMaterial {...chromeAccent} />
      </mesh>
      {Array.from({ length: 8 }, (_, index) => {
        const angle = (index / 8) * Math.PI * 2
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * 0.17, 1.3, Math.sin(angle) * 0.17]}
            rotation={[0, 0, -Math.cos(angle) * 0.2]}
            castShadow
          >
            <coneGeometry args={[0.045, 0.24, 24]} />
            <meshPhysicalMaterial {...chromeAccent} />
          </mesh>
        )
      })}
    </>
  )
}

function Knight() {
  const geometry = useMemo(() => {
    const shape = new Shape()
    shape.moveTo(-0.24, 0)
    shape.lineTo(0.22, 0)
    shape.lineTo(0.27, 0.13)
    shape.quadraticCurveTo(0.15, 0.3, 0.2, 0.42)
    shape.quadraticCurveTo(0.38, 0.56, 0.31, 0.7)
    shape.lineTo(0.16, 0.72)
    shape.lineTo(0.24, 0.9)
    shape.lineTo(0.12, 0.83)
    shape.quadraticCurveTo(0.05, 1.02, -0.08, 0.88)
    shape.lineTo(-0.2, 0.93)
    shape.lineTo(-0.17, 0.77)
    shape.lineTo(-0.31, 0.71)
    shape.lineTo(-0.26, 0.56)
    shape.quadraticCurveTo(-0.39, 0.43, -0.3, 0.31)
    shape.lineTo(-0.34, 0.14)
    shape.closePath()
    return new ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.05,
      bevelThickness: 0.045,
      curveSegments: 18,
    })
  }, [])

  return (
    <>
      <PieceBase />
      <LatheForm
        points={[
          [0.13, 0.19], [0.11, 0.25], [0.15, 0.31], [0.17, 0.39],
          [0, 0.42],
        ]}
      />
      <mesh position={[0, 0.34, -0.11]} geometry={geometry} castShadow>
        <meshPhysicalMaterial {...obsidianMetal} />
      </mesh>
      <mesh position={[0.16, 1.04, 0.14]} scale={[0.035, 0.035, 0.014]}>
        <sphereGeometry args={[1, 24, 18]} />
        <meshStandardMaterial color="#d8dad6" metalness={0.5} roughness={0.2} />
      </mesh>
    </>
  )
}

const pieceTypes = { bishop: Bishop, knight: Knight, pawn: Pawn, queen: Queen, rook: Rook }

const pieces = [
  { type: 'pawn', phase: 2.6, direction: 1, scale: 0.52, radiusX: 3.25, radiusY: 1.9, depth: 0.9, speed: 0.85 },
  { type: 'queen', phase: 0.85, direction: 1, scale: 0.61, radiusX: 3.35, radiusY: 1.95, depth: 0.95, speed: 0.72 },
  { type: 'rook', phase: -0.5, direction: 1, scale: 0.57, radiusX: 3.2, radiusY: 1.85, depth: 0.82, speed: 0.9 },
  { type: 'bishop', phase: -0.9, direction: 1, scale: 0.54, radiusX: 3.3, radiusY: 1.9, depth: 0.88, speed: 0.78 },
  { type: 'knight', phase: -2.9, direction: 1, scale: 0.64, radiusX: 3.25, radiusY: 1.9, depth: 1.0, speed: 0.82 },
]

function FloatingPiece({ piece, sceneRef, reducedMotion }) {
  const groupRef = useRef(null)
  const Piece = pieceTypes[piece.type]
  const { camera, size } = useThree()
  const vectors = useMemo(() => ({
    center: new Vector3(),
    forward: new Vector3(),
    right: new Vector3(),
    up: new Vector3(),
    target: new Vector3(),
  }), [])

  useFrame(({ pointer, clock }, delta) => {
    const group = groupRef.current
    if (!group) return

    const progress = reducedMotion
      ? 0
      : MathUtils.clamp(sceneRef.current?.userData.scrollProgress ?? 0, 0, 1)
    const mobile = size.width <= 900
    const angle = piece.phase + progress * Math.PI * 2 * piece.direction
    const cursorX = reducedMotion ? 0 : pointer.x * 0.14
    const cursorY = reducedMotion ? 0 : pointer.y * 0.11
    const verticalRadius = piece.radiusY * (mobile ? 0.78 : 1)
    const horizontalRadius = piece.radiusX * (mobile ? 0.43 : 1)
    const orbitDepth = Math.sin(angle) * piece.depth

    camera.updateMatrixWorld()
    camera.getWorldDirection(vectors.forward)
    vectors.center.copy(camera.position).addScaledVector(
      vectors.forward,
      -camera.position.z / vectors.forward.z,
    )
    vectors.right.setFromMatrixColumn(camera.matrixWorld, 0)
    vectors.up.setFromMatrixColumn(camera.matrixWorld, 1)
    const isMobile = size.width <= 900
    const topRatio = isMobile ? 0.39 : 0.48
    const fov = MathUtils.degToRad(camera.fov)
    const visibleHeight = 2 * Math.abs(camera.position.z / vectors.forward.z) * Math.tan(fov / 2)
    vectors.center.addScaledVector(vectors.up, (0.5 - topRatio) * visibleHeight)
    vectors.target
      .copy(vectors.center)
      .addScaledVector(vectors.right, Math.cos(angle) * horizontalRadius + cursorX)
      .addScaledVector(vectors.up, Math.sin(angle) * verticalRadius + cursorY)
      .addScaledVector(vectors.forward, -orbitDepth)

    const dampSpeed = 2.4
    group.position.lerp(vectors.target, 1 - Math.exp(-dampSpeed * delta))

    const t = clock.elapsedTime
    group.rotation.y = MathUtils.damp(
      group.rotation.y,
      angle * 0.35 + (reducedMotion ? 0 : Math.sin(t * piece.speed) * 0.06 + cursorX * 0.2),
      dampSpeed,
      delta,
    )
    group.rotation.x = MathUtils.damp(
      group.rotation.x,
      reducedMotion ? 0 : -orbitDepth * 0.08 - cursorY * 0.2,
      dampSpeed,
      delta,
    )
    group.rotation.z = MathUtils.damp(
      group.rotation.z,
      reducedMotion ? 0 : Math.sin(angle) * 0.045,
      dampSpeed,
      delta,
    )

    const targetScale = piece.scale * (mobile ? 0.72 : 1)
    group.scale.setScalar(MathUtils.damp(group.scale.x, targetScale, dampSpeed, delta))
  })

  return (
    <group ref={groupRef}>
      <Piece />
    </group>
  )
}

function FloatingChessSet({ sceneRef, reducedMotion }) {
  return pieces.map((piece) => (
    <FloatingPiece
      key={piece.type}
      piece={piece}
      sceneRef={sceneRef}
      reducedMotion={reducedMotion}
    />
  ))
}

function StatuePortrait({ sceneRef }) {
  const image = useTexture('/images/sameer-statue.png?v=19', (texture) => {
    texture.colorSpace = SRGBColorSpace
    texture.minFilter = LinearMipmapLinearFilter
    texture.magFilter = LinearFilter
    texture.anisotropy = 4
  })
  const groupRef = useRef(null)
  const { camera, size } = useThree()
  const vectors = useMemo(() => ({
    center: new Vector3(),
    forward: new Vector3(),
    up: new Vector3(),
  }), [])
  const imageAspect = image.image.width / image.image.height

  useFrame(() => {
    const group = groupRef.current
    if (!group) return
    camera.updateMatrixWorld()
    camera.getWorldDirection(vectors.forward)
    vectors.center.copy(camera.position).addScaledVector(
      vectors.forward,
      -camera.position.z / vectors.forward.z,
    )
    vectors.up.setFromMatrixColumn(camera.matrixWorld, 1)
    const mobile = size.width <= 900
    const topRatio = mobile ? 0.44 : 0.48
    const fov = MathUtils.degToRad(camera.fov)
    const cameraDistance = Math.abs(camera.position.z / vectors.forward.z)
    const visibleHeight = 2 * cameraDistance * Math.tan(fov / 2)
    const targetHeight = mobile
      ? Math.min(size.height * 0.58, size.width * 0.95)
      : Math.min(size.height * 0.86, size.width * 0.62)
    const progress = MathUtils.clamp(sceneRef.current?.userData.scrollProgress ?? 0, 0, 1)
    const scrollScale = mobile ? 1.04 : 1.12
    const scrollLift = progress * 18 * visibleHeight / size.height

    vectors.center.addScaledVector(vectors.up, (0.5 - topRatio) * visibleHeight + scrollLift)
    group.position.copy(vectors.center)
    group.quaternion.copy(camera.quaternion)
    group.scale.setScalar(
      targetHeight * visibleHeight / (1.5 * size.height)
        * (1 + progress * (scrollScale - 1)),
    )
  })

  return (
    <group ref={groupRef}>
      <mesh renderOrder={1}>
        <planeGeometry args={[imageAspect * 1.5, 1.5]} />
        <meshBasicMaterial
          map={image}
          alphaTest={0.003}
          transparent
          depthWrite
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function Sculpture({ sceneRef, reducedMotion }) {
  return (
    <group ref={sceneRef}>
      <StatuePortrait sceneRef={sceneRef} />
      <FloatingChessSet sceneRef={sceneRef} reducedMotion={reducedMotion} />

      {/* Ambient fill */}
      <ambientLight intensity={0.5} />

      {/* Hemisphere for subtle color gradient */}
      <hemisphereLight args={['#e8e6e0', '#3a3b38', 0.55]} />

      {/* Key light — warm, strong */}
      <directionalLight position={[-4, 6, 5]} intensity={2.8} color="#fff8ee" />

      {/* Fill light — cool, softer */}
      <directionalLight position={[5, 3, -3]} intensity={1.8} color="#d0ddf0" />

      {/* Rim/back light — dramatic edge highlight */}
      <directionalLight position={[0, -2, -6]} intensity={1.2} color="#c8ccc0" />

      {/* Top accent — subtle downlight */}
      <pointLight position={[0, 8, 0]} intensity={0.8} color="#f0efe8" distance={18} decay={2} />

      {/* Environment map for realistic reflections */}
      <Environment preset="city" environmentIntensity={0.35} />
    </group>
  )
}

/* ── Responsive camera ── */
function ResponsiveCamera({ cameraRef }) {
  const isMobile = useThree(({ size }) => size.width <= 900)
  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, isMobile ? 1.55 : 1.1, isMobile ? 14.8 : 11.5]}
      rotation={[-0.12, 0, 0]}
      fov={32}
    />
  )
}

/* ── Exported scene component ── */
export default function Hero3DScene({ sceneRef, cameraRef, eventSource }) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [inView, setInView] = useState(true)
  const sceneElementRef = useRef(null)

  useEffect(() => {
    const element = sceneElementRef.current
    if (!element) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="hero-scene" ref={sceneElementRef} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView ? 'always' : 'demand'}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        eventSource={eventSource}
        style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}
        fallback={<div className="hero-scene-fallback" aria-hidden="true" />}
      >
        <ResponsiveCamera cameraRef={cameraRef} />
        <Sculpture sceneRef={sceneRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
