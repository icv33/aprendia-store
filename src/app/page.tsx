import Hero from "@/components/home/Hero";
import BestSellers from "@/components/home/BestSellers";
import CategoriesBento from "@/components/home/CategoriesBento";
import Latest from "@/components/home/Latest";
import PullQuote from "@/components/home/PullQuote";
import ContactBand from "@/components/home/ContactBand";
import TrustStrip from "@/components/TrustStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestSellers />
      <CategoriesBento />
      <Latest />
      <PullQuote />
      <ContactBand />
      <TrustStrip />
    </>
  );
}
