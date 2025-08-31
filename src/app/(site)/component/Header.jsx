"use client";
import Image from 'next/image'
import NavBar from "./Navbar";
import { useState,useEffect} from "react"
import Link from "next/link";
import Cookies  from "js-cookie" ;
import { Search, User,LogOut, ShoppingCart, Menu, X, ChevronDown } from "lucide-react"
import { getToken, removeToken } from "src/app/lib/auth";
import { request } from "src/app/lib/api";
import { useAuth } from "src/app/components/AuthProvider";

import { useRouter } from "next/navigation";
export default function Header({navItems}){
    const [searchQuery, setSearchQuery] = useState('')
    const [cartCount] = useState(4)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();


   
  
    const handleLogout = async () => {
      try {
        await request("/logout", { method: "POST", auth: true });
        removeToken();
        logout();
        Cookies.remove("session_id");
        router.push("/");
      } catch (e) {
        console.error("Logout error:", e.message);
      } 
    }

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
          console.log("Session expired");
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
    return (
      <>
        <header className="bg-white px-4 py-3 sticky top-0 z-50 font-sans font-bold tracking-tight text-lg text-[#006294]">
  <div className="max-w-7xl mx-auto">
    {/* Desktop Header */}
    <div className="hidden md:flex items-center justify-between gap-4">
      {/* Logo */}
      <div className="flex-shrink-0">
        <a href="#" className="flex items-center">
          <Image
            src="/LOGO BLUE.png"
            alt="pack space Logo"
            width={120}
            height={40}
            unoptimized
            className="h-10 w-auto"
          />
        </a>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#006294]" />
          </div>
          <input
            type="text"
            placeholder="Recherche"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-[#006294] rounded-lg leading-5 bg-white placeholder-[#C09200] focus:outline-none focus:placeholder-[#C09200] focus:ring-2 focus:ring-[#006294] focus:border-transparent transition-all duration-200 text-base text-[#006294]"
          />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        {/* French Flag */}
        <button className="flex items-center justify-center w-8 h-6 rounded overflow-hidden border border-[#006294] hover:border-[#C09200] transition-colors">
          <div className="w-full h-full flex">
            <div className="w-1/3 bg-[#006294]"></div>
            <div className="w-1/3 bg-white"></div>
            <div className="w-1/3 bg-red-600"></div>
          </div>
        </button>

        {/* WhatsApp Icon */}
        <button className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-200">       
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">   
                                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />           
                </svg>            
                     </button>            
        {/* User Profile Icon */}
        {!isLoggedIn ? (
        <button className="p-2 text-[#006294] bg-[#f4f9fb] hover:bg-[#e6f0f6] rounded-lg transition-all duration-200">
          <Link href="/login" className="relative flex items-center">
            <User className="h-5 w-5" color="#006294" />
          </Link>
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="p-2 text-[#006294] bg-[#f4f9fb] hover:bg-[#e6f0f6] rounded-lg transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
        </button>
      )}

        {/* Shopping Cart */}
        <button className="relative p-2 text-[#006294] bg-[#f4f9fb] hover:bg-[#e6f0f6] rounded-lg transition-all duration-200">
        <Link href="/cartClient" className="relative flex items-center">
    <ShoppingCart className="h-5 w-5" color="#006294" />
    {cartCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-[#C09200] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
        {cartCount}
      </span>
    )}
  </Link>
        </button>
      </div>
    </div>

    {/* Mobile Header */}
    <div className="md:hidden flex items-center justify-between">
      {/* Left Side - Hamburger Menu and Search */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-[#006294] hover:text-[#C09200] transition-colors duration-200"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 text-[#006294] hover:text-[#C09200] transition-colors duration-200"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Center - Logo */}
      <div className="flex-shrink-0">
        <a href="#" className="flex items-center">
          <Image
            src="/LOGO BLUE.png"
            alt="pack space Logo"
            width={120}
            height={40}
            unoptimized
            className="h-8 w-auto"
          />
        </a>
      </div>

      {/* Right Side - Icons */}
      <div className="flex items-center space-x-2">
      <button className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-200">    
                       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">               
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />      
                   </svg>                 
                   </button>            

        <button className="p-2 text-[#006294] bg-[#f4f9fb] hover:bg-[#e6f0f6] rounded-lg transition-all duration-200">
          <User className="h-5 w-5" color="#006294" />
        </button>
       
    
  
        <button className="relative p-2 text-[#006294] bg-[#f4f9fb] hover:bg-[#e6f0f6] rounded-lg transition-all duration-200">
          <Link href="/cartClient" className="relative flex items-center"> 
          <ShoppingCart className="h-5 w-5" color="#006294" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C09200] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
          </Link>
        </button>
      </div>
    </div>

    {/* Mobile Search Bar */}
    <div
      className={`md:hidden transition-all duration-300 ease-in-out ${
        isSearchOpen ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0 overflow-hidden'
      }`}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[#006294]" />
        </div>
        <input
          type="text"
          placeholder="Recherche"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 border border-[#006294] rounded-lg leading-5 bg-white placeholder-[#C09200] focus:outline-none focus:placeholder-[#C09200] focus:ring-2 focus:ring-[#006294] focus:border-transparent transition-all duration-200 text-base text-[#006294]"
        />
      </div>
    </div>
  </div>
</header>

        <NavBar navItems={navItems} isMobileMenuOpen={isMobileMenuOpen} />
       
      </>
    )
  

    
}