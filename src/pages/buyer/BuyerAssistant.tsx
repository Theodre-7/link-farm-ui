
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import BuyerBottomNavigation from '@/components/BuyerBottomNavigation';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'bot';
  type?: 'text' | 'location' | 'crops';
  crops?: CropCard[];
}

interface CropCard {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  distance: string;
  farmer: string;
}

const mockNearByCrops: CropCard[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&fit=crop',
    price: 3.50,
    unit: 'kg',
    distance: '2.5 km',
    farmer: 'Green Valley Farm'
  },
  {
    id: '2',
    name: 'Organic Carrots',
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=150&h=150&fit=crop',
    price: 2.25,
    unit: 'kg',
    distance: '3.8 km',
    farmer: 'Sunshine Acres'
  },
  {
    id: '3',
    name: 'Sweet Corn',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=150&h=150&fit=crop',
    price: 4.00,
    unit: 'dozen',
    distance: '5.2 km',
    farmer: 'Riverside Farm'
  }
];

const mockRecentCrops: CropCard[] = [
  {
    id: '4',
    name: 'Bell Peppers',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=150&h=150&fit=crop',
    price: 5.75,
    unit: 'kg',
    distance: '1.2 km',
    farmer: 'Valley Gardens'
  },
  {
    id: '5',
    name: 'Fresh Lettuce',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=150&h=150&fit=crop',
    price: 1.80,
    unit: 'head',
    distance: '4.6 km',
    farmer: 'Green Leaf Co.'
  }
];

const quickReplies = [
  'Nearby crops',
  "Today's Fresh Stock",
  'My Orders',
  'Contact Support'
];

const TypingIndicator = () => (
  <div className="flex items-center gap-2 p-3 bg-white rounded-2xl rounded-bl-md shadow-sm max-w-[80px]">
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

const CropMiniCard = ({ crop, onBuyNow, onMoreInfo }: { 
  crop: CropCard; 
  onBuyNow: (id: string) => void;
  onMoreInfo: (id: string) => void;
}) => (
  <Card className="min-w-[200px] bg-white shadow-md border border-agri-blue/20">
    <CardContent className="p-4">
      <img 
        src={crop.image} 
        alt={crop.name}
        className="w-full h-24 object-cover rounded-lg mb-3"
      />
      <h4 className="font-semibold text-agri-brown text-sm mb-1">{crop.name}</h4>
      <p className="text-agri-green font-bold text-sm">₹{crop.price}/{crop.unit}</p>
      <p className="text-gray-500 text-xs mb-2">{crop.distance} away</p>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onMoreInfo(crop.id)}
          className="flex-1 text-xs h-8"
        >
          More Info
        </Button>
        <Button 
          onClick={() => onBuyNow(crop.id)}
          className="flex-1 bg-agri-green hover:bg-agri-green/90 text-white text-xs h-8"
        >
          Buy Now
        </Button>
      </div>
    </CardContent>
  </Card>
);

const BuyerAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AgriLink assistant. I can help you discover fresh crops, find nearby farmers, and answer any questions about our marketplace. How can I help you today?',
      timestamp: new Date(),
      sender: 'bot'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date(),
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      handleBotResponse(newMessage.toLowerCase());
      setIsTyping(false);
    }, 1500);
  };

  const handleBotResponse = (userInput: string) => {
    let botMessage: Message;

    if (userInput.includes('nearby') || userInput.includes('near me') || userInput.includes('location')) {
      if (locationPermission === 'granted') {
        botMessage = {
          id: Date.now().toString(),
          text: 'Here are fresh crops within 10km of your location:',
          timestamp: new Date(),
          sender: 'bot',
          type: 'crops',
          crops: mockNearByCrops
        };
      } else {
        botMessage = {
          id: Date.now().toString(),
          text: 'Would you like to share your location to see nearby farmer crops?',
          timestamp: new Date(),
          sender: 'bot',
          type: 'location'
        };
      }
    } else if (userInput.includes('fresh') || userInput.includes('today') || userInput.includes('recent')) {
      botMessage = {
        id: Date.now().toString(),
        text: 'Here are crops that were just added in the last few minutes:',
        timestamp: new Date(),
        sender: 'bot',
        type: 'crops',
        crops: mockRecentCrops
      };
    } else if (userInput.includes('potato') || userInput.includes('tomato') || userInput.includes('carrot')) {
      botMessage = {
        id: Date.now().toString(),
        text: 'I found some great options for you! Here are the available crops:',
        timestamp: new Date(),
        sender: 'bot',
        type: 'crops',
        crops: mockNearByCrops.filter(crop => 
          crop.name.toLowerCase().includes(userInput.replace(/s$/, ''))
        )
      };
    } else if (userInput.includes('organic')) {
      botMessage = {
        id: Date.now().toString(),
        text: 'Here are our certified organic crops available nearby:',
        timestamp: new Date(),
        sender: 'bot',
        type: 'crops',
        crops: mockNearByCrops.filter(crop => 
          crop.name.toLowerCase().includes('organic') || crop.farmer.toLowerCase().includes('organic')
        )
      };
    } else {
      botMessage = {
        id: Date.now().toString(),
        text: 'I can help you find fresh crops, locate nearby farmers, check today\'s listings, or answer questions about our marketplace. Try asking me about "nearby crops" or "what\'s fresh today"!',
        timestamp: new Date(),
        sender: 'bot'
      };
    }

    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission('granted');
          const botMessage: Message = {
            id: Date.now().toString(),
            text: 'Great! I can now show you crops from farmers near your location. Here are fresh crops within 10km:',
            timestamp: new Date(),
            sender: 'bot',
            type: 'crops',
            crops: mockNearByCrops
          };
          setMessages(prev => [...prev, botMessage]);
        },
        () => {
          setLocationPermission('denied');
          const botMessage: Message = {
            id: Date.now().toString(),
            text: 'No worries! You can still browse all available crops. Would you like to see today\'s fresh listings instead?',
            timestamp: new Date(),
            sender: 'bot'
          };
          setMessages(prev => [...prev, botMessage]);
        }
      );
    }
  };

  const handleBuyNow = (cropId: string) => {
    navigate(`/checkout?item=${cropId}`);
  };

  const handleMoreInfo = (cropId: string) => {
    navigate(`/crop/${cropId}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="h-screen bg-agri-cream flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-agri-blue/20 shadow-sm p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/buyer/home')}
          className="min-h-[44px] min-w-[44px]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-agri-green/20 text-xl">🤖</AvatarFallback>
        </Avatar>
        
        <div>
          <h2 className="font-semibold text-agri-brown">AgriLink Assistant</h2>
          <p className="text-sm text-agri-green">Always here to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex animate-fade-up",
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm",
                message.sender === 'user'
                  ? 'bg-agri-green text-white rounded-br-md'
                  : 'bg-white text-gray-800 rounded-bl-md'
              )}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              
              {message.type === 'location' && (
                <Button
                  onClick={handleLocationPermission}
                  className="mt-3 bg-agri-blue hover:bg-agri-blue/90 text-white text-sm h-10 w-full"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Share My Location
                </Button>
              )}
              
              {message.type === 'crops' && message.crops && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {message.crops.map((crop) => (
                    <CropMiniCard
                      key={crop.id}
                      crop={crop}
                      onBuyNow={handleBuyNow}
                      onMoreInfo={handleMoreInfo}
                    />
                  ))}
                </div>
              )}
              
              <p className={cn(
                "text-xs mt-2",
                message.sender === 'user' ? 'text-agri-cream/80' : 'text-gray-500'
              )}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="bg-white border-t border-agri-blue/20 p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickReplies.map((reply) => (
            <Button
              key={reply}
              variant="outline"
              onClick={() => handleQuickReply(reply)}
              className="whitespace-nowrap border-agri-green/30 text-agri-green hover:bg-agri-green/10 min-h-[36px]"
            >
              {reply === 'Nearby crops' && <MapPin className="w-4 h-4 mr-2" />}
              {reply === "Today's Fresh Stock" && <Clock className="w-4 h-4 mr-2" />}
              {reply}
            </Button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-agri-blue/20 p-4 pb-24">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask me about crops, locations, or anything else..."
              className="rounded-full border-agri-blue/30 focus:border-agri-green min-h-[44px]"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="border-agri-blue/30 text-agri-brown min-h-[44px] min-w-[44px]"
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleSendMessage}
            className="bg-agri-green hover:bg-agri-green/90 rounded-full p-3 min-h-[44px] min-w-[44px]"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <BuyerBottomNavigation />
    </div>
  );
};

export default BuyerAssistant;
