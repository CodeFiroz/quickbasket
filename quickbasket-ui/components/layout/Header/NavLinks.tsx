import Link from "next/link";
import type { NavItem } from "./types";

interface NavLinksProps {
  links: NavItem[];
  isRight?: boolean;
}

const NavLinks = ({ links, isRight = false }: NavLinksProps) => {
  return (
    <div className={`hidden md:flex items-center gap-6 ${isRight ? '' : ''}`}>
      {links.map((nav, idx) => (
        <Link
          key={idx}
          href={nav.url}
          className="text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          {nav.name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;