import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  Home, Settings, MessageSquare, Users, Store, ExternalLink, Eye, 
  Trash2, Edit, ChevronDown, ChevronRight, ChevronLeft, Type, Globe, Image, 
  Palette, Star, Calendar, Target, TrendingUp, ShoppingCart, 
  DollarSign, Award, BarChart3, Zap, Shield, Heart, BookOpen,
  Sparkles, Gift, Activity, Clock, Coffee, Briefcase, Lightbulb,
  Phone, Mail, MapPin, Crown, Save, X, GraduationCap, Building, 
  Info, Contact, Monitor, Link, MousePointer, Trophy, Smile, UserCheck,
  ShoppingBag, CreditCard, Smartphone, Package, TrendingUp as TrendingUpIcon,
  ClipboardCheck, Calculator, Microscope, Gamepad2, PenTool, Shirt, Dumbbell,
  CheckCircle, Languages, Play, Music, Paintbrush, Camera, Book,
  Globe2, Rocket, Diamond, Coins, CheckCircle2, Headphones, Megaphone, Plus,
  Shield as ShieldIcon,
  Key,
  Check
} from 'lucide-react';
import type { 
  ContactSubmission, 
  ContentItem, 
  TeamMember, 
  InsertContentItem,
  InsertTeamMember,
  HeaderSettings,
  FooterSettings,
  ButtonLink,
  InsertButtonLink
} from '@shared/schema';

// Available icons for selection - comprehensive list from all pages
const AVAILABLE_ICONS = {
  // Basic Icons
  Home, Users, Target, Star, Gift, Trophy, Award, Crown, Heart,
  
  // Education & Learning
  BookOpen, GraduationCap, Book, Calculator, Microscope, Globe, Globe2,
  Languages, ClipboardCheck, Lightbulb, Building,
  
  // Shopping & Commerce
  ShoppingCart, ShoppingBag, Store, Package, CreditCard, DollarSign,
  TrendingUp, BarChart3, Coins,
  
  // Technology & Digital
  Smartphone, Monitor, Settings, Eye, Activity, Zap, Shield,
  
  // Communication & Social
  Phone, Mail, MessageSquare, Contact, Info,
  
  // Activities & Entertainment
  Gamepad2, Music, Play, Camera, Paintbrush, PenTool, Palette,
  Shirt, Dumbbell, Sparkles, Smile,
  
  // Business & Professional
  Briefcase, Clock, Calendar, Coffee, TrendingUpIcon, Headphones,
  Megaphone, Rocket, Diamond, CheckCircle, CheckCircle2, UserCheck,
  
  // Navigation & UI
  MapPin, ExternalLink, Link, MousePointer, Image, Type
};

// Helper function to get icon component from name
function getIconComponent(iconName: string): React.ComponentType<{ className?: string }> {
  return AVAILABLE_ICONS[iconName as keyof typeof AVAILABLE_ICONS] || Star;
}

