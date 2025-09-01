import React, { useState, useEffect } from 'react'

function Features() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const features = [
    {
      id: 1,
      title: "Vibrant Quality",
      description: "High-resolution prints with accurate colors and crisp details that make your brand stand out.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title: "Fast Turnaround",
      description: "Quick production and reliable delivery to your doorstep within 24-48 hours.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        },
    {
      id: 3,
      title: "Custom Options",
      description: "Sizes, finishes, and materials tailored to your specific needs and preferences.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          },
    {
      id: 4,
      title: "Design Services",
      description: "Professional design team to help create stunning visuals for your printing needs.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          }
  ]

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [features.length])

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Why choose <span className="text-blue-600">Printsaarthi</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge technology with exceptional service to deliver the best printing experience.
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={feature.id} className="group">
              <div className="card bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={feature.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={feature.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 text-4xl">{feature.icon}</div>
                </div>
                <div className="card-body p-8">
                  <h3 className="card-title text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature) => (
                <div key={feature.id} className="w-full flex-shrink-0">
                  <div className="card bg-white border-0 shadow-lg rounded-2xl overflow-hidden mx-4">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={feature.image} 
                        className="w-full h-full object-cover" 
                        alt={feature.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4 text-3xl">{feature.icon}</div>
                    </div>
                    <div className="card-body p-6">
                      <h3 className="card-title text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-600">Prints Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">24hr</div>
            <div className="text-gray-600">Turnaround Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features


