import { Plus, Eye, CreditCard, Check, Coins, ShoppingBag } from 'lucide-react';
import { STOCK_IMAGES } from '@/lib/constants';

const DetailedFeatures = () => {
  const parentFeatures = [
    {
      icon: Plus,
      title: 'إنشاء وإدارة المهام',
      description: 'تحديد المهام اليومية والأسبوعية مع تخصيص المكافآت المالية المناسبة',
      color: 'blue',
    },
    {
      icon: Eye,
      title: 'مراقبة ومراجعة الإنجاز',
      description: 'متابعة تقدم الأطفال ومراجعة المهام المكتملة قبل الموافقة',
      color: 'green',
    },
    {
      icon: CreditCard,
      title: 'إدارة المحفظة المالية',
      description: 'شحن المحفظة وإدارة مصروفات الأطفال بطريقة آمنة ومنضبطة',
      color: 'orange',
    },
  ];

  const childFeatures = [
    {
      icon: Check,
      title: 'إنجاز المهام التفاعلية',
      description: 'واجهة سهلة وممتعة لعرض المهام وتسجيل الإنجاز',
      color: 'green',
    },
    {
      icon: Coins,
      title: 'كسب وإدارة الأموال',
      description: 'متابعة الرصيد واستلام المكافآت عند إتمام المهام',
      color: 'pink',
    },
    {
      icon: ShoppingBag,
      title: 'التسوق الآمن',
      description: 'متجر مخصص للأطفال مع منتجات مناسبة ونظام شراء آمن',
      color: 'orange',
    },
  ];

  const getColorClasses = (color: string) => ({
    bg: `bg-mindgrow-${color}`,
    text: `text-mindgrow-${color}`,
  });

  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            مميزات متقدمة لكل مستخدم
          </h2>
        </div>

        {/* Parent Features */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-3xl">
              <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-8">
                <span className="text-mindgrow-blue">واجهة أولياء الأمور</span>
              </h3>
              <div className="space-y-6">
                {parentFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className={`${getColorClasses(feature.color).bg} text-white w-12 h-12 rounded-2xl flex items-center justify-center ml-4 flex-shrink-0 shadow-lg`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-2 text-lg">{feature.title}</h4>
                      <p className="text-gray-600 font-medium">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src={STOCK_IMAGES.parentsTaskManagement} 
                alt="Parents using mobile app for task management" 
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>

        {/* Child Features */}
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={STOCK_IMAGES.childrenEducationalApps} 
                alt="Children using educational apps" 
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
            <div className="order-1 lg:order-2 bg-gradient-to-br from-green-50 to-pink-50 p-8 rounded-3xl">
              <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-8">
                <span className="text-mindgrow-green">واجهة الأطفال</span>
              </h3>
              <div className="space-y-6">
                {childFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className={`${getColorClasses(feature.color).bg} text-white w-12 h-12 rounded-2xl flex items-center justify-center ml-4 flex-shrink-0 shadow-lg`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-2 text-lg">{feature.title}</h4>
                      <p className="text-gray-600 font-medium">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;
