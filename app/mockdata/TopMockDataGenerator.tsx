"use client"
import React from 'react';
import { Calendar, Clock, ArrowRight, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';


const Blog: React.FC = () => {

  

  return (
    <>
      

      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-slate-50">
        <Navigation />


        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Best Mock Data Generators Online
                </h1>
                <p className="text-xl text-gray-700">
                  Generate realistic test data effortlessly with these top-rated mock data generators. Compare features, formats, and capabilities to find the perfect tool for your development and testing needs in 2025.
                </p>
              </div>



              {/* All Articles */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">List of Top Mock Data Generators</h2>
                <div className="space-y-8">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                     <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="favicon.png" // replace with your image URL
                          alt="FakerBox Logo"
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          FakerBox
                        </h3>
                      </div>

                      <a
                        href="https://www.fakerbox.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    </div>

                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Fakerbox is the top among the top mock data generators. It is a free and effortless data generation tool built for professionals. No prompts, no complexity, just visit the site, pick the tool you need, and generate data instantly with a one click.
                      </p>
                      <p className="text-muted-foreground mb-4">
                        Fakerbox is built to save valuable time and energy, empowering professionals to focus on what truly matters for their projects. Simple. Fast. Reliable. That’s Fakerbox.
                      </p>
                    </CardContent>
                  </Card>



                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="data-generator/1.jpeg" // replace with Mockaroo logo/image
                          alt="Mockaroo Logo"
                          className="w-20 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          Mockaroo
                        </h3>
                      </div>

                      {/* Right side - Button */}
                      <a
                        href="https://www.mockaroo.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                       className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"                      >
                        Visit Website
                      </a>
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        A free test data generator and API mocking tool. It lets you create custom CSV, JSON, SQL, and Excel datasets to test and demo your software. Features robust schema designer with 100+ data types and API integration capabilities for seamless workflow automation.

                      </p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="data-generator/2.png" // replace with GenerateData logo/image
                          alt="GenerateData Logo"
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          GenerateData
                        </h3>
                      </div>

                      {/* Right side - Button */}
                      <a
                        href="https://generatedata.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                       className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"                      >
                        Visit Website
                      </a>
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Open-source data generator providing customizable datasets with flexible field configurations. Offers browser-based generation with multiple export options including CSV, JSON, and SQL formats for comprehensive testing scenarios and development requirements.

                      </p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="data-generator/3.svg" // replace with RNDGen logo/image
                          alt="RNDGen Logo"
                          className="w-50 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          RNDGen Data Generator
                        </h3>
                      </div>

                      {/* Right side - Button */}
                      <a
                        href="https://www.rndgen.com/data-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                       className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"                      >
                        Visit Website
                      </a>
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Versatile random data generator supporting various data types and formats. Provides quick generation capabilities with customizable parameters for names, addresses, numbers, and dates to meet diverse testing and development needs.

                      </p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="data-generator/4.jpeg" // replace with Beeceptor logo/image
                          alt="Beeceptor Logo"
                          className="w-50 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          Beeceptor Test Data Generator
                        </h3>
                      </div>

                      {/* Right side - Button */}
                      <a
                        href="https://beeceptor.com/resources/test-data-generator/"
                        target="_blank"
                        rel="noopener noreferrer"
                       className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"                      >
                        Visit Website
                      </a>
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Generate realistic synthetic test data using 300+ data generators. Supports UUIDs, names, products, addresses & more across domains. Generate JSON, CSV or SQL. Integrated with API mocking features for comprehensive testing workflows.

                      </p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="data-generator/5.jpeg" // replace with Online Data Generator logo/image
                          alt="Online Data Generator Logo"
                          className="w-50 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          Online Data Generator
                        </h3>
                      </div>

                      {/* Right side - Button */}
                      <a
                        href="https://www.onlinedatagenerator.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                       className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"                      >
                        Visit Website
                      </a>
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Generate test data. Export in CSV Excel SQL and Json. 100.000 records Free. Random name, string, address, email and guid Simple interface with quick generation capabilities for standard data types and formats.

                      </p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="data-generator/6.svg" // replace with Explo logo/image
                          alt="Explo AI Data Generator Logo"
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          Explo AI Data Generator
                        </h3>
                      </div>

                      {/* Right side - Button */}
                      <a
                        href="https://www.explo.co/ai-data-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                       className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"                      >
                        Visit Website
                      </a>
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        AI-powered data generation tool creating intelligent synthetic datasets. Leverages machine learning algorithms to produce contextually relevant test data with advanced pattern recognition and realistic data relationships for complex scenarios.

                      </p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="data-generator/7.svg" // replace with Faker.js logo/image
                          alt="Faker.js Logo"
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          Faker.js
                        </h3>
                      </div>

                      {/* Right side - Button */}
                      <a
                        href="https://fakerjs.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                       className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"                      >
                        Visit Website
                      </a>
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Generate massive amounts of fake (but reasonable) data for testing and development. Pick from over 70 locales to generate realistic looking Names, Addresses, and Phone Numbers. JavaScript library for programmatic data generation with extensive localization support.
                      </p>
                    </CardContent>
                  </Card>




                  {/* You can copy-paste more Card blocks like this for additional static posts */}
                </div>

              </section>
            </div>


          </div>
        </main>


        <Footer />
      </div>
    </>
  );
};

export default Blog;