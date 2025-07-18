
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Wrench, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/farmer/home' },
    { icon: Wrench, label: 'Tools', path: '/farmer/tools' },
    { icon: MessageCircle, label: 'Messages', path: '/farmer/messages' },
    { icon: User, label: 'Profile', path: '/farmer/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-agri-blue/20 shadow-lg z-30">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path || (path === '/farmer/home' && location.pathname === '/farmer/');
          
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-300 ripple-effect",
                isActive 
                  ? "text-agri-green" 
                  : "text-gray-500 hover:text-agri-green"
              )}
            >
              <Icon className={cn(
                "w-6 h-6 transition-all duration-300",
                isActive && "animate-bounce"
              )} />
              <span className={cn(
                "text-xs mt-1 font-medium",
                isActive && "font-bold"
              )}>
                {label}
              </span>
              {isActive && (
                <div className="absolute -top-1 w-8 h-1 bg-agri-green rounded-full animate-fade-up" />
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
