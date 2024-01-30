import { FormatsType } from "@/lib/types";
import { HomeInfoType } from "@/lib/types/homeType";
import { formatCurrency } from "@/lib/utils";
import { cookies } from "next/headers";
import Image from "next/image"
import Link from "next/link";

export default function Banner({ homeInfo }: { homeInfo: HomeInfoType }) {
  const environment = process.env.NODE_ENV;
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''
  const { attributes: { title, subtitle, slogan, slogan_bis, slogan_ter, home_banner_photo, price } } = homeInfo;

  const formats: FormatsType = home_banner_photo?.data?.attributes?.formats || {};
  const sizeOrder = ['large', 'medium', 'small', 'thumbnail'];

  const findFirstFormat = (): { url: string; name: string } => {
    for (const size of sizeOrder) {
      if (formats[size]) {
        return { url: formats[size]?.url || '', name: formats[size]?.name || '' };
      }
    }
    return { url: '', name: 'banner' };
  };

  const pictureInfo = findFirstFormat();
  const picture = pictureInfo.url ? (environment === 'production' ? pictureInfo.url : `${STRAPI_URL}${pictureInfo.url}`) : '/no_image.png';
  const pictureName = pictureInfo.name;

  return (
    <section className="relative w-full">
      <div className="relative h-full flex items-center justify-center">
        <Image
          src={picture}
          alt={pictureName}
          style={{
            objectFit: "cover",
          }}
          fill
          priority
          sizes="100vw"
          quality={100}
          placeholder="blur"
          blurDataURL={picture}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        <div className="z-10 px-6 py-16 text-center text-white">
          <h1 className="text-8xl font-bold text-primary mb-6 italic"> {title} </h1>
          <p className="text-4xl mb-4 font-bold"> {subtitle} </p>
          <p className="text-6xl mb-4 font-bold text-yellow-400"> {formatCurrency(price)} <span className="text-2xl text-white ml-2">/ mois</span> </p>
          <p className="text-xl"> {slogan} </p>
          <p className="text-xl"> {slogan_bis} </p>
          <p className="text-xl">Et <span className="italic font-bold underline underline-offset-4 tracking-widest text-2xl"> {title}</span> {slogan_ter} </p>
          {
            !token ? (
              <div>
                <div className="flex justify-center items-center gap-4 mt-4">
                  <Link
                    href="/register"
                    className="flex w-1/2 justify-center rounded-md text-lg bg-secondary py-1.5 leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                  >
                    Je me lance
                  </Link>
                </div>
                <p className="mt-12"> Vous êtes déjà client ? <Link href="/login" className="ml-6 underline underline-offset-2 hover:text-secondary border-2 border-secondary rounded-lg p-4">Connectez vous</Link></p>
              </div>
            ) : null
          }
        </div>
      </div>
    </section>
  )
}