'use client';

import React from 'react';
import { Database, Code, TestTube, Zap, Users, FileSpreadsheet } from 'lucide-react';
import Logo from '../components/Logo';
import ResponsiveAdContainer from '../components/ResponsiveAdContainer';

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Hero Section with Logo - Now at the top with white background */}
      

      {/* Introduction Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 mt-16 ">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Free Fake Data Generator for Developers & Testers
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              In today's fast-paced software development environment, having access to realistic test data is crucial for building robust applications. FakerBox provides developers, testers, and designers with an essential toolkit for generating high-quality mock data that mirrors real-world scenarios without compromising sensitive information.
            </p>
            <p>
              Test data generation is fundamental to modern development workflows. Whether you're seeding databases, testing user interfaces, validating API endpoints, or creating prototypes for stakeholder demonstrations, realistic fake data ensures your applications perform reliably under various conditions. Our comprehensive fake data generator eliminates the tedious process of manually creating test datasets, allowing development teams to focus on what matters most - building exceptional software experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section with gray background to distinguish from blue section above */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose FakerBox?</h2>
            {/* 3x3 Grid Layout for Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Database className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rich Data Types</h3>
                <p className="text-gray-600">Generate comprehensive fake data including names, emails, addresses, phone numbers, dates, and more with customizable options for realistic mock data generation</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Code className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Developer Friendly</h3>
                <p className="text-gray-600">Support for regex patterns and custom formats to match your exact requirements. Perfect for API testing, database seeding, and web development projects</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <TestTube className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect for Testing</h3>
                <p className="text-gray-600">Create realistic test data for database seeding, UI testing, and prototyping. Generate mock user profiles and sample datasets for quality assurance</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Easy</h3>
                <p className="text-gray-600">Generate bulk data instantly with one click and copy to clipboard effortlessly. Streamline your workflow with quick fake data generation tools</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 p-4 rounded-full mb-4">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">User Profile Generator</h3>
                <p className="text-gray-600">Create complete fake user profiles with consistent personal information, demographics, and contact details for user testing and demo applications</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-teal-100 p-4 rounded-full mb-4">
                  <FileSpreadsheet className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Export & Integration</h3>
                <p className="text-gray-600">Export generated mock data in multiple formats including JSON, CSV, and SQL. Seamlessly integrate fake data into your development and testing workflows</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
