import Banner from "@/components/Banner";
import Services from "@/components/Services";
import Plans from "@/components/Plans";
import Steps from "@/components/Steps";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const homeInfo = await getDataHome()
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

async function getDataHome() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  const homeInfo = await getDataHome()

  return (
    <div>
      {homeInfo?.data ? <Banner homeInfo={homeInfo.data} /> : null}
      <Services />
      <Steps />
      <Plans />
    </div>
  )
}
