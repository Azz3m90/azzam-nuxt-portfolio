const PROJECT_DIR = '/images/projects/'

/** Same slug rule as scripts/build-project-images.mjs. */
const slugOf = (src: string) => src
  .slice(PROJECT_DIR.length)
  .replace(/\.[^.]+$/, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

/**
 * Responsive sources for a project screenshot, pre-built by `npm run images:projects`.
 * Anything outside /images/projects/ is returned untouched.
 */
export function projectImage(src: string) {
  if (!src.startsWith(PROJECT_DIR)) return { src, srcset: undefined, og: src }
  const base = `${PROJECT_DIR}opt/${slugOf(src)}`
  return {
    src: `${base}-1280.webp`,
    srcset: `${base}-640.webp 640w, ${base}-1280.webp 1280w`,
    og: `${base}-og.jpg`,
  }
}
