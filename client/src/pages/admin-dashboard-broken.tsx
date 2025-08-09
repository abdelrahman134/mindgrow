import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  Eye, 
  CheckCircle, 
  MessageCircle, 
  Trash2, 
  Users, 
  MessageSquare, 
  Settings,
  Plus,
  Edit,
  ExternalLink,
  Mail,
  Calendar,
  Save,
  Home,
  Type,
  Image,
  Globe,
  Star,
  ChevronDown,
  ChevronRight,
  Upload,
  Palette,
  Clock,
  Target,
  Gift,
  Trophy,
  BookOpen,
  Lightbulb,
  Heart,
  Shield,
  Zap,
  Sparkles,
  Play,
  Music,
  Gamepad2,
  Puzzle,
  Paintbrush,
  Camera,
  Book,
  Calculator,
  Globe2,
  Rocket,
  Crown,
  Diamond,
  Coins,
  Award,
  CheckCircle2,
  X,
  BarChart,
  Store,
  TrendingUp,
  Headphones,
  DollarSign,
  Megaphone,
  BarChart3
} from "lucide-react";
import { format } from "date-fns";
import type { ContactSubmission, ContentItem, TeamMember } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

// Available icons for selection
const AVAILABLE_ICONS = {
  'Clock': Clock,
  'Target': Target,
  'Gift': Gift,
  'Trophy': Trophy,
  'BookOpen': BookOpen,
  'Lightbulb': Lightbulb,
  'Heart': Heart,
  'Shield': Shield,
  'Zap': Zap,
  'Sparkles': Sparkles,
  'Play': Play,
  'Music': Music,
  'Gamepad2': Gamepad2,
  'Puzzle': Puzzle,
  'Paintbrush': Paintbrush,
  'Camera': Camera,
  'Book': Book,
  'Calculator': Calculator,
  'Globe2': Globe2,
  'Rocket': Rocket,
  'Crown': Crown,
  'Diamond': Diamond,
  'Coins': Coins,
  'Award': Award,
  'CheckCircle2': CheckCircle2,
  'Star': Star,
  'Home': Home,
  'BarChart': BarChart,
  'Eye': Eye,
  'Settings': Settings,
  'Users': Users,
  'Store': Store,
  'TrendingUp': TrendingUp,
  'Headphones': Headphones,
  'DollarSign': DollarSign,
  'Megaphone': Megaphone,
  'BarChart3': BarChart3
};

