import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { useLanguage } from '@/lib/i18n';
import { useContent } from '@/hooks/useContent';

const Contact = () => {
  const { t, dir, language } = useLanguage();
  const { getContent } = useContent('contact');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال النموذج
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert(getContent('contact.form.success', t('contact.form.success')));
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: getContent('contact.call.us', t('contact.call.us')),
      value: '+974-6601-8814',
      description: getContent('contact.call.desc', t('contact.call.desc')),
      color: 'bg-mindgrow-green'
    },
    {
      icon: Mail,
      title: getContent('contact.email.us', t('contact.email.us')),
      value: 'support@mindgrow.pro',
      description: getContent('contact.email.desc', t('contact.email.desc')),
      color: 'bg-mindgrow-blue'
    },
    {
      icon: MapPin,
      title: getContent('contact.visit.us', t('contact.visit.us')),
      value: getContent('contact.address', t('contact.address')),
      description: getContent('contact.visit.desc', t('contact.visit.desc')),
      color: 'bg-mindgrow-orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/50 shadow-2xl text-center">
            <MessageCircle className="h-20 w-20 text-mindgrow-primary mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 text-center">
              {getContent('contact.title', t('contact.title'))}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-medium text-center max-w-3xl mx-auto">
              {getContent('contact.subtitle', t('contact.subtitle'))}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16" dir={dir}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('contact.ways.title', t('contact.ways.title'))}
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('contact.ways.subtitle', t('contact.ways.subtitle'))}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                <CardContent className="p-8">
                  <div className={`${info.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <info.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{info.title}</h3>
                  <p className="text-xl font-bold text-mindgrow-primary mb-2">{info.value}</p>
                  <p className="text-gray-600 font-medium">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white/50 backdrop-blur-sm" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {getContent('contact.form.title', t('contact.form.title'))}
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('contact.form.subtitle', t('contact.form.subtitle'))}
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-lg font-bold text-gray-700 mb-2">
                      {getContent('contact.form.name', t('contact.form.name'))} *
                    </label>
                    <div className="relative">
                      <User className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400`} />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`${language === 'ar' ? 'pl-4 pr-12' : 'pr-4 pl-12'} py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-mindgrow-primary`}
                        placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-lg font-bold text-gray-700 mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <div className="relative">
                      <Phone className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400`} />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`${language === 'ar' ? 'pl-4 pr-12' : 'pr-4 pl-12'} py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-mindgrow-primary`}
                        placeholder={language === 'ar' ? '05xxxxxxxx' : '+974-xxxx-xxxx'}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-bold text-gray-700 mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400`} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`${language === 'ar' ? 'pl-4 pr-12' : 'pr-4 pl-12'} py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-mindgrow-primary`}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-lg font-bold text-gray-700 mb-2">
                    {t('contact.form.subject')} *
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400`} />
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className={`${language === 'ar' ? 'pl-4 pr-12' : 'pr-4 pl-12'} py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-mindgrow-primary`}
                      placeholder={language === 'ar' ? 'ما هو موضوع رسالتك؟' : 'What is your message subject?'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-bold text-gray-700 mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="py-3 px-4 text-lg border-2 border-gray-200 rounded-xl focus:border-mindgrow-primary resize-none"
                    placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-mindgrow-primary to-mindgrow-orange text-white px-12 py-4 rounded-full text-xl font-black transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className={`flex items-center ${language === 'ar' ? 'space-x-2 space-x-reverse' : 'space-x-2'}`}>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>{t('contact.form.sending')}</span>
                      </div>
                    ) : (
                      <div className={`flex items-center ${language === 'ar' ? 'space-x-2 space-x-reverse' : 'space-x-2'}`}>
                        <Send className="h-6 w-6" />
                        <span>{t('contact.form.send')}</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16" dir={dir}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {t('contact.faq.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('contact.faq.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-3">{t('contact.faq.q1.title')}</h3>
                <p className="text-gray-600 font-medium">{t('contact.faq.q1.answer')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-3">{t('contact.faq.q2.title')}</h3>
                <p className="text-gray-600 font-medium">{t('contact.faq.q2.answer')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-3">{t('contact.faq.q3.title')}</h3>
                <p className="text-gray-600 font-medium">{t('contact.faq.q3.answer')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-3">{t('contact.faq.q4.title')}</h3>
                <p className="text-gray-600 font-medium">{t('contact.faq.q4.answer')}</p>
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

export default Contact;