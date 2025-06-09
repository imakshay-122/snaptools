import { NavItem } from "@/data/navigation";
import { Link } from "react-router-dom";

interface QuickLinksProps {
  title?: string;
  links: NavItem[];
  className?: string;
}

const QuickLinks = ({ title, links, className = "" }: QuickLinksProps) => {
  return (
    <div className={className}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link 
              to={link.href} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;