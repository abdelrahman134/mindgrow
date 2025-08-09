import { useState, useEffect } from 'react';
import { Star, Gift, Book, Trophy, Gamepad2, Heart, Sparkles, Play, Users, Target, Award, Smile, Zap, ShoppingBag, UserCheck, Brush, BookOpen, Home, Sparkle, PiggyBank, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import { Link } from 'wouter';
import heroImage from '@assets/9227069_1751828324959.png';
import googlePlayBadge from '@assets/200_1751829516852.png';
import appStoreBadge from '@assets/300_1751829516854.png';
import { ColoredBrandName } from '@/components/ui/colored-brand-name';




const ChildrenHome = () => {

  const features = [
    {
      icon: Target,
      title: 'مهام يومية منظمة',
      description: 'أنجز مهامك اليومية وتحمل المسؤولية\nلتصبح أكثر نضجاً',
      color: 'bg-mindgrow-blue',
      characterIcon: Zap,
      characterBg: 'from-blue-400 to-indigo-500',
      greeting: 'هيا نبدأ!'
    },
    {
      icon: Trophy,
      title: 'مكافآت مالية حقيقية',
      description: 'احصل على مكافآت مالية عند إنجاز مهامك\nواحفظها في محفظتك',
      color: 'bg-mindgrow-yellow',
      characterIcon: Award,
      characterBg: 'from-yellow-400 to-orange-500',
      greeting: 'أحسنت!'
    },
    {
      icon: Gift,
      title: 'تسوق من متاجر الأطفال',
      description: 'استخدم أموالك لشراء ما تريد من متاجر\nآمنة مخصصة للأطفال',
      color: 'bg-mindgrow-green',
      characterIcon: ShoppingBag,
      characterBg: 'from-green-400 to-emerald-500',
      greeting: 'وقت التسوق!'
    },
    {
      icon: Users,
      title: 'تواصل مع العائلة',
      description: 'شارك إنجازاتك مع الوالدين واحصل\nعلى التشجيع والدعم',
      color: 'bg-mindgrow-pink',
      characterIcon: UserCheck,
      characterBg: 'from-pink-400 to-purple-500',
      greeting: 'معاً نتقدم!'
    }
  ];

  const activities = [
    { 
      icon: Star, 
      title: 'تنظيف الغرفة', 
      description: 'حافظ على نظافة وترتيب غرفتك الشخصية بشكل يومي لتحصل على بيئة مريحة وصحية للعب والدراسة',
      color: 'bg-mindgrow-blue',
      animatedIcon: Brush,
      character: '🧹',
      action: 'animate-sweep'
    },
    { 
      icon: Book, 
      title: 'القراءة والواجبات', 
      description: 'أنجز واجباتك المدرسية والمنزلية بانتظام واقرأ القصص المفيدة لتطوير مهاراتك العلمية والثقافية',
      color: 'bg-mindgrow-green',
      animatedIcon: BookOpen,
      character: '📚',
      action: 'animate-reading'
    },
    { 
      icon: Heart, 
      title: 'مساعدة في البيت', 
      description: 'ساعد والديك في الأعمال المنزلية البسيطة واظهر حبك وتقديرك لهم من خلال المشاركة الإيجابية',
      color: 'bg-mindgrow-pink',
      animatedIcon: Home,
      character: '🏠',
      action: 'animate-helping'
    },
    { 
      icon: Sparkles, 
      title: 'العناية الشخصية', 
      description: 'اهتم بنظافتك الشخصية وصحتك من خلال تنظيف الأسنان والاستحمام والعادات الصحية اليومية',
      color: 'bg-mindgrow-yellow',
      animatedIcon: Sparkle,
      character: '🦷',
      action: 'animate-cleaning'
    },
    { 
      icon: Trophy, 
      title: 'توفير المال', 
      description: 'تعلم كيفية إدارة أموالك بذكاء من خلال ادخار جزء من مكافآتك لتحقيق أهدافك وأحلامك المستقبلية',
      color: 'bg-mindgrow-orange',
      animatedIcon: PiggyBank,
      character: '💰',
      action: 'animate-saving'
    },
    { 
      icon: Gift, 
      title: 'التسوق الذكي', 
      description: 'استخدم أموالك المدخرة في شراء الأشياء المفيدة والضرورية واتخذ قرارات ذكية عند التسوق والشراء',
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
      <section className="relative z-10 min-h-screen flex items-center overflow-hidden" dir="rtl">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">
          {/* الصورة على اليسار بدون أي هوامش */}
          <div className="p-0">
            <img 
              src={heroImage} 
              alt="طفلة تحمل ورقة مع رسوماتها الملونة" 
              className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* النص على اليمين مرفوع قليلاً */}
          <div className="px-4 sm:px-8 lg:px-16 pt-4 lg:pt-8 pb-8 lg:pb-12 space-y-6 lg:space-y-8 flex flex-col justify-start text-center lg:text-right">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight">
                مرحباً بك في
                <br />
                <ColoredBrandName className="drop-shadow-lg" />
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-700 font-bold leading-relaxed">
                تطبيق المهام والمكافآت للأطفال! 
                <br />
                أنجز مهامك واحصل على مكافآت مالية رائعة
              </p>
            
            <div className="space-y-6 my-10">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="bg-mindgrow-green w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">✓</span>
                </div>
                <span className="text-xl font-bold text-gray-700">أنجز مهامك اليومية بسهولة</span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="bg-mindgrow-blue w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">✓</span>
                </div>
                <span className="text-xl font-bold text-gray-700">احصل على مكافآت مالية حقيقية</span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="bg-mindgrow-pink w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">✓</span>
                </div>
                <span className="text-xl font-bold text-gray-700">تسوق من متاجر الأطفال المختارة</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">حمل التطبيق الآن:</h3>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
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
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white/50 backdrop-blur-sm relative z-10" dir="rtl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <div className="absolute top-10 right-10 w-20 h-20 border border-mindgrow-blue/20 rounded-full animate-rotate-slow" />
          <div className="absolute bottom-10 left-10 w-6 h-6 bg-mindgrow-green/20 transform rotate-45 animate-float-up" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-4">
              كيف يعمل تطبيق <ColoredBrandName />؟
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-bold px-4">
              نظام مهام ومكافآت مصمم لتعليم الأطفال تحمل المسؤولية!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-3 border-gray-100 relative overflow-hidden">
                {/* Waving Character - Different for each card */}
                <div className="absolute -left-6 -top-6 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 transform group-hover:scale-110">
                  {/* Main character container */}
                  <div className={`w-24 h-24 bg-gradient-to-br ${feature.characterBg} rounded-full flex items-center justify-center shadow-xl relative animate-bounce`}>
                    <feature.characterIcon className="w-10 h-10 text-white" />
                    {/* Waving hand icon */}
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Smile className="w-5 h-5 text-white animate-waving" />
                    </div>
                  </div>
                  {/* Speech bubble */}
                  <div className="absolute -bottom-10 left-12 bg-white rounded-lg px-4 py-2 shadow-xl border-2 border-gray-200 min-w-max">
                    <div className="text-gray-700 text-sm font-bold whitespace-nowrap">{feature.greeting}</div>
                    <div className="absolute top-0 right-8 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-white transform -translate-y-full"></div>
                  </div>
                  {/* Sparkles effect */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }}></div>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className={`${feature.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-800 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 font-bold text-lg leading-relaxed whitespace-pre-line">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 relative z-10" dir="rtl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-12 h-12 bg-mindgrow-pink/10 rounded-full animate-scale-pulse" />
          <div className="absolute bottom-20 right-20 w-8 h-8 border border-mindgrow-yellow/20 transform rotate-45 animate-diagonal" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              أنواع المهام المختلفة
            </h2>
            <p className="text-xl text-gray-600 font-bold">
              أنجز هذه المهام واحصل على مكافآت مالية رائعة
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
      <section className="py-16 bg-white/50 backdrop-blur-sm relative z-10" dir="rtl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-16 h-16 bg-mindgrow-orange/10 rounded-full animate-float-side" />
          <div className="absolute bottom-10 right-10 w-10 h-10 border border-mindgrow-purple/20 rounded-full animate-rotate-slow" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              إحصائيات <ColoredBrandName />
            </h2>
            <p className="text-xl text-gray-600 font-bold">
              أرقام تثبت نجاح التطبيق مع الأطفال والعائلات
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-mindgrow-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">500+</div>
                <div className="font-bold text-lg text-gray-600">مهمة يومية</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-mindgrow-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">1000+</div>
                <div className="font-bold text-lg text-gray-600">ريال مكافآت</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-mindgrow-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">200+</div>
                <div className="font-bold text-lg text-gray-600">عائلة مشتركة</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-mindgrow-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">5</div>
                <div className="font-bold text-lg text-gray-600">تقييم الآباء</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChildrenHome;