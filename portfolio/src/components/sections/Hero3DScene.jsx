import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { advance, Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, useTexture } from '@react-three/drei'
import {
  BoxGeometry,
  ExtrudeGeometry,
  LatheGeometry,
  LinearFilter,
  LinearMipmapLinearFilter,
  MathUtils,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  SRGBColorSpace,
  Shape,
  SphereGeometry,
  SplineCurve,
  TorusGeometry,
  Vector2,
  Vector3,
} from 'three'
import { STATUE_SRC } from '../../data/statue.js'
import { onFrame } from '../../lib/smoothScroll.js'

/*
 * One fixed canvas spans the hero and the About skill panels.
 * Everything is placed in screen pixels (read from the DOM each frame) and converted
 * to world units on the z = 0 plane, so 3D objects line up exactly with HTML layout.
 */
const CAMERA_Z = 12
const CAMERA_FOV = 30
const PIECE_HEIGHT = 1.35 // model units, base to crown
const STATUE_INTRO_MS = 1700 // statue rise after the loader hands over
const KING_HANDOFF_MS = 1600 // loader king glides from screen centre to the wordmark
// Loader king size in px — must match --k in index.html: min(34% of the screen height, 320px).
const loaderKingSize = (H) => Math.min(H * 0.34, 320)

// Phones / touch devices get cheaper materials, fewer segments and a lower pixel ratio.
const LITE = typeof window !== 'undefined'
  && window.matchMedia('(max-width: 900px), (pointer: coarse)').matches

/* ── Shared materials: one GPU program for every piece ── */
// Phones get the cheaper standard shader (no clear-coat pass) — far faster to compile and draw.
const PieceMaterial = LITE ? MeshStandardMaterial : MeshPhysicalMaterial

const obsidian = new PieceMaterial({
  color: '#1b1c1a',
  metalness: 0.65,
  roughness: 0.18,
  ...(LITE ? {} : { clearcoat: 1, clearcoatRoughness: 0.06 }),
  envMapIntensity: 1.35,
})

const chrome = new PieceMaterial({
  color: '#c9ccc6',
  metalness: 1,
  roughness: 0.14,
  ...(LITE ? {} : { clearcoat: 1, clearcoatRoughness: 0.05 }),
  envMapIntensity: 1.5,
})

/* ── Geometry helpers (built once, cached at module level) ── */
const geometryCache = new Map()
function cached(key, build) {
  if (!geometryCache.has(key)) geometryCache.set(key, build())
  return geometryCache.get(key)
}

/** Smooth a coarse [radius, height] profile with a spline before lathing. */
function lathe(key, profile, radial = LITE ? 44 : 72) {
  return cached(key, () => {
    const curve = new SplineCurve(profile.map(([r, y]) => new Vector2(r, y)))
    const points = curve.getPoints(profile.length * 10)
    points[0].x = Math.max(points[0].x, 0)
    points[points.length - 1].x = 0
    const geometry = new LatheGeometry(points, radial)
    geometry.computeVertexNormals()
    return geometry
  })
}

const BASE = [
  [0, 0], [0.27, 0], [0.3, 0.04], [0.29, 0.09], [0.24, 0.12],
  [0.2, 0.16], [0.21, 0.19], [0.17, 0.22], [0, 0.22],
]

function Base() {
  return (
    <>
      <mesh geometry={lathe('base', BASE)} material={chrome} />
      <mesh geometry={lathe('collar', [[0, 0.2], [0.18, 0.2], [0.2, 0.225], [0.17, 0.25], [0, 0.25]])} material={obsidian} />
    </>
  )
}

/* ── Pieces ── */
function Pawn() {
  return (
    <>
      <Base />
      <mesh
        geometry={lathe('pawn', [
          [0.15, 0.24], [0.13, 0.32], [0.11, 0.45], [0.1, 0.56],
          [0.17, 0.6], [0.19, 0.63], [0.12, 0.66], [0.08, 0.7], [0, 0.71],
        ])}
        material={obsidian}
      />
      <mesh
        position={[0, 0.86, 0]}
        geometry={cached('pawn-head', () => new SphereGeometry(0.17, 48, 36))}
        material={obsidian}
      />
    </>
  )
}

