
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, DollarSign, Package } from 'lucide-react';

interface Crop {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
}

interface CropCardProps {
  crop: Crop;
  onDelete: () => void;
}

const CropCard = ({ crop, onDelete }: CropCardProps) => {
  return (
    <Card className="bg-white border border-agri-blue/20 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ripple-effect overflow-hidden">
      <div className="relative">
        <img 
          src={crop.image} 
          alt={crop.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-white/90 hover:bg-white text-agri-brown shadow-md"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={onDelete}
            className="w-8 h-8 bg-red-500/90 hover:bg-red-500 text-white shadow-md"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-agri-brown mb-3">{crop.name}</h3>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-agri-green">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold text-lg">${crop.price}</span>
            <span className="text-sm text-gray-600">/{crop.unit}</span>
          </div>
          
          <div className="flex items-center gap-1 text-agri-brown">
            <Package className="w-4 h-4" />
            <span className="font-medium">{crop.quantity}</span>
            <span className="text-sm text-gray-600">{crop.unit}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-agri-blue/20">
          <div className="text-right">
            <span className="text-sm text-gray-600">Total Value: </span>
            <span className="font-bold text-agri-green">
              ${(crop.price * crop.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropCard;
