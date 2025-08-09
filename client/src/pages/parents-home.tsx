import { Users, Target, CreditCard, Shield, Smartphone, BookOpen, Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { ColoredBrandName } from '@/components/ui/colored-brand-name';
import { useLanguage } from '@/lib/i18n';
import { useContent } from '@/hooks/useContent';
import { useButtonLink } from '@/hooks/useButtonLinks';
import { useIcons } from '@/hooks/useIcons';
import parentsHeroImage from '@assets/30 (1)_1751993508938.png';

const ParentsHome = () => {
  const { t, dir, language } = useLanguage();
  const { getContent } = useContent('parents');
  const { getIcon } = useIcons('parents');
  const downloadButton = useButtonLink('parents.hero.download');
  const guideButton = useButtonLink('parents.hero.guide');
  
  const parentFeatures = [
    {
      icon: getIcon('parents.feature.control.icon'),
      title: getContent('parents.feature.create.tasks', t('parents.feature.create.tasks')),
      description: getContent('parents.feature.create.tasks.desc', t('parents.feature.create.tasks.desc')),
      color: 'bg-mindgrow-blue'
    },
    {
      icon: getIcon('parents.feature.monitoring.icon'),
      title: getContent('parents.feature.monitor.safe', t('parents.feature.monitor.safe')),
      description: getContent('parents.feature.monitor.safe.desc', t('parents.feature.monitor.safe.desc')),
      color: 'bg-mindgrow-green'
    },
    {
      icon: getIcon('parents.feature.rewards.icon'),
      title: getContent('parents.feature.wallet.management', t('parents.feature.wallet.management')),
      description: getContent('parents.feature.wallet.management.desc', t('parents.feature.wallet.management.desc')),
      color: 'bg-mindgrow-orange'
    },
    {
      icon: getIcon('parents.feature.education.icon'),
      title: getContent('parents.feature.track.growth', t('parents.feature.track.growth')),
      description: getContent('parents.feature.track.growth.desc', t('parents.feature.track.growth.desc')),
      color: 'bg-mindgrow-pink'
    }
  ];

  const steps = [
    {
      number: '01',
      title: getContent('parents.step.create.account', t('parents.step.create.account')),
      description: getContent('parents.step.create.account.desc', t('parents.step.create.account.desc')),
      icon: getIcon('parents.step.register.icon')
    },
    {
      number: '02',
      title: getContent('parents.step.set.tasks', t('parents.step.set.tasks')),
      description: getContent('parents.step.set.tasks.desc', t('parents.step.set.tasks.desc')),
      icon: getIcon('parents.step.tasks.icon')
    },
    {
      number: '03',
      title: getContent('parents.step.approve.monitoring', t('parents.step.approve.monitoring')),
      description: getContent('parents.step.approve.monitoring.desc', t('parents.step.approve.monitoring.desc')),
      icon: getIcon('parents.step.monitoring.icon')
    },
    {
      number: '04',
      title: getContent('parents.step.release.rewards', t('parents.step.release.rewards')),
      description: getContent('parents.step.release.rewards.desc', t('parents.step.release.rewards.desc')),
      icon: getIcon('parents.step.rewards.icon')
    }
  ];

  const benefits = [
    getContent('parents.benefits.responsibility', t('parents.benefits.responsibility')),
    getContent('parents.benefits.time.money', t('parents.benefits.time.money')),
    getContent('parents.benefits.family.bonds', t('parents.benefits.family.bonds')),
    getContent('parents.benefits.fair.system', t('parents.benefits.fair.system')),
    getContent('parents.benefits.household.participation', t('parents.benefits.household.participation')),
    getContent('parents.benefits.money.value', t('parents.benefits.money.value'))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative z-10 bg-gradient-to-br from-mindgrow-cream via-orange-50 to-yellow-50" dir={dir}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center w-full min-h-screen">
          {/* Image on left for Arabic, right for English */}
          <div className={`${language === 'ar' ? 'order-2 lg:order-1' : 'order-1 lg:order-2'} h-full flex items-center`}>
            <img 
              src={parentsHeroImage} 
              alt={language === 'ar' ? 'عائلة سعيدة تستخدم التطبيق معاً' : 'Happy family using the app together'} 
              className="w-full h-screen object-cover object-center transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Text on right for Arabic, left for English */}
          <div className={`${language === 'ar' ? 'order-1 lg:order-2' : 'order-2 lg:order-1'} px-4 sm:px-8 lg:px-16 py-8 space-y-4 lg:space-y-6 flex flex-col justify-center text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'} h-full`}>
              <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-gray-900 leading-tight">
                {getContent('parents.title', t('parents.title'))}
                <br />
                <ColoredBrandName className="drop-shadow-lg" />
              </h1>
              
              <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700 font-bold leading-relaxed">
                {getContent('parents.hero.subtitle', t('parents.hero.subtitle'))}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  className="bg-gradient-to-r from-mindgrow-primary to-mindgrow-orange text-white px-8 py-4 rounded-full text-lg font-black transform hover:scale-105 transition-all duration-300 shadow-lg"
                  onClick={downloadButton.hasAction ? downloadButton.getButtonAction()?.action : undefined}
                  disabled={downloadButton.isLoading || !downloadButton.hasAction}
                >
                  <Smartphone className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-6 w-6`} />
                  {getContent('parents.hero.download', t('parents.hero.download'))}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-3 border-mindgrow-primary text-mindgrow-primary px-8 py-4 rounded-full text-lg font-black hover:bg-mindgrow-primary hover:text-white transition-all duration-300"
                  onClick={guideButton.hasAction ? guideButton.getButtonAction()?.action : undefined}
                  disabled={guideButton.isLoading || !guideButton.hasAction}
                >
                  <BookOpen className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-6 w-6`} />
                  {getContent('parents.hero.guide', t('parents.hero.guide'))}
                </Button>
              </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16" dir={dir}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('parents.features.title', t('parents.features.title'))}
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('parents.features.subtitle', t('parents.features.subtitle'))}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {parentFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                <CardContent className="p-8">
                  <div className={`flex items-start ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
                    <div className={`${feature.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 font-medium text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('parents.steps.title', t('parents.steps.title'))} <ColoredBrandName />؟
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('parents.steps.subtitle', language === 'ar' ? 'أربع خطوات بسيطة لبدء رحلة تعليم المسؤولية' : 'Four simple steps to start the responsibility learning journey')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className="bg-mindgrow-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg">
                    {step.number}
                  </div>
                  <step.icon className="h-12 w-12 text-mindgrow-orange mx-auto mb-4" />
                  <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 font-medium">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-mindgrow-green/5 via-mindgrow-blue/5 to-mindgrow-pink/5" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('parents.benefits.title', t('parents.benefits.title'))} <ColoredBrandName />
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('parents.benefits.subtitle', language === 'ar' ? 'استثمر في مستقبل طفلك وساعده على بناء شخصية مسؤولة' : 'Invest in your child\'s future and help them build a responsible personality')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-mindgrow-green text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-bold text-lg leading-relaxed">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-16 bg-gradient-to-r from-mindgrow-blue to-mindgrow-green text-white" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-20 w-20 mx-auto mb-6" />
          <h2 className="text-4xl font-black mb-6">
            {getContent('parents.safety.title', t('parents.safety.title'))}
          </h2>
          <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
            {getContent('parents.safety.subtitle', t('parents.safety.subtitle'))}
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-black mb-3">{getContent('parents.safety.encryption.title', t('parents.safety.encryption.title'))}</h3>
              <p>{getContent('parents.safety.encryption.desc', t('parents.safety.encryption.desc'))}</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-black mb-3">{getContent('parents.safety.privacy.title', t('parents.safety.privacy.title'))}</h3>
              <p>{getContent('parents.safety.privacy.desc', t('parents.safety.privacy.desc'))}</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-black mb-3">{getContent('parents.safety.transactions.title', t('parents.safety.transactions.title'))}</h3>
              <p>{getContent('parents.safety.transactions.desc', t('parents.safety.transactions.desc'))}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ParentsHome;