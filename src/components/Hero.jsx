import React from 'react'

function Hero() {
  return (
    <section className="hero min-h-screen relative overflow-hidden pt-16 lg:pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 opacity-90"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="hero-content flex-col lg:flex-row-reverse relative z-10 max-w-7xl mx-auto">
        {/* Big Hero Image */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80" 
              className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl shadow-2xl" 
              alt="Professional Printing Services" 
            />
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-yellow-400 p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-white">Fast</div>
              <div className="text-sm text-white">Delivery</div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-yellow-400 text-black font-semibold rounded-full text-sm mb-4">
               Professional Printing Services
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Print.</span>
            <span className="block text-yellow-400">Pack.</span>
            <span className="block">Deliver.</span>
          </h1>
          
          <p className="py-6 text-xl text-gray-200 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Printsaarthi is your trusted partner for professional printing and doorstep delivery. 
            From last minute Assignments to banners for your college fest, we make your work look sharp and professional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a className="btn btn-lg bg-yellow-400 text-black hover:bg-yellow-300 border-0 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Get Your first print
            </a>
            <a className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
              See Pricing
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-white">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">100+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">24hr Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">Free Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


