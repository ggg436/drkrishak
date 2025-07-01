import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Award, 
  Leaf, 
  TrendingUp, 
  Settings, 
  Edit3,
  Camera,
  Zap,
  Recycle,
  Heart
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    carbonSaved: 2.4,
    ecoPoints: 1247,
    postsShared: 23,
    communitiesJoined: 5,
    eventsAttended: 12,
    productsReviewed: 8
  };

  const achievements = [
    {
      id: 1,
      title: 'Zero Waste Champion',
      description: 'Completed 30 days of zero waste living',
      icon: Recycle,
      color: 'green',
      earned: true,
      date: '2024-01-10'
    },
    {
      id: 2,
      title: 'Solar Pioneer',
      description: 'Installed renewable energy system',
      icon: Zap,
      color: 'yellow',
      earned: true,
      date: '2024-01-05'
    },
    {
      id: 3,
      title: 'Community Builder',
      description: 'Helped 10+ people start their eco journey',
      icon: Heart,
      color: 'red',
      earned: true,
      date: '2023-12-20'
    },
    {
      id: 4,
      title: 'Climate Activist',
      description: 'Attended 5+ environmental events',
      icon: TrendingUp,
      color: 'blue',
      earned: false,
      progress: 80
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'post',
      content: 'Shared tips about urban composting',
      timestamp: '2 hours ago',
      engagement: { likes: 23, comments: 5 }
    },
    {
      id: 2,
      type: 'event',
      content: 'Attended Beach Cleanup & Marine Conservation',
      timestamp: '1 day ago',
      location: 'Santa Monica Beach'
    },
    {
      id: 3,
      type: 'marketplace',
      content: 'Purchased Bamboo Fiber Dinnerware Set',
      timestamp: '3 days ago',
      impact: 'Saved 0.5kg CO₂'
    },
    {
      id: 4,
      type: 'community',
      content: 'Joined Solar Energy Enthusiasts community',
      timestamp: '1 week ago',
      members: '8.9K members'
    }
  ];

  const sustainabilityGoals = [
    {
      id: 1,
      title: 'Reduce Carbon Footprint',
      target: 5.0,
      current: 2.4,
      unit: 'tons CO₂ saved',
      progress: 48
    },
    {
      id: 2,
      title: 'Zero Waste Challenge',
      target: 90,
      current: 68,
      unit: 'days completed',
      progress: 76
    },
    {
      id: 3,
      title: 'Renewable Energy Usage',
      target: 100,
      current: 85,
      unit: '% renewable',
      progress: 85
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 relative">
          <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
            <Camera className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-16 mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full hover:bg-green-600 transition-colors">
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Sarah Green</h1>
            <p className="text-gray-600 mb-2">Environmental Advocate & Sustainability Enthusiast</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined January 2023</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            Passionate about creating a sustainable future through community action and individual responsibility. 
            Solar-powered home owner, zero-waste advocate, and urban gardening enthusiast. 
            Let's make the world greener together! 🌱
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{userStats.carbonSaved}t</div>
              <div className="text-xs text-gray-600">Carbon Saved</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{userStats.ecoPoints}</div>
              <div className="text-xs text-gray-600">Eco Points</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">{userStats.postsShared}</div>
              <div className="text-xs text-gray-600">Posts Shared</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">{userStats.communitiesJoined}</div>
              <div className="text-xs text-gray-600">Communities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'activity', label: 'Activity' },
            { id: 'achievements', label: 'Achievements' },
            { id: 'goals', label: 'Goals' }
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
              {/* Environmental Impact */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Impact</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-gray-800">Carbon Footprint</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">2.1 tons</div>
                    <div className="text-sm text-gray-600">56% below average</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-800">Energy Usage</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
                    <div className="text-sm text-gray-600">Renewable sources</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Recycle className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-gray-800">Waste Reduction</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">68%</div>
                    <div className="text-sm text-gray-600">Less than average</div>
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Achievements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.filter(a => a.earned).slice(0, 2).map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={achievement.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-lg bg-${achievement.color}-100`}>
                          <Icon className={`h-6 w-6 text-${achievement.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          <p className="text-xs text-gray-500">Earned {achievement.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-800">{activity.content}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{activity.timestamp}</span>
                      {activity.engagement && (
                        <span>{activity.engagement.likes} likes, {activity.engagement.comments} comments</span>
                      )}
                      {activity.location && <span>📍 {activity.location}</span>}
                      {activity.impact && <span>🌱 {activity.impact}</span>}
                      {activity.members && <span>👥 {activity.members}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Achievements & Badges</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className={`p-4 border rounded-lg ${
                      achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.earned 
                            ? `bg-${achievement.color}-100` 
                            : 'bg-gray-200'
                        }`}>
                          <Icon className={`h-6 w-6 ${
                            achievement.earned 
                              ? `text-${achievement.color}-600` 
                              : 'text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <h4 className={`font-medium ${
                            achievement.earned ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.earned ? (
                        <div className="text-xs text-green-600 font-medium">
                          ✓ Earned on {achievement.date}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Sustainability Goals</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Add Goal
                </button>
              </div>
              <div className="space-y-4">
                {sustainabilityGoals.map((goal) => (
                  <div key={goal.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-800">{goal.title}</h4>
                      <span className="text-sm text-gray-600">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;