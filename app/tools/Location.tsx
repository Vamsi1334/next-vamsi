"use client"

import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { CheckCircle, Copy, Settings, Download, Eye } from 'lucide-react';
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { Textarea } from "../components/ui/textarea"
import DownloadButton from '../components/DownloadButton';
import { useToast } from '../hooks/use-toast';
import { useDataGenerator } from './useDataGenerator';
import Head from 'next/head';
import Footer from '../components/Footer';
import CustomRecordGenerator from '../components/CustomRecordGenerator';
import ToolsNav from "../tools/ToolsNav";

import Navigation from '../components/Navigation';


const categoryFields = {
  location: {
    'City': () => faker.location.city(),
    'Country': () => faker.location.country(),
    'Country Code': () => faker.location.countryCode(),
    'State': () => faker.location.state(),
    'Street Address': () => faker.location.streetAddress(),
    'Zip Code': () => faker.location.zipCode(),
    'Latitude': () => faker.location.latitude(),
    'Longitude': () => faker.location.longitude(),
    'Direction': () => faker.location.direction(),
    'Time Zone': () => faker.location.timeZone(),
  },
};

const Person = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
  const sizeClasses = {
    small: 'text-2xl',
    default: 'text-4xl',
    large: 'text-5xl'
  };

  const {
    generatedData,
    rowCount,
    activeCategory,
    isDialogOpen,
    selectedFields,
    downloadFormat,
    regexPattern,
    setRegexPattern,
    setDownloadFormat,
    setIsDialogOpen,
    setActiveCategory,
    setGeneratedData,
    handleRowCountChange,
    openCategoryDialog,
    handleFieldToggle,
    handleGenerate,
    copyAllData,
    downloadData,
    setSelectedFields
  } = useDataGenerator(categoryFields);


  useEffect(() => {
    const initial: any = {};
    Object.keys(categoryFields['location']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('location');
    setSelectedFields(initial);
  }, []);


  return (
    <>
      

      <div className="min-h-screen">
        <Navigation />

        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <h1 className={`${sizeClasses[size]} font-bold text-gray-900`}>
                  Random Location Generator For Fake Data
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Random Location Generator instantly creates realistic, made-up geographic data, perfect for testing mapping applications and location-based projects.              </p>
            </div>
          </div>
        </div>

        {/* Data Generation Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8">
              <div className="flex-1 min-w-0">

                {/* ✅ Integrated HTML grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
                  {/* Left Side - Configuration */}
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Fields to Generate</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-64 overflow-y-auto">
                        {Object.keys(categoryFields['location']).map((fieldName) => (
                          <div key={fieldName} className="flex items-center space-x-2">
                            <Checkbox
                              id={fieldName}
                              checked={selectedFields[fieldName]}
                              onCheckedChange={(checked) => handleFieldToggle(fieldName, checked as boolean)}
                            />
                            <Label htmlFor={fieldName} className="text-sm">{fieldName}</Label>
                          </div>
                        ))}
                      </div>

                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Regex Pattern (Optional)</h3>
                      <div className="space-y-2">
                        <Label htmlFor="regex-pattern">Custom Regex Pattern</Label>
                        <Textarea
                          id="regex-pattern"
                          placeholder="Enter regex pattern (e.g., [A-Z]{3}[0-9]{3}, \d{4}-\d{2}-\d{2})"
                          value={regexPattern}
                          onChange={(e) => setRegexPattern(e.target.value)}
                          className="min-h-[60px]"
                        />
                        <p className="text-sm text-gray-600">
                          Use regex patterns to generate custom formatted data. Examples: [A-Z]{3}[0-9]{3} for ABC123, \d{4}-\d{2}-\d{2} for dates like 2024-01-15
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="row-count">Number of Rows</Label>
                      <Input
                        id="row-count"
                        type="number"
                        value={rowCount}
                        onChange={(e) => handleRowCountChange(e.target.value)}
                        min={1}
                        max={5000}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">Maximum: 5,000 rows</p>
                    </div>

                    <div>
                      <Label htmlFor="download-format">Download Format</Label>
                      <select
                        id="download-format"
                        value={downloadFormat}
                        onChange={(e) => setDownloadFormat(e.target.value as 'csv' | 'json')}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="csv">CSV (Comma Separated Values)</option>
                        <option value="json">JSON (JavaScript Object Notation)</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Side - Data Preview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Generated Data Preview</h3>

                    <Button
                      onClick={handleGenerate}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6"
                      disabled={Object.values(selectedFields).every(v => !v) && !regexPattern.trim()}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Generate & Preview
                    </Button>

                    {generatedData ? (
                      <>
                        <div className="flex gap-2 mb-4">
                          <Button
                            onClick={copyAllData}
                            variant="outline"
                            className="flex-1"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy Data
                          </Button>

                          <Button
                            onClick={downloadData}
                            variant="outline"
                            className="flex-1"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download {downloadFormat.toUpperCase()}
                          </Button>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <div className="overflow-x-auto max-h-96 overflow-y-auto">
                            <table className="w-full border-collapse text-sm">
                              <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                  {Object.keys(generatedData[0] || {}).map((header) => (
                                    <th key={header} className="border px-3 py-2 text-left font-semibold text-gray-900">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {generatedData.map((record: any, index: number) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    {Object.values(record).map((value: any, cellIndex: number) => (
                                      <td key={cellIndex} className="border px-3 py-2 max-w-xs truncate" title={String(value)}>
                                        {String(value)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 text-gray-500 border border-dashed rounded-lg">
                        <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Select fields and click "Generate & Preview" to see your data</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Record Generator */}
                <div className="text-center mt-12 mb-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border-2 border-slate-200 pb-5">
                  <div className=" p-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Custom Test Data Generator Tool</h3>
                    <p className="text-slate-600 mb-4">Generate custom CSV and JSON test data with unlimited columns and data types. Perfect for database testing, software development, API testing, and data analysis. Create realistic fake data including names, emails, addresses, phone numbers, financial data, and more for your testing needs.

                    </p>
                  </div>
                  <CustomRecordGenerator />

                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Similar Tools</h2>

                  {/* Navigation buttons */}
                  <ToolsNav />
                </div>
                <div className="rounded-xl border-2 border-slate-200 p-10 shadow-md mx-auto my-8">

                  <h2 className="text-2xl font-bold mb-4">What Is a Random Location Generator?</h2>
                  <p className="mb-4">
                    A random location generator is a tool that produces fake location data including cities, states, countries, time zones, and coordinates. It can act as a fake Google location generator, a fake UK location generator, or a fake US location generator depending on your needs. With FakerBox, you can:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generate random place generator outputs for demos and apps</li>
                    <li>Create fake longitude and latitude values for testing APIs</li>
                    <li>Create made-up location data including countries, cities, and streets</li>
                    <li>Export datasets in CSV or JSON formats for development</li>
                  </ul>
                  <p className="mb-8">
                    This makes the FakerBox tool essential for developers, testers, and researchers working on location-driven applications.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Why Use Fake Location Generator Data?</h2>

                  <h3 className="text-xl font-semibold mb-2">Safe for Testing</h3>
                  <p className="mb-4">
                    Using fake location generator data avoids exposing real user addresses or coordinates.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Speeds Up Development</h3>
                  <p className="mb-4">
                    The random place generator provides instant values for apps and prototypes.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Realistic Outputs</h3>
                  <p className="mb-4">
                    Results include random longitude and latitude, random country names, and random street addresses that look authentic.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Flexible Across Projects</h3>
                  <p className="mb-8">
                    You can use the fake Google location generator for APIs, games, or research simulations.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">How to Generate Random Locations?</h2>

                  <h3 className="text-xl font-semibold mb-2">Pick Fields to Generate</h3>
                  <p className="mb-4">
                    Choose specific outputs such as city, country, country code, state, street address, zip code, latitude, longitude, direction, or time zone.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Create Fake Location Data</h3>
                  <p className="mb-4">
                    Click Generate to receive results such as:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>City: Boston</li>
                    <li>State: California</li>
                    <li>Country: United States</li>
                    <li>Country Code: US</li>
                    <li>Street Address: 1245 Lakeview Blvd</li>
                    <li>Zip Code: 90210</li>
                    <li>Latitude: 34.0522</li>
                    <li>Longitude: -118.2437</li>
                    <li>Direction: North-East</li>
                    <li>Time Zone: GMT-8</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Regex Support for Custom Formats</h3>
                  <p className="mb-4">
                    Advanced users can apply regex rules to control results, such as ensuring specific country codes, zip formats, or latitude ranges.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Download Options</h3>
                  <p className="mb-8">
                    You can copy single random city names or export bulk fake location generator outputs in CSV and JSON for testing large systems.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Features of the FakerBox Random Location Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Generate fake location data instantly with cities, countries, and addresses</li>
                    <li>Works as a fake Google location generator for safe app testing</li>
                    <li>Create fake UK location generator or fake US location generator datasets</li>
                    <li>Random place generator outputs cover streets, states, and zip codes</li>
                    <li>Produce random longitude and latitude coordinates with direction and time zone</li>
                    <li>Regex customization available for precise formats</li>
                    <li>Export data as CSV or JSON file for smooth workflows</li>
                    <li>Free and unlimited with no sign-up required</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Examples of Random Location Data</h2>

                  <h3 className="text-xl font-semibold mb-2">Example 1</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>City: London</li>
                    <li>State: Greater London</li>
                    <li>Country: United Kingdom</li>
                    <li>Street Address: 78 High Street</li>
                    <li>Zip Code: SW1A 1AA</li>
                    <li>Latitude: 51.5074</li>
                    <li>Longitude: -0.1278</li>
                    <li>Direction: North-West</li>
                    <li>Time Zone: GMT</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Example 2</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>City: New York</li>
                    <li>State: New York</li>
                    <li>Country: United States</li>
                    <li>Street Address: 245 Broadway Ave</li>
                    <li>Zip Code: 10007</li>
                    <li>Latitude: 40.7128</li>
                    <li>Longitude: -74.0060</li>
                    <li>Direction: East</li>
                    <li>Time Zone: EST</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 3</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>City: Sydney</li>
                    <li>State: New South Wales</li>
                    <li>Country: Australia</li>
                    <li>Street Address: 12 Harbour Road</li>
                    <li>Zip Code: 2000</li>
                    <li>Latitude: -33.8688</li>
                    <li>Longitude: 151.2093</li>
                    <li>Direction: South-East</li>
                    <li>Time Zone: GMT+10</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Example 4</h3>
                  <ul className="list-disc list-inside mb-8">
                    <li>City: Toronto</li>
                    <li>State: Ontario</li>
                    <li>Country: Canada</li>
                    <li>Street Address: 567 Maple Lane</li>
                    <li>Zip Code: M5H 2N2</li>
                    <li>Latitude: 43.6510</li>
                    <li>Longitude: -79.3470</li>
                    <li>Direction: North-East</li>
                    <li>Time Zone: EST</li>
                  </ul>
                  <h2 className="text-2xl font-bold mb-4">Benefits of Using FakerBox Fake Location Generator</h2>
                  <ul className="list-disc list-inside mb-8">
                    <li>Instantly generate random country names, random city names, and random street addresses</li>
                    <li>Fake Google location generator provides realistic results for mapping demos</li>
                    <li>Fake UK location generator and fake US location generator outputs help with region-specific testing</li>
                    <li>Random coordinates and fake longitude and latitude are useful for GIS and navigation apps</li>
                    <li>Random time zone outputs allow developers to simulate global use cases</li>
                    <li>Free forever with unlimited usage for developers and testers</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Random Location Generator for Projects</h2>

                  <h3 className="text-xl font-semibold mb-2">Developers and QA Teams</h3>
                  <p className="mb-4">
                    Use random location generator outputs to populate APIs, forms, and dashboards with fake location data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Mapping and GIS Applications</h3>
                  <p className="mb-4">
                    Generate random longitude and latitude to test geographic tools without relying on real maps.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Educators and Trainers</h3>
                  <p className="mb-4">
                    Teach geography, databases, and global systems with fake location data.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Researchers and Analysts</h3>
                  <p className="mb-4">
                    Simulate global datasets using random country names, random time zones, and coordinates.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Game Designers</h3>
                  <p className="mb-8">
                    Use random place generator outputs to create fictional worlds with authentic-looking locations.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Responsible Use of Fake Location Data</h2>
                  <p className="mb-8">
                    Generated fake location data is fictional and not linked to real users. It must not be used for fraud or impersonation. The FakerBox random location generator is designed for safe testing, creative use, and learning only.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">FAQs: Random Location Generator</h2>

                  <h3 className="text-xl font-semibold mb-2">What is a random location generator?</h3>
                  <p className="mb-4">
                    It is a tool that creates fake location data such as cities, countries, zip codes, and coordinates.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I use it as a fake Google location generator?</h3>
                  <p className="mb-4">
                    Yes, it can generate realistic geographic data for Google Maps API testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Does it create random coordinates?</h3>
                  <p className="mb-4">
                    Yes, the tool generates random longitude and latitude for testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I use it as a fake UK location generator?</h3>
                  <p className="mb-4">
                    Yes, you can generate UK-based random city names and street addresses.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can it act as a fake US location generator?</h3>
                  <p className="mb-4">
                    Yes, you can produce realistic US-based addresses and zip codes for testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Can I generate random time zones?</h3>
                  <p className="mb-4">
                    Yes, the tool provides random time zone outputs for global testing.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Is this a free tool?</h3>
                  <p className="mb-4">
                    Yes, the FakerBox fake location generator is free to use and unlimited.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Who uses random location data?</h3>
                  <p>
                    Developers, testers, educators, analysts, and game designers use fake location data for apps and simulations.

                  </p>


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

export default Person;
