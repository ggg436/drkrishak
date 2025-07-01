import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative px-6 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Lets Plan Your
                <br />
                Perfect{' '}
                <span className="text-blue-600 relative">
                  Journey
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                    viewBox="0 0 300 12"
                    fill="currentColor"
                  >
                    <path d="M0,8 Q150,0 300,8 Q150,16 0,8 Z" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                Plan and book your perfect trip with expert advice, travel tips, destination 
                information and inspiration from us.
              </p>
            </div>
            
            <button className="group bg-gray-900 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2">
              <span>Discover Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main globe illustration */}
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-2xl relative overflow-hidden">
                {/* Continents */}
                <div className="absolute top-12 left-16 w-24 h-16 bg-green-400 rounded-full opacity-90"></div>
                <div className="absolute top-20 right-12 w-20 h-20 bg-green-500 rounded-full opacity-80"></div>
                <div className="absolute bottom-16 left-12 w-32 h-24 bg-green-400 rounded-full opacity-90"></div>
                <div className="absolute bottom-20 right-16 w-16 h-12 bg-green-500 rounded-full opacity-85"></div>
                
                {/* Shine effect */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-white opacity-20 rounded-full blur-xl"></div>
              </div>
              
              {/* Floating clouds */}
              <div className="absolute -top-4 -left-8 w-16 h-10 bg-white rounded-full shadow-lg animate-float"></div>
              <div className="absolute top-16 -right-12 w-20 h-12 bg-white rounded-full shadow-lg animate-float-delayed"></div>
              <div className="absolute -bottom-6 -left-12 w-14 h-8 bg-white rounded-full shadow-lg animate-float"></div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 right-4 w-8 h-8 bg-pink-400 rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute bottom-4 -right-8 w-6 h-6 bg-yellow-400 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute top-32 -left-16 w-4 h-4 bg-orange-400 rounded-full shadow-lg animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;