import { HandHeart, Shield, Clock, Headphones, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { ColoredBrandName } from '@/components/ui/colored-brand-name';
import { useLanguage } from '@/lib/i18n';

const ServiceAgreement = () => {
  const { t, dir } = useLanguage();
  
  const services = [
    {
      title: t('service.app.title'),
      icon: HandHeart,
      content: [
        t('service.app.item1'),
        t('service.app.item2'),
        t('service.app.item3'),
        t('service.app.item4')
      ]
    },
    {
      title: t('service.commitments.title'),
      icon: Shield,
      content: [
        t('service.commitments.item1'),
        t('service.commitments.item2'),
        t('service.commitments.item3'),
        t('service.commitments.item4')
      ]
    },
    {
      title: t('service.user.title'),
      icon: Clock,
      content: [
        t('service.user.item1'),
        t('service.user.item2'),
        t('service.user.item3'),
        t('service.user.item4')
      ]
    },
    {
      title: t('service.support.title'),
      icon: Headphones,
      content: [
        t('service.support.item1'),
        t('service.support.item2'),
        t('service.support.item3'),
        t('service.support.item4')
      ]
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/60 shadow-2xl text-center">
            <HandHeart className="h-20 w-20 text-mindgrow-primary mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              {t('service.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-medium leading-relaxed max-w-3xl mx-auto">
              {t('service.subtitle')}
            </p>
            <p className="text-lg text-gray-500 font-medium">
              {t('service.last.updated')}
            </p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className={`flex items-center mb-6 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                    <div className={`bg-mindgrow-orange text-white w-12 h-12 rounded-xl flex items-center justify-center ${dir === 'rtl' ? 'ml-4' : 'mr-4'}`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">{service.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {service.content.map((item, idx) => (
                      <li key={idx} className={`flex items-start space-y-0 ${dir === 'rtl' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                        <div className={`bg-mindgrow-green text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mt-1 flex-shrink-0 ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`}>✓</div>
                        <span className="text-gray-600 font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Service Level Agreement */}
      <section className="py-16" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <AlertCircle className="h-16 w-16 text-mindgrow-orange mx-auto mb-4" />
                <h2 className="text-3xl font-black text-gray-900 mb-4">{t('service.sla.title')}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-4">{t('service.operation.title')}</h3>
                  <ul className="space-y-3">
                    <li className={`flex items-center ${dir === 'rtl' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className={`bg-mindgrow-green text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`}>✓</div>
                      <span className="text-gray-600 font-medium">{t('service.operation.item1')}</span>
                    </li>
                    <li className={`flex items-center ${dir === 'rtl' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className={`bg-mindgrow-green text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`}>✓</div>
                      <span className="text-gray-600 font-medium">{t('service.operation.item2')}</span>
                    </li>
                    <li className={`flex items-center ${dir === 'rtl' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className={`bg-mindgrow-green text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`}>✓</div>
                      <span className="text-gray-600 font-medium">{t('service.operation.item3')}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-4">{t('service.refund.title')}</h3>
                  <ul className="space-y-3">
                    <li className={`flex items-center ${dir === 'rtl' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className={`bg-mindgrow-blue text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`}>i</div>
                      <span className="text-gray-600 font-medium">{t('service.refund.item1')}</span>
                    </li>
                    <li className={`flex items-center ${dir === 'rtl' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className={`bg-mindgrow-blue text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`}>i</div>
                      <span className="text-gray-600 font-medium">{t('service.refund.item2')}</span>
                    </li>
                    <li className={`flex items-center ${dir === 'rtl' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className={`bg-mindgrow-blue text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`}>i</div>
                      <span className="text-gray-600 font-medium">{t('service.refund.item3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
            <CardContent className="p-8 text-center">
              <Headphones className="h-16 w-16 text-mindgrow-primary mx-auto mb-6" />
              <h2 className="text-3xl font-black text-gray-900 mb-6">{t('service.contact.title')}</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('service.contact.subtitle')}
              </p>
              <div className="text-lg font-bold text-mindgrow-primary">
                service@mindgrow.pro | +974-6601-8814
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServiceAgreement;