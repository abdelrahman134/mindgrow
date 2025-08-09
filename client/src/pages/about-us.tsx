import { Heart, Users, Target, Shield, Award, Lightbulb, Rocket, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { ColoredBrandName } from '@/components/ui/colored-brand-name';
import { useLanguage } from '@/lib/i18n';
import { useContent } from '@/hooks/useContent';
import { useQuery } from '@tanstack/react-query';
import type { TeamMember } from '@shared/schema';

const AboutUs = () => {
  const { t, dir, language } = useLanguage();
  const { getContent } = useContent('about');
  
  // Fetch team members from database
  const { data: teamMembers = [], isLoading: isLoadingTeam } = useQuery({
    queryKey: ['/api/team'],
    retry: false,
  });
  
  const values = [
    {
      icon: Heart,
      title: getContent('about.value.responsibility.title', t('about.value.responsibility.title')),
      description: getContent('about.value.responsibility.description', t('about.value.responsibility.description')),
      color: 'bg-mindgrow-pink'
    },
    {
      icon: Shield,
      title: getContent('about.value.safety.title', t('about.value.safety.title')),
      description: getContent('about.value.safety.description', t('about.value.safety.description')),
      color: 'bg-mindgrow-blue'
    },
    {
      icon: Users,
      title: getContent('about.value.family.title', t('about.value.family.title')),
      description: getContent('about.value.family.description', t('about.value.family.description')),
      color: 'bg-mindgrow-green'
    },
    {
      icon: Award,
      title: getContent('about.value.motivation.title', t('about.value.motivation.title')),
      description: getContent('about.value.motivation.description', t('about.value.motivation.description')),
      color: 'bg-mindgrow-orange'
    },
    {
      icon: Lightbulb,
      title: getContent('about.value.innovation.title', t('about.value.innovation.title')),
      description: getContent('about.value.innovation.description', t('about.value.innovation.description')),
      color: 'bg-mindgrow-purple'
    },
    {
      icon: Target,
      title: getContent('about.value.growth.title', t('about.value.growth.title')),
      description: getContent('about.value.growth.description', t('about.value.growth.description')),
      color: 'bg-mindgrow-yellow'
    }
  ];

  const features = [
    {
      title: t('about.feature.comprehensive.title'),
      description: t('about.feature.comprehensive.description'),
      icon: Users,
      color: 'bg-mindgrow-blue'
    },
    {
      title: t('about.feature.safe.title'),
      description: t('about.feature.safe.description'),
      icon: Shield,
      color: 'bg-mindgrow-green'
    },
    {
      title: t('about.feature.interactive.title'),
      description: t('about.feature.interactive.description'),
      icon: Star,
      color: 'bg-mindgrow-orange'
    },
    {
      title: t('about.feature.multilingual.title'),
      description: t('about.feature.multilingual.description'),
      icon: Target,
      color: 'bg-mindgrow-pink'
    },
    {
      title: t('about.feature.rewards.title'),
      description: t('about.feature.rewards.description'),
      icon: Award,
      color: 'bg-mindgrow-purple'
    },
    {
      title: t('about.feature.analytics.title'),
      description: t('about.feature.analytics.description'),
      icon: Rocket,
      color: 'bg-mindgrow-yellow'
    }
  ];

  // Default team members if none exist in database
  const defaultTeam = [
    {
      name: t('about.team.ceo.name'),
      role: t('about.team.ceo.title'),
      description: t('about.team.ceo.description'),
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: t('about.team.cto.name'),
      role: t('about.team.cto.title'),
      description: t('about.team.cto.description'),
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: t('about.team.edu.name'),
      role: t('about.team.edu.title'),
      description: t('about.team.edu.description'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: t('about.team.design.name'),
      role: t('about.team.design.title'),
      description: t('about.team.design.description'),
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face'
    }
  ];

  // Use database team members if available, otherwise use default
  const team = teamMembers.length > 0 ? teamMembers : defaultTeam;

  const stats = [
    { number: '2024', label: language === 'ar' ? 'سنة التأسيس' : 'Year Founded' },
    { number: '500+', label: t('about.stats.families') },
    { number: '1000+', label: t('about.stats.children') },
    { number: '10,000+', label: t('about.stats.tasks') },
    { number: '98%', label: t('about.stats.satisfaction') },
    { number: '15+', label: t('about.stats.cities') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16" dir={dir}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/60 shadow-2xl text-center">
            <Lightbulb className="h-20 w-20 text-mindgrow-primary mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 text-center">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-medium leading-relaxed text-center max-w-4xl mx-auto">
              {t('about.hero.subtitle')}
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
              {t('about.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-mindgrow-primary to-mindgrow-orange text-white px-8 py-4 rounded-full text-lg font-black transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Rocket className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-6 w-6`} />
                {t('about.story.title')}
              </Button>
              <Button 
                onClick={() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline" 
                className="border-3 border-mindgrow-primary text-mindgrow-primary px-8 py-4 rounded-full text-lg font-black hover:bg-mindgrow-primary hover:text-white transition-all duration-300"
              >
                <Users className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-6 w-6`} />
                {t('about.team.title')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16" dir={dir}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
              <CardContent className="p-8 text-center">
                <Target className="h-16 w-16 text-mindgrow-primary mx-auto mb-6" />
                <h2 className="text-3xl font-black text-gray-900 mb-6">{t('about.mission.title')}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('about.mission.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
              <CardContent className="p-8 text-center">
                <Star className="h-16 w-16 text-mindgrow-orange mx-auto mb-6" />
                <h2 className="text-3xl font-black text-gray-900 mb-6">{t('about.vision.title')}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('about.vision.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                <CardContent className="p-8">
                  <div className={`flex items-start ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
                    <div className={`${value.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                      <value.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 font-medium text-lg leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16" dir={dir}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {t('about.features.title')} <ColoredBrandName />
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.features.subtitle')}
            </p>
            <p className="text-lg text-gray-700 mt-4">
              {t('about.features.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className={`${feature.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team-section" className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.team.subtitle')}
            </p>
          </div>

          {isLoadingTeam ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="text-center bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 animate-pulse mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={member.id || index} className="text-center group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                  <CardContent className="p-6">
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={member.image || member.imageUrl} 
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg"
                        onError={(e) => {
                          // Fallback to a default image if the image fails to load
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face';
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">{member.name}</h3>
                    <h4 className="text-lg font-bold text-mindgrow-primary mb-3">{member.role || member.position}</h4>
                    <p className="text-gray-600 font-medium">{member.description || member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-mindgrow-primary to-mindgrow-orange text-white" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">
            {t('about.stats.title')}
          </h2>
          <p className="text-xl mb-12 leading-relaxed max-w-4xl mx-auto">
            {t('about.stats.subtitle')}
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/20 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-4xl font-black mb-3">{stat.number}</h3>
                <p className="font-bold text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story-section" className="py-16" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {t('about.story.title')} <ColoredBrandName />
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.story.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="bg-mindgrow-primary text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{t('about.story.beginning.title')}</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">{t('about.story.beginning.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="bg-mindgrow-orange text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{t('about.story.development.title')}</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">{t('about.story.development.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="bg-mindgrow-green text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Rocket className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{t('about.story.launch.title')}</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">{t('about.story.launch.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="bg-mindgrow-purple text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{t('about.story.future.title')}</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">{t('about.story.future.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            {t('about.contact.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('about.contact.subtitle')}
          </p>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {t('about.contact.description')}
          </p>
          <Button 
            className="bg-gradient-to-r from-mindgrow-primary to-mindgrow-orange text-white px-8 py-4 rounded-full text-lg font-black transform hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={() => window.location.href = '/contact'}
          >
            {t('about.contact.button')}
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AboutUs;