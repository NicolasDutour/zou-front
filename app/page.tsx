// import BannerWithImage from "@/components/home/BannerWithImage";
import Faqs from "@/components/faqs/Faqs";
import Plans from "@/components/plans/Plans";
import Banner from "@/components/home/Banner";
// import Services from "@/components/home/services/Services";

// export async function generateMetadata(): Promise<Metadata> {
//   const homeInfo: { data: HomeInfoType } = await getHomeData()
//   const { attributes: { title, subtitle } } = homeInfo.data

//   return {
//     title,
//     description: subtitle,
//     alternates: {
//       canonical: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
//     },
//     openGraph: {
//       title,
//       description: subtitle,
//       type: 'website',
//       url: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description: subtitle
//     }
//   }
// }

// async function getHomeData() {
//   const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
//   const url = `${STRAPI_URL}/api/home?&populate[home_banner_photo][populate]=*`;

//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   })
//   if (!response.ok) {
//     console.error('Failed to fetch data')
//     throw new Error('Failed to fetch data');
//   }
//   return response.json()
// }

export default async function HomePage() {
  // const homeInfo: { data: HomeInfoType } = await getHomeData()

  return (
    <div className="relative">
      {/* {homeInfo?.data ? <BannerWithImage homeInfo={homeInfo.data} /> : null} */}
      {/* <Services /> */}
      <Banner />
      <Plans />
      <Faqs />
    </div>
  )
}
