import React, { useState } from 'react';
import { Search, Filter, Star, Heart, ShoppingCart, Leaf, Recycle, Zap, Cloud, Upload, Sparkles, Lock, PlusSquare } from 'lucide-react';
import { useAuth } from './AuthContext';
import AuthModal from './AuthModal';
import ProductDetails from './ProductDetails';
import AddProductModal from './AddProductModal';
import SellerDashboard from './SellerDashboard';
// Import FarmingPostModal component
// Note: This import is commented out until the FarmingPostModal component is created
// import FarmingPostModal from './FarmingPostModal';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showSellerDashboard, setShowSellerDashboard] = useState(false);
  const [userProducts, setUserProducts] = useState<any[]>([]);
  // Add state for showing the farming post modal
  const [showFarmingPostModal, setShowFarmingPostModal] = useState(false);
  const { user, isAuthenticated, login } = useAuth();

  const categories = [
    { id: 'all', name: 'All Products', icon: ShoppingCart },
    { id: 'secondhand', name: 'Second Hand', icon: Recycle },
    { id: 'zerowaste', name: 'Zero Waste', icon: Leaf },
    { id: 'renewable', name: 'Renewable Energy', icon: Zap },
    { id: 'organic', name: 'Organic Products', icon: Leaf },
    { id: 'agriculture', name: 'Agricultural Tools', icon: Cloud }
  ];

  const defaultProducts = [
    {
      id: 1,
      name: 'Bamboo Fiber Dinnerware Set',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviews: 127,
      image: 'https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Green Gardens Co.',
      category: 'zerowaste',
      sustainability: {
        carbonNeutral: true,
        biodegradable: true,
        recycled: false
      },
      description: '100% biodegradable bamboo fiber plates and bowls set',
      impact: 'Plants 1 tree per purchase'
    },
    {
      id: 2,
      name: 'Solar Power Bank 20000mAh',
      price: 45.99,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'EcoTech Solutions',
      category: 'renewable',
      sustainability: {
        carbonNeutral: true,
        biodegradable: false,
        recycled: true
      },
      description: 'Portable solar charger with fast charging capability',
      impact: 'Reduces 50kg CO2 annually'
    },
    {
      id: 3,
      name: 'Organic Cotton Tote Bags (3-Pack)',
      price: 18.99,
      originalPrice: 25.99,
      rating: 4.9,
      reviews: 203,
      image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Sustainable Style',
      category: 'organic',
      sustainability: {
        carbonNeutral: true,
        biodegradable: true,
        recycled: false
      },
      description: 'Durable organic cotton bags for everyday use',
      impact: 'Replaces 1000+ plastic bags'
    },
    {
      id: 4,
      name: 'Refurbished MacBook Air 2020',
      price: 699.99,
      originalPrice: 999.99,
      rating: 4.7,
      reviews: 45,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'TechReNew',
      category: 'secondhand',
      sustainability: {
        carbonNeutral: false,
        biodegradable: false,
        recycled: true
      },
      description: 'Professionally refurbished laptop in excellent condition',
      impact: 'Saves 300kg CO2 vs new'
    },
    {
      id: 5,
      name: 'Stainless Steel Water Bottle',
      price: 29.99,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.pexels.com/photos/3737631/pexels-photo-3737631.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'HydroGreen',
      category: 'zerowaste',
      sustainability: {
        carbonNeutral: true,
        biodegradable: false,
        recycled: true
      },
      description: 'Insulated bottle keeps drinks cold for 24h, hot for 12h',
      impact: 'Eliminates 1000+ plastic bottles'
    },
    {
      id: 6,
      name: 'LED Solar Garden Lights (6-Pack)',
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.5,
      reviews: 78,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Solar Solutions',
      category: 'renewable',
      sustainability: {
        carbonNeutral: true,
        biodegradable: false,
        recycled: true
      },
      description: 'Weather-resistant solar-powered garden lighting',
      impact: 'Zero electricity cost'
    },
    {
      id: 7,
      name: 'Refurbished 1960s Farmall Tractor',
      price: 8999.99,
      originalPrice: 12500.00,
      rating: 4.9,
      reviews: 32,
      image: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Vintage Farm Equipment',
      category: 'agriculture',
      sustainability: {
        carbonNeutral: false,
        biodegradable: false,
        recycled: true
      },
      description: 'Fully restored vintage tractor, perfect working condition with modern upgrades',
      impact: 'Extends equipment lifecycle by decades'
    },
    {
      id: 8,
      name: 'Hand-Forged Traditional Sickle',
      price: 89.99,
      rating: 4.7,
      reviews: 56,
      image: 'https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Heritage Farm Tools',
      category: 'agriculture',
      sustainability: {
        carbonNeutral: true,
        biodegradable: false,
        recycled: false
      },
      description: 'Traditional hand-crafted harvesting tool, ergonomic wooden handle',
      impact: 'Supports local artisans & reduces machinery dependence'
    },
    {
      id: 9,
      name: 'Antique Wooden Plough',
      price: 450.00,
      originalPrice: 600.00,
      rating: 4.8,
      reviews: 24,
      image: 'https://images.pexels.com/photos/688668/pexels-photo-688668.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Rural Antiquities',
      category: 'agriculture',
      sustainability: {
        carbonNeutral: true,
        biodegradable: true,
        recycled: true
      },
      description: 'Beautifully preserved wooden plough from the 1800s, functional or decorative',
      impact: 'Preserves agricultural heritage'
    },
    {
      id: 10,
      name: 'Reconditioned Farm Seeder',
      price: 1299.99,
      originalPrice: 1899.99,
      rating: 4.6,
      reviews: 41,
      image: 'https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'AgriRestore Co-op',
      category: 'agriculture',
      sustainability: {
        carbonNeutral: false,
        biodegradable: false,
        recycled: true
      },
      description: 'Professional-grade seeder restored to like-new condition, multiple row capacity',
      impact: 'Reduces manufacturing waste by 85%'
    }
  ];

  // Combine default products with user products
  const allProducts = [...defaultProducts, ...userProducts];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAuthSuccess = (userData: any) => {
    login(userData);
    setShowAuthModal(false);
  };

  const handleProductClick = (productId: number) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setSelectedProduct(productId);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    // Handle add to cart logic
    console.log('Added to cart:', productId);
  };

  const handleProductAdded = (newProduct: any) => {
    setUserProducts(prev => [...prev, newProduct]);
    setShowAddProductModal(false);
  };

  const handleEditProduct = (product: any) => {
    // For now, just log the product to edit
    console.log('Edit product:', product);
    // In a real app, you would open an edit modal with the product data
  };

  const handleDeleteProduct = (productId: number) => {
    setUserProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Add function to handle new farming posts
  const handlePostSubmitted = (newPost: any) => {
    // In a real app, you would add this post to your feed
    console.log('New farming post submitted:', newPost);
    // You could update your posts state here
    alert('Farming post submitted successfully!');
  };

  // Show seller dashboard if selected
  if (showSellerDashboard) {
    return (
      <SellerDashboard
        onBack={() => setShowSellerDashboard(false)}
        userProducts={userProducts}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    );
  }

  // Show product details if a product is selected
  if (selectedProduct) {
    return (
      <ProductDetails 
        productId={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
      />
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <ShoppingCart className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white/90 text-sm font-medium flex items-center space-x-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Your Sustainable Marketplace</span>
                    </span>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
                  Green Marketplace
                </h1>
                <p className="text-lg text-white/90 leading-relaxed max-w-lg">
                  Discover sustainable products that make a positive environmental impact. 
                  Shop consciously, live sustainably.
                </p>
                
                {/* Stats */}
                <div className="flex items-center space-x-8 mt-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{allProducts.length}K+</div>
                    <div className="text-white/80 text-sm">Eco Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">500+</div>
                    <div className="text-white/80 text-sm">Green Sellers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">1.2M</div>
                    <div className="text-white/80 text-sm">CO₂ Saved</div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-4 mt-8 md:mt-0">
                {/* New Post Button - Update this button */}
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowAuthModal(true);
                      return;
                    }
                    setShowFarmingPostModal(true);
                  }}
                  className="bg-white text-emerald-600 px-6 py-3 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <PlusSquare className="h-5 w-5" />
                  <span>Create Farming Post</span>
                </button>

                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setShowSellerDashboard(true)}
                      className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl hover:bg-white/30 transition-all duration-300 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Cloud className="h-5 w-5" />
                      <span>Seller Dashboard</span>
                    </button>
                    <button
                      onClick={() => setShowAddProductModal(true)}
                      className="bg-white text-emerald-600 px-6 py-3 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Upload className="h-5 w-5" />
                      <span>List Product</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl hover:bg-white/30 transition-all duration-300 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Lock className="h-5 w-5" />
                    <span>Sign In to Shop</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for sustainable products, eco-friendly solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-500"
              />
            </div>
            
            {/* Filter Button */}
            <button className="flex items-center space-x-3 px-6 py-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700 hover:border-emerald-300">
              <Filter className="h-6 w-6 text-gray-500" />
              <span>Advanced Filters</span>
            </button>
          </div>

          {/* Enhanced Categories */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop by Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-200 font-medium ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* User Products Section */}
        {isAuthenticated && userProducts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Your Listed Products</h3>
              <button
                onClick={() => setShowSellerDashboard(true)}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
              >
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.images?.[0] || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 line-clamp-1">{product.name}</h4>
                      <p className="text-sm text-gray-600">${product.price}</p>
                      <p className="text-xs text-green-600">Active</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative group"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Auth Required Overlay */}
              {!isAuthenticated && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl text-center">
                    <Lock className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">Sign in to view details</p>
                  </div>
                </div>
              )}

              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <button 
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isAuthenticated) {
                      setShowAuthModal(true);
                    }
                  }}
                >
                  <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                </button>
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-800 text-lg line-clamp-2">{product.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                {/* Sustainability Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.sustainability.carbonNeutral && (
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Carbon Neutral</span>
                  )}
                  {product.sustainability.biodegradable && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Biodegradable</span>
                  )}
                  {product.sustainability.recycled && (
                    <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">Recycled</span>
                  )}
                </div>

                {/* Impact */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl mb-4 border border-green-100">
                  <p className="text-sm text-green-700 font-semibold flex items-center space-x-2">
                    <Leaf className="h-4 w-4" />
                    <span>{product.impact}</span>
                  </p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-700">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>

                {/* Seller */}
                <p className="text-sm text-gray-500 mb-4">Sold by <span className="font-medium text-gray-700">{product.seller}</span></p>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <button 
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={(e) => handleAddToCart(e, product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onProductAdded={handleProductAdded}
      />

      {/* Uncomment when FarmingPostModal component is created */}
      {/* {showFarmingPostModal && (
        <FarmingPostModal 
          isOpen={showFarmingPostModal}
          onClose={() => setShowFarmingPostModal(false)}
          onPostSubmitted={handlePostSubmitted}
        />
      )} */}
    </>
  );
};

export default Marketplace;