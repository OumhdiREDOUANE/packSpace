"use client"

import { useState, useEffect } from "react"
import { Phone, HelpCircle, Mail, MessageCircle, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"



export default function FAQPage({faqItems}) {
  const [contactMethods, setContactMethods] = useState([])
 
  const [loading, setLoading] = useState(true)
  const [expandedFAQ, setExpandedFAQ] = useState(null)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
const [settings, setSettings] = useState({
    contact_phone: "",
    contact_whatsapp: "",
    contact_email: ""})
    useEffect(() => {
      const fetchSettings = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/setting`)
          const data = await res.json()
          setSettings(data)
        } catch (err) {
         throw new Error("Erreur lors du chargement des commandes");
        } 
      }
  
      fetchSettings()
    }, [])
  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setContactMethods([
        {
          id: "1",
          icon: <Phone className="w-8 h-8" />,
          title: "par Téléphone",
          subtitle: "Du Lundi au Vendredi de 9h à 18h",
          contact: settings.contact_phone || "",
          hours: "7jours/7 - 24h/24",
          color: "text-orange-500",
        },
        
        {
          id: "3",
          icon: <Mail className="w-8 h-8" />,
          title: "par Email",
          subtitle: "7jours/7 - 24h/24",
          contact: settings.contact_email || "",
          hours: "",
          color: "text-pink-500",
        },
        {
          id: "4",
          icon: <MessageCircle className="w-8 h-8" />,
          title: "par WhatsApp",
          subtitle: "Du Lundi au Vendredi de 9h à 18h",
          contact: settings.contact_whatsapp || "",
          hours: "",
          color: "text-green-500",
        },
      ])

      

      setLoading(false)
    }

    loadData()
  }, [])

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-orange-300 via-coral-400 to-pink-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-300/90 via-orange-400/80 to-pink-400/70"></div>

        {/* Decorative 3D Elements */}
        <div className="absolute top-8 right-20 w-16 h-16 bg-yellow-300 rounded-full opacity-80 animate-bounce"></div>
        <div className="absolute top-16 right-40 w-12 h-12 bg-orange-400 rounded-full opacity-70"></div>
        <div className="absolute bottom-20 right-32 w-10 h-10 bg-cyan-300 rounded-full opacity-80"></div>
        <div className="absolute top-12 right-60 w-8 h-8 bg-orange-500 rounded-full opacity-60"></div>

        {/* Question mark decorations */}
        <div className="absolute top-20 right-16 text-6xl text-orange-500/60 font-bold">?</div>
        <div className="absolute bottom-16 right-20 text-4xl text-white/40 font-bold">?</div>

        {/* Chat bubble decorations */}
        <div className="absolute top-6 right-8 w-12 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-8 right-12 w-10 h-6 bg-orange-400 rounded-full flex items-center justify-center">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="relative z-10 px-6 py-16">
          {/* Breadcrumb */}
          <nav className="text-white/80 text-sm mb-8">
            <span>Accueil</span>
            <span className="mx-2">-</span>
            <span>Aide</span>
            <span className="mx-2">-</span>
            <span className="text-white font-medium">Questions</span>
          </nav>

          {/* Main Title */}
          <h1 className="text-8xl font-bold text-white mb-8">FAQ.</h1>
        </div>
      </div>

      {/* Contact Methods Section */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="p-6 text-center animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </Card>
                ))
              : contactMethods.map((method) => (
                  <Card key={method.id} className="p-6 text-center  ">
                    <CardContent className="p-0">
                      <div className={`${method.color} mb-4 flex justify-center`}>{method.icon}</div>
                      <h3 className="font-semibold text-gray-800 mb-2">{method.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{method.subtitle}</p>
                      <p className="font-medium text-gray-800 mb-1">{method.contact}</p>
                      {method.hours && <p className="text-xs text-gray-500">{method.hours}</p>}
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#006294] hover:text-[#C09200]  mb-8">En Bref</h2>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="border rounded-lg p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4" >
              {faqItems.map((item) => (
                <div key={item.id} className="border-b  overflow-hidden">
                  <Button
                    variant="ghost"
                    className="w-full p-4 text-left justify-between"
                    onClick={() => toggleFAQ(item.id)}
                  >
                    <span className="font-medium text-gray-800">{item.question}</span>
                    <div className="flex items-center space-x-2">
                      {expandedFAQ === item.id ? (
                        <ChevronUp className="w-5 h-5 text-[#006294] hover:text-[#C09200]" />
                      ) : (
                        <span className="text-[#006294] hover:text-[#C09200] text-xl font-bold">+</span>
                      )}
                    </div>
                  </Button>
                  {expandedFAQ === item.id && (
                    <div className="px-4 pb-4 text-gray-600  ">
                      <p className="pt-4">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
