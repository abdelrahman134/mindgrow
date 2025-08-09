import { useQuery } from "@tanstack/react-query";
import { 
  Star, Gift, Book, Trophy, Gamepad2, Heart, Sparkles, Play, Users, Target, Award, 
  Smile, Zap, ShoppingBag, UserCheck, Brush, BookOpen, Home, Sparkle, PiggyBank, 
  ShoppingCart, Settings, Eye, Shield, BarChart3, GraduationCap, Phone, Mail, 
  MapPin, MessageSquare, Building, Store, Package, TrendingUp, CreditCard, 
  PenTool, Shirt, Dumbbell, Palette, Calculator, Microscope, Globe, Activity,
  ClipboardCheck, Lightbulb, Info, Contact, Type
} from 'lucide-react';

// Available icons mapping
const AVAILABLE_ICONS = {
  // Basic Icons
  Star, Gift, Book, Trophy, Heart, Users, Target, Award, Home, Info, Type, Contact,
  
  // Activity Icons  
  Gamepad2, Sparkles, Play, ShoppingBag, UserCheck, Brush, BookOpen, Sparkle, 
  PiggyBank, ShoppingCart, Activity, ClipboardCheck,
  
  // Technical Icons
  Settings, Eye, Shield, BarChart3, Phone, Mail, MapPin, MessageSquare, Building,
  
  // Business Icons
  Store, Package, TrendingUp, CreditCard, GraduationCap,
  
  // Educational Icons
  PenTool, Calculator, Microscope, Globe, Lightbulb,
  
  // Lifestyle Icons
  Shirt, Dumbbell, Palette, Smile, Zap
} as const;

export type IconName = keyof typeof AVAILABLE_ICONS;

// Function to get icon component by name
export function getIconComponent(iconName: string) {
  return AVAILABLE_ICONS[iconName as IconName] || Star;
}

// Hook to get icons for a specific page and category
export function useIcons(page: string, category?: string) {
  const { data: icons, isLoading } = useQuery({
    queryKey: ['/api/admin/content', page, 'icons'],
    select: (data: any[]) => {
      const iconItems = data.filter(item => 
        item.type === 'icon' && 
        item.page === page &&
        (!category || item.category === category)
      );
      
      const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {};
      iconItems.forEach(item => {
        iconMap[item.key] = getIconComponent(item.valueEn || 'Star');
      });
      
      return iconMap;
    }
  });

  const getIcon = (key: string) => {
    return icons?.[key] || Star;
  };

  return { icons: icons || {}, getIcon, isLoading };
}

// Hook to get a specific icon by key
export function useIcon(key: string) {
  const { data: iconData, isLoading } = useQuery({
    queryKey: ['/api/admin/content', key, 'icon'],
    select: (data: any[]) => {
      const iconItem = data.find(item => 
        item.type === 'icon' && item.key === key
      );
      return iconItem ? getIconComponent(iconItem.valueEn || 'Star') : Star;
    }
  });

  return { IconComponent: iconData || Star, isLoading };
}