import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plus, Filter } from 'lucide-react';

const Events = () => {
  const [viewMode, setViewMode] = useState('upcoming');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'cleanup', name: 'Cleanups' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'protest', name: 'Activism' },
    { id: 'education', name: 'Education' },
    { id: 'community', name: 'Community' }
  ];

  const events = [
    {
      id: 1,
      title: 'Beach Cleanup & Marine Conservation',
      description: 'Join us for a morning of beach cleaning and learn about marine ecosystem protection',
      date: '2024-01-15',
      time: '9:00 AM - 12:00 PM',
      location: 'Santa Monica Beach, CA',
      organizer: 'Zero Waste Warriors',
      attendees: 47,
      maxAttendees: 100,
      category: 'cleanup',
      image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAttending: true,
      tags: ['Beach Cleanup', 'Marine Life', 'Community Service']
    },
    {
      id: 2,
      title: 'Solar Panel Installation Workshop',
      description: 'Hands-on workshop covering residential solar installation basics and cost analysis',
      date: '2024-01-18',
      time: '2:00 PM - 5:00 PM',
      location: 'Green Tech Community Center',
      organizer: 'Solar Energy Enthusiasts',
      attendees: 23,
      maxAttendees: 30,
      category: 'workshop',
      image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAttending: false,
      tags: ['Solar Energy', 'DIY', 'Renewable Energy']
    },
    {
      id: 3,
      title: 'Urban Composting Masterclass',
      description: 'Learn advanced composting techniques for small spaces and apartment living',
      date: '2024-01-20',
      time: '10:00 AM - 1:00 PM',
      location: 'Green Space Community Garden',
      organizer: 'Urban Gardening',
      attendees: 31,
      maxAttendees: 25,
      category: 'education',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAttending: true,
      tags: ['Composting', 'Urban Gardening', 'Waste Reduction']
    },
    {
      id: 4,
      title: 'Climate Action Rally',
      description: 'Peaceful demonstration calling for stronger climate policies and corporate accountability',
      date: '2024-01-22',
      time: '11:00 AM - 3:00 PM',
      location: 'City Hall Plaza',
      organizer: 'Climate Action Network',
      attendees: 156,
      maxAttendees: 500,
      category: 'protest',
      image: 'https://images.pexels.com/photos/3737631/pexels-photo-3737631.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAttending: false,
      tags: ['Climate Action', 'Activism', 'Policy Change']
    },
    {
      id: 5,
      title: 'Sustainable Fashion Swap Meet',
      description: 'Bring clothes you no longer wear and swap for new-to-you sustainable fashion pieces',
      date: '2024-01-25',
      time: '1:00 PM - 4:00 PM',
      location: 'Community Arts Center',
      organizer: 'Sustainable Fashion',
      attendees: 67,
      maxAttendees: 80,
      category: 'community',
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAttending: true,
      tags: ['Fashion', 'Upcycling', 'Community Exchange']
    },
    {
      id: 6,
      title: 'Electric Vehicle Test Drive Day',
      description: 'Test drive various EV models and learn about incentives, charging, and maintenance',
      date: '2024-01-28',
      time: '10:00 AM - 4:00 PM',
      location: 'Green Auto Dealership',
      organizer: 'Electric Vehicle Owners',
      attendees: 89,
      maxAttendees: 120,
      category: 'education',
      image: 'https://images.pexels.com/photos/3846207/pexels-photo-3846207.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAttending: false,
      tags: ['Electric Vehicles', 'Test Drive', 'Sustainable Transport']
    }
  ];

  const filteredEvents = events.filter(event => {
    if (selectedCategory === 'all') return true;
    return event.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Environmental Events</h1>
            <p className="text-gray-600">Discover and join local environmental activities and workshops</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* View Mode */}
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('upcoming')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'upcoming'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setViewMode('my-events')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'my-events'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              My Events
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Event Image */}
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-1 text-xs font-semibold text-gray-800">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              {event.isAttending && (
                <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                  Attending
                </div>
              )}
            </div>

            {/* Event Content */}
            <div className="p-6">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
              </div>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees}/{event.maxAttendees} attending</span>
                </div>
              </div>

              {/* Organizer */}
              <div className="mb-4">
                <p className="text-xs text-gray-500">Organized by</p>
                <p className="text-sm font-medium text-blue-600">{event.organizer}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {event.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
                {event.tags.length > 2 && (
                  <span className="text-xs text-gray-500">+{event.tags.length - 2} more</span>
                )}
              </div>

              {/* Attendance Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Attendance</span>
                  <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  event.isAttending
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {event.isAttending ? 'Cancel Attendance' : 'Attend Event'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;