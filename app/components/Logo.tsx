import React from 'react';
import { Box, Package } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'default' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'default' }) => {
  const sizeClasses = {
    small: 'text-2xl',
    default: 'text-4xl',
    large: 'text-5xl',
  };

  const iconSizes = {
    small: 24,
    default: 32,
    large: 40,
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Box
          size={iconSizes[size]}
          className="text-blue-600"
          strokeWidth={2}
        />
        <Package
          size={iconSizes[size] * 0.6}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400"
          strokeWidth={2}
        />
      </div>
      <p className={`${sizeClasses[size]} font-bold text-gray-900`}>
        FakerBox
      </p>
    </div>
  );
};

export default Logo;
