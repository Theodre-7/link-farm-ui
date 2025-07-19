
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import BuyerHome from "./pages/buyer/BuyerHome";
import BuyerProfile from "./pages/buyer/BuyerProfile";
import BuyerAssistant from "./pages/buyer/BuyerAssistant";
import CropDetail from "./pages/buyer/CropDetail";
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/role" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/farmer/*" element={<FarmerDashboard />} />
          <Route path="/farmer/profile" element={<FarmerProfile />} />
          <Route path="/buyer/home" element={<BuyerHome />} />
          <Route path="/buyer/profile" element={<BuyerProfile />} />
          <Route path="/buyer/assistant" element={<BuyerAssistant />} />
          <Route path="/crop/:id" element={<CropDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
