import { Shield, Users, Headphones, Award } from 'lucide-react';

const TrustIndicators = () => {
  const trustItems = [
    {
      icon: Shield,
      title: 'أمان معتمد',
      description: 'شهادات أمان دولية وحماية البيانات وفق أعلى المعايير',
      color: 'green',
    },
    {
      icon: Users,
      title: 'فريق متخصص',
      description: 'مطورون ومصممون ذوو خبرة واسعة في تطبيقات الأطفال',
      color: 'blue',
    },
    {
      icon: Headphones,
      title: 'دعم مستمر',
      description: 'فريق دعم فني متاح 24/7 لضمان عمل التطبيق بكفاءة',
      color: 'orange',
    },
    {
      icon: Award,
      title: 'جودة مضمونة',
      description: 'ضمان الجودة وإعادة التطوير مجاناً في حال عدم الرضا',
      color: 'pink',
    },
  ];

  const statistics = [
    { number: '50+', label: 'مشروع مكتمل' },
    { number: '95%', label: 'رضا العملاء' },
    { number: '24/7', label: 'دعم فني' },
    { number: '5+', label: 'سنوات خبرة' },
  ];

  const getColorClass = (color: string) => `bg-mindgrow-${color}`;

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            لماذا تثق بنا؟
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
          {trustItems.map((item, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className={`${getColorClass(item.color)} text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <item.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 font-medium leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-mindgrow-blue via-mindgrow-green to-mindgrow-orange rounded-3xl p-12 text-white shadow-2xl">
          <div className="grid lg:grid-cols-4 gap-8 text-center">
            {statistics.map((stat, index) => (
              <div key={index} className="transform hover:scale-110 transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-black mb-3">{stat.number}</div>
                <div className="text-xl font-bold opacity-95">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
