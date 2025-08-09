import { Rocket, PlayCircle, Star, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoTransparent from '@assets/new size logo_1751827571798.png';
import { ColoredBrandName } from '@/components/ui/colored-brand-name';
import { useContent } from '@/hooks/useContent';

const Hero = () => {
  const { getContent } = useContent('home');
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-24 overflow-hidden" dir="rtl">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-mindgrow-yellow/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-mindgrow-blue/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-mindgrow-pink/20 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={logoTransparent} 
              alt="MindGrow Logo" 
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain" 
            />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            <ColoredBrandName />
            <br />
            <span className="text-3xl lg:text-4xl text-gray-600 font-bold">
              {getContent('hero.title', 'تطبيق المهام والمكافآت للأطفال')}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
            {getContent('hero.subtitle', 'نظام متكامل يعزز حس المسؤولية لدى الأطفال من خلال مهام تفاعلية ونظام مكافآت مالي ذكي')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              className="bg-gradient-to-r from-mindgrow-pink to-mindgrow-orange text-white px-10 py-6 rounded-full text-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection('#contact')}
            >
              <Rocket className="ml-2 h-6 w-6" />
              {getContent('hero.cta_primary', 'ابدأ مشروعك الآن')}
            </Button>
            <Button 
              variant="outline"
              className="border-3 border-mindgrow-blue text-mindgrow-blue px-10 py-6 rounded-full text-xl font-bold hover:bg-mindgrow-blue hover:text-white transition-all duration-300"
              onClick={() => scrollToSection('#features')}
            >
              <PlayCircle className="ml-2 h-6 w-6" />
              {getContent('hero.cta_secondary', 'استكشف المميزات')}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-mindgrow-green/20">
              <div className="text-4xl font-black text-mindgrow-green mb-2">
                {getContent('hero.stat1_number', '3')}
              </div>
              <div className="text-lg text-gray-600 font-semibold">
                {getContent('hero.stat1_text', 'تطبيقات متكاملة')}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-mindgrow-blue/20">
              <div className="text-4xl font-black text-mindgrow-blue mb-2 flex items-center justify-center">
                {getContent('hero.stat2_number', '100%')}
                <Sparkles className="h-6 w-6 ml-1" />
              </div>
              <div className="text-lg text-gray-600 font-semibold">
                {getContent('hero.stat2_text', 'آمن ومضمون')}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-mindgrow-orange/20">
              <div className="text-4xl font-black text-mindgrow-orange mb-2">
                {getContent('hero.stat3_number', '24/7')}
              </div>
              <div className="text-lg text-gray-600 font-semibold">
                {getContent('hero.stat3_text', 'دعم فني')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
