import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PRICING_PACKAGES, ADDITIONAL_SERVICES } from '@/lib/constants';

const Pricing = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getServiceIcon = (icon: string) => {
    // This would normally import actual icons, but for simplicity using text
    const iconMap: Record<string, string> = {
      rocket: '🚀',
      palette: '🎨',
      wrench: '🔧',
      'graduation-cap': '🎓',
    };
    return iconMap[icon] || '⭐';
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            باقات التطوير المرنة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر الباقة التي تناسب احتياجاتك وميزانيتك
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {PRICING_PACKAGES.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`bg-white rounded-2xl shadow-lg p-8 border ${
                pkg.popular ? 'border-2 border-mindgrow-pink relative' : 'border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-mindgrow-pink text-white px-6 py-2 rounded-full text-sm font-semibold">
                  الأكثر شعبية
                </div>
              )}
              <CardContent className="p-0">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6">{pkg.subtitle}</p>
                  <div className={`text-4xl font-bold mb-2 ${
                    pkg.popular ? 'text-mindgrow-pink' : 
                    pkg.id === 'basic' ? 'text-mindgrow-blue' : 'text-mindgrow-orange'
                  }`}>
                    {pkg.price} ريال
                  </div>
                  <p className="text-gray-500">{pkg.duration}</p>
                </div>
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="text-mindgrow-green ml-3 h-5 w-5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className={`w-full py-3 rounded-full font-semibold transition-colors ${
                    pkg.popular 
                      ? 'bg-mindgrow-pink text-white hover:bg-pink-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={scrollToContact}
                >
                  {pkg.popular ? 'ابدأ الآن' : pkg.id === 'enterprise' ? 'تواصل معنا' : 'احصل على عرض سعر'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">خدمات إضافية</h3>
          <div className="grid lg:grid-cols-4 gap-6">
            {ADDITIONAL_SERVICES.map((service, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-xl">
                <div className="text-2xl mb-3">{getServiceIcon(service.icon)}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <div className={`text-lg font-bold ${
                  index === 0 ? 'text-mindgrow-blue' :
                  index === 1 ? 'text-mindgrow-green' :
                  index === 2 ? 'text-mindgrow-orange' : 'text-mindgrow-pink'
                }`}>
                  {service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
