import Navigation from '@/components/layout/navigation';
import Hero from '@/components/sections/hero';
import FeaturesOverview from '@/components/sections/features-overview';
import DetailedFeatures from '@/components/sections/detailed-features';
import TechnologyStack from '@/components/sections/technology-stack';
import TrustIndicators from '@/components/sections/trust-indicators';
import ContactForm from '@/components/sections/contact-form';
import Footer from '@/components/layout/footer';
import ScrollToTop from '@/components/ui/scroll-to-top';

const ParentsHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturesOverview />
      <DetailedFeatures />
      <TechnologyStack />
      <TrustIndicators />
      <ContactForm />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ParentsHome;