// Icon Selector Component
function IconSelector({ 
  currentIcon, 
  onSelect, 
  isOpen, 
  onClose 
}: { 
  currentIcon: string;
  onSelect: (iconName: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            اختيار أيقونة جديدة
          </DialogTitle>
          <DialogDescription>
            اختر الأيقونة المناسبة من القائمة أدناه
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 p-4">
          {Object.entries(AVAILABLE_ICONS).map(([iconName, IconComponent]) => (
            <button
              key={iconName}
              onClick={() => {
                onSelect(iconName);
                onClose();
              }}
              className={`
                p-3 rounded-lg border-2 transition-all hover:scale-105 
                flex flex-col items-center gap-2 min-h-[80px]
                ${currentIcon === iconName 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }
              `}
            >
              <IconComponent className="h-6 w-6" />
              <span className="text-xs font-medium text-center leading-tight">
                {iconName}
              </span>
            </button>
          ))}
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Home Page Content Manager Component
function HomePageContentManager({ content }: { content: ContentItem[] }) {
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [editedValues, setEditedValues] = useState({
    valueAr: '',
    valueEn: '',
    icon: ''
  });
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [isHomeContentOpen, setIsHomeContentOpen] = useState(false); // Main section closed by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hero: true, // Hero section open by default
    features: false,
    main_features: false,
    activities: false
  });
  const queryClient = useQueryClient();

  const updateContentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ContentItem> }) => {
      // Ensure we're not double-stringifying by checking if data is already a string
      let requestBody = data;
      if (typeof data === 'string') {
        try {
          // If it's already a string, parse it first to avoid double stringification
          requestBody = JSON.parse(data);
        } catch (e) {
          console.error('Failed to parse data:', e);
          throw new Error('Invalid data format');
        }
      }
      
      console.log('Sending PATCH request with data:', requestBody);
      
      const response = await fetch(`/api/admin/content/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update content');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/content'] });
      toast({ 
        title: "نجح التحديث", 
        description: "تم تحديث المحتوى بنجاح"
      });
      setEditingItem(null);
      setEditedValues({ valueAr: '', valueEn: '', icon: '' });
    },
    onError: (error: any) => {
      console.error('Content update error:', error);
      toast({ 
        title: "فشل التحديث", 
        description: error?.message || "فشل في تحديث المحتوى",
        variant: "destructive" 
      });
    },
  });

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setEditedValues({
      valueAr: item.valueAr || '',
      valueEn: item.valueEn || '',
      icon: item.valueEn || '' // For icon items, the icon name is stored in valueEn
    });
  };

  const handleIconSelect = (iconName: string) => {
    setEditedValues(prev => ({
      ...prev,
      icon: iconName
    }));
  };

  // Helper function to get icon component from name
  const getIconComponent = (iconName: string) => {
    return AVAILABLE_ICONS[iconName as keyof typeof AVAILABLE_ICONS] || Star;
  };

  const handleSave = () => {
    if (!editingItem) return;
    
    const updateData: Partial<ContentItem> = {
      valueAr: editedValues.valueAr,
      valueEn: editingItem.type === 'icon' ? editedValues.icon : editedValues.valueEn
    };
    
    updateContentMutation.mutate({
      id: editingItem.id,
      data: updateData
    });
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditedValues({ valueAr: '', valueEn: '', icon: '' });
  };

  // Group content by category and page - use the passed content directly
  const pageContent = content;
  const currentPage = pageContent.length > 0 ? pageContent[0].page : 'home';
  
  // Category order based on page
  const getCategoryOrder = (page: string) => {
    switch (page) {
      case 'home':
        return ['hero', 'features', 'main_features', 'activities'];
      case 'parents':
        return ['hero', 'features', 'benefits'];
      case 'sellers':
        return ['hero', 'features', 'benefits'];
      default:
        return ['hero', 'features', 'main_features', 'activities'];
    }
  };
  
  const categoryOrder = getCategoryOrder(currentPage);
  
  const groupedContent = pageContent.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  // Sort grouped content by category order
  const orderedCategories = categoryOrder.filter(cat => groupedContent[cat]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hero': return Home;
      case 'features': return Settings;
      case 'main_features': return Star;
      case 'activities': return Users;
      default: return Type;
    }
  };

  const getCategoryTitle = (category: string, page: string) => {
    if (page === 'parents') {
      switch (category) {
        case 'hero': return 'قسم البطل الرئيسي - الأباء (Hero Section - Parents)';
        case 'features': return 'مميزات خاصة للأباء (Special Features for Parents)';
        case 'benefits': return 'فوائد للأباء (Benefits for Parents)';
        default: return category;
      }
    } else if (page === 'sellers') {
      switch (category) {
        case 'hero': return 'قسم البطل الرئيسي - البائعين (Hero Section - Sellers)';
        case 'features': return 'مميزات خاصة للبائعين (Special Features for Sellers)';
        case 'benefits': return 'فوائد للبائعين (Benefits for Sellers)';
        default: return category;
      }
    } else {
      switch (category) {
        case 'hero': return 'قسم البطل الرئيسي (Hero Section)';
        case 'features': return 'نظرة عامة على المميزات (Features Overview)';
        case 'main_features': return 'المميزات الرئيسية (Main Features)';
        case 'activities': return 'أنواع الأنشطة (Activity Types)';
        default: return category;
      }
    }
  };

  const getCategoryDescription = (category: string, page: string) => {
    if (page === 'parents') {
      switch (category) {
        case 'hero': return 'العنوان الرئيسي وأزرار التحميل للأباء';
        case 'features': return 'المميزات الأربعة الخاصة بالأباء (المراقبة، المكافآت، المهام، التقارير)';
        case 'benefits': return 'فوائد استخدام التطبيق للأباء';
        default: return '';
      }
    } else if (page === 'sellers') {
      switch (category) {
        case 'hero': return 'العنوان الرئيسي وأزرار الانضمام للبائعين';
        case 'features': return 'المميزات الأربعة الخاصة بالبائعين (العملاء، الإدارة، المكافآت، التحليلات)';
        case 'benefits': return 'فوائد الانضمام لشبكة البائعين';
        default: return '';
      }
    } else {
      switch (category) {
        case 'hero': return 'العنوان الرئيسي والأزرار والإحصائيات في أعلى الصفحة';
        case 'features': return 'الأقسام الثلاثة الرئيسية للتطبيقات (العائلة، البائعين، الإدارة)';
        case 'main_features': return 'المميزات الأربعة الرئيسية في صفحة الأطفال';
        case 'activities': return 'أنواع الأنشطة الستة المختلفة للأطفال';
        default: return '';
      }
    }
  };

  const toggleSection = (category: string) => {
    setOpenSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="space-y-6">
      {orderedCategories.map((category) => {
                  const items = groupedContent[category];
                  const IconComponent = getCategoryIcon(category);
                  const isOpen = openSections[category];
                  
                  return (
                    <Collapsible
                      key={category}
                      open={isOpen}
                      onOpenChange={() => toggleSection(category)}
                    >
                      <Card className="border border-gray-200 bg-white shadow-sm">
                        <CollapsibleTrigger asChild>
                          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b cursor-pointer hover:from-gray-100 hover:to-blue-100 transition-colors">
                            <CardTitle className="flex items-center gap-3 text-lg">
                              {isOpen ? (
                                <ChevronDown className="h-5 w-5 text-blue-600" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-blue-600" />
                              )}
                              <IconComponent className="h-5 w-5 text-blue-600" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span>{getCategoryTitle(category, currentPage)}</span>
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                    {items.length} عنصر
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 font-normal mt-1">
                                  {getCategoryDescription(category, currentPage)}
                                </p>
                              </div>
                            </CardTitle>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                              {items.map((item) => (
                                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Type className="h-4 w-4 text-gray-400" />
                                        <span className="font-medium text-sm text-gray-600">
                                          {item.key}
                                        </span>
                                        <Badge variant="outline" className="text-xs">
                                          {item.type}
                                        </Badge>
                                      </div>
                                  
                                  {item.description && (
                                    <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                                  )}

                                  {editingItem?.id === item.id ? (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  المحتوى العربي
                                </Label>
                                <Textarea
                                  value={editedValues.valueAr}
                                  onChange={(e) => setEditedValues(prev => ({
                                    ...prev,
                                    valueAr: e.target.value
                                  }))}
                                  className="mt-1"
                                  rows={3}
                                  dir="rtl"
                                />
                              </div>
                              <div>
                                <Label className="text-sm font-medium flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  English Content
                                </Label>
                                <Textarea
                                  value={editedValues.valueEn}
                                  onChange={(e) => setEditedValues(prev => ({
                                    ...prev,
                                    valueEn: e.target.value
                                  }))}
                                  className="mt-1"
                                  rows={3}
                                  dir="ltr"
                                />
                              </div>
                            </div>
                            
                            {(item.type === 'image' || item.type === 'icon') && (
                              <div className="space-y-3">
                                <div className="border border-dashed border-gray-300 rounded-lg p-4">
                                  <div className="flex items-center gap-3">
                                    <Upload className="h-5 w-5 text-gray-400" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-700">
                                        {item.type === 'image' ? 'تحديث الصورة' : 'تحديث الأيقونة'}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        اختر ملف جديد لتحديث {item.type === 'image' ? 'الصورة' : 'الأيقونة'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                
                                {item.type === 'icon' && (
                                  <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                                    <div className="flex items-center justify-between">
                                      <Label className="text-sm font-medium flex items-center gap-1">
                                        <Palette className="h-3 w-3" />
                                        الأيقونة المحددة
                                      </Label>
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setShowIconSelector(true)}
                                        className="text-xs"
                                      >
                                        <Palette className="h-3 w-3 mr-1" />
                                        اختيار أيقونة
                                      </Button>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                      {(() => {
                                        const IconComponent = getIconComponent(editedValues.icon || item.valueEn || '');
                                        return <IconComponent className="h-6 w-6 text-blue-600" />;
                                      })()}
                                      <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">
                                          {editedValues.icon || item.valueEn || 'لم يتم تحديد أيقونة'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          انقر على "اختيار أيقونة" لتغيير الأيقونة
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={handleSave}
                                disabled={updateContentMutation.isPending}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Save className="h-3 w-3 mr-1" />
                                حفظ التغييرات
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancel}
                              >
                                إلغاء
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  العربية:
                                </span>
                                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border mt-1" dir="rtl">
                                  {item.valueAr || 'لا يوجد محتوى عربي'}
                                </p>
                              </div>
                              <div>
                                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  English:
                                </span>
                                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border mt-1" dir="ltr">
                                  {item.valueEn || 'No English content'}
                                </p>
                              </div>
                            </div>
                            
                            {(item.type === 'image' || item.type === 'icon') && (
                              <div className="border-t pt-3">
                                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                  {item.type === 'image' ? <Image className="h-3 w-3" /> : <Palette className="h-3 w-3" />}
                                  {item.type === 'image' ? 'الصورة الحالية:' : 'الأيقونة الحالية:'}
                                </span>
                                {item.type === 'icon' ? (
                                  <div className="bg-gray-50 p-3 rounded border mt-1 flex items-center gap-3">
                                    {(() => {
                                      const IconComponent = getIconComponent(item.valueEn || '');
                                      return <IconComponent className="h-5 w-5 text-blue-600" />;
                                    })()}
                                    <div>
                                      <p className="text-sm font-medium text-gray-700">
                                        {item.valueEn || 'لم يتم تحديد أيقونة'}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        اسم الأيقونة من مكتبة Lucide React
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="bg-gray-50 p-3 rounded border mt-1">
                                    <p className="text-sm text-gray-600">
                                      رابط الصورة أو المسار
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {editingItem?.id !== item.id && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          تعديل
                        </Button>
                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  );
                })}

      {pageContent.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Home className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>لا يوجد محتوى لهذه الصفحة في قاعدة البيانات.</p>
          <p className="text-sm">يجب أن يتم تعبئة المحتوى تلقائياً.</p>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [replyNotes, setReplyNotes] = useState("");
  const queryClient = useQueryClient();

  // Contact submissions data
  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['/api/admin/contacts'],
  });

  // Content items data
  const { data: content = [], isLoading: contentLoading } = useQuery({
    queryKey: ['/api/admin/content'],
  });

  // Team members data
  const { data: team = [], isLoading: teamLoading } = useQuery({
    queryKey: ['/api/admin/team'],
  });

  // Contact mutations
  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/contacts/${id}/read`, {
      method: 'PATCH',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      toast({ title: "تم تحديد الرسالة كمقروءة" });
    },
  });

  const markAsRepliedMutation = useMutation({
    mutationFn: ({ id, notes }: { id: number; notes?: string }) => apiRequest(`/api/admin/contacts/${id}/reply`, {
      method: 'PATCH',
      body: JSON.stringify({ notes }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      toast({ title: "تم تحديد الرسالة كمُجابة" });
      setReplyNotes("");
      setSelectedContact(null);
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/contacts/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      toast({ title: "تم حذف الرسالة" });
    },
  });

  const unreadCount = contacts.filter((c: ContactSubmission) => !c.isRead).length;
  const totalContacts = contacts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم الإدارية</h1>
              <p className="text-gray-600 mt-1">إدارة محتوى موقع مايندجرو ورسائل التواصل</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <a href="/" target="_blank" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  عرض الموقع
                </a>
              </Button>
              <Button asChild>
                <a href="/api/logout">تسجيل الخروج</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">إجمالي الرسائل</p>
                  <p className="text-2xl font-bold text-gray-900">{totalContacts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Eye className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">غير مقروءة</p>
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Settings className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">عناصر المحتوى</p>
                  <p className="text-2xl font-bold text-gray-900">{content.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">أعضاء الفريق</p>
                  <p className="text-2xl font-bold text-gray-900">{team.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              إدارة المحتوى
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              رسائل التواصل
              {unreadCount > 0 && (
                <Badge variant="destructive" className="mr-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              إدارة الفريق
            </TabsTrigger>
          </TabsList>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            {/* Home Page Content Section */}
            <Collapsible>
              <Card className="mb-6">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Home className="h-6 w-6 text-blue-600" />
                        <div className="text-right">
                          <h3 className="text-lg font-semibold text-gray-900">
                            محتوى الصفحة الرئيسية
                          </h3>
                          <p className="text-sm text-gray-500 font-normal">
                            إدارة وتحرير محتوى الصفحة الرئيسية بالكامل
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <HomePageContentManager content={content.filter(item => item.page === 'home')} />
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Parents Page Content Section */}
            <Collapsible>
              <Card className="mb-6">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="h-6 w-6 text-purple-600" />
                        <div className="text-right">
                          <h3 className="text-lg font-semibold text-gray-900">
                            محتوى صفحة الأباء
                          </h3>
                          <p className="text-sm text-gray-500 font-normal">
                            إدارة وتحرير محتوى صفحة الأباء بالكامل
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <HomePageContentManager content={content.filter(item => item.page === 'parents')} />
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Sellers Page Content Section */}
            <Collapsible>
              <Card className="mb-6">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Store className="h-6 w-6 text-green-600" />
                        <div className="text-right">
                          <h3 className="text-lg font-semibold text-gray-900">
                            محتوى صفحة البائعين
                          </h3>
                          <p className="text-sm text-gray-500 font-normal">
                            إدارة وتحرير محتوى صفحة البائعين بالكامل
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <HomePageContentManager content={content.filter(item => item.page === 'sellers')} />
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Future sections for other pages will be added here */}
            <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              <Settings className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">أقسام إدارة الصفحات الأخرى ستُضاف هنا قريباً</p>
              <p className="text-xs mt-1">صفحات: من نحن، التواصل، المعلمين</p>
            </div>
          </TabsContent>
      
      {/* Icon Selector Dialog */}
      <IconSelector
        currentIcon={editedValues.icon}
        onSelect={handleIconSelect}
        isOpen={showIconSelector}
        onClose={() => setShowIconSelector(false)}
      />
    </div>
  );
}

export default function AdminDashboard() {
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [replyNotes, setReplyNotes] = useState("");
  const queryClient = useQueryClient();

  // Contact submissions data
  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['/api/admin/contacts'],
  });

  // Content items data
  const { data: content = [], isLoading: contentLoading } = useQuery({
    queryKey: ['/api/admin/content'],
  });

  // Team members data
  const { data: team = [], isLoading: teamLoading } = useQuery({
    queryKey: ['/api/admin/team'],
  });

  // Contact mutations
  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/contacts/${id}/read`, {
      method: 'PATCH',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      toast({ title: "تم تحديد الرسالة كمقروءة" });
    },
  });

  const markAsRepliedMutation = useMutation({
    mutationFn: ({ id, notes }: { id: number; notes?: string }) => apiRequest(`/api/admin/contacts/${id}/reply`, {
      method: 'PATCH',
      body: JSON.stringify({ notes }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      toast({ title: "تم تحديد الرسالة كمُجابة" });
      setReplyNotes("");
      setSelectedContact(null);
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/contacts/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      toast({ title: "تم حذف الرسالة" });
    },
  });

  const unreadCount = contacts.filter((c: ContactSubmission) => !c.isRead).length;
  const totalContacts = contacts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم الإدارية</h1>
              <p className="text-gray-600 mt-1">إدارة محتوى موقع مايندجرو ورسائل التواصل</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <a href="/" target="_blank" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  عرض الموقع
                </a>
              </Button>
              <Button asChild>
                <a href="/api/logout">تسجيل الخروج</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الرسائل</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalContacts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الرسائل غير المقروءة</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">عناصر المحتوى</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{content.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">أعضاء الفريق</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{team.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              رسائل التواصل
              {unreadCount > 0 && (
                <Badge variant="destructive" className="mr-1">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              إدارة المحتوى
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              إدارة الفريق
            </TabsTrigger>
          </TabsList>

          {/* Contact Submissions Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>رسائل نموذج التواصل</CardTitle>
                <CardDescription>
                  إدارة والرد على استفسارات العملاء
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <div className="text-center py-8">جاري تحميل الرسائل...</div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">لا توجد رسائل تواصل حتى الآن</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الاسم</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>الموضوع</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact: ContactSubmission) => (
                        <TableRow key={contact.id} className={!contact.isRead ? "bg-blue-50" : ""}>
                          <TableCell className="font-medium">{contact.fullName}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell className="max-w-xs truncate">{contact.subject || "بدون موضوع"}</TableCell>
                          <TableCell>{format(new Date(contact.createdAt!), "MMM dd, yyyy")}</TableCell>
                          <TableCell>
                            {contact.isReplied ? (
                              <Badge variant="default">تم الرد</Badge>
                            ) : contact.isRead ? (
                              <Badge variant="secondary">مقروءة</Badge>
                            ) : (
                              <Badge variant="destructive">جديدة</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedContact(contact);
                                      if (!contact.isRead) {
                                        markAsReadMutation.mutate(contact.id);
                                      }
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl" dir="rtl">
                                  <DialogHeader>
                                    <DialogTitle>تفاصيل الرسالة</DialogTitle>
                                    <DialogDescription>
                                      رسالة من {contact.fullName}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>الاسم الكامل</Label>
                                        <p className="text-sm text-gray-600">{contact.fullName}</p>
                                      </div>
                                      <div>
                                        <Label>البريد الإلكتروني</Label>
                                        <p className="text-sm text-gray-600">{contact.email}</p>
                                      </div>
                                      {contact.phone && (
                                        <div>
                                          <Label>الهاتف</Label>
                                          <p className="text-sm text-gray-600">{contact.phone}</p>
                                        </div>
                                      )}
                                      <div>
                                        <Label>الموضوع</Label>
                                        <p className="text-sm text-gray-600">{contact.subject || "بدون موضوع"}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label>الرسالة</Label>
                                      <div className="bg-gray-50 p-3 rounded-md mt-1">
                                        <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label>تاريخ الإرسال</Label>
                                      <p className="text-sm text-gray-600">{format(new Date(contact.createdAt!), "MMMM dd, yyyy 'at' HH:mm")}</p>
                                    </div>
                                    {contact.adminNotes && (
                                      <div>
                                        <Label>ملاحظات المسؤول</Label>
                                        <div className="bg-blue-50 p-3 rounded-md mt-1">
                                          <p className="text-sm">{contact.adminNotes}</p>
                                        </div>
                                      </div>
                                    )}
                                    {!contact.isReplied && (
                                      <div className="space-y-2">
                                        <Label htmlFor="replyNotes">ملاحظات الرد</Label>
                                        <Textarea
                                          id="replyNotes"
                                          placeholder="أضف ملاحظات عن ردك..."
                                          value={replyNotes}
                                          onChange={(e) => setReplyNotes(e.target.value)}
                                        />
                                        <Button 
                                          onClick={() => markAsRepliedMutation.mutate({ id: contact.id, notes: replyNotes })}
                                          disabled={markAsRepliedMutation.isPending}
                                        >
                                          <MessageCircle className="h-4 w-4 ml-2" />
                                          تحديد كمُجابة
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteContactMutation.mutate(contact.id)}
                                disabled={deleteContactMutation.isPending}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة محتوى الموقع</CardTitle>
                <CardDescription>
                  إدارة النصوص والصور والمحتوى الآخر عبر موقعك
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contentLoading ? (
                  <div className="text-center py-8">جاري تحميل المحتوى...</div>
                ) : (
                  <HomePageContentManager content={content} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Management Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>أعضاء الفريق</CardTitle>
                <CardDescription>
                  إدارة معلومات فريقك المعروضة في صفحة "من نحن"
                </CardDescription>
              </CardHeader>
              <CardContent>
                {teamLoading ? (
                  <div className="text-center py-8">جاري تحميل الفريق...</div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    واجهة إدارة الفريق قريباً...
                    <br />
                    <small>ستتيح لك إضافة وتعديل وحذف أعضاء الفريق</small>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>

  );
}