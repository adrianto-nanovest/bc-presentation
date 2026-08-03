// PROTOTYPE gh#16 — throwaway. Local icon map so the prototype does not have to
// edit the shared LucideIcon shim (Boxes / Compass are not in it).
import { Shield, Boxes, Users, Compass, Workflow, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = { Shield, Boxes, Users, Compass, Workflow, Bot };

export function Icon({
  name,
  size = 22,
  strokeWidth = 1.5,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
}) {
  const C = MAP[name];
  if (!C) return null;
  return <C size={size} strokeWidth={strokeWidth} color="currentColor" />;
}
