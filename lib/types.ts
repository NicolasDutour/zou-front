export type FormatType = {
  name: string;
  url: string;
}

export type FormatsType = {
  thumbnail?: FormatType;
  small?: FormatType;
  medium?: FormatType;
  large?: FormatType;
  [key: string]: FormatType | undefined; // Index signature to allow dynamic keys
}

export type MenuType = {
  id: number
  attributes: {
    mime: string
    url: string
    name: string
  }
}

export type FileType = {
  attributes: {
    name: string
    url: string
  }
}

export type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
}

export type SidebarNavItemType = {
  href: string
  title: string,
  icon: React.ReactNode
}