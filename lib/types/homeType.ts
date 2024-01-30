export type HomeInfoType = {
  id: number
  attributes: {
    title: string
    subtitle: string
    slogan: string
    slogan_bis: string
    slogan_ter: string
    description: string
    price: number
    home_banner_photo: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              name: string
              url: string
            }
            small: {
              name: string
              url: string
            }
            medium: {
              name: string
              url: string
            }
            large: {
              name: string
              url: string
            }
          }
        }
      }
    }
  }
}

export type PlanType = {
  id: number,
  attributes: {
    title: string
    description: string
    price: number
    access?: string
    wedoforyou?: string,
    youmanage?: string
  }
}

export type StepType = {
  title: string
  description?: string
  time?: number
  icon?: React.ReactElement
  price?: number
  option?: boolean
  actionButton?: string
}

export type ServiceType = {
  id: number
  attributes: {
    title: string
    description: string
    photo: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              name: string
              url: string
            }
            small: {
              name: string
              url: string
            }
            medium: {
              name: string
              url: string
            }
            large: {
              name: string
              url: string
            }
          }
        }
      }
    }
  }
}