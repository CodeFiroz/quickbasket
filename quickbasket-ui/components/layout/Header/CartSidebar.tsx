import { MinusIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import React from "react";

const CartSidebar = ({
  isOpen,
  onClose
}: any) => {
  return (
    <>
      <div className={`w-full h-screen duration-600 ease-in-out absolute top-0 ${isOpen ? 'right-0' : '-right-full'} z-50 bg-black/30`}>
        <div className={`w-sm lg:w-md bg-white h-screen absolute top-0 ease-in-out duration-1000 ${isOpen ? 'right-0' : '-right-full'}`}>
          <div className="p-5">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-3">
              <h4 className="font-poppins text-gray-700 font-medium">
                Your Cart
              </h4>

              <div 
                onClick={onClose}
              className="size-8 flex justify-center items-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer">
                <XIcon size={18} />
              </div>
            </div>

            <div className="flex gap-3 items-center p-3 border border-gray-100 rounded-lg">
              <div className="size-20 min-w-20 bg-slate-100 rounded-md"></div>

              <div>
                <p className="font-medium text-sm  line-clamp-1 text-gray-600 font-poppins">
                  iPhone 11 Pro max newly launched in market
                </p>
                <div className="flex items-center gap-2 my-1">
                  <span className="text-[10px] py-1 px-1.5 rounded-xs bg-slate-50 border border-gray-100 text-slate-600">
                    Ram : 128GB
                  </span>
                  <span className="text-[10px] py-1 px-1.5 rounded-xs bg-slate-50 border border-gray-100 text-slate-600">
                    Color : Cosmic Orange
                  </span>
                </div>

                <div className="w-full flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 bg-gray-100 p-1 border border-gray-200">
                      <button className="text-gray-500 hover:text-black cursor-pointer">
                        <MinusIcon size={12} />
                      </button>
                      <input
                        className="w-6 text-xs text-center text-gray-600"
                        type="text"
                        value={10}
                      />
                      <button className="text-gray-500 hover:text-black cursor-pointer">
                        <PlusIcon size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-600">
                      $120.00
                    </span>

                    <button className="text-xs size-6 bg-slate-100 text-slate-600 border border-slate-100 inline-flex justify-center items-center cursor-pointer">
                      <TrashIcon size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
