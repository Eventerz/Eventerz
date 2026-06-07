import Hero from "@/components/landing/hero";
import ProblemSection from "@/components/landing/problem-section";
import FeaturesSection from "@/components/landing/features-section";
import HowItWorks from "@/components/landing/how-it-works";
import WhySolana from "@/components/landing/why-solana";
import CategoriesSection from "@/components/landing/categories-section";
import FeaturedEvents from "@/components/landing/featured-events";
import FAQSection from "@/components/landing/faq-section";

export default function Home() {
  return (
    <div className="flex flex-col flex-grow">
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <WhySolana />
      <CategoriesSection />
      <FeaturedEvents />
      <FAQSection />
    </div>
  );
}
