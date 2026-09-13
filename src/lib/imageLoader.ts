/*
 * `output: 'export'` means there is no image optimisation server, so next/image
 * previously ran with `unoptimized: true` and every viewport downloaded the full
 * 1800px source. This loader points each srcset candidate at a variant that was
 * generated ahead of time and committed alongside the original:
 *
 *   /images/demo-1.webp  ->  demo-1-640.webp | demo-1-1080.webp | demo-1.webp
 *
 * Widths must stay in sync with `deviceSizes` in next.config.mjs. Anything wider
 * than the largest variant falls through to the original file.
 *
 * A custom loader owns the whole URL, so basePath has to be added here too --
 * Next only prefixes the asset paths it generates itself.
 */
import { withBasePath } from './utils'

const VARIANT_WIDTHS = [640, 1080]

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const variant = VARIANT_WIDTHS.find((candidate) => width <= candidate)
  if (!variant) return withBasePath(src)

  const dot = src.lastIndexOf('.')
  if (dot < 1) return withBasePath(src)

  return withBasePath(`${src.slice(0, dot)}-${variant}${src.slice(dot)}`)
}
