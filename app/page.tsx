import Banner from "@/components/Banner";
import Plans from "@/components/Plans";
import Steps from "@/components/Steps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ted'
}

export default async function Home() {
  return (
    <div>
      <Banner />
      <Steps />
      <Plans />
    </div>
  )
}
