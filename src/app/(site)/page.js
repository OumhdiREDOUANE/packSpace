"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from 'next/image';
import Link from 'next/link';
const slides = [
  {
    id: 1,
    title: "La Qualité au meilleur prix ",
    subtitle: "Commandez en ligne et recevez vos supports imprimés, de qualité supérieure, livrés partout au Maroc !",
    buttonText: "Découvrez tous nos produits",
    buttonLink: "#",
    backgroundColor: "bg-gradient-to-r from-pink-500 to-pink-600",
    image: "/slide1.jpg",
  },
  {
    id: 2,
    title: "Impression Professionnelle",
    subtitle: "Des solutions d'impression adaptées à tous vos besoins professionnels avec une qualité exceptionnelle.",
    buttonText: "Voir nos services",
    buttonLink: "#",
    backgroundColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    image: "/slide2.jpg",
  },
  {
    id: 3,
    title: "Livraison Rapide",
    subtitle: "Recevez vos commandes rapidement partout au Maroc avec notre service de livraison express.",
    buttonText: "Commander maintenant",
    buttonLink: "#",
    backgroundColor: "bg-gradient-to-r from-purple-500 to-purple-600",
    image: "/slide3.jpg",
  },
]
const products = [
  {
    title: "Cartes de visite",
    url: "/category/cartes-de-visite",
    img: "/CV_Cat_300x300.jpg",
    price: "89,90 Dhs HT",
    unit: "les 100 ex.",
    desc: "L'indispensable de tous professionnels",
  },
  {
    title: "Dépliants",
    url: "/category/depliants",
    img: "/DEP_Cat_300x300.jpg",
    price: "179,90 Dhs HT",
    unit: "les 100 ex.",
    desc: "La com au meilleur rapport qualité-prix",
  },
  {
    title: "Flyers",
    url: "/product/flyer",
    img: "/FLY_Cat_300x300.jpg",
    price: "417,80 Dhs HT",
    unit: "les 100 ex.",
    desc: "Le classique de la communication",
  },
  {
    title: "Sacs en papier",
    url: "/product/Sacs-de-luxe",
    img: "/SPL_Cat_300x300.jpg",
    price: "949,90 Dhs HT",
    unit: "les 50 ex.",
    desc: "Pratique et élégant",
  },
  {
    title: "Menus",
    url: "/category/menu",
    img: "/Menu_Cat_300x300.jpg",
    price: "69,90 Dhs HT",
    unit: "les 50 ex.",
    desc: "Pour tous les goûts !",
  },
  {
    title: "Etuis pliants",
    url: "/category/etuis-pliants",
    img: "/ETUP_Cat_300x300.jpg",
    price: "349,90 Dhs HT",
    unit: "les 100 ex.",
    desc: "Packaging de qualité au meilleur prix",
  },
  {
    title: "Roll-ups",
    url: "/product/roll-upsweprintma",
    img: "/ROL_Cat_300x300.jpg",
    price: "788,00 Dhs HT",
    unit: "l'unité",
    desc: "Affichez-vous en qualité premium",
  },
  {
    title: "T-shirts Mixtes",
    url: "/product/T-shirts-Mixtes",
    img: "/TSM_Cat_300x300.jpg",
    price: "178,50 Dhs HT",
    unit: "l'unité",
    desc: "Vêtement de travail ou cadeau",
  },
]; 
const categories = [
  {
    name: "Carterie",
    slug: "carterie",
    img: "/Carterie_Cat_300x300.jpg",
  },
  {
    name: "Papeterie",
    slug: "papeterie",
    img: "/Papeterie_Cat_300x300.jpg",
  },
  {
    name: "Communication",
    slug: "communication",
    img: "/Com_Cat_300x300.jpg",
  },
  {
    name: "Hôtellerie Restauration",
    slug: "hotellerie-restauration",
    img: "/HotellerieResto_Cat_300x300.jpg",
  },
  {
    name: "Packaging",
    slug: "packaging",
    img: "/Packaging_Cat_300x300.jpg",
  },
  
];


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      const res = await fetch(
        "https://8f66f120.sibforms.com/serve/MUIEAHAEJVaLKICpv8v63ir3Th99jR9aXe-17_fQKVQbB8m_Q73342xUKk6Tk2l0weR5u6nNYsiX7JK07z4ndKFMbjCVfowIiu-EvlMQnWZwnzct_CXOw70OCz2jDlaM7Ktc4KVfCePUWQw_8YRLCs8FC38_LskuwKJlv1OvXhQc_ocH1sAJO9uyGRY9NHr6karp6elLFgXF7oDb",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ EMAIL: email }).toString(),
        }
      );

      if (res.ok) {
        setSuccess(true);
        setEmail("");
      } else {
        setError("Votre abonnement n'a pas pu être enregistré. Veuillez réessayer.");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };
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
    <>
    
    <div className="group relative w-full h-[199px] md:h-[219px] lg:h-[227px] overflow-hidden font-helveticaBoldCondensed">

  {/* Slides Container */}
  <div
    className="flex transition-transform duration-500 ease-in-out h-full"
    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
    onMouseEnter={() => setIsAutoPlaying(false)}
    onMouseLeave={() => setIsAutoPlaying(true)}
  >
    {slides.map((slide, index) => (
      <div
        key={slide.id}
        className={`min-w-full h-full relative flex items-center bg-cover bg-center`}
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            {/* Left Content */}
            <div className="text-white space-y-4 z-10 drop-shadow-lg">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {slide.title}
              </h1>
              <p className="text-base md:text-lg leading-relaxed opacity-90">
                {slide.subtitle}
              </p>
              <div className="pt-2">
                <a
                  href={slide.buttonLink}
                  className="inline-block bg-white text-[#006294] font-bold px-6 py-2 rounded-lg 
                             hover:bg-[#C09200] hover:text-white transition-colors duration-200 shadow-md hover:shadow-xl transform hover:scale-105"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
    ))}
  </div>

  {/* Navigation Arrows - Show on Hover */}
  <button
    onClick={prevSlide}
    className="absolute left-4 top-1/2 transform -translate-y-1/2
               bg-white/30 hover:bg-[#006294] hover:text-white text-[#006294]
               p-2 rounded-full transition-all duration-300 backdrop-blur-sm
               opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0"
    aria-label="Previous slide"
  >
    <ChevronLeft className="w-6 h-6" />
  </button>

  <button
    onClick={nextSlide}
    className="absolute right-4 top-1/2 transform -translate-y-1/2
               bg-white/30 hover:bg-[#006294] hover:text-white text-[#006294]
               p-2 rounded-full transition-all duration-300 backdrop-blur-sm
               opacity-0 group-hover:opacity-100 translate-x-[10px] group-hover:translate-x-0"
    aria-label="Next slide"
  >
    <ChevronRight className="w-6 h-6" />
  </button>

  {/* Slide Indicators - Show on Hover */}
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`w-3 h-3 rounded-full transition-all duration-200 ${
          index === currentSlide
            ? "bg-white scale-110 shadow-lg"
            : "bg-white/50 hover:bg-white/80"
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

<section className="py-12 my-[80px] bg-white font-helveticaBoldCondensed">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl text-[#006294] font-bold text-center mb-10">
      Les Best-Sellers PackSpace
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-white  p-4   duration-300"
        >
          <div className="aspect-square overflow-hidden  mb-4">
            <Link href={product.url} className="block">
              <img
                src={product.img}
                alt={product.title}
                className="object-cover w-full h-full transition-transform hover:scale-105 duration-300 "
              />
            </Link>
          </div>
          <div className="text-center space-y-1 h-[100px]">
            <h3 className="text-md font-semibold text-[#333333]">
              <Link href={product.url} className="hover:text-[#006294] transition-colors duration-200">
                {product.title}
              </Link>
            </h3>
            <div className="text-sm text-gray-700">
              à partir de{" "}
              <strong className="text-[#006294] font-bold">{product.price}</strong>{" "}
              {product.unit}
            </div>
            <div className="text-xs font-semibold text-[#C09200]">
              {product.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<div className="container mx-auto px-4 py-12 font-helveticaBoldCondensed">
  <h2 className="text-3xl font-bold text-center text-[#006294] mb-10">
    Nos Catégories
  </h2>

  <div className="flex flex-wrap justify-center gap-6">
    {categories.map((cat) => (
      <div
        key={cat.slug}
        className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 flex flex-col items-center"
      >
        <Link
          href={`/category/${cat.slug}`}
          className="block w-full aspect-square overflow-hidden   group transition-shadow duration-300 hover:shadow-xl"
        >
          <Image
            src={cat.img}
            alt={cat.name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 "
          />
        </Link>
        <h3 className="mt-4 text-center text-lg font-semibold text-[#333333]">
          <Link href={`/category/${cat.slug}`} className="hover:text-[#006294] transition-colors duration-200">
            {cat.name}
          </Link>
        </h3>
      </div>
    ))}
  </div>
</div>

<section
  id="newsletter"
  className="bg-[#FFFFFF] border-t border-[#006294] py-12 font-helveticaCondensed"
>
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
    <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center md:justify-start">
      <img src="/boite.png" alt="Newsletter" width={200} height={200} />
    </div>
    <div className="md:w-2/3 text-right">
      <h2 className="text-2xl text-[#006294] font-semibold mb-2">
        Inscrivez-vous à notre Newsletter.
      </h2>
      <p className="text-[#58595a] mb-4 font-medium">
        et recevez toutes les nouveautés, inspirations, promotions...
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-center"
      >
        <input
          type="email"
          placeholder="Saisissez votre email ici"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 border border-[#006294] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C09200] transition"
        />
        <button
          type="submit"
          className="bg-[#C09200] text-[#FFFFFF] px-6 py-2 rounded-md font-semibold hover:bg-[#006294] hover:text-[#C09200] transition-colors duration-300"
        >
          ENVOYER
        </button>
      </form>

      {success && (
        <p className="mt-4 text-[#006294] text-sm font-semibold">
          Merci ! Votre inscription a bien été prise en compte.
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600 text-sm font-semibold">{error}</p>
      )}
    </div>
  </div>
</section>


            </>
  )
}