function Rook() {
  const merlon = cached('merlon', () => new BoxGeometry(0.1, 0.13, 0.12))
  return (
    <>
      <Base />
      <mesh
        geometry={lathe('rook', [
          [0.17, 0.24], [0.15, 0.32], [0.15, 0.8], [0.19, 0.86],
          [0.24, 0.92], [0.24, 1.03], [0, 1.03],
        ])}
        material={obsidian}
      />
      <mesh geometry={lathe('rook-band', [[0, 0.88], [0.22, 0.88], [0.25, 0.9], [0.22, 0.92], [0, 0.92]])} material={chrome} />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <mesh
            key={i}
            geometry={merlon}
            material={obsidian}
            position={[Math.cos(a) * 0.19, 1.09, Math.sin(a) * 0.19]}
            rotation={[0, -a, 0]}
          />
        )
      })}
    </>
  )
}

function Bishop() {
  return (
    <>
      <Base />
      <mesh
        geometry={lathe('bishop', [
          [0.15, 0.24], [0.12, 0.34], [0.1, 0.62], [0.18, 0.67],
          [0.11, 0.71], [0.15, 0.82], [0.16, 0.94], [0.12, 1.05],
          [0.06, 1.12], [0, 1.14],
        ])}
        material={obsidian}
      />
      <mesh
        position={[0, 1.19, 0]}
        geometry={cached('bishop-tip', () => new SphereGeometry(0.045, 24, 18))}
        material={chrome}
      />
      {/* mitre slit */}
      <mesh
        position={[0, 0.98, 0.12]}
        rotation={[0.25, 0, -0.6]}
        geometry={cached('bishop-slit', () => new BoxGeometry(0.03, 0.22, 0.06))}
        material={chrome}
      />
    </>
  )
}

function Queen() {
  const point = cached('queen-point', () => new SphereGeometry(0.035, 16, 12))
  return (
    <>
      <Base />
      <mesh
        geometry={lathe('queen', [
          [0.16, 0.24], [0.13, 0.34], [0.1, 0.7], [0.19, 0.76],
          [0.12, 0.8], [0.14, 0.95], [0.21, 1.14], [0.18, 1.18], [0, 1.16],
        ])}
        material={obsidian}
      />
      <mesh position={[0, 0.77, 0]} rotation={[Math.PI / 2, 0, 0]} geometry={cached('queen-ring', () => new TorusGeometry(0.15, 0.025, 16, 64))} material={chrome} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return <mesh key={i} position={[Math.cos(a) * 0.19, 1.2, Math.sin(a) * 0.19]} geometry={point} material={chrome} />
      })}
      <mesh position={[0, 1.24, 0]} geometry={cached('queen-orb', () => new SphereGeometry(0.07, 32, 24))} material={chrome} />
    </>
  )
}

function King() {
  const bar = cached('king-bar', () => new BoxGeometry(0.05, 0.22, 0.05))
  return (
    <>
      <Base />
      <mesh
        geometry={lathe('king', [
          [0.17, 0.24], [0.14, 0.34], [0.11, 0.78], [0.2, 0.84],
          [0.13, 0.88], [0.15, 1.02], [0.22, 1.2], [0.15, 1.25], [0, 1.25],
        ])}
        material={obsidian}
      />
      <mesh position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]} geometry={cached('king-ring', () => new TorusGeometry(0.155, 0.025, 16, 64))} material={chrome} />
      <mesh position={[0, 1.36, 0]} geometry={bar} material={chrome} />
      <mesh position={[0, 1.38, 0]} rotation={[0, 0, Math.PI / 2]} geometry={bar} material={chrome} scale={[1, 0.75, 1]} />
    </>
  )
}

