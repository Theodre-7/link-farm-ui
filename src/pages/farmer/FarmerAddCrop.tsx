
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Check, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingInput from '@/components/FloatingInput';
import { cn } from '@/lib/utils';

interface CropFormData {
  name: string;
  variety: string;
  quantity: string;
  unit: string;
  pricePerUnit: string;
  harvestDate: string;
  description: string;
  image: File | null;
}

const FarmerAddCrop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CropFormData>({
    name: '',
    variety: '',
    quantity: '',
    unit: 'kg',
    pricePerUnit: '',
    harvestDate: '',
    description: '',
    image: null
  });
  
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false);
      navigate('/farmer/home');
    }, 2000);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => prev < 7 ? prev + 1 : prev);
    }, 200);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-agri-cream p-4">
      {/* Header */}
      <Card className="mb-6 bg-gradient-to-r from-agri-green to-agri-blue border-0 shadow-lg">
        <CardHeader className="text-white">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/farmer/home')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <CardTitle className="text-xl font-bold">Add New Crop</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Form */}
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div 
              className={cn(
                "space-y-4 transition-all duration-500 transform",
                currentStep >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <h3 className="text-lg font-semibold text-agri-brown">Crop Image</h3>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="block w-full h-48 border-2 border-dashed border-agri-blue/50 rounded-xl hover:border-agri-green transition-colors cursor-pointer bg-agri-blue/5"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden animate-scale-in">
                      <img 
                        src={imagePreview} 
                        alt="Crop preview" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-agri-brown/60">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <p className="text-sm font-medium">Upload crop image</p>
                      <p className="text-xs">Tap to browse files</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Basic Info */}
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-500 transform",
                currentStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <FloatingInput
                label="Crop Name"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
              />
              <FloatingInput
                label="Variety"
                value={formData.variety}
                onChange={(value) => setFormData(prev => ({ ...prev, variety: value }))}
              />
            </div>

            {/* Quantity & Price */}
            <div 
              className={cn(
                "grid grid-cols-2 gap-4 transition-all duration-500 transform",
                currentStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <FloatingInput
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(value) => setFormData(prev => ({ ...prev, quantity: value }))}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-agri-brown">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-agri-green outline-none transition-colors"
                >
                  <option value="kg">Kilograms</option>
                  <option value="lbs">Pounds</option>
                  <option value="tons">Tons</option>
                  <option value="pieces">Pieces</option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div 
              className={cn(
                "transition-all duration-500 transform",
                currentStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <FloatingInput
                label="Price per Unit ($)"
                type="number"
                value={formData.pricePerUnit}
                onChange={(value) => setFormData(prev => ({ ...prev, pricePerUnit: value }))}
              />
            </div>

            {/* Harvest Date */}
            <div 
              className={cn(
                "transition-all duration-500 transform",
                currentStep >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <FloatingInput
                label="Expected Harvest Date"
                type="date"
                value={formData.harvestDate}
                onChange={(value) => setFormData(prev => ({ ...prev, harvestDate: value }))}
              />
            </div>

            {/* Description */}
            <div 
              className={cn(
                "transition-all duration-500 transform",
                currentStep >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-agri-brown">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-agri-green outline-none transition-colors resize-none"
                  rows={3}
                  placeholder="Optional description..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div 
              className={cn(
                "pt-4 transition-all duration-500 transform",
                currentStep >= 6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <Button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={cn(
                  "w-full h-12 text-lg font-semibold transition-all duration-300",
                  isSubmitting && "animate-pulse",
                  isSuccess ? "bg-agri-green" : "bg-agri-green hover:bg-agri-green/90",
                  "ripple-effect"
                )}
              >
                {isSuccess ? (
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 animate-check" />
                    <span>Crop Added Successfully!</span>
                  </div>
                ) : isSubmitting ? (
                  'Adding Crop...'
                ) : (
                  'Add Crop'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerAddCrop;
