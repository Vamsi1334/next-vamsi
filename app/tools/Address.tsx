"use client"

import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { CheckCircle, Copy, Settings, Download, Eye } from 'lucide-react';
import { Button } from "../components/ui/button"
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
// Sample category data — replace with your actual


const categoryFields = {
  address: {
    'Full Address': () => faker.location.streetAddress(true),
    'Street Address': () => faker.location.streetAddress(),
    'Building Number': () => faker.location.buildingNumber(),
    'City': () => faker.location.city(),
    'County': () => faker.location.county(),
    'Country': () => faker.location.country(),
    'Country Code': () => faker.location.countryCode(),
    'State': () => faker.location.state(),
    'State Abbreviation': () => faker.location.state({ abbreviated: true }),
    'Zip Code': () => faker.location.zipCode(),
    'Latitude': () => faker.location.latitude(),
    'Longitude': () => faker.location.longitude(),
  },
};

const Address = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
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
    Object.keys(categoryFields['address']).forEach((f, index) => {
      initial[f] = index < 3; // ✅ only first 3 fields true
    });
    setActiveCategory('address');
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
                  Fake Address Generator
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Fake Address Generator instantly creates realistic street addresses, cities, states, and ZIP codes for testing, development, or privacy needs. Generate US, Canada, UK, Australia, and 125+ country addresses in seconds, perfect for filling forms, QA automation, or creating mock datasets. Fast, free, and easy to use.              </p>
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
                        {Object.keys(categoryFields['address']).map((fieldName) => (
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
                  <h2 className="text-2xl font-bold mb-4">What Is a Fake Address Generator?</h2>
                  <p className="mb-4">
                    A fake address generator is a tool that produces realistic-looking addresses without connecting to any real person or property. This makes it ideal for developers, QA testers, marketers, and writers who need safe, usable address data.
                  </p>
                  <p className="mb-8">
                    Unlike copying random addresses online, <span className="font-bold">FakerBox</span> provides structured outputs like Full Address, Street Address, ZIP Code, and even coordinates like Latitude and Longitude. You get believable results instantly, without privacy risks.
                  </p>

                  <h3 className="text-xl font-semibold mb-4">How to Use the Fake Address Generator (3 Easy Steps)</h3>
                  <h4 className="text-lg font-bold mb-2">Step 1: Click “Generate” for Instant Results</h4>
                  <p className="mb-2">
                    With one click, you’ll instantly see a random address complete with:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Full Address (e.g., 742 Evergreen Terrace, Springfield, IL 62704, USA)</li>
                    <li>Street Address + Building Number</li>
                    <li>City, County, and State</li>
                    <li>Country with Code (e.g., US, CA)</li>
                    <li>ZIP Code</li>
                    <li>Latitude & Longitude</li>
                  </ul>
                  <p className="mb-8">
                    Perfect for filling forms, seeding databases, or UI testing.
                  </p>

                  <h4 className="text-lg font-bold mb-2">Step 2: Customize Fields (Optional)</h4>
                  <p className="mb-2">
                    Need specific details? Select which fields to include. For example:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Only Street Address and City for simple forms</li>
                    <li>Add Latitude & Longitude for location-based apps</li>
                    <li>Use State Abbreviation for US-specific workflows</li>
                    <li>Choose country filters for a fake US address generator or Canada address generator</li>
                  </ul>
                  <p className="mb-8"></p>

                  <h4 className="text-lg font-bold mb-2">Step 3: Export or Copy Instantly</h4>
                  <p className="mb-2">
                    Use the results however you like:
                  </p>
                  <ul className="list-disc list-inside mb-3">
                    <li>Copy to clipboard for quick pasting</li>
                    <li>Download CSV for spreadsheets</li>
                    <li>Export JSON for developers and APIs</li>
                  </ul>
                  <p className="mb-8">
                    This makes FakerBox perfect for teams who need bulk data, automation, and repeatable test cases.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">
                    Why Use a Random Fake Address Generator?
                  </h2>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Safe Testing Without Real Data</h3>
                    <p className="mb-4">
                      Instead of using personal or sensitive information, you can create a fake address that looks real but protects privacy.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Populate Forms & Databases Quickly</h3>
                    <p className="mb-4">
                      Save hours by filling in fields like Street Address, City, and ZIP Code automatically.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Global Options Beyond the US</h3>
                    <p className="mb-4">
                      While many rely on a US address generator, FakerBox also works for Canada and other regions.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Developer-Friendly & Scalable</h3>
                    <p>
                      Effortlessly create countless random addresses that can be easily exported for large-scale applications or softwares or any projects.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">
                    Features of FakerBox Fake Address Generator
                  </h2>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Generate Full & Structured Addresses</h3>
                    <p className="mb-4">
                      Every generated profile includes Full Address, broken down into components like Street Address, Building Number, City, County, and ZIP Code.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Country, Code & State Details</h3>
                    <p className="mb-4">
                      Switch between formats with State Name or State Abbreviation, plus Country and Country Code for global testing.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Location Data Included</h3>
                    <p className="mb-4">
                      Addresses aren’t just text. FakerBox adds Latitude and Longitude to make results usable for maps, apps, and geolocation testing.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Multiple Region Options</h3>
                    <p className="mb-4">
                      Use our fake US address generator for American datasets or the Canada address generator when you need Canadian-specific addresses.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Bulk Generation with Export</h3>
                    <p className="mb-8">
                      No limits on scale. Generate one address or thousands. Export your dataset as CSV or JSON instantly.
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Benefits of Using FakerBox Address Generator
                  </h2>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Speed & Efficiency</h3>
                    <p className="mb-4">
                      Create addresses in milliseconds, freeing you from repetitive manual entry.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Realism Without Risk</h3>
                    <p className="mb-4">
                      Addresses look authentic but are completely fictional, ensuring privacy and compliance.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Versatile Use Cases</h3>
                    <p className="mb-4">
                      From QA automation to creative projects, addresses fit into multiple workflows.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Free Forever</h3>
                    <p className="mb-4">
                      No paywalls. No hidden credits. The FakerBox random address generator is free, always.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">
                    When Should You Create a Fake Address?
                  </h2>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Testing & QA Automation</h3>
                    <p className="mb-4">
                      Fill address forms, simulate checkout flows, and validate field handling.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Mock Datasets for Development</h3>
                    <p className="mb-4">
                      Seed realistic data into CRMs, e-commerce systems, and HR databases.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Fiction Writing & Gaming</h3>
                    <p className="mb-4">
                      Use addresses to add depth to fictional characters, settings, or RPG worlds.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Marketing & Persona Building</h3>
                    <p className="mb-8">
                      Create realistic user personas with authentic street addresses and ZIP Codes to use it in your marketing or persona building strategies.
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Realistic Street Names & Patterns
                  </h2>
                  <p className="mb-4">
                    No more “Random Road #123”.<br />
                    We use real naming patterns:
                    <br />
                    <span className="block mt-2">
                      US: “Avenue”, “Boulevard”, “Drive”, “Lane”<br />
                      Canada: “Street”, “Terrace”, “Way”, “Place”<br />
                      Number ranges that match urban vs. suburban density
                    </span>
                  </p>
                  <p className="mb-8">
                    Result? Addresses that look real at a glance — perfect for UI mockups and client demos.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">
                    Why FakerBox Is Free (And Always Will Be)
                  </h2>
                  <p className="mb-2">
                    We don’t believe in paywalls for essential tools.
                  </p>
                  <p className="mb-2">
                    FakerBox’s address generator is:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>100% free</li>
                    <li>No registration</li>
                    <li>No tracking</li>
                    <li>No data collection</li>
                  </ul>
                  <p className="mb-2">Why?</p>
                  <p className="mb-2">
                    Because time-saving tools should save time, not create friction.
                  </p>
                  <p className="mb-8">
                    We built this for developers, testers, and creators who need speed and simplicity.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">FAQs: Fake Address Generator</h2>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What is a fake address generator?</h3>
                    <p>
                      A tool that creates realistic addresses for testing, development, and creative projects without using personal or real data.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I use FakerBox as a fake US address generator?</h3>
                    <p>
                      Yes. You can generate US-specific addresses complete with State Abbreviation, ZIP Code, and coordinates.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Does the address generator support Canada?</h3>
                    <p>
                      Yes. FakerBox works as a Canada address generator and can provide structured Canadian addresses.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">What fields can I generate?</h3>
                    <p>
                      You can generate Full Address, Street Address, Building Number, City, County, State, State Abbreviation, Country, Country Code, ZIP Code, Latitude, and Longitude.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I export the results?</h3>
                    <p>
                      Yes. Copy to clipboard, download in CSV, or export as JSON for bulk testing.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Are these addresses real?</h3>
                    <p>
                      No. All addresses are synthetic and fictional, though they resemble real-world formats.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Is it free to use?</h3>
                    <p>
                      Yes. FakerBox’s random address generator is free, forever.
                    </p>
                  </div>

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

export default Address;
