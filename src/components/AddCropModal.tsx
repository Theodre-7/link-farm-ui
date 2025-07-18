
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import FloatingInput from './FloatingInput';

interface Crop {
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
}

interface AddCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (crop: Crop) => void;
}

const AddCropModal = ({ isOpen, onClose, onAdd }: AddCropModalProps) => {
  const [formData, setFormData] = useState<Crop>({
    name: '',
    image: '',
    price: 0,
    quantity: 0,
    unit: 'kg'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.price > 0 && formData.quantity > 0) {
      onAdd(formData);
      setFormData({ name: '', image: '', price: 0, quantity: 0, unit: 'kg' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white shadow-2xl animate-scale-in">
        <CardHeader className="border-b border-agri-blue/20">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-agri-brown">Add New Crop</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-agri-blue/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput
              label="Crop Name"
              value={formData.name}
              onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
            />
            
            <FloatingInput
              label="Image URL"
              value={formData.image}
              onChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                label="Price per unit"
                type="number"
                value={formData.price.toString()}
                onChange={(value) => setFormData(prev => ({ ...prev, price: parseFloat(value) || 0 }))}
              />
              
              <FloatingInput
                label="Quantity"
                type="number"
                value={formData.quantity.toString()}
                onChange={(value) => setFormData(prev => ({ ...prev, quantity: parseFloat(value) || 0 }))}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-agri-brown">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-agri-green outline-none transition-colors"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
                <option value="pieces">Pieces</option>
                <option value="bunches">Bunches</option>
              </select>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-agri-brown text-agri-brown hover:bg-agri-brown/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-agri-green hover:bg-agri-green/90 text-white ripple-effect"
              >
                Add Crop
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCropModal;
