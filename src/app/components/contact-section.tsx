"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react";
import { Phone, Mail, MessageSquare, MessageCircle, Sparkles, Star } from "lucide-react"

export function ContactSection() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
const [settings, setSettings] = useState({
    contact_phone: "",
    contact_whatsapp: "",
    contact_email: ""})
    useEffect(() => {
      const fetchSettings = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/setting`)
          const data = await res.json()
          setSettings(data)
        } catch (err) {
         throw new Error("Erreur lors du chargement des commandes");
        } 
      }
  
      fetchSettings()
    }, [])
   const contactMethods = [
  {
    icon: Phone,
    title: "par Téléphone",
    subtitle: "Du Lundi au Vendredi de 9h à 18h",
    contact: settings.contact_phone || "", // ✅ بدون {...}
    color: "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600",
    hoverColor: "hover:from-amber-500 hover:to-amber-700",
    action: settings.contact_phone || "",
    glowColor: "shadow-amber-500/30",
  },
  {
    icon: Mail,
    title: "par Email",
    subtitle: "7jours/7 - 24h/24",
    contact: settings.contact_email || "",
    color: "bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600",
    hoverColor: "hover:from-rose-500 hover:to-rose-700",
    action: settings.contact_email || "",
    glowColor: "shadow-rose-500/30",
  },
  {
    icon: MessageCircle,
    title: "par WhatsApp",
    subtitle: "Du Lundi au Vendredi de 9h à 18h",
    contact: settings.contact_whatsapp || "",
    color: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600",
    hoverColor: "hover:from-emerald-500 hover:to-emerald-700",
    action: settings.contact_whatsapp || "",
    glowColor: "shadow-emerald-500/30",
  },
]


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-card/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217, 6, 6, 0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(241, 99, 135, 0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 py-20 max-w-6xl relative z-5">
        <div className="text-center mb-20">
          <div className="flex justify-center items-center mb-12 relative">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Premium Pink Speech Bubble */}
            <div className="relative mr-8 group">
              <div className="w-28 h-28 bg-[#006294] to-rose-600 rounded-full flex items-center justify-center shadow-2xl transform -rotate-12 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 animate-float shadow-[#006294]">
                <div className="space-y-2">
                  <div className="w-12 h-2 bg-white rounded-full shadow-sm"></div>
                  <div className="w-8 h-2 bg-white/90 rounded-full shadow-sm"></div>
                  <div className="w-12 h-2 bg-white rounded-full shadow-sm"></div>
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#006294] animate-pulse" />
              </div>
              <div className="absolute -bottom-4 left-10 w-0 h-0 border-l-[16px]   border-r-[16px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#006294] drop-shadow-xl"></div>
            </div>

            {/* Premium Blue Speech Bubble */}
            <div className="relative ml-8 group">
              <div className="w-28 h-28 bg-[#C09200]  rounded-full flex items-center justify-center shadow-2xl transform rotate-12 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-6 animate-float animation-delay-300 shadow-[#C09200]">
                <div className="space-y-2">
                  <div className="w-12 h-2 bg-white rounded-full shadow-sm"></div>
                  <div className="w-8 h-2 bg-white/90 rounded-full shadow-sm"></div>
                  <div className="w-12 h-2 bg-white rounded-full shadow-sm"></div>
                </div>
                <Star className="absolute -top-2 -left-2 w-6 h-6 text-[#006294] animate-pulse animation-delay-150" />
              </div>
              <div className="absolute -bottom-4 right-10 w-0 h-0 border-l-[16px]  border-r-[16px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#C09200] drop-shadow-xl"></div>
            </div>
          </div>

          <div className="relative">
            <h1 className="text-3xl text-[#006294] font-bold text-center mb-10">
              Comment pouvons-nous vous aider ?
            </h1>
            <div className="absolute -inset-4  blur-3xl -z-10"></div>
          </div>

          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto font-medium mb-4">
            Packspace met à votre disposition différents moyens de contacter notre Service Client afin de faciliter le
            plus possible votre expérience sur notre site.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#006294] to-[#C09200] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon
            return (
             <Card
  className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border-border/30 backdrop-blur-sm bg-[#C09200] hover:bg-[#006294] text-white relative overflow-hidden"
>
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

  <CardContent className="p-10 text-center relative z-10">
    {/* Icône */}
    <div
      className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-6"
    >
      <IconComponent className="w-12 h-12 text-white drop-shadow-lg" />
    </div>

    {/* Titre */}
    <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-300 transition-colors duration-300">
      {method.title}
    </h3>

    {/* Sous-titre */}
    <p className="mb-6 font-medium text-lg leading-relaxed opacity-90">{method.subtitle}</p>

    {/* Contact */}
    <p className="text-xl font-bold mb-8 group-hover:text-yellow-200 transition-colors duration-300 tracking-wide">
      {method.contact}
    </p>

    {/* Bouton */}
   
  </CardContent>
</Card>

            )
          })}
        </div>

       
      </div>
    </div>
  )
}
