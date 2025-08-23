import { useQuery } from "@tanstack/react-query";
import type { ContentItem } from "@shared/schema";
import { useLanguage } from "@/lib/i18n";

export function useContent(page?: string) {
  const { language } = useLanguage();
  
  // Fetch regular content
  const { data: content = [], isLoading: isContentLoading, error: contentError } = useQuery({
    // Always fetch the full content set; components use absolute keys like 'hero.title'
    queryKey: ['/api/content'],
    queryFn: async () => {
      console.log('[useContent] Fetching all content (page scoping disabled)');
      const url = '/api/content';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as ContentItem[];
        console.log(`[useContent] Fetched ${data.length} content items`, data);
        return data;
      } catch (error) {
        console.error('[useContent] Error fetching all content:', error);
        throw error;
      }
    },
    staleTime: 60_000, // cache for 1 minute
    retry: 1,
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

  // Helper to derive FAQs from the already-fetched content
  const getFaqs = (): ContentItem[] => {
    const byCategory = getContentByCategory('faq');
    if (byCategory.length > 0) return byCategory;
    // Fallback: keys containing 'faq'
    return content.filter(c => c.key?.toLowerCase().includes('faq'));
  };

  return {
    content,
    isLoading: isContentLoading,
    error: contentError,
    getContent,
    getContentItem,
    getContentByCategory,
    getFaqs,
  };
}