function Knight() {
  const head = cached('knight-head', () => {
    const s = new Shape()
    s.moveTo(-0.2, 0)
    s.lineTo(0.2, 0)
    s.bezierCurveTo(0.24, 0.12, 0.1, 0.26, 0.16, 0.38)
    s.bezierCurveTo(0.22, 0.48, 0.36, 0.5, 0.38, 0.6)
    s.bezierCurveTo(0.4, 0.68, 0.32, 0.72, 0.24, 0.7)
    s.bezierCurveTo(0.16, 0.68, 0.1, 0.72, 0.1, 0.78)
    s.lineTo(0.06, 0.92)
    s.lineTo(-0.02, 0.82)
    s.bezierCurveTo(-0.14, 0.86, -0.24, 0.8, -0.28, 0.66)
    s.bezierCurveTo(-0.32, 0.5, -0.3, 0.3, -0.24, 0.18)
    s.closePath()
    const geometry = new ExtrudeGeometry(s, {
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 8,
      bevelSize: 0.05,
      bevelThickness: 0.05,
      curveSegments: 32,
    })
    geometry.center()
    geometry.computeVertexNormals()
    return geometry
  })
  return (
    <>
      <Base />
      <mesh geometry={lathe('knight-neck', [[0.17, 0.24], [0.15, 0.3], [0.16, 0.36], [0, 0.37]])} material={obsidian} />
      <mesh position={[0, 0.78, 0]} geometry={head} material={obsidian} />
      <mesh position={[0.17, 0.95, 0.1]} geometry={cached('knight-eye', () => new SphereGeometry(0.025, 16, 12))} material={chrome} />
      <mesh position={[0.17, 0.95, -0.1]} geometry={cached('knight-eye', () => new SphereGeometry(0.025, 16, 12))} material={chrome} />
    </>
  )
}

const PIECE_COMPONENTS = { king: King, queen: Queen, rook: Rook, bishop: Bishop, knight: Knight, pawn: Pawn }

// Resting slot in the hero after the burst. x/y are fractions of the viewport half-width /
// half-height from the statue centre; z is in statue-heights toward the camera.
const SLOTS = {
  queen: { x: -0.5, y: 0.44, z: 0.12, spin: -0.2 },
  knight: { x: -0.66, y: 0.02, z: 0.18, spin: 0.3 },
  bishop: { x: -0.4, y: -0.17, z: 0.06, spin: -0.28 },
  king: { x: 0.5, y: 0.46, z: 0.02, spin: 0.22 },
  rook: { x: 0.66, y: 0.04, z: 0.15, spin: 0.26 },
  pawn: { x: 0.42, y: -0.3, z: 0.16, spin: -0.34 },
}

// Hero scroll timeline (0..1 of the pinned hero).
const BURST_END = 0.42 // every piece has landed around the statue
const BURST_LENGTH = 0.26 // scroll span of one piece's flight
const RAIL_START = 0.7 // pieces leave the statue for the side rail
const RAIL_LENGTH = 0.24

const clamp01 = (v) => MathUtils.clamp(v, 0, 1)
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const easeOutBack = (t) => {
  const c1 = 1.15 // gentle overshoot: pieces feel heavy, not bouncy
  const c3 = c1 + 1
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
}

