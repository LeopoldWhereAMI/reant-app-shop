import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import PopularTools from "@/components/PopularTools/PopularTools";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import CallToAction from "@/components/CallToAction/CallToAction";

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
