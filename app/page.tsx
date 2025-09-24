import PageViewTracker from "@/components/analytics/PageViewTracker";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import SearchStrip from "@/components/hero/SearchStrip";
import FeaturedDesignersCarousel from "@/components/featured/FeaturedDesignersCarousel";
import HowItWorks from "@/components/howitworks/HowItWorks";
import LeadStrip from "@/components/lead/LeadStrip";
import Testimonials from "@/components/testimonials/Testimonials";
import CaseStudies from "@/components/case-studies/CaseStudies";
import NewsletterSignup from "@/components/newsletter/NewsletterSignup";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <PageViewTracker />
      <Header />
      <Hero />
      <SearchStrip />
      <FeaturedDesignersCarousel />
      <HowItWorks />
      <LeadStrip />
      <Testimonials />
      <CaseStudies />
      <NewsletterSignup />
      <Footer />
    </main>
  );
}
