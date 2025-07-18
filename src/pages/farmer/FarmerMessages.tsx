import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Clock, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const FarmerMessages = () => {
  const messages = [
    {
      id: 1,
      sender: 'Green Market Co.',
      message: 'Interested in your tomatoes. Can we discuss bulk pricing?',
      time: '10 minutes ago',
      unread: true,
      avatar: '🏪'
    },
    {
      id: 2,
      sender: 'Local Restaurant',
      message: 'We need fresh herbs for this weekend. Are you available?',
      time: '2 hours ago',
      unread: true,
      avatar: '🍽️'
    },
    {
      id: 3,
      sender: 'Farm Equipment Rental',
      message: 'Your tractor rental is confirmed for tomorrow at 9 AM.',
      time: '1 day ago',
      unread: false,
      avatar: '🚜'
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-agri-blue to-agri-green border-0 shadow-lg">
        <CardHeader className="text-white">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Messages
          </CardTitle>
          <p className="text-agri-cream/90">Stay connected with buyers and partners</p>
        </CardHeader>
      </Card>

      {/* Messages List */}
      <div className="space-y-3">
        {messages.length === 0 ? (
          <Card className="border-2 border-dashed border-agri-blue/30 bg-white/80">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-agri-brown mb-2">No messages yet</h3>
              <p className="text-gray-600">Your conversations will appear here</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message, index) => (
            <Card 
              key={message.id}
              className={cn(
                "bg-white border shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-up",
                message.unread ? "border-agri-green/40 border-l-4 border-l-agri-green" : "border-gray-200"
              )}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'backwards'
              }}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="text-2xl">{message.avatar}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={cn(
                        "font-semibold text-agri-brown",
                        message.unread && "font-bold"
                      )}>
                        {message.sender}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{message.time}</span>
                        </div>
                        {!message.unread && (
                          <CheckCheck className="w-4 h-4 text-agri-green" />
                        )}
                      </div>
                    </div>
                    
                    <p className={cn(
                      "text-sm text-gray-600 truncate",
                      message.unread ? "font-medium text-gray-800" : ""
                    )}>
                      {message.message}
                    </p>
                    
                    {message.unread && (
                      <div className="mt-2">
                        <span className="inline-block w-2 h-2 bg-agri-green rounded-full animate-pulse"></span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FarmerMessages;
