
import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'other';
  status?: 'sent' | 'delivered' | 'read';
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  online: boolean;
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Green Valley Farm',
    avatar: '🚜',
    lastMessage: 'The tomatoes are ready for harvest!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unread: 2,
    online: true
  },
  {
    id: '2',
    name: 'Organic Gardens Co.',
    avatar: '🌱',
    lastMessage: 'Thank you for your order',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    unread: 0,
    online: false
  },
  {
    id: '3',
    name: 'Sunrise Equipment',
    avatar: '🔧',
    lastMessage: 'Equipment available for rent',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: 1,
    online: true
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! I\'m interested in your fresh tomatoes. Are they still available?',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    sender: 'user'
  },
  {
    id: '2',
    text: 'Yes, we have plenty! They were just harvested this morning. Very fresh and organic.',
    timestamp: new Date(Date.now() - 55 * 60 * 1000),
    sender: 'other'
  },
  {
    id: '3',
    text: 'Perfect! What\'s the minimum order quantity?',
    timestamp: new Date(Date.now() - 50 * 60 * 1000),
    sender: 'user'
  },
  {
    id: '4',
    text: 'We can do orders starting from 10kg. The price is $3.50 per kg.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    sender: 'other'
  },
  {
    id: '5',
    text: 'The tomatoes are ready for harvest!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    sender: 'other'
  }
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

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date(),
      sender: 'user',
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60 * 1000) return 'now';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h`;
    return date.toLocaleDateString();
  };

  if (!selectedChat) {
    return (
      <div className="h-screen bg-agri-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-agri-brown mb-2">Select a chat to start messaging</h2>
          <p className="text-gray-600">Choose a conversation from the list to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-agri-cream flex">
      {/* Chat List - Hidden on mobile when chat is selected */}
      <div className={cn(
        "w-full md:w-1/3 bg-white border-r border-agri-blue/20",
        selectedChat ? "hidden md:block" : "block"
      )}>
        <div className="p-4 border-b border-agri-blue/20">
          <h1 className="text-xl font-bold text-agri-brown">Messages</h1>
        </div>
        
        <div className="overflow-y-auto h-full pb-20">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "p-4 border-b border-agri-blue/10 cursor-pointer transition-colors min-h-[80px]",
                "hover:bg-agri-cream/50 active:bg-agri-cream",
                selectedChat?.id === chat.id ? "bg-agri-green/10" : ""
              )}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-agri-green/20 text-2xl">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-agri-brown truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{formatLastMessageTime(chat.timestamp)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <div className="bg-agri-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col",
        selectedChat ? "block" : "hidden md:block"
      )}>
        {/* Chat Header */}
        <div className="bg-white border-b border-agri-blue/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSelectedChat(null)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-agri-green/20 text-xl">
                {selectedChat.avatar}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="font-semibold text-agri-brown">{selectedChat.name}</h2>
              <p className="text-sm text-gray-600">
                {selectedChat.online ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-agri-cream/30">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "flex animate-scale-in",
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={cn(
                  "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm",
                  message.sender === 'user'
                    ? 'bg-agri-green text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md'
                )}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={cn(
                  "text-xs mt-1",
                  message.sender === 'user' ? 'text-agri-cream/80' : 'text-gray-500'
                )}>
                  {formatTime(message.timestamp)}
                  {message.sender === 'user' && message.status && (
                    <span className="ml-1">
                      {message.status === 'sent' && '✓'}
                      {message.status === 'delivered' && '✓✓'}
                      {message.status === 'read' && '✓✓'}
                    </span>
                  )}
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

        {/* Message Input */}
        <div className="bg-white border-t border-agri-blue/20 p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="rounded-full border-agri-blue/30 focus:border-agri-green min-h-[44px]"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
            </div>
            <Button
              onClick={sendMessage}
              className="bg-agri-green hover:bg-agri-green/90 rounded-full p-3 min-h-[44px] min-w-[44px]"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
