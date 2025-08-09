import { useQuery } from '@tanstack/react-query';

export function useButtonLink(contentKey: string) {
  const { data: buttonLink, isLoading } = useQuery({
    queryKey: [`/api/admin/button-links/${contentKey}`],
    retry: false,
  });

  const getButtonAction = () => {
    if (!buttonLink || !buttonLink.isActive) {
      return null;
    }

    switch (buttonLink.linkType) {
      case 'external':
        return {
          type: 'external',
          action: () => window.open(buttonLink.externalUrl, '_blank'),
          href: buttonLink.externalUrl
        };
      case 'internal':
        return {
          type: 'internal',
          action: () => window.location.href = `/${buttonLink.internalPage}`,
          href: `/${buttonLink.internalPage}`
        };
      case 'section':
        return {
          type: 'section',
          action: () => {
            const element = document.getElementById(buttonLink.sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          },
          href: `#${buttonLink.sectionId}`
        };
      default:
        return null;
    }
  };

  return {
    buttonLink,
    isLoading,
    getButtonAction,
    hasAction: buttonLink && buttonLink.isActive
  };
}