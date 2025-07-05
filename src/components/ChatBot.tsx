import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Predefined responses for common farming questions
const mockResponses: Record<string, string> = {
  "default": "I'm your eco-farming assistant. I can help with sustainable agriculture practices, organic farming, and eco-friendly solutions.",
  "hello": "Hello! How can I help with your eco-farming questions today?",
  "hi": "Hi there! I'm here to assist with sustainable farming advice. What would you like to know?",
  "help": "I can help with sustainable farming practices, crop rotation advice, organic pest control, water conservation, and more. Just ask a specific question!",
  "what can you do": "I can provide advice on sustainable farming, organic practices, eco-friendly pest control, water conservation, crop rotation, and answer questions about environmental impact of agriculture.",
  "sustainable farming": "Sustainable farming integrates environmental stewardship with profitable agriculture. Key practices include crop rotation, reduced tillage, water management, and natural pest control. This approach preserves soil health, reduces pollution, and ensures long-term productivity.",
  "organic farming": "Organic farming avoids synthetic fertilizers and pesticides, focusing on natural methods like compost, manure, crop rotation, and biological pest control. It promotes biodiversity and soil health while producing food without synthetic chemicals.",
  "water conservation": "For water conservation in farming, consider drip irrigation, rainwater harvesting, mulching, drought-resistant crops, soil moisture monitors, and scheduled watering during cooler hours to minimize evaporation.",
  "pest control": "Eco-friendly pest control options include: companion planting, introducing beneficial insects, crop rotation, physical barriers, organic sprays like neem oil, and maintaining biodiversity to create balanced ecosystems.",
  "crop rotation": "Crop rotation involves changing the type of crops grown in a particular area each season. It helps prevent soil depletion, breaks pest cycles, improves soil structure, and naturally manages plant diseases without chemicals."
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi there! I\'m your eco-farming assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const API_KEY = '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';

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Get mock response based on user input
  const getMockResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for exact matches first
    if (mockResponses[lowercaseInput]) {
      return mockResponses[lowercaseInput];
    }
    
    // Check for keywords in the input
    for (const [keyword, response] of Object.entries(mockResponses)) {
      if (lowercaseInput.includes(keyword) && keyword !== "default") {
        return response;
      }
    }
    
    // Return default response if no match
    return mockResponses["default"];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // First try the OpenRouter API
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://drkrishak.vercel.app/',
            'X-Title': 'Dr. Krishak Eco-Farming Assistant'
          },
          body: JSON.stringify({
            model: 'openai/gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful eco-farming assistant for Dr. Krishak platform. Provide concise, helpful responses about sustainable farming, eco-friendly practices, and agricultural products. Keep responses under 100 words when possible.'
              },
              ...messages.map(msg => ({
                role: msg.role,
                content: msg.content
              })),
              {
                role: 'user',
                content: userMessage
              }
            ]
          })
        });
        
        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
          // Add assistant response to chat
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: data.choices[0].message.content 
          }]);
          setIsLoading(false);
          return;
        }
        // If we reach here, there was an issue with the API response
        throw new Error('Invalid API response format');
      } catch (apiError) {
        console.error('Error with OpenRouter API, falling back to mock responses:', apiError);
        // Fall back to mock responses
        const mockResponse = getMockResponse(userMessage);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: mockResponse
        }]);
      }
    } catch (error) {
      console.error('Error in chat processing:', error);
      // Final fallback for any other errors
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I can help with questions about sustainable farming, organic practices, and eco-friendly agriculture. What would you like to know?'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Collapsed chat button */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          aria-label="Open chat assistant"
        >
          {/* Animated ball-type character */}
          <div className="relative w-full h-full overflow-hidden rounded-full bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center border-4 border-white">
            {/* Face */}
            <div className="flex flex-col items-center">
              {/* Eyes */}
              <div className="flex space-x-2 mb-1">
                <div className="w-2 h-3 bg-white rounded-full"></div>
                <div className="w-2 h-3 bg-white rounded-full"></div>
              </div>
              {/* Smile */}
              <div className="w-5 h-2 border-b-2 border-white rounded-full"></div>
            </div>
            
            {/* Notification indicator */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">1</span>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </div>
          
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 rounded-full border-4 border-green-300 opacity-0 group-hover:opacity-100 animate-ping"></div>
        </button>
      )}

      {/* Expanded chat interface */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-green-100 w-80 md:w-96 flex flex-col overflow-hidden" style={{ height: '500px', maxHeight: '80vh' }}>
          {/* Chat header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mini version of the ball character */}
              <div className="bg-white/20 p-2 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-b from-green-300 to-green-500 rounded-full flex items-center justify-center">
                  <div className="flex flex-col items-center scale-75">
                    {/* Eyes */}
                    <div className="flex space-x-1">
                      <div className="w-1 h-1.5 bg-white rounded-full"></div>
                      <div className="w-1 h-1.5 bg-white rounded-full"></div>
                    </div>
                    {/* Smile */}
                    <div className="w-3 h-1 border-b-[1px] border-white rounded-full mt-0.5"></div>
                  </div>
                </div>
              </div>
              <h3 className="font-medium">Eco-Farming Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 ${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-7 h-7 mr-2 bg-gradient-to-b from-green-300 to-green-500 rounded-full flex items-center justify-center self-end">
                    <div className="flex flex-col items-center scale-75">
                      {/* Eyes */}
                      <div className="flex space-x-1">
                        <div className="w-1 h-1.5 bg-white rounded-full"></div>
                        <div className="w-1 h-1.5 bg-white rounded-full"></div>
                      </div>
                      {/* Smile */}
                      <div className="w-3 h-1 border-b-[1px] border-white rounded-full mt-0.5"></div>
                    </div>
                  </div>
                )}
                <div 
                  className={`max-w-[75%] rounded-2xl py-2 px-4 ${
                    message.role === 'user' 
                      ? 'bg-green-500 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-7 h-7 ml-2 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-700 font-medium self-end">
                    You
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="w-7 h-7 mr-2 bg-gradient-to-b from-green-300 to-green-500 rounded-full flex items-center justify-center self-end">
                  <div className="flex flex-col items-center scale-75">
                    {/* Eyes */}
                    <div className="flex space-x-1">
                      <div className="w-1 h-1.5 bg-white rounded-full"></div>
                      <div className="w-1 h-1.5 bg-white rounded-full"></div>
                    </div>
                    {/* Smile */}
                    <div className="w-3 h-1 border-b-[1px] border-white rounded-full mt-0.5"></div>
                  </div>
                </div>
                <div className="bg-white text-gray-800 max-w-[75%] rounded-2xl py-2 px-4 border border-gray-200 rounded-tl-none">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask about sustainable farming..."
                value={inputValue}
                onChange={handleInputChange}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <button 
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 