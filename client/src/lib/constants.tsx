export const BRAND_COLORS = {
  green: 'var(--mindgrow-green)',
  blue: 'var(--mindgrow-blue)',
  orange: 'var(--mindgrow-orange)',
  yellow: 'var(--mindgrow-yellow)',
  pink: 'var(--mindgrow-pink)',
};

export const CONTACT_INFO = {
  phone: '+974-6601-8814',
  email: 'support@mindgrow.pro',
  location: 'قطر - الدوحة',
  website: 'https://mindgrow.pro/',
  whatsapp: '+974-6601-8814',
};

export const PRICING_PACKAGES = [
  {
    id: 'basic',
    name: 'الباقة الأساسية',
    subtitle: 'للشركات الناشئة',
    price: '150,000',
    duration: '6-8 أشهر تطوير',
    features: [
      'تطبيق الأسرة (iOS + Android)',
      'الواجهة الخلفية الأساسية',
      'لوحة تحكم بسيطة',
      'المحفظة الرقمية',
      '3 أشهر دعم فني',
    ],
    popular: false,
  },
  {
    id: 'professional',
    name: 'الباقة الاحترافية',
    subtitle: 'للشركات المتوسطة',
    price: '280,000',
    duration: '8-10 أشهر تطوير',
    features: [
      'جميع مميزات الباقة الأساسية',
      'تطبيق البائعين',
      'لوحة تحكم متقدمة',
      'نظام التقارير والإحصائيات',
      '6 أشهر دعم فني',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'الباقة المؤسسية',
    subtitle: 'للشركات الكبيرة',
    price: '450,000',
    duration: '10-12 شهر تطوير',
    features: [
      'جميع مميزات الباقة الاحترافية',
      'تخصيص كامل للتصميم',
      'تكامل مع أنظمة خارجية',
      'ذكاء اصطناعي وتحليلات متقدمة',
      '12 شهر دعم فني',
    ],
    popular: false,
  },
];

export const ADDITIONAL_SERVICES = [
  {
    icon: 'rocket',
    title: 'إطلاق سريع',
    description: 'تسريع عملية التطوير بـ 30%',
    price: '+25%',
  },
  {
    icon: 'palette',
    title: 'تصميم مخصص',
    description: 'هوية بصرية فريدة',
    price: '50,000 ريال',
  },
  {
    icon: 'wrench',
    title: 'صيانة شهرية',
    description: 'دعم مستمر وتحديثات',
    price: '5,000 ريال/شهر',
  },
  {
    icon: 'graduation-cap',
    title: 'تدريب الفريق',
    description: 'تدريب شامل لإدارة النظام',
    price: '15,000 ريال',
  },
];

export const STOCK_IMAGES = {
  familyUsingApps: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
  childrenTasks: 'https://images.unsplash.com/photo-1544717301-9cdcb1f5940f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250',
  childrenShopping: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250',
  digitalWallet: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250',
  parentsTaskManagement: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
  childrenEducationalApps: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
};
