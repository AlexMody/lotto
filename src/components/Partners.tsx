import React from 'react';
import { Shield, Award, Globe, Check } from 'lucide-react';

const Partners: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto">
        {/* Partner Logos Banner */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gold to-silver bg-clip-text text-transparent">
            In Proud Partnership With
          </h2>
          
          {/* Animated Banner */}
          <div className="bg-black/50 backdrop-blur-lg rounded-2xl border border-gold/20 p-8 mb-12 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent animate-pulse"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
              {/* Airbnb Logo */}
              <div className="group flex items-center space-x-4 p-6 rounded-xl bg-gradient-to-r from-pink-500/10 to-red-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">
                    Airbnb
                  </h3>
                  <p className="text-gray-400 text-sm">Premium Stays</p>
                </div>
              </div>
              
              {/* Booking.com Logo */}
              <div className="group flex items-center space-x-4 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    Booking.com
                  </h3>
                  <p className="text-gray-400 text-sm">Hotel Bookings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gold/10 to-silver/10 backdrop-blur-lg rounded-2xl border border-gold/20 p-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Shield className="h-8 w-8 text-gold" />
              <h3 className="text-3xl font-bold text-gold">
                Verified. Safe. Curated.
              </h3>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our partnerships with industry leaders ensure you receive world-class accommodations 
              and experiences that exceed your expectations.
            </p>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Verified Properties</h4>
                  <p className="text-gray-400">All accommodations are verified and rated 4+ stars</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Secure Booking</h4>
                  <p className="text-gray-400">End-to-end encrypted booking process</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-gold to-amber-500 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Premium Experience</h4>
                  <p className="text-gray-400">Curated experiences with local experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '10M+', label: 'Properties Available' },
            { number: '200+', label: 'Countries Covered' },
            { number: '99.9%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gold to-silver bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;