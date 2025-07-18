
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, MapPin, DollarSign, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tool {
  id: number;
  name: string;
  owner: string;
  distance: string;
  price: string;
  available: boolean;
  image: string;
  ownerRating?: number;
  estimatedTime?: string;
}

interface HireConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tool: Tool | null;
}

const HireConfirmationModal = ({ isOpen, onClose, onConfirm, tool }: HireConfirmationModalProps) => {
  if (!isOpen || !tool) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className={cn(
        "w-full max-w-md bg-white shadow-2xl",
        "animate-slide-in-right"
      )}>
        <CardHeader className="border-b border-agri-blue/20">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-agri-brown">Confirm Hire</CardTitle>
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
          <div className="space-y-4">
            {/* Tool Image */}
            <div className="w-full h-32 rounded-lg overflow-hidden">
              <img 
                src={tool.image} 
                alt={tool.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Tool Details */}
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-agri-brown">{tool.name}</h3>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-agri-blue">
                  <User className="w-4 h-4" />
                  <span>{tool.owner}</span>
                </div>
                <div className="flex items-center gap-2 text-agri-green">
                  <DollarSign className="w-4 h-4" />
                  <span>{tool.price}</span>
                </div>
                <div className="flex items-center gap-2 text-agri-brown">
                  <MapPin className="w-4 h-4" />
                  <span>{tool.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-agri-orange">
                  <Clock className="w-4 h-4" />
                  <span>Available now</span>
                </div>
              </div>
            </div>
            
            {/* Confirmation Message */}
            <div className="bg-agri-blue/10 p-4 rounded-lg">
              <p className="text-sm text-agri-brown">
                You're about to hire <strong>{tool.name}</strong> from <strong>{tool.owner}</strong>. 
                The owner will be notified and you'll receive contact details once confirmed.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-agri-brown text-agri-brown hover:bg-agri-brown/10"
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                className="flex-1 bg-agri-green hover:bg-agri-green/90 text-white ripple-effect"
              >
                Confirm Hire
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HireConfirmationModal;
