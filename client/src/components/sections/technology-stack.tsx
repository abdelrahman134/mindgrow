import { Smartphone, Server, Database, Cloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TechnologyStack = () => {
  const technologies = [
    {
      icon: Smartphone,
      title: 'تطبيقات أصلية',
      color: 'blue',
      items: ['Swift (iOS)', 'Kotlin (Android)', 'Xcode & Android Studio'],
    },
    {
      icon: Server,
      title: 'الواجهة الخلفية',
      color: 'green',
      items: ['Node.js', 'Express.js', 'RESTful APIs'],
    },
    {
      icon: Database,
      title: 'قواعد البيانات',
      color: 'orange',
      items: ['PostgreSQL', 'MongoDB', 'Redis Cache'],
    },
    {
      icon: Cloud,
      title: 'الاستضافة والأمان',
      color: 'pink',
      items: ['AWS Cloud', 'SSL Security', 'Payment Gateway'],
    },
  ];

  const developmentSteps = [
    { step: '1', title: 'التحليل والتصميم', duration: '4-6 أسابيع', color: 'blue' },
    { step: '2', title: 'تطوير الواجهة الخلفية', duration: '8-10 أسابيع', color: 'green' },
    { step: '3', title: 'تطوير التطبيقات', duration: '12-16 أسابيع', color: 'orange' },
    { step: '4', title: 'الاختبار والتجريب', duration: '4-6 أسابيع', color: 'yellow' },
    { step: '5', title: 'الإطلاق والدعم', duration: '2-4 أسابيع', color: 'pink' },
  ];

  const getColorClass = (color: string) => `bg-mindgrow-${color}`;

  return (
    <section id="technology" className="py-20 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            تقنيات متطورة وموثوقة
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
            نستخدم أحدث التقنيات لضمان الأداء العالي والأمان والقابلية للتوسع
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {technologies.map((tech, index) => (
            <Card key={index} className={`text-center p-6 bg-white border-2 border-${tech.color}-200 hover:border-${tech.color}-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
              <CardContent className="p-0">
                <div className={`${getColorClass(tech.color)} text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <tech.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{tech.title}</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  {tech.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-gray-50 px-4 py-2 rounded-xl font-semibold">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Development Process */}
        <div className="mt-20 bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-100">
          <h3 className="text-3xl font-black text-gray-900 mb-12 text-center">مراحل التطوير</h3>
          <div className="grid lg:grid-cols-5 gap-8">
            {developmentSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`${getColorClass(step.color)} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="font-black text-lg">{step.step}</span>
                </div>
                <h4 className="font-black text-gray-900 mb-2 text-lg">{step.title}</h4>
                <p className="text-sm text-gray-600 font-semibold">{step.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
