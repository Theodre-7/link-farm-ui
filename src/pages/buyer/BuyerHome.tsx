import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, DollarSign, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import BuyerBottomNavigation from '@/components/BuyerBottomNavigation';

interface Crop {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  location: string;
  farmer: string;
  quantity: number;
}

const mockCrops: Crop[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
    price: 3.50,
    unit: 'kg',
    location: 'California Valley',
    farmer: 'John Smith Farm',
    quantity: 500
  },
  {
    id: '2',
    name: 'Organic Carrots',
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop',
    price: 2.25,
    unit: 'kg',
    location: 'Oregon Fields',
    farmer: 'Green Acres',
    quantity: 300
  },
  {
    id: '3',
    name: 'Sweet Corn',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop',
    price: 4.00,
    unit: 'dozen',
    location: 'Iowa Plains',
    farmer: 'Sunrise Farm',
    quantity: 200
  },
  {
    id: '4',
    name: 'Bell Peppers',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
    price: 5.75,
    unit: 'kg',
    location: 'Florida Groves',
    farmer: 'Pepper Paradise',
    quantity: 150
  },
  {
    id: '5',
    name: 'Fresh Lettuce',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop',
    price: 1.80,
    unit: 'head',
    location: 'Arizona Desert',
    farmer: 'Desert Greens',
    quantity: 400
  },
  {
    id: '6',
    name: 'Red Onions',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
    price: 2.90,
    unit: 'kg',
    location: 'Texas Ranch',
    farmer: 'Lone Star Produce',
    quantity: 600
  }
];

const BuyerHome = () => {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up', 'animate-scale-in');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  const filteredCrops = mockCrops.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.farmer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = (cropId: string) => {
    navigate(`/checkout?item=${cropId}`);
  };

  return (
    <div className="min-h-screen bg-agri-cream pb-20">
      {/* Header */}
      <div className="bg-white border-b border-agri-blue/20 shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-agri-brown mb-4">AgriLink Marketplace</h1>
          
          {/* Expanding Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className={cn(
              "relative transition-all duration-500 ease-out",
              searchFocused 
                ? "transform scale-105 shadow-2xl shadow-agri-green/20" 
                : "shadow-md"
            )}>
              <Input
                type="text"
                placeholder="Search for crops, locations, or farmers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={cn(
                  "pl-12 pr-4 py-4 text-lg rounded-2xl border-2 transition-all duration-500",
                  searchFocused 
                    ? "border-agri-green bg-white ring-4 ring-agri-green/20" 
                    : "border-agri-blue/30 bg-white/80"
                )}
              />
              <Search className={cn(
                "absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300",
                searchFocused ? "text-agri-green w-6 h-6" : "text-gray-400 w-5 h-5"
              )} />
              
              {/* Glow effect */}
              {searchFocused && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-agri-green/20 to-agri-blue/20 blur-xl -z-10 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Crop Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredCrops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop, index) => (
              <div
                key={crop.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="opacity-0 transform translate-y-8 transition-all duration-500"
              >
                <Card className="bg-white border border-agri-blue/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={crop.image} 
                      alt={crop.name}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-agri-brown mb-2">{crop.name}</h3>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{crop.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-agri-green mb-3">
                      <DollarSign className="w-5 h-5" />
                      <span className="font-bold text-lg">₹{crop.price}</span>
                      <span className="text-sm text-gray-600">/{crop.unit}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {crop.quantity} {crop.unit} available from {crop.farmer}
                    </p>
                    
                    <div className="flex gap-3">
                      <Link to={`/crop/${crop.id}`} className="flex-1">
                        <Button 
                          variant="outline" 
                          className="w-full border-agri-green text-agri-green hover:bg-agri-green hover:text-white transition-all duration-300 min-h-[44px]"
                        >
                          View Details
                        </Button>
                      </Link>
                      
                      <Button 
                        onClick={() => handleBuyNow(crop.id)}
                        className={cn(
                          "flex-1 bg-agri-green hover:bg-agri-green/90 text-white min-h-[44px]",
                          "relative overflow-hidden transition-all duration-300",
                          "hover:shadow-lg hover:shadow-agri-green/30",
                          "active:scale-95 ripple-effect"
                        )}
                      >
                        <span className="flex items-center gap-2 relative z-10">
                          <ShoppingCart className="w-4 h-4" />
                          Buy Now
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No crops found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No crops match your search for "${searchQuery}"`
                : "No crops are currently available in the marketplace"
              }
            </p>
          </div>
        )}
      </div>

      <BuyerBottomNavigation />
    </div>
  );
};

export default BuyerHome;
