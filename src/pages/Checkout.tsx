
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, Phone, CreditCard, Smartphone, Truck, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface CheckoutItem {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  quantity: number;
  farmer: string;
}

const mockItem: CheckoutItem = {
  id: '1',
  name: 'Fresh Tomatoes',
  image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
  price: 3.50,
  unit: 'kg',
  quantity: 10,
  farmer: 'John Smith Farm'
};

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const item = mockItem; // In real app, get from URL params or state
  const totalAmount = item.price * item.quantity;
  const deliveryFee = 2.50;
  const finalTotal = totalAmount + deliveryFee;

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Show success animation for 2 seconds then redirect
    setTimeout(() => {
      navigate('/buyer/home');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-agri-cream flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-white shadow-xl">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-agri-green rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-agri-brown mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your order has been successfully placed. You'll receive a confirmation message shortly.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Order ID: #AG{Date.now().toString().slice(-6)}</p>
              <p>Total: ₹{finalTotal.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-agri-cream">
      {/* Header */}
      <div className="bg-white border-b border-agri-blue/20 shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="hover:bg-agri-green/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-agri-brown">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6 pb-20">
        {/* Order Summary */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-agri-brown flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-agri-brown">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">From: {item.farmer}</p>
                <div className="flex justify-between items-center">
                  <span className="text-agri-green font-bold">
                    ₹{item.price} × {item.quantity} {item.unit}
                  </span>
                  <span className="font-bold">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-agri-green">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-agri-brown flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your complete address"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo(prev => ({...prev, address: e.target.value}))}
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={deliveryInfo.city}
                    onChange={(e) => setDeliveryInfo(prev => ({...prev, city: e.target.value}))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={deliveryInfo.state}
                    onChange={(e) => setDeliveryInfo(prev => ({...prev, state: e.target.value}))}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    placeholder="Pincode"
                    value={deliveryInfo.pincode}
                    onChange={(e) => setDeliveryInfo(prev => ({...prev, pincode: e.target.value}))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    value={deliveryInfo.phone}
                    onChange={(e) => setDeliveryInfo(prev => ({...prev, phone: e.target.value}))}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-agri-brown flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-3 p-3 border border-agri-blue/20 rounded-lg">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                  <Truck className="w-5 h-5 text-agri-brown" />
                  <div>
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">Pay when you receive your order</div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border border-agri-blue/20 rounded-lg">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                  <Smartphone className="w-5 h-5 text-agri-green" />
                  <div>
                    <div className="font-medium">UPI Payment</div>
                    <div className="text-sm text-gray-600">Pay instantly using UPI</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Confirm Purchase Button */}
        <Button
          onClick={handleConfirmPurchase}
          disabled={isProcessing || !deliveryInfo.address || !deliveryInfo.phone}
          className={cn(
            "w-full bg-agri-green hover:bg-agri-green/90 text-white text-lg py-6 rounded-xl",
            "shadow-lg transition-all duration-300 hover:shadow-xl",
            "ripple-effect relative overflow-hidden min-h-[64px]",
            isProcessing && "animate-pulse"
          )}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing Order...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Confirm Purchase - ₹{finalTotal.toFixed(2)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
