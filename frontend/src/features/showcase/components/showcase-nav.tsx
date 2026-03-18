import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";

const links = [
  { href: "/showcase", label: "Overview" },
  { href: "/showcase/forms", label: "Forms" },
  { href: "/showcase/overlays", label: "Overlays" },
  { href: "/showcase/data-display", label: "Data display" },
];

export function ShowcaseNav() {
  const location = useLocation();

  return (
    <nav className="flex flex-wrap gap-2">
      {links.map((link) => {
        const isActive = location.pathname === link.href;

        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary hover:bg-accent",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
