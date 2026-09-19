import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { InspirationBand } from "@/components/home/InspirationBand";
import { ShowroomBand } from "@/components/home/ShowroomBand";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Saleem Traders | Tiles, Sanitaryware & Fittings for Better Spaces",
  description:
    "Shop tiles, sanitaryware, kitchen fittings and bathroom accessories thoughtfully selected for Pakistani homes and projects. Request a quote or visit our showroom."
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <CategoryGrid />
      <FeaturedProducts />
      <InspirationBand />
      <ShowroomBand />
      <NewsletterSection />
    </>
  );
}
