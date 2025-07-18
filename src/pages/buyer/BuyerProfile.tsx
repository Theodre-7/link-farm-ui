
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, MapPin, Phone, Mail, Edit, Settings, LogOut, Camera, Save, X, ShoppingBag, Clock, CheckCircle, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  orderDate: Date;
  farmer: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    items: ['Fresh Tomatoes (10kg)', 'Organic Carrots (5kg)'],
    total: 46.25,
    status: 'delivered',
    orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    farmer: 'Green Valley Farm'
  },
  {
    id: '2',
    items: ['Sweet Corn (2 dozen)'],
    total: 8.00,
    status: 'shipped',
    orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    farmer: 'Sunrise Farm'
  },
  {
    id: '3',
    items: ['Bell Peppers (3kg)', 'Fresh Lettuce (5 heads)'],
    total: 26.25,
    status: 'confirmed',
    orderDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
    farmer: 'Pepper Paradise'
  },
  {
    id: '4',
    items: ['Red Onions (8kg)'],
    total: 23.20,
    status: 'pending',
    orderDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    farmer: 'Lone Star Produce'
  }
];

const BuyerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [buyerData, setBuyerData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 987-6543',
    location: 'Downtown Market District, California',
    joinDate: 'January 2023',
    totalOrders: 24,
    totalSpent: '$1,247.50',
    avatar: '👩‍💼'
  });
  const [orders] = useState<Order[]>(mockOrders);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Order Pending';
      case 'confirmed': return 'Confirmed';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-agri-cream p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-agri-orange to-agri-brown border-0 shadow-lg overflow-hidden">
        <CardContent className="p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-white/20">
                <AvatarFallback className="bg-white/20 text-4xl">
                  {buyerData.avatar}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-agri-orange hover:bg-white/90 rounded-full shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={buyerData.name}
                  onChange={(e) => setBuyerData({...buyerData, name: e.target.value})}
                  className="text-xl font-bold bg-white/20 border-white/30 text-white placeholder:text-white/70 mb-2"
                />
              ) : (
                <h1 className="text-2xl font-bold">{buyerData.name}</h1>
              )}
              <p className="text-agri-cream/90">Member since {buyerData.joinDate}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-300">🏆</span>
                <span className="font-semibold">Verified Buyer</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-white text-agri-orange hover:bg-white/90 min-h-[44px]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 min-h-[44px]"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-agri-orange hover:bg-white/90 min-h-[44px]"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-agri-brown flex items-center gap-2">
            <User className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-agri-blue" />
            {isEditing ? (
              <Input
                value={buyerData.email}
                onChange={(e) => setBuyerData({...buyerData, email: e.target.value})}
                className="flex-1"
              />
            ) : (
              <span className="text-gray-700">{buyerData.email}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-agri-green" />
            {isEditing ? (
              <Input
                value={buyerData.phone}
                onChange={(e) => setBuyerData({...buyerData, phone: e.target.value})}
                className="flex-1"
              />
            ) : (
              <span className="text-gray-700">{buyerData.phone}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-agri-orange" />
            {isEditing ? (
              <Input
                value={buyerData.location}
                onChange={(e) => setBuyerData({...buyerData, location: e.target.value})}
                className="flex-1"
              />
            ) : (
              <span className="text-gray-700">{buyerData.location}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-agri-brown">Shopping Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-agri-cream rounded-lg">
              <div className="text-2xl font-bold text-agri-green">{buyerData.totalSpent}</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div className="text-center p-4 bg-agri-orange/10 rounded-lg">
              <div className="text-2xl font-bold text-agri-orange">{buyerData.totalOrders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-agri-brown flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border border-agri-blue/20 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-agri-brown">Order #{order.id}</span>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                      getStatusColor(order.status)
                    )}>
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">
                    From: {order.farmer}
                  </p>
                  
                  <p className="text-sm text-gray-600">
                    {formatDate(order.orderDate)}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-agri-green text-lg">
                    ${order.total.toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-agri-blue/10 pt-3">
                <p className="text-sm font-medium text-agri-brown mb-1">Items:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-agri-green rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full border-agri-brown text-agri-brown hover:bg-agri-brown/10 min-h-[44px]">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        
        <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50 min-h-[44px]">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default BuyerProfile;
