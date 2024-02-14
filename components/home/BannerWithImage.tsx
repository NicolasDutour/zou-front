// import { FormatsType } from "@/lib/definitions";
// import { cookies } from "next/headers";
// import Image from "next/image"
// import Link from "next/link";

// export default function BannerWithImage({ homeInfo }: { homeInfo: HomeInfoType }) {
//   const environment = process.env.NODE_ENV;
//   const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
//   const cookieStore = cookies()
//   const token = cookieStore.get('token')?.value || ''
//   const { attributes: { title, subtitle, slogan, slogan_bis, slogan_ter, home_banner_photo, time } } = homeInfo;

//   const formats: FormatsType = home_banner_photo?.data?.attributes?.formats || {};
//   const sizeOrder = ['large', 'medium', 'small', 'thumbnail'];

//   const findFirstFormat = (): { url: string; name: string } => {
//     for (const size of sizeOrder) {
//       if (formats[size]) {
//         return { url: formats[size]?.url || '', name: formats[size]?.name || '' };
//       }
//     }
//     return { url: '', name: 'banner' };
//   };

//   const pictureInfo = findFirstFormat();
//   const picture = pictureInfo.url ? (environment === 'production' ? pictureInfo.url : `${STRAPI_URL}${pictureInfo.url}`) : '/no_image.png';
//   const pictureName = pictureInfo.name;

//   return (
//     <section className="relative w-full">
//       <div className="relative flex h-full items-center justify-center">
//         <Image
//           src={picture}
//           alt={pictureName}
//           style={{
//             objectFit: "cover",
//           }}
//           fill
//           priority
//           sizes="100vw"
//           quality={100}
//           placeholder="blur"
//           blurDataURL={picture}
//           className="absolute inset-0 z-0 size-full object-cover"
//         />
//         <div className="absolute inset-0 z-10 bg-black opacity-70"></div>
//         <div className="z-10 px-6 py-16 text-center text-white">
//           <h1 className="mb-6 text-8xl font-bold italic text-yellow-400"> {title} </h1>
//           <h2 className="mb-4 text-4xl font-bold"> {subtitle} <span className="mb-4 text-6xl font-bold text-yellow-400"> {time} <span className="text-2xl text-white"> minutes </span> </span> </h2>
//           <p className="text-xl"> {slogan} </p>
//           <p className="text-xl"> {slogan_bis} </p>
//           <p className="text-xl">Et <span className="text-2xl font-bold italic tracking-widest underline underline-offset-4"> {title}</span> {slogan_ter} </p>
//           {
//             !token ? (
//               <div>
//                 <div className="mt-4 flex items-center justify-center gap-4">
//                   <Link
//                     href="/register"
//                     className="flex w-1/2 justify-center rounded-md bg-blueDarker py-1.5 text-lg leading-6 text-white shadow-sm hover:bg-blueDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueDarker"
//                   >
//                     Je me lance
//                   </Link>
//                 </div>
//                 <div className="mt-12 flex flex-wrap items-center justify-center">
//                   <p>Vous êtes déjà client ?</p>
//                   <Link href="/login" className="rounded-lg border-2 border-blueDarker p-4 underline underline-offset-2 hover:text-blueDarker sm:ml-4">Connectez vous</Link>
//                 </div>
//               </div>
//             ) : null
//           }
//         </div>
//       </div>
//     </section>
//   )
// }