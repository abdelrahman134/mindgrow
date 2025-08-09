import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = CONTACT_INFO.whatsapp.replace(/[^\d]/g, ''); // إزالة كل شيء ما عدا الأرقام
    const message = encodeURIComponent('مرحباً، أريد الاستفسار عن تطبيق مايندجرو');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse"
      aria-label="تواصل معنا عبر واتساب"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppButton;