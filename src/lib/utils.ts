/*
 * Next prefixes basePath onto its own asset URLs and onto <Link> hrefs, but not
 * onto metadata icon paths or the output of a custom image loader. Anything
 * built by hand has to go through here or it 404s on the project page.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80 // Height of fixed navbar
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
