import React from 'react'
import { Link } from 'react-router-dom'

function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-pulse delay-500"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-16 border border-white/20 shadow-2xl">
            <div className="mb-8">
              <span className="inline-block px-6 py-3 bg-yellow-400 text-black font-bold rounded-full text-lg mb-6">
                 Special Offer - 20% Off First Order!
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to <span className="text-yellow-400">Print</span> with Printsaarthi?
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their printing needs. 
              Get a custom quote in minutes and start your project today!
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
               
                <h3 className="text-white font-bold mb-2">Instant Quote</h3>
                <p className="text-gray-200 text-sm">Get pricing in seconds</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
               
                <h3 className="text-white font-bold mb-2">Free Delivery</h3>
                <p className="text-gray-200 text-sm">Doorstep delivery included</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                
                <h3 className="text-white font-bold mb-2">Design Support</h3>
                <p className="text-gray-200 text-sm">Professional design help</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/signup" 
                className="btn btn-lg bg-yellow-400 text-black hover:bg-yellow-300 border-0 font-bold text-xl px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[200px]"
              >
                Order Now
              </Link>
              <button className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold text-xl px-12 py-6 rounded-2xl transition-all duration-300 hover:scale-105 min-w-[200px]">
                View Pricing
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-gray-300 mb-6">Trusted by leading businesses</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-white font-bold text-lg"> 500+ Companies</div>
                <div className="text-white font-bold text-lg"> 4.9/5 Rating</div>
                <div className="text-white font-bold text-lg">24/7 Support</div>
              </div>
            </div>
          </div>

          {/* Additional info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Need Design Help?</h3>
              <p className="text-gray-300 mb-6">Our professional design team can help create stunning visuals for your printing needs.</p>
              <button className="btn bg-blue-600 text-white hover:bg-blue-700 border-0 rounded-xl">
                Get Design Quote
              </button>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Bulk Orders?</h3>
              <p className="text-gray-300 mb-6">Special pricing and dedicated support for large volume orders and corporate clients.</p>
              <button className="btn bg-purple-600 text-white hover:bg-purple-700 border-0 rounded-xl">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction


