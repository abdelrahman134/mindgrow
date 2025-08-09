import { Store, Package, TrendingUp, CreditCard, Users, ShoppingCart, Award, BarChart3, Gamepad2, BookOpen, PenTool, Shirt, Dumbbell, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { ColoredBrandName } from '@/components/ui/colored-brand-name';
import { useLanguage } from '@/lib/i18n';
import { useContent } from '@/hooks/useContent';
import { useIcons } from '@/hooks/useIcons';
import { useButtonLink } from '@/hooks/useButtonLinks';
import sellersImage from '@assets/256_1751997163939.png';

const SellersHome = () => {
  const { t, dir, language } = useLanguage();
  const { getContent } = useContent('sellers');
  const { getIcon } = useIcons('sellers');
  const joinButton = useButtonLink('sellers.hero.join');
  const partnershipsButton = useButtonLink('sellers.hero.partnerships');
  
  const sellerFeatures = [
    {
      icon: getIcon('sellers.feature.products.icon'),
      title: getContent('sellers.feature.product.management', t('sellers.feature.product.management')),
      description: getContent('sellers.feature.product.management.desc', t('sellers.feature.product.management.desc')),
      color: 'bg-mindgrow-blue'
    },
    {
      icon: getIcon('sellers.feature.orders.icon'),
      title: getContent('sellers.feature.order.tracking', t('sellers.feature.order.tracking')),
      description: getContent('sellers.feature.order.tracking.desc', t('sellers.feature.order.tracking.desc')),
      color: 'bg-mindgrow-green'
    },
    {
      icon: getIcon('sellers.feature.payments.icon'),
      title: getContent('sellers.feature.payment.management', t('sellers.feature.payment.management')),
      description: getContent('sellers.feature.payment.management.desc', t('sellers.feature.payment.management.desc')),
      color: 'bg-mindgrow-orange'
    },
    {
      icon: getIcon('sellers.feature.analytics.icon'),
      title: getContent('sellers.feature.sales.reports', t('sellers.feature.sales.reports')),
      description: getContent('sellers.feature.sales.reports.desc', t('sellers.feature.sales.reports.desc')),
      color: 'bg-mindgrow-pink'
    }
  ];

  const steps = [
    {
      number: '01',
      title: getContent('sellers.step.register.approval', t('sellers.step.register.approval')),
      description: getContent('sellers.step.register.approval.desc', t('sellers.step.register.approval.desc')),
      icon: getIcon('sellers.step.registration.icon')
    },
    {
      number: '02',
      title: getContent('sellers.step.add.products', t('sellers.step.add.products')),
      description: getContent('sellers.step.add.products.desc', t('sellers.step.add.products.desc')),
      icon: getIcon('sellers.step.inventory.icon')
    },
    {
      number: '03',
      title: getContent('sellers.step.receive.orders', t('sellers.step.receive.orders')),
      description: getContent('sellers.step.receive.orders.desc', t('sellers.step.receive.orders.desc')),
      icon: getIcon('sellers.step.sales.icon')
    },
    {
      number: '04',
      title: getContent('sellers.step.earn.profits', t('sellers.step.earn.profits')),
      description: getContent('sellers.step.earn.profits.desc', t('sellers.step.earn.profits.desc')),
      icon: getIcon('sellers.step.profits.icon')
    }
  ];

  const benefits = [
    getContent('sellers.benefit.new.customers', t('sellers.benefit.new.customers')),
    getContent('sellers.benefit.secure.payment', t('sellers.benefit.secure.payment')),
    getContent('sellers.benefit.specialized.platform', t('sellers.benefit.specialized.platform')),
    getContent('sellers.benefit.detailed.reports', t('sellers.benefit.detailed.reports')),
    getContent('sellers.benefit.technical.support', t('sellers.benefit.technical.support')),
    getContent('sellers.benefit.competitive.commission', t('sellers.benefit.competitive.commission'))
  ];

  const productCategories = [
    { name: getContent('sellers.category.educational.toys', t('sellers.category.educational.toys')), icon: Gamepad2, description: getContent('sellers.category.educational.toys.desc', t('sellers.category.educational.toys.desc')), color: 'bg-mindgrow-blue' },
    { name: getContent('sellers.category.books.stories', t('sellers.category.books.stories')), icon: BookOpen, description: getContent('sellers.category.books.stories.desc', t('sellers.category.books.stories.desc')), color: 'bg-mindgrow-green' },
    { name: getContent('sellers.category.school.supplies', t('sellers.category.school.supplies')), icon: PenTool, description: getContent('sellers.category.school.supplies.desc', t('sellers.category.school.supplies.desc')), color: 'bg-mindgrow-orange' },
    { name: getContent('sellers.category.clothing', t('sellers.category.clothing')), icon: Shirt, description: getContent('sellers.category.clothing.desc', t('sellers.category.clothing.desc')), color: 'bg-mindgrow-pink' },
    { name: getContent('sellers.category.sports.toys', t('sellers.category.sports.toys')), icon: Dumbbell, description: getContent('sellers.category.sports.toys.desc', t('sellers.category.sports.toys.desc')), color: 'bg-mindgrow-purple' },
    { name: getContent('sellers.category.arts.crafts', t('sellers.category.arts.crafts')), icon: Palette, description: getContent('sellers.category.arts.crafts.desc', t('sellers.category.arts.crafts.desc')), color: 'bg-mindgrow-yellow' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative z-10 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" dir={dir}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center w-full min-h-screen">
          {/* Image on left for Arabic, right for English */}
          <div className={`${language === 'ar' ? 'order-2 lg:order-1' : 'order-1 lg:order-2'} h-full flex items-center`}>
            <img 
              src={sellersImage}
              alt={language === 'ar' ? 'أطفال يستخدمون التطبيق' : 'Children using the app'} 
              className="w-full h-screen object-cover object-center transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Text on right for Arabic, left for English */}
          <div className={`${language === 'ar' ? 'order-1 lg:order-2' : 'order-2 lg:order-1'} px-4 sm:px-8 lg:px-16 py-8 space-y-4 lg:space-y-6 flex flex-col justify-center text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'} h-full`}>
              <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-gray-900 leading-tight">
                {getContent('sellers.title', t('sellers.title'))}
                <br />
                <ColoredBrandName className="drop-shadow-lg" />
              </h1>
              
              <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700 font-bold leading-relaxed">
                {getContent('sellers.subtitle', t('sellers.subtitle'))}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  className="bg-gradient-to-r from-mindgrow-primary to-mindgrow-orange text-white px-8 py-4 rounded-full text-lg font-black transform hover:scale-105 transition-all duration-300 shadow-lg"
                  onClick={joinButton.hasAction ? joinButton.getButtonAction()?.action : undefined}
                  disabled={joinButton.isLoading || !joinButton.hasAction}
                >
                  <Store className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-6 w-6`} />
                  {getContent('sellers.hero.join', t('sellers.hero.join'))}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-3 border-mindgrow-primary text-mindgrow-primary px-8 py-4 rounded-full text-lg font-black hover:bg-mindgrow-primary hover:text-white transition-all duration-300"
                  onClick={partnershipsButton.hasAction ? partnershipsButton.getButtonAction()?.action : undefined}
                  disabled={partnershipsButton.isLoading || !partnershipsButton.hasAction}
                >
                  {getContent('sellers.hero.terms', t('sellers.hero.terms'))}
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
              {getContent('sellers.features.title', t('sellers.features.title'))}
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('sellers.features.subtitle', t('sellers.features.subtitle'))}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {sellerFeatures.map((feature, index) => (
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

      {/* How it Works for Sellers */}
      <section className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('sellers.steps.title', t('sellers.steps.title'))} <ColoredBrandName />؟
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('sellers.steps.subtitle', t('sellers.steps.subtitle'))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className="bg-mindgrow-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg">
                    {step.number}
                  </div>
                  <step.icon className="h-12 w-12 text-mindgrow-primary mx-auto mb-4" />
                  <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 font-medium">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('sellers.categories.title', t('sellers.categories.title'))}
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('sellers.categories.subtitle', t('sellers.categories.subtitle'))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((category, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className={`${category.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-125 transition-transform duration-300 shadow-lg`}>
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4">{category.name}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('sellers.benefits.title', t('sellers.benefits.title'))} <ColoredBrandName />؟
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('sellers.benefits.subtitle', t('sellers.benefits.subtitle'))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-mindgrow-orange text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-bold text-lg leading-relaxed">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-gradient-to-r from-mindgrow-orange to-mindgrow-primary text-white" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="h-20 w-20 mx-auto mb-6" />
          <h2 className="text-4xl font-black mb-6">
            {getContent('sellers.success.title', t('sellers.success.title'))}
          </h2>
          <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
            {getContent('sellers.success.subtitle', t('sellers.success.subtitle'))}
          </p>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-3xl font-black mb-2">50+</h3>
              <p className="font-bold">{getContent('sellers.stats.active.sellers', t('sellers.stats.active.sellers'))}</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-3xl font-black mb-2">1000+</h3>
              <p className="font-bold">{getContent('sellers.stats.products.available', t('sellers.stats.products.available'))}</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-3xl font-black mb-2">95%</h3>
              <p className="font-bold">{getContent('sellers.stats.customer.satisfaction', t('sellers.stats.customer.satisfaction'))}</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-3xl font-black mb-2">24/7</h3>
              <p className="font-bold">{getContent('sellers.stats.technical.support', t('sellers.stats.technical.support'))}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('sellers.requirements.title', t('sellers.requirements.title'))}
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('sellers.requirements.subtitle', t('sellers.requirements.subtitle'))}
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-6">{getContent('sellers.requirements.documents', t('sellers.requirements.documents'))}</h3>
                  <ul className="space-y-4 text-lg">
                    <li className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className="bg-mindgrow-green text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">✓</div>
                      <span>{getContent('sellers.requirements.commercial.register', t('sellers.requirements.commercial.register'))}</span>
                    </li>
                    <li className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className="bg-mindgrow-green text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">✓</div>
                      <span>{getContent('sellers.requirements.national.id', t('sellers.requirements.national.id'))}</span>
                    </li>
                    <li className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className="bg-mindgrow-green text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">✓</div>
                      <span>{getContent('sellers.requirements.bank.info', t('sellers.requirements.bank.info'))}</span>
                    </li>
                    <li className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className="bg-mindgrow-green text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">✓</div>
                      <span>{getContent('sellers.requirements.product.photos', t('sellers.requirements.product.photos'))}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-6">{getContent('sellers.requirements.conditions', t('sellers.requirements.conditions'))}</h3>
                  <ul className="space-y-4 text-lg">
                    <li className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className="bg-mindgrow-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">!</div>
                      <span>{getContent('sellers.requirements.safe.products', t('sellers.requirements.safe.products'))}</span>
                    </li>
                    <li className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className="bg-mindgrow-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">!</div>
                      <span>{getContent('sellers.requirements.quality.standards', t('sellers.requirements.quality.standards'))}</span>
                    </li>
                    <li className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className="bg-mindgrow-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">!</div>
                      <span>{getContent('sellers.requirements.customer.service', t('sellers.requirements.customer.service'))}</span>
                    </li>
                    <li className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                      <div className="bg-mindgrow-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">!</div>
                      <span>{getContent('sellers.requirements.fast.shipping', t('sellers.requirements.fast.shipping'))}</span>
                    </li>
                  </ul>
                </div>
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

export default SellersHome;