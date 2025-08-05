"use client"

import { Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#f4f9fb] border-t border-[#006699]  mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-8">
          {/* Left Column - Navigation Links */}
          <div className="col-span-3 space-y-3">
            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <span className="text-gray-400  mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto"   // اختر الأبعاد المناسبة
   /></span>
              Qui sommes-nous ?
            </a>
            
            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                       <span className="text-gray-400 mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto" /></span>

              Nos équipements
            </a>
            
            
          </div>

          {/* Center Left Column - More Links */}
          <div className="col-span-2 space-y-3">
            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                       <span className="text-gray-400 mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto" /></span>

              Blog
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                       <span className="text-gray-400 mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto" /></span>

              F.A.Q
            </a>
            
           
            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                       <span className="text-gray-400 mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto" /></span>

              Contact
            </a>
          </div>

          {/* Center Column - Logos */}
          <div className="col-span-3 flex flex-col items-center space-y-4">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">Nos services dédiés aux entreprises</p>
              <div className="space-y-2">
                
                <div className="flex items-center justify-center">
                  <img src="/LOGO BLUE.png" alt="Weprint Business Logo" className="h-8 w-auto" />
                  
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Info */}
          <div className="col-span-4 text-center">
            <p className="text-gray-600 text-sm mb-4">Paiement à la livraison (selon conditions)</p>

            {/* Payment Method Logos */}
           

            

            {/* Payment Options */}
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <img src="/cheque.png" alt="cheque" className="h-8 w-auto" />
                </div>
                <span className="text-xs text-gray-600">Chèque</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <img src="/espece.png" alt="espece" className="h-8 w-auto" />
                </div>
                <span className="text-xs text-gray-600">Espèces</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* Navigation Links - Two Columns */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-800 transition-colors duration-200">
              <span className="text-gray-400 mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto" /></span>
              Qui sommes-nous ?
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <span className="text-gray-400 mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto" /></span>
               
                Nos engagements
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <span className="text-gray-400 mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto" /></span>
                
                Nos équipements
              </a>
             
            </div>
            <div className="space-y-3">
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-800 transition-colors duration-200">
              <span className="text-gray-400 mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto" /></span>
                
                Blog
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <span className="text-gray-400 mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto" /></span>
                
                F.A.Q
              </a>
             
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <span className="text-gray-400 mr-2"><img src="/share.png" alt="Weprint Business Logo" className="h-8 w-auto" /></span>
               
                Contact
              </a>
            </div>
          </div>
          <div className="flex">
        <div className="text-center py-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-4">Nos services dédiés aux entreprises</p>
            <div className="space-y-2">
              
              <div className="flex items-center justify-center">
                <img src="/LOGO BLUE.png" alt="Weprint Business Logo" className="h-8 w-auto" />
                
              </div>
            </div>
          </div>

          {/* Mobile Payment Section */}
          <div className="text-center py-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-4">Paiement à la livraison (selon conditions)</p>

            
            
       

            {/* Payment Options */}
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <img src="/espece.png" alt="cheque" className="h-8 w-auto" />
                </div>
                <span className="text-xs text-gray-600">Espèces</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <img src="/cheque.png" alt="cheque" className="h-8 w-auto" />
                </div>
                <span className="text-xs text-gray-600">Chèque</span>
              </div>
            </div>
          </div>
          </div>

          {/* Mobile Logos Section */}
  
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright and Legal Links */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-500">
              <span>© WP GROUP 2021 - TOUS DROITS RÉSERVÉS</span>
              <div className=" hidden md:block flex space-x-4">
                <a href="#" className="hover:text-gray-700 transition-colors duration-200">
                  Conditions générales de vente
                </a>
                <span>•</span>
                <a href="#" className="hover:text-gray-700 transition-colors duration-200">
                  Mentions légales
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 bg-gray-600 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-600 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
             
              <a
                href="#"
                className="w-8 h-8 bg-gray-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
