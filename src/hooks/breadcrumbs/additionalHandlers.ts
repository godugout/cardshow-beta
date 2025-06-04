
import { BreadcrumbItem, BreadcrumbHandlerProps } from './types';

export const handleTeamSegment = (props: BreadcrumbHandlerProps): BreadcrumbItem | null => {
  const { segment, currentPath, currentTeam } = props;
  
  if (segment.startsWith('team-') || (currentTeam && props.index === 1)) {
    return {
      label: currentTeam?.name || 'Team',
      href: currentPath,
      color: currentTeam?.primaryColor
    };
  }
  
  return null;
};

export const handleMainSection = (props: BreadcrumbHandlerProps): BreadcrumbItem | null => {
  const { segment, currentPath } = props;
  
  const sectionMap: Record<string, string> = {
    'dashboard': 'Dashboard',
    'cards': 'Cards',
    'collections': 'Collections',
    'teams': 'Teams',
    'admin': 'Admin',
    'settings': 'Settings'
  };
  
  if (sectionMap[segment]) {
    return {
      label: sectionMap[segment],
      href: currentPath
    };
  }
  
  return null;
};

export const handleComplexRoutes = (props: BreadcrumbHandlerProps): BreadcrumbItem | null => {
  const { segment, currentPath, pathSegments, index } = props;
  
  // Handle nested routes like /teams/123/members
  if (index > 1 && pathSegments[0] === 'teams') {
    const routeMap: Record<string, string> = {
      'members': 'Members',
      'settings': 'Settings',
      'cards': 'Cards'
    };
    
    if (routeMap[segment]) {
      return {
        label: routeMap[segment],
        href: currentPath
      };
    }
  }
  
  return null;
};
