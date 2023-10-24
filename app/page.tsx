import Banner from "@/components/Banner";
import BannerStepFive from "@/components/BannerStepFive";
import BannerStepOneTwo from "@/components/BannerStepOneTwo";
import BannerStepThreeFour from "@/components/BannerStepThreeFour";

export default async function Home() {
  return (
    <div>
      <Banner />
      <BannerStepOneTwo />
      <BannerStepThreeFour />
      <BannerStepFive />
    </div>
  )
}
