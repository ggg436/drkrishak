import React from 'react';
import { 
  Home, 
  ShoppingBag, 
  User, 
  Calculator, 
  Users, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { useAuth } from './AuthContext';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { user, isAuthenticated } = useAuth();

  const menuItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'marketplace', label: 'Green Marketplace', icon: ShoppingBag },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'calculator', label: 'Carbon Calculator', icon: Calculator },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="fixed left-0 top-20 h-full w-64 bg-white border-r border-green-100 shadow-sm">
      <div className="p-6">
        {/* Quick Stats */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Your Impact</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Carbon Saved</span>
              </div>
              <span className="text-sm font-semibold text-green-600">
                {isAuthenticated ? `${user?.stats.carbonSaved || 0} tons` : '0 tons'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-700">Eco Points</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">
                {isAuthenticated ? user?.stats.ecoPoints || 0 : 0}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-green-100 text-green-700 border-r-2 border-green-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-green-600' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Current Challenge */}
        <div className="mt-8 p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white">
          <h4 className="font-semibold mb-2">Monthly Challenge</h4>
          <p className="text-sm opacity-90 mb-3">Reduce plastic usage by 50%</p>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: '68%' }}></div>
          </div>
          <p className="text-xs mt-2 opacity-80">68% complete</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;