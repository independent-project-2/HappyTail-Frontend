"use client"

import { PawPrint } from "lucide-react"
import { useEffect, useState } from "react"
import CAT from '/assets/Images/cat.jpg';
import BDOG from '/assets/Images/golden-retriever.jpg';
import HUSKY from '/assets/Images/husky.jpg';

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
    bgColor: "from-amber-50 via-orange-50 to-amber-100",
    textColor: "text-gray-900",
    accentColor: "text-amber-800",
    buttonBg: "bg-amber-800 hover:bg-amber-900",
    buttonOutline: "border-amber-800 text-amber-800 hover:bg-amber-50",
  }
 
]


function Home() {

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const slide = heroSlides[currentSlide]

  return (  
  <div > 
  <div className={`min-h-screen flex flex-col bg-linear-to-b ${slide.bgColor} transition-all duration-700`}>
    
       {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-0 md:pb-24 overflow-hidden min-h-screen">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between min-h-[calc(100vh-12rem)]">
            {/* Left Content */}
            <div className="space-y-8 flex-1 max-w-2xl">
              <div className="space-y-4">
                <h1
                  className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance transition-colors duration-700 ${slide.textColor}`}
                >
                  Find Your <span className={`transition-colors duration-700 ${slide.accentColor}`}>Furry</span> Friend
                  Today
                </h1>

                <p
                  className={`text-lg md:text-xl leading-relaxed text-pretty transition-colors duration-700 ${slide.textColor} opacity-80`}
                >
                  Every pet deserves a loving home. Whether you're looking to adopt, foster, or help reunite lost pets
                  with their families, we're here to make meaningful connections that last a lifetime.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={`flex items-center gap-2 rounded-lg py-2 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 ${slide.buttonBg} text-white`}
                >
                  <PawPrint className="mr-2 h-5 w-5" />
                  Adopt Now
                </button>

                <button
                  className={`flex items-center gap-2 rounded-lg py-2 px-8 text-base font-semibold border-2 transition-all hover:scale-105 ${slide.buttonOutline}`}
                >
                  <PawPrint className="mr-2 h-5 w-5" />
                  Add Animal
                </button>
              </div>


              <div className="flex gap-2 pt-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? `w-8 ${slide.accentColor.replace("text-", "bg-")}`
                        : `w-2 ${slide.accentColor.replace("text-", "bg-")}/30 hover:${slide.accentColor.replace("text-", "bg-")}/50`
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            {/* Right Content - Dynamic Pet Image */}
            <div className="relative flex-1 w-full lg:w-auto">
              <div className="relative w-full max-w-2xl mx-auto lg:mx-0 lg:ml-auto aspect-4/5 lg:aspect-square">
                <div className="relative w-full h-full">
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.imageAlt}
                    className="relative w-full h-full object-contain transition-all duration-700"
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
          </div>
        </div>
      </section>
    </div> 

</div>
  );
}

export default Home;