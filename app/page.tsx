import { Metadata } from "next";
import Banner from "@/components/home/Banner";
import { HomeInfoType } from "@/lib/types/homeType";
import Link from "next/link";
import { cookies } from "next/headers";
import Plans from "@/components/home/plans/Plans";

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
    throw new Error('Failed to fetch data');
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
          <Link className="fixed right-4 top-4 z-20 rounded-lg bg-secondary px-6 py-4 text-white hover:bg-primary" href="/admin/profile">Tableau de bord</Link>
        ) : (
          <Link className="fixed right-4 top-4 z-20 rounded-lg bg-secondary px-6 py-4 text-white hover:bg-primary" href="/login">Se connecter</Link>
        )
      }
      {homeInfo?.data ? <Banner homeInfo={homeInfo.data} /> : null}
      <Plans />
    </div>
  )
}
