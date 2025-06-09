import { LucideIcon } from "lucide-react";
import { ComponentType } from "react";

export interface SubTool {
  id: string;
  name: string;
  description: string;
  path: string;
  component: () => Promise<any>;
  icon: LucideIcon;
  hidden?: boolean;
}

export interface Tool {
  name: string;
  id: string;
  description: string;
  icon: LucideIcon;
  component?: ComponentType;
  keywords?: string[];
  category: string;
  tools?: SubTool[];
}