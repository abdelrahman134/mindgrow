import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { ColoredBrandName } from '@/components/ui/colored-brand-name';
import { useLanguage } from '@/lib/i18n';

const TermsOfService = () => {
  const { t, dir } = useLanguage();
  
  const terms = [
    {
      title: t('terms.accept.title'),
      icon: CheckCircle,
      content: [
        t('terms.accept.item1'),
        t('terms.accept.item2'),
        t('terms.accept.item3'),
        t('terms.accept.item4')
      ]
    },
    {
      title: t('terms.usage.title'),
      icon: Users,
      content: [
        t('terms.usage.item1'),
        t('terms.usage.item2'),
        t('terms.usage.item3'),
        t('terms.usage.item4')
      ]
    },
    {
      title: t('terms.content.title'),
      icon: Scale,
      content: [
        t('terms.content.item1'),
        t('terms.content.item2'),
        t('terms.content.item3'),
        t('terms.content.item4')
      ]
    },
    {
      title: t('terms.payments.title'),
      icon: FileText,
      content: [
        t('terms.payments.item1'),
        t('terms.payments.item2'),
        t('terms.payments.item3'),
        t('terms.payments.item4')
      ]
    }
  ];

  const restrictions = [
    t('terms.restriction.item1'),
    t('terms.restriction.item2'),
    t('terms.restriction.item3'),
    t('terms.restriction.item4'),
    t('terms.restriction.item5'),
    t('terms.restriction.item6')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/60 shadow-2xl text-center">
            <FileText className="h-20 w-20 text-mindgrow-primary mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              {t('terms.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-medium leading-relaxed max-w-3xl mx-auto">
              {t('terms.subtitle')}
            </p>
            <p className="text-lg text-gray-500 font-medium">
              {t('terms.last.updated')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Terms */}
      <section className="py-16" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {terms.map((term, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className={`flex items-center mb-6 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                    <div className={`bg-mindgrow-blue text-white w-12 h-12 rounded-xl flex items-center justify-center ${dir === 'rtl' ? 'ml-4' : 'mr-4'}`}>
                      <term.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">{term.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {term.content.map((item, idx) => (
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

      {/* Restrictions */}
      <section className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <AlertTriangle className="h-16 w-16 text-mindgrow-orange mx-auto mb-4" />
                <h2 className="text-3xl font-black text-gray-900 mb-4">{t('terms.restrictions.title')}</h2>
                <p className="text-xl text-gray-600">
                  {t('terms.restrictions.subtitle')}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {restrictions.map((restriction, index) => (
                  <div key={index} className={`flex items-start ${dir === 'rtl' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                    <XCircle className={`h-6 w-6 text-red-500 mt-1 flex-shrink-0 ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                    <span className="text-gray-700 font-medium leading-relaxed">{restriction}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-16" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
            <CardContent className="p-8 text-center">
              <Scale className="h-16 w-16 text-mindgrow-primary mx-auto mb-6" />
              <h2 className="text-3xl font-black text-gray-900 mb-6">{t('terms.legal.title')}</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  {t('terms.legal.content1')}
                </p>
                <p>
                  {t('terms.legal.content2')}
                </p>
              </div>
              <div className="mt-8 text-lg font-bold text-mindgrow-primary">
                legal@mindgrow.pro | +974-6601-8814
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

export default TermsOfService;