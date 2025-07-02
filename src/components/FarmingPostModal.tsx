import React, { useState } from 'react';
import { X, Upload, Camera, Tag, MapPin, Leaf, FileText, MessageCircle, Award, Image } from 'lucide-react';
import { useAuth } from './AuthContext';

interface FarmingPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostSubmitted: (postData: any) => void;
}

const FarmingPostModal: React.FC<FarmingPostModalProps> = ({ isOpen, onClose, onPostSubmitted }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [location, setLocation] = useState('');
  const [postType, setPostType] = useState('tip'); // 'tip', 'question', 'achievement', 'general'
  
  if (!isOpen) return null;
  
  const postTypes = [
    { id: 'general', label: 'General Post', icon: FileText, color: 'blue' },
    { id: 'tip', label: 'Farming Tip', icon: Leaf, color: 'green' },
    { id: 'question', label: 'Question', icon: MessageCircle, color: 'purple' },
    { id: 'achievement', label: 'Harvest', icon: Award, color: 'yellow' }
  ];

  const suggestedTags = [
    'OrganicFarming', 'CropDisease', 'PestManagement', 'SoilHealth', 
    'SeedSelection', 'Harvest', 'Irrigation', 'SustainableFarming',
    'FarmTools', 'CropRotation', 'Fertilizers', 'WaterConservation'
  ];
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  
  const handleAddTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = async () => {
    if (!caption.trim() || !selectedImage) return;
    
    setIsLoading(true);
    
    // Create post data object
    const postData = {
      content: caption,
      image: selectedImage,
      tags: tags,
      type: postType,
      location: location
    };
    
    try {
      onPostSubmitted(postData);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setCaption('');
    setSelectedImage(null);
    setTags([]);
    setTagInput('');
    setLocation('');
    setPostType('tip');
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5 text-white flex items-center justify-between">
          <h2 className="text-xl font-bold">Create Farming Post</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Post Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Type
            </label>
            <div className="flex flex-wrap gap-3">
              {postTypes.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setPostType(type.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      postType === type.id
                        ? `bg-${type.color}-100 text-${type.color}-700 border border-${type.color}-200`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo
            </label>
            <div className={`border-2 border-dashed rounded-lg p-4 text-center ${selectedImage ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-green-300'}`}>
              {selectedImage ? (
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="py-6 cursor-pointer" onClick={() => document.getElementById('image-upload')?.click()}>
                  <Camera className="h-10 w-10 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Upload a photo</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
          
          {/* Caption */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={`Share your ${postType === 'tip' ? 'farming tips' : postType === 'question' ? 'farming question' : postType === 'achievement' ? 'harvest results' : 'thoughts'}...`}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 min-h-[100px] resize-none"
            />
          </div>
          
          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags <span className="text-gray-400 text-xs">(Max 5)</span>
            </label>
            <div className="relative">
              <div className="flex items-center">
                <Tag className="h-5 w-5 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag(tagInput)}
                  placeholder="Add tags..."
                  className="w-full px-10 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={() => handleAddTag(tagInput)}
                  disabled={!tagInput.trim() || tags.length >= 5}
                  className="ml-2 px-3 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
              
              {/* Tag display */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      #{tag}
                      <button 
                        onClick={() => handleRemoveTag(tag)} 
                        className="ml-1 p-1 hover:bg-green-200 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              {/* Suggested tags */}
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Suggested:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.slice(0, 6).map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleAddTag(tag)}
                      disabled={tags.includes(tag) || tags.length >= 5}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location..."
                className="w-full px-10 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!caption.trim() || !selectedImage || isLoading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Posting...</span>
              </>
            ) : (
              <span>Share Post</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmingPostModal; 