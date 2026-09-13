// Developer switch: change to false to hide the Research section and its menu item.
// Rebuild the static site after changing this value.
export const siteConfig = { showResearch: false }

export const navigationItems = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Tools', id: 'skills' },
  { label: 'Roles', id: 'experience' },
  { label: 'Study', id: 'education' },
  { label: 'Work', id: 'projects' },
  ...(siteConfig.showResearch ? [{ label: 'Papers', id: 'research' }] : []),
  { label: 'Talk', id: 'contact' },
]
