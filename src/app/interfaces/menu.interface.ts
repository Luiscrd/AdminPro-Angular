export interface Menu {
  title: string,
  icon: string,
  submenu: Submenu[]
}

export interface Submenu {
  title: string,
  url: string
}
