import CallToAction from "@/components/CallToAction/CallToAction";
import Categories from "@/components/Categories/Categories";
import Hero from "@/components/Hero/Hero";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import PopularTools from "@/components/PopularTools/PopularTools";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <PopularTools />
      <HowItWorks />
      <CallToAction />
    </>
  );
}
