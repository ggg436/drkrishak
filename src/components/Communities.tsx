import React, { useState } from 'react';
import { Users, Plus, MessageCircle, Calendar, MapPin, TrendingUp } from 'lucide-react';

const Communities = () => {
  const [activeTab, setActiveTab] = useState('discover');

  const communities = [
    {
      id: 1,
      name: 'Zero Waste Warriors',
      description: 'Join thousands of people committed to reducing waste and living sustainably',
      members: 12847,
      posts: 1523,
      image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Lifestyle',
      isJoined: true,
      recentActivity: '2 hours ago',
      trending: true
    },
    {
      id: 2,
      name: 'Solar Energy Enthusiasts',
      description: 'Everything about solar power, from home installations to latest technology',
      members: 8934,
      posts: 892,
      image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Energy',
      isJoined: false,
      recentActivity: '4 hours ago',
      trending: true
    },
    {
      id: 3,
      name: 'Urban Gardening',
      description: 'Growing food and plants in urban environments, balcony gardens, and small spaces',
      members: 15623,
      posts: 2341,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Gardening',
      isJoined: true,
      recentActivity: '1 hour ago',
      trending: false
    },
    {
      id: 4,
      name: 'Climate Action Network',
      description: 'Organizing local climate actions, protests, and awareness campaigns',
      members: 6789,
      posts: 567,
      image: 'https://images.pexels.com/photos/3737631/pexels-photo-3737631.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Activism',
      isJoined: false,
      recentActivity: '6 hours ago',
      trending: false
    },
    {
      id: 5,
      name: 'Sustainable Fashion',
      description: 'Ethical fashion, thrifting, upcycling, and conscious clothing choices',
      members: 9876,
      posts: 1234,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fashion',
      isJoined: true,
      recentActivity: '3 hours ago',
      trending: true
    },
    {
      id: 6,
      name: 'Electric Vehicle Owners',
      description: 'EV reviews, charging tips, road trips, and the future of transportation',
      members: 11234,
      posts: 987,
      image: 'https://images.pexels.com/photos/3846207/pexels-photo-3846207.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Transportation',
      isJoined: false,
      recentActivity: '5 hours ago',
      trending: true
    }
  ];

  const myCommunitiesData = communities.filter(c => c.isJoined);
  const discoverCommunitiesData = communities.filter(c => !c.isJoined);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Community Beach Cleanup',
      community: 'Zero Waste Warriors',
      date: '2024-01-15',
      time: '9:00 AM',
      location: 'Santa Monica Beach',
      attendees: 47
    },
    {
      id: 2,
      title: 'Solar Panel Installation Workshop',
      community: 'Solar Energy Enthusiasts',
      date: '2024-01-18',
      time: '2:00 PM',
      location: 'Community Center',
      attendees: 23
    },
    {
      id: 3,
      title: 'Urban Composting Masterclass',
      community: 'Urban Gardening',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'Green Space Garden',
      attendees: 31
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Communities</h1>
            <p className="text-gray-600">Connect with like-minded environmental enthusiasts</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Community</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('discover')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === 'discover'
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Discover Communities
              </button>
              <button
                onClick={() => setActiveTab('my-communities')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === 'my-communities'
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                My Communities ({myCommunitiesData.length})
              </button>
            </div>

            {/* Communities List */}
            <div className="p-6">
              <div className="space-y-4">
                {(activeTab === 'discover' ? discoverCommunitiesData : myCommunitiesData).map((community) => (
                  <div key={community.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={community.image}
                        alt={community.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-800">{community.name}</h3>
                          {community.trending && (
                            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>Trending</span>
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{community.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{community.members.toLocaleString()} members</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{community.posts} posts</span>
                          </div>
                          <span className="text-blue-600">{community.category}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <button
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            community.isJoined
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {community.isJoined ? 'Joined' : 'Join'}
                        </button>
                        <span className="text-xs text-gray-500">{community.recentActivity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-gray-800 text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-600 mb-1">{event.community}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">{event.attendees} attending</p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Community Impact</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">47.2K</div>
                <div className="text-sm text-gray-600">Total Members</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">8.9K</div>
                <div className="text-sm text-gray-600">Posts This Month</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">Active Communities</div>
              </div>
            </div>
          </div>

          {/* Suggested Communities */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Suggested for You</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Renewable Energy</p>
                  <p className="text-xs text-gray-500">3.2K members</p>
                </div>
                <button className="text-xs text-green-600 hover:underline">Join</button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Eco Travel</p>
                  <p className="text-xs text-gray-500">1.8K members</p>
                </div>
                <button className="text-xs text-green-600 hover:underline">Join</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communities;