/* ── Layout: reads the DOM once per frame (before anything writes) ── */
function LayoutRig({ layoutRef, containerRef, heroStageRef, heroPinRef, dockRefs, reducedMotion }) {
  const size = useThree((state) => state.size)
  const cacheRef = useRef({ scrollY: -1, w: 0, h: 0, frame: 0 })

  useFrame((_, delta) => {
    const layout = layoutRef.current
    const container = containerRef.current
    const pin = heroPinRef.current
    const stage = heroStageRef.current
    if (!container || !pin || !stage) return

    // Measuring the DOM forces a layout, so only re-measure when the page actually moved or
    // resized (plus a cheap safety re-check twice a second). Hero easing still runs every frame.
    const cache = cacheRef.current
    cache.frame += 1
    const scrollY = window.scrollY
    const moved = scrollY !== cache.scrollY || size.width !== cache.w || size.height !== cache.h
    if (!moved && layout.ready && cache.frame % 30 !== 0) {
      layout.hero = reducedMotion ? layout.heroRaw : MathUtils.damp(layout.hero, layout.heroRaw, 7, Math.min(delta, 0.1))
      return
    }
    cache.scrollY = scrollY
    cache.w = size.width
    cache.h = size.height

    const canvasRect = container.getBoundingClientRect()
    const pinRect = pin.getBoundingClientRect()
    const stageRect = stage.getBoundingClientRect()
    const W = size.width
    const H = size.height

    layout.ready = true
    layout.W = W
    layout.H = H
    layout.left = canvasRect.left
    layout.top = canvasRect.top
    layout.mobile = W <= 900
    layout.k = (2 * CAMERA_Z * Math.tan(MathUtils.degToRad(CAMERA_FOV) / 2)) / H

    // Hero progress straight from the DOM, then eased so the burst feels weighty.
    const travel = stageRect.height - pinRect.height
    const raw = clamp01(travel > 1 ? -stageRect.top / travel : -stageRect.top / pinRect.height)
    layout.heroRaw = raw
    layout.hero = reducedMotion ? raw : MathUtils.damp(layout.hero, raw, 7, Math.min(delta, 0.1))

    // Statue footprint inside the pinned hero (kept clear of the header and scroll cue).
    const pinTop = pinRect.top - canvasRect.top
    const baseHeight = layout.mobile
      ? Math.min(pinRect.height * 0.58, W * 0.95)
      : Math.min(pinRect.height - 176, W * 0.62)
    const bottom = layout.mobile
      ? pinTop + pinRect.height * 0.44 + baseHeight / 2
      : pinTop + 96 + baseHeight
    const height = baseHeight * (1 + layout.hero * 0.06) // grows upward from the pedestal
    layout.statue.cx = pinRect.left - canvasRect.left + pinRect.width / 2
    layout.statue.cy = bottom - height / 2
    layout.statue.h = height

    // The floating king mark next to the "SAMEER" wordmark.
    const markElement = document.querySelector('.wordmark-king')
    if (markElement) {
      const r = markElement.getBoundingClientRect()
      layout.mark.ok = r.height > 0
      layout.mark.x = r.left - canvasRect.left + r.width / 2
      layout.mark.y = r.top - canvasRect.top + r.height / 2
      layout.mark.h = r.height
    } else {
      layout.mark.ok = false
    }

    dockRefs.forEach((ref, index) => {
      const dock = layout.docks[index]
      const element = ref.current
      if (!element) {
        dock.ok = false
        return
      }
      const r = element.getBoundingClientRect()
      dock.ok = true
      dock.x = r.left - canvasRect.left + r.width / 2
      dock.y = r.top - canvasRect.top + r.height / 2
      dock.h = r.height
    })
  }, -2)

  return null
}

/** Canvas pixel (x right, y down) → world point on the z = 0 plane. */
function toWorld(layout, x, y, out) {
  return out.set((x - layout.W / 2) * layout.k, (layout.H / 2 - y) * layout.k, 0)
}

/* ── Statue: scroll-anchored only; it never reacts to the cursor ── */
const statueVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const statueFragment = /* glsl */ `
  uniform sampler2D map;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    // Negative LOD bias keeps the downscaled texture crisp instead of trilinear-soft.
    vec4 color = texture2D(map, vUv, -0.6);
    color.a *= uOpacity;
    if (color.a < 0.02) discard;
    gl_FragColor = color;
    #include <colorspace_fragment>
  }
`

