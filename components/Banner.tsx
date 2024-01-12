import { HomeInfoType } from "@/lib/types";
import Image from "next/image"


export default function Banner({ homeInfo }: { homeInfo: HomeInfoType }) {
  const { attributes: { title, subtitle, slogan, slogan_bis, slogan_ter, home_banner_photo } } = homeInfo
  const environment = process.env.NODE_ENV

  console.log("home_banner_photo", home_banner_photo);

  let picture: string
  let pictureName
  if (home_banner_photo?.data?.attributes?.formats) {
    if (home_banner_photo?.data?.attributes?.formats?.large) {
      picture = home_banner_photo?.data?.attributes?.formats?.large.url;
      pictureName = home_banner_photo?.data?.attributes?.formats?.large.name;
    } else if (home_banner_photo?.data?.attributes?.formats?.medium) {
      picture = home_banner_photo?.data?.attributes?.formats?.medium.url;
      pictureName = home_banner_photo?.data?.attributes?.formats?.medium.name;
    } else if (home_banner_photo?.data?.attributes?.formats?.small) {
      picture = home_banner_photo?.data?.attributes?.formats?.small.url;
      pictureName = home_banner_photo?.data?.attributes?.formats?.small.name;
    } else if (home_banner_photo?.data?.attributes?.formats?.thumbnail) {
      picture = home_banner_photo?.data?.attributes?.formats?.thumbnail.url;
      pictureName = home_banner_photo?.data?.attributes?.formats?.thumbnail.name;
    }
  }

  const getImage = () => {
    if (picture) {
      console.log("picture", picture);

      if (environment === 'production') {
        return picture
      }
      return `${process.env.NEXT_PUBLIC_STRAPI_URL}${picture}`
    }
    return ''
  }

  return (
    <section className="relative w-full">
      <div className="relative h-full flex items-center justify-center">
        <Image
          src={getImage()}
          alt={pictureName || 'banner'}
          style={{
            objectFit: "cover",
          }}
          fill
          priority
          sizes="100vw"
          quality={100}
          placeholder="blur"
          blurDataURL={getImage()}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black opacity-70 z-1"></div>
        <div className="z-10 p-20 text-center text-white">
          <h1 className="text-8xl font-bold text-primary mb-6 italic"> {title} </h1>
          <p className="text-4xl mb-4 font-bold"> {subtitle} </p>
          <p className="text-xl"> {slogan} </p>
          <p className="text-xl"> {slogan_bis} </p>
          <p className="text-xl">Et <span className="italic font-bold underline underline-offset-4 tracking-widest text-2xl"> {title}</span> {slogan_ter} </p>
        </div>
      </div>
    </section>



  )
}