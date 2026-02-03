"use client"

import { PawPrint } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CAT from "/assets/Images/cat.png"
import BDOG from "/assets/Images/golden-retriever.png"
import HUSKY from "/assets/Images/husky.png"


const heroSlides = [
  {
    image: HUSKY,
    imageAlt: "Happy Siberian Husky",
    bgColor: "from-blue-50 via-cyan-50 to-blue-100",
    textColor: "text-gray-900",
    accentColor: "text-indigo-400",
    buttonBg: "bg-indigo-400 hover:bg-indigo-500",
    buttonOutline: "border-indigo-400 text-indigo-400 hover:bg-indigo-50",
  },
  {
    image: CAT,
    imageAlt: "Adorable Cat",
    bgColor: "from-purple-50 via-pink-50 to-purple-100",
    textColor: "text-gray-900",
    accentColor: "text-orange-500",
    buttonBg: "bg-orange-500 hover:bg-orange-700",
    buttonOutline: "border-orange-600 text-orange-600 hover:bg-orange-50",
  },
  {
    image: BDOG,
    imageAlt: "Happy Golden Retriever",
    bgColor: "from-orange-100 via-amber-50 to-orange-300",
    textColor: "text-gray-900",
    accentColor: "text-amber-800",
    buttonBg: "bg-amber-800 hover:bg-amber-900",
    buttonOutline: "border-amber-800 text-amber-800 hover:bg-amber-50",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useNavigate()

  // Disable page scroll while hero section is actioned
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  // Helper for looping slides
  const nextSlide = (direction: number) => {
    setCurrentSlide((prev) => {
      const total = heroSlides.length
      // direction: 1 = down/next, -1 = up/prev
      return (prev + direction + total) % total 
    })
  }

  // Desktop continuous scroll
  useEffect(() => {
    let ticking = false
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (ticking) return
      ticking = true

      if (e.deltaY > 0) nextSlide(1) // scroll down
      else nextSlide(-1) // scroll up

      setTimeout(() => (ticking = false), 500) 
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [])

  // Mobile swipe
  useEffect(() => {
    let startY = 0
    let ticking = false

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (ticking) return
      const diff = startY - e.touches[0].clientY
      if (Math.abs(diff) < 50) return

      ticking = true
      diff > 0 ? nextSlide(1) : nextSlide(-1)
      setTimeout(() => (ticking = false), 500)

      startY = e.touches[0].clientY
    }

    window.addEventListener("touchstart", onTouchStart, { passive: false })
    window.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
    }
  }, [])

  const slide = heroSlides[currentSlide]

  return (
    <div
      className={`h-screen w-screen flex flex-col lg:flex-row items-center justify-center bg-linear-to-b ${slide.bgColor} transition-all duration-700 `}
    >
      {/* LEFT — Text Content */}
      <div className="mt-30 lg:mt-0 flex-1 w-full max-w-2xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center space-y-0.5 lg:space-y-8 min-h-[50vh] lg:min-h-full">
        <h1
          className={`font-bold leading-tight transition-colors duration-700 ${slide.textColor} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`}
        >
          Find Your <span className={slide.accentColor}>Furry</span> Friend Today
        </h1>
        <p
          className={`opacity-80 transition-colors duration-700 ${slide.textColor} text-sm sm:text-base md:text-lg lg:text-xl`}
        >
          Every pet deserves a loving home. Adopt, foster, or reconnect pets with families, we make meaningful
          connections that last.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3">
          <button
            onClick={() => router('/browse-pets')}
            className={`flex items-center justify-center gap-2 rounded-lg px-6 py-2 sm:px-8 text-sm sm:text-base font-semibold shadow-lg transition-all hover:scale-105 ${slide.buttonBg} text-white`}
          >
            <PawPrint className="h-4 w-4 sm:h-5 sm:w-5" />
            Adopt Now
          </button>
          <button
            className={`flex items-center justify-center gap-2 rounded-lg px-6 py-2 sm:px-8 text-sm sm:text-base font-semibold border-2 transition-all hover:scale-105 ${slide.buttonOutline}`}
          >
            <PawPrint className="h-4 w-4 sm:h-5 sm:w-5" />
            Add Animal
          </button>
        </div>
      </div>

      {/* RIGHT — Image */}
      <div className="flex-1 w-full flex justify-center lg:justify-end mt-0 lg:mt-0 px-4 sm:px-6 pt-5">
        <div
          className="
            w-full max-w-[500px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[520px] 
            h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-auto 
            aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5]
            flex justify-center items-center
          "
        >
          <img
            src={slide.image}
            alt={slide.imageAlt}
            className="w-full h-full object-contain transition-all duration-700 mb-40 lg:mb-0"
            style={{
              maskImage:
                currentSlide === 2
                  ? "radial-gradient(ellipse 70% 70% at 50% 45%, black 30%, transparent 75%)"
                  : "radial-gradient(ellipse 60% 60% at 50% 45%, black 20%, transparent 70%)",
              WebkitMaskImage:
                currentSlide === 2
                  ? "radial-gradient(ellipse 70% 70% at 50% 45%, black 30%, transparent 75%)"
                  : "radial-gradient(ellipse 60% 60% at 50% 45%, black 20%, transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
