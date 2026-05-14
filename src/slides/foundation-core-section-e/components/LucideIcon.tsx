// Small React shim for lucide-react icons addressed by string name.
//
// Section E content (`content.tsx`, ported from
// `claude-design-project/jsx/data.jsx`) carries icon names as strings such as
// `"GitMerge"` or `"MessageSquare"`. The original prototype rendered these
// via `lucide.createIcons()` against a global; in our React/TS codebase we
// resolve a string → component map at render time and let lucide-react own
// the SVG output.
//
// To add a new icon: import it from "lucide-react" and add it to ICONS.
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Archive,
  Beaker,
  BookOpen,
  Bot,
  Box,
  Brain,
  ChevronsRight,
  ChevronsRightLeft,
  Database,
  Droplets,
  Eye,
  FileText,
  GitMerge,
  Hammer,
  History,
  Layers,
  ListTree,
  Mail,
  MessageCircle,
  MessageSquare,
  Network,
  Package,
  Pin,
  Repeat,
  Server,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  Terminal,
  Triangle,
  TrendingDown,
  Users,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon as LucideIconType,
} from "lucide-react";

const ICONS: Record<string, LucideIconType> = {
  Activity,
  AlertCircle,
  AlertTriangle,
  Archive,
  Beaker,
  BookOpen,
  Bot,
  Box,
  Brain,
  ChevronsRight,
  ChevronsRightLeft,
  Database,
  Droplets,
  Eye,
  FileText,
  GitMerge,
  Hammer,
  History,
  Layers,
  ListTree,
  Mail,
  MessageCircle,
  MessageSquare,
  Network,
  Package,
  Pin,
  Repeat,
  Server,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  Terminal,
  Triangle,
  TrendingDown,
  Users,
  Workflow,
  Wrench,
  Zap,
};

export interface LucideIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export function LucideIcon({
  name,
  size = 18,
  color,
  className,
  strokeWidth,
}: LucideIconProps) {
  const Comp = ICONS[name];
  if (!Comp) return null;
  return (
    <Comp
      size={size}
      color={color}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
}
