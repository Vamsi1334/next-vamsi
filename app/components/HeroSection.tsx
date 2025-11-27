import React from 'react';
import { Database, Code, TestTube, Zap, Users, FileSpreadsheet } from 'lucide-react';
import Logo from '../components/Logo';
import ResponsiveAdContainer from '../components/ResponsiveAdContainer';

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Hero Section with Logo - Now at the top with white background */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Logo size="large" />
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The ultimate tool for developers, testers, and designers who need realistic fake data for their projects
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
