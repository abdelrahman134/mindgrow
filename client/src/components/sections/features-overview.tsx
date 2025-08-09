import { Users, Store, Settings, CheckSquare, Wallet, Bell, ShoppingCart, Package, TrendingUp, Truck, Star, UserCog, BarChart, Shield, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { STOCK_IMAGES } from '@/lib/constants';
import { useContent } from '@/hooks/useContent';

const FeaturesOverview = () => {
  const { getContent } = useContent('home');
  
  const features = [
    {
      id: 'family',
      icon: Users,
      title: getContent('feature.family.title', 'تطبيق الأسرة'),
      subtitle: getContent('feature.family.subtitle', 'للأطفال وأولياء الأمور'),
      color: 'blue',
      items: [
        { icon: CheckSquare, text: 'إدارة المهام والمكافآت', color: 'green' },
        { icon: Wallet, text: 'محفظة رقمية آمنة', color: 'blue' },
        { icon: Bell, text: 'إشعارات فورية', color: 'orange' },
        { icon: ShoppingCart, text: 'متجر خاص بالأطفال', color: 'pink' },
      ],
      image: STOCK_IMAGES.childrenTasks,
      bgGradient: 'from-blue-50 to-green-50',
    },
    {
      id: 'seller',
      icon: Store,
      title: getContent('feature.seller.title', 'تطبيق البائعين'),
      subtitle: getContent('feature.seller.subtitle', 'للمتاجر والتجار'),
      color: 'orange',
      items: [
        { icon: Package, text: 'إدارة المنتجات', color: 'orange' },
        { icon: TrendingUp, text: 'تقارير المبيعات', color: 'green' },
        { icon: Truck, text: 'إدارة الطلبات', color: 'blue' },
        { icon: Star, text: 'نظام التقييمات', color: 'yellow' },
      ],
      image: STOCK_IMAGES.childrenShopping,
      bgGradient: 'from-orange-50 to-yellow-50',
    },
    {
      id: 'admin',
      icon: Settings,
      title: getContent('feature.admin.title', 'لوحة التحكم'),
      subtitle: getContent('feature.admin.subtitle', 'للإدارة والمراقبة'),
      color: 'pink',
      items: [
        { icon: UserCog, text: 'إدارة المستخدمين', color: 'pink' },
        { icon: BarChart, text: 'التقارير والإحصائيات', color: 'blue' },
        { icon: Shield, text: 'أمان ومراقبة', color: 'green' },
        { icon: CreditCard, text: 'إدارة الماليات', color: 'orange' },
      ],
      image: STOCK_IMAGES.digitalWallet,
      bgGradient: 'from-purple-50 to-pink-50',
    },
  ];

  const getColorClass = (color: string, type: 'bg' | 'text') => {
    const prefix = type === 'bg' ? 'bg-mindgrow-' : 'text-mindgrow-';
    return `${prefix}${color}`;
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            {getContent('features.title', 'نظام متكامل من ثلاثة تطبيقات')}
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
            {getContent('features.subtitle', 'حل شامل يجمع بين أولياء الأمور والأطفال والبائعين في منصة واحدة آمنة ومتطورة')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className={`bg-white border-2 border-${feature.color}-200 hover:border-${feature.color}-400 hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className={`${getColorClass(feature.color, 'bg')} text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <feature.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 font-semibold">{feature.subtitle}</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  {feature.items.map((item, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <item.icon className={`${getColorClass(item.color, 'text')} ml-3 h-5 w-5`} />
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <img 
                    src={feature.image} 
                    alt={`${feature.title} demonstration`}
                    className="rounded-xl w-full h-48 object-cover shadow-lg"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
