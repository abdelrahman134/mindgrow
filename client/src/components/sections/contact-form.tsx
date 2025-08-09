import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { CONTACT_INFO } from '@/lib/constants';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.message) {
      toast({
        title: "خطأ في النموذج",
        description: "يجب ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "تم إرسال الطلب بنجاح",
          description: data.message || "شكراً لك! سنتواصل معك قريباً.",
        });
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  const contactMethods = [
    { icon: Phone, title: 'اتصل بنا', value: CONTACT_INFO.phone, color: 'blue' },
    { icon: Mail, title: 'راسلنا', value: CONTACT_INFO.email, color: 'green' },
    { icon: MapPin, title: 'زرنا', value: CONTACT_INFO.location, color: 'orange' },
  ];

  const getColorClass = (color: string) => `bg-mindgrow-${color}`;

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            ابدأ مشروعك اليوم
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 font-medium">
            تواصل معنا للحصول على استشارة مجانية وعرض سعر مفصل
          </p>
        </div>

        <Card className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل *</label>
                  <Input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    className="focus:ring-mindgrow-blue focus:border-mindgrow-blue border-2 rounded-xl p-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="name@company.com"
                    className="focus:ring-mindgrow-blue focus:border-mindgrow-blue border-2 rounded-xl p-4"
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+974 6601 8814"
                    className="focus:ring-mindgrow-blue focus:border-mindgrow-blue border-2 rounded-xl p-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">موضوع الرسالة</label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="عن ماذا تريد أن تتحدث؟"
                    className="focus:ring-mindgrow-blue focus:border-mindgrow-blue border-2 rounded-xl p-4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رسالتك *</label>
                <Textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="أخبرنا المزيد عن استفسارك أو مشروعك..."
                  className="focus:ring-mindgrow-blue focus:border-mindgrow-blue border-2 rounded-xl p-4"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-mindgrow-pink to-mindgrow-orange text-white py-6 rounded-xl text-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Send className="ml-2 h-6 w-6" />
                إرسال طلب العرض
              </Button>
            </form>

            {/* Contact Information */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid lg:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl">
                    <div className={`${getColorClass(method.color)} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <method.icon className="h-8 w-8" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">{method.title}</h4>
                    <p className="text-gray-600 font-medium">{method.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;