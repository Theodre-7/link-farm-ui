
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, MapPin, Phone, Mail, Edit, Settings, LogOut } from 'lucide-react';

const FarmerProfile = () => {
  const farmerData = {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Green Valley Farm, California',
    joinDate: 'March 2023',
    totalSales: '$12,450',
    rating: 4.8,
    avatar: '👨‍🌾'
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-agri-green to-agri-brown border-0 shadow-lg">
        <CardContent className="p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{farmerData.avatar}</div>
            <div>
              <h1 className="text-2xl font-bold">{farmerData.name}</h1>
              <p className="text-agri-cream/90">Farmer since {farmerData.joinDate}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-300">⭐</span>
                <span className="font-semibold">{farmerData.rating}</span>
                <span className="text-agri-cream/80">(48 reviews)</span>
              </div>
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
            <span className="text-gray-700">{farmerData.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-agri-green" />
            <span className="text-gray-700">{farmerData.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-agri-orange" />
            <span className="text-gray-700">{farmerData.location}</span>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-agri-brown">Farm Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-agri-cream rounded-lg">
              <div className="text-2xl font-bold text-agri-green">{farmerData.totalSales}</div>
              <div className="text-sm text-gray-600">Total Sales</div>
            </div>
            <div className="text-center p-4 bg-agri-blue/10 rounded-lg">
              <div className="text-2xl font-bold text-agri-blue">23</div>
              <div className="text-sm text-gray-600">Active Listings</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full bg-agri-green hover:bg-agri-green/90 text-white ripple-effect">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
        
        <Button variant="outline" className="w-full border-agri-brown text-agri-brown hover:bg-agri-brown/10">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        
        <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default FarmerProfile;
