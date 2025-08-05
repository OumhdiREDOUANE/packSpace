"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "La Qualité au meilleur prix !",
    subtitle: "Commandez en ligne et recevez vos supports imprimés, de qualité supérieure, livrés partout au Maroc !",
    buttonText: "Découvrez tous nos produits",
    buttonLink: "#",
    backgroundColor: "bg-gradient-to-r from-pink-500 to-pink-600",
    image: "/hero-slider.png",
  },
  {
    id: 2,
    title: "Impression Professionnelle",
    subtitle: "Des solutions d'impression adaptées à tous vos besoins professionnels avec une qualité exceptionnelle.",
    buttonText: "Voir nos services",
    buttonLink: "#",
    backgroundColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    image: "/hero-slider.png",
  },
  {
    id: 3,
    title: "Livraison Rapide",
    subtitle: "Recevez vos commandes rapidement partout au Maroc avec notre service de livraison express.",
    buttonText: "Commander maintenant",
    buttonLink: "#",
    backgroundColor: "bg-gradient-to-r from-purple-500 to-purple-600",
    image: "/hero-slider.png",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="group relative w-full h-[199px] md:h-[219px] lg:h-[227px] overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className={`min-w-full h-full ${slide.backgroundColor} relative flex items-center`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                {/* Left Content */}
                <div className="text-white space-y-4 z-10">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{slide.title}</h1>
                  <p className="text-base md:text-lg leading-relaxed opacity-90">{slide.subtitle}</p>
                  <div className="pt-2">
                    <a
                      href={slide.buttonLink}
                      className="inline-block bg-white text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {slide.buttonText}
                    </a>
                  </div>
                </div>

                {/* Right Content - Image */}
                <div className="relative h-full flex items-center justify-center">
                  <div className="relative w-full h-full max-w-lg">
                    {/* Scattered Print Materials Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      {/* Simulated scattered print materials */}
                      <div className="absolute top-10 right-10 w-20 h-12 bg-white rounded shadow-lg transform rotate-12 opacity-90"></div>
                      <div className="absolute top-20 left-10 w-16 h-10 bg-blue-400 rounded shadow-lg transform -rotate-6 opacity-80"></div>
                      <div className="absolute top-32 right-20 w-18 h-12 bg-yellow-300 rounded shadow-lg transform rotate-45 opacity-85"></div>
                      <div className="absolute top-40 left-20 w-22 h-14 bg-green-400 rounded shadow-lg transform -rotate-12 opacity-90"></div>
                      <div className="absolute top-16 center w-24 h-16 bg-red-400 rounded shadow-lg transform rotate-6 opacity-80"></div>
                      <div className="absolute bottom-20 right-16 w-20 h-12 bg-purple-400 rounded shadow-lg transform -rotate-24 opacity-85"></div>
                      <div className="absolute bottom-32 left-12 w-18 h-11 bg-orange-400 rounded shadow-lg transform rotate-18 opacity-90"></div>
                      <div className="absolute bottom-40 right-8 w-16 h-10 bg-teal-400 rounded shadow-lg transform -rotate-8 opacity-80"></div>

                      {/* Additional scattered elements */}
                      <div className="absolute top-24 right-32 w-14 h-9 bg-indigo-400 rounded shadow-lg transform rotate-30 opacity-75"></div>
                      <div className="absolute top-48 left-8 w-19 h-13 bg-pink-300 rounded shadow-lg transform -rotate-15 opacity-85"></div>
                      <div className="absolute bottom-16 center w-17 h-11 bg-cyan-400 rounded shadow-lg transform rotate-22 opacity-80"></div>
                      <div className="absolute bottom-48 right-24 w-21 h-13 bg-lime-400 rounded shadow-lg transform -rotate-18 opacity-90"></div>
                    </div>

                    {/* Main hero image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Show on Hover */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-x-[10px] group-hover:translate-x-0"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators - Show on Hover */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar - Show on Hover */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
