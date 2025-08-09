import { useState, useEffect } from 'react';
import { Star, Gift, Book, Trophy, Gamepad2, Heart, Sparkles, Play, Users, Target, Award, Smile, Zap, ShoppingBag, UserCheck, Brush, BookOpen, Home, Sparkle, PiggyBank, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { Link } from 'wouter';
import heroImage from '@assets/9227069_1751828324959.png';
import mobileHeroImage from '@assets/mobile size_1751960390677.png';
import googlePlayBadge from '@assets/200_1751829516852.png';
import appStoreBadge from '@assets/300_1751829516854.png';
import { ColoredBrandName } from '@/components/ui/colored-brand-name';
import { useLanguage } from '@/lib/i18n';
import { useContent } from '@/hooks/useContent';
import { useIcons } from '@/hooks/useIcons';
import { useButtonLink } from '@/hooks/useButtonLinks';




const ChildrenHome = () => {
  const { t, dir, language } = useLanguage();
  const { getContent } = useContent('home');
  const { getIcon } = useIcons('home');
  const downloadButton = useButtonLink('hero.download');
  const parentsButton = useButtonLink('hero.parents');

  const features = [
    {
      icon: getIcon('main_features.responsibility.icon'),
      title: getContent('mainfeature.tasks.title', t('feature.daily.tasks')),
      description: getContent('mainfeature.tasks.desc', t('feature.daily.tasks.desc')),
      color: 'bg-mindgrow-blue',
      characterIcon: Zap,
      characterBg: 'from-blue-400 to-indigo-500',
      greeting: t('feature.daily.tasks.greeting')
    },
    {
      icon: getIcon('main_features.rewards.icon'),
      title: getContent('mainfeature.rewards.title', t('feature.financial.rewards')),
      description: getContent('mainfeature.rewards.desc', t('feature.financial.rewards.desc')),
      color: 'bg-mindgrow-yellow',
      characterIcon: Award,
      characterBg: 'from-yellow-400 to-orange-500',
      greeting: t('feature.financial.rewards.greeting')
    },
    {
      icon: getIcon('main_features.shopping.icon'),
      title: getContent('mainfeature.store.title', t('feature.shopping.store')),
      description: getContent('mainfeature.store.desc', t('feature.shopping.store.desc')),
      color: 'bg-mindgrow-green',
      characterIcon: ShoppingBag,
      characterBg: 'from-green-400 to-emerald-500',
      greeting: t('feature.shopping.store.greeting')
    },
    {
      icon: getIcon('main_features.family.icon'),
      title: getContent('mainfeature.family.title', t('feature.family.connection')),
      description: getContent('mainfeature.family.desc', t('feature.family.connection.desc')),
      color: 'bg-mindgrow-pink',
      characterIcon: UserCheck,
      characterBg: 'from-pink-400 to-purple-500',
      greeting: t('feature.family.connection.greeting')
    }
  ];

  const activities = [
    { 
      icon: getIcon('activities.daily.icon'), 
      title: getContent('activity.room.title', t('activity.room.cleaning')), 
      description: getContent('activity.room.desc', t('activity.room.cleaning.desc')),
      color: 'bg-mindgrow-blue',
      animatedIcon: Brush,
      character: '🧹',
      action: 'animate-sweep'
    },
    { 
      icon: getIcon('activities.educational.icon'), 
      title: getContent('activity.homework.title', t('activity.homework.reading')), 
      description: getContent('activity.homework.desc', t('activity.homework.reading.desc')),
      color: 'bg-mindgrow-green',
      animatedIcon: BookOpen,
      character: '📚',
      action: 'animate-reading'
    },
    { 
      icon: getIcon('activities.creative.icon'), 
      title: getContent('activity.help.title', t('activity.help.house')), 
      description: getContent('activity.help.desc', t('activity.help.house.desc')),
      color: 'bg-mindgrow-pink',
      animatedIcon: Home,
      character: '🏠',
      action: 'animate-helping'
    },
    { 
      icon: getIcon('activities.physical.icon'), 
      title: getContent('activity.personal.title', t('activity.personal.care')), 
      description: getContent('activity.personal.desc', t('activity.personal.care.desc')),
      color: 'bg-mindgrow-yellow',
      animatedIcon: Sparkle,
      character: '🦷',
      action: 'animate-cleaning'
    },
    { 
      icon: getIcon('activities.saving.icon'), 
      title: getContent('activity.saving.title', t('activity.money.saving')), 
      description: getContent('activity.saving.desc', t('activity.money.saving.desc')),
      color: 'bg-mindgrow-orange',
      animatedIcon: PiggyBank,
      character: '💰',
      action: 'animate-saving'
    },
    { 
      icon: getIcon('activities.shopping.icon'), 
      title: getContent('activity.shopping.title', t('activity.smart.shopping')), 
      description: getContent('activity.shopping.desc', t('activity.smart.shopping.desc')),
      color: 'bg-mindgrow-purple',
      animatedIcon: ShoppingCart,
      character: '🛒',
      action: 'animate-shopping'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large Floating Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-mindgrow-pink/10 rounded-full animate-float-up" />
        <div className="absolute top-32 right-20 w-24 h-24 bg-mindgrow-blue/10 rounded-full animate-float-side" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-mindgrow-green/10 rounded-full animate-scale-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-mindgrow-yellow/10 rounded-full animate-diagonal" style={{ animationDelay: '3s' }} />
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-mindgrow-orange/20 transform rotate-45 animate-rotate-slow" />
        <div className="absolute bottom-1/3 right-20 w-12 h-12 bg-mindgrow-pink/10 transform rotate-45 animate-fade-pulse" />
        
        {/* Small Dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-mindgrow-primary/20 rounded-full animate-fade-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
      {/* Navigation */}
      <Navigation />



      {/* Hero Section - بنر كبير */}
      <section className="relative z-10 overflow-hidden min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100" dir={dir}>
        {/* Hero Specific Decorations - مخفية على الموبايل */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          {/* Floating Lines */}
          <div className="absolute top-1/4 left-1/4 w-3 h-20 bg-gradient-to-b from-mindgrow-primary/30 to-transparent animate-float-up" />
          <div className="absolute top-1/3 right-1/4 w-2 h-16 bg-gradient-to-b from-mindgrow-blue/30 to-transparent animate-float-side" style={{ animationDelay: '1s' }} />
          
          {/* Floating Circles */}
          <div className="absolute bottom-1/3 right-1/3 w-16 h-16 border-2 border-mindgrow-green/20 rounded-full animate-rotate-slow" />
          <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-mindgrow-pink/10 rounded-full animate-scale-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/5 w-8 h-8 bg-mindgrow-yellow/20 rounded-full animate-diagonal" style={{ animationDelay: '3s' }} />
          
          {/* Geometric Shapes */}
          <div className="absolute top-20 right-20 w-10 h-10 border-2 border-mindgrow-orange/20 transform rotate-45 animate-fade-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-20 left-20 w-6 h-6 bg-mindgrow-purple/15 transform rotate-45 animate-float-up" style={{ animationDelay: '0.5s' }} />
          
          {/* Dots */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-mindgrow-primary/20 rounded-full animate-fade-pulse`}
              style={{
                left: `${15 + i * 12}%`,
                top: `${25 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        {/* حاوي للموبايل والتابلت فقط */}
        <div className="lg:hidden container mx-auto px-4 sm:px-6 min-h-screen flex items-center">
          <div className="w-full">
            {/* النص في الأعلى للموبايل والتابلت */}
            <div className="px-4 sm:px-8 py-8 space-y-4 flex flex-col justify-center text-center">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                {getContent('hero.welcome.new', t('hero.welcome'))}
                <br />
                <ColoredBrandName className="drop-shadow-lg" />
              </h1>
              
              <p className="text-base sm:text-lg text-gray-700 font-bold leading-relaxed">
                {getContent('hero.main.message', t('hero.subtitle'))}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-mindgrow-primary hover:bg-mindgrow-primary/90 text-white px-6 py-3 rounded-full font-bold text-base transition-colors duration-300 shadow-lg hover:shadow-xl"
                  onClick={downloadButton.hasAction ? downloadButton.getButtonAction()?.action : undefined}
                  disabled={downloadButton.isLoading || !downloadButton.hasAction}
                >
                  {getContent('hero.cta.start', t('hero.cta.start'))}
                </Button>
                <Button 
                  variant="outline"
                  className="bg-white hover:bg-gray-50 text-mindgrow-primary px-6 py-3 rounded-full font-bold text-base transition-colors duration-300 shadow-lg hover:shadow-xl border-2 border-mindgrow-primary"
                  onClick={parentsButton.hasAction ? parentsButton.getButtonAction()?.action : undefined}
                  disabled={parentsButton.isLoading || !parentsButton.hasAction}
                >
                  {getContent('hero.learn.more', t('hero.learn.more'))}
                </Button>
              </div>
              
              {/* Download Buttons - Responsive for all screen sizes */}
              <div className="flex flex-col items-center mt-6">
                <p className="text-gray-600 font-medium mb-4 text-sm sm:text-base">{getContent('hero.download.now', t('hero.download.now'))}</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                    <img 
                      src={appStoreBadge}
                      alt="تحميل من App Store" 
                      className="h-12 sm:h-14 lg:h-16 w-auto"
                    />
                  </a>
                  <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                    <img 
                      src={googlePlayBadge}
                      alt="تحميل من Google Play" 
                      className="h-12 sm:h-14 lg:h-16 w-auto"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* الصورة في الأسفل للموبايل والتابلت - بدون هوامش جانبية */}
            <div className="flex items-center justify-center -mx-4 sm:-mx-6 lg:mx-0">
              <img 
                src={mobileHeroImage} 
                alt="طفلة تحمل ورقة مع رسوماتها الملونة" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300 mt-6"
              />
            </div>
          </div>
        </div>

        {/* تخطيط للكمبيوتر واللابتوب - بدون هوامش */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-0 items-stretch w-full min-h-screen">
          {/* الصورة - موضعها يختلف حسب اللغة */}
          <div className={`${language === 'ar' ? 'order-2' : 'order-1'} flex items-center relative`}>
            <img 
              src={heroImage} 
              alt="طفلة تحمل ورقة مع رسوماتها الملونة" 
              className={`w-full h-screen object-cover object-center transform transition-transform duration-300 ${language === 'ar' ? 'scale-x-[-1]' : 'scale-x-[-1]'}`}
            />
          </div>

          {/* النص - موضعه يختلف حسب اللغة */}
          <div className={`${language === 'ar' ? 'order-1' : 'order-2'} h-full flex flex-col justify-center px-8 xl:px-16 py-8 space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'} bg-transparent`}>
            <h1 className="text-3xl xl:text-4xl font-black text-gray-900 leading-tight">
              {getContent('hero.welcome.new', t('hero.welcome'))}
              <br />
              <ColoredBrandName className="drop-shadow-lg" />
            </h1>
            
            <p className="text-lg xl:text-xl text-gray-700 font-bold leading-relaxed">
              {getContent('hero.main.message', t('hero.subtitle'))}
            </p>
          
          <div className="space-y-6 my-10">
            <div className={`flex items-center ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
              <div className="bg-mindgrow-green w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
              <span className="text-base lg:text-lg font-bold text-gray-700">{getContent('hero.check.daily.tasks', t('hero.check.tasks'))}</span>
            </div>
            <div className={`flex items-center ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
              <div className="bg-mindgrow-blue w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
              <span className="text-base lg:text-lg font-bold text-gray-700">{getContent('hero.check.financial.rewards', t('hero.check.rewards'))}</span>
            </div>
            <div className={`flex items-center ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
              <div className="bg-mindgrow-pink w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
              <span className="text-base lg:text-lg font-bold text-gray-700">{getContent('hero.check.children.stores', t('hero.check.shopping'))}</span>
            </div>
          </div>

          {/* Additional Download Section for Desktop */}
          <div className="hidden lg:block mt-12">
            <h3 className={`text-2xl font-bold text-gray-800 mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{getContent('hero.available.all.platforms', t('hero.available.platforms'))}</h3>
            <div className={`flex ${language === 'ar' ? 'justify-start' : 'justify-start'} gap-6`}>
              <a 
                href="https://apps.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={appStoreBadge} 
                  alt="تحميل من App Store" 
                  className="h-16 w-auto"
                />
              </a>
              <a 
                href="https://play.google.com/store" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={googlePlayBadge} 
                  alt="تحميل من Google Play" 
                  className="h-16 w-auto"
                />
              </a>
            </div>
          </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white/50 backdrop-blur-sm relative z-10" dir={dir}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <div className="absolute top-10 right-10 w-20 h-20 border border-mindgrow-blue/20 rounded-full animate-rotate-slow" />
          <div className="absolute bottom-10 left-10 w-6 h-6 bg-mindgrow-green/20 transform rotate-45 animate-float-up" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-4">
              {language === 'ar' ? (
                <>{getContent('features.how.title', t('features.how.title'))} <ColoredBrandName />؟</>
              ) : (
                <>{getContent('features.how.title', t('features.how.title'))} <ColoredBrandName />?</>
              )}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-bold px-4">
              {getContent('features.how.subtitle', t('features.how.subtitle'))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-3 border-gray-100 relative overflow-hidden">
                {/* Waving Character - Different for each card - Position changes based on language */}
                <div className={`absolute ${language === 'ar' ? '-left-6 -top-6' : '-right-6 -top-6'} opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 transform group-hover:scale-110`}>
                  {/* Main character container */}
                  <div className={`w-24 h-24 bg-gradient-to-br ${feature.characterBg} rounded-full flex items-center justify-center shadow-xl relative animate-bounce`}>
                    <feature.characterIcon className="w-10 h-10 text-white" />
                    {/* Waving hand icon */}
                    <div className={`absolute -top-3 ${language === 'ar' ? '-right-3' : '-left-3'} w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg`}>
                      <Smile className="w-5 h-5 text-white animate-waving" />
                    </div>
                  </div>
                  {/* Speech bubble */}
                  <div className={`absolute -bottom-10 ${language === 'ar' ? 'left-12' : 'right-12'} bg-white rounded-lg px-4 py-2 shadow-xl border-2 border-gray-200 min-w-max`}>
                    <div className="text-gray-700 text-sm font-bold whitespace-nowrap">{feature.greeting}</div>
                    <div className={`absolute top-0 ${language === 'ar' ? 'right-8' : 'left-8'} w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-white transform -translate-y-full`}></div>
                  </div>
                  {/* Sparkles effect */}
                  <div className={`absolute -top-2 ${language === 'ar' ? '-left-2' : '-right-2'} w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75`}></div>
                  <div className={`absolute -bottom-2 ${language === 'ar' ? '-right-2' : '-left-2'} w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-75`} style={{ animationDelay: '0.5s' }}></div>
                </div>
                
                <CardContent className="p-6 md:p-8">
                  <div className={`flex items-start ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
                    <div className={`${feature.color} text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-2xl font-black text-gray-800 mb-2 md:mb-3">{feature.title}</h3>
                      <p className="text-gray-600 font-bold text-base md:text-lg leading-relaxed md:whitespace-pre-line">{feature.description.replace('\n', ' ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 relative z-10" dir={dir}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-12 h-12 bg-mindgrow-pink/10 rounded-full animate-scale-pulse" />
          <div className="absolute bottom-20 right-20 w-8 h-8 border border-mindgrow-yellow/20 transform rotate-45 animate-diagonal" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              {getContent('activities.title', t('activities.title'))}
            </h2>
            <p className="text-xl text-gray-600 font-bold">
              {getContent('activities.subtitle', t('activities.subtitle'))}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {activities.map((activity, index) => {
              const IconComponent = activity.icon;
              const AnimatedIcon = activity.animatedIcon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100 relative overflow-hidden">
                  <CardContent className="p-6 text-center">
                    {/* Original Icon */}
                    <div className={`w-16 h-16 ${activity.color} rounded-full flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-all duration-300 group-hover:opacity-0 relative z-10`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Animated Character on Hover */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                      <div className={`w-20 h-20 bg-gradient-to-br ${activity.color.replace('bg-', 'from-')} to-gray-600 rounded-full flex items-center justify-center shadow-xl relative ${activity.action}`}>
                        <AnimatedIcon className="w-10 h-10 text-white" />
                        {/* Action indicator */}
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-black text-gray-800 mb-4 mt-4">{activity.title}</h3>
                    <p className="text-gray-600 font-medium leading-relaxed">{activity.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm relative z-10" dir={dir}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-16 h-16 bg-mindgrow-orange/10 rounded-full animate-float-side" />
          <div className="absolute bottom-10 right-10 w-10 h-10 border border-mindgrow-purple/20 rounded-full animate-rotate-slow" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              {language === 'ar' ? (
                <>إحصائيات <ColoredBrandName /></>
              ) : (
                <><ColoredBrandName /> {t('stats.title')}</>
              )}
            </h2>
            <p className="text-xl text-gray-600 font-bold">
              {getContent('stats.subtitle', t('stats.subtitle'))}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-mindgrow-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">{getContent('stats.daily.tasks', t('stats.daily.tasks'))}</div>
                <div className="font-bold text-lg text-gray-600">{getContent('stats.daily.tasks.label', t('stats.daily.tasks.label'))}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-mindgrow-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">{t('stats.total.rewards')}</div>
                <div className="font-bold text-lg text-gray-600">{t('stats.total.rewards.label')}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-mindgrow-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">{t('stats.active.families')}</div>
                <div className="font-bold text-lg text-gray-600">{t('stats.active.families.label')}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-mindgrow-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">{t('stats.parent.rating')}</div>
                <div className="font-bold text-lg text-gray-600">{t('stats.parent.rating.label')}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ChildrenHome;