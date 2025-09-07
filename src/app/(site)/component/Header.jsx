"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, User, LogOut, ShoppingCart, Menu, X } from "lucide-react";
import NavBar from "./Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { request, removeToken } from "src/app/lib/api";
import { useAuth } from "src/app/components/AuthProvider";

export default function Header({ navItems }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

const [cartCount,setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  // Logout
  const handleLogout = async () => {
  try {
    await request("/api/logout", { method: "POST", auth: true });
    // removeToken();  <-- supprime cette ligne
    Cookies.remove("session_id",{ path: "/" }); // supprime ton token ou session
setCartCount(0)
    logout();
    router.push("/");
  } catch (e) {
     throw new Error("Erreur lors du chargement des commandes");
  }
};
 function generateSessionId() {
      return crypto.randomUUID(); // ولا أي مولد UUID
    }
    
    // مدة صلاحية بالميلي ثانية (مثلا 15 دقيقة)
    const SESSION_TIMEOUT = 20 * 60 * 1000; 
    
    function setSession() {
      const sessionId = Cookies.get("session_id") || generateSessionId();
      const expiryTime = Date.now() + SESSION_TIMEOUT;
    
      Cookies.set("session_id", sessionId, { path: "/" });
      Cookies.set("session_expiry", expiryTime.toString(), { path: "/" });
    }
    
    // استرجاع session إلا مازال صالح
 
    
    // كلما المستخدم دار أي حركة (click / scroll / keypress) نجدد الوقت
 const  fetchCount= async (sessionId,token)=>{
   let res;

  if (token) {
    res = await fetch(`${API_BASE_URL}/api/count?session_user=${sessionId}`, {
      cache: "no-store",
      credentials: "include",
      headers: { "Authorization": `Bearer ${token}` },
    });
  } else {
    res = await fetch(`${API_BASE_URL}/api/count/notLogin?session_user=${sessionId}`, {
      cache: "no-store",
      credentials: "include",
    });
  }

  if (!res.ok) {
    const text = await res.text();
  
    throw new Error("Erreur lors du chargement des commandes");
  }

  const data = await res.json();
  
 setCartCount(data.countOfOrder)
 }
  useEffect(() => {
      setSession();
  
      const resetSessionTimer = () => {
        if (Cookies.get("session_id")) {
          const expiryTime = Date.now() + SESSION_TIMEOUT;
          Cookies.set("session_expiry", expiryTime.toString(), { path: "/" });
        }
      };
  
      ["click", "keypress", "mousemove", "scroll"].forEach(evt =>
        window.addEventListener(evt, resetSessionTimer)
      );
  
      const intervalId = setInterval(() => {
        const expiry = parseInt(Cookies.get("session_expiry") || "0");
        if (Date.now() > expiry) {
          // انتهت الصلاحية → حذف الكوكيز
          Cookies.remove("session_id", { path: "/" });
          Cookies.remove("session_expiry", { path: "/" });
         
          clearInterval(intervalId); // يمكن توقف التحقق بعد انتهاء session
        }
      }, 1000);
      
   
    return () => {
      ["click", "keypress", "mousemove", "scroll"].forEach(evt =>
        window.removeEventListener(evt, resetSessionTimer)
      );
      clearInterval(intervalId);
    };
   }, []);

useEffect(()=>{
  const sessionId = Cookies.get("session_id")
  const token = Cookies.get("token")

if(sessionId){
  fetchCount(sessionId,token)
}else{
   setCartCount(0)
}
const interval = setInterval(() => {

      if (sessionId) {
        fetchCount(sessionId, token)
      }else{
   setCartCount(0)
}
    }, 3000)

    // تنظيف عند تفكيك الـ component
    return () => clearInterval(interval)

},[])

 
  

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

  // ---------------- Click Outside ----------------
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
      <header className="bg-white px-4 py-3 sticky top-0 z-50 font-sans font-bold text-lg text-[#006294]">
        <div className="max-w-7xl mx-auto">

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <Image src="/LOGO BLUE.png" alt="Logo" width={120} height={40} unoptimized className="h-10 w-auto" />
            </div>

            {/* Search */}
            <div ref={desktopSearchRef} className="flex-1 max-w-2xl mx-8 relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#006294]" />
                </div>
                <input
                  type="text"
                  placeholder="Recherche"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-[#006294] rounded-lg bg-white placeholder-[#C09200] focus:outline-none focus:ring-2 focus:ring-[#006294] text-base text-[#006294]"
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
          className="block px-4 py-2 text-gray-700 hover:bg-[#F2FAFD] hover:text-[#006294] transition-colors duration-150"
        onClick={() => setSearchQuery("")}
        >
          {product.name_product}
        </Link>
      ))}
    </div>
  </div>
) : (
  searchQuery.trim() !== "" && (
    <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg  z-[9999] px-4 py-2 text-gray-500">
      Aucun résultat trouvé
    </div>
  )
)}

            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <Link href="/login" className="p-2 text-[#006294] bg-[#f4f9fb] hover:bg-[#e6f0f6] rounded-lg flex items-center">
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <button onClick={handleLogout} className="p-2 text-[#006294] bg-[#f4f9fb] hover:bg-[#e6f0f6] rounded-lg">
                  <LogOut className="h-5 w-5" />
                </button>
              )}
              <Link href="/cartClient" className="relative p-2 text-[#006294] bg-[#f4f9fb] hover:bg-[#e6f0f6] rounded-lg flex items-center">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C09200] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
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
                  className="block w-full pl-10 pr-3 py-2.5 border border-[#006294] rounded-lg bg-white placeholder-[#C09200] focus:outline-none focus:ring-2 focus:ring-[#006294] text-base text-[#006294]"
                />
              </div>

            {searchResults.length > 0 ? (
  <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
    {searchResults.map((product) => (
      <Link
        key={product.id_product}
        href={`/product/${product.name_product}`}
        className="block px-4 py-2 text-gray-700 hover:bg-[#F2FAFD] hover:text-[#006294] transition-colors duration-150"
     onClick={() => setSearchQuery("")}
     >
        {product.name_product}
      </Link>
    ))}
  </div>
) : (
  searchQuery.trim() !== "" && (
    <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 px-4 py-2 text-gray-500">
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
