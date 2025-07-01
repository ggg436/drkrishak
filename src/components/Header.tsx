import React, { useState } from 'react';
import { Search, Bell, MessageCircle, User, Leaf, LogOut, Settings, Globe } from 'lucide-react';
import { useAuth } from './AuthContext';
import AuthModal from './AuthModal';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const handleAuthSuccess = (userData: any) => {
    login(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setShowLanguageMenu(false);
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

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
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

            {/* User Actions */}
            <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </header>

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