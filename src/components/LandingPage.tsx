import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Leaf, 
  Users, 
  ShoppingBag, 
  Calculator, 
  Calendar,
  Star,
  CheckCircle,
  Play,
  Globe,
  Zap,
  Recycle,
  Heart,
  TrendingUp,
  Award,
  MessageCircle,
  Target,
  Shield,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: Users,
      title: 'Green Communities',
      description: 'Connect with eco-warriors worldwide and share sustainable living tips.',
      color: 'from-emerald-400 to-teal-500',
      delay: '0ms'
    },
    {
      icon: ShoppingBag,
      title: 'Eco Marketplace',
      description: 'Discover sustainable products that make a positive environmental impact.',
      color: 'from-blue-400 to-indigo-500',
      delay: '100ms'
    },
    {
      icon: Calculator,
      title: 'Impact Tracker',
      description: 'Monitor your carbon footprint and get personalized reduction strategies.',
      color: 'from-purple-400 to-pink-500',
      delay: '200ms'
    },
    {
      icon: Calendar,
      title: 'Climate Events',
      description: 'Join local environmental actions and make real-world impact.',
      color: 'from-orange-400 to-red-500',
      delay: '300ms'
    }
  ];

  const stats = [
    { number: '75K+', label: 'Eco Warriors', icon: Users, color: 'text-emerald-600' },
    { number: '3.2M', label: 'CO₂ Reduced', icon: Leaf, color: 'text-green-600' },
    { number: '25K+', label: 'Green Products', icon: ShoppingBag, color: 'text-blue-600' },
    { number: '800+', label: 'Monthly Events', icon: Calendar, color: 'text-purple-600' }
  ];

  const testimonials = [
    {
      name: 'Maya Patel',
      role: 'Climate Researcher',
      avatar: 'MP',
      content: 'Dr. Krishak transformed my lifestyle. I\'ve cut my carbon footprint by 60% and inspired my entire neighborhood!',
      rating: 5,
      impact: '2.4 tons CO₂ saved'
    },
    {
      name: 'James Wilson',
      role: 'Sustainable Business Owner',
      avatar: 'JW',
      content: 'The marketplace connected me with thousands of eco-conscious customers. My green business has tripled!',
      rating: 5,
      impact: '500+ products sold'
    },
    {
      name: 'Luna Rodriguez',
      role: 'Environmental Educator',
      avatar: 'LR',
      content: 'Through Dr. Krishak events, I\'ve organized 20+ community cleanups and educated hundreds of people.',
      rating: 5,
      impact: '15 events organized'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-green-200/20 to-emerald-200/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-xl border-b border-green-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-green-200 transition-all duration-300 group-hover:scale-110">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                  Dr. <span className="text-green-600">Krishak</span>
                </h1>
                <p className="text-xs text-gray-500">Environmental Platform</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 font-medium transition-all duration-200 hover:scale-105">
                Features
              </a>
              <a href="#community" className="text-gray-600 hover:text-green-600 font-medium transition-all duration-200 hover:scale-105">
                Community
              </a>
              <a href="#impact" className="text-gray-600 hover:text-green-600 font-medium transition-all duration-200 hover:scale-105">
                Impact
              </a>
              <button 
                onClick={onEnterApp}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-green-200 transform hover:scale-105"
              >
                Launch App
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
                  <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Join 75K+ Climate Champions</span>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                  Save Our
                  <br />
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                      Planet
                    </span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transform scale-x-0 animate-scale-x"></div>
                  </span>
                  <br />
                  <span className="text-gray-700">Together</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Connect with eco-warriors, track your environmental impact, and discover 
                  sustainable solutions that create real change for our planet.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onEnterApp}
                  className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 flex items-center justify-center space-x-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Start Your Impact</span>
                  <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <button className="group bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-gray-200/50 hover:border-green-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {['MP', 'JW', 'LR', 'SC'].map((avatar, i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
                        {avatar}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">75K+ members</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>
            
            {/* 3D Hero Visual */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative perspective-1000">
                {/* Main Earth with 3D effect */}
                <div 
                  className="w-96 h-96 relative preserve-3d animate-float-3d"
                  style={{
                    transform: `rotateX(${scrollY * 0.1}deg) rotateY(${mousePosition.x * 0.01}deg)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-2xl">
                    {/* Continents with 3D depth */}
                    <div className="absolute top-16 left-20 w-28 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-90 shadow-lg"></div>
                    <div className="absolute top-24 right-16 w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full opacity-80 shadow-lg"></div>
                    <div className="absolute bottom-20 left-16 w-36 h-28 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-90 shadow-lg"></div>
                    <div className="absolute bottom-24 right-20 w-20 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full opacity-85 shadow-lg"></div>
                    
                    {/* Atmospheric glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/30"></div>
                    <div className="absolute top-8 left-8 w-24 h-24 bg-white opacity-30 rounded-full blur-2xl"></div>
                  </div>
                  
                  {/* Orbital rings with 3D rotation */}
                  <div className="absolute inset-0 border-2 border-green-300/40 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-4 border border-blue-300/30 rounded-full animate-spin-reverse"></div>
                  <div className="absolute inset-8 border border-purple-300/20 rounded-full animate-spin-slow"></div>
                </div>
                
                {/* Floating 3D Icons */}
                <div 
                  className="absolute -top-8 -left-12 bg-white p-4 rounded-2xl shadow-xl animate-float-icon transform-gpu"
                  style={{
                    transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 20px) rotateX(${scrollY * 0.05}deg)`,
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <Recycle className="h-6 w-6 text-green-600" />
                </div>
                
                <div 
                  className="absolute top-16 -right-16 bg-white p-4 rounded-2xl shadow-xl animate-float-icon-delayed transform-gpu"
                  style={{
                    transform: `translate3d(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px, 30px) rotateY(${scrollY * 0.03}deg)`,
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                
                <div 
                  className="absolute -bottom-12 -left-16 bg-white p-4 rounded-2xl shadow-xl animate-float-icon transform-gpu"
                  style={{
                    transform: `translate3d(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px, 25px) rotateZ(${scrollY * 0.02}deg)`,
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                
                <div 
                  className="absolute bottom-12 -right-12 bg-white p-4 rounded-2xl shadow-xl animate-float-icon-delayed transform-gpu"
                  style={{
                    transform: `translate3d(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px, 35px) rotateX(${scrollY * -0.04}deg)`,
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <Leaf className="h-6 w-6 text-green-500" />
                </div>
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-float-particle opacity-60"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${15 + i * 8}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with 3D Cards */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="group perspective-1000"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative preserve-3d group-hover:rotate-y-12 transition-transform duration-500 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </div>
                    
                    {/* 3D depth effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl -z-10 transform translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced 3D */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-green-50/30 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="h-4 w-4" />
              <span>Comprehensive Platform</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Everything for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Sustainable Living</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and vibrant community to accelerate your environmental impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="group perspective-1000"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="relative preserve-3d group-hover:rotate-y-6 transition-all duration-500 bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Background gradient effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* 3D depth layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl -z-10 transform translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl -z-20 transform translate-x-4 translate-y-4 opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="community" className="py-24 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Loved by
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Climate Champions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from our community making real impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group perspective-1000"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative preserve-3d group-hover:rotate-y-6 transition-all duration-500 bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100">
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">{testimonial.impact}</div>
                    </div>
                  </div>
                  
                  {/* 3D depth effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl -z-10 transform translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section id="impact" className="py-24 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/20 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              <span>Join the Movement</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Create
              <br />
              <span className="text-green-200">Real Environmental Impact?</span>
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Join 75,000+ eco-warriors already making a difference. 
              Start your sustainable journey today and help save our planet.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button 
              onClick={onEnterApp}
              className="group relative bg-white text-green-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 flex items-center space-x-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Start Your Impact Journey</span>
              <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <div className="text-green-100 text-center">
              <div className="font-semibold">100% Free Forever</div>
              <div className="text-sm opacity-80">No credit card required</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center group">
              <CheckCircle className="h-10 w-10 text-green-300 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-green-100 font-semibold">Free Forever</div>
              <div className="text-green-200 text-sm">Always free to use</div>
            </div>
            <div className="text-center group">
              <CheckCircle className="h-10 w-10 text-green-300 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-green-100 font-semibold">Global Community</div>
              <div className="text-green-200 text-sm">75K+ members worldwide</div>
            </div>
            <div className="text-center group">
              <CheckCircle className="h-10 w-10 text-green-300 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-green-100 font-semibold">Real Impact</div>
              <div className="text-green-200 text-sm">3.2M tons CO₂ saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg group-hover:shadow-green-500/25 transition-all duration-300 group-hover:scale-110">
                  <Leaf className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold group-hover:text-green-400 transition-colors">
                    Dr. <span className="text-green-400">Krishak</span>
                  </h1>
                  <p className="text-sm text-gray-400">Environmental Platform</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md text-lg leading-relaxed">
                Connecting environmental enthusiasts worldwide to create a sustainable future 
                through community action and individual responsibility.
              </p>
              <div className="flex space-x-4">
                {[MessageCircle, Users, Globe].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-green-600 transition-all duration-300 cursor-pointer group hover:scale-110">
                    <Icon className="h-6 w-6 group-hover:text-white" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                {['Communities', 'Marketplace', 'Events', 'Calculator'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-green-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                {['About Us', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-green-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="text-lg">&copy; 2024 Dr. Krishak. All rights reserved. Made with 💚 for our planet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;