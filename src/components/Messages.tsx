import React, { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Info } from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Alex Rivera',
      avatar: 'AR',
      lastMessage: 'Thanks for the composting tips! I\'ll try them this weekend.',
      timestamp: '2 min ago',
      unread: 0,
      online: true,
      type: 'direct'
    },
    {
      id: 2,
      name: 'Zero Waste Warriors',
      avatar: 'ZW',
      lastMessage: 'Sarah: Don\'t forget about tomorrow\'s beach cleanup!',
      timestamp: '15 min ago',
      unread: 3,
      online: false,
      type: 'group',
      members: 47
    },
    {
      id: 3,
      name: 'Maria Santos',
      avatar: 'MS',
      lastMessage: 'The solar installation went great! Here are some photos.',
      timestamp: '1 hour ago',
      unread: 1,
      online: true,
      type: 'direct'
    },
    {
      id: 4,
      name: 'Urban Gardening',
      avatar: 'UG',
      lastMessage: 'Mike: Anyone have experience with vertical gardens?',
      timestamp: '2 hours ago',
      unread: 0,
      online: false,
      type: 'group',
      members: 156
    },
    {
      id: 5,
      name: 'Green Gardens Co.',
      avatar: 'GG',
      lastMessage: 'Your order has been shipped! Tracking: #GG123456',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
      type: 'business'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Alex Rivera',
      content: 'Hey! I saw your post about urban composting. Do you have any tips for apartment dwellers?',
      timestamp: '10:30 AM',
      isOwn: false,
      avatar: 'AR'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Absolutely! I\'ve been composting in my apartment for 2 years now. The key is getting a good indoor composter and managing the carbon-nitrogen ratio.',
      timestamp: '10:32 AM',
      isOwn: true,
      avatar: 'SG'
    },
    {
      id: 3,
      sender: 'You',
      content: 'I use a bokashi system - it\'s odorless and perfect for small spaces. You can compost meat and dairy too, which traditional composting doesn\'t allow.',
      timestamp: '10:33 AM',
      isOwn: true,
      avatar: 'SG'
    },
    {
      id: 4,
      sender: 'Alex Rivera',
      content: 'That sounds perfect! Where did you get your bokashi setup? And how long does the process take?',
      timestamp: '10:35 AM',
      isOwn: false,
      avatar: 'AR'
    },
    {
      id: 5,
      sender: 'You',
      content: 'I got mine from Green Gardens Co. - they have great starter kits. The fermentation takes about 2 weeks, then you bury it or add to outdoor compost for another 2 weeks.',
      timestamp: '10:37 AM',
      isOwn: true,
      avatar: 'SG'
    },
    {
      id: 6,
      sender: 'Alex Rivera',
      content: 'Thanks for the composting tips! I\'ll try them this weekend.',
      timestamp: '10:40 AM',
      isOwn: false,
      avatar: 'AR'
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden" style={{ height: '600px' }}>
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === conversation.id ? 'bg-green-50 border-r-2 border-green-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      conversation.type === 'group' ? 'bg-blue-500' : 
                      conversation.type === 'business' ? 'bg-purple-500' : 'bg-green-500'
                    }`}>
                      {conversation.avatar}
                    </div>
                    {conversation.online && conversation.type === 'direct' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    {conversation.type === 'group' && (
                      <p className="text-xs text-gray-500">{conversation.members} members</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                selectedConversation?.type === 'group' ? 'bg-blue-500' : 
                selectedConversation?.type === 'business' ? 'bg-purple-500' : 'bg-green-500'
              }`}>
                {selectedConversation?.avatar}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{selectedConversation?.name}</h3>
                {selectedConversation?.type === 'direct' && (
                  <p className="text-sm text-gray-500">
                    {selectedConversation?.online ? 'Online' : 'Last seen 2 hours ago'}
                  </p>
                )}
                {selectedConversation?.type === 'group' && (
                  <p className="text-sm text-gray-500">{selectedConversation?.members} members</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                <Phone className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                <Video className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                <Info className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                    message.isOwn ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    {message.avatar}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.isOwn 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? 'text-green-100' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newMessage.trim()) {
                    // Handle send message
                    setNewMessage('');
                  }
                }}
              />
              <button
                onClick={() => {
                  if (newMessage.trim()) {
                    // Handle send message
                    setNewMessage('');
                  }
                }}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;