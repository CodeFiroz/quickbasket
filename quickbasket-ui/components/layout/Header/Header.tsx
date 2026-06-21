"use client";

import {
  FlameIcon,
  HeartIcon,
  LayoutDashboardIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  StoreIcon,
  User2Icon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { useState } from "react";
import CartSidebar from "./CartSidebar";

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

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showCart, setShowcart] = useState<boolean>(false);

  return (
    <>
     <CartSidebar
          isOpen={showCart}
          onClose={()=> setShowcart(false)}
        />
      <div className="bg-theme">
        <div className="w-full border-b border-white/10 p-2">
          <div className="container mx-auto px-5 flex justify-center lg:justify-between items-center">
            <div className="hidden lg:flex items-center gap-5">
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

            <div className="hidden lg:flex items-center gap-5">
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
          <div className="container mx-auto px-2 lg:px-5 flex justify-between items-center">
            <Link href={"/"} className="flex items-center gap-2 text-white">
              <div className="flex justify-center items-center size-12 bg-theme-secondary text-theme rounded-full">
                <ShoppingBasketIcon size={26} />
              </div>
              <span className="text-xl font-semibold">
                Quick<span className="text-theme-secondary">Basket</span>
              </span>
            </Link>

            <div className="hidden w-full lg:flex">
              <Searchbar />
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <button
                className="
                  hidden lg:flex justify-center items-center
                  size-12 rounded-full cursor-pointer relative
                  bg-theme-secondary text-theme
                "
              >
                <User2Icon size={22} />
              </button>

              <button
                className="
                  hidden lg:flex justify-center items-center
                  size-12 rounded-full cursor-pointer relative
                  bg-theme-light text-slate-200
                "
              >
                <HeartIcon size={22} />
                <span className="size-4 flex justify-center items-center rounded-full text-xs font-semibold bg-theme-secondary absolute -top-1 right-0 text-theme">
                  0
                </span>
              </button>

              <button
                className="
                  flex justify-center items-center
                  size-12 rounded-full cursor-pointer relative
                  bg-theme-light text-slate-200
                "
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? <XIcon size={22} /> : <SearchIcon size={22} />}
              </button>

              <div 
                onClick={()=> setShowcart(true)}
              className="flex items-center gap-3">
                <button
                  className="
                  flex justify-center items-center
                  size-12 rounded-full cursor-pointer relative
                  bg-theme-light text-slate-200
                "
                >
                  <ShoppingBagIcon size={22} />
                  <span className="size-4  flex justify-center items-center rounded-full text-xs font-semibold bg-theme-secondary absolute -top-1 right-0 text-theme">
                    0
                  </span>
                </button>

                <div className="-space-y-2 text-white hidden lg:block">
                  <h4 className="font-semibold text-xl">$0.00</h4>
                  <span className="text-xs text-slate-400 font-poppins">
                    Your cart
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="lg:hidden flex p-2">
            <Searchbar />
          </div>
        )}
      </div>

      <div className="w-full block lg:hidden bg-white shadow-2xl border-t border-slate-100 fixed bottom-0 left-0 z-40 py-2 px-5">
        <div className="mx-auto grid grid-cols-5 gap-3">
          <button className="flex justify-center items-center flex-col gap-2">
            <StoreIcon size={24} className="text-gray-500" />
            <span className="text-xs text-gray-500">Home</span>
          </button>

          <button className="flex justify-center items-center flex-col gap-2">
            <LayoutDashboardIcon size={24} className="text-gray-500" />
            <span className="text-xs text-gray-500">Shop</span>
          </button>

          <button className="flex justify-center items-center flex-col gap-2">
            <MenuIcon size={24} className="text-gray-500" />
            <span className="text-xs text-gray-500">Menu</span>
          </button>

          <button className="flex justify-center items-center flex-col gap-2">
            <HeartIcon size={24} className="text-gray-500" />
            <span className="text-xs text-gray-500">Wishlist</span>
          </button>

          <button className="flex justify-center items-center flex-col gap-2">
            <User2Icon size={24} className="text-gray-500" />
            <span className="text-xs text-gray-500">Account</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
