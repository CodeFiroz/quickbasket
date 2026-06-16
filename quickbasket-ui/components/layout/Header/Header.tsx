import {
  FlameIcon,
  HeartIcon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import Searchbar from "./Searchbar"

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
            <Link href={"/"} className="flex items-center gap-2 text-white">
              <div className="flex justify-center items-center size-12 bg-theme-secondary text-theme rounded-full">
                <ShoppingBasketIcon size={26} />
              </div>
              <span className="text-xl font-semibold">
                Quick<span className="text-theme-secondary">Basket</span>
              </span>
            </Link>

              <Searchbar />

            <div className="flex items-center gap-3">
              <button
                className="
                  flex justify-center items-center
                  size-12 rounded-full cursor-pointer relative
                  bg-theme-secondary text-theme
                "
              >
                <User2Icon size={22} />
              </button>

              <button
                className="
                  flex justify-center items-center
                  size-12 rounded-full cursor-pointer relative
                  bg-theme-light text-slate-200
                "
              >
                <HeartIcon size={22} />
                <span className="size-4 pt-1 flex justify-center items-center rounded-full text-xs font-semibold bg-theme-secondary absolute -top-1 right-0 text-theme">
                  0
                </span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  className="
                  flex justify-center items-center
                  size-12 rounded-full cursor-pointer relative
                  bg-theme-light text-slate-200
                "
                >
                  <ShoppingBagIcon size={22} />
                  <span className="size-4 pt-1 flex justify-center items-center rounded-full text-xs font-semibold bg-theme-secondary absolute -top-1 right-0 text-theme">
                    0
                  </span>
                </button>

                <div className="-space-y-2 text-white">
                  <h4 className="font-semibold text-xl">$0.00</h4>
                  <span className="text-xs text-slate-400 font-poppins">
                    Your cart
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
