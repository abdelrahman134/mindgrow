import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoWhite from '@assets/لوقو بالالون الابيض خلفية شفافة_1751796521960.png';
import { Link } from 'wouter';
import { useLanguage } from '@/lib/i18n';

const Footer = () => {
  const { t, dir, language } = useLanguage();
  const quickLinks = [
    { href: '/', label: t('nav.children') },
    { href: '/parents', label: t('nav.parents') },
    { href: '/sellers', label: t('nav.sellers') },
    { href: '/teachers', label: t('nav.teachers') },
    { href: '/about-us', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') }
  ];

  const features = [
    t('footer.features.interactive'),
    t('footer.features.rewards'),
    t('footer.features.family'),
    t('footer.features.store'),
    language === 'ar' ? 'تقارير الإنجاز' : 'Achievement Reports'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-r from-mindgrow-blue via-mindgrow-green to-mindgrow-orange text-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src={logoWhite} alt="MindGrow Logo" className="h-10 sm:h-12 lg:h-14 w-auto mb-4 object-contain" />
              <p className="text-base lg:text-lg font-medium opacity-90 leading-relaxed">
                {t('footer.description')}
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                <Phone className="h-5 w-5 opacity-75" />
                <span className="opacity-90">+974-6601-8814</span>
              </div>
              <div className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                <Mail className="h-5 w-5 opacity-75" />
                <span className="opacity-90">support@mindgrow.pro</span>
              </div>
              <div className={`flex items-center ${language === 'ar' ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                <MapPin className="h-5 w-5 opacity-75" />
                <span className="opacity-90">{t('contact.address')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black mb-6">{t('footer.quick.links')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <span className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer font-medium">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-black mb-6">{t('footer.features')}</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className={`flex items-center ${language === 'ar' ? 'space-x-2 space-x-reverse' : 'space-x-2'}`}>
                  <div className="w-2 h-2 bg-white rounded-full opacity-75"></div>
                  <span className="opacity-90 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-xl font-black mb-6">{t('footer.follow')}</h3>
            <p className="opacity-90 mb-4 font-medium">
              {t('footer.newsletter')}
            </p>
            
            <div className="mb-6">
              <div className={`flex ${language === 'ar' ? 'space-x-2 space-x-reverse' : 'space-x-2'} mb-4`}>
                <input
                  type="email"
                  placeholder={t('footer.email.placeholder')}
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 font-medium"
                />
                <Button className="bg-white text-mindgrow-blue hover:bg-gray-100 font-bold px-6">
                  {t('footer.subscribe')}
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div className={`flex ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white border-opacity-20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`flex items-center ${language === 'ar' ? 'space-x-2 space-x-reverse' : 'space-x-2'}`}>
              <span className="opacity-90 font-medium">
                {t('footer.rights')}
              </span>
              <Heart className="h-4 w-4 text-red-300" />
            </div>
            
            <div className={`flex ${language === 'ar' ? 'space-x-6 space-x-reverse' : 'space-x-6'} text-sm`}>
              <Link href="/privacy-policy">
                <span className="opacity-90 hover:opacity-100 transition-opacity font-medium cursor-pointer">
                  {t('footer.privacy')}
                </span>
              </Link>
              <Link href="/terms-of-service">
                <span className="opacity-90 hover:opacity-100 transition-opacity font-medium cursor-pointer">
                  {t('footer.terms')}
                </span>
              </Link>
              <Link href="/service-agreement">
                <span className="opacity-90 hover:opacity-100 transition-opacity font-medium cursor-pointer">
                  {t('footer.service')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;