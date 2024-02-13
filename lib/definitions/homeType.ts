import React from "react"

export type HomeInfoType = {
  id: number
  attributes: {
    title: string
    subtitle: string
    slogan: string
    slogan_bis: string
    slogan_ter: string
    description: string
    time: number
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

// export type ServiceType = {
//   id: number
//   attributes: {
//     title: string
//     description: string
//     photo: {
//       data: {
//         attributes: {
//           formats: {
//             thumbnail: {
//               name: string
//               url: string
//             }
//             small: {
//               name: string
//               url: string
//             }
//             medium: {
//               name: string
//               url: string
//             }
//             large: {
//               name: string
//               url: string
//             }
//           }
//         }
//       }
//     }
//   }
// }