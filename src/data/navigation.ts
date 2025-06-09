import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink extends NavItem {
  icon: LucideIcon;
}

export const quickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "#tools" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Donate", href: "/donate" },
  { label: "Documentation", href: "/documentation" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore Tools", href: "#tools" },
  { label: "Features", href: "#features" },
  { label: "Blog", href: "/blog" },
  { label: "Newsletter", href: "#newsletter" },
];