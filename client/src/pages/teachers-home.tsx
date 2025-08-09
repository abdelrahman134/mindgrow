import { GraduationCap, BookOpen, Users, ClipboardCheck, MessageSquare, Award, Calendar, Target, Calculator, Microscope, Globe, Building, Languages, CheckCircle } from 'lucide-react';
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
import teachersImage from '@assets/8908866_1751997891964.png';

const TeachersHome = () => {
  const { t, dir, language } = useLanguage();
  const { getContent } = useContent('teachers');
  const { getIcon } = useIcons('teachers');
  const joinButton = useButtonLink('teachers.hero.join');
  const guideButton = useButtonLink('teachers.hero.guide');
  
  const teacherFeatures = [
    {
      icon: getIcon('teachers.feature.classroom.icon'),
      title: getContent('teachers.feature.student.management', t('teachers.feature.student.management')),
      description: getContent('teachers.feature.student.management.desc', t('teachers.feature.student.management.desc')),
      color: 'bg-mindgrow-blue'
    },
    {
      icon: getIcon('teachers.feature.curriculum.icon'),
      title: getContent('teachers.feature.task.creation', t('teachers.feature.task.creation')),
      description: getContent('teachers.feature.task.creation.desc', t('teachers.feature.task.creation.desc')),
      color: 'bg-mindgrow-green'
    },
    {
      icon: getIcon('teachers.feature.analytics.icon'),
      title: getContent('teachers.feature.progress.tracking', t('teachers.feature.progress.tracking')),
      description: getContent('teachers.feature.progress.tracking.desc', t('teachers.feature.progress.tracking.desc')),
      color: 'bg-mindgrow-orange'
    },
    {
      icon: getIcon('teachers.feature.gamification.icon'),
      title: getContent('teachers.feature.rewards.system', t('teachers.feature.rewards.system')),
      description: getContent('teachers.feature.rewards.system.desc', t('teachers.feature.rewards.system.desc')),
      color: 'bg-mindgrow-pink'
    }
  ];

  const workflow = [
    {
      step: '01',
      title: getContent('teachers.step.register.approval', t('teachers.step.register.approval')),
      description: getContent('teachers.step.register.approval.desc', t('teachers.step.register.approval.desc')),
      icon: getIcon('teachers.step.register.icon')
    },
    {
      step: '02',
      title: getContent('teachers.step.create.classroom', t('teachers.step.create.classroom')),
      description: getContent('teachers.step.create.classroom.desc', t('teachers.step.create.classroom.desc')),
      icon: getIcon('teachers.step.classroom.icon')
    },
    {
      step: '03',
      title: getContent('teachers.step.design.tasks', t('teachers.step.design.tasks')),
      description: getContent('teachers.step.design.tasks.desc', t('teachers.step.design.tasks.desc')),
      icon: getIcon('teachers.step.content.icon')
    },
    {
      step: '04',
      title: getContent('teachers.step.track.progress', t('teachers.step.track.progress')),
      description: getContent('teachers.step.track.progress.desc', t('teachers.step.track.progress.desc')),
      icon: getIcon('teachers.step.monitoring.icon')
    }
  ];

  const benefits = [
    getContent('teachers.benefit.digital.classroom', t('teachers.benefit.digital.classroom')),
    getContent('teachers.benefit.detailed.analytics', t('teachers.benefit.detailed.analytics')),
    getContent('teachers.benefit.customizable.tasks', t('teachers.benefit.customizable.tasks')),
    getContent('teachers.benefit.parent.communication', t('teachers.benefit.parent.communication')),
    getContent('teachers.benefit.educational.resources', t('teachers.benefit.educational.resources')),
    getContent('teachers.benefit.professional.development', t('teachers.benefit.professional.development'))
  ];

  const subjects = [
    { name: getContent('teachers.subject.language.arts', t('teachers.category.language.arts')), icon: BookOpen, description: getContent('teachers.subject.language.arts.desc', t('teachers.category.language.arts.desc')), color: 'bg-mindgrow-blue' },
    { name: getContent('teachers.subject.mathematics', t('teachers.category.mathematics')), icon: Calculator, description: getContent('teachers.subject.mathematics.desc', t('teachers.category.mathematics.desc')), color: 'bg-mindgrow-green' },
    { name: getContent('teachers.subject.science', t('teachers.category.science')), icon: Microscope, description: getContent('teachers.subject.science.desc', t('teachers.category.science.desc')), color: 'bg-mindgrow-orange' },
    { name: getContent('teachers.subject.social.studies', t('teachers.category.social.studies')), icon: Globe, description: getContent('teachers.subject.social.studies.desc', t('teachers.category.social.studies.desc')), color: 'bg-mindgrow-pink' },
    { name: getContent('teachers.subject.art.creativity', t('teachers.category.art.creativity')), icon: Award, description: getContent('teachers.subject.art.creativity.desc', t('teachers.category.art.creativity.desc')), color: 'bg-mindgrow-purple' },
    { name: getContent('teachers.subject.physical.education', t('teachers.category.physical.education')), icon: Target, description: getContent('teachers.subject.physical.education.desc', t('teachers.category.physical.education.desc')), color: 'bg-mindgrow-yellow' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative z-10 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" dir={dir}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center w-full min-h-screen">
          {/* Image on left for Arabic, right for English */}
          <div className={`${language === 'ar' ? 'order-2 lg:order-1' : 'order-1 lg:order-2'} h-full flex items-center`}>
            <img 
              src={teachersImage}
              alt={language === 'ar' ? 'معلمة تقدم التطبيق' : 'Teacher presenting the app'} 
              className="w-full h-screen object-cover object-center transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Text on right for Arabic, left for English */}
          <div className={`${language === 'ar' ? 'order-1 lg:order-2' : 'order-2 lg:order-1'} px-4 sm:px-8 lg:px-16 py-8 space-y-4 lg:space-y-6 flex flex-col justify-center text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'} h-full`}>
              <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-gray-900 leading-tight">
                {getContent('teachers.title', t('teachers.title'))}
                <br />
                <ColoredBrandName className="drop-shadow-lg" />
              </h1>
              
              <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700 font-bold leading-relaxed">
                {getContent('teachers.subtitle', t('teachers.subtitle'))}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  className="bg-gradient-to-r from-mindgrow-primary to-mindgrow-orange text-white px-8 py-4 rounded-full text-lg font-black transform hover:scale-105 transition-all duration-300 shadow-lg"
                  onClick={joinButton.hasAction ? joinButton.getButtonAction()?.action : undefined}
                  disabled={joinButton.isLoading || !joinButton.hasAction}
                >
                  <GraduationCap className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-6 w-6`} />
                  {getContent('teachers.hero.join', t('teachers.hero.join'))}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-3 border-mindgrow-primary text-mindgrow-primary px-8 py-4 rounded-full text-lg font-black hover:bg-mindgrow-primary hover:text-white transition-all duration-300"
                  onClick={guideButton.hasAction ? guideButton.getButtonAction()?.action : undefined}
                  disabled={guideButton.isLoading || !guideButton.hasAction}
                >
                  {getContent('teachers.hero.guide', t('teachers.hero.guide'))}
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
              {getContent('teachers.features.title', t('teachers.features.title'))}
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('teachers.features.subtitle', t('teachers.features.subtitle'))}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {teacherFeatures.map((feature, index) => (
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

      {/* How it Works for Teachers */}
      <section className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('teachers.steps.title', t('teachers.steps.title'))} <ColoredBrandName />؟
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('teachers.steps.subtitle', t('teachers.steps.subtitle'))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((item, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className="bg-mindgrow-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg">
                    {item.step}
                  </div>
                  <item.icon className="h-12 w-12 text-mindgrow-orange mx-auto mb-4" />
                  <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 font-medium">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('teachers.subjects.title', t('teachers.categories.title'))}
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('teachers.subjects.subtitle', t('teachers.categories.subtitle'))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className={`${subject.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-125 transition-transform duration-300 shadow-lg`}>
                    <subject.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4">{subject.name}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{subject.description}</p>
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
              {getContent('teachers.benefits.title', t('teachers.benefits.title'))} <ColoredBrandName />
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('teachers.benefits.subtitle', t('teachers.benefits.subtitle'))}
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

      {/* Success Statistics */}
      <section className="py-16 bg-gradient-to-r from-mindgrow-green to-mindgrow-blue text-white" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">
            {getContent('teachers.success.title', t('teachers.success.title'))}
          </h2>
          <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
            {getContent('teachers.success.subtitle', t('teachers.success.subtitle'))}
          </p>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-3xl font-black mb-3">500+</h3>
              <p className="text-xl font-bold">{getContent('teachers.stats.active.teachers', t('teachers.stats.active.teachers'))}</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-3xl font-black mb-3">15,000+</h3>
              <p className="text-xl font-bold">{getContent('teachers.stats.students.enrolled', t('teachers.stats.students.enrolled'))}</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-3xl font-black mb-3">50,000+</h3>
              <p className="text-xl font-bold">{getContent('teachers.stats.tasks.completed', t('teachers.stats.tasks.completed'))}</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-3xl font-black mb-3">98%</h3>
              <p className="text-xl font-bold">{getContent('teachers.stats.satisfaction.rate', t('teachers.stats.satisfaction.rate'))}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('teachers.requirements.title', t('teachers.requirements.title'))}
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('teachers.requirements.subtitle', t('teachers.requirements.subtitle'))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-6">
                  {getContent('teachers.requirements.qualifications', t('teachers.requirements.qualifications'))}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className={`h-6 w-6 text-mindgrow-green ${language === 'ar' ? 'ml-3' : 'mr-3'} mt-1`} />
                    <span className="text-gray-700 font-medium">{getContent('teachers.requirements.teaching.degree', t('teachers.requirements.teaching.degree'))}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className={`h-6 w-6 text-mindgrow-green ${language === 'ar' ? 'ml-3' : 'mr-3'} mt-1`} />
                    <span className="text-gray-700 font-medium">{getContent('teachers.requirements.teaching.experience', t('teachers.requirements.experience'))}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className={`h-6 w-6 text-mindgrow-green ${language === 'ar' ? 'ml-3' : 'mr-3'} mt-1`} />
                    <span className="text-gray-700 font-medium">{getContent('teachers.requirements.technology.skills', t('teachers.requirements.technology.skills'))}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-6">
                  {getContent('teachers.requirements.documents', t('teachers.requirements.skills'))}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className={`h-6 w-6 text-mindgrow-orange ${language === 'ar' ? 'ml-3' : 'mr-3'} mt-1`} />
                    <span className="text-gray-700 font-medium">{getContent('teachers.requirements.cv', t('teachers.requirements.communication.skills'))}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className={`h-6 w-6 text-mindgrow-orange ${language === 'ar' ? 'ml-3' : 'mr-3'} mt-1`} />
                    <span className="text-gray-700 font-medium">{getContent('teachers.requirements.certificates', t('teachers.requirements.creative.thinking'))}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className={`h-6 w-6 text-mindgrow-orange ${language === 'ar' ? 'ml-3' : 'mr-3'} mt-1`} />
                    <span className="text-gray-700 font-medium">{getContent('teachers.requirements.id.copy', t('teachers.requirements.student.motivation'))}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TeachersHome;