
import React from 'react';
import AdSpace from './AdSpace';

interface ResponsiveAdContainerProps {
  position: string;
  className?: string;
}

const ResponsiveAdContainer: React.FC<ResponsiveAdContainerProps> = ({ position, className = '' }) => {
  // For sidebar ads, use skyscraper format
  if (position === 'left-sidebar' || position === 'right-sidebar' || position === 'blog-sidebar' || position === 'article-sidebar') {
    return (
      <div className={`w-full flex justify-center items-center ${className}`}>
        <AdSpace size="skyscraper" position={position} />
      </div>
    );
  }

  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      {/* Desktop - Large Leaderboard */}
      <div className="hidden lg:block">
        <AdSpace size="leaderboard" position={position} />
      </div>
      
      {/* Tablet - Banner */}
      <div className="hidden md:block lg:hidden">
        <AdSpace size="banner" position={position} />
      </div>
      
      {/* Mobile - Mobile Banner */}
      <div className="block md:hidden">
        <AdSpace size="mobile-banner" position={position} />
      </div>
    </div>
  );
};

export default ResponsiveAdContainer;
