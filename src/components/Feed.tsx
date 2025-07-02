import React, { useState, useEffect } from 'react';
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
  Cloud,
  ShoppingCart,
  DollarSign,
  Tag,
  Calendar,
  Clock,
  Store,
  PlusSquare
} from 'lucide-react';
import { useAuth } from './AuthContext';
import FarmingPostModal from './FarmingPostModal';
import { getAllPosts, addPost, PostWithUser } from '../services/postService';
// Import FarmingPostModal component
// Note: This import is commented out until the FarmingPostModal component is created
// import FarmingPostModal from './FarmingPostModal';

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
  type: 'text' | 'tip' | 'achievement' | 'question' | 'marketplace' | 'community';
  carbonSaved?: string;
  price?: string;
  discount?: string;
  engagement: {
    liked: boolean;
    bookmarked: boolean;
    shared: boolean;
  };
  // For marketplace posts
  product?: {
    condition?: string;
    category?: string;
    inStock?: number;
    shipping?: string;
  };
  // For community posts
  community?: {
    name?: string;
    type?: 'event' | 'discussion' | 'resource';
    eventDate?: string;
    eventLocation?: string;
  };
}

const Feed = () => {
  const [newPost, setNewPost] = useState('');
  const [postPrivacy, setPostPrivacy] = useState('public');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [postSection, setPostSection] = useState('feed'); // 'feed', 'marketplace', or 'community'
  const [postType, setPostType] = useState('text');
  
  // Marketplace specific fields
  const [productPrice, setProductPrice] = useState('');
  const [productCondition, setProductCondition] = useState('new');
  const [productCategory, setProductCategory] = useState('');
  const [productDiscount, setProductDiscount] = useState('');
  
  // Community specific fields
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [communityPostType, setCommunityPostType] = useState('discussion');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  // Add state for showing the farming post modal
  const [showFarmingPostModal, setShowFarmingPostModal] = useState(false);

  // Add state for Supabase posts
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

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
  
  const postSections = [
    { id: 'feed', label: 'Feed', icon: Leaf, color: 'green' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, color: 'blue' },
    { id: 'community', label: 'Community', icon: Users, color: 'purple' }
  ];

  const suggestedTags = [
    'OrganicFarming', 'Pesticides', 'Fertilizers', 'CropRotation', 
    'SeedSelection', 'IrrigationTips', 'SoilHealth', 'PestControl', 
    'Harvest', 'FarmTools', 'Livestock', 'WaterConservation'
  ];

  const marketplaceCategories = [
    'FarmTools', 'Machinery', 'Seeds', 'Organic', 'Fertilizers', 
    'SecondHand', 'RenewableEnergy', 'Irrigation', 'Livestock'
  ];

  const communityList = [
    { id: '1', name: 'Zero Waste Warriors' },
    { id: '2', name: 'Organic Farming Network' },
    { id: '3', name: 'Sustainable Agriculture' },
    { id: '4', name: 'Local Farmers Market' },
    { id: '5', name: 'Climate Action Network' }
  ];

  const emojis = ['🌱', '🌾', '🌿', '🚜', '🧑‍🌾', '🐄', '🐓', '🌽', '🥔', '🥕', '☀️', '🌧️'];

  const productConditions = [
    { id: 'new', label: 'New' },
    { id: 'likenew', label: 'Like New' },
    { id: 'good', label: 'Good' },
    { id: 'used', label: 'Used' },
    { id: 'refurbished', label: 'Refurbished' }
  ];

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoadingPosts(true);
    setError(null);
    
    try {
      // Fetch posts from the real Neon database
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again.');
    } finally {
      setIsLoadingPosts(false);
    }
  };

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

  const handleAttachmentAdd = (file: string) => {
    if (attachments.length < 4) {
      setAttachments([...attachments, file]);
    }
  };

  const handleAttachmentRemove = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const getPostTypeColor = (type: string) => {
    const typeObj = postTypes.find(t => t.id === type);
    return typeObj ? typeObj.color : 'gray';
  };

  const handleSubmitPost = () => {
    if (!user) {
      alert('Please log in to post');
      return;
    }

      // Create the base post
  const newPostData: any = {
    user_id: user.id,
    content: newPost,
    tags: selectedTags,
    post_type: postType,
    image_url: attachments[0] || '',
  };

    // Add section-specific data
    if (postSection === 'marketplace') {
      newPostData.post_type = 'marketplace';
      newPostData.price = productPrice;
      newPostData.discount = productDiscount;
      newPostData.product_details = {
        condition: productCondition,
        category: productCategory,
        inStock: 1,
        shipping: 'Free shipping'
      };
    } else if (postSection === 'community') {
      newPostData.post_type = 'community';
      newPostData.community_details = {
        name: selectedCommunity,
        type: communityPostType,
        eventDate: communityPostType === 'event' ? `${eventDate} ${eventTime}` : undefined,
        eventLocation: communityPostType === 'event' ? eventLocation : undefined
      };
    }

    // Add post to Supabase
    addPost(newPostData as any).then(() => {
      // Refresh posts from the server
      fetchPosts();
      
      // Reset form
      setNewPost('');
      setSelectedTags([]);
      setAttachments([]);
      setProductPrice('');
      setProductDiscount('');
      setProductCondition('new');
      setProductCategory('');
      setSelectedCommunity('');
      setCommunityPostType('discussion');
      setEventDate('');
      setEventTime('');
      setEventLocation('');
      
      alert('Post submitted successfully!');
    }).catch(err => {
      console.error('Error submitting post:', err);
      alert('Error submitting post. Please try again.');
    });
  };

  // Add function to handle new posts from FarmingPostModal
  const handlePostSubmitted = async (postData: any) => {
    if (!user) {
      alert('Please log in to post');
      return;
    }

    // Format for Supabase
    const newPostData = {
      user_id: user.id,
      content: postData.content,
      image_url: postData.image,
      tags: postData.tags,
      post_type: postData.type,
      location: postData.location || null
    };

    // Add post to Supabase
    try {
      await addPost(newPostData as any);
      
      // Refresh posts from the server
      fetchPosts();
      
      alert('Post submitted successfully!');
    } catch (err) {
      console.error('Error submitting post:', err);
      alert('Failed to submit post. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Enhanced Create Post */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
        {/* Post Section Selector */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Create Post</h3>
              
              {/* Post Button */}
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
                onClick={() => setShowFarmingPostModal(true)}
              >
                <PlusSquare className="h-5 w-5" />
                <span className="font-medium">Post</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4 pb-2">
              {postSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setPostSection(section.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-all duration-200 ${
                      postSection === section.id 
                        ? `bg-${section.color}-100 text-${section.color}-700 border border-${section.color}-200` 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Post Type Selector - Only show for Feed */}
            {postSection === 'feed' && (
              <div className="flex items-center space-x-1 overflow-x-auto py-1 -mx-1 px-1">
                {postTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setPostType(type.id)}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
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
            )}
            
            {/* Community Type Selector */}
            {postSection === 'community' && (
              <div className="flex items-center space-x-1 overflow-x-auto py-1 -mx-1 px-1">
                <button
                  onClick={() => setCommunityPostType('discussion')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    communityPostType === 'discussion'
                      ? `bg-purple-100 text-purple-700 border border-purple-200`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <MessageCircle className="h-3 w-3" />
                  <span>Discussion</span>
                </button>
                <button
                  onClick={() => setCommunityPostType('event')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    communityPostType === 'event'
                      ? `bg-yellow-100 text-yellow-700 border border-yellow-200`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Calendar className="h-3 w-3" />
                  <span>Event</span>
                </button>
                <button
                  onClick={() => setCommunityPostType('resource')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    communityPostType === 'resource'
                      ? `bg-blue-100 text-blue-700 border border-blue-200`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FileText className="h-3 w-3" />
                  <span>Resource</span>
                </button>
              </div>
            )}
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
                  placeholder={
                    postSection === 'marketplace' 
                      ? 'Describe your product...' 
                      : postSection === 'community' 
                        ? communityPostType === 'event' 
                          ? 'Share event details...' 
                          : 'Share with your community...'
                        : `Share your ${postType === 'tip' ? 'farming tips' : postType === 'achievement' ? 'harvest results' : postType === 'question' ? 'agricultural questions' : 'farming experiences or insights'}...`
                  }
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
              
              {/* Section-specific inputs */}
              {/* Marketplace Fields */}
              {postSection === 'marketplace' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="0.00"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Discount (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., 20% OFF"
                      value={productDiscount}
                      onChange={(e) => setProductDiscount(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Condition</label>
                    <select
                      value={productCondition}
                      onChange={(e) => setProductCondition(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {productConditions.map(condition => (
                        <option key={condition.id} value={condition.id}>
                          {condition.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {marketplaceCategories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              
              {/* Community Fields */}
              {postSection === 'community' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Community</label>
                    <select
                      value={selectedCommunity}
                      onChange={(e) => setSelectedCommunity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Community</option>
                      {communityList.map(community => (
                        <option key={community.id} value={community.name}>
                          {community.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Event-specific Fields */}
                  {communityPostType === 'event' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                          type="time"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MapPin className="h-4 w-4 text-gray-500" />
                          </div>
                          <input
                            type="text"
                            placeholder="Event location"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Attachment Preview */}
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={attachment} 
                        alt="Attachment" 
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200" 
                      />
                      <button
                        onClick={() => handleAttachmentRemove(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

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
                {/* Media Buttons with better alignment */}
                <div className="flex items-center -ml-2">
                  <button className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-green-600 transition-colors">
                    <Camera className="h-5 w-5" />
                    <span className="ml-2 text-sm">Photo</span>
                  </button>
                  
                  <button className="inline-flex items-center justify-center p-2 ml-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <Video className="h-5 w-5" />
                    <span className="ml-2 text-sm">Video</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowTagSuggestions(!showTagSuggestions)}
                    className="inline-flex items-center justify-center p-2 ml-3 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <Hash className="h-5 w-5" />
                    <span className="ml-2 text-sm">Tags</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="inline-flex items-center justify-center p-2 ml-3 text-gray-600 hover:text-yellow-600 transition-colors"
                  >
                    <Smile className="h-5 w-5" />
                    <span className="ml-2 text-sm">Emoji</span>
                  </button>
                  
                  <button className="inline-flex items-center justify-center p-2 ml-3 text-gray-600 hover:text-red-600 transition-colors">
                    <MapPin className="h-5 w-5" />
                    <span className="ml-2 text-sm">Location</span>
                  </button>

                  {/* Privacy Selector integrated in the same row for better alignment */}
                  <div className="relative ml-3 pl-3 border-l border-gray-200">
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-gray-600 mr-2" />
                      <select
                        value={postPrivacy}
                        onChange={(e) => setPostPrivacy(e.target.value)}
                        className="appearance-none bg-transparent text-gray-700 pr-6 py-1 text-sm focus:outline-none cursor-pointer"
                      >
                        {privacyOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Post creation is handled by the Post button at the top */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post display section */}
      {isLoadingPosts ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-800 my-4">
          {error}
          <button
            onClick={fetchPosts}
            className="ml-2 text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          {posts.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center my-6">
              <h3 className="text-lg font-medium text-gray-600">No posts yet</h3>
              <p className="text-gray-500 mt-2">Be the first to share something!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map(post => (
                // Render each post with appropriate styling based on type
                <div key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-100">
                  {/* Post header */}
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 text-green-800 font-semibold text-sm h-10 w-10 rounded-full flex items-center justify-center">
                        {post.user.avatar || post.user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold">{post.user.name}</h3>
                          {post.user.verified && (
                            <span className="ml-1 text-blue-500">
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 space-x-2">
                          <span>{post.user.level}</span>
                          <span>•</span>
                          <span>{new Date(post.created_at || '').toLocaleDateString()}</span>
                          {post.location && (
                            <>
                              <span>•</span>
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {post.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Post content */}
                  <div className="px-6 py-2">
                    <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Post image if any */}
                  {post.image_url && (
                    <div className="mt-2">
                      <img
                        src={post.image_url}
                        alt="Post"
                        className="w-full object-cover max-h-96"
                      />
                    </div>
                  )}
                  
                  {/* Post stats */}
                  <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-500">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views || 0} views
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {post.likes || 0} likes
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments || 0} comments
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="px-6 py-3 border-t border-gray-100 flex justify-between">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm font-medium">Like</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Comment</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-yellow-500">
                      <Bookmark className="h-5 w-5" />
                      <span className="text-sm font-medium">Save</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Farming Post Modal */}
      {showFarmingPostModal && (
        <FarmingPostModal
          isOpen={showFarmingPostModal}
          onClose={() => setShowFarmingPostModal(false)}
          onPostSubmitted={handlePostSubmitted}
        />
      )}
    </div>
  );
};

export default Feed;