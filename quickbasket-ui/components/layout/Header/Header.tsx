import { HeartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import MobileNav from "./MobileNav";
import CartButton from "./CartButton";
import NavLinks from "./NavLinks";
import type { NavMenu } from "./types";

const Header = () => {
  const navmenu: NavMenu = {
    leftNav: [
      { url: "/faq", name: "FAQ" },
      { url: "/account", name: "My account" },
      { url: "/about-us", name: "About us" },
      { url: "/contact", name: "Contact" },
    ],
    rightNav: [
      { url: "/track-order", name: "Track Order" },
      { url: "/wishlist", name: "Wishlist" },
      { url: "/shop", name: "Shop" },
    ],
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-40">
        {/* Top Navigation Bar */}
        <div className="border-b border-gray-100 bg-gray-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2">
              <NavLinks links={navmenu.leftNav} />
              <NavLinks links={navmenu.rightNav} isRight={true} />
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
              <span className="font-bold text-xl text-gray-900">QuickBasket</span>
            </Link>

            {/* Search Bar - Hidden on mobile (accessible via mobile nav) */}
            <div className="hidden md:block w-full max-w-md">
              <SearchBar />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button 
                className="hidden sm:flex size-10 justify-center items-center bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                aria-label="Wishlist"
              >
                <HeartIcon size={20} />
              </button>

              <button 
                className="hidden sm:flex size-10 justify-center items-center bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                aria-label="User Account"
              >
                <UserIcon size={20} />
              </button>

              <CartButton />
              <MobileNav />
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Spacer for mobile bottom nav */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default Header;