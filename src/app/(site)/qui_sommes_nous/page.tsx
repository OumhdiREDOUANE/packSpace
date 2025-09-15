"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import Link from 'next/link';

export default function QuiSommesNous() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#006294]  px-6 py-20 text-white min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/3d-paper-geometric-shapes.png')",
            transform: `translateY(${scrollY * -0.2}px) scale(1.1)`,
          }}
        />
        <div className="absolute inset-0 bg-[#006294]" />

        <div className="absolute inset-0 overflow-hidden">
          {/* Cyan cylinder */}
          <div
            className="absolute top-16 right-1/3 w-8 h-20 bg-cyan-400 rounded-full transform rotate-45 opacity-90 shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 1.5}px) rotate(45deg)`,
            }}
          />
          {/* Yellow sphere */}
          <div
            className="absolute top-32 right-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-90 shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * 2}px)`,
            }}
          />
          {/* Orange cylinder */}
          <div
            className="absolute bottom-20 right-20 w-6 h-16 bg-orange-400 rounded-full transform -rotate-12 opacity-90 shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * -1}px) rotate(-12deg)`,
            }}
          />
          {/* Pink sphere */}
          <div
            className="absolute top-24 right-16 w-8 h-8 bg-pink-300 rounded-full opacity-80 shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * 1}px)`,
            }}
          />
          {/* Blue sphere */}
          <div
            className="absolute bottom-32 right-32 w-6 h-6 bg-blue-600 rounded-full opacity-90 shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * 1}px, ${mousePosition.y * -1.5}px)`,
            }}
          />
          {/* Teal cylinder left side */}
          <div
            className="absolute top-40 left-20 w-4 h-12 bg-teal-400 rounded-full transform rotate-12 opacity-80 shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * 1.2}px) rotate(12deg)`,
            }}
          />
          {/* Purple sphere left side */}
          <div
            className="absolute bottom-40 left-32 w-10 h-10 bg-purple-400 rounded-full opacity-75 shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * 2.5}px, ${mousePosition.y * -0.8}px)`,
            }}
          />
          {/* Green triangle */}
          <div
            className="absolute top-60 left-1/4 w-0 h-0 opacity-85 shadow-lg"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: "14px solid #10b981",
              transform: `translate(${mousePosition.x * -1.8}px, ${mousePosition.y * 1.8}px) rotate(${mousePosition.x * 2}deg)`,
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-6">
          <div className="flex flex-col items-center justify-center text-center space-y-6 lg:space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white lg:text-6xl animate-in slide-in-from-bottom duration-1000">
                <span className="inline-block animate-in slide-in-from-bottom duration-1000 delay-200">Imprimerie</span>
                <br />
                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold animate-in slide-in-from-bottom duration-1000 delay-400">
                  100% digitale
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-white/95 animate-in slide-in-from-bottom duration-1000 delay-600 max-w-2xl">
              Donnez vie à vos créations en un simple clic!
            </p>

            <div className="flex gap-2 justify-center animate-in slide-in-from-bottom duration-1000 delay-800">
              <div className="h-1 w-8 bg-white rounded-full"></div>
              <div className="h-1 w-8 bg-white/60 rounded-full"></div>
              <div className="h-1 w-16 bg-white rounded-full"></div>
              <div className="h-1 w-8 bg-white/60 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="px-6 py-4 text-sm text-muted-foreground">
        <div className="container mx-auto max-w-6xl">
          <span>Accueil</span>
          <span className="mx-2">-</span>
          <span className="text-foreground">Qui sommes-nous ?</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="container mx-auto max-w-6xl space-y-16">
          {/* About Section */}
          <section className="text-center space-y-8">
            <h2 className="text-3xl text-[#006294] font-bold text-center mb-10">
              Packspace est une imprimerie <span className="text-[#C09200]">100% digitale</span>
            </h2>

            <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Fruit de l'expérience et de la modernité,{" "}
                <strong className="text-[#C09200]">Packspace a réuni le meilleur de l'impression et du web.</strong>
              </p>
              <p>
                Nous bénéficions d'un savoir-faire unique de professionnels de la digitalisation, mais aussi de la
                chaîne graphique et de l'impression offset et numérique.
              </p>
              <p>
                Chez WePrint tout a été repensé pour en faire une imprimerie comme vous n'en avez jamais vu ! Nous
                sommes en effet équipés des dernières technologies en matière d'impression et d'automatisation de la
                production.
              </p>
            </div>
          </section>

          {/* Advantages Section */}
          <section className="space-y-12">
            <h3 className="text-3xl text-[#006294] font-bold text-center mb-10">
              Les avantages <span className="text-[#C09200]">Packspace</span>
            </h3>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#006294] hover:bg-[#C09200] text-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Rapidité</h4>
                  <p className="text-muted-foreground">
                    Production automatisée pour des délais de livraison ultra-rapides
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto  bg-[#C09200] hover:bg-[#006294] text-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Qualité</h4>
                  <p className="text-muted-foreground">
                    Technologies de pointe pour une qualité d'impression exceptionnelle
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#006294] hover:bg-[#C09200] text-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Prix</h4>
                  <p className="text-muted-foreground">Tarifs compétitifs grâce à notre processus 100% digitalisé</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#C09200] hover:bg-[#006294] text-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Simplicité</h4>
                  <p className="text-muted-foreground">Interface intuitive pour commander en quelques clics</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#006294] hover:bg-[#C09200] text-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Service</h4>
                  <p className="text-muted-foreground">Accompagnement personnalisé par nos experts</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#C09200] hover:bg-[#006294] text-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2h1.064M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Innovation</h4>
                  <p className="text-muted-foreground">Solutions créatives adaptées à vos besoins spécifiques</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-[#006294] hover:bg-[#C09200] text-white " >
                Prêt à commencer ?
              </Badge>
              <h3 className="text-3xl text-[#006294] font-bold text-center mb-10">
                Découvrez nos services d'impression digitale
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Rejoignez des milliers de clients satisfaits qui font confiance à Packspace pour leurs projets
                d'impression.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link  href="/HomePage" >
              <Button size="lg" className="text-lg px-8 py-6 bg-[#006294] hover:bg-[#C09200] text-white">
                Voir nos produits
              </Button>
              </Link>
              
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
