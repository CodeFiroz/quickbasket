"use client";

import axios from "axios";
import { PackageIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

const Searchbar = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [categoriesData, setCategoriesData] = useState<Categories[]>([]);

  // Fetch data once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/data/category.json");
        setCategoriesData(response.data);
      } catch (err) {
        console.log("fetching errro :: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const categories = useMemo(() => {
    // Transform or compute derived data
    return categoriesData.map((category: any) => ({
      ...category,
      displayName: category.name.toUpperCase(),
      isActive: category.status === "active",
    }));
  }, [categoriesData]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
    
      <div className="w-full max-w-xl mx-auto relative">
        <div className="w-full flex justify-between items-center bg-white rounded-full p-3 gap-3">
          <SearchIcon size={20} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full font-poppins outline-0 border-0 text-slate-500 caret-theme text-sm"
            value={searchKey}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        {isFocused && (
          <div className="absolute w-full top-12 left-0 bg-white rounded-2xl p-2 border border-slate-100 drop-shadow-lg">
            {!isLoading && searchKey.length == 0 && (
              <div className="p-3">
                <p className="text-sm text-slate-400 mb-4">
                  Browse products by{" "}
                  <span className="text-theme">Popular Categories</span>
                </p>

                <div className="grid grid-cols-3 gap-4 lg:grid-cols-5">
                  {categories.map((c, idx) => (
                    <Link
                      href={`/${c.slug}`}
                      key={idx}
                      className="flex flex-col items-center gap-3 duration-200 hover:scale-95"
                    >
                      <div className="size-14 flex justify-center items-center bg-theme rounded-full">
                        <Image
                          src={c.image}
                          alt={c.name}
                          width={30}
                          height={30}
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-center text-xs text-gray-600">
                          {c.name}
                        </h4>
                      </div>
                    </Link>
                  ))}
                  {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3">
                    <div className="size-14 rounded-md bg-slate-200 animate-pulse"></div>
                    <div className="space-y-1">
                      <div className="w-30 h-3 rounded-sm bg-slate-200 animate-pulse"></div>
                    </div>
                  </div>
                ))} */}
                </div>
              </div>
            )}

            {!isLoading && searchKey.length > 0 && searchResult.length == 0 && (
              <div className="w-full flex justify-center items-center flex-col min-h-40">
                <PackageIcon size={58} className="text-slate-500" />
                <p className="text-sm mt-4 text-slate-500">
                  No Search result found
                </p>
              </div>
            )}

            {isLoading && searchKey.length > 0 && (
              <div className="p-3">
                <p className="text-sm text-slate-400 mb-4 line-clamp-1">
                  Search products for{" "}
                  <span className="text-theme">"{searchKey}"</span>
                </p>

                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-md bg-slate-200 animate-pulse"></div>
                  <div className="space-y-1">
                    <div className="w-60 h-3 rounded-sm bg-slate-200 animate-pulse"></div>
                    <div className="w-20 h-5 rounded-sm bg-slate-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
