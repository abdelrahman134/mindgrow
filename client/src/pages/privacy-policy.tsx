import { Shield, Eye, Lock, FileText, Users, Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { ColoredBrandName } from '@/components/ui/colored-brand-name';
import { useLanguage } from '@/lib/i18n';

const PrivacyPolicy = () => {
  const { t, dir } = useLanguage();
  
  const sections = [
    {
      title: t('privacy.collect.title'),
      icon: Database,
      content: [
        t('privacy.collect.item1'),
        t('privacy.collect.item2'),
        t('privacy.collect.item3'),
        t('privacy.collect.item4')
      ]
    },
    {
      title: t('privacy.usage.title'),
      icon: FileText,
      content: [
        t('privacy.usage.item1'),
        t('privacy.usage.item2'),
        t('privacy.usage.item3'),
        t('privacy.usage.item4')
      ]
    },
    {
      title: t('privacy.protection.title'),
      icon: Shield,
      content: [
        t('privacy.protection.item1'),
        t('privacy.protection.item2'),
        t('privacy.protection.item3'),
        t('privacy.protection.item4')
      ]
    },
    {
      title: t('privacy.rights.title'),
      icon: Users,
      content: [
        t('privacy.rights.item1'),
        t('privacy.rights.item2'),
        t('privacy.rights.item3'),
        t('privacy.rights.item4')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/60 shadow-2xl text-center">
            <Lock className="h-20 w-20 text-mindgrow-primary mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              {t('privacy.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-medium leading-relaxed max-w-3xl mx-auto">
              {t('privacy.subtitle')}
            </p>
            <p className="text-lg text-gray-500 font-medium">
              {t('privacy.last.updated')}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-black text-gray-900 mb-6">{t('privacy.intro.title')}</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  {t('privacy.intro.content1')}
                </p>
                <p>
                  {t('privacy.intro.content2')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-16" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className={`flex items-center mb-6 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                    <div className={`bg-mindgrow-primary text-white w-12 h-12 rounded-xl flex items-center justify-center ${dir === 'rtl' ? 'ml-4' : 'mr-4'}`}>
                      <section.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
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

      {/* Contact Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
            <CardContent className="p-8 text-center">
              <Eye className="h-16 w-16 text-mindgrow-orange mx-auto mb-6" />
              <h2 className="text-3xl font-black text-gray-900 mb-6">{t('privacy.contact.title')}</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('privacy.contact.subtitle')}
              </p>
              <div className="text-lg font-bold text-mindgrow-primary">
                privacy@mindgrow.pro | +974-6601-8814
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

export default PrivacyPolicy;