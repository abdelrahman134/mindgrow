import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useLanguage } from '@/lib/i18n';
import logoTransparent from '@assets/new size logo_1751827571798.png';
import { Link, useLocation } from 'wouter';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t, dir } = useLanguage();

  // دالة للكشف عن نوع الجهاز وتوجيه المستخدم للمتجر المناسب
  const handleDownloadApp = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      // أجهزة iOS - توجيه لـ App Store
      window.open('https://apps.apple.com', '_blank');
    } else if (/android/.test(userAgent)) {
      // أجهزة Android - توجيه لـ Google Play
      window.open('https://play.google.com/store', '_blank');
    } else {
      // أجهزة أخرى - عرض خيارات التحميل
      window.open('https://play.google.com/store', '_blank');
    }
  };

  // دالة لتحديد لون الزر بناءً على الصفحة الحالية
  const getButtonColor = () => {
    switch (location) {
      case '/':
        return 'bg-gradient-to-r from-mindgrow-pink to-mindgrow-orange'; // الصفحة الرئيسية - وردي وبرتقالي
      case '/parents':
        return 'bg-gradient-to-r from-mindgrow-green to-mindgrow-blue'; // للآباء - أخضر وأزرق
      case '/sellers':
        return 'bg-gradient-to-r from-mindgrow-blue to-mindgrow-pink'; // للبائعين - أزرق ووردي
      case '/teachers':
        return 'bg-gradient-to-r from-mindgrow-yellow to-mindgrow-green'; // للمعلمين - أصفر وأخضر
      case '/about-us':
        return 'bg-gradient-to-r from-mindgrow-orange to-mindgrow-yellow'; // من نحن - برتقالي وأصفر
      case '/contact':
        return 'bg-gradient-to-r from-mindgrow-purple to-mindgrow-pink'; // تواصل معنا - بنفسجي ووردي
      default:
        return 'bg-gradient-to-r from-mindgrow-pink to-mindgrow-orange'; // افتراضي
    }
  };

  // دالة لتحديد لون الزر النشط في المنيو
  const getActiveMenuColor = () => {
    switch (location) {
      case '/':
        return 'bg-mindgrow-pink text-white'; // الصفحة الرئيسية - وردي
      case '/parents':
        return 'bg-mindgrow-green text-white'; // للآباء - أخضر
      case '/sellers':
        return 'bg-mindgrow-blue text-white'; // للبائعين - أزرق
      case '/teachers':
        return 'bg-mindgrow-yellow text-white'; // للمعلمين - أصفر
      case '/about-us':
        return 'bg-mindgrow-orange text-white'; // من نحن - برتقالي
      case '/contact':
        return 'bg-mindgrow-purple text-white'; // تواصل معنا - بنفسجي
      default:
        return 'bg-mindgrow-pink text-white'; // افتراضي
    }
  };

  const navItems = [
    { href: '/', label: t('nav.children'), isActive: location === '/' },
    { href: '/parents', label: t('nav.parents'), isActive: location === '/parents' },
    { href: '/sellers', label: t('nav.sellers'), isActive: location === '/sellers' },
    { href: '/teachers', label: t('nav.teachers'), isActive: location === '/teachers' },
    { href: '/about-us', label: t('nav.about'), isActive: location === '/about-us' },
    { href: '/contact', label: t('nav.contact'), isActive: location === '/contact' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 lg:h-28">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <img 
                src={logoTransparent} 
                alt="MindGrow Logo" 
                className="h-12 sm:h-16 md:h-18 lg:h-20 w-auto cursor-pointer object-contain" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6 space-x-reverse flex-wrap">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant={item.isActive ? "default" : "ghost"}
                  className={`${item.isActive ? getActiveMenuColor() : "text-gray-700 hover:text-mindgrow-blue"} text-sm lg:text-base whitespace-nowrap`}
                  size="sm"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Download Icon for all screen sizes */}
            <Button 
              onClick={handleDownloadApp}
              className={`${getButtonColor()} text-white p-3 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center`}
              size="sm"
              title={t('nav.download')}
            >
              <Download className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant={item.isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${item.isActive ? getActiveMenuColor() : "text-gray-700"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex justify-center pt-2 pb-2">
                <LanguageSwitcher />
              </div>
              
              <Button 
                onClick={handleDownloadApp}
                className={`${getButtonColor()} text-white rounded-full font-bold mt-4 hover:scale-105 transition-all duration-300 flex items-center justify-center p-3`}
                title={t('nav.download')}
              >
                <Download className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;