"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, CircleUserRound, LogOut, ShoppingCart, Menu, X } from "lucide-react";
import NavBar from "./Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { request } from "src/app/lib/api";
import { useAuth } from "src/app/components/AuthProvider";

export default function Header({ navItems }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  const handleLogout = async () => {
    try {
      await request("/api/logout", { method: "POST", auth: true });
      Cookies.remove("session_id", { path: "/" });
      setCartCount(0);
      logout();
      router.push("/");
    } catch (e) {
      throw new Error("Erreur lors du chargement des commandes");
    }
  };

  // ---------------- Search ----------------
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/product?search=${searchQuery}`);
        const data = await res.json();
        setSearchResults(data.data || []);
      } catch (err) {
        throw new Error("Erreur lors du chargement des commandes");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)) &&
        (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target))
      ) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-white px-4 py-3 sticky top-0 z-50 font-inter">
        <div className="max-w-7xl mx-auto">

          {/* Desktop */}
          <div className="hidden md:flex items-end mb-5 justify-between gap-4">
            <div className="flex-shrink-0">
              <Image src="/LOGO BLUE.png" alt="Logo" width={180} height={60} unoptimized />
            </div>

            {/* Search */}
            <div ref={desktopSearchRef} className="flex-1 max-w-lg mx-8 relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#006294]" />
                </div>
                <input
                  type="text"
                  placeholder="Que Cherchez-Vous ?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 h-6 bg-[#e6f0f6] font-medium rounded-lg placeholder-[#006294] focus:outline-none focus:ring-2 focus:ring-[#006294] text-sm text-[#006294]"
                />
              </div>

              {searchResults.length > 0 ? (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] max-h-60 overflow-y-auto">
                  <div className="py-2">
                    <div className="px-4 text-sm font-semibold text-gray-500">Produits</div>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id_product}
                        href={`/product/${product.name_product}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-[#F2FAFD] hover:text-[#006294] transition-colors duration-150 font-medium"
                        onClick={() => setSearchQuery("")}
                      >
                        {product.name_product}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                searchQuery.trim() !== "" && (
                  <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] px-4 py-2 text-gray-500 text-sm font-normal">
                    Aucun résultat trouvé
                  </div>
                )
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-2">
              <Link href="/cartClient" className="relative p-2 bg-[#006294] rounded-full flex items-center">
                <img src="/delivery.png" className="h-6 w-6" />
              </Link>
              <div className="flex space-x-2">
                {!isLoggedIn ? (
                  <Link href="/login" className="p-2 text-[#006294] hover:bg-[#e6f0f6] rounded-lg flex items-end">
                    <CircleUserRound className="h-6 w-6" />
                  </Link>
                ) : (
                  <button onClick={handleLogout} className="p-2 text-[#006294] hover:bg-[#e6f0f6] rounded-lg">
                    <LogOut className="h-6 w-6" />
                  </button>
                )}
                <Link href="/cartClient" className="relative p-2 text-[#006294] hover:bg-[#e6f0f6] rounded-lg flex items-end">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount == 0 && (
                    <span className="bg-[#006294] text-white text-xs ml-2 font-bold rounded-sm h-8 w-8 flex items-center justify-center border-2 border-white">
                      {1}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center justify-between">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
            <Image src="/LOGO BLUE.png" alt="Logo" width={120} height={40} unoptimized />
            <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search />
            </button>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div ref={mobileSearchRef} className="md:hidden mt-2 relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#006294]" />
                </div>
                <input
                  type="text"
                  placeholder="Recherche"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-[#006294] rounded-lg bg-white placeholder-[#C09200] focus:outline-none focus:ring-2 focus:ring-[#006294] text-base font-medium text-[#006294]"
                />
              </div>

              {searchResults.length > 0 ? (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id_product}
                      href={`/product/${product.name_product}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-[#F2FAFD] hover:text-[#006294] transition-colors duration-150 font-medium"
                      onClick={() => setSearchQuery("")}
                    >
                      {product.name_product}
                    </Link>
                  ))}
                </div>
              ) : (
                searchQuery.trim() !== "" && (
                  <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 px-4 py-2 text-gray-500 text-sm font-normal">
                    Aucun résultat trouvé
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </header>

      <NavBar navItems={navItems} isMobileMenuOpen={isMobileMenuOpen} />
    </>
  );
}
