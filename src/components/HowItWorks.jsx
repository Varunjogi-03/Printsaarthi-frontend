import React from 'react'

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Upload Files",
      description: "Upload your design files in any format - PDF, AI, PSD, or even just describe what you need.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Choose Options",
      description: "Select your preferred size, material, finish, and quantity. Get instant pricing.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "We Print",
      description: "Our professional team prints your materials with the highest quality standards.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      title: "We Deliver",
      description: "Fast and secure delivery to your doorstep with real-time tracking.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ]

  return (
    <section id="how" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            How it <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple 4-step process to get your professional prints delivered to your doorstep
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.id} className={`relative flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 items-center justify-center">
                  <span className="text-white font-bold text-sm">{step.id}</span>
                </div>

                {/* Content */}
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={step.image} 
                        className="w-full h-full object-cover" 
                        alt={step.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4 text-4xl">{step.icon}</div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="lg:hidden w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold">{step.id}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      
                      {/* Step indicator for mobile */}
                      <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-semibold">Step {step.id} of {steps.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-xl mb-8 opacity-90">Upload your files now and get a free quote in minutes!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 border-0 font-bold px-8 py-4 rounded-xl">
                Print Your Project
              </button>
              <button className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 rounded-xl">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks


