import React, { useState } from 'react';
import { ArrowLeft, Package, DollarSign, Eye, Heart, TrendingUp, Edit, Trash2, Plus, Star, MessageCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

interface SellerDashboardProps {
  onBack: () => void;
  userProducts: any[];
  onEditProduct: (product: any) => void;
  onDeleteProduct: (productId: number) => void;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ 
  onBack, 
  userProducts, 
  onEditProduct, 
  onDeleteProduct 
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const sellerStats = {
    totalProducts: userProducts.length,
    totalSales: 1247,
    totalRevenue: 15680.50,
    totalViews: 8934,
    averageRating: 4.8,
    totalReviews: 156
  };

  const recentOrders = [
    {
      id: 1,
      product: 'Bamboo Fiber Dinnerware Set',
      buyer: 'Alex Rivera',
      amount: 24.99,
      status: 'shipped',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      product: 'Solar Power Bank 20000mAh',
      buyer: 'Maria Santos',
      amount: 45.99,
      status: 'processing',
      date: '2024-01-14',
      image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      product: 'Organic Cotton Tote Bags',
      buyer: 'James Wilson',
      amount: 18.99,
      status: 'delivered',
      date: '2024-01-13',
      image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'sold': return 'bg-blue-100 text-blue-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
              <p className="text-gray-600">Manage your eco-friendly products and sales</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">Seller since {new Date(user?.joinDate || '').toLocaleDateString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.avatar}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Products</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{sellerStats.totalProducts}</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Revenue</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">${sellerStats.totalRevenue.toLocaleString()}</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Sales</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{sellerStats.totalSales}</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">Views</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{sellerStats.totalViews.toLocaleString()}</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-600">Rating</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{sellerStats.averageRating}</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <MessageCircle className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-600">Reviews</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{sellerStats.totalReviews}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'products', label: 'My Products' },
            { id: 'orders', label: 'Orders' },
            { id: 'analytics', label: 'Analytics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={order.image}
                        alt={order.product}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{order.product}</h4>
                        <p className="text-sm text-gray-600">Buyer: {order.buyer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">${order.amount}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-2">Environmental Impact</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">CO₂ Saved</span>
                        <span className="font-semibold text-green-800">127.5 tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">Trees Planted</span>
                        <span className="font-semibold text-green-800">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">Plastic Eliminated</span>
                        <span className="font-semibold text-green-800">15.2K items</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2">Sales Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">Conversion Rate</span>
                        <span className="font-semibold text-blue-800">3.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">Avg. Order Value</span>
                        <span className="font-semibold text-blue-800">$32.45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">Return Rate</span>
                        <span className="font-semibold text-blue-800">1.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">My Products ({userProducts.length})</h3>
              </div>
              
              {userProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No products yet</h3>
                  <p className="text-gray-500 mb-6">Start selling eco-friendly products to make a positive impact</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProducts.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={product.images?.[0] || product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3 flex space-x-2">
                          <button
                            onClick={() => onEditProduct(product)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(product.id)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                        <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status || 'active')}`}>
                          {product.status || 'active'}
                        </span>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-800">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{product.rating || 0}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{product.views || 0} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{product.favorites || 0} likes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Order Management</h3>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{order.product}</h4>
                      <p className="text-sm text-gray-600">Order #{order.id} • {order.buyer}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">${order.amount}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Sales Analytics</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Revenue Trend</h4>
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart placeholder - Revenue over time</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Product Performance</h4>
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart placeholder - Top selling products</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Environmental Impact Over Time</h4>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - CO₂ saved, trees planted, etc.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;