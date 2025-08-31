"use client";
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Link from 'next/link';
export default  function NavBar({navItems,isMobileMenuOpen}){
   
const [activeDropdown, setActiveDropdown] = useState(null)

const timeoutRef = useRef(null)
const [expandedMobileItems, setExpandedMobileItems] = useState(new Set())

  const toggleMobileDropdown = (itemName) => {
    console.log('clicked:', itemName);
    setExpandedMobileItems((prev) => {
      return prev.has(itemName) ? new Set() : new Set([itemName]);
    });
  };
const handleMouseEnter = (itemName) => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current)
  }
  setActiveDropdown(itemName)
}

const handleMouseLeave = () => {
  timeoutRef.current = setTimeout(() => {
    setActiveDropdown(null)
  }, 150)
}

useEffect(() => {
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }
}, [])

    return (
        <>
        <nav className="hidden md:block bg-white  sticky top-0 z-50 font-['Helvetica Neue','Arial','sans-serif']">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-center items-center h-16">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-8">
          {navItems?.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
    
    href={`/category/${encodeURIComponent(item.name)}`}
                className="group relative px-3 py-2 text-[#006294] hover:text-[#C09200] transition-colors duration-200 flex items-center gap-0.5 whitespace-nowrap text-base  uppercase tracking-wide"
              >
                <span className="relative">
                  {item.name=='hôtellerie-restauration'?"Hôtellerie / Restauration":item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#006294] transition-all duration-300 group-hover:w-full"></span>
                </span>
                {item.dropdown && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Dropdown Menu */}
              {item.dropdown && (
                <div
                  className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-200 origin-top ${
                    activeDropdown === item.name
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="py-2">
                    {item.dropdown.map((dropdownItem, index) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F2FAFD] hover:text-[#006294] transition-colors duration-150"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</nav>

{/* Mobile Menu */}
{isMobileMenuOpen && (
  <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 font-['Helvetica Neue','Arial','sans-serif']">
    <div className="md:hidden bg-white border-t border-gray-100 transition-all duration-300 ease-in-out">
      <div className="py-2">
        <div className="border-t border-gray-100">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-gray-100">
              <button
                onClick={() => toggleMobileDropdown(item.name)}
                className="w-full flex items-center justify-between px-4 py-3 text-[#006294] font-bold uppercase hover:bg-gray-50 transition-colors duration-200"
              >
                 <Link
    
    href={`/category/${encodeURIComponent(item.name)}`}>
                <span>{item.name}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    expandedMobileItems.has(item.name) ? "rotate-180" : ""
                  }`}
                />
                </Link>
              </button>

              {/* Dropdown submenu */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedMobileItems.has(item.name)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-[#F9FBFC] py-2">
                  {item.dropdown.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-8 py-2 text-sm text-gray-600 hover:bg-[#EDF8FF] hover:text-[#006294] transition-colors duration-200"
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </nav>
)}

      
        </>
    )
}