"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon, HomeIcon, ShoppingBag, HeartIcon, UserIcon, SearchIcon, LucideIcon } from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { icon: HomeIcon, label: "Home", href: "/" },
    { icon: SearchIcon, label: "Search", href: "/search" },
    { icon: ShoppingBag, label: "Cart", href: "/cart" },
    { icon: HeartIcon, label: "Wishlist", href: "/wishlist" },
    { icon: UserIcon, label: "Account", href: "/account" },
  ];

  const menuItems = {
    mainMenu: ["Shop", "FAQ", "About us", "Contact"],
    accountMenu: ["My account", "Track Order", "Wishlist"]
  };

  const formatHref = (item: string): string => {
    return `/${item.toLowerCase().replace(" ", "-")}`;
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Mobile Side Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl z-50 md:hidden transform transition-transform">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <ShoppingBag size={24} className="text-blue-600" />
                  <span className="font-bold text-xl">QuickBasket</span>
                </Link>
                <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <XIcon size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-3">MAIN MENU</p>
                  <div className="space-y-2">
                    {menuItems.mainMenu.map((item) => (
                      <Link
                        key={item}
                        href={formatHref(item)}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-3">ACCOUNT</p>
                  <div className="space-y-2">
                    {menuItems.accountMenu.map((item) => (
                      <Link
                        key={item}
                        href={formatHref(item)}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileNav;