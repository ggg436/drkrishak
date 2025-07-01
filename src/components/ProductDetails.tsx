import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  Leaf, 
  Recycle, 
  Award,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Zap,
  Globe,
  CheckCircle,
  Info,
  Plus,
  Minus,
  Eye,
  Package,
  Clock,
  Users,
  Camera,
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  TreePine,
  Droplets,
  Wind,
  Factory,
  Waves,
  Mountain
} from 'lucide-react';

interface ProductDetailsProps {
  productId: number;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState('natural');

  // Enhanced product data
  const product = {
    id: 1,
    name: 'Bamboo Fiber Dinnerware Set',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 127,
    images: [
      'https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3737631/pexels-photo-3737631.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    seller: {
      name: 'Green Gardens Co.',
      avatar: 'GG',
      rating: 4.9,
      verified: true,
      responseTime: '< 2 hours',
      location: 'Portland, OR',
      totalSales: '2.5K+',
      memberSince: '2021'
    },
    category: 'zerowaste',
    inStock: true,
    stockCount: 23,
    fastShipping: true,
    colors: [
      { id: 'natural', name: 'Natural Bamboo', hex: '#D4B896' },
      { id: 'charcoal', name: 'Charcoal', hex: '#4A4A4A' },
      { id: 'sage', name: 'Sage Green', hex: '#9CAF88' }
    ],
    sustainability: {
      carbonNeutral: true,
      biodegradable: true,
      recycled: false,
      certifications: ['FSC Certified', 'Biodegradable', 'Non-toxic', 'Food Safe']
    },
    description: 'Beautiful and sustainable bamboo fiber dinnerware set perfect for everyday use and special occasions. Made from 100% natural bamboo fiber with food-safe, non-toxic finish that brings nature to your table.',
    features: [
      'Set includes 4 plates, 4 bowls, and 4 cups',
      '100% biodegradable bamboo fiber construction',
      'Dishwasher safe (top rack only)',
      'Microwave safe up to 2 minutes',
      'Lightweight yet durable design',
      'Natural antibacterial properties',
      'Available in multiple color options',
      'Scratch and stain resistant',
      'BPA and chemical-free',
      'Elegant modern design'
    ],
    specifications: {
      'Material': 'Bamboo Fiber',
      'Set Size': '12 pieces',
      'Plate Diameter': '10 inches',
      'Bowl Capacity': '16 oz',
      'Cup Capacity': '12 oz',
      'Weight': '2.5 lbs',
      'Care': 'Dishwasher safe',
      'Origin': 'Sustainably sourced',
      'Warranty': '2 years',
      'Certifications': 'FSC, FDA approved'
    },
    impact: {
      treesPlanted: 1,
      carbonSaved: '0.5kg CO₂',
      plasticReplaced: '50+ plastic items',
      biodegradableTime: '2-3 years',
      waterSaved: '15L',
      energySaved: '2.3kWh',
      landfillDiverted: '1.2kg',
      renewableEnergy: '85%',
      oceanPlasticPrevented: '25 bottles'
    },
    shipping: {
      free: true,
      estimatedDays: '2-3',
      carbonNeutral: true,
      express: true
    },
    warranty: '2 years manufacturer warranty',
    tags: ['Eco-Friendly', 'Sustainable', 'Bamboo', 'Dinnerware', 'Zero Waste', 'Natural']
  };

  const reviews = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'SJ',
        verified: true,
        location: 'California, US'
      },
      rating: 5,
      date: '2024-01-10',
      title: 'Amazing quality and eco-friendly!',
      content: 'These plates are absolutely beautiful and feel great in your hands. Love that they\'re completely biodegradable. The quality is outstanding for the price. My family loves using them for both everyday meals and special occasions.',
      helpful: 23,
      verified_purchase: true,
      images: ['https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg?auto=compress&cs=tinysrgb&w=200']
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: 'MC',
        verified: true,
        location: 'New York, US'
      },
      rating: 4,
      date: '2024-01-08',
      title: 'Great for outdoor dining',
      content: 'Perfect for camping and outdoor events. Lightweight but sturdy. The natural bamboo color looks elegant. Only wish they came in more color options, but overall very satisfied with the purchase.',
      helpful: 18,
      verified_purchase: true,
      images: []
    },
    {
      id: 3,
      user: {
        name: 'Emma Davis',
        avatar: 'ED',
        verified: true,
        location: 'Texas, US'
      },
      rating: 5,
      date: '2024-01-05',
      title: 'Kids love them!',
      content: 'My kids actually prefer these over our regular plates. They\'re the perfect size and I love that they\'re safe and natural. No more worrying about chemicals or breakage. Highly recommend!',
      helpful: 15,
      verified_purchase: true,
      images: []
    }
  ];

  const relatedProducts = [
    {
      id: 2,
      name: 'Bamboo Cutlery Set',
      price: 15.99,
      originalPrice: 22.99,
      image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.7,
      reviews: 89
    },
    {
      id: 3,
      name: 'Organic Cotton Napkins',
      price: 12.99,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.6,
      reviews: 156
    },
    {
      id: 4,
      name: 'Bamboo Serving Tray',
      price: 28.99,
      originalPrice: 39.99,
      image: 'https://images.pexels.com/photos/3737631/pexels-photo-3737631.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      reviews: 203
    },
    {
      id: 5,
      name: 'Eco-Friendly Storage Containers',
      price: 34.99,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.5,
      reviews: 78
    }
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Enhanced Back Button */}
        <button
          onClick={onBack}
          className="group flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-all duration-300 bg-white px-6 py-3 rounded-2xl shadow-sm hover:shadow-md border border-gray-100"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to Marketplace</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Product Images Section */}
          <div className="space-y-6">
            {/* Main Image with Enhanced Features */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden group">
              <div className="relative">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[500px] object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                  onClick={() => setShowImageModal(true)}
                />
                
                {/* Image Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>

                {/* Enhanced Badges */}
                <div className="absolute top-6 left-6 flex flex-col space-y-3">
                  {product.originalPrice && (
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
                      <Sparkles className="h-4 w-4" />
                      <span>Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
                    <Leaf className="h-4 w-4" />
                    <span>Eco-Certified</span>
                  </div>
                  {product.fastShipping && (
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
                      <Zap className="h-4 w-4" />
                      <span>Fast Shipping</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex flex-col space-y-3">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 group/heart"
                  >
                    <Heart className={`h-6 w-6 transition-all duration-300 ${isWishlisted ? 'text-red-500 fill-current scale-110' : 'text-gray-600 group-hover/heart:text-red-500 group-hover/heart:scale-110'}`} />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 group/share">
                    <Share2 className="h-6 w-6 text-gray-600 group-hover/share:text-blue-500 transition-colors" />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 group/view">
                    <Eye className="h-6 w-6 text-gray-600 group-hover/view:text-purple-500 transition-colors" />
                  </button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {selectedImage + 1} / {product.images.length}
                </div>
              </div>
            </div>

            {/* Enhanced Thumbnail Grid */}
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-2xl overflow-hidden border-3 transition-all duration-300 transform hover:scale-105 ${
                    selectedImage === index 
                      ? 'border-green-500 shadow-lg shadow-green-200 scale-105' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Product Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span key={index} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium hover:from-green-100 hover:to-emerald-100 hover:text-green-700 transition-all duration-200 cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced Product Info Section */}
          <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              {/* Status Badges */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-blue-100 text-blue-700 text-sm px-4 py-2 rounded-full font-semibold capitalize">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="bg-green-100 text-green-700 text-sm px-4 py-2 rounded-full font-semibold flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>In Stock ({product.stockCount} left)</span>
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded-full font-semibold">
                    Out of Stock
                  </span>
                )}
                <span className="bg-purple-100 text-purple-700 text-sm px-4 py-2 rounded-full font-semibold flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>Bestseller</span>
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">{product.name}</h1>
              
              {/* Enhanced Rating Section */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-6 w-6 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xl font-bold text-gray-700">{product.rating}</span>
                </div>
                <span className="text-gray-500 text-lg">({product.reviews} reviews)</span>
                <button className="text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-colors">
                  Write a review
                </button>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`relative p-1 rounded-full transition-all duration-200 ${
                        selectedColor === color.id ? 'ring-4 ring-green-500 ring-offset-2' : 'hover:scale-110'
                      }`}
                    >
                      <div 
                        className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColor === color.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-white drop-shadow-lg" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {product.colors.find(c => c.id === selectedColor)?.name}
                </p>
              </div>
            </div>

            {/* Enhanced Pricing Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl border border-green-100 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-5xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-3xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-6 mb-8">
                <span className="text-lg font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-2xl bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-l-2xl"
                  >
                    <Minus className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="px-6 py-3 font-bold text-lg min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-r-2xl"
                  >
                    <Plus className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: <span className="font-bold text-gray-800">${(product.price * quantity).toFixed(2)}</span>
                </span>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3">
                  <ShoppingCart className="h-6 w-6" />
                  <span>Add to Cart</span>
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  Buy Now
                </button>
              </div>

              {/* Payment Options */}
              <div className="text-center text-sm text-gray-600 mb-4">
                <p>💳 Secure payment • 🔒 SSL encrypted • 📱 Apple Pay & Google Pay accepted</p>
              </div>
            </div>

            {/* Enhanced Environmental Impact */}
            <div className="relative bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-8 text-white overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-32 -translate-y-32 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-24 translate-y-24 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              
              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full animate-float-particle"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 12}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: `${4 + i * 0.5}s`
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Environmental Impact</h3>
                    <p className="text-green-100 text-lg">Your purchase makes a real difference</p>
                  </div>
                  <div className="flex-1"></div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white/90 text-sm font-medium flex items-center space-x-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Verified Impact</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="group text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <div className="bg-white/20 p-3 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <TreePine className="h-8 w-8 text-green-200" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{product.impact.treesPlanted}</div>
                    <div className="text-sm opacity-90 font-medium">Tree Planted</div>
                    <div className="text-xs opacity-70 mt-1">Per purchase</div>
                  </div>

                  <div className="group text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <div className="bg-white/20 p-3 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Wind className="h-8 w-8 text-blue-200" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{product.impact.carbonSaved}</div>
                    <div className="text-sm opacity-90 font-medium">CO₂ Saved</div>
                    <div className="text-xs opacity-70 mt-1">vs plastic alternative</div>
                  </div>

                  <div className="group text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <div className="bg-white/20 p-3 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Recycle className="h-8 w-8 text-purple-200" />
                    </div>
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm opacity-90 font-medium">Plastic Items</div>
                    <div className="text-xs opacity-70 mt-1">Replaced</div>
                  </div>

                  <div className="group text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <div className="bg-white/20 p-3 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Droplets className="h-8 w-8 text-cyan-200" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{product.impact.waterSaved}</div>
                    <div className="text-sm opacity-90 font-medium">Water Saved</div>
                    <div className="text-xs opacity-70 mt-1">In production</div>
                  </div>

                  <div className="group text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <div className="bg-white/20 p-3 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-8 w-8 text-yellow-200" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{product.impact.energySaved}</div>
                    <div className="text-sm opacity-90 font-medium">Energy Saved</div>
                    <div className="text-xs opacity-70 mt-1">Renewable sources</div>
                  </div>

                  <div className="group text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <div className="bg-white/20 p-3 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-8 w-8 text-orange-200" />
                    </div>
                    <div className="text-3xl font-bold mb-2">2-3</div>
                    <div className="text-sm opacity-90 font-medium">Years</div>
                    <div className="text-xs opacity-70 mt-1">To biodegrade</div>
                  </div>
                </div>

                {/* Additional Impact Metrics */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-xl">
                        <Mountain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{product.impact.landfillDiverted}</div>
                        <div className="text-sm opacity-80">Landfill Diverted</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-xl">
                        <Factory className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{product.impact.renewableEnergy}</div>
                        <div className="text-sm opacity-80">Renewable Energy</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-xl">
                        <Waves className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{product.impact.oceanPlasticPrevented}</div>
                        <div className="text-sm opacity-80">Ocean Plastic Prevented</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <h4 className="text-xl font-bold mb-2">🌍 Join the Movement</h4>
                    <p className="text-green-100 mb-4">
                      Every purchase contributes to a more sustainable future. Together, we've already saved over 1.2M tons of CO₂!
                    </p>
                    <div className="flex items-center justify-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                        <span>Carbon Neutral Shipping</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <span>Plastic-Free Packaging</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <span>Verified Impact</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Seller Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Sold by</h3>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {product.seller.avatar}
                  </div>
                  {product.seller.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-xl font-bold text-gray-800">{product.seller.name}</h4>
                    {product.seller.verified && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{product.seller.rating}</span>
                      <span>rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>Response: {product.seller.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-blue-500" />
                      <span>{product.seller.totalSales} sales</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>Since {product.seller.memberSince}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold">
                    View Store
                  </button>
                  <button className="bg-blue-100 text-blue-700 px-6 py-3 rounded-xl hover:bg-blue-200 transition-colors font-semibold">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>

            {/* Shipping & Guarantees */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span>Shipping</span>
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Free shipping</span>
                    <span className="font-semibold text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated delivery</span>
                    <span className="font-semibold">{product.shipping.estimatedDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carbon neutral</span>
                    <span className="font-semibold text-green-600">✓</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Guarantees</span>
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">30-day returns</span>
                    <span className="font-semibold text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">2-year warranty</span>
                    <span className="font-semibold text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Secure payment</span>
                    <span className="font-semibold text-green-600">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Details Tabs */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Enhanced Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {[
              { id: 'overview', label: 'Overview', icon: Info },
              { id: 'specifications', label: 'Specifications', icon: Package },
              { id: 'reviews', label: `Reviews (${product.reviews})`, icon: MessageCircle },
              { id: 'shipping', label: 'Shipping & Returns', icon: Truck }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-8 py-6 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-3 border-green-600 bg-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Enhanced Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Features */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                        <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sustainability Certifications */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Sustainability Certifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.sustainability.certifications.map((cert, index) => (
                      <div key={index} className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-6 py-4 rounded-2xl font-semibold text-center shadow-sm hover:shadow-md transition-shadow">
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-8">Product Specifications</h3>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-4 border-b border-gray-200 last:border-b-0">
                        <span className="font-semibold text-gray-600">{key}</span>
                        <span className="text-gray-800 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Enhanced Review Summary */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-gray-800 mb-4">{product.rating}</div>
                      <div className="flex items-center justify-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-8 w-8 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <div className="text-gray-600 text-lg">Based on {product.reviews} reviews</div>
                    </div>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600 w-12">{stars} ★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-yellow-400 h-3 rounded-full transition-all duration-500" 
                              style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12">
                            {stars === 5 ? 89 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 4 : 2}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {review.user.avatar}
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <h4 className="font-bold text-gray-800 text-lg">{review.user.name}</h4>
                              {review.user.verified && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                              {review.verified_purchase && (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                              <span className="text-sm text-gray-500">• {review.user.location}</span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <h5 className="font-bold text-gray-800 text-lg mb-3">{review.title}</h5>
                      <p className="text-gray-700 mb-6 leading-relaxed">{review.content}</p>
                      
                      {review.images.length > 0 && (
                        <div className="flex space-x-3 mb-6">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-xl border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors group">
                          <ThumbsUp className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors group">
                          <ThumbsDown className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">Not helpful</span>
                        </button>
                        <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-3 rounded-xl">
                          <Truck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">Free Shipping</div>
                          <div className="text-gray-600">On orders over $25</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                          <Globe className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">Carbon Neutral Delivery</div>
                          <div className="text-gray-600">Offset shipping emissions</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 p-3 rounded-xl">
                          <Shield className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">Secure Packaging</div>
                          <div className="text-gray-600">Eco-friendly materials</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Returns & Warranty</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="font-bold text-gray-800 text-lg">30-Day Returns</div>
                        <div className="text-gray-600">Free returns on all orders</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-lg">2-Year Warranty</div>
                        <div className="text-gray-600">Manufacturer warranty included</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-lg">Customer Support</div>
                        <div className="text-gray-600">24/7 eco-expert assistance</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Related Products */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-800">You Might Also Like</h3>
            <button className="text-green-600 hover:text-green-700 font-semibold hover:underline">
              View All
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <div className="relative mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  {relatedProduct.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      SALE
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                </div>
                <h4 className="font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">{relatedProduct.name}</h4>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-800">${relatedProduct.price}</span>
                    {relatedProduct.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${relatedProduct.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 font-medium">{relatedProduct.rating}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  {relatedProduct.reviews} reviews
                </div>
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                  Quick Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      selectedImage === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;