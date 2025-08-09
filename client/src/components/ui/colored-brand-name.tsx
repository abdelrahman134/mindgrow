import { useLanguage } from '@/lib/i18n';

interface ColoredBrandNameProps {
  className?: string;
}

export const ColoredBrandName = ({ className = "" }: ColoredBrandNameProps) => {
  const { language } = useLanguage();
  const colors = ['text-mindgrow-blue', 'text-mindgrow-orange', 'text-mindgrow-green', 'text-mindgrow-pink', 'text-mindgrow-yellow', 'text-mindgrow-primary', 'text-mindgrow-purple'];
  
  const brandName = language === 'ar' ? 'مايندجرو' : 'MindGrow';
  const fontClass = language === 'en' ? 'mindgrow-brand-font' : '';
  
  return (
    <span className={`inline-block ${className} ${fontClass}`}>
      {brandName.split('').map((letter, index) => (
        <span key={index} className={`${colors[index % colors.length]} font-black`}>
          {letter}
        </span>
      ))}
    </span>
  );
};