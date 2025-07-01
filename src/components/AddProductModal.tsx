import React, { useState } from 'react';
import { X, Upload, Camera, DollarSign, Package, Leaf, Tag, MapPin, Info } from 'lucide-react';
import { useAuth } from './AuthContext';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: any) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onProductAdded }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    condition: 'new',
    images: [] as string[],
    sustainability: {
      carbonNeutral: false,
      biodegradable: false,
      recycled: false,
      renewable: false
    },
    impact: '',
    location: '',
    shipping: {
      free: false,
      cost: '',
      methods: [] as string[]
    },
    tags: [] as string[],
    specifications: {
      brand: '',
      model: '',
      dimensions: '',
      weight: '',
      materials: ''
    }
  });
  const [errors, setErrors] = useState<any>({});
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'zerowaste', name: 'Zero Waste', icon: '♻️' },
    { id: 'renewable', name: 'Renewable Energy', icon: '⚡' },
    { id: 'organic', name: 'Organic Products', icon: '🌱' },
    { id: 'secondhand', name: 'Second Hand', icon: '🔄' },
    { id: 'sustainable-fashion', name: 'Sustainable Fashion', icon: '👕' },
    { id: 'eco-home', name: 'Eco Home & Garden', icon: '🏠' },
    { id: 'green-tech', name: 'Green Technology', icon: '📱' },
    { id: 'natural-beauty', name: 'Natural Beauty', icon: '💄' }
  ];

  const shippingMethods = [
    'Standard Shipping',
    'Express Shipping',
    'Local Pickup',
    'Carbon Neutral Delivery',
    'Bike Delivery'
  ];

  const suggestedTags = [
    'Eco-Friendly', 'Sustainable', 'Organic', 'Recycled', 'Biodegradable',
    'Carbon Neutral', 'Fair Trade', 'Vegan', 'Non-Toxic', 'Renewable',
    'Upcycled', 'Plastic-Free', 'Zero Waste', 'Energy Efficient', 'Local'
  ];

  const validateStep = (step: number) => {
    const newErrors: any = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Product name is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.price) newErrors.price = 'Price is required';
      if (!formData.category) newErrors.category = 'Category is required';
    }

    if (step === 2) {
      if (formData.images.length === 0) newErrors.images = 'At least one image is required';
      if (!formData.impact.trim()) newErrors.impact = 'Environmental impact is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name.startsWith('sustainability.')) {
        const field = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          sustainability: {
            ...prev.sustainability,
            [field]: checkbox.checked
          }
        }));
      } else if (name.startsWith('shipping.')) {
        const field = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          shipping: {
            ...prev.shipping,
            [field]: checkbox.checked
          }
        }));
      }
    } else if (name.startsWith('specifications.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, imageUrl].slice(0, 5) // Max 5 images
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleShippingMethodChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        methods: checked 
          ? [...prev.shipping.methods, method]
          : prev.shipping.methods.filter(m => m !== method)
      }
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        seller: user?.name || 'Unknown Seller',
        sellerId: user?.id,
        rating: 0,
        reviews: 0,
        dateAdded: new Date().toISOString(),
        status: 'active',
        views: 0,
        favorites: 0
      };

      onProductAdded(newProduct);
      setIsLoading(false);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        condition: 'new',
        images: [],
        sustainability: {
          carbonNeutral: false,
          biodegradable: false,
          recycled: false,
          renewable: false
        },
        impact: '',
        location: '',
        shipping: {
          free: false,
          cost: '',
          methods: []
        },
        tags: [],
        specifications: {
          brand: '',
          model: '',
          dimensions: '',
          weight: '',
          materials: ''
        }
      });
      setCurrentStep(1);
      setErrors({});
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">List Your Eco Product</h2>
              <p className="text-emerald-100 text-sm">Share sustainable solutions with the community</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  currentStep >= step ? 'bg-white text-emerald-600' : 'bg-white/20 text-white'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 rounded transition-colors ${
                    currentStep > step ? 'bg-white' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-2 text-sm text-emerald-100">
            Step {currentStep}: {
              currentStep === 1 ? 'Basic Information' :
              currentStep === 2 ? 'Images & Impact' :
              'Details & Shipping'
            }
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="e.g., Bamboo Fiber Dinnerware Set"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.category ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Describe your product, its features, and benefits..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price * ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                        errors.price ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Optional: Show discount</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="refurbished">Refurbished</option>
                  </select>
                </div>
              </div>

              {/* Sustainability Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sustainability Features
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: 'carbonNeutral', label: 'Carbon Neutral', icon: '🌍' },
                    { key: 'biodegradable', label: 'Biodegradable', icon: '🌱' },
                    { key: 'recycled', label: 'Recycled Materials', icon: '♻️' },
                    { key: 'renewable', label: 'Renewable Energy', icon: '⚡' }
                  ].map((feature) => (
                    <label key={feature.key} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        name={`sustainability.${feature.key}`}
                        checked={formData.sustainability[feature.key as keyof typeof formData.sustainability]}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm">{feature.icon} {feature.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Images & Impact */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Images * (Max 5)
                </label>
                
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
                  } ${errors.images ? 'border-red-300 bg-red-50' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop images here, or click to select</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer inline-block"
                  >
                    Choose Images
                  </label>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB each</p>
                </div>
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Environmental Impact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Environmental Impact *
                </label>
                <div className="relative">
                  <Leaf className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="impact"
                    value={formData.impact}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.impact ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="e.g., Saves 50kg CO2 annually, Replaces 1000+ plastic bottles, Plants 1 tree per purchase"
                  />
                </div>
                {errors.impact && <p className="text-red-500 text-sm mt-1">{errors.impact}</p>}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tags (Max 10)
                </label>
                
                {/* Selected Tags */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Suggested Tags */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Suggested Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.filter(tag => !formData.tags.includes(tag)).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                        disabled={formData.tags.length >= 10}
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details & Shipping */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Product Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <input
                      type="text"
                      name="specifications.brand"
                      value={formData.specifications.brand}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., EcoGreen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                    <input
                      type="text"
                      name="specifications.model"
                      value={formData.specifications.model}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., BF-2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                    <input
                      type="text"
                      name="specifications.dimensions"
                      value={formData.specifications.dimensions}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 10 x 8 x 2 inches"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                    <input
                      type="text"
                      name="specifications.weight"
                      value={formData.specifications.weight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 2.5 lbs"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Materials</label>
                  <textarea
                    name="specifications.materials"
                    value={formData.specifications.materials}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="e.g., 100% organic bamboo fiber, natural plant-based dyes"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>

              {/* Shipping */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="shipping.free"
                      checked={formData.shipping.free}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Free Shipping</span>
                  </label>

                  {!formData.shipping.free && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping Cost ($)
                      </label>
                      <input
                        type="number"
                        name="shipping.cost"
                        value={formData.shipping.cost}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="0.00"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Shipping Methods
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {shippingMethods.map((method) => (
                        <label key={method} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.shipping.methods.includes(method)}
                            onChange={(e) => handleShippingMethodChange(method, e.target.checked)}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Previous
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    'Publish Product'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;