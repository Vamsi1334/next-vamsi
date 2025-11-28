// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import DataGeneratorCards from '../components/DataGeneratorCards';
import CustomRecordGenerator from '../components/CustomRecordGenerator';
import FakeData from '../components/FakeData';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <>
      

      <div className="min-h-screen">
        <Navigation />

        {/* Hero Section with blue gradient background */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
          <HeroSection />
        </div>

        {/* Data Generation Section - White background */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="text-center mb-8">

                  {/* Top Custom Record Generator Section */}
                  <div className="text-center mb-16 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border-2 border-slate-200 pb-5">
                    <div className="p-8">
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">
                        Custom Test Data Generator Tool
                      </h3>
                      <p className="text-slate-600 mb-4">
                        Generate custom CSV and JSON test data with unlimited columns and data types. Perfect for database testing, software development, API testing, and data analysis. Create realistic fake data including names, emails, addresses, phone numbers, financial data, and more for your testing needs.
                      </p>
                    </div>
                    <CustomRecordGenerator />
                  </div>

                  <h1 className="text-5xl pb-3 font-bold">Fake Data Generators</h1>
                  <h2 className="text-lg text-gray-600 mb-8">
                    Choose from our collection of data generators and customize them to fit your needs
                  </h2>
                </div>

                <DataGeneratorCards />
                <FakeData />

                {/* Bottom Custom Record Generator Section */}
                <div className="text-center mt-12 mb-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border-2 border-slate-200 pb-5">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">
                      Custom Test Data Generator Tool
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Generate custom CSV and JSON test data with unlimited columns and data types. Perfect for database testing, software development, API testing, and data analysis. Create realistic fake data including names, emails, addresses, phone numbers, financial data, and more for your testing needs.
                    </p>
                  </div>
                  <CustomRecordGenerator />
                </div>

              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
