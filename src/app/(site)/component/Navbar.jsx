"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Link from 'next/link';

export default function NavBar({ navItems, isMobileMenuOpen }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null); // For desktop group toggle
  const timeoutRef = useRef(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState(new Set());
  const [expandedMobileGroups, setExpandedMobileGroups] = useState(new Set()); // For mobile group toggle

  // Desktop handlers
  const handleMouseEnter = (itemName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveGroup(null);
    }, 150);
  };

  const toggleGroup = (groupName) => {
    setActiveGroup(activeGroup === groupName ? null : groupName);
  };

  // Mobile handlers
  const toggleMobileDropdown = (itemName) => {
    setExpandedMobileItems(prev =>
      prev.has(itemName) ? new Set() : new Set([itemName])
    );
    setExpandedMobileGroups(new Set()); // Close all groups when main item toggles
  };

  const toggleMobileGroup = (groupName) => {
    setExpandedMobileGroups(prev =>
      prev.has(groupName) ? new Set([...prev].filter(g => g !== groupName)) : new Set(prev.add(groupName))
    );
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white sticky top-0 z-4 font-['Helvetica Neue','Arial','sans-serif']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
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
                    className="group relative px-3 py-2 text-[#006294] hover:text-[#C09200] transition-colors duration-200 flex items-center gap-0.5 whitespace-nowrap text-base uppercase tracking-wide"
                  >
                    <span className="relative">
                      {item.name === 'hôtellerie-restauration' ? "Hôtellerie / Restauration" : item.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#006294] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    {item.dropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""}`}
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
                          <div key={index}>
                            {dropdownItem.isGroup ? (
                              <>
                                {/* Group Name clickable */}
                                <div
                                  onClick={() => toggleGroup(dropdownItem.name)}
                                  className="px-4 py-2 font-bold text-[#006294] bg-gray-50 cursor-pointer flex justify-between items-center"
                                >
                                  {dropdownItem.name}
                                  <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${activeGroup === dropdownItem.name ? "rotate-180" : ""}`}
                                  />
                                </div>
                                {/* Show children only on click */}
                                {activeGroup === dropdownItem.name &&
                                  dropdownItem.children.map((child) => (
                                    <Link
                                         href={`/product/${encodeURIComponent(child.name)}`}
                                      className="block px-6 py-2 text-sm text-gray-700 hover:bg-[#F2FAFD] hover:text-[#006294] transition-colors duration-150"
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                              </>
                            ) : (
                               <Link
                                         href={`/product/${encodeURIComponent(dropdownItem.name)}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F2FAFD] hover:text-[#006294] transition-colors duration-150"
                              >
                                {dropdownItem.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-4 font-['Helvetica Neue','Arial','sans-serif']">
          <div className="md:hidden bg-white border-t border-gray-100 transition-all duration-300 ease-in-out">
            <div className="py-2">
              <div className="border-t border-gray-100">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100">
                    {/* Main Category */}
                    <Link
                    href={`/category/${encodeURIComponent(item.name)}`}>
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="w-full flex items-center justify-between px-4 py-3 text-[#006294] font-bold uppercase hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${expandedMobileItems.has(item.name) ? "rotate-180" : ""}`}
                      />
                    </button></Link>
                    

                    {/* Dropdown submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${expandedMobileItems.has(item.name) ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="bg-[#F9FBFC] py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <div key={dropdownItem.name}>
                            {dropdownItem.isGroup ? (
                              <>
                                {/* Group Name clickable */}
                                <button
                                  onClick={() => toggleMobileGroup(dropdownItem.name)}
                                  className="w-full text-left px-6 py-2 font-semibold text-[#006294] bg-gray-50 flex justify-between items-center"
                                >
                                  {dropdownItem.name}
                                  <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-200 ${expandedMobileGroups.has(dropdownItem.name) ? "rotate-180" : ""}`}
                                  />
                                </button>
                                {/* Show children only on click */}
                                <div
                                  className={`overflow-hidden transition-all duration-300 ${
                                    expandedMobileGroups.has(dropdownItem.name) ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                                  }`}
                                >
                                  {dropdownItem.children.map((child) => (
                                     <Link
                                         href={`/product/${encodeURIComponent(child.name)}`}
                                      className="block px-8 py-2 text-sm text-gray-600 hover:bg-[#EDF8FF] hover:text-[#006294] transition-colors duration-200"
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                                </div>
                              </>
                            ) : (
                               <Link
                                         href={`/product/${encodeURIComponent(dropdownItem.name)}`}
                                className="block px-6 py-2 text-sm text-gray-600 hover:bg-[#EDF8FF] hover:text-[#006294] transition-colors duration-200"
                              >
                                {dropdownItem.name}
                              </Link>
                            )}
                          </div>
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
  );
}
