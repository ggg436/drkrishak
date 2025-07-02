import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, MessageCircle, User, Leaf, LogOut, Settings, Globe, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from './AuthContext';
import AuthModal from './AuthModal';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user, isAuthenticated, login, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const sliderItems = [
    {
      title: "Eco Tips",
      color: "from-green-400 to-emerald-500",
      icon: "🌱",
      description: "Daily tips for eco-friendly living"
    },
    {
      title: "Plant Doctor",
      color: "from-blue-400 to-cyan-500",
      icon: "🔬",
      description: "Diagnose plant issues with AI"
    },
    {
      title: "Marketplace",
      color: "from-amber-400 to-orange-500",
      icon: "🛒",
      description: "Shop sustainable products"
    },
    {
      title: "Community",
      color: "from-purple-400 to-indigo-500",
      icon: "👥",
      description: "Connect with eco-enthusiasts"
    }
  ];

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAuthSuccess = (userData: any) => {
    login(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setMobileMenuOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setShowLanguageMenu(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };

  return (
    <>
      <header className="bg-white border-b border-green-100 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Dr. <span className="text-green-600">Krishak</span>
                </h1>
                <p className="text-xs text-gray-500">Environmental Social Platform</p>
              </div>
            </div>

            {/* Search Bar - Hide on mobile */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('header.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)} 
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200 flex items-center"
                >
                  <Globe className="h-5 w-5" />
                </button>
                
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700">{t('language.select')}</p>
                    </div>
                    <div className="py-1">
                      <button 
                        onClick={() => changeLanguage('en')} 
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${i18n.language === 'en' ? 'text-green-600 font-medium' : 'text-gray-700'}`}
                      >
                        {t('language.en')}
                      </button>
                      <button 
                        onClick={() => changeLanguage('ne')} 
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${i18n.language === 'ne' ? 'text-green-600 font-medium' : 'text-gray-700'}`}
                      >
                        {t('language.ne')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {isAuthenticated ? (
                <>
                  <button className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200">
                    <Bell className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                  </button>
                  
                  <button className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200">
                    <MessageCircle className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                  </button>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-3 pl-4 border-l border-gray-200 hover:bg-gray-50 rounded-lg transition-colors duration-200 py-2 pr-2"
                    >
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.level}</p>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user?.avatar}
                      </div>
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {user?.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{user?.name}</p>
                              <p className="text-sm text-gray-500">{user?.email}</p>
                              <p className="text-xs text-green-600">{user?.level}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="py-2">
                          <div className="px-4 py-2">
                            <div className="grid grid-cols-2 gap-3 text-center">
                              <div className="bg-green-50 p-2 rounded-lg">
                                <div className="text-sm font-bold text-green-600">{user?.stats.carbonSaved}t</div>
                                <div className="text-xs text-gray-600">{t('header.carbonSaved')}</div>
                              </div>
                              <div className="bg-blue-50 p-2 rounded-lg">
                                <div className="text-sm font-bold text-blue-600">{user?.stats.ecoPoints}</div>
                                <div className="text-xs text-gray-600">{t('header.ecoPoints')}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                              <User className="h-4 w-4" />
                              <span>{t('header.viewProfile')}</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                              <Settings className="h-4 w-4" />
                              <span>{t('header.settings')}</span>
                            </button>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="h-4 w-4" />
                              <span>{t('header.signOut')}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-green-200 transform hover:scale-105"
                >
                  {t('header.signIn')}
                </button>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slider Menu */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-100">
            {isAuthenticated ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-3">
                  {user?.avatar}
                </div>
                <p className="font-medium text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <p className="text-xs text-green-600 mt-1">{user?.level}</p>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-medium"
              >
                {t('header.signIn')}
              </button>
            )}
          </div>
          
          {/* Content Slider */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">{t('header.quickAccess')}</p>
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {sliderItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="min-w-full p-4 rounded-xl bg-gradient-to-r shadow-sm"
                      style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                    >
                      <div className={`bg-gradient-to-r ${item.color} rounded-xl p-5 shadow-md`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-bold text-lg">{item.title}</h3>
                            <p className="text-white text-opacity-90 text-sm mt-1">{item.description}</p>
                          </div>
                          <div className="text-2xl">{item.icon}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <button 
                  className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex space-x-1">
                  {sliderItems.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        currentSlide === index ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
                <button 
                  className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('header.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {isAuthenticated && (
              <>
                <div className="grid grid-cols-2 gap-3 text-center mb-4">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <div className="text-sm font-bold text-green-600">{user?.stats.carbonSaved}t</div>
                    <div className="text-xs text-gray-600">{t('header.carbonSaved')}</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <div className="text-sm font-bold text-blue-600">{user?.stats.ecoPoints}</div>
                    <div className="text-xs text-gray-600">{t('header.ecoPoints')}</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <User className="h-5 w-5 text-gray-500" />
                    <span>{t('header.viewProfile')}</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span>{t('header.notifications')}</span>
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <MessageCircle className="h-5 w-5 text-gray-500" />
                    <span>{t('header.messages')}</span>
                    <span className="ml-auto bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <span>{t('header.settings')}</span>
                  </button>
                </div>
              </>
            )}
            
            {/* Language options */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-2 px-4">{t('language.select')}</p>
              <div className="space-y-1">
                <button 
                  onClick={() => changeLanguage('en')} 
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    i18n.language === 'en' ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Globe className="h-5 w-5" />
                  <span>{t('language.en')}</span>
                </button>
                <button 
                  onClick={() => changeLanguage('ne')} 
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    i18n.language === 'ne' ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Globe className="h-5 w-5" />
                  <span>{t('language.ne')}</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom section */}
          {isAuthenticated && (
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>{t('header.signOut')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay for clicking outside mobile menu to close it */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Header;