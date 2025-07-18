
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Truck, List, Map, Star, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import HireConfirmationModal from '@/components/HireConfirmationModal';

interface Tool {
  id: number;
  name: string;
  owner: string;
  distance: string;
  price: string;
  available: boolean;
  image: string;
  ownerRating: number;
  category: string;
}

const FarmerTools = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'available' | 'nearby'>('all');

  const nearbyTools: Tool[] = [
    {
      id: 1,
      name: 'Heavy Duty Tractor',
      owner: 'Mike\'s Farm Equipment',
      distance: '2.3 km',
      price: '$45/hour',
      available: true,
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
      ownerRating: 4.8,
      category: 'Machinery'
    },
    {
      id: 2,
      name: 'Combine Harvester',
      owner: 'Green Valley Co-op',
      distance: '5.1 km',
      price: '$120/hour',
      available: false,
      image: 'https://images.unsplash.com/photo-1500461285074-dcfece05de3d?w=400',
      ownerRating: 4.9,
      category: 'Machinery'
    },
    {
      id: 3,
      name: 'Irrigation System',
      owner: 'AquaFarm Solutions',
      distance: '1.8 km',
      price: '$25/hour',
      available: true,
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
      ownerRating: 4.7,
      category: 'Equipment'
    },
    {
      id: 4,
      name: 'Farm Labor Team',
      owner: 'Local Workers Union',
      distance: '3.2 km',
      price: '$15/hour per person',
      available: true,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400',
      ownerRating: 4.6,
      category: 'Labor'
    }
  ];

  const filteredTools = nearbyTools.filter(tool => {
    if (filter === 'available') return tool.available;
    if (filter === 'nearby') return parseFloat(tool.distance) < 3;
    return true;
  });

  const handleHireClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsHireModalOpen(true);
  };

  const handleConfirmHire = () => {
    // Simulate hiring process
    console.log('Hiring confirmed for:', selectedTool?.name);
    setIsHireModalOpen(false);
    setSelectedTool(null);
    
    // Show success feedback (you could add a toast notification here)
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-agri-brown to-agri-orange border-0 shadow-lg">
        <CardHeader className="text-white">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Truck className="w-6 h-6" />
            Nearby Tools & Equipment
          </CardTitle>
          <p className="text-agri-cream/90">Find and hire farming equipment near you</p>
        </CardHeader>
      </Card>

      {/* Controls */}
      <Card className="bg-white shadow-md">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            {/* View Toggle */}
            <div className="flex bg-agri-blue/10 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn(
                  "flex items-center gap-2 transition-all duration-200",
                  viewMode === 'list' 
                    ? "bg-agri-green text-white shadow-md" 
                    : "text-agri-brown hover:bg-agri-blue/20"
                )}
              >
                <List className="w-4 h-4" />
                List
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('map')}
                className={cn(
                  "flex items-center gap-2 transition-all duration-200",
                  viewMode === 'map' 
                    ? "bg-agri-green text-white shadow-md" 
                    : "text-agri-brown hover:bg-agri-blue/20"
                )}
              >
                <Map className="w-4 h-4" />
                Map
              </Button>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-agri-brown" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'available' | 'nearby')}
                className="px-3 py-1 border border-agri-blue/30 rounded-lg bg-white text-agri-brown focus:border-agri-green outline-none"
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="nearby">Nearby (&lt;3km)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredTools.map((tool, index) => (
            <Card 
              key={tool.id}
              className={cn(
                "bg-white border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up",
                tool.available ? "border-agri-green/20" : "border-gray-300 opacity-75"
              )}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'backwards'
              }}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <img 
                      src={tool.image} 
                      alt={tool.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className={cn(
                      "absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium",
                      tool.available 
                        ? "bg-agri-green/90 text-white" 
                        : "bg-gray-500/90 text-white"
                    )}>
                      {tool.available ? 'Available' : 'Busy'}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-agri-brown">{tool.name}</h3>
                        <p className="text-sm text-gray-600">{tool.owner}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-agri-orange">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{tool.ownerRating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
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
                        onClick={() => handleHireClick(tool)}
                        className={cn(
                          "ripple-effect transition-all duration-200",
                          tool.available 
                            ? "bg-agri-green hover:bg-agri-green/90 text-white hover:scale-105" 
                            : "bg-gray-300 text-gray-500"
                        )}
                      >
                        {tool.available ? 'Hire Now' : 'Not Available'}
                      </Button>
                    </div>
                    
                    <div className="text-xs text-gray-500 bg-agri-blue/5 px-2 py-1 rounded">
                      Category: {tool.category}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64 bg-agri-blue/5 rounded-lg">
              <div className="text-center text-agri-brown">
                <Map className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Map View</h3>
                <p className="text-sm opacity-75">Interactive map coming soon...</p>
                <Button 
                  onClick={() => setViewMode('list')}
                  className="mt-4 bg-agri-green hover:bg-agri-green/90"
                >
                  Switch to List View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hire Confirmation Modal */}
      <HireConfirmationModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
        onConfirm={handleConfirmHire}
        tool={selectedTool}
      />
    </div>
  );
};

export default FarmerTools;
