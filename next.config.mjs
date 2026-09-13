/** @type {import('next').NextConfig} */
// Project page: the site is served from https://aakash-kharb.github.io/AakashKharb/,
// so every absolute path needs this prefix. `npm run dev` serves it at the same
// path locally, which keeps dev and production honest about link resolution.
const basePath = '/AakashKharb'

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  // Read by withBasePath() and the image loader, both of which run in the
  // browser where next.config is not available.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // Static export has no optimiser, so a custom loader maps each srcset entry
    // onto a pre-generated file in /public/images. Keep `deviceSizes` in step
    // with VARIANT_WIDTHS in src/lib/imageLoader.ts — 1800 is the original.
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
    deviceSizes: [640, 1080, 1800],
    // All below the smallest slot any image occupies, so these never reach the
    // srcset and no extra variants are needed for them.
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
