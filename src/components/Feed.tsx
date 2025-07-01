import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  Camera, 
  MapPin, 
  Smile,
  Hash,
  Users,
  Globe,
  Lock,
  Image,
  Video,
  FileText,
  Zap,
  TrendingUp,
  Award,
  Eye,
  ThumbsUp,
  Send,
  X,
  Plus,
  Leaf,
  Recycle,
  Sun,
  Cloud
} from 'lucide-react';

interface Tag {
  id: string;
  label: string;
}

interface User {
  name: string;
  avatar: string;
  badge: string;
  location: string;
  verified: boolean;
  level: string;
}

interface Post {
  id: number;
  user: User;
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  timestamp: string;
  tags: string[];
  type: 'text' | 'tip' | 'achievement' | 'question' | 'marketplace';
  carbonSaved?: string;
  price?: string;
  discount?: string;
  engagement: {
    liked: boolean;
    bookmarked: boolean;
    shared: boolean;
  }
}

const Feed = () => {
  const [newPost, setNewPost] = useState('');
  const [postPrivacy, setPostPrivacy] = useState('public');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [postType, setPostType] = useState('text');

  const privacyOptions = [
    { id: 'public', label: 'Public', icon: Globe, description: 'Anyone can see this post' },
    { id: 'community', label: 'Community', icon: Users, description: 'Only community members' },
    { id: 'private', label: 'Private', icon: Lock, description: 'Only you can see this' }
  ];

  const postTypes = [
    { id: 'text', label: 'Text Post', icon: FileText, color: 'blue' },
    { id: 'tip', label: 'Farming Tip', icon: Leaf, color: 'green' },
    { id: 'achievement', label: 'Harvest', icon: Award, color: 'yellow' },
    { id: 'question', label: 'Question', icon: MessageCircle, color: 'purple' }
  ];

  const suggestedTags = [
    'OrganicFarming', 'Pesticides', 'Fertilizers', 'CropRotation', 
    'SeedSelection', 'IrrigationTips', 'SoilHealth', 'PestControl', 
    'Harvest', 'FarmTools', 'Livestock', 'WaterConservation'
  ];

  const emojis = ['🌱', '🌾', '🌿', '🚜', '🧑‍🌾', '🐄', '🐓', '🌽', '🥔', '🥕', '☀️', '🌧️'];

  const posts: Post[] = [
    {
      id: 1,
      user: {
        name: 'Rajesh Kumar',
        avatar: 'RK',
        badge: 'Organic Farmer',
        location: 'Bihar, India',
        verified: true,
        level: 'Master Farmer'
      },
      content: 'Just completed my first season using organic pesticides on my rice fields. The yield was almost the same as with chemical pesticides, but soil health has improved significantly. Here are my top tips: 1) Neem oil spray works wonders, 2) Crop rotation is essential, 3) Introduce beneficial insects, 4) Use companion planting, 5) Regular monitoring is key.',
      image: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 127,
      comments: 23,
      shares: 8,
      views: 1240,
      timestamp: '2 hours ago',
      tags: ['OrganicFarming', 'PestControl', 'SustainableAgriculture'],
      type: 'tip',
      carbonSaved: '2.3kg CO₂',
      engagement: {
        liked: false,
        bookmarked: false,
        shared: false
      }
    },
    {
      id: 2,
      user: {
        name: 'AgriTools Co.',
        avatar: 'AT',
        badge: 'Verified Seller',
        location: 'Delhi, India',
        verified: true,
        level: 'Business Partner'
      },
      content: 'New in our agricultural marketplace! Traditional hand-forged sickles made by local artisans. Perfect balance, sharp edge, and comfortable wooden handle. Each purchase supports rural craftsmen!',
      image: 'https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 89,
      comments: 15,
      shares: 12,
      views: 890,
      timestamp: '4 hours ago',
      tags: ['FarmTools', 'Traditional', 'Handcrafted'],
      type: 'marketplace',
      price: '₹899',
      discount: '20% OFF',
      engagement: {
        liked: true,
        bookmarked: false,
        shared: false
      }
    },
    {
      id: 3,
      user: {
        name: 'Meera Patel',
        avatar: 'MP',
        badge: 'Irrigation Expert',
        location: 'Gujarat, India',
        verified: true,
        level: 'Water Conservation Pioneer'
      },
      content: 'Drip irrigation system installation complete! Our farm is now using 60% less water with better crop health. The installation took just 3 days and the difference is already visible. Sharing data - we\'re seeing more consistent growth and fewer disease issues with targeted watering.',
      image: 'https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 203,
      comments: 34,
      shares: 19,
      views: 2100,
      timestamp: '6 hours ago',
      tags: ['Irrigation', 'WaterConservation', 'ModernFarming'],
      type: 'achievement',
      carbonSaved: '15.2kg CO₂/day',
      engagement: {
        liked: false,
        bookmarked: true,
        shared: false
      }
    },
    {
      id: 4,
      user: {
        name: 'Dr. Sunil Verma',
        avatar: 'SV',
        badge: 'Agricultural Scientist',
        location: 'Punjab, India',
        verified: true,
        level: 'Expert'
      },
      content: 'Q: I\'m seeing unusual yellow spots on my wheat crop leaves. They started appearing after last week\'s rain. The spots have a rust-like appearance and seem to be spreading. Has anyone encountered this issue? What could be causing this and what treatment would you recommend?',
      image: 'https://images.pexels.com/photos/688668/pexels-photo-688668.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 45,
      comments: 28,
      shares: 7,
      views: 876,
      timestamp: '1 day ago',
      tags: ['PlantDisease', 'WheatFarming', 'PestControl'],
      type: 'question',
      engagement: {
        liked: true,
        bookmarked: true,
        shared: false
      }
    },
    {
      id: 5,
      user: {
        name: 'Ananya Singh',
        avatar: 'AS',
        badge: 'Organic Certification',
        location: 'Uttarakhand, India',
        verified: false,
        level: 'Rising Farmer'
      },
      content: 'Has anyone tried using companion planting with marigolds to control pests in vegetable gardens? I\'ve heard they help repel certain insects, but I\'m not sure about the best arrangement. Should I plant them around the border or interspersed throughout? Also, how many marigold plants would be needed for a 20x30 foot vegetable plot?',
      image: 'https://images.pexels.com/photos/5731861/pexels-photo-5731861.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 67,
      comments: 42,
      shares: 12,
      views: 932,
      timestamp: '2 days ago',
      tags: ['CompanionPlanting', 'PestControl', 'OrganicGardening'],
      type: 'question',
      engagement: {
        liked: false,
        bookmarked: false,
        shared: false
      }
    }
  ];

  const handleTagAdd = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowTagSuggestions(false);
  };

  const handleTagRemove = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleEmojiAdd = (emoji: string) => {
    setNewPost(newPost + emoji);
    setShowEmojiPicker(false);
  };

  const getPostTypeColor = (type: string) => {
    const typeObj = postTypes.find(t => t.id === type);
    return typeObj ? typeObj.color : 'gray';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Enhanced Create Post */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
        {/* Post Type Selector */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Create Post</h3>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-1">
              {postTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setPostType(type.id)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      postType === type.id
                        ? `bg-${type.color}-100 text-${type.color}-700 border border-${type.color}-200`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                SG
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="flex-1 space-y-4">
              {/* Main Text Area */}
              <div className="relative">
                <textarea
                  placeholder={`Share your ${postType === 'tip' ? 'farming tips' : postType === 'achievement' ? 'harvest results' : postType === 'question' ? 'agricultural questions' : 'farming experiences or insights'}...`}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500"
                  rows={4}
                />
                
                {/* Character Counter */}
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {newPost.length}/500
                </div>
              </div>

              {/* Tags Section */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      <Hash className="h-3 w-3" />
                      <span>{tag}</span>
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Tag Suggestions */}
              {showTagSuggestions && (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Suggested Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.filter(tag => !selectedTags.includes(tag)).slice(0, 8).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagAdd(tag)}
                        className="inline-flex items-center space-x-1 bg-white text-gray-600 px-2 py-1 rounded-full text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200"
                      >
                        <Hash className="h-3 w-3" />
                        <span>{tag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Add Emoji:</p>
                  <div className="flex flex-wrap gap-2">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiAdd(emoji)}
                        className="text-xl hover:bg-white rounded-lg p-2 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  {/* Media Buttons */}
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors group">
                    <div className="p-2 rounded-lg group-hover:bg-green-50 transition-colors">
                      <Camera className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Photo</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group">
                    <div className="p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                      <Video className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Video</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowTagSuggestions(!showTagSuggestions)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors group"
                  >
                    <div className="p-2 rounded-lg group-hover:bg-purple-50 transition-colors">
                      <Hash className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Tags</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors group"
                  >
                    <div className="p-2 rounded-lg group-hover:bg-yellow-50 transition-colors">
                      <Smile className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Emoji</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors group">
                    <div className="p-2 rounded-lg group-hover:bg-red-50 transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Location</span>
                  </button>
                </div>

                {/* Privacy & Share */}
                <div className="flex items-center space-x-3">
                  {/* Privacy Selector */}
                  <div className="relative">
                    <select
                      value={postPrivacy}
                      onChange={(e) => setPostPrivacy(e.target.value)}
                      className="appearance-none bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                    >
                      {privacyOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Share Button */}
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-2.5 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Posts */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-all duration-300">
          {/* Post Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                    {post.user.avatar}
                  </div>
                  {post.user.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Award className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-800">{post.user.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.type === 'tip' ? 'bg-green-100 text-green-700' :
                      post.type === 'achievement' ? 'bg-yellow-100 text-yellow-700' :
                      post.type === 'marketplace' ? 'bg-blue-100 text-blue-700' :
                      post.type === 'question' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {post.user.badge}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{post.timestamp}</span>
                    <span>•</span>
                    <span>{post.user.location}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {post.carbonSaved && (
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Leaf className="h-3 w-3" />
                    <span>{post.carbonSaved}</span>
                  </div>
                )}
                <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-6 pb-4">
            <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
            
            {/* Special Content for Marketplace */}
            {post.type === 'marketplace' && (
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-semibold">
                  {post.price}
                </div>
                {post.discount && (
                  <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full font-semibold text-sm">
                    {post.discount}
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span key={tag} className="text-blue-600 text-sm hover:underline cursor-pointer font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="px-6 pb-4">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-64 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </div>
          )}

          {/* Enhanced Post Actions */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex space-x-6">
                <button className={`flex items-center space-x-2 transition-all duration-200 group ${
                  post.engagement.liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                }`}>
                  <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                    <Heart className={`h-5 w-5 ${post.engagement.liked ? 'fill-current' : ''}`} />
                  </div>
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-all duration-200 group">
                  <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                
                <button className={`flex items-center space-x-2 transition-all duration-200 group ${
                  post.engagement.shared ? 'text-green-500' : 'text-gray-600 hover:text-green-500'
                }`}>
                  <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{post.shares}</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className={`p-2 rounded-full transition-all duration-200 ${
                  post.engagement.bookmarked 
                    ? 'text-yellow-500 bg-yellow-50' 
                    : 'text-gray-600 hover:text-yellow-500 hover:bg-yellow-50'
                }`}>
                  <Bookmark className={`h-5 w-5 ${post.engagement.bookmarked ? 'fill-current' : ''}`} />
                </button>
                
                {post.type === 'marketplace' && (
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    View Product
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;