function Statue({ layoutRef, introRef, reducedMotion }) {
  const gl = useThree((state) => state.gl)
  const texture = useTexture(STATUE_SRC, (t) => {
    t.colorSpace = SRGBColorSpace
    t.minFilter = LinearMipmapLinearFilter
    t.magFilter = LinearFilter
    t.generateMipmaps = true
    t.anisotropy = gl.capabilities.getMaxAnisotropy()
  })
  const meshRef = useRef(null)
  const aspect = texture.image.width / texture.image.height
  const uniforms = useMemo(() => ({ map: { value: texture }, uOpacity: { value: 0 } }), [texture])

  useFrame(() => {
    const mesh = meshRef.current
    const layout = layoutRef.current
    if (!mesh || !layout.ready) return
    const { cx, cy, h } = layout.statue

    // Intro: once the loader hands over, the statue rises onto its mark and fades in.
    const start = introRef.current
    const t = start == null ? 0 : reducedMotion ? 1 : clamp01((performance.now() - start) / STATUE_INTRO_MS)
    const rise = 1 - (1 - t) ** 4
    mesh.material.uniforms.uOpacity.value = rise
    mesh.visible = rise > 0
    toWorld(layout, cx, cy + (1 - rise) * h * 0.09, mesh.position)
    const scale = h * layout.k * (0.965 + 0.035 * rise)
    mesh.scale.set(scale, scale, 1)
  })

  return (
    <mesh ref={meshRef} renderOrder={1}>
      <planeGeometry args={[aspect, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={statueVertex}
        fragmentShader={statueFragment}
        transparent
        // Drawn after the (opaque) pieces, so it needs no depth writes — and without them the
        // loader king stays visible through the statue while it fades in.
        depthWrite={false}
      />
    </mesh>
  )
}

/* ── Compile every shader up front (while the loader is still up), then report ready ── */
function Warmup({ onReady }) {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const camera = useThree((state) => state.camera)

  useEffect(() => {
    let cancelled = false
    const compile = gl.compileAsync ? gl.compileAsync(scene, camera) : Promise.resolve(gl.compile(scene, camera))
    compile
      .catch(() => {})
      .then(() => {
        if (!cancelled) onReady?.()
      })
    return () => {
      cancelled = true
    }
  }, [gl, scene, camera, onReady])

  return null
}

/* ── Chess piece: burst → hero slot → side rail → docked in its About panel ── */
function ChessPiece({ skill, index, count, layoutRef, cursorRef, labelRef, reducedMotion }) {
  const ref = useRef(null)
  const Piece = PIECE_COMPONENTS[skill.piece]
  const slot = SLOTS[skill.piece]
  const stateRef = useRef(null)
  if (stateRef.current === null) {
    stateRef.current = {
      offset: new Vector3(),
      offsetTarget: new Vector3(),
      base: new Vector3(),
      screen: new Vector3(),
      spin: 0,
      labelKey: '',
    }
  }

  useFrame(({ clock }, delta) => {
    const group = ref.current
    const layout = layoutRef.current
    const cursor = cursorRef.current
    const state = stateRef.current
    if (!group || !layout.ready) return
    const dt = Math.min(delta, 0.1)
    const t = reducedMotion ? 0 : clock.elapsedTime
    const { W, H, mobile, statue } = layout
    const p = layout.hero
    const side = Math.sign(slot.x)


    // 1 · Burst out from behind the statue into the hero slot.
    const start = (index / count) * (BURST_END - BURST_LENGTH)
    const flight = reducedMotion ? 1 : clamp01((p - start) / BURST_LENGTH)
    const eased = easeOutBack(flight)
    const slotX = statue.cx + slot.x * (W / 2) * (mobile ? 1.2 : 1)
    const slotY = statue.cy - slot.y * (H / 2) * (mobile ? 0.62 : 1)
    const fromX = statue.cx + side * statue.h * 0.03
    const fromY = statue.cy + statue.h * 0.05
    let x = MathUtils.lerp(fromX, slotX, eased)
    let y = MathUtils.lerp(fromY, slotY, eased)
      - Math.sin(Math.PI * flight) * statue.h * 0.28
      + Math.sin(t * 0.9 + index * 1.7) * statue.h * 0.012 * flight
    let z = MathUtils.lerp(-0.3, slot.z, eased) * statue.h // px; negative = behind statue
    let size = statue.h * (mobile ? 0.15 : 0.17) * (0.35 + 0.65 * Math.min(eased, 1.08)) * (1 + slot.z * 0.15)

    // 2 · Leave the statue for a screen-fixed rail while the hero scrolls away.
    const rail = easeInOutCubic(clamp01((p - RAIL_START) / RAIL_LENGTH))
    const railX = mobile ? W - 18 : W - 52
    const railY = H / 2 + (index - (count - 1) / 2) * (mobile ? 38 : 60)
    x = MathUtils.lerp(x, railX, rail)
    y = MathUtils.lerp(y, railY, rail) - Math.sin(Math.PI * rail) * H * 0.06
    z = MathUtils.lerp(z, 0, rail)
    size = MathUtils.lerp(size, mobile ? 26 : 44, rail)

    // 3 · Dock into its panel as that panel scrolls into view, then ride along with it.
    const dock = layout.docks[index]
    const docking = dock.ok ? easeInOutCubic(clamp01((H * 0.95 - dock.y) / (H * 0.45))) : 0
    if (docking > 0) {
      x = MathUtils.lerp(x, dock.x, docking) + Math.sin(Math.PI * docking) * -side * W * 0.06
      y = MathUtils.lerp(y, dock.y, docking) - Math.sin(Math.PI * docking) * H * 0.1
      z = MathUtils.lerp(z, 0, docking)
      size = MathUtils.lerp(size, dock.h * 0.86, docking)
    }

    // Exact, scroll-driven base position…
    toWorld(layout, x, y, state.base)
    state.base.z = z * layout.k

    // …plus a smoothed cursor offset (parallax + magnetic repel), strongest in the hero.
    const heroPhase = flight * (1 - rail) * (1 - docking)
    const lively = heroPhase + docking * 0.35
    state.offsetTarget.set(cursor.x * 14 * lively, -cursor.y * 10 * lively, 0)
    if (cursor.active && heroPhase > 0.6) {
      const dx = x - (cursor.px - layout.left)
      const dy = y - (cursor.py - layout.top)
      const dist = Math.hypot(dx, dy)
      const radius = Math.max(W, H) * 0.2
      if (dist < radius && dist > 1) {
        const force = (1 - dist / radius) ** 2 * statue.h * 0.1 * heroPhase
        state.offsetTarget.x += (dx / dist) * force
        state.offsetTarget.y += (dy / dist) * force
      }
    }
    state.offset.lerp(state.offsetTarget, 1 - Math.exp(-6 * dt))
    group.position.set(
      state.base.x + state.offset.x * layout.k,
      state.base.y - state.offset.y * layout.k,
      state.base.z,
    )
    group.scale.setScalar((size * layout.k) / PIECE_HEIGHT)
    // Before launch the piece sits behind the statue; hide it so it never peeks through the legs.
    group.visible = flight > 0.001

    // Tumble in flight, half-turn on docking, slow idle spin, tilt toward the cursor.
    state.spin += dt * slot.spin * (reducedMotion ? 0 : 1)
    const tumble = (1 - eased) * Math.PI * 2 * side
    const tilt = 0.4 + 0.6 * (heroPhase + docking)
    group.rotation.y = MathUtils.damp(group.rotation.y, state.spin + tumble + docking * Math.PI * side + cursor.x * 0.55 * tilt, 8, dt)
    group.rotation.x = MathUtils.damp(group.rotation.x, 0.12 - cursor.y * 0.3 * tilt + (1 - flight) * 0.6, 6, dt)
    group.rotation.z = MathUtils.damp(group.rotation.z, -cursor.x * 0.2 * tilt + (1 - flight) * side * 0.8 - side * 0.1 * heroPhase, 6, dt)

    // Hero label under the piece; fades in on landing, out when it heads to the rail.
    const label = labelRef?.current
    if (label) {
      const half = (label.offsetWidth || 120) / 2 + 8
      const lx = MathUtils.clamp(x + state.offset.x, half, W - half)
      const ly = y + state.offset.y + size * 0.52 + 6
      const opacity = clamp01((flight - 0.7) / 0.3) * (1 - clamp01(rail * 3)) * (1 - docking)
      // Hidden labels need no updates (avoids a style recalculation every frame).
      const key = opacity < 0.005 ? 'hidden' : `${lx.toFixed(1)}|${ly.toFixed(1)}|${opacity.toFixed(2)}`
      if (key !== state.labelKey) {
        state.labelKey = key
        label.style.setProperty('transform', `translate3d(${lx.toFixed(1)}px, ${ly.toFixed(1)}px, 0) translate(-50%, 0)`)
        label.style.setProperty('opacity', opacity.toFixed(2))
      }
    }
  })

  return (
    <group ref={ref}>
      {/* centre the model on the group origin so docking/tilting pivot on its middle */}
      <group position={[0, -PIECE_HEIGHT / 2, 0]}>
        <Piece />
      </group>
    </group>
  )
}

/* ── Mark king: the loader's king, which then flies to the wordmark and floats there ── */
function MarkKing({ layoutRef, introRef, loaderRef, reducedMotion }) {
  const ref = useRef(null)

  useFrame(() => {
    const group = ref.current
    const layout = layoutRef.current
    if (!group || !layout.ready) return
    const { W, H, mark } = layout
    const now = performance.now()
    const shownAt = loaderRef.current?.kingShownAt
    const intro = introRef.current

    // Not on screen yet: still loading without WebGL ready, or no wordmark to land on.
    if ((intro == null && shownAt == null) || (intro != null && !mark.ok)) {
      group.visible = false
      return
    }

    const age = (now - (shownAt ?? intro)) / 1000
    const markSize = (mark.h * PIECE_HEIGHT) / 1.47 // model is 1.47 units tall; PIECE_HEIGHT maps to "size"
    const float = reducedMotion ? 0 : Math.sin(age * 1.7) * mark.h * 0.11
    const markX = mark.x
    const markY = mark.y + 0.0444 * markSize + float
    const centreSize = loaderKingSize(H)

    let x = W / 2
    let y = H * 0.48
    let size = centreSize
    let appear = 1
    if (intro != null) {
      if (shownAt == null) {
        // No loader (navigated back to Home): simply grow in at the wordmark.
        appear = 1 - (1 - clamp01((now - intro) / 700)) ** 3
        x = markX
        y = markY
        size = markSize
      } else {
        const flight = easeInOutCubic(clamp01((now - intro) / KING_HANDOFF_MS))
        x = MathUtils.lerp(W / 2, markX, flight)
        y = MathUtils.lerp(H * 0.48, markY, flight) - Math.sin(Math.PI * flight) * H * 0.06
        size = MathUtils.lerp(centreSize, markSize, flight)
      }
    }

    toWorld(layout, x, y, group.position)
    group.scale.setScalar(((size * layout.k) / PIECE_HEIGHT) * appear)
    group.visible = appear > 0

    // Face-on at first (matching the flat loader silhouette), then a slow, endless turn.
    const settle = easeInOutCubic(clamp01(age / 1.5))
    group.rotation.set(
      0.16 * settle + Math.sin(age * 0.7) * 0.03 * settle,
      reducedMotion ? 0 : age * 0.85 * settle,
      Math.sin(age * 0.5) * 0.04 * settle,
    )
  })

  return (
    <group ref={ref} visible={false}>
      <group position={[0, -PIECE_HEIGHT / 2, 0]}>
        <King />
      </group>
    </group>
  )
}

/* ── Cursor tracking (mouse/pen only; touch scrolling must not shove pieces) ── */
function useCursor(reducedMotion) {
  const cursorRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, px: 0, py: 0, active: false })

  useEffect(() => {
    if (reducedMotion) return undefined
    const cursor = cursorRef.current
    const move = (e) => {
      if (e.pointerType === 'touch') return
      cursor.px = e.clientX
      cursor.py = e.clientY
      cursor.tx = (e.clientX / window.innerWidth) * 2 - 1
      cursor.ty = -((e.clientY / window.innerHeight) * 2 - 1)
      cursor.active = true
    }
    const leave = () => {
      cursor.tx = 0
      cursor.ty = 0
      cursor.active = false
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('blur', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('blur', leave)
    }
  }, [reducedMotion])

  return cursorRef
}

function CursorSmoother({ cursorRef }) {
  useFrame((_, delta) => {
    const cursor = cursorRef.current
    const k = 1 - Math.exp(-6 * Math.min(delta, 0.1))
    cursor.x += (cursor.tx - cursor.x) * k
    cursor.y += (cursor.ty - cursor.y) * k
  }, -3)
  return null
}

function Studio() {
  // Local light-former environment: crisp reflections without downloading an HDR.
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={3} position={[0, 5, -2]} scale={[10, 2, 1]} />
      <Lightformer form="rect" intensity={2} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
      <Lightformer form="rect" intensity={1.2} position={[5, 0, 1]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
      <Lightformer form="ring" intensity={2} position={[0, 1, 6]} scale={3} />
    </Environment>
  )
}

export default function Hero3DScene({ wrapperRef, heroStageRef, heroPinRef, dockRefs, labelRefs, skills, introRef, loaderRef, onReady }) {
  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  const [inView, setInView] = useState(true)
  // Always render at the screen's real sharpness (capped at 2x) so the statue never softens.
  const [dpr] = useState(() => Math.min(window.devicePixelRatio || 1, 2))
  const containerRef = useRef(null)
  const cursorRef = useCursor(reducedMotion)
  const layoutRef = useRef(null)
  if (layoutRef.current === null) {
    layoutRef.current = {
      ready: false,
      W: 1,
      H: 1,
      left: 0,
      top: 0,
      k: 0.01,
      mobile: false,
      hero: 0,
      heroRaw: 0,
      statue: { cx: 0, cy: 0, h: 1 },
      mark: { ok: false, x: 0, y: 0, h: 0 },
      docks: skills.map(() => ({ ok: false, x: 0, y: 0, h: 0 })),
    }
  }

  // Render only while the hero + skills experience is on screen.
  useLayoutEffect(() => {
    const element = wrapperRef.current
    if (!element) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [wrapperRef])

  // Render from the shared frame loop (after Lenis has scrolled), only while on screen.
  // Full frame rate while loading, during the intro and while the visitor scrolls or moves
  // the mouse; after 1.5s of stillness the gentle idle motion runs at half rate to save power.
  useEffect(() => {
    if (!inView) return undefined
    let activeUntil = performance.now() + 1500
    let frame = 0
    const wake = () => {
      activeUntil = performance.now() + 1500
    }
    window.addEventListener('scroll', wake, { passive: true })
    window.addEventListener('pointermove', wake, { passive: true })
    const stop = onFrame((time) => {
      frame += 1
      const intro = introRef.current
      const busy = intro == null || time - intro < 4000 || time < activeUntil
      if (busy || frame % 2 === 0) advance(time / 1000)
    })
    return () => {
      stop()
      window.removeEventListener('scroll', wake)
      window.removeEventListener('pointermove', wake)
    }
  }, [inView, introRef])

  return (
    <div className="chess-canvas" ref={containerRef}>
      <Canvas
        dpr={dpr}
        frameloop="never"
        camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', stencil: false }}
        onCreated={({ gl }) => {
          // Checking shader errors makes the main thread wait for every compile — dev only.
          gl.debug.checkShaderErrors = import.meta.env.DEV
        }}
        fallback={<div className="hero-scene-fallback" aria-hidden="true" />}
      >
        <LayoutRig
          layoutRef={layoutRef}
          containerRef={containerRef}
          heroStageRef={heroStageRef}
          heroPinRef={heroPinRef}
          dockRefs={dockRefs}
          reducedMotion={reducedMotion}
        />
        <CursorSmoother cursorRef={cursorRef} />
        <Statue layoutRef={layoutRef} introRef={introRef} reducedMotion={reducedMotion} />
        <MarkKing layoutRef={layoutRef} introRef={introRef} loaderRef={loaderRef} reducedMotion={reducedMotion} />
        {skills.map((skill, index) => (
          <ChessPiece
            key={skill.piece}
            skill={skill}
            index={index}
            count={skills.length}
            layoutRef={layoutRef}
            cursorRef={cursorRef}
            labelRef={labelRefs?.[index]}
            reducedMotion={reducedMotion}
          />
        ))}
        <hemisphereLight args={['#f4f2ec', '#2c2d2a', 0.6]} />
        <directionalLight position={[-4, 6, 5]} intensity={2.4} color="#fff8ee" />
        <directionalLight position={[5, 3, -3]} intensity={1.4} color="#d0ddf0" />
        <Studio />
        <Warmup onReady={onReady} />
      </Canvas>
    </div>
  )
}
