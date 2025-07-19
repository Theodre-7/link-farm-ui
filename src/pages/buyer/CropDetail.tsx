import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Package, User, Phone, Mail, MessageCircle, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface CropData {
  id: string;
  name: string;
  images: string[];
  price: number;
  unit: string;
  quantity: number;
  location: string;
  description: string;
  farmer: {
    name: string;
    rating: number;
    totalSales: number;
    phone: string;
    email: string;
    avatar: string;
    verified: boolean;
  };
  category: string;
  harvestDate: string;
  qualityGrade: string;
}

const mockCropData: CropData = {
  id: '1',
  name: 'Premium Fresh Tomatoes',
  images: [
    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&h=500&fit=crop',
    'https://images.unsplash.com/photo-1546470427-e5dd2052e18b?w=700&h=500&fit=crop',
    'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=700&h=500&fit=crop'
  ],
  price: 3.50,
  unit: 'kg',
  quantity: 500,
  location: 'California Valley, CA',
  description: 'Premium quality vine-ripened tomatoes grown using sustainable farming practices. These tomatoes are perfect for salads, cooking, and canning. Harvested at peak ripeness for maximum flavor and nutritional value.',
  farmer: {
    name: 'John Smith',
    rating: 4.8,
    totalSales: 250,
    phone: '+1 (555) 123-4567',
    email: 'john@smithfarm.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    verified: true
  },
  category: 'Vegetables',
  harvestDate: '2024-01-15',
  qualityGrade: 'Grade A'
};

const CropDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isContactAnimating, setIsContactAnimating] = useState(false);
  const [isBuyAnimating, setIsBuyAnimating] = useState(false);

  const crop = mockCropData; // In real app, fetch by id

  const handleContactFarmer = () => {
    setIsContactAnimating(true);
    setTimeout(() => setIsContactAnimating(false), 600);
    // Add contact logic here
  };

  const handleBuyNow = () => {
    setIsBuyAnimating(true);
    setTimeout(() => {
      setIsBuyAnimating(false);
      navigate(`/checkout?item=${id}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-agri-cream">
      {/* Header */}
      <div className="bg-white border-b border-agri-blue/20 shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/buyer/home">
              <Button variant="ghost" size="icon" className="hover:bg-agri-green/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-agri-brown">Crop Details</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {crop.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img 
                        src={image} 
                        alt={`${crop.name} - Image ${index + 1}`}
                        className="w-full h-96 object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/90 hover:bg-white shadow-lg" />
              <CarouselNext className="right-4 bg-white/90 hover:bg-white shadow-lg" />
            </Carousel>

            {/* Thumbnail indicators */}
            <div className="flex gap-2 justify-center">
              {crop.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === selectedImageIndex 
                      ? "bg-agri-green scale-125" 
                      : "bg-gray-300 hover:bg-agri-green/50"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Crop Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-agri-brown">{crop.name}</h1>
                <Badge variant="secondary" className="bg-agri-green/10 text-agri-green">
                  {crop.category}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{crop.location}</span>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{crop.description}</p>
            </div>

            {/* Price and Quantity */}
            <Card className="border-agri-green/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-agri-green" />
                    <div>
                      <p className="text-sm text-gray-600">Price per {crop.unit}</p>
                      <p className="text-2xl font-bold text-agri-green">₹{crop.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-agri-brown" />
                    <div>
                      <p className="text-sm text-gray-600">Available</p>
                      <p className="text-xl font-bold text-agri-brown">{crop.quantity} {crop.unit}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-agri-blue/20">
                  <div className="flex justify-between text-sm">
                    <span>Harvest Date: <strong>{crop.harvestDate}</strong></span>
                    <span>Quality: <strong>{crop.qualityGrade}</strong></span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleContactFarmer}
                variant="outline"
                className={cn(
                  "flex-1 border-agri-brown text-agri-brown hover:bg-agri-brown hover:text-white min-h-[64px]",
                  "transition-all duration-300 hover:shadow-lg",
                  isContactAnimating && "animate-ripple"
                )}
              >
                <MessageCircle className={cn(
                  "w-4 h-4 mr-2 transition-transform duration-300",
                  isContactAnimating && "rotate-12"
                )} />
                Contact Farmer
              </Button>
              
              <Button
                onClick={handleBuyNow}
                className={cn(
                  "flex-1 bg-agri-green hover:bg-agri-green/90 text-white min-h-[64px]",
                  "transition-all duration-300 hover:shadow-lg hover:shadow-agri-green/30",
                  "relative overflow-hidden ripple-effect",
                  isBuyAnimating && "animate-pulse"
                )}
              >
                <ShoppingCart className={cn(
                  "w-4 h-4 mr-2 transition-transform duration-300",
                  isBuyAnimating && "rotate-12 scale-110"
                )} />
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Farmer Information */}
        <Card className="mt-8 border-agri-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-agri-brown">
              <User className="w-5 h-5" />
              Farmer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="relative">
                <img 
                  src={crop.farmer.avatar} 
                  alt={crop.farmer.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-agri-green/20"
                />
                {crop.farmer.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-agri-green text-white rounded-full p-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-agri-brown">{crop.farmer.name}</h3>
                  {crop.farmer.verified && (
                    <Badge className="bg-agri-green text-white">Verified</Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{crop.farmer.rating}</span>
                  </div>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{crop.farmer.totalSales} sales</span>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{crop.farmer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{crop.farmer.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropDetail;
