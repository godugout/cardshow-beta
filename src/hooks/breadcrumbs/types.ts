
import { Team } from '@/lib/types/teamTypes';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
}

export interface BreadcrumbHandlerProps {
  index: number;
  pathSegments: string[];
  segment: string;
  currentPath: string;
  currentTeam?: Team | null;
}
