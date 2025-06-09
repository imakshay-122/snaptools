import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

type NavItem = {
  href: string;
  label: string;
};

const navigationItems: NavItem[] = [
  { href: "/tools", label: "Tools" },
  { href: "/documentation", label: "Documentation" },
  { href: "/about", label: "About" },
  { href: "/donate", label: "Donate" },
];

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children, className, ...props }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground",
        className
      )}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};

const SiteNav = () => {
  return (
    <nav
      className="flex items-center space-x-6 md:space-x-8"
      role="navigation"
      aria-label="Main navigation"
    >
      {navigationItems.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default SiteNav;