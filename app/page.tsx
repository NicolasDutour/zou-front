import { Metadata } from "next";
import Banner from "@/components/home/Banner";
// import Services from "@/components/home/services/Services";
import Steps from "@/components/home/steps/Steps";
import Plans from "@/components/home/plans/Plans";
import { HomeInfoType } from "@/lib/types/homeType";
import Link from "next/link";
import { cookies } from "next/headers";
import { GoSignOut } from "react-icons/go";
import { LogoutButton } from "@/components/home/LogoutButton";

export async function generateMetadata(): Promise<Metadata> {
  const homeInfo: { data: HomeInfoType } = await getHomeData()
  const { attributes: { title, subtitle } } = homeInfo.data

  return {
    title,
    description: subtitle,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
    },
    openGraph: {
      title,
      description: subtitle,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: subtitle
    }
  }
}

async function getHomeData() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/home?&populate[home_banner_photo][populate]=*`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!response.ok) {
    console.error('Failed to fetch data')
  }
  return response.json()
}

export default async function HomePage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const homeInfo: { data: HomeInfoType } = await getHomeData()

  return (
    <div className="relative">
      {
        token ? (
          <Link className="fixed top-4 right-4 z-20 bg-secondary hover:bg-primary text-white rounded-lg px-6 py-4" href="/admin/profile">Tableau de bord</Link>
        ) : (
          <Link className="fixed top-4 right-4 bg-secondary hover:bg-primary text-white rounded-lg px-6 py-4 z-20" href="/login">Se connecter</Link>
        )
      }
      {homeInfo?.data ? <Banner homeInfo={homeInfo.data} /> : null}
      {/* <Services /> */}
      <Steps />
      {/* <Plans /> */}
    </div>
  )
}
