import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

const BookingForm = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [people, setPeople] = useState('');

  return (
    <section className="px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="grid md:grid-cols-4 gap-6 items-end">
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold text-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Location</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold text-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Date</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold text-lg">
                <Users className="h-5 w-5 text-blue-600" />
                <span>People</span>
              </label>
              <div className="relative">
                <select
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 appearance-none bg-white"
                >
                  <option value="">How many people?</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>
            </div>
            
            <button className="bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
              <Search className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;