
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, DollarSign, Package } from 'lucide-react';
import CropCard from '@/components/CropCard';
import AddCropModal from '@/components/AddCropModal';

interface Crop {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
}

const FarmerHome = () => {
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400',
      price: 3.50,
      quantity: 150,
      unit: 'kg'
    },
    {
      id: '2',
      name: 'Organic Carrots',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
      price: 2.25,
      quantity: 80,
      unit: 'kg'
    },
    {
      id: '3',
      name: 'Sweet Corn',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400',
      price: 4.00,
      quantity: 120,
      unit: 'kg'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [farmerName] = useState('John'); // This would come from auth context

  const handleAddCrop = (newCrop: Omit<Crop, 'id'>) => {
    const crop: Crop = {
      ...newCrop,
      id: Date.now().toString()
    };
    setCrops(prev => [...prev, crop]);
  };

  const handleDeleteCrop = (id: string) => {
    setCrops(prev => prev.filter(crop => crop.id !== id));
  };

  const totalRevenue = crops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0);

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Header Card */}
      <Card className="bg-gradient-to-r from-agri-green to-agri-blue border-0 shadow-lg animate-fade-up">
        <CardHeader className="text-white">
          <CardTitle className="text-2xl font-bold">
            Welcome back, {farmerName}! 🌱
          </CardTitle>
          <p className="text-agri-cream/90 text-lg">
            Ready to manage your crops today?
          </p>
        </CardHeader>
        <CardContent className="text-white">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">${totalRevenue.toFixed(2)}</span>
              <span className="text-agri-cream/80">Total Value</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <span className="font-semibold">{crops.length}</span>
              <span className="text-agri-cream/80">Crops Listed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crops Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-agri-brown">Your Crops</h2>
        
        {crops.length === 0 ? (
          <Card className="border-2 border-dashed border-agri-green/30 bg-white/80">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold text-agri-brown mb-2">No crops listed yet</h3>
              <p className="text-gray-600 mb-4">Start by adding your first crop to the marketplace</p>
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-agri-green hover:bg-agri-green/90 text-white ripple-effect"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Crop
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crops.map((crop, index) => (
              <div 
                key={crop.id}
                className="animate-fade-up"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'backwards'
                }}
              >
                <CropCard 
                  crop={crop} 
                  onDelete={() => handleDeleteCrop(crop.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-agri-orange hover:bg-agri-orange/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ripple-effect animate-bounce z-40"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>

      <AddCropModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCrop}
      />
    </div>
  );
};

export default FarmerHome;
