import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import CleaningServices from "@/components/cleaning-services";
import Testimonial from "@/components/testimonial";
import Cta from "@/components/cta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="w-full">
        <HeroSection/>
        <CleaningServices/>
        <Testimonial />
        <Cta />
      </main>
      <Footer/>
    </div>
  );
}
