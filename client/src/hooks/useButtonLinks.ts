import { useQuery } from "@tanstack/react-query";

export function useButtonLinks(contentKey: string) {
  const { data: buttonLink } = useQuery({
    queryKey: ["/api/admin/button-links/" + contentKey],
    retry: false,
  });

  const link = (buttonLink || {}) as Partial<{
    id: number;
    contentKey: string;
    linkType: 'external' | 'internal' | 'section';
    externalUrl?: string;
    internalPage?: string;
    sectionId?: string;
    isActive: boolean;
  }>;

  if (!link || link.isActive === false) {
    return { hasAction: false as const };
  }

  switch (link.linkType) {
    case 'external':
      return {
        hasAction: true as const,
        action: () => link.externalUrl && window.open(link.externalUrl, '_blank'),
        href: link.externalUrl
      };
    case 'internal':
      return {
        hasAction: true as const,
        action: () => link.internalPage && (window.location.href = `/${link.internalPage}`),
        href: link.internalPage ? `/${link.internalPage}` : undefined
      };
    case 'section':
      return {
        hasAction: true as const,
        action: () => {
          if (!link.sectionId) return;
          const element = document.getElementById(link.sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        },
        href: link.sectionId ? `#${link.sectionId}` : undefined
      };
    default:
      return { hasAction: false as const };
  }
}

export function useButtonLink(contentKey: string) {
  return useButtonLinks(contentKey);
}