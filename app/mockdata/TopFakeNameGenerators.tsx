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
                  Best Fake Name Generators in 2025
                </h1>
                <p className="text-xl text-gray-700">
                  Generate realistic fake names instantly with these top-rated name generators. Perfect for testing, creative writing, character development, and privacy protection. Compare features, customization options, and export formats to find the ideal tool for your needs.
                </p>
              </div>



              {/* All Articles */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">List of Top Fake Name Generators Online</h2>
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
                          FakerBox: Fake Name Generator
                        </h3>
                      </div>
                      <a
                        href="https://www.fakerbox.com/tools/name"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        FakerBox leads the pack as the top fake name generator in 2025, offering unmatched customization and instant results. While many tools provide basic name generation, FakerBox delivers comprehensive identity creation with advanced features like regex patterns, bulk export options, and professional-grade data formatting. Compare the leading fake name generators below to see why developers and testers choose FakerBox for reliable, scalable identity generation.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                     <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="name-generator/1.png"
                          alt="Fake Name Generator Logo"
                          className="w-50 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          Fake Name Generator
                        </h3>
                      </div>
                      <a
                        href="https://www.fakenamegenerator.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        The most advanced name generator on the internet with 37 languages and 31 countries support. Generate names, addresses, social security numbers, credit card numbers, occupations, and more absolutely free. Comprehensive identity creation with extensive localization options for global testing scenarios.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                     <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="name-generator/2.webp"
                          alt="Dupli Checker Name Generator Logo"
                          className="w-50 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          Dupli Checker Name Generator
                        </h3>
                      </div>
                      <a
                        href="https://www.duplichecker.com/name-generator.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Simple online names generator that allows you to instantly create a list of random names. Enter the number of names you want to generate and get desired results shortly. Straightforward bulk name generation with quick processing for basic testing needs.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                     <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="name-generator/3.png"
                          alt="HomePage.Net Name Generator Logo"
                          className="w-50 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          HomePage.Net Name Generator
                        </h3>
                      </div>
                      <a
                        href="https://homepage.net/name_generator/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Designed to generate sample names to populate test databases, requiring first and last names plus fake email addresses. Helps soak-test projects expecting large concurrent user loads. Developer-focused tool optimized for database population and performance testing scenarios.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                     <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="name-generator/4.png"
                          alt="FauxID Logo"
                          className="w-50 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          FauxID
                        </h3>
                      </div>
                      <a
                        href="https://fauxid.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Free fake name generator that creates fake names, addresses, credit cards, SSNs and phone numbers. Supports fake names for the US, UK, India, China, and more countries. Comprehensive identity generation with multi-country support and complete personal information creation.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                     <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        {/* <img
                          src="https://via.placeholder.com/40"
                          alt="Random Word Generator Names Logo"
                          className="w-10 h-10 rounded-md object-cover"
                        /> */}
                      
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          Random Word Generator Names
                        </h3>
                      </div>
                      <a
                        href="https://randomwordgenerator.com/name.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Creates random names including girl names, boy names, baby names and last names. Perfect random name picker for creating character names. Simple interface focused on character creation and naming for creative projects and storytelling applications.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                     <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src="name-generator/6.jpeg"
                          alt="Random Name Generator Logo"
                          className="w-50 h-10 rounded-md object-cover"
                        />
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          Random Name Generator
                        </h3>
                      </div>
                      <a
                        href="https://www.random-name-generator.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Fake name, email and phone generator perfect for filling forms, finding baby names or writing fiction stories. Versatile tool combining name generation with contact information creation for comprehensive form testing and creative writing needs.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10">
                     <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                        {/* <img
                          src="name-generator/6.jpeg"
                          alt="1000 Random Names Logo"
                          className="w-50 h-10 rounded-md object-cover"
                        /> */}
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          1000 Random Names
                        </h3>
                      </div>
                      <a
                        href="https://1000randomnames.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white font-medium px-4 py-2 hover:bg-sky-600 transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        First and last names combined randomly when page loads. Odd-numbered first names are female and even-numbered first names are male. Simple bulk name generation with gender classification system for quick access to large name datasets without customization complexity.
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