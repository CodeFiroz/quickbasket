import { FlameIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const navmenu = {
    leftNav: [
      { name: "About us", url: "/about-us" },
      { name: "Contact", url: "/contact" },
      { name: "FAQ", url: "/faq" },
    ],
    rightNav: [
      { name: "My Account", url: "/account" },
      { name: "Track Order", url: "/track-order" },
      { name: "Help", url: "/help" },
    ],
  };

  return (
    <>
      <div className="bg-theme">
        <div className="w-full border-b border-white/10 p-2">
          <div className="container mx-auto px-5 flex justify-between items-center">
            <div className="flex items-center gap-5">
              {navmenu.leftNav.map((nav, idx) => (
                <Link
                  href={nav.url}
                  key={idx}
                  className="text-sm text-slate-200 font-medium hover:text-white"
                >
                  {nav.name}
                </Link>
              ))}
            </div>

            <div className="flex justify-center items-center gap-2">
              <FlameIcon size={18} className="text-theme-secondary" />
              <span className="text-sm text-theme-secondary">
                Order now and get it within 15 min.!
              </span>
            </div>

            <div className="flex items-center gap-5">
              {navmenu.rightNav.map((nav, idx) => (
                <Link
                  href={nav.url}
                  key={idx}
                  className="text-sm text-slate-200 font-medium hover:text-white"
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* // Top bar  */}

        <div className="w-full border-b border-white/10 p-2">
          <div className="container mx-auto px-5 flex justify-between items-center">

              <Link
                href={'/'}
                >
                    QuickBasket
                </Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
