import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, MapPin, Phone, Mail, Edit, Settings, LogOut, Camera, Save, X, Plus, Package, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import BottomNavigation from '@/components/BottomNavigation';

interface CropListing {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  status: 'active' | 'sold_out' | 'pending';
}

const mockCrops: CropListing[] = [
  { id: '1', name: 'Fresh Tomatoes', price: 3.50, unit: 'kg', quantity: 500, status: 'active' },
  { id: '2', name: 'Organic Carrots', price: 2.25, unit: 'kg', quantity: 0, status: 'sold_out' },
  { id: '3', name: 'Sweet Corn', price: 4.00, unit: 'dozen', quantity: 200, status: 'active' }
];

const FarmerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCrop, setEditingCrop] = useState<string | null>(null);
  const [farmerData, setFarmerData] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Green Valley Farm, California',
    joinDate: 'March 2023',
    totalSales: '₹12,450',
    rating: 4.8,
    avatar: '👨‍🌾'
  });
  const [crops, setCrops] = useState<CropListing[]>(mockCrops);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  const handleEditCrop = (cropId: string) => {
    setEditingCrop(editingCrop === cropId ? null : cropId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold_out': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'sold_out': return 'Sold Out';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-agri-cream pb-20">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-agri-green to-agri-brown border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white/20">
                  <AvatarFallback className="bg-white/20 text-4xl">
                    {farmerData.avatar}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-agri-green hover:bg-white/90 rounded-full shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={farmerData.name}
                    onChange={(e) => setFarmerData({...farmerData, name: e.target.value})}
                    className="text-xl font-bold bg-white/20 border-white/30 text-white placeholder:text-white/70 mb-2"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{farmerData.name}</h1>
                )}
                <p className="text-agri-cream/90">Farmer since {farmerData.joinDate}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-300">⭐</span>
                  <span className="font-semibold">{farmerData.rating}</span>
                  <span className="text-agri-cream/80">(48 reviews)</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-white text-agri-green hover:bg-white/90 min-h-[44px]"
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
                    className="bg-white text-agri-green hover:bg-white/90 min-h-[44px]"
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
                  value={farmerData.email}
                  onChange={(e) => setFarmerData({...farmerData, email: e.target.value})}
                  className="flex-1"
                />
              ) : (
                <span className="text-gray-700">{farmerData.email}</span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-agri-green" />
              {isEditing ? (
                <Input
                  value={farmerData.phone}
                  onChange={(e) => setFarmerData({...farmerData, phone: e.target.value})}
                  className="flex-1"
                />
              ) : (
                <span className="text-gray-700">{farmerData.phone}</span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-agri-orange" />
              {isEditing ? (
                <Input
                  value={farmerData.location}
                  onChange={(e) => setFarmerData({...farmerData, location: e.target.value})}
                  className="flex-1"
                />
              ) : (
                <span className="text-gray-700">{farmerData.location}</span>
              )}
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
                <div className="text-2xl font-bold text-agri-blue">{crops.length}</div>
                <div className="text-sm text-gray-600">Active Listings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Listings */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-agri-brown">My Crops</CardTitle>
              <Button
                className="bg-agri-green hover:bg-agri-green/90 text-white min-h-[44px]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Crop
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="flex items-center justify-between p-4 border border-agri-blue/20 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-1">
                    <h4 className="font-semibold text-agri-brown">{crop.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-agri-green">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">₹{crop.price}</span>
                        <span className="text-sm text-gray-600">/{crop.unit}</span>
                      </div>
                      <div className="flex items-center gap-1 text-agri-brown">
                        <Package className="w-4 h-4" />
                        <span className="font-medium">{crop.quantity}</span>
                        <span className="text-sm text-gray-600">{crop.unit}</span>
                      </div>
                    </div>
                  </div>
                  
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    getStatusColor(crop.status)
                  )}>
                    {getStatusText(crop.status)}
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditCrop(crop.id)}
                  className="ml-3 min-h-[44px] min-w-[44px]"
                >
                  <Edit className="w-4 h-4" />
                </Button>
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

      <BottomNavigation />
    </div>
  );
};

export default FarmerProfile;
