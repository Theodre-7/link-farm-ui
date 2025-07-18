import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const FarmerTools = () => {
  const nearbyTools = [
    {
      id: 1,
      name: 'Heavy Duty Tractor',
      owner: 'Mike\'s Farm Equipment',
      distance: '2.3 km',
      price: '$45/hour',
      available: true,
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400'
    },
    {
      id: 2,
      name: 'Combine Harvester',
      owner: 'Green Valley Co-op',
      distance: '5.1 km',
      price: '$120/hour',
      available: false,
      image: 'https://images.unsplash.com/photo-1500461285074-dcfece05de3d?w=400'
    },
    {
      id: 3,
      name: 'Irrigation System',
      owner: 'AquaFarm Solutions',
      distance: '1.8 km',
      price: '$25/hour',
      available: true,
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400'
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-agri-brown to-agri-orange border-0 shadow-lg">
        <CardHeader className="text-white">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Truck className="w-6 h-6" />
            Nearby Tools & Equipment
          </CardTitle>
          <p className="text-agri-cream/90">Find and rent farming equipment near you</p>
        </CardHeader>
      </Card>

      {/* Tools List */}
      <div className="space-y-4">
        {nearbyTools.map((tool, index) => (
          <Card 
            key={tool.id}
            className={cn(
              "bg-white border shadow-md hover:shadow-lg transition-all duration-300 animate-fade-up",
              tool.available ? "border-agri-green/20" : "border-gray-300 opacity-75"
            )}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'backwards'
            }}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img 
                  src={tool.image} 
                  alt={tool.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-agri-brown">{tool.name}</h3>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      tool.available 
                        ? "bg-agri-green/20 text-agri-green" 
                        : "bg-gray-200 text-gray-600"
                    )}>
                      {tool.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{tool.owner}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-agri-blue">
                        <MapPin className="w-4 h-4" />
                        <span>{tool.distance}</span>
                      </div>
                      <div className="flex items-center gap-1 text-agri-green">
                        <DollarSign className="w-4 h-4" />
                        <span>{tool.price}</span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm"
                      disabled={!tool.available}
                      className={cn(
                        "ripple-effect",
                        tool.available 
                          ? "bg-agri-green hover:bg-agri-green/90 text-white" 
                          : "bg-gray-300 text-gray-500"
                      )}
                    >
                      {tool.available ? 'Rent Now' : 'Not Available'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FarmerTools;