// Icon Selector Dialog Component
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
            اختر الأيقونة المناسبة من القائمة أدناه. الأيقونات مرتبة حسب الفئة لسهولة الاختيار
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Icons */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">أيقونات أساسية</h4>
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {[Home, Users, Target, Star, Gift, Trophy, Award, Crown, Heart].map((IconComponent) => {
                const name = Object.keys(AVAILABLE_ICONS).find(key => AVAILABLE_ICONS[key] === IconComponent);
                return (
                  <button
                    key={name}
                    onClick={() => {
                      onSelect(name!);
                      onClose();
                    }}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center gap-2 min-h-[70px] ${
                      currentIcon === name 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Education Icons */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">أيقونات تعليمية</h4>
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {[BookOpen, GraduationCap, Book, Calculator, Microscope, Globe, Globe2, Languages, ClipboardCheck, Lightbulb, Building].map((IconComponent) => {
                const name = Object.keys(AVAILABLE_ICONS).find(key => AVAILABLE_ICONS[key] === IconComponent);
                return (
                  <button
                    key={name}
                    onClick={() => {
                      onSelect(name!);
                      onClose();
                    }}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center gap-2 min-h-[70px] ${
                      currentIcon === name 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shopping Icons */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">أيقونات التسوق والتجارة</h4>
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {[ShoppingCart, ShoppingBag, Store, Package, CreditCard, DollarSign, TrendingUp, BarChart3, Coins].map((IconComponent) => {
                const name = Object.keys(AVAILABLE_ICONS).find(key => AVAILABLE_ICONS[key] === IconComponent);
                return (
                  <button
                    key={name}
                    onClick={() => {
                      onSelect(name!);
                      onClose();
                    }}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center gap-2 min-h-[70px] ${
                      currentIcon === name 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Technology Icons */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">أيقونات تقنية ورقمية</h4>
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {[Smartphone, Monitor, Settings, Eye, Activity, Zap, Shield].map((IconComponent) => {
                const name = Object.keys(AVAILABLE_ICONS).find(key => AVAILABLE_ICONS[key] === IconComponent);
                return (
                  <button
                    key={name}
                    onClick={() => {
                      onSelect(name!);
                      onClose();
                    }}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center gap-2 min-h-[70px] ${
                      currentIcon === name 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity Icons */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">أيقونات الأنشطة والترفيه</h4>
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {[Gamepad2, Music, Play, Camera, Paintbrush, PenTool, Palette, Shirt, Dumbbell, Sparkles, Smile].map((IconComponent) => {
                const name = Object.keys(AVAILABLE_ICONS).find(key => AVAILABLE_ICONS[key] === IconComponent);
                return (
                  <button
                    key={name}
                    onClick={() => {
                      onSelect(name!);
                      onClose();
                    }}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center gap-2 min-h-[70px] ${
                      currentIcon === name 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Communication Icons */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">أيقونات التواصل والاتصال</h4>
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {[Phone, Mail, MessageSquare, Contact, Info].map((IconComponent) => {
                const name = Object.keys(AVAILABLE_ICONS).find(key => AVAILABLE_ICONS[key] === IconComponent);
                return (
                  <button
                    key={name}
                    onClick={() => {
                      onSelect(name!);
                      onClose();
                    }}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center gap-2 min-h-[70px] ${
                      currentIcon === name 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Button Link Manager Component
function ButtonLinkManager({ contentKey }: { contentKey: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [linkData, setLinkData] = useState<Partial<InsertButtonLink>>({
    contentKey,
    linkType: 'external',
    externalUrl: '',
    internalPage: '',
    sectionId: '',
    isActive: true
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch existing button link
  const { data: existingLink, isLoading } = useQuery({
    queryKey: [`/api/admin/button-links/${contentKey}`],
    retry: false,
  });

  const createLinkMutation = useMutation({
    mutationFn: (data: InsertButtonLink) => 
      apiRequest('/api/admin/button-links', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/button-links/${contentKey}`] });
      setIsEditing(false);
      toast({
        title: "تم إنشاء الرابط بنجاح",
        description: "تم حفظ رابط الزر بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في الإنشاء",
        description: "حدث خطأ أثناء إنشاء رابط الزر",
        variant: "destructive",
      });
    },
  });

  const updateLinkMutation = useMutation({
    mutationFn: (data: Partial<InsertButtonLink>) => 
      apiRequest(`/api/admin/button-links/${existingLink?.id}`, { method: 'PATCH', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/button-links/${contentKey}`] });
      setIsEditing(false);
      toast({
        title: "تم التحديث بنجاح",
        description: "تم حفظ رابط الزر بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث رابط الزر",
        variant: "destructive",
      });
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: () => 
      apiRequest(`/api/admin/button-links/${existingLink?.id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/button-links/${contentKey}`] });
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف رابط الزر بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف رابط الزر",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (existingLink) {
      updateLinkMutation.mutate(linkData);
    } else {
      createLinkMutation.mutate(linkData as InsertButtonLink);
    }
  };

  const handleEdit = () => {
    if (existingLink) {
      setLinkData({
        contentKey: existingLink.contentKey,
        linkType: existingLink.linkType,
        externalUrl: existingLink.externalUrl || '',
        internalPage: existingLink.internalPage || '',
        sectionId: existingLink.sectionId || '',
        isActive: existingLink.isActive
      });
    }
    setIsEditing(true);
  };

  if (isLoading) {
    return <div className="text-sm text-gray-500">جاري التحميل...</div>;
  }

  return (
    <div className="border rounded-lg p-4 bg-blue-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Link className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-blue-900">إدارة رابط الزر</span>
        </div>
        {!isEditing && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleEdit}>
              <Edit className="h-3 w-3 ml-1" />
              {existingLink ? 'تعديل' : 'إضافة'}
            </Button>
            {existingLink && (
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => deleteLinkMutation.mutate()}
              >
                <Trash2 className="h-3 w-3 ml-1" />
                حذف
              </Button>
            )}
          </div>
        )}
      </div>

      {!isEditing && existingLink ? (
        <div className="space-y-2 text-sm">
          <div><strong>نوع الرابط:</strong> {existingLink.linkType === 'external' ? 'خارجي' : existingLink.linkType === 'internal' ? 'داخلي' : 'قسم'}</div>
          {existingLink.linkType === 'external' && existingLink.externalUrl && (
            <div><strong>الرابط الخارجي:</strong> {existingLink.externalUrl}</div>
          )}
          {existingLink.linkType === 'internal' && existingLink.internalPage && (
            <div><strong>الصفحة الداخلية:</strong> {existingLink.internalPage}</div>
          )}
          {existingLink.linkType === 'section' && existingLink.sectionId && (
            <div><strong>القسم:</strong> {existingLink.sectionId}</div>
          )}
        </div>
      ) : !isEditing ? (
        <div className="text-sm text-gray-500">لا يوجد رابط محدد لهذا الزر</div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="linkType">نوع الرابط</Label>
            <Select 
              value={linkData.linkType} 
              onValueChange={(value) => setLinkData({...linkData, linkType: value as 'external' | 'internal' | 'section'})}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الرابط" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="external">رابط خارجي</SelectItem>
                <SelectItem value="internal">صفحة داخلية</SelectItem>
                <SelectItem value="section">قسم في الصفحة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {linkData.linkType === 'external' && (
            <div>
              <Label htmlFor="externalUrl">الرابط الخارجي</Label>
              <Input
                id="externalUrl"
                value={linkData.externalUrl}
                onChange={(e) => setLinkData({...linkData, externalUrl: e.target.value})}
                placeholder="https://example.com"
                dir="ltr"
              />
            </div>
          )}

          {linkData.linkType === 'internal' && (
            <div>
              <Label htmlFor="internalPage">الصفحة الداخلية</Label>
              <Select 
                value={linkData.internalPage} 
                onValueChange={(value) => setLinkData({...linkData, internalPage: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصفحة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">الرئيسية</SelectItem>
                  <SelectItem value="parents">الأباء</SelectItem>
                  <SelectItem value="sellers">البائعين</SelectItem>
                  <SelectItem value="teachers">المعلمين</SelectItem>
                  <SelectItem value="about">من نحن</SelectItem>
                  <SelectItem value="contact">اتصل بنا</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {linkData.linkType === 'section' && (
            <div>
              <Label htmlFor="sectionId">معرف القسم</Label>
              <Input
                id="sectionId"
                value={linkData.sectionId}
                onChange={(e) => setLinkData({...linkData, sectionId: e.target.value})}
                placeholder="#hero, #features, #contact"
                dir="ltr"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <Switch 
              checked={linkData.isActive}
              onCheckedChange={(checked) => setLinkData({...linkData, isActive: checked})}
            />
            <Label>الرابط نشط</Label>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={createLinkMutation.isPending || updateLinkMutation.isPending}>
              <Save className="h-3 w-3 ml-1" />
              حفظ
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="h-3 w-3 ml-1" />
              إلغاء
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Header Manager Component
function HeaderManager() {
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch header settings
  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ['/api/admin/header-settings'],
    retry: false,
  });

  const updateHeaderMutation = useMutation({
    mutationFn: (data: Partial<HeaderSettings>) => 
      apiRequest('/api/admin/header-settings', { method: 'PATCH', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/header-settings'] });
      toast({
        title: "تم التحديث بنجاح",
        description: "تم حفظ إعدادات الهيدر بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء حفظ إعدادات الهيدر",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (headerSettings) {
      updateHeaderMutation.mutate(headerSettings);
    }
  };

  const togglePageVisibility = (page: string) => {
    if (!headerSettings?.showPages) return;
    const pages = typeof headerSettings.showPages === 'string' 
      ? JSON.parse(headerSettings.showPages) 
      : headerSettings.showPages;
    
    setHeaderSettings({
      ...headerSettings,
      showPages: {
        ...pages,
        [page]: !pages[page]
      }
    });
  };

  // Initialize settings when data is loaded
  if (settings && !headerSettings && !settingsLoading) {
    setHeaderSettings(settings);
  }

  if (settingsLoading || !headerSettings) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const pages = typeof headerSettings.showPages === 'string' 
    ? JSON.parse(headerSettings.showPages) 
    : headerSettings.showPages || {};

  return (
    <div className="space-y-6">
      {/* Logo Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="logoUrl">رابط اللوجو</Label>
          <Input
            id="logoUrl"
            value={headerSettings.logoUrl || ''}
            onChange={(e) => setHeaderSettings({...headerSettings, logoUrl: e.target.value})}
            placeholder="https://example.com/logo.png"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logoSize">حجم اللوجو</Label>
          <Select 
            value={headerSettings.logoSize || 'medium'} 
            onValueChange={(value) => setHeaderSettings({...headerSettings, logoSize: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">صغير</SelectItem>
              <SelectItem value="medium">متوسط</SelectItem>
              <SelectItem value="large">كبير</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Page Visibility Settings */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">إظهار/إخفاء الصفحات</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { key: 'home', label: 'الرئيسية' },
            { key: 'parents', label: 'الأباء' },
            { key: 'sellers', label: 'البائعين' },
            { key: 'teachers', label: 'المعلمين' },
            { key: 'about', label: 'من نحن' },
            { key: 'contact', label: 'تواصل معنا' }
          ].map(page => (
            <div key={page.key} className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor={`page-${page.key}`} className="text-sm">{page.label}</Label>
              <Switch
                id={`page-${page.key}`}
                checked={pages[page.key] || false}
                onCheckedChange={() => togglePageVisibility(page.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Language Switcher Setting */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <Label htmlFor="showLanguageSwitcher" className="text-lg font-semibold">
            إظهار مبدل اللغة
          </Label>
          <p className="text-sm text-gray-500">السماح للمستخدمين بتغيير اللغة</p>
        </div>
        <Switch
          id="showLanguageSwitcher"
          checked={headerSettings.showLanguageSwitcher || false}
          onCheckedChange={(checked) => setHeaderSettings({...headerSettings, showLanguageSwitcher: checked})}
        />
      </div>

      {/* Button Settings */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">إعدادات الزر</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buttonUrl">رابط الزر</Label>
            <Input
              id="buttonUrl"
              value={headerSettings.buttonUrl || ''}
              onChange={(e) => setHeaderSettings({...headerSettings, buttonUrl: e.target.value})}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buttonTextAr">نص الزر (عربي)</Label>
            <Input
              id="buttonTextAr"
              value={headerSettings.buttonTextAr || ''}
              onChange={(e) => setHeaderSettings({...headerSettings, buttonTextAr: e.target.value})}
              placeholder="تحميل التطبيق"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buttonTextEn">نص الزر (إنجليزي)</Label>
            <Input
              id="buttonTextEn"
              value={headerSettings.buttonTextEn || ''}
              onChange={(e) => setHeaderSettings({...headerSettings, buttonTextEn: e.target.value})}
              placeholder="Download App"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={updateHeaderMutation.isPending}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {updateHeaderMutation.isPending ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>
    </div>
  );
}

// Footer Manager Component
function FooterManager() {
  const [footerSettings, setFooterSettings] = useState<FooterSettings | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch footer settings
  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ['/api/admin/footer-settings'],
    retry: false,
  });

  const updateFooterMutation = useMutation({
    mutationFn: (data: Partial<FooterSettings>) => 
      apiRequest('/api/admin/footer-settings', { method: 'PATCH', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/footer-settings'] });
      toast({
        title: "تم التحديث بنجاح",
        description: "تم حفظ إعدادات الفوتر بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء حفظ إعدادات الفوتر",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (footerSettings) {
      updateFooterMutation.mutate(footerSettings);
    }
  };

  const togglePageVisibility = (page: string) => {
    if (!footerSettings?.showPages) return;
    const pages = typeof footerSettings.showPages === 'string' 
      ? JSON.parse(footerSettings.showPages) 
      : footerSettings.showPages;
    
    setFooterSettings({
      ...footerSettings,
      showPages: {
        ...pages,
        [page]: !pages[page]
      }
    });
  };

  // Initialize settings when data is loaded
  if (settings && !footerSettings && !settingsLoading) {
    setFooterSettings(settings);
  }

  if (settingsLoading || !footerSettings) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const pages = typeof footerSettings.showPages === 'string' 
    ? JSON.parse(footerSettings.showPages) 
    : footerSettings.showPages || {};

  return (
    <div className="space-y-6">
      {/* Logo Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="footerLogoUrl">رابط اللوجو</Label>
          <Input
            id="footerLogoUrl"
            value={footerSettings.logoUrl || ''}
            onChange={(e) => setFooterSettings({...footerSettings, logoUrl: e.target.value})}
            placeholder="https://example.com/logo.png"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="footerLogoSize">حجم اللوجو</Label>
          <Select 
            value={footerSettings.logoSize || 'medium'} 
            onValueChange={(value) => setFooterSettings({...footerSettings, logoSize: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">صغير</SelectItem>
              <SelectItem value="medium">متوسط</SelectItem>
              <SelectItem value="large">كبير</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Page Visibility Settings */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">إظهار/إخفاء صفحات الفوتر</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: 'home', label: 'الرئيسية' },
            { key: 'parents', label: 'الأباء' },
            { key: 'sellers', label: 'البائعين' },
            { key: 'teachers', label: 'المعلمين' },
            { key: 'about', label: 'من نحن' },
            { key: 'contact', label: 'تواصل معنا' },
            { key: 'privacy', label: 'الخصوصية' },
            { key: 'terms', label: 'الشروط' }
          ].map(page => (
            <div key={page.key} className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor={`footer-page-${page.key}`} className="text-sm">{page.label}</Label>
              <Switch
                id={`footer-page-${page.key}`}
                checked={pages[page.key] || false}
                onCheckedChange={() => togglePageVisibility(page.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Social Links Setting */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <Label htmlFor="showSocialLinks" className="text-lg font-semibold">
            إظهار روابط التواصل الاجتماعي
          </Label>
          <p className="text-sm text-gray-500">عرض أيقونات وسائل التواصل الاجتماعي</p>
        </div>
        <Switch
          id="showSocialLinks"
          checked={footerSettings.showSocialLinks || false}
          onCheckedChange={(checked) => setFooterSettings({...footerSettings, showSocialLinks: checked})}
        />
      </div>

      {/* Copyright and Contact Information */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">معلومات حقوق الطبع والتواصل</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="copyrightAr">نص حقوق الطبع (عربي)</Label>
            <Textarea
              id="copyrightAr"
              value={footerSettings.copyrightTextAr || ''}
              onChange={(e) => setFooterSettings({...footerSettings, copyrightTextAr: e.target.value})}
              placeholder="جميع الحقوق محفوظة لشركة مايندجرو ©"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="copyrightEn">نص حقوق الطبع (إنجليزي)</Label>
            <Textarea
              id="copyrightEn"
              value={footerSettings.copyrightTextEn || ''}
              onChange={(e) => setFooterSettings({...footerSettings, copyrightTextEn: e.target.value})}
              placeholder="All rights reserved to MindGrow Company ©"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactPhone">رقم الهاتف</Label>
            <Input
              id="contactPhone"
              value={footerSettings.contactPhone || ''}
              onChange={(e) => setFooterSettings({...footerSettings, contactPhone: e.target.value})}
              placeholder="+974-6601-8814"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">البريد الإلكتروني</Label>
            <Input
              id="contactEmail"
              value={footerSettings.contactEmail || ''}
              onChange={(e) => setFooterSettings({...footerSettings, contactEmail: e.target.value})}
              placeholder="support@mindgrow.pro"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactAddressAr">العنوان (عربي)</Label>
            <Input
              id="contactAddressAr"
              value={footerSettings.contactAddressAr || ''}
              onChange={(e) => setFooterSettings({...footerSettings, contactAddressAr: e.target.value})}
              placeholder="الدوحة، دولة قطر"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactAddressEn">العنوان (إنجليزي)</Label>
          <Input
            id="contactAddressEn"
            value={footerSettings.contactAddressEn || ''}
            onChange={(e) => setFooterSettings({...footerSettings, contactAddressEn: e.target.value})}
            placeholder="Doha, State of Qatar"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={updateFooterMutation.isPending}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {updateFooterMutation.isPending ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>
    </div>
  );
}

// Team Manager Component  
function TeamManager() {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [memberData, setMemberData] = useState<Partial<InsertTeamMember>>({
    name: '',
    position: '',
    bio: '',
    imageUrl: '',
    email: '',
    phone: '',
    isActive: true,
    order: 0
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch team members
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['/api/admin/team'],
    retry: false,
  });

  const createMemberMutation = useMutation({
    mutationFn: (data: InsertTeamMember) => 
      apiRequest('/api/admin/team', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/team'] });
      setIsCreating(false);
      setMemberData({ name: '', position: '', bio: '', imageUrl: '', email: '', phone: '', isActive: true, order: 0 });
      toast({
        title: "تم إنشاء عضو الفريق بنجاح",
        description: "تم إضافة عضو جديد للفريق",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في الإنشاء",
        description: "حدث خطأ أثناء إضافة عضو الفريق",
        variant: "destructive",
      });
    },
  });

  const updateMemberMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertTeamMember> }) => 
      apiRequest(`/api/admin/team/${id}`, { method: 'PATCH', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/team'] });
      setEditingMember(null);
      toast({
        title: "تم التحديث بنجاح",
        description: "تم حفظ بيانات عضو الفريق",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث بيانات العضو",
        variant: "destructive",
      });
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/admin/team/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/team'] });
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف عضو الفريق",
      });
    },
    onError: () => {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف عضو الفريق",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setMemberData({
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      imageUrl: member.imageUrl || '',
      email: member.email || '',
      phone: member.phone || '',
      isActive: member.isActive,
      order: member.order || 0
    });
  };

  const handleSave = () => {
    if (editingMember) {
      updateMemberMutation.mutate({ id: editingMember.id, data: memberData });
    } else if (isCreating) {
      createMemberMutation.mutate(memberData as InsertTeamMember);
    }
  };

  const handleCancel = () => {
    setEditingMember(null);
    setIsCreating(false);
    setMemberData({ name: '', position: '', bio: '', imageUrl: '', email: '', phone: '', isActive: true, order: 0 });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">إدارة أعضاء الفريق</h3>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2"
          disabled={isCreating}
        >
          <Plus className="h-4 w-4" />
          إضافة عضو جديد
        </Button>
      </div>

      {/* Create/Edit Form */}
      {(editingMember || isCreating) && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">
                {editingMember ? 'تعديل عضو الفريق' : 'إضافة عضو جديد'}
              </h4>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberName">الاسم *</Label>
                <Input
                  id="memberName"
                  value={memberData.name || ''}
                  onChange={(e) => setMemberData({...memberData, name: e.target.value})}
                  placeholder="اسم عضو الفريق"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="memberPosition">المنصب *</Label>
                <Input
                  id="memberPosition"
                  value={memberData.position || ''}
                  onChange={(e) => setMemberData({...memberData, position: e.target.value})}
                  placeholder="مدير تقني، مطور، مصمم..."
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="memberBio">النبذة الشخصية</Label>
                <Textarea
                  id="memberBio"
                  value={memberData.bio || ''}
                  onChange={(e) => setMemberData({...memberData, bio: e.target.value})}
                  placeholder="نبذة مختصرة عن عضو الفريق..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="memberImage">رابط الصورة</Label>
                <Input
                  id="memberImage"
                  value={memberData.imageUrl || ''}
                  onChange={(e) => setMemberData({...memberData, imageUrl: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="memberEmail">البريد الإلكتروني</Label>
                <Input
                  id="memberEmail"
                  type="email"
                  value={memberData.email || ''}
                  onChange={(e) => setMemberData({...memberData, email: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="memberPhone">رقم الهاتف</Label>
                <Input
                  id="memberPhone"
                  value={memberData.phone || ''}
                  onChange={(e) => setMemberData({...memberData, phone: e.target.value})}
                  placeholder="+974-1234-5678"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="memberActive"
                  checked={memberData.isActive || false}
                  onCheckedChange={(checked) => setMemberData({...memberData, isActive: checked})}
                />
                <Label htmlFor="memberActive">عضو نشط</Label>
              </div>
            </div>
            
            {/* Preview Image */}
            {memberData.imageUrl && (
              <div className="mt-4">
                <Label>معاينة الصورة</Label>
                <div className="mt-2">
                  <img 
                    src={memberData.imageUrl} 
                    alt="معاينة"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleCancel}>
                إلغاء
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!memberData.name || !memberData.position || createMemberMutation.isPending || updateMemberMutation.isPending}
              >
                <Save className="h-4 w-4 ml-1" />
                {editingMember ? 'حفظ التغييرات' : 'إضافة العضو'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member: TeamMember) => (
          <Card key={member.id} className="group hover:shadow-lg transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img 
                  src={member.imageUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face'} 
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 truncate">{member.name}</h4>
                      <p className="text-sm text-blue-600 font-medium">{member.position}</p>
                      {member.bio && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{member.bio}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(member)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteMemberMutation.mutate(member.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${member.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-xs text-gray-500">
                      {member.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teamMembers.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد أعضاء فريق</h3>
          <p className="text-gray-500 mb-4">ابدأ بإضافة أعضاء فريق العمل</p>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 ml-1" />
            إضافة عضو جديد
          </Button>
        </div>
      )}
    </div>
  );
}

// Home Page Content Manager Component
function HomePageContentManager({ content }: { content: ContentItem[] }) {
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [editedValues, setEditedValues] = useState({ valueAr: '', valueEn: '', icon: '' });
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateContentMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ContentItem> }) => 
      apiRequest(`/api/admin/content/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/content'] });
      toast({ title: "تم تحديث المحتوى بنجاح" });
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
      icon: item.valueEn || ''
    });
  };

  const handleIconSelect = (iconName: string) => {
    setEditedValues(prev => ({
      ...prev,
      icon: iconName
    }));
    
    // Auto-save for icon changes
    if (editingItem && editingItem.type === 'icon') {
      const updateData: Partial<ContentItem> = {
        valueAr: editedValues.valueAr,
        valueEn: iconName  // Save the icon name as valueEn
      };
      
      updateContentMutation.mutate({
        id: editingItem.id,
        data: updateData
      });
      
      setShowIconSelector(false);
    }
  };

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

  const pageContent = content;
  const currentPage = pageContent.length > 0 ? pageContent[0].page : 'home';
  
  const getCategoryOrder = (page: string) => {
    switch (page) {
      case 'home':
        return ['hero', 'features', 'main_features', 'activities', 'statistics'];
      case 'parents':
        return ['hero', 'features', 'steps', 'benefits', 'safety'];
      case 'sellers':
        return ['hero', 'features', 'steps', 'categories', 'benefits', 'success', 'requirements'];
      case 'teachers':
        return ['hero', 'features', 'steps', 'subjects', 'benefits', 'stats', 'requirements'];
      case 'about':
        return ['hero', 'mission', 'vision', 'values', 'story', 'team', 'stats'];
      case 'contact':
        return ['hero', 'info', 'form', 'faq', 'ways'];
      default:
        return ['hero', 'features', 'main_features', 'activities', 'statistics'];
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

  const orderedCategories = categoryOrder.filter(cat => groupedContent[cat]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hero': return Home;
      case 'features': return Settings;
      case 'main_features': return Star;
      case 'activities': return Users;
      case 'statistics': return BarChart3;
      case 'steps': return Target;
      case 'benefits': return Award;
      case 'safety': return Shield;
      case 'mission': return Target;
      case 'vision': return Eye;
      case 'values': return Shield;
      case 'story': return BookOpen;
      case 'team': return Users;
      case 'stats': return BarChart3;
      case 'info': return Info;
      case 'form': return Contact;
      case 'faq': return MessageSquare;
      case 'ways': return Phone;
      case 'categories': return GraduationCap;
      case 'success': return TrendingUp;
      case 'requirements': return Building;
      case 'subjects': return BookOpen;
      default: return Type;
    }
  };

  const getCategoryTitle = (category: string, page: string) => {
    if (page === 'parents') {
      switch (category) {
        case 'hero': return 'قسم البطل الرئيسي - الأباء (Hero Section - Parents)';
        case 'features': return 'مميزات خاصة للأباء (Special Features for Parents)';
        case 'steps': return 'كيف يعمل - خطوات الاستخدام (How it Works - Usage Steps)';
        case 'benefits': return 'فوائد للأباء (Benefits for Parents)';
        case 'safety': return 'الأمان والخصوصية (Safety & Privacy)';
        default: return category;
      }
    } else if (page === 'sellers') {
      switch (category) {
        case 'hero': return 'قسم البطل الرئيسي - البائعين (Hero Section - Sellers)';
        case 'features': return 'مميزات خاصة للبائعين (Special Features for Sellers)';
        case 'steps': return 'خطوات العمل للبائعين (Work Steps for Sellers)';
        case 'categories': return 'فئات المنتجات المتاحة (Available Product Categories)';
        case 'benefits': return 'فوائد للبائعين (Benefits for Sellers)';
        case 'success': return 'إحصائيات النجاح (Success Statistics)';
        case 'requirements': return 'متطلبات الانضمام (Joining Requirements)';
        default: return category;
      }
    } else if (page === 'teachers') {
      switch (category) {
        case 'hero': return 'قسم البطل الرئيسي - المعلمين (Hero Section - Teachers)';
        case 'features': return 'أدوات تعليمية متطورة (Advanced Educational Tools)';
        case 'steps': return 'كيف يعمل مايندجرو؟ (How MindGrow Works)';
        case 'subjects': return 'المواد الدراسية المتاحة (Available Subjects)';
        case 'benefits': return 'لماذا تختار مايندجرو (Why Choose MindGrow)';
        case 'stats': return 'نجاح المعلمين معنا (Teacher Success Stories)';
        case 'requirements': return 'متطلبات التسجيل (Registration Requirements)';
        default: return category;
      }
    } else if (page === 'about') {
      switch (category) {
        case 'hero': return 'قسم البطل الرئيسي - من نحن (Hero Section - About Us)';
        case 'mission': return 'رسالة الشركة (Company Mission)';
        case 'vision': return 'رؤية الشركة (Company Vision)';
        case 'values': return 'قيم الشركة (Company Values)';
        case 'story': return 'قصة الشركة (Company Story)';
        case 'team': return 'فريق العمل (Team Section)';
        case 'stats': return 'إحصائيات الشركة (Company Statistics)';
        default: return category;
      }
    } else if (page === 'contact') {
      switch (category) {
        case 'hero': return 'قسم البطل الرئيسي - تواصل معنا (Hero Section - Contact)';
        case 'info': return 'معلومات التواصل (Contact Information)';
        case 'form': return 'نموذج التواصل (Contact Form)';
        case 'faq': return 'الأسئلة الشائعة (FAQ Section)';
        case 'ways': return 'طرق التواصل (Contact Methods)';
        default: return category;
      }
    } else {
      switch (category) {
        case 'hero': return 'قسم البنر الرئيسي (Hero Banner Section)';
        case 'features': return 'قسم "كيف يعمل مايندجرو؟" (How Does MindGrow Work?)';
        case 'main_features': return 'المميزات الرئيسية الأربع (4 Main Features)';
        case 'activities': return 'أنواع المهام المختلفة (Different Task Types)';
        case 'statistics': return 'إحصائيات مايندجرو (MindGrow Statistics)';
        default: return category;
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
                  <CardTitle className="flex items-center justify-between text-lg w-full">
                    {isOpen ? (
                      <ChevronDown className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronLeft className="h-5 w-5 text-blue-600" />
                    )}
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {items.length} عنصر
                      </Badge>
                      <span>{getCategoryTitle(category, currentPage)}</span>
                      <IconComponent className="h-5 w-5 text-blue-600" />
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
                              {item.type === 'icon' ? (
                                <div className="flex items-center gap-1">
                                  {(() => {
                                    const IconComponent = getIconComponent(item.valueEn || '');
                                    return <IconComponent className="h-4 w-4 text-blue-600" />;
                                  })()}
                                  <Palette className="h-3 w-3 text-gray-400" />
                                </div>
                              ) : (
                                <Type className="h-4 w-4 text-gray-400" />
                              )}
                              <span className="font-medium text-sm text-gray-600">
                                {item.key}
                              </span>
                              <Badge variant="outline" className={`text-xs ${
                                item.type === 'icon' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''
                              }`}>
                                {item.type === 'icon' ? '🎨 أيقونة' : item.type}
                              </Badge>
                              {item.type === 'icon' && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingItem(item);
                                    setEditedValues({
                                      valueAr: item.valueAr || '',
                                      valueEn: item.valueEn || '',
                                      icon: item.valueEn || ''
                                    });
                                    setShowIconSelector(true);
                                  }}
                                  className="h-6 px-2 hover:bg-blue-50 text-blue-600 hover:text-blue-700"
                                >
                                  <Palette className="h-3 w-3" />
                                </Button>
                              )}
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
                                      onChange={(e) => setEditedValues(prev => ({...prev, valueAr: e.target.value}))}
                                      className="mt-1"
                                      dir="rtl"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium flex items-center gap-1">
                                      <Globe className="h-3 w-3" />
                                      المحتوى الإنجليزي
                                    </Label>
                                    {item.type === 'icon' ? (
                                      <div className="mt-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                          <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowIconSelector(true)}
                                            className="flex items-center gap-2"
                                          >
                                            <Palette className="h-4 w-4" />
                                            اختر أيقونة
                                          </Button>
                                          {editedValues.icon && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              {(() => {
                                                const IconComponent = getIconComponent(editedValues.icon);
                                                return <IconComponent className="h-4 w-4" />;
                                              })()}
                                              <span>{editedValues.icon}</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ) : (
                                      <Textarea
                                        value={editedValues.valueEn}
                                        onChange={(e) => setEditedValues(prev => ({...prev, valueEn: e.target.value}))}
                                        className="mt-1"
                                        dir="ltr"
                                      />
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                  <Button
                                    size="sm"
                                    onClick={handleSave}
                                    disabled={updateContentMutation.isPending}
                                  >
                                    <Save className="h-3 w-3 mr-1" />
                                    حفظ
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleCancel}
                                  >
                                    <X className="h-3 w-3 mr-1" />
                                    إلغاء
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                
                                {/* Button Link Management for button types */}
                                {item.type === 'button' && (
                                  <div className="mt-4">
                                    <ButtonLinkManager contentKey={item.key} />
                                  </div>
                                )}
                                
                                {(item.type === 'image' || item.type === 'icon') && (
                                  <div className="border-t pt-3">
                                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                      {item.type === 'image' ? <Image className="h-3 w-3" /> : <Palette className="h-3 w-3" />}
                                      {item.type === 'image' ? 'الصورة الحالية:' : 'الأيقونة الحالية:'}
                                    </span>
                                    {item.type === 'icon' ? (
                                      <div className="bg-gray-50 p-3 rounded border mt-1 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
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
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => {
                                            setEditingItem(item);
                                            setEditedValues({
                                              valueAr: item.valueAr || '',
                                              valueEn: item.valueEn || '',
                                              icon: item.valueEn || ''
                                            });
                                            setShowIconSelector(true);
                                          }}
                                          className="hover:bg-blue-50 hover:border-blue-300 flex items-center gap-1"
                                        >
                                          <Palette className="h-3 w-3" />
                                          تغيير الأيقونة
                                        </Button>
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

      <IconSelector
        currentIcon={editedValues.icon}
        onSelect={handleIconSelect}
        isOpen={showIconSelector}
        onClose={() => setShowIconSelector(false)}
      />
    </div>
  );
}

function UsersManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { data: users = [], isLoading } = useQuery({ queryKey: ['/api/admin/users'] });

  const createUser = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      apiRequest('/api/admin/users', { method: 'POST', body: data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      setEmail(""); setPassword("");
      toast({ title: 'تم إنشاء المستخدم بنجاح' });
    },
    onError: async (e: any) => {
      toast({ title: 'فشل الإنشاء', description: e?.message || 'خطأ', variant: 'destructive' });
    }
  });

  const deleteUser = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/users/${id}`, { method: 'DELETE' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({ title: 'تم حذف المستخدم بنجاح' });
    },
  });

  const updatePassword = useMutation({
    mutationFn: ({ id, password }: { id: number; password: string }) =>
      apiRequest(`/api/admin/users/${id}/password`, { method: 'PATCH', body: { password } }),
    onSuccess: () => {
      toast({ title: 'تم تحديث كلمة المرور بنجاح' });
      setUpdatingUserId(null);
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (e: any) => {
      toast({ 
        title: 'فشل التحديث', 
        description: e?.message || 'خطأ', 
        variant: 'destructive' 
      });
      setNewPassword("");
      setConfirmPassword("");
    }
  });
  
  const handleUpdatePassword = (userId: number) => {
    if (!newPassword) {
      toast({ 
        title: 'خطأ', 
        description: 'الرجاء إدخال كلمة مرور جديدة', 
        variant: 'destructive' 
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({ 
        title: 'خطأ', 
        description: 'كلمتا المرور غير متطابقتين', 
        variant: 'destructive' 
      });
      return;
    }
    
    updatePassword.mutate({ id: userId, password: newPassword });
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b cursor-pointer hover:from-gray-100 hover:to-blue-100 transition-colors">
        <CardTitle className="flex items-center gap-3 text-xl font-bold">
          <div className="p-2 bg-white/20 rounded-lg">
            <Shield className="h-6 w-6" />
          </div>
          إدارة المستخدمين
        </CardTitle>
        <CardDescription className="text-blue-100 text-base">
          إضافة مستخدمين جدد وإدارة كلمات المرور بسهولة
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        {/* Add User Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />
            إضافة مستخدم جديد
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userEmail" className="text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </Label>
              <Input 
                id="userEmail" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                dir="ltr" 
                placeholder="admin@example.com"
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userPassword" className="text-sm font-medium text-gray-700">
                كلمة المرور
              </Label>
              <Input 
                id="userPassword" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <div className="lg:col-span-2 flex items-end">
              <Button 
                onClick={() => createUser.mutate({ email, password })} 
                disabled={!email || !password || createUser.isPending}
                className="w-full lg:w-auto h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {createUser.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent ml-2" />
                    جاري الإنشاء...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة مستخدم
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Users List Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-600" />
              قائمة المستخدمين ({users.length})
            </h3>
          </div>
          
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-600 border-t-transparent" />
                  <p className="text-gray-500 font-medium">جاري تحميل المستخدمين...</p>
                </div>
              </div>
            ) : users.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">لا يوجد مستخدمون</h4>
                <p className="text-gray-500">ابدأ بإضافة مستخدم جديد من الأعلى</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((u: any, index: number) => (
                  <div key={u.id} className="group relative">
                    <div className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all duration-200 bg-white">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900" dir="ltr">{u.email}</div>
                          <div className="text-sm text-gray-500">مستخدم مسجل</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {updatingUserId === u.id ? (
                          <div className="flex flex-col gap-3 p-4 border border-blue-200 rounded-xl bg-blue-50 min-w-80">
                            <div className="space-y-3">
                              <Input
                                type="password"
                                placeholder="كلمة المرور الجديدة"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                              <Input
                                type="password"
                                placeholder="تأكيد كلمة المرور"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  setUpdatingUserId(null);
                                  setNewPassword("");
                                  setConfirmPassword("");
                                }}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                              >
                                <X className="h-4 w-4 ml-1" />
                                إلغاء
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleUpdatePassword(u.id)}
                                disabled={updatePassword.isPending}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                {updatePassword.isPending ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent ml-2" />
                                    جاري الحفظ...
                                  </>
                                ) : (
                                  <>
                                    <Check className="h-4 w-4 ml-1" />
                                    حفظ
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setUpdatingUserId(u.id);
                                setNewPassword("");
                                setConfirmPassword("");
                              }}
                              className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                            >
                              <Key className="h-4 w-4 ml-1" />
                              تحديث كلمة المرور
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => deleteUser.mutate(u.id)}
                              className="bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                              disabled={deleteUser.isPending}
                            >
                              {deleteUser.isPending ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { useLocation } from 'wouter';

export default function AdminDashboard() {
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [replyNotes, setReplyNotes] = useState("");
  const queryClient = useQueryClient();
  const [location, setLocation] = useLocation();

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setLocation('/admin-login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['/api/admin/contacts'],
  });

  const { data: content = [], isLoading: contentLoading } = useQuery({
    queryKey: ['/api/admin/content'],
  });

  const { data: team = [], isLoading: teamLoading } = useQuery({
    queryKey: ['/api/admin/team'],
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/contacts/${id}/read`, {
      method: 'PATCH',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      useToast().toast({ title: "تم تحديد الرسالة كمقروءة" });
    },
  });

  const markAsRepliedMutation = useMutation({
    mutationFn: ({ id, notes }: { id: number; notes?: string }) => apiRequest(`/api/admin/contacts/${id}/reply`, {
      method: 'PATCH',
      body: JSON.stringify({ notes }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      useToast().toast({ title: "تم تحديد الرسالة كمُجابة" });
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
      useToast().toast({ title: "تم حذف الرسالة" });
    },
  });

  const unreadCount = contacts.filter((c: ContactSubmission) => !c.isRead).length;
  const totalContacts = contacts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
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
              <Button onClick={handleLogout}>
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>

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

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              إدارة المحتوى
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              الهيدر والفوتر
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
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              إدارة المستخدمين
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Collapsible>
              <Card className="mb-6">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between w-full">
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <h3 className="text-lg font-semibold text-gray-900">
                            محتوى الصفحة الرئيسية
                          </h3>
                          <p className="text-sm text-gray-500 font-normal">
                            إدارة وتحرير محتوى الصفحة الرئيسية بالكامل
                          </p>
                        </div>
                        <Home className="h-6 w-6 text-blue-600" />
                      </div>
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

            <Collapsible>
              <Card className="mb-6">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between w-full">
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <h3 className="text-lg font-semibold text-gray-900">
                            محتوى صفحة الأباء
                          </h3>
                          <p className="text-sm text-gray-500 font-normal">
                            إدارة وتحرير محتوى صفحة الأباء بالكامل
                          </p>
                        </div>
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
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



            {/* Teachers Page Content Section */}
            <Collapsible>
              <Card className="mb-6">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between w-full">
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <h3 className="text-lg font-semibold text-gray-900">
                            محتوى صفحة المعلمين
                          </h3>
                          <p className="text-sm text-gray-500 font-normal">
                            إدارة وتحرير محتوى صفحة المعلمين بالكامل (7 أقسام)
                          </p>
                        </div>
                        <GraduationCap className="h-6 w-6 text-indigo-600" />
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <HomePageContentManager content={content.filter(item => item.page === 'teachers')} />
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* About Us Page Content Section */}
            <Collapsible>
              <Card className="mb-6">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between w-full">
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <h3 className="text-lg font-semibold text-gray-900">
                            محتوى صفحة من نحن
                          </h3>
                          <p className="text-sm text-gray-500 font-normal">
                            إدارة وتحرير محتوى صفحة من نحن بالكامل
                          </p>
                        </div>
                        <Info className="h-6 w-6 text-amber-600" />
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <HomePageContentManager content={content.filter(item => item.page === 'about')} />
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Contact Page Content Section */}
            <Collapsible>
              <Card className="mb-6">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between w-full">
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <h3 className="text-lg font-semibold text-gray-900">
                            محتوى صفحة تواصل معنا
                          </h3>
                          <p className="text-sm text-gray-500 font-normal">
                            إدارة وتحرير محتوى صفحة التواصل بالكامل
                          </p>
                        </div>
                        <Contact className="h-6 w-6 text-green-600" />
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <HomePageContentManager content={content.filter(item => item.page === 'contact')} />
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
                    <CardTitle className="flex items-center justify-between w-full">
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <h3 className="text-lg font-semibold text-gray-900">
                            محتوى صفحة البائعين
                          </h3>
                          <p className="text-sm text-gray-500 font-normal">
                            إدارة وتحرير محتوى صفحة البائعين بالكامل
                          </p>
                        </div>
                        <Store className="h-6 w-6 text-orange-600" />
                      </div>
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

          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <div className="space-y-6">
              {/* Header Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    إعدادات الهيدر
                  </CardTitle>
                  <CardDescription>
                    تحكم في شكل وعناصر الهيدر الظاهر في أعلى الموقع
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Header Management Component will be inserted here */}
                  <HeaderManager />
                </CardContent>
              </Card>

              {/* Footer Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    إعدادات الفوتر
                  </CardTitle>
                  <CardDescription>
                    تحكم في شكل وعناصر الفوتر الظاهر في أسفل الموقع
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Footer Management Component will be inserted here */}
                  <FooterManager />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  رسائل التواصل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>لا توجد رسائل تواصل حتى الآن</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {contacts.map((contact: ContactSubmission) => (
                        <Card key={contact.id} className={`${!contact.isRead ? 'bg-blue-50 border-blue-200' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-gray-900">{contact.fullName}</h3>
                                  {!contact.isRead && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                      جديد
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                  <p>البريد الإلكتروني: {contact.email}</p>
                                  <p>الهاتف: {contact.phone}</p>
                                </div>
                                <p className="text-gray-800 bg-gray-50 p-3 rounded border">
                                  {contact.message}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {!contact.isRead && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => markAsReadMutation.mutate(contact.id)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    تحديد كمقروء
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => deleteContactMutation.mutate(contact.id)}
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  حذف
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  إدارة الفريق
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TeamManager />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users">
            <UsersManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}