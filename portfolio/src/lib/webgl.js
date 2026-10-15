/*
 * Can this device render the 3D scene well? False when WebGL is missing, when the browser
 * reports a "major performance caveat", or when it falls back to a software renderer
 * (SwiftShader / llvmpipe) — there the scene would hog the CPU, so we show the light version.
 * Add ?force3d to the URL to override (handy for testing).
 */
export function canRender3D() {
  if (typeof window === 'undefined') return false
  if (new URLSearchParams(window.location.search).has('force3d')) return true
  try {
    const canvas = document.createElement('canvas')
    const options = { failIfMajorPerformanceCaveat: true }
    const gl = canvas.getContext('webgl2', options) || canvas.getContext('webgl', options)
    if (!gl) return false
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)
  } catch {
    return false
  }
}
