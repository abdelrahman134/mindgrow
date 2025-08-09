import { useQuery } from "@tanstack/react-query";
import type { ContentItem } from "@shared/schema";
import { useLanguage } from "@/lib/i18n";

export function useContent(page?: string) {
  const { language } = useLanguage();
  
  const { data: content = [], isLoading, error } = useQuery({
    queryKey: page ? ['/api/admin/content', page] : ['/api/admin/content'],
    queryFn: async () => {
      const url = page ? `/api/admin/content?page=${page}` : '/api/admin/content';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      return response.json() as Promise<ContentItem[]>;
    },
    retry: false,
  });

  // Helper function to get content value by key
  const getContent = (key: string, fallback?: string): string => {
    const item = content.find(c => c.key === key);
    if (!item) return fallback || key;
    
    const value = language === 'ar' ? item.valueAr : item.valueEn;
    return value || fallback || key;
  };

  // Helper function to get content item by key
  const getContentItem = (key: string): ContentItem | undefined => {
    return content.find(c => c.key === key);
  };

  // Helper function to get all content for a category
  const getContentByCategory = (category: string): ContentItem[] => {
    return content.filter(c => c.category === category);
  };

  return {
    content,
    isLoading,
    error,
    getContent,
    getContentItem,
    getContentByCategory,
  };
}