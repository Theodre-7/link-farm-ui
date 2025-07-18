
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FarmerHome from './FarmerHome';
import FarmerTools from './FarmerTools';
import FarmerMessages from './FarmerMessages';
import FarmerProfile from './FarmerProfile';
import FarmerAddCrop from './FarmerAddCrop';
import BottomNavigation from '@/components/BottomNavigation';

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-agri-cream">
      <div className="pb-20"> {/* Space for bottom navigation */}
        <Routes>
          <Route path="/home" element={<FarmerHome />} />
          <Route path="/tools" element={<FarmerTools />} />
          <Route path="/messages" element={<FarmerMessages />} />
          <Route path="/profile" element={<FarmerProfile />} />
          <Route path="/add-crop" element={<FarmerAddCrop />} />
          <Route path="/" element={<FarmerHome />} />
        </Routes>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default FarmerDashboard;
